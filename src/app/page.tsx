import Link from "next/link";
import { HomeSearch } from "@/components/HomeSearch";
import { getAllBarbersForHiddenGems } from "@/data/barbers";


const POPULAR_CITIES = [
  "new-york",
  "los-angeles",
  "chicago",
  "houston",
  "phoenix",
  "dallas",
  "san-antonio",
  "san-diego",
  "salt-lake-city",
] as const;

function formatCityName(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function HomePage() {
  const hiddenGems = await getAllBarbersForHiddenGems();
  const hiddenGemsCount = hiddenGems.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
      <section className="pt-12 sm:pt-16 pb-10 sm:pb-14">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-fade-navy leading-[1.1] mb-6">
            Find the best cut for the best price
          </h1>
          <p className="text-lg text-fade-muted leading-relaxed mb-10">
            We analyze haircut prices, customer reviews, and skill ratings to
            rank the best barbers. Search by city or zip code to get started.
          </p>

          <HomeSearch />

          <p className="mt-4 text-sm text-fade-muted">
            Compare real prices and ratings so you get great cuts without
            overpaying.
          </p>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-4 sm:gap-5">
        {[
          {
            title: "Transparent pricing",
            body: "See typical cuts and ranges before you book.",
            icon: "/icons/barbershop.png",
          },
          {
            title: "FadeScore",
            body: "A single signal built from reviews and consistency.",
            icon: "/icons/star-filled.png",
          },
          {
            title: "Hidden gems",
            body: "Great fades without the premium sticker shock.",
            icon: "/icons/diamond.png",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white/80 border border-fade-navy/6 p-6 shadow-sm"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fade-canvas border border-fade-navy/8 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.icon}
                alt=""
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <h2 className="font-semibold text-fade-navy mb-2">{card.title}</h2>
            <p className="text-sm text-fade-muted leading-relaxed">{card.body}</p>
          </div>
        ))}
      </section>

      <Link
        href="/hidden-gem-barbers"
        className="mt-10 flex items-center gap-4 p-5 rounded-2xl border border-fade-navy/8 bg-white/90 shadow-sm hover:border-fade-accent/35 hover:shadow-md transition-all"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fade-canvas border border-fade-navy/8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/diamond.png" alt="" width={24} height={24} />
        </span>
        <div>
          <p className="font-semibold text-fade-navy">
            Barbers under $30 with 4.8+ rating
          </p>
          <p className="text-sm text-fade-muted">
            Best value barbers — great cuts without the premium price.{" "}
            {hiddenGemsCount > 0 && (
              <span className="font-medium text-fade-accent">
                See {hiddenGemsCount}+ barbers
              </span>
            )}
          </p>
        </div>
      </Link>

      <p className="mt-8 text-xs text-fade-muted max-w-2xl leading-relaxed">
        <strong className="text-fade-navy/80">FadeScore</strong> blends review
        quality, review volume, and price vs. local averages into one rating.{" "}
        <Link
          href="/how-we-rank"
          className="text-fade-accent font-medium hover:underline"
        >
          How we work
        </Link>
        {" · "}
        <Link href="/about" className="text-fade-accent font-medium hover:underline">
          About
        </Link>
      </p>

      <section className="mt-16 rounded-3xl border border-fade-accent/30 bg-white p-8 sm:p-10 shadow-[0_8px_30px_-8px_rgba(5,14,32,0.12)] ring-1 ring-fade-navy/[0.06] relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_0%_0%,rgba(91,201,245,0.14),transparent_55%),radial-gradient(ellipse_70%_60%_at_100%_100%,rgba(5,14,32,0.04),transparent_50%)]"
          aria-hidden
        />
        <div className="relative max-w-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fade-canvas border border-fade-navy/10 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/chair.png"
                alt=""
                width={28}
                height={28}
                className="object-contain opacity-90"
              />
            </div>
            <h2 className="font-display text-2xl font-semibold text-fade-navy tracking-tight">
              List your shop
            </h2>
          </div>
          <p className="text-fade-muted text-sm leading-relaxed mb-6">
            Reach people who care about fades and fair prices. Keep it simple
            for clients browsing on their phone.
          </p>
          <Link
            href="/barber-intake"
            className="inline-flex items-center rounded-full bg-fade-accent px-6 py-3 text-sm font-semibold text-fade-navy shadow-sm shadow-fade-accent/30 hover:bg-fade-accent/90 transition-colors"
          >
            Barber intake
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-fade-navy mb-4">Popular Cities</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-fade-muted">
          {POPULAR_CITIES.map((slug) => (
            <li key={slug}>
              <Link
                href={`/best-barbers-in/${slug}`}
                className="hover:text-fade-navy underline underline-offset-2"
              >
                {formatCityName(slug)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
