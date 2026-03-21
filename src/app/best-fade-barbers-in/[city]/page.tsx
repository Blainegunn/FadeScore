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
    title: `Best Fade Barbers in ${city.name} (${year}) | FadeScore`,
    description: `Find the best fade barbers in ${city.name}. Ranked by FadeScore, reviews, and price.`,
  };
}

export default async function BestFadeBarbersPage({ params }: Props) {
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
      variant="best-fade"
      pageTitle={`Best Fade Barbers in ${city.name} (${year})`}
      metaDescription={`Best fade barbers in ${city.name} ranked by FadeScore.`}
      introText={`We ranked the best fade barbers in ${city.name} using customer reviews, FadeScore, and haircut prices.`}
    />
  );
}
