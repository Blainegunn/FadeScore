import Link from "next/link";

export default function SampleHomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
      <section className="pt-12 sm:pt-16 pb-10 sm:pb-14">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-fade-navy leading-[1.1] mb-6">
            Find barbers you&apos;ll trust—without the guesswork.
          </h1>
          <p className="text-lg text-fade-muted leading-relaxed mb-10">
            Real reviews, clear prices, and a FadeScore that reflects
            consistency. Search your city and compare in one calm place.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-xl"
            action="/search"
          >
            <label htmlFor="sample-q" className="sr-only">
              City or ZIP
            </label>
            <div className="relative flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/search.png"
                alt=""
                width={20}
                height={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-45 pointer-events-none"
              />
              <input
                id="sample-q"
                name="q"
                type="search"
                placeholder="City or ZIP code"
                className="w-full rounded-full border border-fade-navy/12 bg-white pl-12 pr-5 py-3.5 text-fade-navy placeholder:text-fade-muted/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-fade-accent/50 focus:border-fade-accent/40"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-fade-navy px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-fade-navy/20 hover:bg-fade-navy/90 transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/search.png"
                alt=""
                width={18}
                height={18}
                className="opacity-90 brightness-0 invert"
              />
              Search
            </button>
          </form>
          <p className="mt-4 text-sm text-fade-muted">
            Sample UI — form submits to the live search page.
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
            Reach people who care about fades and fair prices. Keep it simple for
            clients browsing on their phone.
          </p>
          <Link
            href="/barber-intake"
            className="inline-flex items-center rounded-full bg-fade-accent px-6 py-3 text-sm font-semibold text-fade-navy shadow-sm shadow-fade-accent/30 hover:bg-fade-accent/90 transition-colors"
          >
            Barber intake
          </Link>
        </div>
      </section>
    </div>
  );
}
