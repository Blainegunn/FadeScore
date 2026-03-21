/**
 * Seed script — migrates existing TypeScript data into Supabase.
 * Run: npx tsx scripts/seed.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Import existing data ───────────────────────────────────────────
// We use dynamic imports with ts paths resolved at runtime via tsx

async function main() {
  console.log("Starting seed...");

  // Dynamically import the data modules
  const { CITIES } = await import("../src/data/cities-static");
  const { CITY_COORDINATES } = await import("../src/data/city-coordinates");
  const { REAL_BARBERS } = await import("../src/data/real-barbers");

  // ── 1. Seed cities ─────────────────────────────────────────────
  console.log(`Seeding ${CITIES.length} cities...`);

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

  const cityIdMap = new Map<string, string>();

  for (const city of CITIES) {
    const coords = CITY_COORDINATES[city.slug];
    const { data, error } = await supabase
      .from("cities")
      .upsert({
        slug: city.slug,
        name: city.name,
        state: city.state,
        state_abbr: STATE_ABBRS[city.state] ?? null,
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
      }, { onConflict: "slug" })
      .select("id, slug")
      .single();

    if (error) {
      console.error(`  City "${city.slug}" error:`, error.message);
    } else if (data) {
      cityIdMap.set(city.slug, data.id);
    }
  }
  console.log(`  Inserted ${cityIdMap.size} cities`);

  // ── 2. Seed shops + barbers ────────────────────────────────────
  let shopCount = 0;
  let barberCount = 0;
  const shopIdMap = new Map<string, string>();

  for (const [citySlug, barbers] of Object.entries(REAL_BARBERS)) {
    const cityId = cityIdMap.get(citySlug);
    if (!cityId) {
      console.warn(`  No city ID for "${citySlug}", skipping ${barbers.length} barbers`);
      continue;
    }

    // Group barbers by shop
    const shopGroups = new Map<string, typeof barbers>();
    for (const b of barbers) {
      const group = shopGroups.get(b.shopSlug) || [];
      group.push(b);
      shopGroups.set(b.shopSlug, group);
    }

    for (const [shopSlug, shopBarbers] of shopGroups) {
      const first = shopBarbers[0];
      const avgPrice = Math.round(shopBarbers.reduce((s, b) => s + b.avgPrice, 0) / shopBarbers.length);
      const fadeScore = Number((shopBarbers.reduce((s, b) => s + b.fadeScore, 0) / shopBarbers.length).toFixed(1));

      // Upsert shop
      const { data: shopData, error: shopErr } = await supabase
        .from("shops")
        .upsert({
          slug: shopSlug,
          name: first.shopName,
          city_id: cityId,
          address: first.address ?? null,
          phone: first.phone ?? null,
          instagram: first.instagram ?? null,
          website: first.website ?? null,
          avg_price: avgPrice,
          fade_score: fadeScore,
        }, { onConflict: "slug" })
        .select("id")
        .single();

      if (shopErr) {
        console.error(`  Shop "${shopSlug}" error:`, shopErr.message);
        continue;
      }

      const shopId = shopData!.id;
      shopIdMap.set(shopSlug, shopId);
      shopCount++;

      // Insert review sources for the shop
      if (first.reviews && first.reviews.length > 0) {
        for (const review of first.reviews) {
          await supabase
            .from("review_sources")
            .upsert({
              shop_id: shopId,
              platform: review.platform,
              rating: review.rating,
              review_count: review.reviewCount,
            }, { onConflict: "shop_id,platform", ignoreDuplicates: true })
            .select();
        }
      }

      // Insert barbers
      for (const b of shopBarbers) {
        const { error: barberErr } = await supabase
          .from("barbers")
          .upsert({
            slug: b.slug,
            name: b.name,
            shop_id: shopId,
            fade_score: b.fadeScore,
            review_count: b.reviewCount,
            avg_price: b.avgPrice,
            specialties: b.specialties ?? [],
            hair_types: b.hairTypes ?? [],
            cut_types: b.cutTypes ?? [],
            is_hidden_gem: b.isHiddenGem ?? false,
            is_cheap: b.isCheap ?? false,
          }, { onConflict: "slug" });

        if (barberErr) {
          console.error(`  Barber "${b.slug}" error:`, barberErr.message);
        } else {
          barberCount++;
        }
      }
    }
  }

  console.log(`Seeded ${shopCount} shops, ${barberCount} barbers`);
  console.log("Done!");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
