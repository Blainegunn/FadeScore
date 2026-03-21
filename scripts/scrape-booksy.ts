/**
 * Booksy Scraper — Fetches shop/barber data from Booksy pages and updates
 * existing FadeScore records in Supabase.
 *
 * Usage:
 *   npx tsx scripts/scrape-booksy.ts                              # batch from config
 *   npx tsx scripts/scrape-booksy.ts --url "..." --shop-slug "..."  # single
 *   npx tsx scripts/scrape-booksy.ts --dry-run                      # preview only
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

config({ path: resolve(process.cwd(), ".env.local") });

// ── CLI args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const urlIdx = args.indexOf("--url");
const slugIdx = args.indexOf("--shop-slug");
const singleUrl = urlIdx !== -1 ? args[urlIdx + 1] : null;
const singleSlug = slugIdx !== -1 ? args[slugIdx + 1] : null;

if ((singleUrl && !singleSlug) || (!singleUrl && singleSlug)) {
  console.error("Must provide both --url and --shop-slug together");
  process.exit(1);
}

// ── Supabase client ─────────────────────────────────────────────────────────

const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!dryRun && (!sbUrl || !sbKey)) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const supabase = sbUrl && sbKey ? createClient(sbUrl, sbKey) : null;

// ── Types ───────────────────────────────────────────────────────────────────

interface BooksyService {
  name: string;
  price: number;
  duration: number;
}

interface BooksyData {
  name: string;
  address: string;
  phone: string;
  website: string;
  instagram: string;
  email: string;
  rating: number;
  reviewCount: number;
  services: BooksyService[];
  staff: string[];
  bookingUrl: string;
}

interface ConfigEntry {
  booksyUrl: string;
  shopSlug: string;
}

// ── Helpers (duplicated from seed-squire.ts — scripts can't import src/) ────

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function estimateAvgPrice(services: BooksyService[]): number {
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

function inferCutTypes(services: BooksyService[]): string[] {
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
    if (n.includes("fade") && !types.has("skin-fade") && !types.has("taper-fade") && !types.has("razor-fade")) {
      types.add("skin-fade");
    }
  }
  return [...types];
}

function isHiddenGem(rating: number, avgPrice: number): boolean {
  return rating >= 4.8 && avgPrice <= 30;
}

function isCheap(avgPrice: number): boolean {
  return avgPrice <= 25;
}

// FadeScore calculation (duplicated from src/lib/fadescore.ts)
interface ReviewInput {
  platform: string;
  rating: number;
  reviewCount: number;
}

const PLATFORM_WEIGHTS: Record<string, number> = {
  google: 0.5,
  yelp: 0.3,
  facebook: 0.1,
  booksy: 0.05,
  squire: 0.05,
};

function calculateFadeScore(
  reviews: ReviewInput[],
  avgPrice: number,
  cityAvgPrice: number
): number {
  if (reviews.length === 0) return 0;

  let totalWeight = 0;
  let weightedSum = 0;
  for (const r of reviews) {
    const weight = PLATFORM_WEIGHTS[r.platform] ?? 0.1;
    weightedSum += r.rating * weight;
    totalWeight += weight;
  }
  const weightedAvgRating = totalWeight > 0 ? weightedSum / totalWeight : 0;

  const totalReviews = reviews.reduce((sum, r) => sum + r.reviewCount, 0);
  const reviewVolumeScore = Math.min(5, Math.log2(Math.max(1, totalReviews)) * 0.5);

  const effectiveCityAvg = cityAvgPrice > 0 ? cityAvgPrice : 35;
  const priceRatio = effectiveCityAvg / Math.max(avgPrice, 1);
  const priceValueScore = Math.min(5, Math.max(0, priceRatio * 2.5));

  const fadeScore = weightedAvgRating * 0.6 + reviewVolumeScore * 0.2 + priceValueScore * 0.2;
  return Math.round(fadeScore * 10) / 10;
}

// ── Fetch ───────────────────────────────────────────────────────────────────

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!response.ok) {
      console.log(`  HTTP ${response.status} for ${url}`);
      return null;
    }
    return await response.text();
  } catch (err: any) {
    console.log(`  Fetch error for ${url}: ${err.message}`);
    return null;
  }
}

// ── Parse ───────────────────────────────────────────────────────────────────

/**
 * Extract the window.__NUXT__ payload from Booksy's Nuxt.js SSR HTML.
 * The payload is a self-executing function: window.__NUXT__=(function(a,b,...){return {...}}(val1,val2,...))
 * We evaluate it to get the hydrated state object.
 */
