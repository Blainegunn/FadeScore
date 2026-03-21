/**
 * Squire Scraper — Fetches barber/shop data from getsquire.com discover pages.
 *
 * Usage: npx tsx scripts/scrape-squire.ts
 * Output: scripts/squire-data.json
 */

import * as fs from "fs";
import * as path from "path";

// ─── City list (inline to avoid TS path alias issues in scripts) ────────────

interface CityEntry {
  slug: string;
  name: string;
  state: string;
}

// Cities that already have curated data — skip these
const EXISTING_CITY_SLUGS = new Set([
  "salt-lake-city",
  "ogden",
  "logan",
  "layton",
  "provo",
  "south-jordan",
  "los-angeles",
  "new-york",
  "chicago",
  "houston",
  "phoenix",
  "dallas",
  "san-antonio",
  "san-diego",
]);

// All 134 cities from cities.ts
const CITIES: CityEntry[] = [
  { slug: "new-york", name: "New York", state: "New York" },
  { slug: "los-angeles", name: "Los Angeles", state: "California" },
  { slug: "chicago", name: "Chicago", state: "Illinois" },
  { slug: "houston", name: "Houston", state: "Texas" },
  { slug: "phoenix", name: "Phoenix", state: "Arizona" },
  { slug: "philadelphia", name: "Philadelphia", state: "Pennsylvania" },
  { slug: "san-antonio", name: "San Antonio", state: "Texas" },
  { slug: "san-diego", name: "San Diego", state: "California" },
  { slug: "dallas", name: "Dallas", state: "Texas" },
  { slug: "san-jose", name: "San Jose", state: "California" },
  { slug: "austin", name: "Austin", state: "Texas" },
  { slug: "jacksonville", name: "Jacksonville", state: "Florida" },
  { slug: "fort-worth", name: "Fort Worth", state: "Texas" },
  { slug: "columbus", name: "Columbus", state: "Ohio" },
  { slug: "charlotte", name: "Charlotte", state: "North Carolina" },
  { slug: "san-francisco", name: "San Francisco", state: "California" },
  { slug: "indianapolis", name: "Indianapolis", state: "Indiana" },
  { slug: "seattle", name: "Seattle", state: "Washington" },
  { slug: "denver", name: "Denver", state: "Colorado" },
  { slug: "washington-dc", name: "Washington", state: "District of Columbia" },
  { slug: "boston", name: "Boston", state: "Massachusetts" },
  { slug: "nashville", name: "Nashville", state: "Tennessee" },
  { slug: "detroit", name: "Detroit", state: "Michigan" },
  { slug: "oklahoma-city", name: "Oklahoma City", state: "Oklahoma" },
  { slug: "portland", name: "Portland", state: "Oregon" },
  { slug: "las-vegas", name: "Las Vegas", state: "Nevada" },
  { slug: "memphis", name: "Memphis", state: "Tennessee" },
  { slug: "louisville", name: "Louisville", state: "Kentucky" },
  { slug: "baltimore", name: "Baltimore", state: "Maryland" },
  { slug: "milwaukee", name: "Milwaukee", state: "Wisconsin" },
  { slug: "albuquerque", name: "Albuquerque", state: "New Mexico" },
  { slug: "tucson", name: "Tucson", state: "Arizona" },
  { slug: "fresno", name: "Fresno", state: "California" },
  { slug: "sacramento", name: "Sacramento", state: "California" },
  { slug: "atlanta", name: "Atlanta", state: "Georgia" },
  { slug: "kansas-city", name: "Kansas City", state: "Missouri" },
  { slug: "mesa", name: "Mesa", state: "Arizona" },
  { slug: "virginia-beach", name: "Virginia Beach", state: "Virginia" },
  { slug: "long-beach", name: "Long Beach", state: "California" },
  { slug: "colorado-springs", name: "Colorado Springs", state: "Colorado" },
  { slug: "raleigh", name: "Raleigh", state: "North Carolina" },
  { slug: "miami", name: "Miami", state: "Florida" },
  { slug: "omaha", name: "Omaha", state: "Nebraska" },
  { slug: "oakland", name: "Oakland", state: "California" },
  { slug: "minneapolis", name: "Minneapolis", state: "Minnesota" },
  { slug: "tulsa", name: "Tulsa", state: "Oklahoma" },
  { slug: "cleveland", name: "Cleveland", state: "Ohio" },
  { slug: "wichita", name: "Wichita", state: "Kansas" },
  { slug: "arlington", name: "Arlington", state: "Texas" },
  { slug: "new-orleans", name: "New Orleans", state: "Louisiana" },
  { slug: "bakersfield", name: "Bakersfield", state: "California" },
  { slug: "tampa", name: "Tampa", state: "Florida" },
  { slug: "honolulu", name: "Honolulu", state: "Hawaii" },
  { slug: "aurora", name: "Aurora", state: "Colorado" },
  { slug: "anaheim", name: "Anaheim", state: "California" },
  { slug: "santa-ana", name: "Santa Ana", state: "California" },
  { slug: "st-louis", name: "St. Louis", state: "Missouri" },
  { slug: "riverside", name: "Riverside", state: "California" },
  { slug: "corpus-christi", name: "Corpus Christi", state: "Texas" },
  { slug: "pittsburgh", name: "Pittsburgh", state: "Pennsylvania" },
  { slug: "lexington", name: "Lexington", state: "Kentucky" },
  { slug: "anchorage", name: "Anchorage", state: "Alaska" },
  { slug: "stockton", name: "Stockton", state: "California" },
  { slug: "cincinnati", name: "Cincinnati", state: "Ohio" },
  { slug: "st-paul", name: "St. Paul", state: "Minnesota" },
  { slug: "toledo", name: "Toledo", state: "Ohio" },
  { slug: "newark", name: "Newark", state: "New Jersey" },
  { slug: "greensboro", name: "Greensboro", state: "North Carolina" },
  { slug: "plano", name: "Plano", state: "Texas" },
  { slug: "henderson", name: "Henderson", state: "Nevada" },
  { slug: "lincoln", name: "Lincoln", state: "Nebraska" },
  { slug: "buffalo", name: "Buffalo", state: "New York" },
  { slug: "fort-wayne", name: "Fort Wayne", state: "Indiana" },
  { slug: "jersey-city", name: "Jersey City", state: "New Jersey" },
  { slug: "st-petersburg", name: "St. Petersburg", state: "Florida" },
  { slug: "chula-vista", name: "Chula Vista", state: "California" },
  { slug: "orlando", name: "Orlando", state: "Florida" },
  { slug: "norfolk", name: "Norfolk", state: "Virginia" },
  { slug: "chandler", name: "Chandler", state: "Arizona" },
  { slug: "laredo", name: "Laredo", state: "Texas" },
  { slug: "madison", name: "Madison", state: "Wisconsin" },
  { slug: "durham", name: "Durham", state: "North Carolina" },
  { slug: "winston-salem", name: "Winston-Salem", state: "North Carolina" },
  { slug: "garland", name: "Garland", state: "Texas" },
  { slug: "hialeah", name: "Hialeah", state: "Florida" },
  { slug: "reno", name: "Reno", state: "Nevada" },
  { slug: "baton-rouge", name: "Baton Rouge", state: "Louisiana" },
  { slug: "irvine", name: "Irvine", state: "California" },
  { slug: "chesapeake", name: "Chesapeake", state: "Virginia" },
  { slug: "irving", name: "Irving", state: "Texas" },
  { slug: "north-las-vegas", name: "North Las Vegas", state: "Nevada" },
  { slug: "gilbert", name: "Gilbert", state: "Arizona" },
  { slug: "scottsdale", name: "Scottsdale", state: "Arizona" },
  { slug: "salt-lake-city", name: "Salt Lake City", state: "Utah" },
  { slug: "ogden", name: "Ogden", state: "Utah" },
  { slug: "logan", name: "Logan", state: "Utah" },
  { slug: "layton", name: "Layton", state: "Utah" },
  { slug: "provo", name: "Provo", state: "Utah" },
  { slug: "south-jordan", name: "South Jordan", state: "Utah" },
  { slug: "boise", name: "Boise", state: "Idaho" },
  { slug: "fremont", name: "Fremont", state: "California" },
  { slug: "richmond", name: "Richmond", state: "Virginia" },
  { slug: "san-bernardino", name: "San Bernardino", state: "California" },
  { slug: "birmingham", name: "Birmingham", state: "Alabama" },
  { slug: "spokane", name: "Spokane", state: "Washington" },
  { slug: "rochester", name: "Rochester", state: "New York" },
  { slug: "des-moines", name: "Des Moines", state: "Iowa" },
  { slug: "modesto", name: "Modesto", state: "California" },
  { slug: "fayetteville", name: "Fayetteville", state: "North Carolina" },
  { slug: "tacoma", name: "Tacoma", state: "Washington" },
  { slug: "fontana", name: "Fontana", state: "California" },
  { slug: "oxnard", name: "Oxnard", state: "California" },
  { slug: "moreno-valley", name: "Moreno Valley", state: "California" },
  { slug: "frisco", name: "Frisco", state: "Texas" },
  { slug: "glendale", name: "Glendale", state: "Arizona" },
  { slug: "yonkers", name: "Yonkers", state: "New York" },
  { slug: "huntington-beach", name: "Huntington Beach", state: "California" },
  { slug: "aurora-il", name: "Aurora", state: "Illinois" },
  { slug: "montgomery", name: "Montgomery", state: "Alabama" },
  { slug: "amarillo", name: "Amarillo", state: "Texas" },
  { slug: "little-rock", name: "Little Rock", state: "Arkansas" },
  { slug: "akron", name: "Akron", state: "Ohio" },
  { slug: "columbus-ga", name: "Columbus", state: "Georgia" },
  { slug: "augusta", name: "Augusta", state: "Georgia" },
  { slug: "grand-rapids", name: "Grand Rapids", state: "Michigan" },
];

