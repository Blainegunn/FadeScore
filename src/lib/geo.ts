import type { City } from "@/types";
import { getAllCities } from "@/data/cities";
import { CITY_COORDINATES } from "@/data/city-coordinates";

/** Distance between two points in miles (haversine). */
export function distanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface CityWithDistance extends City {
  distanceMiles: number;
}

/** Cities that have coordinates and are within radius (miles) of (lat, lng). */
export async function getCitiesWithinRadius(
  lat: number,
  lng: number,
  radiusMiles: number
): Promise<CityWithDistance[]> {
  const cities = await getAllCities();
  const results: CityWithDistance[] = [];
  for (const city of cities) {
    const coords = CITY_COORDINATES[city.slug];
    if (!coords) continue;
    const d = distanceMiles(lat, lng, coords.lat, coords.lng);
    if (d <= radiusMiles) {
      results.push({ ...city, distanceMiles: Math.round(d * 10) / 10 });
    }
  }
  results.sort((a, b) => a.distanceMiles - b.distanceMiles);
  return results;
}
