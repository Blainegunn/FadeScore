/**
 * Squire Data Generator — Converts squire-data.json into TypeScript barber files.
 *
 * Usage: npx tsx scripts/generate-barber-files.ts
 * Input: scripts/squire-data.json
 * Output: src/data/squire/{city-slug}.ts + src/data/squire/index.ts
 */

import * as fs from "fs";
import * as path from "path";

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

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function toConstName(str: string): string {
  return str
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, "")
    .replace(/\s+/g, "_");
}

function escapeStr(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

/** Filter to haircut-type services, return median price */
function computeAvgPrice(services: SquireService[]): number {
  const haircutKeywords = [
    "haircut",
    "cut",
    "fade",
    "taper",
    "lineup",
    "line up",
    "line-up",
    "trim",
    "buzz",
    "clipper",
    "scissor",
    "shape up",
    "shape-up",
    "shapeup",
    "kids",
    "child",
    "men",
    "regular",
    "classic",
    "precision",
    "executive",
  ];

  const excludeKeywords = [
    "beard only",
    "wax",
    "color",
    "dye",
    "perm",
    "straighten",
    "treatment",
    "wash only",
    "shampoo only",
    "eyebrow",
    "nose",
    "ear",
  ];

  const haircutServices = services.filter((s) => {
    const name = s.name.toLowerCase();
    if (s.price <= 0) return false;
    if (excludeKeywords.some((kw) => name.includes(kw))) return false;
    return haircutKeywords.some((kw) => name.includes(kw));
  });

  if (haircutServices.length === 0) {
    // Fallback: use all services with price > 0
    const priced = services.filter((s) => s.price > 0);
    if (priced.length === 0) return 35; // Default price
    const prices = priced.map((s) => s.price).sort((a, b) => a - b);
    return prices[Math.floor(prices.length / 2)];
  }

  const prices = haircutServices.map((s) => s.price).sort((a, b) => a - b);
  return prices[Math.floor(prices.length / 2)];
}

/** Derive specialties from service names */
function deriveSpecialties(services: SquireService[]): string[] {
  const specialties = new Set<string>();
  const names = services.map((s) => s.name.toLowerCase());
  const joined = names.join(" ");

  if (/fade|skin fade|bald fade|taper fade|drop fade|mid fade|high fade|low fade/.test(joined))
    specialties.add("Fades");
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

  // Default if nothing matched
  if (specialties.size === 0) {
    specialties.add("Fades");
    specialties.add("Classic Cuts");
  }

  return Array.from(specialties).slice(0, 4);
}

/** Generate a valid JS variable name for a shop */
function shopVarName(shop: SquireShop): string {
  return toConstName(shop.name).replace(/^[^A-Z]/, "S_") || "SHOP";
}

// ─── File Generation ────────────────────────────────────────────────────────

function generateCityFile(city: SquireCityData): string {
  const lines: string[] = [];
  lines.push('import type { Barber } from "@/types";');
  lines.push("");
  lines.push(`// ─── ${city.cityName.toUpperCase()}, ${city.state.toUpperCase()} ─── (Squire data)`);
  lines.push("");

  const shopArrayNames: string[] = [];

  for (let i = 0; i < city.shops.length; i++) {
    const shop = city.shops[i];
    const shopVar = `SHOP_${i + 1}_${shopVarName(shop)}`;
    const sharedVar = `${shopVar}_SHARED`;
    const barbersVar = `${shopVar}_BARBERS`;
    shopArrayNames.push(barbersVar);

    const avgPrice = computeAvgPrice(shop.services);
    const specialties = deriveSpecialties(shop.services);

    // Determine barbers — use shop.barbers if available, otherwise create a single entry for the shop
    const barbers: Array<{ name: string; rating: number; reviewCount: number }> =
      shop.barbers.length > 0
        ? shop.barbers
        : [{ name: shop.name, rating: shop.rating, reviewCount: shop.reviewCount }];

    // Shared shop data
    lines.push(`// ── ${i + 1}. ${shop.name} ──`);
    lines.push(`const ${sharedVar} = {`);
    lines.push(`  shopName: "${escapeStr(shop.name)}",`);
    lines.push(`  shopSlug: "${escapeStr(shop.slug)}-${city.citySlug}",`);
    lines.push(`  city: "${escapeStr(city.cityName)}",`);
    lines.push(`  citySlug: "${city.citySlug}",`);
    lines.push(`  state: "${escapeStr(city.state)}",`);
    if (shop.address) lines.push(`  address: "${escapeStr(shop.address)}",`);
    if (shop.phone) lines.push(`  phone: "${escapeStr(shop.phone)}",`);
    if (shop.instagram) lines.push(`  instagram: "${escapeStr(shop.instagram)}",`);
    if (shop.website) lines.push(`  website: "${escapeStr(shop.website)}",`);
    lines.push(`  avgPrice: ${avgPrice},`);
    lines.push(`  reviews: [`);
    lines.push(
      `    { platform: "squire" as const, rating: ${shop.rating}, reviewCount: ${shop.reviewCount} },`
    );
    lines.push(`  ],`);

    // Barbers list in shared data
    lines.push(`  barbers: [`);
    for (const b of barbers) {
      const barberSlug = `${toSlug(b.name)}-${shop.slug}-${city.citySlug}`;
      lines.push(
        `    { name: "${escapeStr(b.name)}", slug: "${barberSlug}", rating: ${b.rating || shop.rating}, reviewCount: ${b.reviewCount || 0} },`
      );
    }
    lines.push(`  ],`);
    lines.push(`};`);
    lines.push("");

    // Individual barber entries
    lines.push(`const ${barbersVar}: Barber[] = [`);
    for (const b of barbers) {
      const barberSlug = `${toSlug(b.name)}-${shop.slug}-${city.citySlug}`;
      const fadeScore = b.rating || shop.rating;
      const isHiddenGem = fadeScore >= 4.8 && avgPrice <= 30;
      const isCheap = avgPrice <= 25;
      const barberId = `sq-${city.citySlug}-${toSlug(shop.slug)}-${toSlug(b.name)}`;

      lines.push(`  {`);
      lines.push(`    id: "${barberId}",`);
      lines.push(`    name: "${escapeStr(b.name)}",`);
      lines.push(`    slug: "${barberSlug}",`);
      lines.push(`    fadeScore: ${fadeScore},`);
      lines.push(`    reviewCount: ${b.reviewCount || 0},`);
      lines.push(`    specialties: [${specialties.map((s) => `"${s}"`).join(", ")}],`);
      if (isHiddenGem) lines.push(`    isHiddenGem: true,`);
      if (isCheap) lines.push(`    isCheap: true,`);
      lines.push(`    ...${sharedVar},`);
      lines.push(`  },`);
    }
    lines.push(`];`);
    lines.push("");
  }

  // Export combined array
  const exportName = `${toConstName(city.cityName)}_BARBERS`;
  lines.push(`export const ${exportName}: Barber[] = [`);
  for (const name of shopArrayNames) {
    lines.push(`  ...${name},`);
  }
  lines.push(`];`);
  lines.push("");

  return lines.join("\n");
}

function generateIndexFile(
  cities: Array<{ citySlug: string; cityName: string; exportName: string }>
): string {
  const lines: string[] = [];

  // Imports
  for (const city of cities) {
    lines.push(`import { ${city.exportName} } from "./${city.citySlug}";`);
  }
  lines.push("");

  // Re-export all
  lines.push("// Re-export all city barber arrays");
  for (const city of cities) {
    lines.push(`export { ${city.exportName} } from "./${city.citySlug}";`);
  }
  lines.push("");

  // Combined record
  lines.push("import type { Barber } from \"@/types\";");
  lines.push("");
  lines.push("/** Squire-sourced barber data keyed by city slug */");
  lines.push("export const SQUIRE_BARBERS: Record<string, Barber[]> = {");
  for (const city of cities) {
    lines.push(`  "${city.citySlug}": ${city.exportName},`);
  }
  lines.push("};");
  lines.push("");

  return lines.join("\n");
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const dataPath = path.join(__dirname, "squire-data.json");
  if (!fs.existsSync(dataPath)) {
    console.error("❌ squire-data.json not found. Run scrape-squire.ts first.");
    process.exit(1);
  }

  const raw = fs.readFileSync(dataPath, "utf-8");
  const allCities: SquireCityData[] = JSON.parse(raw);

  console.log(`📦 Loaded ${allCities.length} cities from squire-data.json`);

  // Filter to cities with ≥ 3 shops
  const validCities = allCities.filter((c) => c.shops.length >= 3);
  console.log(`✅ ${validCities.length} cities have ≥ 3 shops`);

  const outDir = path.resolve(__dirname, "../src/data/squire");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const indexEntries: Array<{ citySlug: string; cityName: string; exportName: string }> = [];

  for (const city of validCities) {
    const exportName = `${toConstName(city.cityName)}_BARBERS`;
    const content = generateCityFile(city);
    const filePath = path.join(outDir, `${city.citySlug}.ts`);

    fs.writeFileSync(filePath, content);
    console.log(`  📝 ${city.citySlug}.ts — ${city.shops.length} shops`);

    indexEntries.push({
      citySlug: city.citySlug,
      cityName: city.cityName,
      exportName,
    });
  }

  // Generate index file
  const indexContent = generateIndexFile(indexEntries);
  fs.writeFileSync(path.join(outDir, "index.ts"), indexContent);
  console.log(`\n📁 Generated index.ts with ${indexEntries.length} city exports`);

  // Generate the import snippet for real-barbers.ts
  console.log("\n── Add to real-barbers.ts ──────────────────────────");
  console.log('import { SQUIRE_BARBERS } from "./squire";');
  console.log("");
  console.log("// Then merge into REAL_BARBERS:");
  console.log("// ...SQUIRE_BARBERS  (spread into the record)");

  const totalBarbers = validCities.reduce(
    (sum, c) =>
      sum +
      c.shops.reduce(
        (s, shop) => s + Math.max(shop.barbers.length, 1),
        0
      ),
    0
  );
  console.log(`\n✅ Done! ${indexEntries.length} city files, ~${totalBarbers} total barber entries`);
}

main();
