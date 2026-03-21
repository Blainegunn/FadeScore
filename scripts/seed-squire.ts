/**
 * Seed Squire data into Supabase.
 * Reads scripts/squire-data.json (output from scrape-squire.ts) and inserts
 * cities, shops, barbers, and review_sources.
 *
 * Usage: npx tsx scripts/seed-squire.ts
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

config({ path: resolve(process.cwd(), ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

// ── Types ────────────────────────────────────────────────────────────────────

interface SquireShop {
  name: string;
  slug: string;
  address: string;
  phone: string;
  website: string;
  instagram: string;
  rating: number;
  reviewCount: number;
  barberCount: number;
  latitude: number;
  longitude: number;
  barbers: { name: string; rating: number; reviewCount: number }[];
  services: { name: string; price: number; duration: number }[];
}

interface SquireCityData {
  citySlug: string;
  cityName: string;
  state: string;
  shops: SquireShop[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATE_ABBRS: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", "District of Columbia": "DC",
  Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID", Illinois: "IL",
  Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA",
  Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI", Minnesota: "MN",
  Mississippi: "MS", Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK",
  Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT",
  Virginia: "VA", Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
};

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Estimate avg price from service names. Falls back to $35. */
function estimateAvgPrice(services: SquireShop["services"]): number {
  // Look for haircut-related services
  const haircutKeywords = ["fade", "cut", "haircut", "trim", "buzz", "taper", "lineup"];
  const haircutServices = services.filter((s) =>
    haircutKeywords.some((kw) => s.name.toLowerCase().includes(kw))
  );
  const priced = (haircutServices.length > 0 ? haircutServices : services).filter(
    (s) => s.price > 0 && s.price < 200
  );
  if (priced.length === 0) return 35;
  return Math.round(priced.reduce((sum, s) => sum + s.price, 0) / priced.length);
}

/** Determine if shop is a hidden gem: rating >= 4.8, estimated price <= 30 */
function isHiddenGem(rating: number, avgPrice: number): boolean {
  return rating >= 4.8 && avgPrice <= 30;
}

/** Determine if shop is cheap: estimated price <= 25 */
function isCheap(avgPrice: number): boolean {
  return avgPrice <= 25;
}

