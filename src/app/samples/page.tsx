import Link from "next/link";

const samples = [
  {
    href: "/samples/home",
    title: "Landing",
    icon: "/icons/search.png",
    description:
      "Hero, search, and soft cards — the first impression with plenty of breathing room.",
  },
  {
    href: "/samples/search",
    title: "Search results",
    icon: "/icons/chair.png",
    description:
      "Filter chips and a responsive tile grid of results — easy to scan on any screen.",
  },
  {
    href: "/samples/shop",
    title: "Barbershop profile",
    icon: "/icons/barbershop.png",
    description:
      "Shop-level FadeScore, platforms, details, and a roster linking to each barber.",
  },
  {
    href: "/samples/barber",
    title: "Barber profile",
    icon: "/icons/hair-clipper.png",
    description:
      "Individual barber: shop link, specialties, personal score vs the shop average.",
  },
] as const;

export default function SamplesIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <p className="text-sm font-medium text-fade-accent mb-3">UI exploration</p>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-fade-navy mb-4">
        FadeScore sample pages
      </h1>
      <p className="text-lg text-fade-muted leading-relaxed mb-12 max-w-xl">
        Static mocks using your logo palette: deep navy, white, and sky cyan —
        including both a barbershop page and a barber (person) page, matching
        how the live site separates /shop/[slug] and /barber/[slug].
      </p>
      <ul className="space-y-4">
        {samples.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="group block rounded-2xl border border-fade-navy/8 bg-white/70 p-6 shadow-sm shadow-fade-navy/5 hover:border-fade-accent/40 hover:shadow-md hover:shadow-fade-navy/8 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fade-canvas border border-fade-navy/8 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h2 className="text-lg font-semibold text-fade-navy group-hover:text-fade-navy mb-1 flex items-center gap-2">
                {s.title}
                <span
                  className="text-fade-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                >
                  →
                </span>
              </h2>
              <p className="text-fade-muted text-sm leading-relaxed">
                {s.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-14 text-sm text-fade-muted">
        <Link href="/" className="text-fade-accent font-medium hover:underline">
          Return to the main site
        </Link>
      </p>
    </div>
  );
}
