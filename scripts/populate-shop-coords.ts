/**
 * Populate shop latitude/longitude from squire-data.json.
 * Usage: npx tsx scripts/populate-shop-coords.ts
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

config({ path: resolve(process.cwd(), ".env.local") });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
  const raw = readFileSync(resolve(__dirname, "squire-data.json"), "utf-8");
  const cities = JSON.parse(raw);

  let updated = 0;
  let skipped = 0;

  for (const city of cities) {
    for (const shop of city.shops) {
      if (!shop.latitude || !shop.longitude) continue;

      const { error } = await supabase
        .from("shops")
        .update({ latitude: shop.latitude, longitude: shop.longitude })
        .eq("slug", shop.slug);

      if (error) {
        skipped++;
      } else {
        updated++;
      }
    }
  }

  console.log(`Updated ${updated} shops with coordinates (${skipped} skipped)`);
}

main().catch(console.error);
