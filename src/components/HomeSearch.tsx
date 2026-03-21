"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const RADII = [1, 5, 10, 25, 50, 100] as const;

export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [radius, setRadius] = useState("25");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const params = new URLSearchParams();
    params.set("q", q);
    params.set("radius", radius);
    router.push(`/search?${params.toString()}#results`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Image
            src="/icons/search.png"
            alt=""
            width={20}
            height={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-45 pointer-events-none"
          />
          <input
            type="search"
            name="q"
            inputMode="search"
            enterKeyHint="search"
            autoCapitalize="words"
            autoCorrect="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="City name or zip code"
            className="w-full rounded-full border border-fade-navy/12 bg-white pl-12 pr-5 py-3.5 text-fade-navy placeholder:text-fade-muted/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-fade-accent/50 focus:border-fade-accent/40 [appearance:textfield] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
          />
        </div>
        <select
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="rounded-full border border-fade-navy/12 bg-white px-6 py-3.5 text-sm text-fade-navy focus:outline-none focus:ring-2 focus:ring-fade-accent/50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235B6578%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10"
        >
          {RADII.map((r) => (
            <option key={r} value={r}>
              {r} mile{r !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-fade-accent px-8 py-3.5 text-sm font-semibold text-fade-navy shadow-sm shadow-fade-accent/30 hover:bg-fade-accent/90 transition-colors whitespace-nowrap"
        >
          <Image
            src="/icons/search.png"
            alt=""
            width={18}
            height={18}
            className="opacity-90"
          />
          Search
        </button>
      </div>
    </form>
  );
}
