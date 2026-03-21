import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/data";
import { getBarbersByCity } from "@/data/barbers";
import { BarberCard } from "@/components/BarberCard";
import { getCutTypeLinks, getHairTypeLinks } from "@/lib/seo";

export const revalidate = 3600;

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return { title: "City Not Found" };
  return {
    title: `Hidden Gem Barbers in ${city.name} | Under $30, 4.8+ Rating | FadeScore`,
    description: `Best value barbers in ${city.name}: great cuts under $30 with FadeScore 4.8 or higher. Hidden gems ranked by real reviews.`,
  };
}

export default async function HiddenGemCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();

  const allBarbers = await getBarbersByCity(city.slug);
  const hiddenGems = allBarbers.filter((b) => b.isHiddenGem).sort((a, b) => b.fadeScore - a.fadeScore);

  const cutTypeLinks = getCutTypeLinks(city.slug, city.name);
  const hairTypeLinks = getHairTypeLinks(city.slug, city.name);

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-fade-muted mb-6">
        <Link href="/" className="hover:text-fade-navy">FadeScore</Link>
        {" / "}
        <Link href={`/best-barbers-in/${city.slug}`} className="hover:text-fade-navy">{city.name}</Link>
        {" / "}
        <span className="text-fade-navy">Hidden Gems</span>
      </nav>

      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/icons/diamond.png" alt="" width={32} height={32} className="inline-block -mt-1 mr-2" />
        Hidden Gem Barbers in {city.name}
      </h1>
      <p className="text-lg text-fade-muted mb-4">
        These barbers in {city.name} charge under $30 and have a FadeScore of 4.8 or higher — great cuts at a great price.
      </p>

      <p className="mb-10 rounded-2xl bg-amber-50/90 border border-amber-200/80 px-4 py-3 text-sm text-fade-navy">
        {hiddenGems.length > 0
          ? `We found ${hiddenGems.length} hidden gem barber${hiddenGems.length !== 1 ? "s" : ""} in ${city.name} — quality cuts without the premium price.`
          : `No hidden gem barbers found in ${city.name} yet. Hidden gems are barbers under $30 with 4.8+ FadeScore.`}
      </p>

      {hiddenGems.length > 0 ? (
        <section className="mb-12">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hiddenGems.map((barber, i) => (
              <li key={barber.id} className="h-full">
                <BarberCard barber={barber} rank={i + 1} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="mb-12">
          <div className="rounded-2xl border border-fade-navy/10 bg-fade-canvas/50 p-6 text-center">
            <p className="text-sm text-fade-muted mb-4">
              Check out all barbers in {city.name} or see national hidden gems.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href={`/best-barbers-in/${city.slug}`} className="inline-flex items-center rounded-full bg-fade-accent px-5 py-2.5 text-sm font-semibold text-fade-navy hover:bg-fade-accent/90">
                All barbers in {city.name}
              </Link>
              <Link href="/hidden-gem-barbers" className="inline-flex items-center rounded-full border border-fade-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-fade-navy hover:bg-fade-canvas">
                National hidden gems
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Specialty links */}
      <nav className="border-t border-fade-navy/10 pt-8 mb-8">
        <h3 className="font-semibold text-fade-navy mb-3">Browse by specialty in {city.name}</h3>
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
        <h3 className="font-semibold text-fade-navy mb-2">More in {city.state}</h3>
        <ul className="flex flex-wrap gap-3 text-sm">
          <li><Link href={`/best-barbers-in/${city.slug}`} className="text-fade-accent hover:underline">Best Barbers in {city.name}</Link></li>
          <li><Link href={`/cheap-barbers-in/${city.slug}`} className="text-fade-muted hover:text-fade-navy hover:underline">Cheap Barbers</Link></li>
          <li><Link href={`/top-rated-barbers-in/${city.slug}`} className="text-fade-muted hover:text-fade-navy hover:underline">Top Rated</Link></li>
          <li><Link href="/hidden-gem-barbers" className="text-fade-muted hover:text-fade-navy hover:underline">All Hidden Gems</Link></li>
        </ul>
      </nav>
    </article>
  );
}
