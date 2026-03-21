"use client";

import { useState, useMemo } from "react";
import type { Barber, CutType } from "@/types";
import { CUT_TYPE_LABELS, filterBarbers } from "@/lib/filters";
import { BarberCard } from "@/components/BarberCard";

type SortOption = "fadeScore" | "reviews" | "priceLow";

const SORT_LABELS: Record<SortOption, string> = {
  fadeScore: "FadeScore",
  reviews: "Most Reviews",
  priceLow: "Price: Low to High",
};

interface CityFiltersProps {
  barbers: Barber[];
}

export function CityFilters({ barbers }: CityFiltersProps) {
  const [selectedCuts, setSelectedCuts] = useState<CutType[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("fadeScore");

  // Only show cut types that at least one barber has
  const availableCutTypes = (Object.keys(CUT_TYPE_LABELS) as CutType[]).filter((ct) =>
    barbers.some((b) => b.cutTypes?.includes(ct)),
  );

  function toggleCut(ct: CutType) {
    setSelectedCuts((prev) =>
      prev.includes(ct) ? prev.filter((c) => c !== ct) : [...prev, ct],
    );
  }

  const filtered = useMemo(() => {
    const base =
      selectedCuts.length > 0
        ? filterBarbers(barbers, [], selectedCuts)
        : barbers;

    return [...base].sort((a, b) => {
      switch (sortBy) {
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "priceLow":
          return a.avgPrice - b.avgPrice;
        case "fadeScore":
        default:
          return b.fadeScore - a.fadeScore;
      }
    });
  }, [barbers, selectedCuts, sortBy]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {availableCutTypes.map((ct) => (
          <button
            key={ct}
            type="button"
            onClick={() => toggleCut(ct)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selectedCuts.includes(ct)
                ? "bg-fade-pill text-fade-navy border-fade-pill"
                : "bg-fade-pill/15 border-fade-pill/40 text-fade-navy hover:bg-fade-pill/30"
            }`}
          >
            {CUT_TYPE_LABELS[ct]}
          </button>
        ))}
        {selectedCuts.length > 0 && (
          <button
            type="button"
            onClick={() => setSelectedCuts([])}
            className="px-3 py-1.5 rounded-full text-sm font-medium text-fade-muted hover:text-fade-navy"
          >
            Clear
          </button>
        )}

        <span className="ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-fade-navy/10 bg-white px-3 py-1.5 text-sm text-fade-navy focus:outline-none focus:ring-2 focus:ring-fade-accent/40"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
              <option key={opt} value={opt}>
                {SORT_LABELS[opt]}
              </option>
            ))}
          </select>
        </span>
      </div>
      {filtered.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 list-none p-0 m-0">
          {filtered.map((barber, i) => (
            <li key={barber.id} className="min-h-0 h-full">
              <BarberCard barber={barber} rank={i + 1} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-fade-muted py-4">No barbers match the selected filters.</p>
      )}
    </div>
  );
}
