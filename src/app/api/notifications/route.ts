import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, phone, citySlug, barberSlug, notifyNewBarbers, notifyPriceDrops } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("notification_subscriptions").insert({
    email,
    phone: phone || null,
    city_slug: citySlug || null,
    barber_slug: barberSlug || null,
    notify_new_barbers: notifyNewBarbers ?? true,
    notify_price_drops: notifyPriceDrops ?? true,
  });

  if (error) {
    console.error("Notification subscription error:", error);
    return NextResponse.json({ error: "Could not subscribe." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