/** Infer cut types from service names */
function inferCutTypes(services: SquireShop["services"]): string[] {
  const types: Set<string> = new Set();
  for (const s of services) {
    const n = s.name.toLowerCase();
    if (n.includes("skin fade")) types.add("skin-fade");
    if (n.includes("taper") && n.includes("fade")) types.add("taper-fade");
    if (n.includes("razor fade")) types.add("razor-fade");
    if (n.includes("lineup") || n.includes("line up") || n.includes("edge up")) types.add("lineup");
    if (n.includes("beard")) types.add("beard");
    if (n.includes("design") || n.includes("pattern")) types.add("designs");
    if (n.includes("loc") || n.includes("dread")) types.add("locs");
    if (n.includes("braid")) types.add("braids");
    if (n.includes("straight razor") || n.includes("hot shave")) types.add("straight-razor");
    if (n.includes("classic")) types.add("classic-cut");
    if (n.includes("styl")) types.add("styling");
    if (n.includes("color") || n.includes("dye") || n.includes("bleach")) types.add("colors");
    if (n.includes("precision")) types.add("precision-cut");
    // Generic fade → skin-fade
    if (n.includes("fade") && !types.has("skin-fade") && !types.has("taper-fade") && !types.has("razor-fade")) {
      types.add("skin-fade");
    }
  }
  return [...types];
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const dataPath = resolve(__dirname, "squire-data.json");
  const raw = readFileSync(dataPath, "utf-8");
  const cities: SquireCityData[] = JSON.parse(raw);

  console.log(`Loaded ${cities.length} cities from squire-data.json`);

  let cityCount = 0;
  let shopCount = 0;
  let barberCount = 0;
  let skippedShops = 0;

  for (const city of cities) {
    // 1. Upsert city
    const { data: cityData, error: cityErr } = await supabase
      .from("cities")
      .upsert(
        {
          slug: city.citySlug,
          name: city.cityName,
          state: city.state,
          state_abbr: STATE_ABBRS[city.state] ?? null,
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (cityErr || !cityData) {
      console.error(`City "${city.citySlug}" error:`, cityErr?.message);
      continue;
    }

    const cityId = cityData.id;
    cityCount++;

    // 2. Insert shops
    for (const shop of city.shops) {
      // Skip shops with no name
      if (!shop.name) continue;

      const shopSlug = shop.slug || toSlug(`${shop.name}-${city.citySlug}`);
      const avgPrice = estimateAvgPrice(shop.services);
      const fadeScore = shop.rating > 0 ? Math.min(shop.rating, 5.0) : null;
      const cutTypes = inferCutTypes(shop.services);

      // Upsert shop
      const { data: shopData, error: shopErr } = await supabase
        .from("shops")
        .upsert(
          {
            slug: shopSlug,
            name: shop.name,
            city_id: cityId,
            address: shop.address || null,
            phone: shop.phone && shop.phone !== "5555555555" ? shop.phone : null,
            instagram: shop.instagram || null,
            website: shop.website || null,
            avg_price: avgPrice,
            fade_score: fadeScore,
            booking_url: `https://getsquire.com/discover/barbershop/${shop.slug}`,
          },
          { onConflict: "slug" }
        )
        .select("id")
        .single();

      if (shopErr || !shopData) {
        // Could be a duplicate slug collision — try with city suffix
        if (shopErr?.message?.includes("duplicate")) {
          skippedShops++;
        } else {
          console.error(`  Shop "${shopSlug}" error:`, shopErr?.message);
        }
        continue;
      }

      const shopId = shopData.id;
      shopCount++;

      // 3. Insert review source (Squire platform)
      if (shop.rating > 0 && shop.reviewCount > 0) {
        await supabase.from("review_sources").upsert(
          {
            shop_id: shopId,
            platform: "squire",
            rating: shop.rating,
            review_count: shop.reviewCount,
          },
          { onConflict: "shop_id,platform", ignoreDuplicates: true }
        );
      }

      // 4. Create barber entries
      if (shop.barbers && shop.barbers.length > 0) {
        // We have individual barber names from detail pages
        for (const b of shop.barbers) {
          if (!b.name) continue;
          const barberSlug = toSlug(`${b.name}-${shopSlug}`);
          const { error: bErr } = await supabase.from("barbers").upsert(
            {
              slug: barberSlug,
              name: b.name,
              shop_id: shopId,
              fade_score: fadeScore,
              review_count: b.reviewCount || shop.reviewCount,
              avg_price: avgPrice,
              specialties: [],
              hair_types: ["all"],
              cut_types: cutTypes,
              is_hidden_gem: isHiddenGem(shop.rating, avgPrice),
              is_cheap: isCheap(avgPrice),
            },
            { onConflict: "slug" }
          );
          if (!bErr) barberCount++;
        }
      } else {
        // No individual barbers — create one entry using shop name
        const barberSlug = toSlug(`team-${shopSlug}`);
        const { error: bErr } = await supabase.from("barbers").upsert(
          {
            slug: barberSlug,
            name: `${shop.name} Team`,
            shop_id: shopId,
            fade_score: fadeScore,
            review_count: shop.reviewCount,
            avg_price: avgPrice,
            specialties: [],
            hair_types: ["all"],
            cut_types: cutTypes,
            is_hidden_gem: isHiddenGem(shop.rating, avgPrice),
            is_cheap: isCheap(avgPrice),
          },
          { onConflict: "slug" }
        );
        if (!bErr) barberCount++;
      }
    }
  }

  console.log(`\nDone!`);
  console.log(`  Cities: ${cityCount}`);
  console.log(`  Shops:  ${shopCount} (${skippedShops} skipped duplicates)`);
  console.log(`  Barbers: ${barberCount}`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
