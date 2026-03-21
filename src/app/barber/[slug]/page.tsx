import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBarberBySlug, getBarbersByCity } from "@/data/barbers";
import { BarberCard } from "@/components/BarberCard";
import { ReviewForm } from "@/components/ReviewForm";
import { UserReviews } from "@/components/UserReviews";
import { getEffectiveHairTypes, getEffectiveCutTypes, HAIR_TYPE_LABELS, CUT_TYPE_LABELS } from "@/lib/filters";
import { getBarberJsonLd } from "@/lib/schema";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);
  if (!barber) return { title: "Barber Not Found" };
  return {
    title: `${barber.name} Barber Review | FadeScore`,
    description: `${barber.name} in ${barber.city} — FadeScore ${barber.fadeScore}, avg cut $${barber.avgPrice}, ${barber.reviewCount} reviews.`,
  };
}

export default async function BarberProfilePage({ params }: Props) {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);
  if (!barber) notFound();
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBarberJsonLd(barber)) }}
      />
      <nav className="text-sm text-fade-muted mb-8 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-fade-navy">
          FadeScore
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/best-barbers-in/${barber.citySlug}`} className="hover:text-fade-navy">
          {barber.city}
        </Link>
        <span aria-hidden>/</span>
        <span className="font-name text-fade-navy font-medium">{barber.name}</span>
      </nav>

      <div className="rounded-3xl bg-white border border-fade-navy/8 shadow-sm overflow-hidden">
        <div className="h-36 sm:h-44 bg-gradient-to-br from-fade-navy via-fade-navy to-fade-navy/85 relative">
          <div
            className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,#5BC9F5,transparent_55%)]"
            aria-hidden
          />
        </div>
        <div className="px-6 sm:px-8 pb-8 -mt-12 relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-24 w-24 shrink-0 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-fade-navy">
              {initials(barber.name)}
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              {barber.address && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(barber.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-fade-accent px-5 py-2.5 text-sm font-semibold text-fade-navy hover:bg-fade-accent/90 transition-colors shadow-sm"
                >
                  Get directions
                </a>
              )}
            </div>
          </div>

          <div className="mt-6 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-fade-accent mb-1">
              Barber
            </p>
            <h1 className="font-name text-2xl sm:text-3xl font-semibold text-fade-navy">
              {barber.name}
            </h1>
            <p className="text-fade-muted text-sm mt-1">
              <Link
                href={`/shop/${barber.shopSlug}`}
                className="font-name font-medium text-fade-navy hover:text-fade-accent transition-colors"
              >
                {barber.shopName}
              </Link>
              <span className="text-fade-muted"> · {barber.city}, {barber.state}</span>
            </p>
          </div>

          {barber.fadeScore >= 4.5 && (
            <p className="mt-6 rounded-xl bg-fade-canvas/90 border border-fade-accent/20 px-4 py-3 text-sm text-fade-navy">
              <strong className="font-semibold">{barber.fadeScore} FadeScore</strong> with an average cut of ${barber.avgPrice} — strong value in {barber.city}.
            </p>
          )}

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl bg-fade-canvas/80 border border-fade-navy/6 px-4 py-3">
              <dt className="text-xs font-medium text-fade-muted uppercase tracking-wide flex items-center gap-1.5">
                <Image src="/icons/star-filled.png" alt="" width={14} height={14} className="object-contain opacity-80" />
                FadeScore
              </dt>
              <dd className="text-lg font-semibold text-fade-navy mt-1">{barber.fadeScore}</dd>
            </div>
            <div className="rounded-xl bg-fade-canvas/80 border border-fade-navy/6 px-4 py-3">
              <dt className="text-xs font-medium text-fade-muted uppercase tracking-wide flex items-center gap-1.5">
                <Image src="/icons/hair-clipper.png" alt="" width={14} height={14} className="object-contain opacity-80" />
                Avg cut
              </dt>
              <dd className="text-lg font-semibold text-fade-navy mt-1">${barber.avgPrice}</dd>
            </div>
            <div className="rounded-xl bg-fade-canvas/80 border border-fade-navy/6 px-4 py-3">
              <dt className="text-xs font-medium text-fade-muted uppercase tracking-wide flex items-center gap-1.5">
                <Image src="/icons/reviews.png" alt="" width={14} height={14} className="object-contain opacity-80" />
                Reviews
              </dt>
              <dd className="text-lg font-semibold text-fade-navy mt-1">{barber.reviewCount}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2 mt-8">
            {getEffectiveHairTypes(barber).map((ht) => (
              <span
                key={ht}
                className="px-3 py-1 rounded-full text-sm font-medium border border-fade-pill/40 bg-fade-pill/15 text-fade-navy"
              >
                {HAIR_TYPE_LABELS[ht]}
              </span>
            ))}
            {getEffectiveCutTypes(barber).map((ct) => (
              <span
                key={ct}
                className="px-3 py-1 rounded-full text-sm font-medium border border-fade-pill/40 bg-fade-pill/15 text-fade-navy"
              >
                {CUT_TYPE_LABELS[ct]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {barber.reviews && barber.reviews.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-fade-navy mb-3">Reviews by Platform</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {barber.reviews.map((r) => (
              <div
                key={r.platform}
                className="px-4 py-3 rounded-2xl border border-fade-navy/8 bg-white/90"
              >
                <span className="block text-sm font-medium capitalize text-fade-navy">
                  {r.platform}
                </span>
                <span className="text-lg font-bold text-fade-navy">{r.rating}</span>
                <span className="text-sm text-fade-muted"> · {r.reviewCount} reviews</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {barber.barbers && barber.barbers.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-fade-navy mb-3">
            Barbers at <span className="font-name">{barber.shopName}</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {barber.barbers.map((b) => (
              <div
                key={b.name}
                className="px-4 py-3 rounded-2xl border border-fade-navy/8 bg-white/90"
              >
                {b.slug ? (
                  <Link
                    href={`/barber/${b.slug}`}
                    className="font-name block font-medium text-fade-accent hover:underline"
                  >
                    {b.name}
                  </Link>
                ) : (
                  <span className="font-name block font-medium text-fade-navy">{b.name}</span>
                )}
                <span className="text-sm text-fade-muted">
                  {b.rating} · {b.reviewCount} reviews
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {(barber.address || barber.phone || barber.instagram || barber.website) && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-fade-navy mb-3">Shop Details</h2>
          <dl className="space-y-2 text-sm text-fade-muted">
            {barber.address && (
              <div className="flex gap-2">
                <dt className="font-medium text-fade-navy min-w-[80px]">Address</dt>
                <dd>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(barber.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fade-accent hover:underline"
                  >
                    {barber.address}
                  </a>
                </dd>
              </div>
            )}
            {barber.phone && (
              <div className="flex gap-2">
                <dt className="font-medium text-fade-navy min-w-[80px]">Phone</dt>
                <dd>
                  <a href={`tel:${barber.phone}`} className="text-fade-accent hover:underline">
                    {barber.phone}
                  </a>
                </dd>
              </div>
            )}
            {barber.instagram && (
              <div className="flex gap-2">
                <dt className="font-medium text-fade-navy min-w-[80px]">Instagram</dt>
                <dd>
                  <a
                    href={`https://www.instagram.com/${barber.instagram.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fade-accent hover:underline"
                  >
                    {barber.instagram}
                  </a>
                </dd>
              </div>
            )}
            {barber.website && (
              <div className="flex gap-2">
                <dt className="font-medium text-fade-navy min-w-[80px]">Website</dt>
                <dd>
                  <a href={barber.website} target="_blank" rel="noopener noreferrer" className="text-fade-accent hover:underline">
                    {barber.website.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </section>
      )}

      <div className="mt-10">
        <UserReviews barberId={barber.id} />
      </div>

      <section className="mt-10">
        <ReviewForm barberSlug={barber.slug} barberId={barber.id} />
      </section>

      {await (async () => {
        const cityBarbers = (await getBarbersByCity(barber.citySlug)).filter((b) => b.id !== barber.id).slice(0, 6);
        return cityBarbers.length > 0 ? (
          <section className="border-t border-fade-navy/10 pt-10 mt-10">
            <h2 className="text-lg font-semibold text-fade-navy mb-4">More barbers in {barber.city}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
              {cityBarbers.map((b) => (
                <li key={b.id} className="h-full">
                  <BarberCard barber={b} />
                </li>
              ))}
            </ul>
            <Link
              href={`/best-barbers-in/${barber.citySlug}`}
              className="mt-4 inline-block text-sm font-medium text-fade-accent hover:underline"
            >
              View all barbers in {barber.city} →
            </Link>
          </section>
        ) : null;
      })()}

      <nav className="border-t border-fade-navy/10 pt-8 mt-10">
        <Link
          href={`/best-barbers-in/${barber.citySlug}`}
          className="text-fade-accent font-medium hover:underline"
        >
          ← Best Barbers in {barber.city}
        </Link>
      </nav>
    </article>
  );
}
