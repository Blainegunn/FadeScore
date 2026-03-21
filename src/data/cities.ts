import type { City } from "@/types";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

function getSupabase() {
  return createSupabaseAdmin();
}

/** Fetch all cities from Supabase. Cached per request. */
let _citiesCache: City[] | null = null;

async function fetchCities(): Promise<City[]> {
  if (_citiesCache) return _citiesCache;

  const { data, error } = await getSupabase()
    .from("cities")
    .select("slug, name, state, state_abbr, latitude, longitude")
    .order("name");

  if (error) {
    console.error("fetchCities error:", error);
    return [];
  }

  _citiesCache = (data ?? []).map((c) => ({
    slug: c.slug,
    name: c.name,
    state: c.state,
    stateAbbr: c.state_abbr ?? undefined,
    latitude: c.latitude ?? undefined,
    longitude: c.longitude ?? undefined,
  }));

  return _citiesCache;
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  const cities = await fetchCities();
  return cities.find((c) => c.slug === slug);
}

export async function getAllCitySlugs(): Promise<string[]> {
  const cities = await fetchCities();
  return cities.map((c) => c.slug);
}

/** Returns only city slugs that have real barber data. */
export async function getCitySlugsWithData(): Promise<string[]> {
  const { data, error } = await getSupabase()
    .from("cities")
    .select("slug, shops!inner(id)")
    .order("name");

  if (error) {
    console.error("getCitySlugsWithData error:", error);
    return [];
  }
  return (data ?? []).map((c) => c.slug);
}

/** Get all cities (full array). */
export async function getAllCities(): Promise<City[]> {
  return fetchCities();
}
