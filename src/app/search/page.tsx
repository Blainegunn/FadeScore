import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { getCityBySlug, getAllCities } from "@/data/cities";
import { getBarbersByCity } from "@/data/barbers";
import { getZipInfo } from "@/data/zips";
import { getCitiesWithinRadius, distanceMiles } from "@/lib/geo";
import { parseQueryParts, geocodeCity } from "@/lib/geocode";
import { SearchResultsList } from "./SearchResultsList";
import { SearchForm } from "./SearchForm";
import { SearchResultsToolbar, type SortOption } from "./SearchResultsToolbar";
import { filterBarbers } from "@/lib/filters";
import { CityWaitlist } from "@/components/CityWaitlist";
import type { HairType, CutType } from "@/types";

interface PriceInsight {
  avg: number;
  min: number;
  max: number;
  goodAvg: number;
  goodMin: number;
  goodMax: number;
  goodCount: number;
  locationLabel: string;
}

function computePriceInsight(
  results: { barber: { fadeScore: number; avgPrice: number } }[],
  locationLabel: string,
): PriceInsight | null {
  if (results.length < 3) return null;

  const prices = results.map((r) => r.barber.avgPrice);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = Math.round(prices.reduce((s, p) => s + p, 0) / prices.length);

  const good = results.filter((r) => r.barber.fadeScore >= 4.5);
  if (good.length === 0) return null;

  const goodPrices = good.map((r) => r.barber.avgPrice);
  const goodMin = Math.min(...goodPrices);
  const goodMax = Math.max(...goodPrices);
  const goodAvg = Math.round(goodPrices.reduce((s, p) => s + p, 0) / goodPrices.length);

  return { avg, min, max, goodAvg, goodMin, goodMax, goodCount: good.length, locationLabel };
}

export const metadata: Metadata = {
  title: "Find Barbers Near You | Search by City, Zip, or Radius | FadeScore",
  description: "Search for the best barbers by city, zip code, or within a radius. Find top-rated barbers in your area.",
};

interface Props {
  searchParams: Promise<{
    q?: string;
    radius?: string;
    sort?: string;
    priceMin?: string;
    priceMax?: string;
    city?: string;
    zip?: string;
    hairTypes?: string;
    cutTypes?: string;
  }>;
}

