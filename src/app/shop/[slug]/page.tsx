import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getShopBySlug, getBarbersByShop } from "@/data/barbers";
import { BarberCard } from "@/components/BarberCard";
import { getShopJsonLd } from "@/lib/schema";
import { getEffectiveCutTypes, getEffectiveHairTypes, CUT_TYPE_LABELS, HAIR_TYPE_LABELS } from "@/lib/filters";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const shop = await getShopBySlug(slug);
  if (!shop) return { title: "Shop Not Found" };
  return {
    title: `${shop.name} — Barber Reviews | FadeScore`,
    description: `${shop.name} in ${shop.city} — FadeScore ${shop.fadeScore}, avg cut $${shop.avgPrice}, ${shop.barberCount} barbers.`,
  };
}

export default async function ShopPage({ params }: Props) {
  const { slug } = await params;
  const shop = await getShopBySlug(slug);
  if (!shop) notFound();
  const barbers = await getBarbersByShop(slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getShopJsonLd(shop)) }}
      />
      <nav className="text-sm text-fade-muted mb-8 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-fade-navy">
          FadeScore
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/best-barbers-in/${shop.citySlug}`} className="hover:text-fade-navy">
          {shop.city}
        </Link>
        <span aria-hidden>/</span>
        <span className="font-name text-fade-navy font-medium">{shop.name}</span>
      </nav>

      <div className="rounded-3xl bg-white border border-fade-navy/8 shadow-sm overflow-hidden mb-10">
        <div className="h-32 sm:h-40 bg-gradient-to-br from-fade-navy via-fade-navy to-[#0a1a35] relative">
          <div
            className="absolute inset-0 opacity-35 bg-[radial-gradient(ellipse_at_20%_0%,#5BC9F5,transparent_50%)]"
            aria-hidden
          />
        </div>
        <div className="px-6 sm:px-8 pb-8 -mt-14 relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-28 w-28 shrink-0 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
              <Image
                src="/icons/barbershop.png"
                alt=""
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {"bookingUrl" in shop && shop.bookingUrl && (
                <a
                  href={shop.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-fade-accent px-5 py-2.5 text-sm font-semibold text-fade-navy hover:bg-fade-accent/90 transition-colors shadow-sm"
                >
                  Book Now
                </a>
              )}
              {shop.address && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-fade-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-fade-navy hover:bg-fade-canvas transition-colors"
                >
                  Directions
                </a>
              )}
            </div>
          </div>

          <div className="mt-6 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-fade-accent mb-1">
              Barbershop
            </p>
            <h1 className="font-name text-2xl sm:text-3xl font-semibold text-fade-navy tracking-tight">
              {shop.name}
            </h1>
            <p className="text-fade-muted text-sm mt-2 flex items-start gap-1.5">
              <Image
                src="/icons/pin.png"
                alt=""
                width={14}
                height={14}
                className="object-contain opacity-70 shrink-0 mt-0.5"
              />
              <span className="min-w-0 break-words leading-snug">
                {shop.address ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fade-accent hover:underline"
                  >
                    {shop.address}
                  </a>
                ) : (
                  `${shop.city}, ${shop.state}`
                )}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <div className="rounded-xl bg-fade-canvas/80 border border-fade-navy/6 px-4 py-3 min-w-[100px]">
              <span className="text-lg font-bold text-fade-navy flex items-center gap-1">
                <Image src="/icons/star-filled.png" alt="" width={20} height={20} className="inline-block" />
                {shop.fadeScore}
              </span>
              <span className="block text-xs text-fade-muted mt-0.5">FadeScore</span>
            </div>
            <div className="rounded-xl bg-fade-canvas/80 border border-fade-navy/6 px-4 py-3 min-w-[100px]">
              <span className="text-lg font-bold text-fade-navy">${shop.avgPrice}</span>
              <span className="block text-xs text-fade-muted mt-0.5">Avg cut</span>
            </div>
            <div className="rounded-xl bg-fade-canvas/80 border border-fade-navy/6 px-4 py-3 min-w-[100px]">
              <span className="text-lg font-bold text-fade-navy">{shop.barberCount}</span>
              <span className="block text-xs text-fade-muted mt-0.5">Barbers</span>
            </div>
          </div>

          {(() => {
            const allHairTypes = new Set(barbers.flatMap((b) => getEffectiveHairTypes(b)));
            const allCutTypes = new Set(barbers.flatMap((b) => getEffectiveCutTypes(b)));
            if (allHairTypes.size === 0 && allCutTypes.size === 0) return null;
            return (
              <div className="flex flex-wrap gap-2 mt-6">
                {Array.from(allHairTypes).map((ht) => (
                  <span
                    key={ht}
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium border border-fade-pill/40 bg-fade-pill/15 text-fade-navy"
                  >
                    {HAIR_TYPE_LABELS[ht]}
                  </span>
                ))}
                {Array.from(allCutTypes).map((ct) => (
                  <span
                    key={ct}
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium border border-fade-pill/40 bg-fade-pill/15 text-fade-navy"
                  >
                    {CUT_TYPE_LABELS[ct]}
                  </span>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      {shop.reviews && shop.reviews.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-fade-navy mb-3">Reviews by Platform</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {shop.reviews.map((r) => (
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

      {(shop.address || shop.phone || shop.instagram || shop.website) && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-fade-navy mb-3">Shop Details</h2>
          <dl className="space-y-2 text-sm text-fade-muted">
            {shop.address && (
              <div className="flex gap-2">
                <dt className="font-medium text-fade-navy min-w-[80px]">Address</dt>
                <dd>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fade-accent hover:underline"
                  >
                    {shop.address}
                  </a>
                </dd>
              </div>
            )}
            {shop.phone && (
              <div className="flex gap-2">
                <dt className="font-medium text-fade-navy min-w-[80px]">Phone</dt>
                <dd>
                  <a href={`tel:${shop.phone}`} className="text-fade-accent hover:underline">
                    {shop.phone}
                  </a>
                </dd>
              </div>
            )}
            {shop.instagram && (
              <div className="flex gap-2">
                <dt className="font-medium text-fade-navy min-w-[80px]">Instagram</dt>
                <dd>
                  <a
                    href={`https://www.instagram.com/${shop.instagram.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fade-accent hover:underline"
                  >
                    {shop.instagram}
                  </a>
                </dd>
              </div>
            )}
            {shop.website && (
              <div className="flex gap-2">
                <dt className="font-medium text-fade-navy min-w-[80px]">Website</dt>
                <dd>
                  <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-fade-accent hover:underline">
                    {shop.website.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </section>
      )}

      {!("claimedBy" in shop && shop.claimedBy) && (
        <section className="mb-10 rounded-2xl border border-dashed border-fade-navy/20 bg-fade-canvas/40 px-4 py-4">
          <p className="text-sm text-fade-muted">
            Own or work at {shop.name}?{" "}
            <Link href={`/barber-intake?shop=${shop.slug}`} className="text-fade-accent font-medium hover:underline">
              Claim this shop
            </Link>{" "}
            to manage your listing and add a booking link.
          </p>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-fade-navy mb-4">
          Barbers at <span className="font-name">{shop.name}</span>
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {barbers.map((barber, i) => (
            <li key={barber.id} className="h-full">
              <BarberCard barber={barber} rank={i + 1} />
            </li>
          ))}
        </ul>
      </section>

      <nav className="border-t border-fade-navy/10 pt-8">
        <Link
          href={`/best-barbers-in/${shop.citySlug}`}
          className="text-fade-accent font-medium hover:underline"
        >
          ← Best Barbers in {shop.city}
        </Link>
      </nav>
    </article>
  );
}
