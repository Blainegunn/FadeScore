import type { Metadata } from "next";
import Image from "next/image";
import { getAllBarbersForHiddenGems } from "@/data/barbers";
import { BarberCard } from "@/components/BarberCard";
import { needsVerification } from "@/lib/filters";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "These Barbers Charge Under $30 and Have a 4.8+ Rating | FadeScore",
  description:
    "Hidden gem barbers across the US: great cuts under $30 with FadeScore 4.8 or higher. Best value barbers ranked by real reviews.",
};

export default async function HiddenGemBarbersPage() {
  const allGems = await getAllBarbersForHiddenGems();
  const barbers = allGems.filter((b) => !needsVerification(b));
  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-16">
      <h1 className="text-4xl font-bold tracking-tight text-fade-navy mb-4">
<Image src="/icons/diamond.png" alt="" width={32} height={32} className="inline-block -mt-1 mr-2" />
        These Barbers Charge Under $30 and Have a 4.8+ Rating
      </h1>
      <p className="text-lg text-fade-muted mb-4">
        We found barbers who deliver top-tier cuts without the premium price — all under $30 with a FadeScore of 4.8 or higher.
      </p>
      <p className="mb-10 rounded-2xl bg-amber-50/90 border border-amber-200/80 px-4 py-2.5 text-sm text-fade-navy">
        Great cuts at a great price — best value barbers in the country, ranked by real reviews.
      </p>
      {barbers.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 list-none p-0 m-0">
          {barbers.map((barber, i) => (
            <li key={barber.id} className="h-full">
              <BarberCard barber={barber} rank={i + 1} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-fade-muted">No hidden gem barbers in the database yet. Add cities and barbers to see results.</p>
      )}
    </article>
  );
}
