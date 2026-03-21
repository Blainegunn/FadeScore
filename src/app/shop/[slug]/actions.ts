"use server";

import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { sendClaimNotification } from "@/lib/email";

type ClaimResult = { ok: true } | { ok: false; error: string };

export async function submitClaimRequest(formData: FormData): Promise<ClaimResult> {
  const shopSlug = (formData.get("shopSlug") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const role = (formData.get("role") as string)?.trim() || "owner";
  const message = (formData.get("message") as string)?.trim() || null;

  if (!shopSlug || !name || !email) {
    return { ok: false, error: "Name and email are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email." };
  }

  const supabase = createSupabaseAdmin();

  // Find shop
  const { data: shop } = await supabase
    .from("shops")
    .select("id, name")
    .eq("slug", shopSlug)
    .single();

  if (!shop) {
    return { ok: false, error: "Shop not found." };
  }

  const { error } = await supabase.from("claim_requests").insert({
    shop_id: shop.id,
    email,
    name,
    role,
    message,
  });

  if (error) {
    console.error("Claim insert error:", error);
    return { ok: false, error: "Could not submit claim. Please try again." };
  }

  // Send email notification (fire and forget)
  sendClaimNotification({
    shopName: shop.name,
    email,
    name,
    role,
    message: message ?? undefined,
  }).catch((err) => console.error("Claim email error:", err));

  return { ok: true };
}
