import Link from "next/link";

const platformReviews = [
  { platform: "Google", rating: 4.9, reviewCount: 214 },
  { platform: "Yelp", rating: 4.7, reviewCount: 89 },
] as const;

const barbersAtShop = [
  {
    name: "Marcus Cole",
    role: "Lead barber",
    score: 4.95,
    href: "/samples/barber",
  },
  {
    name: "Alex Rivera",
    role: "Barber",
    score: 4.85,
    href: "/samples/barber",
  },
] as const;

export default function SampleShopPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12 pb-24">
      <nav className="text-sm text-fade-muted mb-8 flex flex-wrap items-center gap-2">
        <Link href="/samples/home" className="hover:text-fade-navy">
          Samples
        </Link>
        <span aria-hidden>/</span>
        <span className="text-fade-navy font-medium">Barbershop</span>
      </nav>

      <div className="rounded-3xl bg-white border border-fade-navy/8 shadow-sm overflow-hidden mb-8">
        <div className="h-32 sm:h-40 bg-gradient-to-br from-fade-navy via-fade-navy to-[#0a1a35] relative">
          <div
            className="absolute inset-0 opacity-35 bg-[radial-gradient(ellipse_at_20%_0%,#5BC9F5,transparent_50%)]"
            aria-hidden
          />
        </div>
        <div className="px-6 sm:px-8 pb-8 -mt-14 relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-28 w-28 shrink-0 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/barbershop.png"
                alt=""
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <button
                type="button"
                className="rounded-full border border-fade-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-fade-navy hover:bg-fade-canvas transition-colors"
              >
                Directions
              </button>
              <button
                type="button"
                className="rounded-full bg-fade-accent px-5 py-2.5 text-sm font-semibold text-fade-navy hover:bg-fade-accent/90 transition-colors"
              >
                Book
              </button>
            </div>
          </div>

          <div className="mt-6 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-fade-accent mb-1">
              Barbershop
            </p>
            <h1 className="font-name text-2xl sm:text-3xl font-semibold text-fade-navy tracking-tight">
              Northside Fade Lab
            </h1>
            <p className="text-fade-muted text-sm mt-2 flex items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/pin.png"
                alt=""
                width={14}
                height={14}
                className="object-contain opacity-70 shrink-0"
              />
              Brooklyn, NY · Sample profile
            </p>
          </div>

          <p className="mt-6 text-fade-muted text-sm leading-relaxed max-w-2xl">
            Full-service shop with multiple chairs. Shop-level FadeScore blends
            reviews across the team — tap a barber below for their individual
            profile.
          </p>

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {(
              [
                {
                  label: "Shop FadeScore",
                  value: "4.9",
                  icon: "/icons/star-filled.png",
                  hint: "Blended",
                },
                {
                  label: "Avg cut",
                  value: "$38",
                  icon: "/icons/hair-clipper.png",
                  hint: "Shop avg",
                },
                {
                  label: "Barbers",
                  value: "4",
                  icon: "/icons/chair.png",
                  hint: "On roster",
                },
                {
                  label: "Reviews",
                  value: "303",
                  icon: "/icons/reviews.png",
                  hint: "All platforms",
                },
              ] as const
            ).map((row) => (
              <div
                key={row.label}
                className="rounded-xl bg-fade-canvas/80 border border-fade-navy/6 px-3 sm:px-4 py-3"
              >
                <dt className="text-[10px] sm:text-xs font-medium text-fade-muted uppercase tracking-wide flex items-center gap-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={row.icon}
                    alt=""
                    width={14}
                    height={14}
                    className="object-contain opacity-80 shrink-0"
                  />
                  <span className="truncate">{row.label}</span>
                </dt>
                <dd className="text-lg sm:text-xl font-semibold text-fade-navy mt-0.5 tabular-nums">
                  {row.value}
                </dd>
                <p className="text-[10px] text-fade-muted/80 mt-1">{row.hint}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-fade-navy mb-3">
          Reviews by platform
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {platformReviews.map((r) => (
            <div
              key={r.platform}
              className="rounded-2xl border border-fade-navy/8 bg-white/90 px-4 py-4"
            >
              <span className="block text-sm font-medium text-fade-navy capitalize">
                {r.platform}
              </span>
              <span className="text-xl font-bold text-fade-navy tabular-nums">
                {r.rating}
              </span>
              <span className="text-sm text-fade-muted">
                {" "}
                · {r.reviewCount} reviews
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-fade-navy/8 bg-white/70 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-fade-navy mb-4">Shop details</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex gap-3">
            <dt className="text-fade-muted shrink-0 w-24">Address</dt>
            <dd className="text-fade-navy">
              1200 Atlantic Ave, Brooklyn, NY 11216
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-fade-muted shrink-0 w-24">Phone</dt>
            <dd className="text-fade-navy">(718) 555-0142</dd>
          </div>
        </dl>
      </section>

      <section className="mb-8 rounded-xl border border-dashed border-fade-navy/20 bg-fade-canvas/40 px-4 py-4">
        <p className="text-sm text-fade-muted">
          Own or work here?{" "}
          <span className="font-medium text-fade-navy">Claim this shop</span> to
          manage hours and booking — sample copy.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-fade-navy mb-4 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/chair.png"
            alt=""
            width={22}
            height={22}
            className="object-contain"
          />
          Barbers at this shop
        </h2>
        <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {barbersAtShop.map((b) => (
            <li key={b.name}>
              <Link
                href={b.href}
                className="flex items-center gap-4 rounded-2xl border border-fade-navy/8 bg-white/90 p-4 shadow-sm hover:border-fade-accent/40 hover:shadow-md transition-all group"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-fade-canvas border border-fade-navy/8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/hair-clipper.png"
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain opacity-90"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-name font-semibold text-fade-navy group-hover:text-fade-accent transition-colors truncate">
                    {b.name}
                  </p>
                  <p className="text-xs text-fade-muted">{b.role}</p>
                  <p className="text-sm text-fade-navy mt-1 flex items-center gap-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/icons/star-filled.png"
                      alt=""
                      width={14}
                      height={14}
                      className="object-contain"
                    />
                    {b.score} FadeScore
                  </p>
                </div>
                <span className="text-fade-accent text-sm font-medium shrink-0">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-center text-sm text-fade-muted">
        Production URL pattern:{" "}
        <code className="text-fade-navy/80 bg-fade-navy/5 rounded px-1.5 py-0.5 text-xs">
          /shop/[slug]
        </code>
        {" — "}
        <Link href="/search" className="text-fade-accent font-medium hover:underline">
          Search live data
        </Link>
      </p>
    </div>
  );
}
