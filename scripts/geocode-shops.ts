/**
 * Geocode shop addresses → lat/lng using Google Geocoding API.
 * Run: npx tsx scripts/geocode-shops.ts
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   GOOGLE_PLACES_API_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("Missing GOOGLE_PLACES_API_KEY in .env.local");
  process.exit(1);
}

interface Shop {
  id: string;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  cities: { name: string; state: string };
}

async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status === "OK" && data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  }

  console.warn(`  Geocode failed for "${address}": ${data.status}`);
  return null;
}

async function main() {
  const { data: shops, error } = await supabase
    .from("shops")
    .select("id, name, address, latitude, longitude, cities!inner ( name, state )")
    .order("name");

  if (error || !shops) {
    console.error("Failed to fetch shops:", error);
    process.exit(1);
  }

  const toGeocode = (shops as unknown as Shop[]).filter(
    (s) => s.address && s.latitude == null
  );

  console.log(`Found ${shops.length} shops, ${toGeocode.length} need geocoding.\n`);

  let success = 0;
  let failed = 0;

  for (const shop of toGeocode) {
    const fullAddress = `${shop.address}, ${shop.cities.name}, ${shop.cities.state}`;
    console.log(`Geocoding: ${shop.name} — ${fullAddress}`);

    const coords = await geocode(fullAddress);
    if (coords) {
      const { error: updateError } = await supabase
        .from("shops")
        .update({ latitude: coords.lat, longitude: coords.lng })
        .eq("id", shop.id);

      if (updateError) {
        console.error(`  DB update failed: ${updateError.message}`);
        failed++;
      } else {
        console.log(`  ✓ ${coords.lat}, ${coords.lng}`);
        success++;
      }
    } else {
      failed++;
    }

    // Rate limit: ~10 requests/sec
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log(`\nDone. ${success} geocoded, ${failed} failed.`);
}

main().catch(console.error);
