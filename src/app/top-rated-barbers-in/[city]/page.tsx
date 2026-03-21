import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/data";
import { getBarbersByCity } from "@/data/barbers";
import { BarberCard } from "@/components/BarberCard";
import { getCutTypeLinks, getHairTypeLinks } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return { title: "City Not Found" };
  const year = new Date().getFullYear();
  return {
    title: `Top Rated Barbers in ${city.name} (${year}) | FadeScore`,
    description: `The highest-rated barbers in ${city.name}, ranked by FadeScore and real customer reviews. Find the top barbers near you.`,
  };
}

export default async function TopRatedCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();

  const barbers = await getBarbersByCity(city.slug);
  // Already sorted by fade_score desc from the query, but ensure it
  const sorted = [...barbers].sort((a, b) => b.fadeScore - a.fadeScore);
  const year = new Date().getFullYear();

  const cutTypeLinks = getCutTypeLinks(city.slug, city.name);
  const hairTypeLinks = getHairTypeLinks(city.slug, city.name);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-16">
      <nav className="text-sm text-fade-muted mb-6">
        <Link href="/" className="hover:text-fade-navy">FadeScore</Link>
        {" / "}
        <Link href={`/best-barbers-in/${city.slug}`} className="hover:text-fade-navy">{city.name}</Link>
        {" / "}
        <span className="text-fade-navy">Top Rated</span>
      </nav>

      <h1 className="text-4xl font-bold tracking-tight text-fade-navy mb-4">
        Top Rated Barbers in {city.name} ({year})
      </h1>
      <p className="text-lg text-fade-muted mb-6">
        The highest-rated barbers in {city.name}, ranked by FadeScore — our rating based on real customer reviews across Google, Yelp, and other platforms.
      </p>

      {sorted.length > 0 && sorted[0] && (
        <p className="mb-10 rounded-2xl bg-amber-50/90 border border-amber-200/80 px-4 py-3 text-fade-navy">
          {sorted.length} barber{sorted.length !== 1 ? "s" : ""} ranked in {city.name}.
          <span className="block mt-1 text-sm text-fade-muted">
            #1: <span className="font-name">{sorted[0].name}</span> at{" "}
            <span className="font-name">{sorted[0].shopName}</span> — FadeScore{" "}
            {sorted[0].fadeScore}, ${sorted[0].avgPrice} avg.
          </span>
        </p>
      )}

      {sorted.length > 0 ? (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-fade-navy mb-6">Highest Rated Barbers in {city.name}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 list-none p-0 m-0">
            {sorted.slice(0, 20).map((barber, i) => (
              <li key={barber.id} className="h-full">
                <BarberCard barber={barber} rank={i + 1} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="mb-12">
          <div className="rounded-2xl border border-fade-navy/8 bg-white/90 p-6 text-center shadow-sm">
            <p className="text-fade-muted">No barbers found in {city.name} yet.</p>
          </div>
        </section>
      )}

      {/* Specialty links */}
      <nav className="border-t border-fade-navy/10 pt-8 mb-8">
        <h3 className="font-semibold text-fade-navy mb-3">Browse by specialty in {city.name}</h3>
        <ul className="flex flex-wrap gap-2 text-sm">
          {cutTypeLinks.slice(0, 8).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="px-3 py-1.5 rounded-full border border-fade-navy/10 text-fade-muted hover:border-fade-accent/50 hover:text-fade-navy transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="mb-8">
        <h3 className="font-semibold text-fade-navy mb-3">By hair type</h3>
        <ul className="flex flex-wrap gap-2 text-sm">
          {hairTypeLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="px-3 py-1.5 rounded-full border border-fade-navy/10 text-fade-muted hover:border-fade-accent/50 hover:text-fade-navy transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="border-t border-fade-navy/10 pt-8">
        <h3 className="font-semibold text-fade-navy mb-2">More in {city.state}</h3>
        <ul className="flex flex-wrap gap-3 text-sm">
          <li><Link href={`/best-barbers-in/${city.slug}`} className="text-fade-accent hover:underline">Best Barbers in {city.name}</Link></li>
          <li><Link href={`/best-fade-barbers-in/${city.slug}`} className="text-fade-muted hover:text-fade-navy hover:underline">Best Fade Barbers</Link></li>
          <li><Link href={`/cheap-barbers-in/${city.slug}`} className="text-fade-muted hover:text-fade-navy hover:underline">Cheap Barbers</Link></li>
          <li><Link href={`/hidden-gem-barbers-in/${city.slug}`} className="text-fade-muted hover:text-fade-navy hover:underline">Hidden Gems</Link></li>
        </ul>
      </nav>
    </article>
  );
}