function extractNuxtData(html: string): any | null {
  const match = html.match(/window\.__NUXT__\s*=\s*(\(function\(.+?\)\s*\{[\s\S]+?\}\(.+?\)\))/);
  if (!match) return null;

  try {
    // Evaluate the self-executing function to get the data object
    const fn = new Function(`return ${match[1]}`);
    return fn();
  } catch (err: any) {
    console.log(`  Warning: Failed to eval __NUXT__ payload: ${err.message}`);
    return null;
  }
}

/**
 * Recursively search a nested object for a value matching a predicate.
 * Booksy's __NUXT__ state structure varies, so we search broadly.
 */
function deepFind(obj: any, predicate: (val: any) => boolean, maxDepth = 8): any | null {
  if (maxDepth <= 0 || obj == null) return null;
  if (predicate(obj)) return obj;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = deepFind(item, predicate, maxDepth - 1);
      if (result) return result;
    }
  } else if (typeof obj === "object") {
    for (const val of Object.values(obj)) {
      const result = deepFind(val, predicate, maxDepth - 1);
      if (result) return result;
    }
  }
  return null;
}


function parseBooksyPage(html: string, url: string): BooksyData {
  const data: BooksyData = {
    name: "",
    address: "",
    phone: "",
    website: "",
    instagram: "",
    email: "",
    rating: 0,
    reviewCount: 0,
    services: [],
    staff: [],
    bookingUrl: url,
  };

  // Strategy 1: Parse __NUXT__ payload (Booksy is a Nuxt.js app)
  const nuxt = extractNuxtData(html);

  if (nuxt) {
    // Find the venue/business object — has service_categories and reviews_count
    const venue = deepFind(
      nuxt,
      (v) => v && typeof v === "object" && "service_categories" in v && "reviews_count" in v
    );

    if (venue) {
      data.name = venue.name || venue.umbrella_venue_name || "";
      data.phone = (venue.phone || venue.phone_number || "").replace(/[^\d]/g, "");
      data.email = venue.public_email || venue.email || "";
      data.rating = parseFloat(venue.reviews_stars) || 0;
      data.reviewCount = parseInt(venue.reviews_count) || 0;

      // Address — nested under venue.location
      const loc = venue.location;
      if (loc) {
        if (typeof loc.address === "string") {
          data.address = loc.address;
        } else if (loc.city) {
          data.address = [loc.street, loc.city, loc.state, loc.zip].filter(Boolean).join(", ");
        }
      } else if (venue.address) {
        const parts = [venue.address, venue.city, venue.state, venue.zip_code].filter(Boolean);
        data.address = parts.join(", ");
      }

      // Instagram
      if (venue.instagram_link && typeof venue.instagram_link === "string") {
        const igMatch = venue.instagram_link.match(/instagram\.com\/([^/?]+)/);
        data.instagram = igMatch ? igMatch[1] : venue.instagram_link;
      }

      // Website
      if (venue.website && typeof venue.website === "string") {
        data.website = venue.website;
      }

      // Services from service_categories
      if (Array.isArray(venue.service_categories)) {
        for (const cat of venue.service_categories) {
          const services = cat.services || cat.items || [];
          if (Array.isArray(services)) {
            for (const svc of services) {
              const variants = svc.variants || [];
              const firstVariant = Array.isArray(variants) && variants.length > 0 ? variants[0] : null;
              // Price: Booksy stores prices in cents (e.g., 4000 = $40.00)
              let price = 0;
              if (firstVariant) {
                const rawPrice = firstVariant.price ?? firstVariant.cost ?? svc.price ?? 0;
                price = typeof rawPrice === "number" && rawPrice > 200 ? rawPrice / 100 : rawPrice;
              } else {
                const rawPrice = svc.price ?? 0;
                price = typeof rawPrice === "number" && rawPrice > 200 ? rawPrice / 100 : rawPrice;
              }
              const duration = firstVariant?.duration ?? svc.duration ?? 0;
              if (svc.name) {
                data.services.push({
                  name: svc.name,
                  price: typeof price === "number" ? price : parseFloat(price) || 0,
                  duration: typeof duration === "number" ? duration : parseInt(duration) || 0,
                });
              }
            }
          }
        }
      }
    }

    // Staff — check venue.staff first, then search NUXT data
    const staffSource = (venue && Array.isArray(venue.staff)) ? venue.staff : null;
    const staffArr = staffSource || deepFind(
      nuxt,
      (v: any) => Array.isArray(v) && v.length > 0 && v[0] && typeof v[0] === "object" && ("display_name" in v[0] || "type" in v[0])
    );
    if (Array.isArray(staffArr)) {
      for (const s of staffArr) {
        const name = s.display_name || s.name || `${s.first_name || ""} ${s.last_name || ""}`.trim();
        if (name && s.active !== false) {
          data.staff.push(name);
        }
      }
    }
  }

  // Strategy 2: HTML fallbacks if __NUXT__ parsing didn't yield results

  // Name from <title>
  if (!data.name) {
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      data.name = titleMatch[1].replace(/\s*[-|].*Booksy.*$/i, "").trim();
    }
  }

  // Review count from HTML (e.g., "110 reviews")
  if (data.reviewCount === 0) {
    const reviewMatch = html.match(/(\d+)\s*reviews?\b/i);
    if (reviewMatch) data.reviewCount = parseInt(reviewMatch[1]) || 0;
  }

  // Phone from tel: links
  if (!data.phone) {
    const telMatch = html.match(/href="tel:\+?1?(\d{10})"/);
    if (telMatch) data.phone = telMatch[1];
  }

  return data;
}

