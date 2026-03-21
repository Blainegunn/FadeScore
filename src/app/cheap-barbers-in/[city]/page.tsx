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
  return {
    title: `Cheap Barbers in ${city.name} | Best Affordable Haircuts | FadeScore`,
    description: `Find cheap barbers in ${city.name}. Quality cuts under $30 ranked by FadeScore and reviews.`,
  };
}

export default async function CheapBarbersPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();
  const barbers = await getBarbersByCity(city.slug);
  return (
    <CityPageTemplate
      citySlug={city.slug}
      cityName={city.name}
      state={city.state}
      barbers={barbers}
      variant="cheap"
      pageTitle={`Cheap Barbers in ${city.name}`}
      metaDescription={`Cheap barbers in ${city.name} under $30.`}
      introText={`We found the best affordable barbers in ${city.name} — quality cuts without the high price.`}
    />
  );
}
