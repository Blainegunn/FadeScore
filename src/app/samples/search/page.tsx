import Link from "next/link";

const mockResults = [
  {
    kind: "shop" as const,
    name: "Northside Fade Lab",
    area: "Brooklyn · 2.1 mi",
    price: "$35–45",
    score: 4.9,
    tags: ["Fades", "Beard"],
    href: "/samples/shop",
  },
  {
    kind: "barber" as const,
    name: "Marcus Cole",
    shopName: "Northside Fade Lab",
    area: "Brooklyn · 2.1 mi",
    price: "$35–40",
    score: 4.95,
    tags: ["Taper", "Beard"],
    href: "/samples/barber",
  },
  {
    kind: "barber" as const,
    name: "Alex Rivera",
    shopName: "Northside Fade Lab",
    area: "Brooklyn · 2.1 mi",
    price: "$32–38",
    score: 4.85,
    tags: ["Fades", "Kids"],
    href: "/samples/barber",
  },
  {
    kind: "barber" as const,
    name: "Taylor Kim",
    shopName: "Union Cut Co.",
    area: "Manhattan · 3.4 mi",
    price: "$42–50",
    score: 4.7,
    tags: ["Taper", "Design"],
    href: "/samples/barber",
  },
  {
    kind: "barber" as const,
    name: "Jordan Okonkwo",
    shopName: "The Chair Room",
    area: "Queens · 4.0 mi",
    price: "$28–35",
    score: 4.8,
    tags: ["Value", "Walk-ins"],
    href: "/samples/barber",
  },
  {
    kind: "barber" as const,
    name: "Sam Reyes",
    shopName: "Line Up Studio",
    area: "Brooklyn · 1.2 mi",
    price: "$32–42",
    score: 4.85,
    tags: ["Fades", "Design"],
    href: "/samples/barber",
  },
] as const;

export default function SampleSearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 pb-24">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-fade-navy tracking-tight flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/chair.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain shrink-0"
            />
            Barbers near you
          </h1>
          <p className="text-fade-muted mt-2 text-sm sm:text-base max-w-xl">
            Tiles mix barbershops and individual barbers — open a shop for the
            roster, or a barber for their personal FadeScore (like /shop vs
            /barber on the live site).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { label: "Any price", icon: "/icons/barbershop.png" },
              { label: "Fade specialists", icon: "/icons/hair-clipper.png" },
              { label: "Open today", icon: "/icons/pin.png" },
              { label: "4.5+ rating", icon: "/icons/star-filled.png" },
            ] as const
          ).map((f) => (
            <button
              key={f.label}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-fade-navy/10 bg-white/90 pl-2.5 pr-4 py-2 text-sm text-fade-muted hover:border-fade-accent/50 hover:text-fade-navy transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.icon}
                alt=""
                width={18}
                height={18}
                className="object-contain opacity-80"
              />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 list-none p-0 m-0">
        {mockResults.map((r) => (
          <li key={`${r.kind}-${r.name}`} className="h-full min-h-0">
            <Link
              href={r.href}
              className="group flex h-full flex-col rounded-2xl border border-fade-navy/8 bg-white/90 p-5 shadow-sm shadow-fade-navy/[0.04] transition-all hover:border-fade-accent/35 hover:shadow-md hover:shadow-fade-navy/10 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fade-canvas border border-fade-navy/8 group-hover:border-fade-accent/25 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      r.kind === "shop"
                        ? "/icons/barbershop.png"
                        : "/icons/hair-clipper.png"
                    }
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={
                      r.kind === "shop"
                        ? "rounded-full bg-fade-navy/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fade-navy"
                        : "rounded-full bg-fade-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fade-navy"
                    }
                  >
                    {r.kind === "shop" ? "Shop" : "Barber"}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-fade-navy/5 px-2.5 py-1 text-xs font-semibold text-fade-navy tabular-nums">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/icons/star-filled.png"
                      alt=""
                      width={14}
                      height={14}
                      className="object-contain"
                    />
                    {r.score}
                  </span>
                </div>
              </div>

              <h2 className="font-name font-semibold text-fade-navy text-lg leading-snug group-hover:text-fade-accent transition-colors mb-0.5">
                {r.name}
              </h2>
              {r.kind === "barber" && (
                <p className="font-name text-xs text-fade-muted mb-1 truncate">
                  {r.shopName}
                </p>
              )}

              <p className="text-sm text-fade-muted flex items-center gap-1.5 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/pin.png"
                  alt=""
                  width={14}
                  height={14}
                  className="object-contain opacity-70 shrink-0"
                />
                {r.area}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 text-xs text-fade-muted border border-fade-navy/10 rounded-full pl-1.5 pr-2 py-0.5 bg-fade-canvas/50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/icons/hair-clipper.png"
                      alt=""
                      width={12}
                      height={12}
                      className="object-contain opacity-80"
                    />
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-end justify-between gap-3 pt-4 border-t border-fade-navy/8">
                <div>
                  <p className="text-xs font-medium text-fade-muted uppercase tracking-wide">
                    Typical cut
                  </p>
                  <p className="text-base font-semibold text-fade-navy tabular-nums">
                    {r.price}
                  </p>
                </div>
                <span className="text-sm font-medium text-fade-accent shrink-0">
                  View profile →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-center text-sm text-fade-muted">
        <Link href="/search" className="text-fade-accent font-medium hover:underline">
          Open real search
        </Link>
      </p>
    </div>
  );
}