// ── Supabase update ─────────────────────────────────────────────────────────

async function updateShopFromBooksy(shopSlug: string, data: BooksyData): Promise<void> {
  if (!supabase) {
    console.log("  [dry-run] Would update shop:", shopSlug);
    return;
  }

  // 1. Look up shop
  const { data: shop, error: shopErr } = await supabase
    .from("shops")
    .select("id, city_id, address, phone, website, booking_url, instagram, avg_price, fade_score")
    .eq("slug", shopSlug)
    .single();

  if (shopErr || !shop) {
    console.error(`  Shop "${shopSlug}" not found:`, shopErr?.message);
    return;
  }

  const shopId = shop.id;
  const cityId = shop.city_id;

  // 2. Update shop details — fill empty fields only
  const shopUpdates: Record<string, any> = {};
  if (!shop.address && data.address) shopUpdates.address = data.address;
  if (!shop.phone && data.phone) shopUpdates.phone = data.phone;
  if (!shop.website && data.website) shopUpdates.website = data.website;
  if (!shop.booking_url && data.bookingUrl) shopUpdates.booking_url = data.bookingUrl;
  if (!shop.instagram && data.instagram) shopUpdates.instagram = data.instagram;

  // Update avg_price from Booksy services
  const avgPrice = data.services.length > 0 ? estimateAvgPrice(data.services) : (shop.avg_price || 35);
  const cutTypes = inferCutTypes(data.services);

  if (data.services.length > 0) {
    shopUpdates.avg_price = avgPrice;
  }

  if (Object.keys(shopUpdates).length > 0) {
    const { error } = await supabase.from("shops").update(shopUpdates).eq("id", shopId);
    if (error) {
      console.error(`  Failed to update shop details:`, error.message);
    } else {
      console.log(`  Updated shop fields: ${Object.keys(shopUpdates).join(", ")}`);
    }
  }

  // 3. Upsert review source (Booksy platform)
  if (data.rating > 0 && data.reviewCount > 0) {
    const { error } = await supabase.from("review_sources").upsert(
      {
        shop_id: shopId,
        platform: "booksy",
        rating: data.rating,
        review_count: data.reviewCount,
        last_synced_at: new Date().toISOString(),
      },
      { onConflict: "shop_id,platform" }
    );
    if (error) {
      console.error(`  Failed to upsert review source:`, error.message);
    } else {
      console.log(`  Upserted Booksy review source: ${data.rating} (${data.reviewCount} reviews)`);
    }
  }

  // 4. Get existing barbers for this shop
  const { data: existingBarbers } = await supabase
    .from("barbers")
    .select("id, slug, name, cut_types, specialties, avg_price")
    .eq("shop_id", shopId);

  const existingBarberNames = new Set(
    (existingBarbers || []).map((b: any) => b.name.toLowerCase())
  );

  // 5. Update existing barbers — merge cut_types, update avg_price
  if (existingBarbers && existingBarbers.length > 0 && cutTypes.length > 0) {
    for (const barber of existingBarbers) {
      const existingCutTypes: string[] = barber.cut_types || [];
      const mergedCutTypes = [...new Set([...existingCutTypes, ...cutTypes])];

      const barberUpdates: Record<string, any> = {};
      if (mergedCutTypes.length > existingCutTypes.length) {
        barberUpdates.cut_types = mergedCutTypes;
      }
      if (data.services.length > 0) {
        barberUpdates.avg_price = avgPrice;
        barberUpdates.is_hidden_gem = isHiddenGem(data.rating || 0, avgPrice);
        barberUpdates.is_cheap = isCheap(avgPrice);
      }

      if (Object.keys(barberUpdates).length > 0) {
        const { error } = await supabase.from("barbers").update(barberUpdates).eq("id", barber.id);
        if (error) {
          console.error(`  Failed to update barber "${barber.name}":`, error.message);
        } else {
          console.log(`  Updated barber "${barber.name}": ${Object.keys(barberUpdates).join(", ")}`);
        }
      }
    }
  }

  // 6. Add new barbers from Booksy staff
  let newBarberCount = 0;
  for (const staffName of data.staff) {
    if (existingBarberNames.has(staffName.toLowerCase())) continue;

    const barberSlug = toSlug(`${staffName}-${shopSlug}`);
    const fadeScore = data.rating > 0 ? Math.min(data.rating, 5.0) : null;

    const { error } = await supabase.from("barbers").upsert(
      {
        slug: barberSlug,
        name: staffName,
        shop_id: shopId,
        fade_score: fadeScore,
        review_count: 0,
        avg_price: avgPrice,
        specialties: [],
        hair_types: ["all"],
        cut_types: cutTypes,
        is_hidden_gem: isHiddenGem(data.rating || 0, avgPrice),
        is_cheap: isCheap(avgPrice),
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error(`  Failed to add barber "${staffName}":`, error.message);
    } else {
      newBarberCount++;
      existingBarberNames.add(staffName.toLowerCase());
    }
  }
  if (newBarberCount > 0) {
    console.log(`  Added ${newBarberCount} new barber(s) from Booksy staff`);
  }

  // 7. Recalculate FadeScore for shop
  const { data: allReviews } = await supabase
    .from("review_sources")
    .select("platform, rating, review_count")
    .eq("shop_id", shopId);

  // Get city average price for FadeScore calculation
  const { data: cityShops } = await supabase
    .from("shops")
    .select("avg_price")
    .eq("city_id", cityId)
    .not("avg_price", "is", null);

  const cityAvgPrice =
    cityShops && cityShops.length > 0
      ? Math.round(cityShops.reduce((sum: number, s: any) => sum + (s.avg_price || 0), 0) / cityShops.length)
      : 35;

  if (allReviews && allReviews.length > 0) {
    const reviewInputs: ReviewInput[] = allReviews.map((r: any) => ({
      platform: r.platform,
      rating: parseFloat(r.rating) || 0,
      reviewCount: r.review_count || 0,
    }));

    const newFadeScore = calculateFadeScore(reviewInputs, avgPrice, cityAvgPrice);

    // Update shop fade_score
    await supabase.from("shops").update({ fade_score: newFadeScore }).eq("id", shopId);

    // Update all barbers' fade_score
    await supabase.from("barbers").update({ fade_score: newFadeScore }).eq("shop_id", shopId);

    console.log(`  Recalculated FadeScore: ${newFadeScore} (city avg price: $${cityAvgPrice})`);
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Booksy Scraper" + (dryRun ? " [DRY RUN]" : ""));
  console.log("─".repeat(50));

  // Build list of entries to process
  let entries: ConfigEntry[];
  if (singleUrl && singleSlug) {
    entries = [{ booksyUrl: singleUrl, shopSlug: singleSlug }];
  } else {
    const configPath = resolve(__dirname, "booksy-urls.json");
    const raw = readFileSync(configPath, "utf-8");
    entries = JSON.parse(raw);
    console.log(`Loaded ${entries.length} entries from booksy-urls.json\n`);
  }

  let successCount = 0;
  let failCount = 0;

  for (const entry of entries) {
    console.log(`\nProcessing: ${entry.shopSlug}`);
    console.log(`  URL: ${entry.booksyUrl}`);

    // Fetch page
    const html = await fetchPage(entry.booksyUrl);
    if (!html) {
      console.log("  FAILED: Could not fetch page");
      failCount++;
      continue;
    }

    console.log(`  Fetched ${(html.length / 1024).toFixed(0)}KB`);

    // Parse
    const data = parseBooksyPage(html, entry.booksyUrl);

    // Print summary
    console.log(`  Name: ${data.name || "(not found)"}`);
    console.log(`  Address: ${data.address || "(not found)"}`);
    console.log(`  Phone: ${data.phone || "(not found)"}`);
    console.log(`  Rating: ${data.rating || "(not found)"} (${data.reviewCount} reviews)`);
    console.log(`  Services: ${data.services.length}`);
    if (data.services.length > 0) {
      const avgP = estimateAvgPrice(data.services);
      const cuts = inferCutTypes(data.services);
      console.log(`    Avg price: $${avgP}`);
      console.log(`    Cut types: ${cuts.length > 0 ? cuts.join(", ") : "(none inferred)"}`);
      for (const s of data.services.slice(0, 8)) {
        console.log(`    - ${s.name}: $${s.price}${s.duration ? ` (${s.duration}min)` : ""}`);
      }
      if (data.services.length > 8) {
        console.log(`    ... and ${data.services.length - 8} more`);
      }
    }
    console.log(`  Staff: ${data.staff.length > 0 ? data.staff.join(", ") : "(none found)"}`);
    console.log(`  Instagram: ${data.instagram || "(not found)"}`);
    console.log(`  Website: ${data.website || "(not found)"}`);

    if (dryRun) {
      console.log("  [dry-run] Skipping Supabase update");
      successCount++;
    } else {
      try {
        await updateShopFromBooksy(entry.shopSlug, data);
        successCount++;
      } catch (err: any) {
        console.error(`  Update error: ${err.message}`);
        failCount++;
      }
    }

    // Rate limit between pages
    if (entries.indexOf(entry) < entries.length - 1) {
      await sleep(2000);
    }
  }

  console.log("\n" + "─".repeat(50));
  console.log(`Done! ${successCount} succeeded, ${failCount} failed`);
}

main().catch((err) => {
  console.error("Scraper failed:", err);
  process.exit(1);
});
