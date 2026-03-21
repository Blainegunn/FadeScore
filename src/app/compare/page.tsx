import type { Metadata } from "next";
import Link from "next/link";
import { getBarberBySlug } from "@/data/barbers";
import type { Barber } from "@/types";

export const metadata: Metadata = {
  title: "Compare Barbers | FadeScore",
  description: "Compare barbers side-by-side by FadeScore, price, reviews, and specialties.",
};

interface Props {
  searchParams: Promise<{ barbers?: string }>;
}

export default async function ComparePage({ searchParams }: Props) {
  const params = await searchParams;
  const slugs = (params.barbers ?? "").split(",").filter(Boolean).slice(0, 4);

  const barbers: Barber[] = [];
  for (const slug of slugs) {
    const barber = await getBarberBySlug(slug);
    if (barber) barbers.push(barber);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-16">
      <h1 className="text-3xl font-bold tracking-tight text-fade-navy mb-2">Compare Barbers</h1>
      <p className="text-fade-muted mb-8">
        Side-by-side comparison of barbers. Add barbers by clicking &quot;Compare&quot; on any barber card.
      </p>

      {barbers.length === 0 ? (
        <div className="rounded-2xl border border-fade-navy/8 bg-white/90 p-8 text-center shadow-sm">
          <p className="text-fade-navy mb-2">No barbers selected for comparison.</p>
          <p className="text-sm text-fade-muted mb-4">
            Search for barbers and click &quot;Compare&quot; to add them here.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center rounded-full bg-fade-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-fade-navy/90"
          >
            Search barbers
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-fade-navy/8 bg-white/90 shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 border-b border-fade-navy/10 text-sm font-medium text-fade-muted">
                  Attribute
                </th>
                {barbers.map((b) => (
                  <th key={b.id} className="p-3 border-b border-fade-navy/10 text-left">
                    <Link
                      href={`/barber/${b.slug}`}
                      className="font-name font-semibold text-fade-accent hover:underline"
                    >
                      {b.name}
                    </Link>
                    <p className="font-name text-xs text-fade-muted font-normal">{b.shopName}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-fade-navy/5 text-sm font-medium text-fade-navy">FadeScore</td>
                {barbers.map((b) => (
                  <td key={b.id} className="p-3 border-b border-fade-navy/5">
                    <span className="text-lg font-bold text-fade-navy">{b.fadeScore}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border-b border-fade-navy/5 text-sm font-medium text-fade-navy">Avg Price</td>
                {barbers.map((b) => (
                  <td key={b.id} className="p-3 border-b border-fade-navy/5">
                    <span className="text-lg font-bold text-fade-navy">${b.avgPrice}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border-b border-fade-navy/5 text-sm font-medium text-fade-navy">Reviews</td>
                {barbers.map((b) => (
                  <td key={b.id} className="p-3 border-b border-fade-navy/5 text-fade-muted">
                    {b.reviewCount}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border-b border-fade-navy/5 text-sm font-medium text-fade-navy">City</td>
                {barbers.map((b) => (
                  <td key={b.id} className="p-3 border-b border-fade-navy/5 text-sm text-fade-muted">
                    {b.city}, {b.state}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border-b border-fade-navy/5 text-sm font-medium text-fade-navy">Specialties</td>
                {barbers.map((b) => (
                  <td key={b.id} className="p-3 border-b border-fade-navy/5">
                    <div className="flex flex-wrap gap-1">
                      {b.specialties.slice(0, 5).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full text-xs border border-fade-navy/10 bg-fade-canvas text-fade-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border-b border-fade-navy/5 text-sm font-medium text-fade-navy">Shop</td>
                {barbers.map((b) => (
                  <td key={b.id} className="p-3 border-b border-fade-navy/5 text-sm">
                    <Link
                      href={`/shop/${b.shopSlug}`}
                      className="font-name text-fade-accent hover:underline"
                    >
                      {b.shopName}
                    </Link>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-sm font-medium text-fade-navy">Platforms</td>
                {barbers.map((b) => (
                  <td key={b.id} className="p-3 text-xs text-fade-muted">
                    {b.reviews?.map((r) => `${r.platform} ${r.rating}`).join(" · ") || "—"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
