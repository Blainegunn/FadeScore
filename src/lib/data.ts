import { getCityBySlug, getAllCitySlugs, getAllCities } from "@/data/cities";
import {
  getBarbersByCity,
  getBarberBySlug,
  getAllBarbersForHiddenGems,
} from "@/data/barbers";
import type { Barber } from "@/types";

export { getCityBySlug, getAllCitySlugs, getAllCities };
export { getBarbersByCity, getBarberBySlug, getAllBarbersForHiddenGems };

export function getCityPageStats(cityName: string, barbers: Barber[]) {
  const prices = barbers.map((b) => b.avgPrice);
  const avgPrice =
    prices.length > 0
      ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      : 0;
  const topBarber = barbers[0];
  return {
    avgPrice,
    topBarberName: topBarber?.name ?? "",
    topBarberScore: topBarber?.fadeScore ?? 0,
  };
}
