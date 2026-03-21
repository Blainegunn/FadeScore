import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BeardOutlineArt,
  BraidsArt,
  ColorSwatchArt,
  FadeSilhouetteArt,
  LineupArt,
  LocsArt,
  RazorArt,
} from "@/components/about/CutTypeArt";
import {
  CoilyHairArt,
  StraightHairArt,
  WavyHairArt,
} from "@/components/about/HairTypeArt";

export const metadata: Metadata = {
  title: "About | FadeScore",
  description:
    "Our mission, how we think about hair types and cuts, and how FadeScore helps you find the right barber.",
};

function Tile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative h-32 rounded-xl overflow-hidden border border-fade-navy/10 bg-white shadow-sm ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function IconCenter({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-fade-canvas/40">
      <Image src={src} alt={alt} width={72} height={72} className="object-contain opacity-90" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-24">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-fade-navy mb-4">
        About FadeScore
      </h1>

      <section className="mb-14 rounded-3xl border border-fade-accent/25 bg-white p-8 sm:p-10 shadow-[0_8px_30px_-8px_rgba(5,14,32,0.1)] ring-1 ring-fade-navy/[0.06] relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_0%_0%,rgba(91,201,245,0.12),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(5,14,32,0.05),transparent_50%)]"
          aria-hidden
        />
        <div className="relative">
          <p className="text-sm font-medium text-fade-accent mb-2">Our mission</p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-fade-navy tracking-tight mb-4">
            Match great hair to the right chair
          </h2>
          <p className="text-fade-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            We believe finding a barber shouldn&apos;t be a gamble. FadeScore exists
            to connect people with barbers and shops that fit their{" "}
            <strong className="text-fade-navy font-medium">hair type</strong>, the{" "}
            <strong className="text-fade-navy font-medium">cuts</strong> they want,
            and their budget—using transparent ratings and real price context. We
            also want skilled barbers who deliver value to show up when clients
            search, not only the loudest ads.
          </p>
        </div>
      </section>

      <p className="text-fade-muted text-lg leading-relaxed mb-12 max-w-3xl">
        We turn reviews, volume, and typical prices into a{" "}
        <Link href="/how-we-rank" className="text-fade-accent font-medium hover:underline">
          FadeScore
        </Link>{" "}
        you can compare across profiles. Explore{" "}
        <Link href="/hidden-gem-barbers" className="text-fade-accent font-medium hover:underline">
          hidden gems
        </Link>
        ,{" "}
        <Link href="/compare" className="text-fade-accent font-medium hover:underline">
          compare barbers
        </Link>
        , or jump straight to{" "}
        <Link href="/search" className="text-fade-accent font-medium hover:underline">
          search
        </Link>
        .
      </p>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-fade-navy mb-2">Hair types</h2>
        <p className="text-fade-muted mb-8 max-w-3xl">
          Hair type describes the natural pattern and density of your hair. Barbers
          on FadeScore can list who they&apos;re most experienced with so you can
          find someone who works with your texture—not a one-size-fits-all cut.
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          <article className="rounded-2xl border border-fade-navy/8 bg-white/90 p-5 shadow-sm">
            <Tile>
              <StraightHairArt className="w-full h-full" />
            </Tile>
            <h3 className="font-semibold text-fade-navy mt-4 mb-2">Straight</h3>
            <p className="text-sm text-fade-muted leading-relaxed">
              Grows without a strong S-curve; shows lines and blunt edges clearly.
              Fades and tapers often read very sharp; weight removal matters for
              movement.
            </p>
          </article>
          <article className="rounded-2xl border border-fade-navy/8 bg-white/90 p-5 shadow-sm">
            <Tile>
              <WavyHairArt className="w-full h-full" />
            </Tile>
            <h3 className="font-semibold text-fade-navy mt-4 mb-2">Wavy</h3>
            <p className="text-sm text-fade-muted leading-relaxed">
              Loose to medium bends; a good barber works with the wave pattern so
              lengths dry consistently and don&apos;t bulk in the wrong places.
            </p>
          </article>
          <article className="rounded-2xl border border-fade-navy/8 bg-white/90 p-5 shadow-sm">
            <Tile>
              <CoilyHairArt className="w-full h-full" />
            </Tile>
            <h3 className="font-semibold text-fade-navy mt-4 mb-2">
              Textured / coily
            </h3>
            <p className="text-sm text-fade-muted leading-relaxed">
              Tighter curls and coils; shrinkage and growth direction matter.
              Specialists balance shape, moisture-friendly routines, and clean
              fades without stressing the hair.
            </p>
          </article>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-fade-navy mb-2">
          Cuts &amp; services
        </h2>
        <p className="text-fade-muted mb-8 max-w-3xl">
          These are the kinds of work we tag on profiles so you can match style to
          skill. Photos below mix simple diagrams with our icon set—illustrative,
          not literal photos of every style.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          <CutCard
            title="Skin fade"
            body="Faded down to the skin at the bottom—strong contrast and a very defined blend line."
            visual={<FadeSilhouetteArt className="w-full h-full" />}
          />
          <CutCard
            title="Taper fade"
            body="Hair shortens gradually around the sides and back while keeping more weight above the ears than a harsh skin fade."
            visual={<FadeSilhouetteArt className="w-full h-full opacity-95" />}
          />
          <CutCard
            title="Razor fade"
            body="Fade work finished with a razor for an extra-crisp transition and polished edge."
            visual={
              <div className="relative w-full h-full">
                <FadeSilhouetteArt className="w-full h-full opacity-80" />
                <div className="absolute bottom-2 right-2 w-12 h-12">
                  <Image
                    src="/icons/hair-clipper.png"
                    alt=""
                    width={48}
                    height={48}
                    className="object-contain drop-shadow-sm"
                  />
                </div>
              </div>
            }
          />
          <CutCard
            title="Lineup / edge up"
            body="Sharp hairline shaping along the forehead, temples, and neck for a clean, geometric frame."
            visual={<LineupArt className="w-full h-full" />}
          />
          <CutCard
            title="Beard trim & shape"
            body="Sculpting length, cheek lines, and under-neck so the beard complements the haircut."
            visual={<BeardOutlineArt className="w-full h-full" />}
          />
          <CutCard
            title="Straight razor"
            body="Traditional razor finish—often hot lather—on face or neck for an extra-smooth result."
            visual={<RazorArt className="w-full h-full" />}
          />
          <CutCard
            title="Classic cut"
            body="Timeless scissor-and-clipper shapes—side parts, uniform lengths, conservative tapers."
            visual={<IconCenter src="/icons/chair.png" alt="" />}
          />
          <CutCard
            title="Precision cut"
            body="Detailed, meticulous shaping; great when every millimeter of length matters."
            visual={<IconCenter src="/icons/hair-clipper.png" alt="" />}
          />
          <CutCard
            title="Locs maintenance"
            body="Retwist, tidy roots, and shape without damaging mature locs."
            visual={<LocsArt className="w-full h-full" />}
          />
          <CutCard
            title="Braids"
            body="Cornrows, plaits, and braided styles that need sectioning skill and consistent tension."
            visual={<BraidsArt className="w-full h-full" />}
          />
          <CutCard
            title="Hair designs"
            body="Patterns, parts, and creative clipper art etched into shorter areas."
            visual={<IconCenter src="/icons/star-filled.png" alt="" />}
          />
          <CutCard
            title="Styling"
            body="Blow-dry, product-based finish, or event-ready looks after the cut."
            visual={<IconCenter src="/icons/barbershop.png" alt="" />}
          />
          <CutCard
            title="Color"
            body="Professional color at the shop—tones, blends, or gray coverage where offered."
            visual={<ColorSwatchArt className="w-full h-full" />}
          />
        </div>
      </section>

      <div className="space-y-8 text-fade-muted leading-relaxed max-w-3xl mb-12">
        <section>
          <h2 className="text-xl font-semibold text-fade-navy mb-3">
            How we think about trust
          </h2>
          <p>
            We publish{" "}
            <Link href="/how-we-rank" className="text-fade-accent font-medium hover:underline">
              how FadeScore is built
            </Link>{" "}
            so you know what the number means. We&apos;re not a review platform
            ourselves; ratings come from the sources we sync. If something looks
            wrong for your shop, use{" "}
            <Link href="/barber-intake" className="text-fade-accent font-medium hover:underline">
              barber intake
            </Link>{" "}
            and we&apos;ll take a look.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-fade-navy mb-3">
            For shops &amp; barbers
          </h2>
          <p>
            Want your profile accurate or updated? The{" "}
            <Link href="/barber-intake" className="text-fade-accent font-medium hover:underline">
              intake form
            </Link>{" "}
            helps us list your hair types, cuts, and contact details so the right
            clients find you.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-fade-navy/10">
        <Link
          href="/search"
          className="inline-flex items-center rounded-full bg-fade-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-fade-navy/90 transition-colors"
        >
          Search barbers
        </Link>
      </div>
    </div>
  );
}

function CutCard({
  title,
  body,
  visual,
}: {
  title: string;
  body: string;
  visual: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-fade-navy/8 bg-white/90 overflow-hidden shadow-sm flex flex-col">
      <div className="h-32 border-b border-fade-navy/8">{visual}</div>
      <div className="p-5 flex-1">
        <h3 className="font-semibold text-fade-navy mb-2">{title}</h3>
        <p className="text-sm text-fade-muted leading-relaxed">{body}</p>
      </div>
    </article>
  );
}
