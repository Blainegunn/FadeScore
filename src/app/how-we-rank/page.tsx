import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How we work | FadeScore",
  description:
    "How FadeScore combines review quality, review volume, and price vs. local averages into one rating.",
};

const PLATFORM_WEIGHTS = [
  { platform: "Google", weight: "50%" },
  { platform: "Yelp", weight: "30%" },
  { platform: "Facebook", weight: "10%" },
  { platform: "Booksy", weight: "5%" },
  { platform: "Squire", weight: "5%" },
];

export default function HowWeRankPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20">
      <p className="text-sm font-medium text-fade-accent mb-2">How we work</p>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-fade-navy mb-4">
        How FadeScore is calculated
      </h1>
      <p className="text-fade-muted text-lg leading-relaxed mb-10">
        FadeScore is a single number that blends how people rate a shop or barber,
        how much feedback exists, and how their price compares to other listings in
        the same city. It&apos;s designed to reward strong reviews and fair
        pricing—not hype alone.
      </p>

      <div className="rounded-2xl border border-fade-navy/10 bg-white/90 p-6 sm:p-8 shadow-sm mb-10">
        <h2 className="font-semibold text-fade-navy mb-3">The formula</h2>
        <p className="text-sm text-fade-muted leading-relaxed mb-4">
          Each FadeScore is built from three parts, then rounded to one decimal
          place:
        </p>
        <code className="block text-sm text-fade-navy bg-fade-canvas/80 border border-fade-navy/8 rounded-xl px-4 py-3 font-mono leading-relaxed">
          FadeScore = (weighted rating × 0.6) + (review volume × 0.2) + (price
          value × 0.2)
        </code>
        <ul className="mt-5 space-y-3 text-sm text-fade-muted leading-relaxed">
          <li>
            <strong className="text-fade-navy">Weighted rating (60%)</strong> —
            Star ratings from multiple platforms are combined using fixed
            weights so larger, established sources count a bit more.
          </li>
          <li>
            <strong className="text-fade-navy">Review volume (20%)</strong> —
            Total reviews are log-scaled and capped so more feedback helps, but
            one viral spike can&apos;t dominate the score.
          </li>
          <li>
            <strong className="text-fade-navy">Price value (20%)</strong> —
            Compared to a typical price level for that city: lower-than-average
            listed prices score higher, holding reviews equal.
          </li>
        </ul>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fade-navy mb-4">
          Platform weights
        </h2>
        <p className="text-sm text-fade-muted leading-relaxed mb-4">
          When we have data from a platform, it contributes to the weighted
          average like this. Other platforms default to a small share if they
          appear in your data.
        </p>
        <div className="rounded-2xl border border-fade-navy/8 overflow-hidden bg-white/90 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-fade-navy/10 bg-fade-canvas/50 text-left text-fade-navy">
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Share of blend</th>
              </tr>
            </thead>
            <tbody className="text-fade-muted">
              {PLATFORM_WEIGHTS.map((row) => (
                <tr
                  key={row.platform}
                  className="border-b border-fade-navy/6 last:border-0"
                >
                  <td className="px-4 py-3">{row.platform}</td>
                  <td className="px-4 py-3 tabular-nums">{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-fade-muted mt-3 leading-relaxed">
          Other platforms in your data use a smaller default weight in the blend
          unless listed above.
        </p>
      </section>

      <section className="rounded-2xl border border-fade-navy/8 bg-white/80 p-6 sm:p-7 mb-10">
        <h2 className="text-xl font-semibold text-fade-navy mb-3">
          What we don&apos;t do
        </h2>
        <ul className="space-y-2 text-sm text-fade-muted leading-relaxed list-disc pl-5">
          <li>
            FadeScore is not a paid placement—scores come from the data above,
            not sponsorships.
          </li>
          <li>
            Prices and review counts reflect what&apos;s listed or synced from
            sources we have; they may lag real-world changes.
          </li>
          <li>
            City &quot;average&quot; price is derived from shops we track in
            that area—use it as a guide, not a guarantee.
          </li>
        </ul>
      </section>

      <p className="text-sm text-fade-muted">
        Questions about your listing?{" "}
        <Link
          href="/barber-intake"
          className="text-fade-accent font-medium hover:underline"
        >
          Barber intake
        </Link>
        .
      </p>
    </div>
  );
}
