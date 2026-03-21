/**
 * Upload Squire data to Supabase — populates cities, shops, barbers, review_sources.
 *
 * Usage: npx tsx scripts/upload-to-supabase.ts
 * Input: scripts/squire-data.json
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import * as fs from "fs";
import * as path from "path";
import { createClient } from "@supabase/supabase-js";

// ─── Load .env.local ────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env.local not found");
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx);
    const value = trimmed.slice(eqIdx + 1);
    process.env[key] = value;
  }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Types (mirrors scraper output) ─────────────────────────────────────────

interface SquireBarber {
  name: string;
  rating: number;
  reviewCount: number;
}

interface SquireService {
  name: string;
  price: number;
  duration: number;
}

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
  barbers: SquireBarber[];
  services: SquireService[];
}

interface SquireCityData {
  citySlug: string;
  cityName: string;
  state: string;
  shops: SquireShop[];
}

// ─── Helpers ────────────────────────────────────────────────────────────────

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
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Filter to haircut-type services, return median price */
function computeAvgPrice(services: SquireService[]): number {
  const haircutKeywords = [
    "haircut", "cut", "fade", "taper", "lineup", "line up", "trim",
    "buzz", "clipper", "scissor", "shape up", "kids", "child",
    "men", "regular", "classic", "precision", "executive",
  ];
  const excludeKeywords = [
    "beard only", "wax", "color", "dye", "perm", "straighten",
    "treatment", "wash only", "shampoo only", "eyebrow", "nose", "ear",
  ];

  const haircutServices = services.filter((s) => {
    const name = s.name.toLowerCase();
    if (s.price <= 0) return false;
    if (excludeKeywords.some((kw) => name.includes(kw))) return false;
    return haircutKeywords.some((kw) => name.includes(kw));
  });

  if (haircutServices.length === 0) {
    const priced = services.filter((s) => s.price > 0);
    if (priced.length === 0) return 35;
    const prices = priced.map((s) => s.price).sort((a, b) => a - b);
    return prices[Math.floor(prices.length / 2)];
  }

  const prices = haircutServices.map((s) => s.price).sort((a, b) => a - b);
  return prices[Math.floor(prices.length / 2)];
}

/** Derive specialties from service names */
function deriveSpecialties(services: SquireService[]): string[] {
  const specialties = new Set<string>();
  const joined = services.map((s) => s.name.toLowerCase()).join(" ");

  if (/fade|skin fade|bald fade|taper fade|drop fade/.test(joined)) specialties.add("Fades");
  if (/taper/.test(joined)) specialties.add("Tapers");
  if (/beard|goatee/.test(joined)) specialties.add("Beard Trim");
  if (/line.?up|shape.?up|edge.?up/.test(joined)) specialties.add("Line Up");
  if (/razor/.test(joined)) specialties.add("Razor Fade");
  if (/design|pattern|art/.test(joined)) specialties.add("Designs");
  if (/classic|scissor|traditional/.test(joined)) specialties.add("Classic Cuts");
  if (/kid|child|boy/.test(joined)) specialties.add("Kids Cuts");
  if (/color|dye|bleach/.test(joined)) specialties.add("Color");
  if (/loc|dread/.test(joined)) specialties.add("Locs");
  if (/braid/.test(joined)) specialties.add("Braids");
  if (/straight.?razor|hot.?towel|shave/.test(joined)) specialties.add("Straight Razor");

  if (specialties.size === 0) {
    specialties.add("Fades");
    specialties.add("Classic Cuts");
  }

  return Array.from(specialties).slice(0, 4);
}

// ─── Upload Logic ───────────────────────────────────────────────────────────

