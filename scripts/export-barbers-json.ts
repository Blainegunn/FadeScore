/**
 * Exports REAL_BARBERS static data to JSON so seed script can read it.
 * Must run from project root to resolve @/ aliases.
 *
 * Usage: npx tsx -r tsconfig-paths/register scripts/export-barbers-json.ts
 *   or:  npx tsx --tsconfig tsconfig.json scripts/export-barbers-json.ts
 */

// Use relative path from project root (tsx resolves @/ via tsconfig)
import { REAL_BARBERS } from "../src/data/real-barbers";
import * as fs from "fs";
import * as path from "path";

const outPath = path.resolve(__dirname, "real-barbers.json");

// Convert to plain JSON
const data: Record<string, any[]> = {};

for (const [citySlug, barbers] of Object.entries(REAL_BARBERS)) {
  data[citySlug] = barbers.map((b) => ({ ...b }));
}

fs.writeFileSync(outPath, JSON.stringify(data, null, 2));

const totalBarbers = Object.values(data).reduce((sum, arr) => sum + arr.length, 0);
console.log(`✅ Exported ${Object.keys(data).length} cities, ${totalBarbers} barbers`);
console.log(`📁 ${outPath}`);
