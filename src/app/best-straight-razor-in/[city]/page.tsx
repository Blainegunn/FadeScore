import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/data";
import { getBarbersByCity } from "@/data/barbers";
import { CUT_TYPE_ROUTE_MAP } from "@/lib/seo";
import { filterBarbers } from "@/lib/filters";
import { CityPageTemplate } from "@/components/CityPageTemplate";

export const revalidate = 3600;

const ROUTE = CUT_TYPE_ROUTE_MAP.get("straight-razor")!;

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return { title: "City Not Found" };
  const year = new Date().getFullYear();
  return {
    title: `${ROUTE.titleTemplate(city.name, year)} | FadeScore`,
    description: ROUTE.descriptionTemplate(city.name),
  };
}

export default async function StraightRazorBarbersPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();

  const allBarbers = await getBarbersByCity(city.slug);
  const barbers = filterBarbers(allBarbers, [], [ROUTE.cutType]);

  return (
    <CityPageTemplate
      citySlug={city.slug}
      cityName={city.name}
      state={city.state}
      barbers={barbers.length > 0 ? barbers : allBarbers}
      variant="best"
      pageTitle={ROUTE.h2Template(city.name)}
      metaDescription={ROUTE.descriptionTemplate(city.name)}
      introText={ROUTE.introTemplate(city.name)}
    />
  );
}
