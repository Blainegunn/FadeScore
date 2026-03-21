import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPageTemplate } from "@/components/CityPageTemplate";
import { getCityBySlug } from "@/lib/data";
import { getBarbersByCity } from "@/data/barbers";

export const revalidate = 3600;

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return { title: "City Not Found" };
  const year = new Date().getFullYear();
  return {
    title: `Best Barbers in ${city.name} (${year}) | FadeScore`,
    description: `We ranked the best barbers in ${city.name} using haircut prices, customer reviews, and FadeScore ratings. Find top barbers and hidden gems.`,
  };
}

export default async function BestBarbersPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();
  const barbers = await getBarbersByCity(city.slug);
  const year = new Date().getFullYear();
  return (
    <CityPageTemplate
      citySlug={city.slug}
      cityName={city.name}
      state={city.state}
      barbers={barbers}
      variant="best"
      pageTitle={`Best Barbers in ${city.name} (${year})`}
      metaDescription={`Best barbers in ${city.name} ranked by FadeScore.`}
      introText={`We analyzed haircut prices, customer reviews, and skill ratings to rank the best barbers in ${city.name}.`}
    />
  );
}
