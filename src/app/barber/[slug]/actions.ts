"use server";

import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { sendVerificationCode } from "@/lib/email";
import { revalidatePath } from "next/cache";

type ReviewSubmitResult = { ok: true; reviewId: string } | { ok: false; error: string };
type VerifyResult = { ok: true } | { ok: false; error: string };

export async function submitReview(formData: FormData): Promise<ReviewSubmitResult> {
  const barberId = (formData.get("barberId") as string)?.trim();
  const barberSlug = (formData.get("barberSlug") as string)?.trim();
  const displayName = (formData.get("displayName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const ratingStr = formData.get("rating") as string;
  const comment = (formData.get("comment") as string)?.trim() || null;

  if (!barberId || !displayName || !email || !ratingStr) {
    return { ok: false, error: "All fields are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email." };
  }

  const rating = parseInt(ratingStr, 10);
  if (rating < 1 || rating > 5) {
    return { ok: false, error: "Rating must be between 1 and 5." };
  }

  const supabase = createSupabaseAdmin();

  // Insert review (unverified)
  const { data: review, error: reviewErr } = await supabase
    .from("user_reviews")
    .insert({
      barber_id: barberId,
      email,
      display_name: displayName,
      rating,
      comment,
      email_verified: false,
    })
    .select("id")
    .single();

  if (reviewErr || !review) {
    console.error("Review insert error:", reviewErr);
    return { ok: false, error: "Could not submit review. Please try again." };
  }

  // Generate 6-digit code
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  await supabase.from("email_verifications").insert({
    email,
    code,
    expires_at: expiresAt,
  });

  // Send verification email
  try {
    await sendVerificationCode(email, code);
  } catch (err) {
    console.error("Verification email error:", err);
  }

  return { ok: true, reviewId: review.id };
}

export async function verifyReviewEmail(formData: FormData): Promise<VerifyResult> {
  const reviewId = (formData.get("reviewId") as string)?.trim();
  const code = (formData.get("code") as string)?.trim();

  if (!reviewId || !code) {
    return { ok: false, error: "Code is required." };
  }

  const supabase = createSupabaseAdmin();

  // Get the review to find the email
  const { data: review } = await supabase
    .from("user_reviews")
    .select("id, email, barber_id")
    .eq("id", reviewId)
    .single();

  if (!review) {
    return { ok: false, error: "Review not found." };
  }

  // Check verification code
  const { data: verification } = await supabase
    .from("email_verifications")
    .select("id, expires_at, used")
    .eq("email", review.email)
    .eq("code", code)
    .eq("used", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!verification) {
    return { ok: false, error: "Invalid code. Please try again." };
  }

  if (new Date(verification.expires_at) < new Date()) {
    return { ok: false, error: "Code has expired. Please submit a new review." };
  }

  // Mark verification as used
  await supabase
    .from("email_verifications")
    .update({ used: true })
    .eq("id", verification.id);

  // Verify the review
  await supabase
    .from("user_reviews")
    .update({ email_verified: true, verified_at: new Date().toISOString() })
    .eq("id", reviewId);

  // Get barber slug for revalidation
  const { data: barber } = await supabase
    .from("barbers")
    .select("slug")
    .eq("id", review.barber_id)
    .single();

  if (barber) {
    revalidatePath(`/barber/${barber.slug}`);
  }

  return { ok: true };
}
