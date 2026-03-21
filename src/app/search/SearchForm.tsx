"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { HairType, CutType } from "@/types";
import { HAIR_TYPE_LABELS, CUT_TYPE_LABELS } from "@/lib/filters";

const ALL_HAIR_TYPES = Object.keys(HAIR_TYPE_LABELS) as HairType[];
const ALL_CUT_TYPES = Object.keys(CUT_TYPE_LABELS) as CutType[];
const RADII = [1, 5, 10, 25, 50, 100] as const;

interface SearchFormProps {
  defaultQuery: string;
  defaultRadius: number;
  defaultHairTypes?: HairType[];
  defaultCutTypes?: CutType[];
}

export function SearchForm({
  defaultQuery,
  defaultRadius,
  defaultHairTypes = [],
  defaultCutTypes = [],
}: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedHairTypes, setSelectedHairTypes] = useState<HairType[]>(defaultHairTypes);
  const [selectedCutTypes, setSelectedCutTypes] = useState<CutType[]>(defaultCutTypes);

  function toggleHairType(ht: HairType) {
    setSelectedHairTypes((prev) =>
      prev.includes(ht) ? prev.filter((h) => h !== ht) : [...prev, ht],
    );
  }

  function toggleCutType(ct: CutType) {
    setSelectedCutTypes((prev) =>
      prev.includes(ct) ? prev.filter((c) => c !== ct) : [...prev, ct],
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = ((form.elements.namedItem("q") as HTMLInputElement)?.value ?? "").trim();
    const radius = (form.elements.namedItem("radius") as HTMLSelectElement)?.value ?? "25";

    if (!q) return;

    const params = new URLSearchParams();
    params.set("q", q);
    params.set("radius", radius);

    if (selectedHairTypes.length > 0) {
      params.set("hairTypes", selectedHairTypes.join(","));
    }
    if (selectedCutTypes.length > 0) {
      params.set("cutTypes", selectedCutTypes.join(","));
    }
    router.push(`/search?${params.toString()}`);
  }

  const currentQuery = searchParams.get("q") ?? defaultQuery;
  const currentRadius = searchParams.get("radius") ?? String(defaultRadius);

  const pillActive =
    "bg-fade-pill text-fade-navy border-fade-pill";
  const pillIdle =
    "bg-fade-pill/15 border-fade-pill/40 text-fade-navy hover:bg-fade-pill/30";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-fade-navy/8 bg-white/90 p-5 sm:p-6 shadow-sm space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="search-q" className="sr-only">
            City or zip code
          </label>
          <Image
            src="/icons/search.png"
            alt=""
            width={18}
            height={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
          />
          <input
            id="search-q"
            name="q"
            type="text"
            placeholder="City name or zip code"
            defaultValue={currentQuery}
            className="w-full rounded-full border border-fade-navy/12 bg-white pl-10 pr-4 py-2.5 text-sm text-fade-navy placeholder:text-fade-muted/70 focus:outline-none focus:ring-2 focus:ring-fade-accent/50"
          />
        </div>
        <div className="shrink-0">
          <label htmlFor="search-radius" className="sr-only">
            Radius
          </label>
          <select
            id="search-radius"
            name="radius"
            defaultValue={currentRadius}
            className="w-full sm:w-auto rounded-full border border-fade-navy/12 bg-white px-6 py-2.5 text-sm text-fade-navy focus:outline-none focus:ring-2 focus:ring-fade-accent/50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235B6578%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9"
          >
            {RADII.map((r) => (
              <option key={r} value={r}>
                {r} mile{r !== 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-fade-navy text-white text-sm font-semibold hover:bg-fade-navy/90 shrink-0 shadow-md shadow-fade-navy/15"
        >
          <Image
            src="/icons/search.png"
            alt=""
            width={16}
            height={16}
            className="brightness-0 invert opacity-90"
          />
          Search
        </button>
      </div>

      <div>
        <p className="text-sm font-medium text-fade-navy mb-2">Hair Type</p>
        <div className="flex flex-wrap gap-2">
          {ALL_HAIR_TYPES.map((ht) => (
            <button
              key={ht}
              type="button"
              onClick={() => toggleHairType(ht)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedHairTypes.includes(ht) ? pillActive : pillIdle
              }`}
            >
              {HAIR_TYPE_LABELS[ht]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-fade-navy mb-2">Cut Type</p>
        <div className="flex flex-wrap gap-2">
          {ALL_CUT_TYPES.map((ct) => (
            <button
              key={ct}
              type="button"
              onClick={() => toggleCutType(ct)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedCutTypes.includes(ct) ? pillActive : pillIdle
              }`}
            >
              {CUT_TYPE_LABELS[ct]}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
