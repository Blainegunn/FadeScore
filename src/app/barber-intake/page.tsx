import type { Metadata } from "next";
import Link from "next/link";
import { getAllShops } from "@/data/barbers";
import { IntakeForm } from "./IntakeForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Barber intake | Confirm your listing | FadeScore",
  description:
    "Confirm your barbershop listing, hair types, and cuts you offer. We'll use this to keep FadeScore accurate and reach out with updates.",
};

interface Props {
  searchParams: Promise<{ shop?: string }>;
}

export default async function BarberIntakePage({ searchParams }: Props) {
  const { shop: shopSlug } = await searchParams;
  const shops = await getAllShops();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-16">
      <nav className="text-sm text-fade-muted mb-6">
        <Link href="/" className="hover:text-fade-navy">
          FadeScore
        </Link>
        <span className="mx-1">/</span>
        <span className="text-fade-navy">Barber intake</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-fade-navy mb-2">
        Confirm your listing
      </h1>
      <p className="text-fade-muted mb-8">
        Help us keep your FadeScore profile accurate. Tell us which hair types you work with and what cuts you offer. We&apos;ll use your email to follow up and may reach out about your listing.
      </p>

      <IntakeForm shops={shops} defaultShopSlug={shopSlug} />
    </article>
  );
}
