import Link from "next/link";

const reviews = [
  {
    author: "Marcus L.",
    when: "2 weeks ago",
    text: "Consistent taper every visit. Explains the lineup without rushing.",
    rating: 5,
  },
  {
    author: "Jordan P.",
    when: "1 month ago",
    text: "Fair price for the area and the fade holds for weeks.",
    rating: 5,
  },
] as const;

const platformReviews = [
  { platform: "Google", rating: 5.0, reviewCount: 96 },
  { platform: "Yelp", rating: 4.9, reviewCount: 22 },
] as const;

const specialties = ["Coarse hair", "Taper fades", "Beard lineup"] as const;

export default function SampleBarberPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12 pb-24">
      <nav className="text-sm text-fade-muted mb-8 flex flex-wrap items-center gap-2">
        <Link href="/samples/home" className="hover:text-fade-navy">
          Samples
        </Link>
        <span aria-hidden>/</span>
        <Link href="/samples/shop" className="font-name hover:text-fade-navy">
          Northside Fade Lab
        </Link>
        <span aria-hidden>/</span>
        <span className="font-name text-fade-navy font-medium">Marcus Cole</span>
      </nav>

      <div className="rounded-3xl bg-white border border-fade-navy/8 shadow-sm overflow-hidden">
        <div className="h-36 sm:h-44 bg-gradient-to-br from-fade-navy via-fade-navy to-fade-navy/85 relative">
          <div
            className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,#5BC9F5,transparent_55%)]"
            aria-hidden
          />
        </div>
        <div className="px-6 sm:px-8 pb-8 -mt-12 relative">
          {/* Avatar + actions stay up on the hero; text sits below on white */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-24 w-24 shrink-0 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-fade-navy">
              MC
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <button
                type="button"
                className="rounded-full border border-fade-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-fade-navy hover:bg-fade-canvas transition-colors"
              >
                Save
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
              Barber
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-name text-2xl font-semibold text-fade-navy">
                Marcus Cole
              </h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/verified.png"
                alt="Verified"
                width={22}
                height={22}
                className="object-contain"
              />
            </div>
            <p className="text-fade-muted text-sm mt-1">
              <Link
                href="/samples/shop"
                className="font-name font-medium text-fade-navy hover:text-fade-accent transition-colors"
              >
                Northside Fade Lab
              </Link>
              <span className="text-fade-muted"> · Brooklyn, NY</span>
            </p>
            <p className="text-fade-muted text-sm mt-1 flex items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/pin.png"
                alt=""
                width={14}
                height={14}
                className="object-contain opacity-70"
              />
              Same location as shop · Sample profile
            </p>
          </div>

          <p className="mt-6 rounded-xl bg-fade-canvas/90 border border-fade-accent/20 px-4 py-3 text-sm text-fade-navy">
            <strong className="font-semibold">4.95 FadeScore</strong> at ~$35
            typical cut — strong value in Brooklyn. Individual scores can differ
            from the shop average.
          </p>

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(
              [
                {
                  label: "FadeScore",
                  value: "4.95",
                  icon: "/icons/star-filled.png",
                },
                {
                  label: "Typical cut",
                  value: "$35–40",
                  icon: "/icons/hair-clipper.png",
                },
                {
                  label: "Reviews",
                  value: "118",
                  icon: "/icons/reviews.png",
                },
                {
                  label: "Wait",
                  value: "~25 min",
                  icon: "/icons/chair.png",
                },
              ] as const
            ).map((row) => (
              <div
                key={row.label}
                className="rounded-xl bg-fade-canvas/80 border border-fade-navy/6 px-4 py-3"
              >
                <dt className="text-xs font-medium text-fade-muted uppercase tracking-wide flex items-center gap-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={row.icon}
                    alt=""
                    width={14}
                    height={14}
                    className="object-contain opacity-80"
                  />
                  {row.label}
                </dt>
                <dd className="text-lg font-semibold text-fade-navy mt-1 tabular-nums">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <h2 className="text-sm font-semibold text-fade-navy mb-2 flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/hair-clipper.png"
                alt=""
                width={18}
                height={18}
                className="object-contain opacity-80"
              />
              Specialties
            </h2>
            <div className="flex flex-wrap gap-2">
              {specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-fade-navy/10 bg-fade-canvas/60 px-3 py-1.5 text-sm text-fade-navy"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-fade-navy mb-3">
          Reviews by platform
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-2">
          {platformReviews.map((r) => (
            <div
              key={r.platform}
              className="rounded-2xl border border-fade-navy/8 bg-white/90 px-4 py-3"
            >
              <span className="block text-sm font-medium text-fade-navy capitalize">
                {r.platform}
              </span>
              <span className="text-lg font-bold text-fade-navy tabular-nums">
                {r.rating}
              </span>
              <span className="text-sm text-fade-muted">
                {" "}
                · {r.reviewCount} reviews
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-fade-muted">
          Personal ratings — not the same as the shop&apos;s blended score.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-fade-navy mb-4 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/reviews.png"
            alt=""
            width={24}
            height={24}
            className="object-contain"
          />
          Client reviews
        </h2>
        <ul className="space-y-4">
          {reviews.map((rev) => (
            <li
              key={rev.author}
              className="rounded-2xl border border-fade-navy/8 bg-white/80 p-5"
            >
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className="font-medium text-fade-navy">{rev.author}</span>
                <div className="flex items-center gap-2">
                  <span
                    className="flex gap-0.5"
                    aria-label={`${rev.rating} out of 5`}
                  >
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src="/icons/star-filled.png"
                        alt=""
                        width={14}
                        height={14}
                        className="object-contain"
                      />
                    ))}
                  </span>
                  <span className="text-xs text-fade-muted">{rev.when}</span>
                </div>
              </div>
              <p className="text-sm text-fade-muted leading-relaxed">{rev.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-center text-sm text-fade-muted">
        <Link href="/samples/shop" className="text-fade-accent font-medium hover:underline">
          View barbershop profile
        </Link>
        {" · "}
        <Link href="/search" className="text-fade-accent font-medium hover:underline">
          Back to search
        </Link>
      </p>
    </div>
  );
}
