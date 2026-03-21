"use client";

import { useState } from "react";
import Image from "next/image";
import { submitReview, verifyReviewEmail } from "@/app/barber/[slug]/actions";

interface ReviewFormProps {
  barberSlug: string;
  barberId: string;
}

export function ReviewForm({ barberSlug, barberId }: ReviewFormProps) {
  const [step, setStep] = useState<"form" | "verify" | "done">("form");
  const [reviewId, setReviewId] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    setSubmitting(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("barberId", barberId);
    formData.set("barberSlug", barberSlug);
    formData.set("rating", String(rating));
    const result = await submitReview(formData);
    setSubmitting(false);
    if (result.ok) {
      setReviewId(result.reviewId);
      setStep("verify");
    } else {
      setError(result.error);
    }
  }

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("reviewId", reviewId);
    const result = await verifyReviewEmail(formData);
    setSubmitting(false);
    if (result.ok) {
      setStep("done");
    } else {
      setError(result.error);
    }
  }

  if (step === "done") {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
        Your review has been verified and published. Thanks!
      </div>
    );
  }

  if (step === "verify") {
    return (
      <form onSubmit={handleVerify} className="space-y-3 rounded-xl border border-fade-navy/10 bg-white p-4">
        <p className="text-sm text-fade-muted">
          We sent a 6-digit code to your email. Enter it below to verify your review.
        </p>
        <input
          name="code"
          required
          maxLength={6}
          placeholder="Enter 6-digit code"
          className="w-full rounded-xl border border-fade-navy/12 bg-white px-3 py-2 text-sm text-fade-navy text-center tracking-widest"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-fade-accent px-5 py-2 text-sm font-semibold text-fade-navy hover:bg-fade-accent/90 disabled:opacity-50"
        >
          {submitting ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-fade-navy/10 bg-white p-4">
      <p className="font-medium text-sm text-fade-navy">Leave a review</p>

      {/* Star rating */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110"
          >
            <Image
              src={star <= (hoverRating || rating) ? "/icons/star-filled.png" : "/icons/star-empty.png"}
              alt={`${star} star`}
              width={28}
              height={28}
            />
          </button>
        ))}
        {rating > 0 && <span className="text-sm text-fade-muted ml-2 self-center">{rating}/5</span>}
      </div>

      <input
        name="displayName"
        required
        placeholder="Your name"
        className="w-full rounded-xl border border-fade-navy/12 bg-white px-3 py-2 text-sm text-fade-navy"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email (for verification only)"
        className="w-full rounded-xl border border-fade-navy/12 bg-white px-3 py-2 text-sm text-fade-navy"
      />
      <textarea
        name="comment"
        placeholder="Your review (optional)"
        rows={3}
        className="w-full rounded-xl border border-fade-navy/12 bg-white px-3 py-2 text-sm text-fade-navy"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-fade-accent px-5 py-2 text-sm font-semibold text-fade-navy hover:bg-fade-accent/90 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