// ─── Types ──────────────────────────────────────────────────────────────────

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

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.']/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stateToSlug(state: string): string {
  return state.toLowerCase().replace(/\s+/g, "-");
}

function buildSquireUrl(city: CityEntry): string {
  // Special case: DC
  if (city.state === "District of Columbia") {
    return "https://getsquire.com/discover/united-states/district-of-columbia/washington";
  }
  const stateSlug = stateToSlug(city.state);
  const citySlug = toSlug(city.name);
  return `https://getsquire.com/discover/united-states/${stateSlug}/${citySlug}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Parsing ────────────────────────────────────────────────────────────────

function extractJsonLd(html: string): any[] {
  const results: any[] = [];
  const regex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      results.push(JSON.parse(match[1]));
    } catch {
      // skip invalid JSON
    }
  }
  return results;
}

function extractNextData(html: string): any | null {
  const match = html.match(
    /<script\s+id="__NEXT_DATA__"\s+type="application\/json">([\s\S]*?)<\/script>/
  );
  if (match?.[1]) {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  }
  return null;
}

function extractShopsFromCityPage(html: string): Array<{
  name: string;
  slug: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}> {
  // Squire city pages now use Schema.org JSON-LD (CollectionPage with ItemList)
  const jsonLdBlocks = extractJsonLd(html);
  const collectionPage = jsonLdBlocks.find(
    (b) => b["@type"] === "CollectionPage" && b.mainEntity?.["@type"] === "ItemList"
  );
  if (!collectionPage) return [];

  const items = collectionPage.mainEntity?.itemListElement;
  if (!Array.isArray(items)) return [];

  return items.slice(0, 15).map((entry: any) => {
    const shop = entry.item || entry;
    const url: string = shop.url || shop["@id"] || "";
    // Extract slug from URL: .../barbershop/[slug]
    const slugMatch = url.match(/\/barbershop\/([^/?]+)/);
    const slug = slugMatch?.[1] || toSlug(shop.name || "");

    const addr = shop.address || {};
    const fullAddress = typeof addr === "string"
      ? addr
      : [addr.streetAddress, addr.addressLocality, addr.addressRegion, addr.postalCode]
          .filter(Boolean)
          .join(", ");

    const geo = shop.geo || {};
    const agg = shop.aggregateRating || {};

    return {
      name: shop.name || "",
      slug,
      rating: parseFloat(agg.ratingValue) || 0,
      reviewCount: parseInt(agg.reviewCount) || 0,
      address: fullAddress,
      phone: (shop.telephone || "").replace(/^\+1/, ""),
      latitude: parseFloat(geo.latitude) || 0,
      longitude: parseFloat(geo.longitude) || 0,
    };
  });
}

function extractShopDetail(html: string): {
  barbers: SquireBarber[];
  services: SquireService[];
  instagram: string;
  googlePlaceId: string;
  shopRating: number;
  shopReviewCount: number;
} {
  const empty = { barbers: [], services: [], instagram: "", googlePlaceId: "", shopRating: 0, shopReviewCount: 0 };

  // Shop detail pages still have __NEXT_DATA__
  const nextData = extractNextData(html);
  if (!nextData) {
    // Fallback: parse JSON-LD from the detail page
    const jsonLd = extractJsonLd(html);
    const shopLd = jsonLd.find((b) => b["@type"] === "HairSalon");
    if (!shopLd) return empty;

    const agg = shopLd.aggregateRating || {};
    const sameAs: string[] = shopLd.sameAs || [];
    const igUrl = sameAs.find((u: string) => u.includes("instagram.com")) || "";
    const igMatch = igUrl.match(/instagram\.com\/([^/?]+)/);

    const catalog = shopLd.hasOfferCatalog?.itemListElement || [];
    const services: SquireService[] = catalog.map((offer: any) => {
      const svc = offer.itemOffered || {};
      return {
        name: svc.name || "",
        price: parseFloat(offer.price) || 0,
        duration: 0,
      };
    });

    return {
      barbers: [],
      services,
      instagram: igMatch?.[1] || "",
      googlePlaceId: "",
      shopRating: parseFloat(agg.ratingValue) || 0,
      shopReviewCount: parseInt(agg.reviewCount) || 0,
    };
  }

  const pageProps = nextData?.props?.pageProps;
  if (!pageProps) return empty;

  // Extract barbers — nested under barber.barber
  const rawBarbers = pageProps.barbers || [];
  const barbers: SquireBarber[] = Array.isArray(rawBarbers)
    ? rawBarbers.map((b: any) => {
        const inner = b.barber || b;
        const name = inner.name || `${inner.firstName || ""} ${inner.lastName || ""}`.trim();
        return {
          name,
          rating: inner.averageRating || 0,
          reviewCount: inner.totalReviews || 0,
        };
      })
    : [];

  // Extract services — cost is in cents
  const rawServices = pageProps.services || [];
  const services: SquireService[] = Array.isArray(rawServices)
    ? rawServices.map((s: any) => ({
        name: s.name || "",
        price: (s.cost || 0) / 100,
        duration: s.duration || 0,
      }))
    : [];

  // Extract shop-level data
  const shop = pageProps.shop || {};
  const reviewsResp = pageProps.reviewsResponse || {};

  return {
    barbers,
    services,
    instagram: shop.instagramUsername || "",
    googlePlaceId: shop.googlePlaceId || "",
    shopRating: reviewsResp.averageRating || 0,
    shopReviewCount: reviewsResp.numberOfRatings || 0,
  };
}

// ─── Main Scraper ───────────────────────────────────────────────────────────

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
      console.log(`  ⚠ HTTP ${response.status} for ${url}`);
      return null;
    }
    return await response.text();
  } catch (err: any) {
    console.log(`  ⚠ Fetch error for ${url}: ${err.message}`);
    return null;
  }
}

async function scrapeCity(city: CityEntry): Promise<SquireCityData | null> {
  const url = buildSquireUrl(city);
  console.log(`\n📍 ${city.name}, ${city.state}`);
  console.log(`   URL: ${url}`);

  const html = await fetchPage(url);
  if (!html) return null;

  const shopListings = extractShopsFromCityPage(html);
  if (shopListings.length === 0) {
    console.log("   ⚠ No shops found on page");
    return null;
  }

  console.log(`   ✓ Found ${shopListings.length} shops (from city listing)`);

  // Also check for pagination — look for page 2 link
  const hasPage2 = html.includes('rel="next"') || html.includes("?page=2");
  let extraListings: typeof shopListings = [];
  if (hasPage2) {
    await sleep(1500);
    const page2Html = await fetchPage(url + "?page=2");
    if (page2Html) {
      extraListings = extractShopsFromCityPage(page2Html);
      if (extraListings.length > 0) {
        console.log(`   ✓ Page 2: ${extraListings.length} more shops`);
      }
    }
  }

  const allListings = [...shopListings, ...extraListings];

  // Build shop data from city listing JSON-LD (no detail page fetch needed)
  const shops: SquireShop[] = allListings.map((listing) => ({
    name: listing.name,
    slug: listing.slug,
    address: listing.address,
    phone: listing.phone,
    website: "",
    instagram: "",
    rating: listing.rating,
    reviewCount: listing.reviewCount,
    barberCount: 1, // Unknown from listing; will estimate from services later
    latitude: listing.latitude,
    longitude: listing.longitude,
    barbers: [],
    services: [],
  }));

  const withReviews = shops.filter((s) => s.reviewCount > 0);
  console.log(
    `   ${shops.length} shops total, ${withReviews.length} with reviews`
  );

  return {
    citySlug: city.slug,
    cityName: city.name,
    state: city.state,
    shops,
  };
}

async function main() {
  console.log("🔧 Squire Scraper — Starting\n");

  // Filter to cities without existing curated data
  const citiesToScrape = CITIES.filter((c) => !EXISTING_CITY_SLUGS.has(c.slug));
  console.log(
    `Cities to scrape: ${citiesToScrape.length} (skipping ${EXISTING_CITY_SLUGS.size} with existing data)\n`
  );

  const results: SquireCityData[] = [];
  let successCount = 0;
  let failCount = 0;

  for (const city of citiesToScrape) {
    await sleep(1500); // Rate limit between city pages

    const data = await scrapeCity(city);
    if (data && data.shops.length > 0) {
      results.push(data);
      successCount++;
    } else {
      failCount++;
    }

    // Save progress every 10 cities
    if ((successCount + failCount) % 10 === 0) {
      const outPath = path.join(__dirname, "squire-data.json");
      fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
      console.log(`\n💾 Progress saved (${results.length} cities so far)\n`);
    }
  }

  // Final save
  const outPath = path.join(__dirname, "squire-data.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Done! Scraped ${successCount} cities, ${failCount} failed`);
  console.log(`📁 Output: ${outPath}`);

  // Summary
  const totalShops = results.reduce((sum, c) => sum + c.shops.length, 0);
  const totalBarbers = results.reduce(
    (sum, c) => sum + c.shops.reduce((s, shop) => s + shop.barbers.length, 0),
    0
  );
  console.log(`📊 Total: ${totalShops} shops, ${totalBarbers} barbers across ${results.length} cities`);
}

main().catch(console.error);
