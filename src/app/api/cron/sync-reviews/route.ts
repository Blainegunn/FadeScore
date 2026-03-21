import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { calculateFadeScore } from "@/lib/fadescore";

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();

  // Get shops with Google Place IDs
  const { data: shops } = await supabase
    .from("shops")
    .select("id, google_place_id, avg_price, city_id")
    .not("google_place_id", "is", null);

  if (!shops || shops.length === 0) {
    return NextResponse.json({ message: "No shops with Google Place IDs", updated: 0 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  let updated = 0;
  const errors: string[] = [];

  for (const shop of shops) {
    if (!shop.google_place_id || !apiKey) continue;

    try {
      // Fetch from Google Places API
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${shop.google_place_id}&fields=rating,user_ratings_total&key=${apiKey}`
      );
      const data = await res.json();

      if (data.result) {
        const rating = data.result.rating;
        const reviewCount = data.result.user_ratings_total;

        if (rating && reviewCount) {
          // Update review source
          await supabase
            .from("review_sources")
            .upsert({
              shop_id: shop.id,
              platform: "google",
              rating,
              review_count: reviewCount,
              last_synced_at: new Date().toISOString(),
            }, { onConflict: "shop_id,platform" });

          // Recalculate FadeScore for this shop's barbers
          const { data: reviewSources } = await supabase
            .from("review_sources")
            .select("platform, rating, review_count")
            .eq("shop_id", shop.id);

          // Get city average price
          const { data: cityShops } = await supabase
            .from("shops")
            .select("avg_price")
            .eq("city_id", shop.city_id);

          const cityAvgPrice = cityShops && cityShops.length > 0
            ? Math.round(cityShops.reduce((s, cs) => s + (cs.avg_price ?? 0), 0) / cityShops.length)
            : 35;

          if (reviewSources) {
            const reviews = reviewSources.map((rs) => ({
              platform: rs.platform,
              rating: Number(rs.rating),
              reviewCount: rs.review_count,
            }));

            const newFadeScore = calculateFadeScore(reviews, shop.avg_price ?? 35, cityAvgPrice);

            // Update shop fade_score
            await supabase
              .from("shops")
              .update({ fade_score: newFadeScore })
              .eq("id", shop.id);

            // Update barbers at this shop
            const { data: barbers } = await supabase
              .from("barbers")
              .select("id, avg_price")
              .eq("shop_id", shop.id);

            if (barbers) {
              for (const barber of barbers) {
                const barberScore = calculateFadeScore(reviews, barber.avg_price ?? 35, cityAvgPrice);
                await supabase
                  .from("barbers")
                  .update({ fade_score: barberScore })
                  .eq("id", barber.id);
              }
            }
          }

          updated++;
        }
      }
    } catch (err) {
      errors.push(`Shop ${shop.id}: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }

  return NextResponse.json({
    message: `Synced ${updated} shops`,
    updated,
    errors: errors.length > 0 ? errors : undefined,
  });
}
