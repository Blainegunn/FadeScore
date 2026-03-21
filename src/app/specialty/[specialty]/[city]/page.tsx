import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/data";
import { getBarbersByCity } from "@/data/barbers";
import { CUT_TYPE_ROUTE_MAP } from "@/lib/seo";
import { filterBarbers } from "@/lib/filters";
import { CityPageTemplate } from "@/components/CityPageTemplate";

export const revalidate = 3600;

interface Props {
  params: Promise<{ specialty: string; city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialty, city: citySlug } = await params;
  const route = CUT_TYPE_ROUTE_MAP.get(specialty);
  if (!route) return { title: "Not Found" };
  const city = await getCityBySlug(citySlug);
  if (!city) return { title: "City Not Found" };
  const year = new Date().getFullYear();
  return {
    title: `${route.titleTemplate(city.name, year)} | FadeScore`,
    description: route.descriptionTemplate(city.name),
  };
}

export default async function SpecialtyPage({ params }: Props) {
  const { specialty, city: citySlug } = await params;
  const route = CUT_TYPE_ROUTE_MAP.get(specialty);
  if (!route) notFound();
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();

  const allBarbers = await getBarbersByCity(city.slug);
  const barbers = filterBarbers(allBarbers, [], [route.cutType]);
  const year = new Date().getFullYear();

  return (
    <CityPageTemplate
      citySlug={city.slug}
      cityName={city.name}
      state={city.state}
      barbers={barbers.length > 0 ? barbers : allBarbers}
      variant="best"
      pageTitle={route.h2Template(city.name)}
      metaDescription={route.descriptionTemplate(city.name)}
      introText={route.introTemplate(city.name)}
    />
  );
}
