import type { CutType, HairType } from "@/types";
import { CUT_TYPE_LABELS, HAIR_TYPE_LABELS } from "./filters";

/**
 * SEO route configuration for programmatic page generation.
 * Each entry creates a /best-[slug]-in/[city] route.
 */

export interface CutTypeRoute {
  slug: string;
  cutType: CutType;
  label: string;
  titleTemplate: (city: string, year: number) => string;
  descriptionTemplate: (city: string) => string;
  introTemplate: (city: string) => string;
  h2Template: (city: string) => string;
}

export const CUT_TYPE_ROUTES: CutTypeRoute[] = [
  {
    slug: "skin-fade",
    cutType: "skin-fade",
    label: "Skin Fade",
    titleTemplate: (city, year) => `Best Skin Fade Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find the best skin fade barbers in ${city}. Ranked by FadeScore, real reviews, and prices.`,
    introTemplate: (city) => `We ranked the best skin fade barbers in ${city} using real customer reviews, FadeScore ratings, and haircut prices.`,
    h2Template: (city) => `Top Skin Fade Barbers in ${city}`,
  },
  {
    slug: "taper-fade",
    cutType: "taper-fade",
    label: "Taper Fade",
    titleTemplate: (city, year) => `Best Taper Fade Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find the best taper fade barbers in ${city}. Real reviews, prices, and FadeScore ratings.`,
    introTemplate: (city) => `Looking for a clean taper fade in ${city}? We ranked the best taper fade barbers by customer reviews and FadeScore.`,
    h2Template: (city) => `Top Taper Fade Barbers in ${city}`,
  },
  {
    slug: "lineup",
    cutType: "lineup",
    label: "Lineup",
    titleTemplate: (city, year) => `Best Lineup & Edge Up Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers who specialize in lineups and edge ups in ${city}. Ranked by real reviews.`,
    introTemplate: (city) => `Need a crisp lineup in ${city}? Here are the top-rated barbers for lineups and edge ups, ranked by real customer reviews.`,
    h2Template: (city) => `Top Lineup Barbers in ${city}`,
  },
  {
    slug: "beard",
    cutType: "beard",
    label: "Beard",
    titleTemplate: (city, year) => `Best Beard Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find the best beard trim and shaping barbers in ${city}. Ranked by FadeScore and real reviews.`,
    introTemplate: (city) => `Looking for an expert beard trim or shaping in ${city}? We ranked barbers who specialize in beards by FadeScore and reviews.`,
    h2Template: (city) => `Top Beard Barbers in ${city}`,
  },
  {
    slug: "designs",
    cutType: "designs",
    label: "Hair Designs",
    titleTemplate: (city, year) => `Best Hair Design Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers who specialize in hair designs and patterns in ${city}.`,
    introTemplate: (city) => `Want creative hair designs in ${city}? These barbers are known for artistic designs and patterns.`,
    h2Template: (city) => `Top Design Barbers in ${city}`,
  },
  {
    slug: "locs",
    cutType: "locs",
    label: "Locs",
    titleTemplate: (city, year) => `Best Loc Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers who specialize in locs and dreadlock maintenance in ${city}.`,
    introTemplate: (city) => `Looking for a barber experienced with locs in ${city}? Here are the top-rated loc specialists.`,
    h2Template: (city) => `Top Loc Specialists in ${city}`,
  },
  {
    slug: "braids",
    cutType: "braids",
    label: "Braids",
    titleTemplate: (city, year) => `Best Braiding Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers who specialize in braids in ${city}. Ranked by reviews and FadeScore.`,
    introTemplate: (city) => `Need braids in ${city}? These barbers specialize in braiding styles and are top-rated by customers.`,
    h2Template: (city) => `Top Braiding Barbers in ${city}`,
  },
  {
    slug: "razor-fade",
    cutType: "razor-fade",
    label: "Razor Fade",
    titleTemplate: (city, year) => `Best Razor Fade Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find the best razor fade barbers in ${city}. Expert fades ranked by real reviews.`,
    introTemplate: (city) => `Looking for a sharp razor fade in ${city}? We ranked the best razor fade barbers using customer reviews and FadeScore.`,
    h2Template: (city) => `Top Razor Fade Barbers in ${city}`,
  },
  {
    slug: "classic-cut",
    cutType: "classic-cut",
    label: "Classic Cut",
    titleTemplate: (city, year) => `Best Classic Cut Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers for classic cuts and traditional styles in ${city}.`,
    introTemplate: (city) => `Want a timeless classic cut in ${city}? These barbers deliver traditional, clean cuts ranked by real reviews.`,
    h2Template: (city) => `Top Classic Cut Barbers in ${city}`,
  },
  {
    slug: "straight-razor",
    cutType: "straight-razor",
    label: "Straight Razor",
    titleTemplate: (city, year) => `Best Straight Razor Shave Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers who offer straight razor shaves in ${city}. Hot lather and classic shaves.`,
    introTemplate: (city) => `Looking for a real straight razor shave in ${city}? These barbers offer hot lather straight razor shaves.`,
    h2Template: (city) => `Top Straight Razor Barbers in ${city}`,
  },
  {
    slug: "styling",
    cutType: "styling",
    label: "Styling",
    titleTemplate: (city, year) => `Best Hair Styling Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers who specialize in hair styling in ${city}.`,
    introTemplate: (city) => `Need professional hair styling in ${city}? These barbers are known for styling expertise.`,
    h2Template: (city) => `Top Styling Barbers in ${city}`,
  },
  {
    slug: "colors",
    cutType: "colors",
    label: "Hair Color",
    titleTemplate: (city, year) => `Best Hair Color Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers who offer hair coloring services in ${city}.`,
    introTemplate: (city) => `Looking for hair color at a barbershop in ${city}? These barbers offer professional coloring services.`,
    h2Template: (city) => `Top Hair Color Barbers in ${city}`,
  },
  {
    slug: "precision-cut",
    cutType: "precision-cut",
    label: "Precision Cut",
    titleTemplate: (city, year) => `Best Precision Cut Barbers in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers known for precision cuts in ${city}. Clean, detailed cuts ranked by reviews.`,
    introTemplate: (city) => `Want a clean, detailed precision cut in ${city}? These barbers deliver meticulous cuts, ranked by real reviews.`,
    h2Template: (city) => `Top Precision Cut Barbers in ${city}`,
  },
];