/** Resolve a query to known cities by slug, "Name, State", or name (may return multiple for ambiguous names). */
async function resolveCities(raw: string) {
  const CITIES = await getAllCities();

  // Slug match
  const bySlug = await getCityBySlug(raw);
  if (bySlug) return [bySlug];

  const lower = raw.toLowerCase();

  // "Name, State" match
  const byNameState = CITIES.find(
    (c) => `${c.name}, ${c.state}`.toLowerCase() === lower,
  );
  if (byNameState) return [byNameState];

  // Name-only match
  const byName = CITIES.filter((c) => c.name.toLowerCase() === lower);
  if (byName.length > 0) return byName;

  return [];
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const CITIES = await getAllCities();

  // Unified q param, with legacy fallbacks
  const q = (params.q ?? params.zip ?? params.city ?? "").trim();
  const radiusMiles = Math.min(100, Math.max(1, parseInt(params.radius ?? "25", 10) || 25));
  const sortParam = (params.sort ?? "value") as SortOption;
  const validSort: SortOption[] = ["value", "rating", "price", "distance"];
  const sort: SortOption = validSort.includes(sortParam) ? sortParam : "value";
  const priceMinParam = params.priceMin?.trim() ?? "";
  const priceMaxParam = params.priceMax?.trim() ?? "";
  const priceMin = priceMinParam ? Math.max(0, parseInt(priceMinParam, 10) || 0) : null;
  const priceMax = priceMaxParam ? Math.min(200, parseInt(priceMaxParam, 10) || 200) : null;
  const hairTypeParams = (params.hairTypes?.split(",").filter(Boolean) ?? []) as HairType[];
  const cutTypeParams = (params.cutTypes?.split(",").filter(Boolean) ?? []) as CutType[];

  const isZip = /^\d{5}$/.test(q);

  let results: { barber: Awaited<ReturnType<typeof getBarbersByCity>>[number]; distanceMiles?: number }[] = [];
  let heading = "Search for barbers";
  let subheading = "Enter a city name or zip code above.";
  let searchedByZip = false;
  let searchedByGeocode = false;
  let geocodedFromMultiple = false;
  let geocodedDisplayNames: string[] = [];
  let geocodedNoBarbers = false;
  let geocodedCityLabel = "";
  let locationLabel = "";

  if (q) {
    if (isZip) {
      // --- ZIP CODE PATH ---
      searchedByZip = true;
      const zipInfo = await getZipInfo(q);
      if (!zipInfo) {
        heading = "Zip code not found";
        subheading = `We couldn't find zip "${q}". Try a different zip or city name.`;
      } else {
        const citiesInRadius = await getCitiesWithinRadius(zipInfo.lat, zipInfo.lng, radiusMiles);
        for (const city of citiesInRadius) {
          for (const barber of await getBarbersByCity(city.slug)) {
            const shopDist =
              barber.latitude != null && barber.longitude != null
                ? Math.round(distanceMiles(zipInfo.lat, zipInfo.lng, barber.latitude, barber.longitude) * 10) / 10
                : city.distanceMiles;
            results.push({ barber, distanceMiles: shopDist });
          }
        }
        results.sort((a, b) => (a.distanceMiles ?? 0) - (b.distanceMiles ?? 0));
        results = results.slice(0, 60);
        heading = `Barbers near ${zipInfo.cityName}`;
        subheading = `${zipInfo.cityName}, ${zipInfo.state} — ${results.length} barber${results.length !== 1 ? "s" : ""} within ${radiusMiles} mi`;
        locationLabel = zipInfo.cityName;
      }
    } else {
      // --- CITY NAME PATH ---
      const cities = await resolveCities(q);
      if (cities.length > 0) {
        for (const city of cities) {
          for (const barber of await getBarbersByCity(city.slug)) {
            results.push({ barber });
          }
        }
        if (cities.length === 1) {
          heading = `Barbers in ${cities[0].name}`;
          subheading = `${cities[0].state} — ${results.length} barber${results.length !== 1 ? "s" : ""}`;
          locationLabel = cities[0].name;
        } else {
          const cityLabels = cities.map((c) => `${c.name}, ${c.state}`).join(" & ");
          heading = `Barbers in ${cities[0].name}`;
          subheading = `Showing results from ${cityLabels} — ${results.length} barber${results.length !== 1 ? "s" : ""}`;
          locationLabel = cities[0].name;
        }
      } else {
        // No exact match — try fuzzy substring match
        const lower = q.toLowerCase();
        const fuzzy = CITIES.filter(
          (c) =>
            c.name.toLowerCase().includes(lower) ||
            c.state.toLowerCase().includes(lower),
        );
        if (fuzzy.length > 0) {
          for (const city of fuzzy) {
            for (const barber of await getBarbersByCity(city.slug)) {
              results.push({ barber });
            }
          }
          heading = `Barbers matching "${q}"`;
          subheading = `${results.length} barber${results.length !== 1 ? "s" : ""} found`;
          locationLabel = q;
        } else {
          // --- GEOCODE FALLBACK ---
          const { cityName, stateFilter } = parseQueryParts(q);
          const geocoded = await geocodeCity(cityName, stateFilter);

          if (geocoded.length > 0) {
            searchedByGeocode = true;
            geocodedDisplayNames = geocoded.map((g) => g.displayName);
            geocodedCityLabel = geocoded.length === 1
              ? geocoded[0].displayName
              : cityName;
            geocodedFromMultiple = geocoded.length > 1;

            const seenBarberIds = new Set<string>();
            for (const loc of geocoded) {
              const nearbyCities = await getCitiesWithinRadius(loc.lat, loc.lng, radiusMiles);
              for (const city of nearbyCities) {
                for (const barber of await getBarbersByCity(city.slug)) {
                  if (!seenBarberIds.has(barber.id)) {
                    seenBarberIds.add(barber.id);
                    const shopDist =
                      barber.latitude != null && barber.longitude != null
                        ? Math.round(distanceMiles(loc.lat, loc.lng, barber.latitude, barber.longitude) * 10) / 10
                        : city.distanceMiles;
                    results.push({ barber, distanceMiles: shopDist });
                  }
                }
              }
            }

            results.sort((a, b) => (a.distanceMiles ?? 0) - (b.distanceMiles ?? 0));
            results = results.slice(0, 60);

            if (results.length > 0) {
              heading = `Barbers near ${geocodedCityLabel}`;
              locationLabel = geocodedCityLabel;
              if (geocodedFromMultiple) {
                subheading = `Showing results near ${geocodedDisplayNames.join(" & ")} — ${results.length} barber${results.length !== 1 ? "s" : ""} within ${radiusMiles} mi`;
              } else {
                subheading = `${results.length} barber${results.length !== 1 ? "s" : ""} within ${radiusMiles} mi of ${geocodedDisplayNames[0]}`;
              }
            } else {
              geocodedNoBarbers = true;
              heading = "No barbers found";
              subheading = `We found ${geocodedDisplayNames.join(" & ")} but no barbers within ${radiusMiles} mi.`;
            }
          } else {
            heading = "No results found";
            subheading = `We couldn't find "${q}". Try a zip code or different city name.`;
          }
        }
      }
    }
  }

  // Apply hair type / cut type filters
  if (hairTypeParams.length > 0 || cutTypeParams.length > 0) {
    const filteredBarbers = filterBarbers(
      results.map((r) => r.barber),
      hairTypeParams,
      cutTypeParams,
    );
    const filteredIds = new Set(filteredBarbers.map((b) => b.id));
    results = results.filter((r) => filteredIds.has(r.barber.id));
  }

  // Apply price filter
  if (priceMin != null && priceMin > 0) {
    results = results.filter((r) => r.barber.avgPrice >= priceMin);
  }
  if (priceMax != null && priceMax > 0) {
    results = results.filter((r) => r.barber.avgPrice <= priceMax);
  }

  // Sort results
  if (sort === "rating") {
    results = [...results].sort((a, b) => b.barber.fadeScore - a.barber.fadeScore);
  } else if (sort === "price") {
    results = [...results].sort((a, b) => a.barber.avgPrice - b.barber.avgPrice);
  } else if (sort === "distance") {
    results = [...results].sort(
      (a, b) => (a.distanceMiles ?? 999) - (b.distanceMiles ?? 999)
    );
  } else {
    // value: higher FadeScore and lower price = better value
    const valueScore = (r: (typeof results)[0]) =>
      r.barber.fadeScore * (50 / Math.max(r.barber.avgPrice, 1));
    results = [...results].sort((a, b) => valueScore(b) - valueScore(a));
  }

  const priceInsight = computePriceInsight(results, locationLabel);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-fade-navy mb-2">
        Find barbers in your area
      </h1>
      <p className="text-fade-muted mb-8 max-w-2xl">
        Enter a city name or zip code to find top-rated barbers near you.
      </p>

      <Suspense fallback={<div className="h-32 rounded-2xl bg-fade-navy/5 animate-pulse" />}>
        <SearchForm
          defaultQuery={q}
          defaultRadius={radiusMiles}
          defaultHairTypes={hairTypeParams}
          defaultCutTypes={cutTypeParams}
        />
      </Suspense>

      <section id="results" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-semibold text-fade-navy mb-2">{heading}</h2>
        <p className="text-fade-muted mb-6">{subheading}</p>

        {geocodedFromMultiple && results.length > 0 && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
            <strong>Multiple cities found:</strong> There are {geocodedDisplayNames.length} cities named &ldquo;{parseQueryParts(q).cityName}&rdquo; in the US ({geocodedDisplayNames.join(", ")}). To narrow results, search for &ldquo;{geocodedDisplayNames[0]}&rdquo;.
          </div>
        )}

        {geocodedNoBarbers && (
          <div className="mb-6 rounded-2xl border border-fade-accent/40 bg-fade-accent/10 px-4 py-3 text-sm text-fade-navy">
            We found {geocodedDisplayNames.join(" & ")} on the map but don&rsquo;t have barber data for that area yet.
          </div>
        )}

        {results.length > 0 && (
          <SearchResultsToolbar
            resultCount={results.length}
            defaultSort={sort}
            defaultPriceMin={priceMinParam}
            defaultPriceMax={priceMaxParam}
            activeHairTypes={hairTypeParams}
            activeCutTypes={cutTypeParams}
          />
        )}

        {priceInsight && (
          <div className="mb-8 rounded-2xl border border-fade-navy/8 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3">
              <Image src="/icons/chair.png" alt="" width={24} height={24} className="opacity-80" />
              <h3 className="text-base font-semibold text-fade-navy">
                What a good haircut costs in {priceInsight.locationLabel}
              </h3>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-xl font-bold text-fade-navy tabular-nums">
                ${priceInsight.goodMin} – ${priceInsight.goodMax}
              </span>
              <span className="text-sm text-fade-muted">
                average ${priceInsight.goodAvg}
              </span>
            </div>

            <div className="relative h-2.5 rounded-full bg-fade-canvas mb-3 overflow-hidden">
              {(() => {
                const range = priceInsight.max - priceInsight.min || 1;
                const left = ((priceInsight.goodMin - priceInsight.min) / range) * 100;
                const width = ((priceInsight.goodMax - priceInsight.goodMin) / range) * 100;
                return (
                  <div
                    className="absolute top-0 h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                    style={{ left: `${left}%`, width: `${Math.max(width, 4)}%` }}
                  />
                );
              })()}
            </div>

            <p className="text-xs text-fade-muted mb-1">
              Based on {priceInsight.goodCount} barber{priceInsight.goodCount !== 1 ? "s" : ""} rated 4.5+ FadeScore
            </p>
            <p className="text-xs text-fade-muted/80">
              All barbers: ${priceInsight.min} – ${priceInsight.max} · avg ${priceInsight.avg}
            </p>
          </div>
        )}

        {results.length > 0 ? (
          <SearchResultsList
            results={results}
            showRanks={!searchedByZip && !searchedByGeocode}
          />
        ) : q ? (
          <CityWaitlist cityName={q} />
        ) : (
          <div className="rounded-2xl border border-fade-navy/8 bg-white/90 p-6 text-center shadow-sm">
            <p className="text-fade-navy mb-2">
              We don&rsquo;t have barbers in that area yet.
            </p>
            <p className="text-sm text-fade-muted mb-4">
              Try a nearby city or zip code, or browse popular cities below.
            </p>
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-fade-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-fade-navy/90"
            >
              Back to search
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
