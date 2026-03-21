import Link from "next/link";
import type { Barber } from "@/types";
import { getCityPageStats } from "@/lib/data";
import { CityFilters } from "@/components/CityFilters";
import { getCityListJsonLd } from "@/lib/schema";
import { getCutTypeLinks, getHairTypeLinks } from "@/lib/seo";

interface CityPageTemplateProps {
  citySlug: string;
  cityName: string;
  state: string;
  barbers: Barber[];
  variant: "best" | "best-fade" | "cheap";
  pageTitle: string;
  metaDescription: string;
  introText: string;
}

export function CityPageTemplate({
  citySlug,
  cityName,
  state,
  barbers,
  variant,
  pageTitle,
  metaDescription,
  introText,
}: CityPageTemplateProps) {
  const { avgPrice, topBarberName, topBarberScore } = getCityPageStats(cityName, barbers);
  const top20 = barbers.slice(0, 20);
  const hiddenGems = barbers.filter((b) => b.isHiddenGem).slice(0, 5);
  const cheapBarbers = barbers.filter((b) => b.isCheap).slice(0, 5);

  const goodBarbers = barbers.filter((b) => b.fadeScore >= 4.5);
  const goodMin = goodBarbers.length > 0 ? Math.min(...goodBarbers.map((b) => b.avgPrice)) : avgPrice;
  const goodMax = goodBarbers.length > 0 ? Math.max(...goodBarbers.map((b) => b.avgPrice)) : avgPrice;
  const priceSummary =
    goodBarbers.length > 0
      ? `In ${cityName}, great cuts (4.5+ FadeScore) typically cost $${goodMin}–$${goodMax}.`
      : `The average haircut price in ${cityName} is $${avgPrice}.`;

  const cutTypeLinks = getCutTypeLinks(citySlug, cityName);
  const hairTypeLinks = getHairTypeLinks(citySlug, cityName);

  const jsonLd = getCityListJsonLd(
    barbers,
    cityName,
    pageTitle,
    `https://fadescore.com/${variant === "best" ? "best-barbers-in" : variant === "best-fade" ? "best-fade-barbers-in" : "cheap-barbers-in"}/${citySlug}`,
  );

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl font-bold tracking-tight text-fade-navy mb-4">{pageTitle}</h1>
      <p className="text-lg text-fade-muted mb-6">{introText}</p>

      <p className="mb-10 rounded-2xl bg-amber-50/90 border border-amber-200/80 px-4 py-3 text-fade-navy">
        {priceSummary}
        {topBarberName && (
          <span className="block mt-1 text-sm text-fade-muted">
            Top rated: {topBarberName} (FadeScore {topBarberScore}).
          </span>
        )}
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-fade-navy mb-6">Top Barbers in {cityName}</h2>
        <CityFilters barbers={top20} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-fade-navy mb-4">Price vs Quality: {cityName} Barbers</h2>
        <div className="border border-fade-navy/10 rounded-2xl p-6 bg-white/80 shadow-sm">
          <p className="text-fade-muted text-sm mb-4">
            Sorted cheapest to most expensive. Taller bar = higher FadeScore.{" "}
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-emerald-400" /> Great value
              <span className="inline-block w-3 h-3 rounded-sm bg-fade-accent ml-2" /> Good
            </span>
          </p>
          <div className="flex gap-1.5 items-end" style={{ height: "14rem" }}>
            {[...top20].sort((a, b) => a.avgPrice - b.avgPrice).slice(0, 10).map((b) => {
              const pct = Math.max(25, ((b.fadeScore - 3) / 2) * 100);
              const isGreatValue = b.fadeScore >= 4.5 && b.avgPrice <= 40;
              return (
                <Link
                  key={b.id}
                  href={`/barber/${b.slug}`}
                  className="flex-1 flex flex-col items-center justify-end group min-w-0"
                  title={`${b.name} — $${b.avgPrice}, ${b.fadeScore} FadeScore`}
                >
                  <span className="text-[10px] text-fade-muted mb-1 font-medium group-hover:text-fade-navy transition-colors truncate max-w-full px-0.5">
                    {b.fadeScore}
                  </span>
                  <span
                    className={`w-full rounded-t flex items-end justify-center pb-1 text-xs font-bold transition-colors ${
                      isGreatValue
                        ? "bg-emerald-400 group-hover:bg-emerald-500 text-emerald-950"
                        : "bg-fade-accent group-hover:bg-fade-accent/80 text-fade-navy"
                    }`}
                    style={{ height: `${pct}%` }}
                  >
                    ${b.avgPrice}
                  </span>
                  <span className="text-[10px] text-fade-muted mt-1 truncate max-w-full px-0.5 text-center leading-tight group-hover:text-fade-navy transition-colors">
                    {b.name.split(" ")[0]}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-fade-muted border-t border-fade-navy/10 pt-2 mt-2">
            <span>Cheapest</span>
            <span>Most expensive</span>
          </div>
        </div>
      </section>

      {hiddenGems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-fade-navy mb-4">Best Value Barbers in {cityName}</h2>
          <ul className="space-y-2">
            {hiddenGems.map((b) => (
              <li key={b.id}>
                <Link href={`/barber/${b.slug}`} className="font-medium hover:underline">
                  {b.name}
                </Link>
                <span className="text-fade-muted text-sm ml-2">
                  at <Link href={`/shop/${b.shopSlug}`} className="font-name hover:text-fade-accent hover:underline">{b.shopName}</Link> · {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/icons/star-filled.png" alt="" width={14} height={14} className="inline-block -mt-0.5" /> {b.fadeScore} · Avg ${b.avgPrice}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {cheapBarbers.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-fade-navy mb-4">Best Cheap Barbers in {cityName}</h2>
          <ul className="space-y-2">
            {cheapBarbers.map((b) => (
              <li key={b.id}>
                <Link href={`/barber/${b.slug}`} className="font-medium hover:underline">
                  {b.name}
                </Link>
                <span className="text-fade-muted text-sm ml-2">
                  at <Link href={`/shop/${b.shopSlug}`} className="font-name hover:text-fade-accent hover:underline">{b.shopName}</Link> · {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/icons/star-filled.png" alt="" width={14} height={14} className="inline-block -mt-0.5" /> {b.fadeScore} · Avg ${b.avgPrice}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Specialty links */}
      <nav className="border-t border-fade-navy/10 pt-8 mb-8">
        <h3 className="font-semibold text-fade-navy mb-3">Browse by specialty in {cityName}</h3>
        <ul className="flex flex-wrap gap-2.5 text-sm">
          {cutTypeLinks.slice(0, 8).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-block px-3 py-1.5 rounded-full border border-fade-pill/40 bg-fade-pill/15 text-fade-navy hover:bg-fade-pill/30 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="mb-8">
        <h3 className="font-semibold text-fade-navy mb-3">By hair type</h3>
        <ul className="flex flex-wrap gap-2.5 text-sm">
          {hairTypeLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-block px-3 py-1.5 rounded-full border border-fade-pill/40 bg-fade-pill/15 text-fade-navy hover:bg-fade-pill/30 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="border-t border-fade-navy/10 pt-8">
        <h3 className="font-semibold text-fade-navy mb-2">More in {state}</h3>
        <ul className="flex flex-wrap gap-3 text-sm">
          <li><Link href={`/best-barbers-in/${citySlug}`} className="text-fade-accent hover:underline">Best Barbers in {cityName}</Link></li>
          <li><Link href={`/best-fade-barbers-in/${citySlug}`} className="text-fade-muted hover:text-fade-navy hover:underline">Best Fade Barbers</Link></li>
          <li><Link href={`/cheap-barbers-in/${citySlug}`} className="text-fade-muted hover:text-fade-navy hover:underline">Cheap Barbers</Link></li>
          <li><Link href={`/top-rated-barbers-in/${citySlug}`} className="text-fade-muted hover:text-fade-navy hover:underline">Top Rated</Link></li>
          <li><Link href={`/hidden-gem-barbers-in/${citySlug}`} className="text-fade-muted hover:text-fade-navy hover:underline">Hidden Gems</Link></li>
        </ul>
      </nav>
    </article>
  );
}
