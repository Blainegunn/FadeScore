import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { cityName, email } = body;

  if (!cityName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email and city required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  const { error } = await supabase
    .from("city_waitlist")
    .upsert({ city_name: cityName, email }, { onConflict: "city_name,email" });

  if (error) {
    console.error("City waitlist error:", error);
    return NextResponse.json({ error: "Could not add to waitlist." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
