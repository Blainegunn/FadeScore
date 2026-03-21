"use client";

import { useState } from "react";
import type { Barber } from "@/types";
import { BarberCard } from "@/components/BarberCard";

interface SearchResult {
  barber: Barber;
  distanceMiles?: number;
}

interface SearchResultsListProps {
  results: SearchResult[];
  showRanks: boolean;
}

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 30;

export function SearchResultsList({ results, showRanks }: SearchResultsListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visible = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 list-none p-0 m-0">
        {visible.map(({ barber, distanceMiles }, i) => (
          <li key={barber.id} className="h-full">
            <BarberCard
              barber={barber}
              rank={showRanks ? i + 1 : undefined}
              distanceMiles={distanceMiles}
              showVerified={false}
            />
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
            Show more ({results.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </>
  );
}
