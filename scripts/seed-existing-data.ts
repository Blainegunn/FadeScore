/**
 * Seeds existing hand-curated barber data into Supabase.
 *
 * Prerequisites:
 *   1. Tables created (run create-tables.sql in Supabase SQL Editor)
 *   2. JSON exported: npx tsx --tsconfig tsconfig.scripts.json scripts/export-barbers-json.ts
 *
 * Usage: npx tsx scripts/seed-existing-data.ts
 */

import * as fs from "fs";
import * as path from "path";
import { createClient } from "@supabase/supabase-js";

// ─── Load .env.local ────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env.local");
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    process.env[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
  }
}

loadEnv();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── State abbreviation lookup ──────────────────────────────────────────────

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

// ─── Types ──────────────────────────────────────────────────────────────────

interface ReviewSource {
  platform: string;
  rating: number;
  reviewCount: number;
}

interface BarberData {
  id: string;
  name: string;
  slug: string;
  city: string;
  citySlug: string;
  state: string;
  shopName: string;
  shopSlug: string;
  fadeScore: number;
  reviewCount: number;
  avgPrice: number;
  specialties: string[];
  hairTypes?: string[];
  cutTypes?: string[];
  isHiddenGem?: boolean;
  isCheap?: boolean;
  address?: string;
  phone?: string;
  instagram?: string;
  website?: string;
  reviews?: ReviewSource[];
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const jsonPath = path.join(__dirname, "real-barbers.json");
  if (!fs.existsSync(jsonPath)) {
    console.error("❌ real-barbers.json not found. Run export-barbers-json.ts first:");
    console.error("   npx tsx --tsconfig tsconfig.scripts.json scripts/export-barbers-json.ts");
    process.exit(1);
  }

  const realBarbers: Record<string, BarberData[]> = JSON.parse(
    fs.readFileSync(jsonPath, "utf-8")
  );

  const citySlugs = Object.keys(realBarbers);
  console.log(`📦 Loaded ${citySlugs.length} cities, seeding into Supabase...\n`);

  let totalShops = 0;
  let totalBarbers = 0;

  for (const citySlug of citySlugs) {
    const barbers = realBarbers[citySlug];
    if (!barbers || barbers.length === 0) continue;

    const firstBarber = barbers[0];
    const cityName = firstBarber.city;
    const state = firstBarber.state;

    console.log(`📍 ${cityName}, ${state} (${barbers.length} barbers)`);

    // 1. Upsert city
    const { data: cityData, error: cityErr } = await supabase
      .from("cities")
      .upsert(
        {
          slug: citySlug,
          name: cityName,
          state: state,
          state_abbr: STATE_ABBRS[state] || null,
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (cityErr || !cityData) {
      console.error(`  ❌ City upsert failed:`, cityErr?.message);
      continue;
    }

    // 2. Group barbers by shop
    const shopMap = new Map<string, BarberData[]>();
    for (const b of barbers) {
      if (!shopMap.has(b.shopSlug)) shopMap.set(b.shopSlug, []);
      shopMap.get(b.shopSlug)!.push(b);
    }

    for (const [shopSlug, shopBarbers] of shopMap) {
      const rep = shopBarbers[0];

      // 3. Upsert shop
      const { data: shopData, error: shopErr } = await supabase
        .from("shops")
        .upsert(
          {
            slug: shopSlug,
            name: rep.shopName,
            address: rep.address || null,
            phone: rep.phone || null,
            instagram: rep.instagram || null,
            website: rep.website || null,
            avg_price: rep.avgPrice,
            fade_score: Math.max(...shopBarbers.map((b) => b.fadeScore)),
            city_id: cityData.id,
          },
          { onConflict: "slug" }
        )
        .select("id")
        .single();

      if (shopErr || !shopData) {
        console.error(`  ❌ Shop upsert failed for ${shopSlug}:`, shopErr?.message);
        continue;
      }

      // 4. Upsert review sources
      if (rep.reviews && rep.reviews.length > 0) {
        for (const review of rep.reviews) {
          await supabase.from("review_sources").upsert(
            {
              shop_id: shopData.id,
              platform: review.platform,
              rating: review.rating,
              review_count: review.reviewCount,
            },
            { onConflict: "shop_id,platform" }
          );
        }
      }

      // 5. Upsert barbers
      for (const barber of shopBarbers) {
        const { error: barberErr } = await supabase.from("barbers").upsert(
          {
            slug: barber.slug,
            name: barber.name,
            fade_score: barber.fadeScore,
            review_count: barber.reviewCount,
            avg_price: barber.avgPrice,
            specialties: barber.specialties || [],
            hair_types: barber.hairTypes || [],
            cut_types: barber.cutTypes || [],
            is_hidden_gem: barber.isHiddenGem || false,
            is_cheap: barber.isCheap || false,
            shop_id: shopData.id,
          },
          { onConflict: "slug" }
        );

        if (barberErr) {
          console.error(`  ⚠ Barber failed: ${barber.slug}: ${barberErr.message}`);
        } else {
          totalBarbers++;
        }
      }

      totalShops++;
      console.log(`  ✓ ${rep.shopName}: ${shopBarbers.length} barbers`);
    }
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`✅ Seed complete!`);
  console.log(`   Cities:  ${citySlugs.length}`);
  console.log(`   Shops:   ${totalShops}`);
  console.log(`   Barbers: ${totalBarbers}`);
}

main().catch(console.error);