async function upsertCity(city: SquireCityData): Promise<string | null> {
  const { data, error } = await supabase
    .from("cities")
    .upsert(
      {
        slug: city.citySlug,
        name: city.cityName,
        state: city.state,
        state_abbr: STATE_ABBRS[city.state] || null,
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single();

  if (error) {
    console.error(`  ❌ City upsert failed for ${city.citySlug}:`, error.message);
    return null;
  }
  return data.id;
}

async function upsertShop(
  shop: SquireShop,
  cityId: string,
  citySlug: string
): Promise<string | null> {
  const shopSlug = `${shop.slug}-${citySlug}`;
  const avgPrice = computeAvgPrice(shop.services);

  const { data, error } = await supabase
    .from("shops")
    .upsert(
      {
        slug: shopSlug,
        name: shop.name,
        address: shop.address || null,
        phone: shop.phone || null,
        instagram: shop.instagram || null,
        website: shop.website || null,
        avg_price: avgPrice,
        fade_score: shop.rating || 0,
        city_id: cityId,
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single();

  if (error) {
    console.error(`  ❌ Shop upsert failed for ${shopSlug}:`, error.message);
    return null;
  }
  return data.id;
}

async function upsertReviewSource(shopId: string, shop: SquireShop): Promise<void> {
  if (!shop.rating && !shop.reviewCount) return;

  const { error } = await supabase.from("review_sources").upsert(
    {
      shop_id: shopId,
      platform: "squire",
      rating: shop.rating,
      review_count: shop.reviewCount,
    },
    { onConflict: "shop_id,platform" }
  );

  if (error) {
    console.error(`  ⚠ Review source upsert failed:`, error.message);
  }
}

async function upsertBarbers(
  shop: SquireShop,
  shopId: string,
  citySlug: string
): Promise<number> {
  const avgPrice = computeAvgPrice(shop.services);
  const specialties = deriveSpecialties(shop.services);

  // If shop has no individual barbers, create one entry for the shop itself
  const barbers =
    shop.barbers.length > 0
      ? shop.barbers
      : [{ name: shop.name, rating: shop.rating, reviewCount: shop.reviewCount }];

  let count = 0;

  for (const barber of barbers) {
    const barberSlug = `${toSlug(barber.name)}-${shop.slug}-${citySlug}`;
    const fadeScore = barber.rating || shop.rating;
    const isHiddenGem = fadeScore >= 4.8 && avgPrice <= 30;
    const isCheap = avgPrice <= 25;

    const { error } = await supabase.from("barbers").upsert(
      {
        slug: barberSlug,
        name: barber.name,
        fade_score: fadeScore,
        review_count: barber.reviewCount || 0,
        avg_price: avgPrice,
        specialties,
        hair_types: [],
        cut_types: [],
        is_hidden_gem: isHiddenGem,
        is_cheap: isCheap,
        shop_id: shopId,
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error(`  ⚠ Barber upsert failed for ${barberSlug}:`, error.message);
    } else {
      count++;
    }
  }

  return count;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const dataPath = path.join(__dirname, "squire-data.json");
  if (!fs.existsSync(dataPath)) {
    console.error("❌ squire-data.json not found. Run scrape-squire.ts first.");
    process.exit(1);
  }

  const raw = fs.readFileSync(dataPath, "utf-8");
  const allCities: SquireCityData[] = JSON.parse(raw);

  console.log(`📦 Loaded ${allCities.length} cities from squire-data.json\n`);

  // Filter to cities with >= 3 shops
  const validCities = allCities.filter((c) => c.shops.length >= 3);
  console.log(`✅ ${validCities.length} cities have ≥ 3 shops\n`);

  let totalShops = 0;
  let totalBarbers = 0;
  let citiesUploaded = 0;

  for (const city of validCities) {
    console.log(`\n📍 ${city.cityName}, ${city.state} (${city.shops.length} shops)`);

    // 1. Upsert city
    const cityId = await upsertCity(city);
    if (!cityId) continue;
    console.log(`  ✓ City: ${city.citySlug} (id: ${cityId})`);

    // 2. Upsert shops + barbers + review sources
    for (const shop of city.shops) {
      const shopId = await upsertShop(shop, cityId, city.citySlug);
      if (!shopId) continue;

      await upsertReviewSource(shopId, shop);
      const barberCount = await upsertBarbers(shop, shopId, city.citySlug);

      totalShops++;
      totalBarbers += barberCount;
      console.log(
        `  ✓ ${shop.name}: ${barberCount} barbers, rating ${shop.rating}, $${computeAvgPrice(shop.services)}`
      );
    }

    citiesUploaded++;
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`✅ Upload complete!`);
  console.log(`   Cities: ${citiesUploaded}`);
  console.log(`   Shops:  ${totalShops}`);
  console.log(`   Barbers: ${totalBarbers}`);
}

main().catch(console.error);
