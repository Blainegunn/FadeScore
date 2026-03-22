import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

async function main() {
  const { data: cities } = await sb.from("cities").select("id, slug").in("slug", [
    "salt-lake-city", "ogden", "logan", "layton", "provo", "south-jordan",
  ]);
  if (!cities) return;
  const utahCityIds = new Set(cities.map((c) => c.id));

  const { data: shops } = await sb.from("shops").select("slug, name, id, city_id");
  if (!shops) return;

  const utahShops = shops.filter((s) => utahCityIds.has(s.city_id));
  console.log(`Total Utah shops: ${utahShops.length}\n`);

  for (const shop of utahShops) {
    const { data: barbers } = await sb.from("barbers").select("name").eq("shop_id", shop.id);
    const names = (barbers || []).map((b: any) => b.name);
    const placeholder =
      names.length === 0 ||
      names.every((n: string) => n === shop.name || n.endsWith(" Team"));
    console.log(
      `${placeholder ? "[PLACEHOLDER]" : "[OK]         "} ${shop.slug} | barbers: ${names.join(", ") || "(none)"}`
    );
  }
}

main();
