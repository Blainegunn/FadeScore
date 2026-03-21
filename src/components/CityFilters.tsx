"use client";

import { useState } from "react";
import type { Barber, CutType } from "@/types";
import { CUT_TYPE_LABELS, filterBarbers } from "@/lib/filters";
import { BarberCard } from "@/components/BarberCard";

interface CityFiltersProps {
  barbers: Barber[];
}

export function CityFilters({ barbers }: CityFiltersProps) {
  const [selectedCuts, setSelectedCuts] = useState<CutType[]>([]);

  // Only show cut types that at least one barber has
  const availableCutTypes = (Object.keys(CUT_TYPE_LABELS) as CutType[]).filter((ct) =>
    barbers.some((b) => b.cutTypes?.includes(ct)),
  );

  function toggleCut(ct: CutType) {
    setSelectedCuts((prev) =>
      prev.includes(ct) ? prev.filter((c) => c !== ct) : [...prev, ct],
    );
  }

  const filtered =
    selectedCuts.length > 0
      ? filterBarbers(barbers, [], selectedCuts)
      : barbers;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
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
