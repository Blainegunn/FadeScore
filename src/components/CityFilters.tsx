"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { Barber, CutType } from "@/types";
import { CUT_TYPE_LABELS, filterBarbers } from "@/lib/filters";
import { BarberCard } from "@/components/BarberCard";

type SortOption = "fadeScore" | "reviews" | "priceLow";

const SORT_LABELS: Record<SortOption, string> = {
  fadeScore: "FadeScore",
  reviews: "Most Reviews",
  priceLow: "Price: Low to High",
};

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 30;

function FilterIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/icons/filter.png"
      alt=""
      width={18}
      height={18}
      className={`object-contain shrink-0 opacity-90 ${className ?? ""}`}
    />
  );
}

interface CityFiltersProps {
  barbers: Barber[];
}

export function CityFilters({ barbers }: CityFiltersProps) {
  const [selectedCuts, setSelectedCuts] = useState<CutType[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("fadeScore");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Only show cut types that at least one barber has
  const availableCutTypes = (Object.keys(CUT_TYPE_LABELS) as CutType[]).filter((ct) =>
    barbers.some((b) => b.cutTypes?.includes(ct)),
  );

  function toggleCut(ct: CutType) {
    setSelectedCuts((prev) =>
      prev.includes(ct) ? prev.filter((c) => c !== ct) : [...prev, ct],
    );
    setVisibleCount(INITIAL_COUNT);
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

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      {/* Mobile: toggle button + sort */}
      <div className="flex items-center gap-2 mb-4 sm:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selectedCuts.length > 0
              ? "bg-fade-pill text-fade-navy border-fade-pill"
              : "bg-white border-fade-navy/12 text-fade-navy"
          }`}
        >
          <FilterIcon />
          Filters
          {selectedCuts.length > 0 && (
            <span className="ml-0.5 inline-flex items-center justify-center h-5 w-5 rounded-full bg-fade-navy text-white text-xs font-bold">
              {selectedCuts.length}
            </span>
          )}
        </button>
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

      {/* Mobile: collapsible filter pills */}
      {filtersOpen && (
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:hidden">
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
              onClick={() => {
                setSelectedCuts([]);
                setVisibleCount(INITIAL_COUNT);
              }}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-fade-muted hover:text-fade-navy"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Desktop: always-visible filters + sort */}
      <div className="hidden sm:flex flex-wrap items-center gap-2 mb-6">
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
            onClick={() => {
              setSelectedCuts([]);
              setVisibleCount(INITIAL_COUNT);
            }}
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

      {visible.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 list-none p-0 m-0">
            {visible.map((barber, i) => (
              <li key={barber.id} className="min-h-0 h-full">
                <BarberCard barber={barber} rank={i + 1} />
              </li>
            ))}
          </ul>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
                className="inline-flex items-center rounded-full bg-fade-navy px-8 py-3 text-sm font-semibold text-white hover:bg-fade-navy/90 transition-colors shadow-sm"
              >
                Show more ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-fade-muted py-4">No barbers match the selected filters.</p>
      )}
    </div>
  );
}
