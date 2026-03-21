/**
 * Fetch Google aggregate ratings for all shops in Supabase.
 * Uses Google Places API (New) Text Search to find each shop
 * and stores the rating + review count in review_sources.
 *
 * Usage: npx tsx scripts/fetch-google-ratings.ts
 * Requires GOOGLE_PLACES_API_KEY, NEXT_PUBLIC_SUPABASE_URL,
 * and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *
 * Cost: ~$32 per 1,000 shops (Places Text Search)
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

config({ path: resolve(process.cwd(), ".env.local") });

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GOOGLE_API_KEY) {
  console.error("Missing GOOGLE_PLACES_API_KEY in .env.local");
  process.exit(1);
}
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface PlaceResult {
  placeId: string;
  rating: number;
  reviewCount: number;
}

/**
 * Search Google Places API (New) for a barbershop by name + location.
 * Uses the Text Search (New) endpoint.
 * Docs: https://developers.google.com/maps/documentation/places/web-service/text-search
 */
/**
 * Build query strings to try, in order of specificity.
 * Strategy 1: address only (most precise for Google)
 * Strategy 2: name + city (catches name-based matches)
 * Strategy 3: name + address (full context)
 */
function buildQueries(
  shopName: string,
  address: string,
  cityName: string,
  state: string,
): string[] {
  const nameClean = shopName
    .replace(/barbershop|barber shop|barber/gi, "")
    .trim();
  const queries: string[] = [];

  if (address) {
    // Best: shop name + street address (Google matches on address really well)
    queries.push(`${shopName} ${address}`);
    // Fallback: just the address
    queries.push(address);
  }

  // Name + city fallback
  queries.push(`${shopName} ${cityName} ${state}`);

  // Cleaned name + city (remove redundant "barbershop")
  if (nameClean && nameClean !== shopName) {
    queries.push(`${nameClean} barber ${cityName} ${state}`);
  }

  return queries;
}

async function searchPlace(
  shopName: string,
  address: string,
  cityName: string,
  state: string,
  latitude?: number,
  longitude?: number,
): Promise<PlaceResult | null> {
  const queries = buildQueries(shopName, address, cityName, state);

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    try {
      const body: Record<string, any> = {
        textQuery: query,
        maxResultCount: 1,
      };

      // Add location bias if we have coordinates (improves accuracy)
      if (latitude && longitude && latitude !== 0) {
        body.locationBias = {
          circle: {
            center: { latitude, longitude },
            radius: 5000.0,
          },
        };
      }

      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_API_KEY!,
            "X-Goog-FieldMask":
              "places.id,places.rating,places.userRatingCount,places.displayName",
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        const text = await response.text();
        if (response.status === 429) {
          console.log("    Rate limited, waiting 30s...");
          await sleep(30000);
          // Retry same query
          i--;
          continue;
        }
        // Log error only on first query attempt
        if (i === 0) {
          console.log(
            `    API error ${response.status}: ${text.slice(0, 150)}`,
          );
        }
        continue; // Try next query
      }

      const data = await response.json();
      const place = data.places?.[0];
      if (!place || !place.rating) {
        continue; // Try next query
      }

      return {
        placeId: place.id || "",
        rating: place.rating,
        reviewCount: place.userRatingCount || 0,
      };
    } catch (err: any) {
      if (i === 0) console.log(`    Fetch error: ${err.message}`);
      continue;
    }
  }

  return null;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Load Squire data for shop-level lat/lng
  let squireCoords = new Map<string, { lat: number; lng: number }>();
  try {
    const squireRaw = readFileSync(resolve(__dirname, "squire-data.json"), "utf-8");
    const squireData = JSON.parse(squireRaw);
    for (const city of squireData) {
      for (const shop of city.shops) {
        if (shop.latitude && shop.longitude) {
          squireCoords.set(shop.slug, { lat: shop.latitude, lng: shop.longitude });
        }
      }
    }
    console.log(`Loaded ${squireCoords.size} shop coordinates from Squire data`);
  } catch {
    console.log("No squire-data.json found, will use city coordinates only");
  }

  // Fetch all shops
  const { data: shops, error } = await supabase
    .from("shops")
    .select(`
      id, slug, name, address, google_place_id,
      cities!inner ( name, state, latitude, longitude )
    `)
    .order("slug");

  if (error || !shops) {
    console.error("Failed to fetch shops:", error?.message);
    process.exit(1);
  }

  // Check which shops already have Google reviews
  const { data: existingReviews } = await supabase
    .from("review_sources")
    .select("shop_id")
    .eq("platform", "google");

  const hasGoogle = new Set((existingReviews || []).map((r: any) => r.shop_id));

  const shopsToProcess = shops.filter((s: any) => !hasGoogle.has(s.id));
  console.log(
    `Found ${shops.length} total shops, ${shopsToProcess.length} need Google ratings\n`,
  );

  let found = 0;
  let notFound = 0;
  let errors = 0;

  for (let i = 0; i < shopsToProcess.length; i++) {
    const shop: any = shopsToProcess[i];
    const city = shop.cities;
    const cityName = city?.name || "";
    const state = city?.state || "";

    // Get best available coordinates (shop-level from Squire, fallback to city)
    const coords = squireCoords.get(shop.slug);
    const lat = coords?.lat || city?.latitude || 0;
    const lng = coords?.lng || city?.longitude || 0;

    console.log(
      `[${i + 1}/${shopsToProcess.length}] ${shop.name} (${cityName})`,
    );

    // Rate limit: ~2 req/sec
    await sleep(500);

    const result = await searchPlace(shop.name, shop.address || "", cityName, state, lat, lng);

    if (!result || result.rating === 0) {
      console.log("    ✗ Not found or no rating");
      notFound++;
      continue;
    }

    console.log(
      `    ✓ Rating: ${result.rating}, Reviews: ${result.reviewCount}`,
    );
    found++;

    // Upsert Google review source
    const { error: revErr } = await supabase.from("review_sources").upsert(
      {
        shop_id: shop.id,
        platform: "google",
        rating: result.rating,
        review_count: result.reviewCount,
      },
      { onConflict: "shop_id,platform", ignoreDuplicates: false },
    );
    if (revErr) {
      console.log(`    ⚠ review_sources error: ${revErr.message}`);
      errors++;
    }

    // Save google_place_id on the shop if we don't have one
    if (result.placeId && !shop.google_place_id) {
      await supabase
        .from("shops")
        .update({ google_place_id: result.placeId })
        .eq("id", shop.id);
    }

    // Progress save every 50
    if ((i + 1) % 50 === 0) {
      console.log(`\n--- Progress: ${found} found, ${notFound} not found, ${errors} errors ---\n`);
    }
  }

  console.log(`\nDone!`);
  console.log(`  Found:     ${found}`);
  console.log(`  Not found: ${notFound}`);
  console.log(`  Errors:    ${errors}`);
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
