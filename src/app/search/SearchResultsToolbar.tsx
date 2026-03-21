"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { HairType, CutType } from "@/types";
import { HAIR_TYPE_LABELS, CUT_TYPE_LABELS } from "@/lib/filters";

export type SortOption = "value" | "rating" | "price" | "distance";

const SORT_LABELS: Record<SortOption, string> = {
  value: "Best value",
  rating: "Highest rated",
  price: "Lowest price",
  distance: "Distance",
};

interface SearchResultsToolbarProps {
  resultCount: number;
  defaultSort: SortOption;
  defaultPriceMin: string;
  defaultPriceMax: string;
  activeHairTypes: HairType[];
  activeCutTypes: CutType[];
}

function buildSearchUrl(params: {
  q: string;
  radius: string;
  sort?: SortOption;
  priceMin?: string;
  priceMax?: string;
  hairTypes?: string;
  cutTypes?: string;
}): string {
  const sp = new URLSearchParams();
  sp.set("q", params.q);
  sp.set("radius", params.radius);
  if (params.sort && params.sort !== "value") sp.set("sort", params.sort);
  if (params.priceMin?.trim()) sp.set("priceMin", params.priceMin.trim());
  if (params.priceMax?.trim()) sp.set("priceMax", params.priceMax.trim());
  if (params.hairTypes) sp.set("hairTypes", params.hairTypes);
  if (params.cutTypes) sp.set("cutTypes", params.cutTypes);
  return `/search?${sp.toString()}`;
}

export function SearchResultsToolbar({
  resultCount,
  defaultSort,
  defaultPriceMin,
  defaultPriceMax,
  activeHairTypes,
  activeCutTypes,
}: SearchResultsToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const radius = searchParams.get("radius") ?? "25";

  const hasActiveFilters =
    defaultSort !== "value" ||
    defaultPriceMin !== "" ||
    defaultPriceMax !== "" ||
    activeHairTypes.length > 0 ||
    activeCutTypes.length > 0;

  const clearAllUrl = buildSearchUrl({
    q,
    radius,
    sort: "value",
    priceMin: "",
    priceMax: "",
    hairTypes: "",
    cutTypes: "",
  });

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const sort = e.target.value as SortOption;
      router.push(
        buildSearchUrl({
          q,
          radius,
          sort,
          priceMin: defaultPriceMin,
          priceMax: defaultPriceMax,
          hairTypes: activeHairTypes.join(","),
          cutTypes: activeCutTypes.join(","),
        })
      );
    },
    [router, q, radius, defaultPriceMin, defaultPriceMax, activeHairTypes, activeCutTypes]
  );

  const handlePriceSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const priceMin = (form.elements.namedItem("priceMin") as HTMLInputElement)?.value ?? "";
      const priceMax = (form.elements.namedItem("priceMax") as HTMLInputElement)?.value ?? "";
      router.push(
        buildSearchUrl({
          q,
          radius,
          sort: defaultSort,
          priceMin,
          priceMax,
          hairTypes: activeHairTypes.join(","),
          cutTypes: activeCutTypes.join(","),
        })
      );
    },
    [router, q, radius, defaultSort, activeHairTypes, activeCutTypes]
  );

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-fade-navy">
          {resultCount} result{resultCount !== 1 ? "s" : ""}
        </span>
        <select
          aria-label="Sort results by"
          value={defaultSort}
          onChange={handleSortChange}
          className="rounded-full border border-fade-navy/12 bg-white px-5 py-2 text-sm text-fade-navy focus:outline-none focus:ring-2 focus:ring-fade-accent/50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235B6578%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9"
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
            <option key={key} value={key}>
              {SORT_LABELS[key]}
            </option>
          ))}
        </select>
        <form onSubmit={handlePriceSubmit} className="flex items-center gap-2 flex-wrap">
          <label htmlFor="price-min" className="sr-only">
            Min price
          </label>
          <input
            id="price-min"
            name="priceMin"
            type="number"
            min={0}
            max={200}
            placeholder="Min $"
            defaultValue={defaultPriceMin || undefined}
            className="w-20 rounded-full border border-fade-navy/12 bg-white px-2 py-2 text-sm text-fade-navy"
          />
          <span className="text-fade-muted">–</span>
          <label htmlFor="price-max" className="sr-only">
            Max price
          </label>
          <input
            id="price-max"
            name="priceMax"
            type="number"
            min={0}
            max={200}
            placeholder="Max $"
            defaultValue={defaultPriceMax || undefined}
            className="w-20 rounded-full border border-fade-navy/12 bg-white px-2 py-2 text-sm text-fade-navy"
          />
          <button
            type="submit"
            className="rounded-full border border-fade-navy/15 bg-fade-canvas px-3 py-2 text-sm font-medium text-fade-navy hover:bg-white"
          >
            Apply
          </button>
        </form>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-fade-muted">
            <Image
              src="/icons/filter.png"
              alt=""
              width={14}
              height={14}
              className="object-contain opacity-80 shrink-0"
            />
            Active filters:
          </span>
          {defaultSort !== "value" && (
            <span className="inline-flex items-center rounded-full bg-fade-accent/15 px-2.5 py-0.5 text-xs font-medium text-fade-navy">
              {SORT_LABELS[defaultSort]}
            </span>
          )}
          {defaultPriceMin && (
            <span className="inline-flex items-center rounded-full bg-fade-canvas border border-fade-navy/10 px-2.5 py-0.5 text-xs text-fade-muted">
              From ${defaultPriceMin}
            </span>
          )}
          {defaultPriceMax && (
            <span className="inline-flex items-center rounded-full bg-fade-canvas border border-fade-navy/10 px-2.5 py-0.5 text-xs text-fade-muted">
              Under ${defaultPriceMax}
            </span>
          )}
          {activeHairTypes.map((ht) => (
            <span
              key={ht}
              className="inline-flex items-center rounded-full bg-fade-canvas border border-fade-navy/10 px-2.5 py-0.5 text-xs text-fade-muted"
            >
              {HAIR_TYPE_LABELS[ht]}
            </span>
          ))}
          {activeCutTypes.map((ct) => (
            <span
              key={ct}
              className="inline-flex items-center rounded-full bg-fade-canvas border border-fade-navy/10 px-2.5 py-0.5 text-xs text-fade-muted"
            >
              {CUT_TYPE_LABELS[ct]}
            </span>
          ))}
          <a
            href={clearAllUrl}
            className="text-xs font-medium text-fade-accent hover:underline"
          >
            Clear all
          </a>
        </div>
      )}
    </div>
  );
}
