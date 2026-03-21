"use client";

import { useState } from "react";

interface CityWaitlistProps {
  cityName: string;
}

export function CityWaitlist({ cityName }: CityWaitlistProps) {
  const [email, setEmail] = useState("");
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
      const res = await fetch("/api/city-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityName, email }),
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

  return (
    <div className="rounded-2xl border border-fade-navy/10 bg-fade-canvas/50 p-6 text-center">
      <p className="text-fade-navy mb-2">
        We don&apos;t have barbers in {cityName} yet.
      </p>
      {status === "success" ? (
        <p className="text-sm text-emerald-700 font-medium">
          We&apos;ll notify you when barbers are added in {cityName}!
        </p>
      ) : (
        <>
          <p className="text-sm text-fade-muted mb-4">
            Get notified when we add barbers in your area.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-fade-navy/12 bg-white px-4 py-2 text-sm text-fade-navy"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-fade-accent px-5 py-2 text-sm font-semibold text-fade-navy hover:bg-fade-accent/90 disabled:opacity-50"
            >
              {status === "submitting" ? "..." : "Notify me"}
            </button>
          </form>
          {status === "error" && (
            <p className="text-sm text-red-600 mt-2">{errorMsg}</p>
          )}
        </>
      )}
    </div>
  );
}
