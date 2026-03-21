"use server";

import { revalidatePath } from "next/cache";
import type { HairType, CutType } from "@/types";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { sendIntakeNotification } from "@/lib/email";

export type IntakeFormState = { ok: true } | { ok: false; error: string };

export async function submitBarberIntake(formData: FormData): Promise<IntakeFormState> {
  const email = (formData.get("email") as string)?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const shopSlug = (formData.get("shopSlug") as string)?.trim() || undefined;
  const notListed = formData.get("notListed") === "true";

  if (!notListed && !shopSlug) {
    return { ok: false, error: "Please select your shop, or choose \u201cI\u2019m not listed yet\u201d." };
  }

  const hairTypes = (formData.getAll("hairTypes") as string[]).filter(Boolean) as HairType[];
  const cutTypes = (formData.getAll("cutTypes") as string[]).filter(Boolean) as CutType[];
  const notes = (formData.get("notes") as string)?.trim() || undefined;

  const validHair: HairType[] = ["textured-coily", "straight", "wavy", "all"];
  const validCut: CutType[] = [
    "skin-fade", "taper-fade", "lineup", "beard", "designs", "locs", "braids",
    "razor-fade", "classic-cut", "straight-razor", "styling", "colors", "precision-cut",
  ];
  const hair = hairTypes.filter((h) => validHair.includes(h));
  const cut = cutTypes.filter((c) => validCut.includes(c));

  if (hair.length === 0) {
    return { ok: false, error: "Please select at least one hair type." };
  }
  if (cut.length === 0) {
    return { ok: false, error: "Please select at least one cut type." };
  }

  let shopName: string | undefined;
  let city: string | undefined;
  let state: string | undefined;

  if (shopSlug && !notListed) {
    const { getShopBySlug } = await import("@/data/barbers");
    const shop = await getShopBySlug(shopSlug);
    if (shop) {
      shopName = shop.name;
      city = shop.city;
      state = shop.state;
    }
  }

  const customName = notListed ? (formData.get("customName") as string)?.trim() || undefined : undefined;
  const customShopName = notListed ? (formData.get("customShopName") as string)?.trim() || undefined : undefined;
  const customCity = notListed ? (formData.get("customCity") as string)?.trim() || undefined : undefined;
  const customState = notListed ? (formData.get("customState") as string)?.trim() || undefined : undefined;

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("intake_submissions").insert({
      email,
      barber_slug: shopSlug ?? null,
      barber_name: null,
      shop_name: shopName ?? null,
      city: city ?? null,
      state: state ?? null,
      not_listed: notListed,
      custom_name: customName ?? null,
      custom_shop_name: customShopName ?? null,
      custom_city: customCity ?? null,
      custom_state: customState ?? null,
      hair_types: hair,
      cut_types: cut,
      notes: notes ?? null,
    });

    if (error) {
      console.error("Intake insert error:", error);
      return { ok: false, error: "Could not save your response. Please try again." };
    }

    // Send email notification (fire and forget)
    sendIntakeNotification({
      email,
      barberName: undefined,
      shopName,
      city,
      state,
      customName,
      customShopName,
      notListed,
    }).catch((err) => console.error("Intake email error:", err));

    revalidatePath("/barber-intake");
    return { ok: true };
  } catch (err) {
    console.error("Barber intake failed:", err);
    return { ok: false, error: "Could not save your response. Please try again or contact us." };
  }
}
