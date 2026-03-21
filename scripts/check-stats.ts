import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
  const { data: withGoogle } = await sb.from("review_sources").select("shop_id").eq("platform", "google");
  const googleIds = new Set((withGoogle || []).map((r: any) => r.shop_id));
  const { count: totalShops } = await sb.from("shops").select("*", { count: "exact", head: true });

  console.log("Shops WITH Google rating:", googleIds.size);
  console.log("Shops WITHOUT Google rating:", (totalShops || 0) - googleIds.size);

  const { count: yelp } = await sb.from("review_sources").select("*", { count: "exact", head: true }).eq("platform", "yelp");
  const { count: google } = await sb.from("review_sources").select("*", { count: "exact", head: true }).eq("platform", "google");
  const { count: squire } = await sb.from("review_sources").select("*", { count: "exact", head: true }).eq("platform", "squire");
  console.log("\nReview sources by platform:");
  console.log("  Google:", google);
  console.log("  Squire:", squire);
  console.log("  Yelp:", yelp);
}

main();