export const CUT_TYPE_ROUTE_MAP = new Map(CUT_TYPE_ROUTES.map((r) => [r.slug, r]));

export interface HairTypeRoute {
  slug: string;
  hairType: HairType;
  label: string;
  titleTemplate: (city: string, year: number) => string;
  descriptionTemplate: (city: string) => string;
  introTemplate: (city: string) => string;
}

export const HAIR_TYPE_ROUTES: HairTypeRoute[] = [
  {
    slug: "curly-hair",
    hairType: "textured-coily",
    label: "Curly / Textured Hair",
    titleTemplate: (city, year) => `Best Barbers for Curly Hair in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers who specialize in curly and textured hair in ${city}. Expert cuts for coily, curly, and textured hair types.`,
    introTemplate: (city) => `Looking for a barber who knows curly and textured hair in ${city}? We ranked barbers experienced with coily and curly hair types.`,
  },
  {
    slug: "straight-hair",
    hairType: "straight",
    label: "Straight Hair",
    titleTemplate: (city, year) => `Best Barbers for Straight Hair in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers for straight hair cuts in ${city}. Clean cuts for straight hair, ranked by reviews.`,
    introTemplate: (city) => `Need a barber experienced with straight hair in ${city}? These barbers specialize in styles for straight hair.`,
  },
  {
    slug: "wavy-hair",
    hairType: "wavy",
    label: "Wavy Hair",
    titleTemplate: (city, year) => `Best Barbers for Wavy Hair in ${city} (${year})`,
    descriptionTemplate: (city) => `Find barbers who work with wavy hair in ${city}. Cuts that complement your natural wave pattern.`,
    introTemplate: (city) => `Looking for a barber who understands wavy hair in ${city}? These barbers work with your natural texture.`,
  },
];

export const HAIR_TYPE_ROUTE_MAP = new Map(HAIR_TYPE_ROUTES.map((r) => [r.slug, r]));

/** Get all SEO-relevant cut type slugs for internal linking */
export function getCutTypeLinks(citySlug: string, cityName: string) {
  return CUT_TYPE_ROUTES.map((r) => ({
    href: `/best-${r.slug}-in/${citySlug}`,
    label: `Best ${r.label} in ${cityName}`,
  }));
}

/** Get all SEO-relevant hair type slugs for internal linking */
export function getHairTypeLinks(citySlug: string, cityName: string) {
  return HAIR_TYPE_ROUTES.map((r) => ({
    href: `/best-barbers-for-${r.slug}-in/${citySlug}`,
    label: `Best Barbers for ${r.label} in ${cityName}`,
  }));
}
