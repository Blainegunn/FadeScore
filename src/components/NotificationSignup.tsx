"use client";

import { useState } from "react";

interface NotificationSignupProps {
  citySlug?: string;
  barberSlug?: string;
}

export function NotificationSignup({ citySlug, barberSlug }: NotificationSignupProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newBarbers, setNewBarbers] = useState(true);
  const [priceDrops, setPriceDrops] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone: phone || null,
          citySlug: citySlug || null,
          barberSlug: barberSlug || null,
          notifyNewBarbers: newBarbers,
          notifyPriceDrops: priceDrops,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
        You&apos;re subscribed to notifications!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-fade-navy/10 bg-white p-4 space-y-3">
      <p className="font-medium text-sm text-fade-navy">Get notified</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email (required)"
        required
        className="w-full rounded-xl border border-fade-navy/12 bg-white px-3 py-2 text-sm text-fade-navy"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (optional)"
        className="w-full rounded-xl border border-fade-navy/12 bg-white px-3 py-2 text-sm text-fade-navy"
      />
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-fade-navy">
          <input
            type="checkbox"
            checked={newBarbers}
            onChange={(e) => setNewBarbers(e.target.checked)}
            className="rounded border-fade-navy/20 text-fade-accent focus:ring-fade-accent"
          />
          Notify me about new barbers
        </label>
        <label className="flex items-center gap-2 text-sm text-fade-navy">
          <input
            type="checkbox"
            checked={priceDrops}
            onChange={(e) => setPriceDrops(e.target.checked)}
            className="rounded border-fade-navy/20 text-fade-accent focus:ring-fade-accent"
          />
          Notify me about price drops
        </label>
      </div>
      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-fade-accent px-5 py-2 text-sm font-semibold text-fade-navy hover:bg-fade-accent/90 disabled:opacity-50"
      >
        {status === "submitting" ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
