/**
 * Geocode unknown city names via OpenStreetMap Nominatim.
 * Used as a fallback when a search query doesn't match any city in our hardcoded list.
 */

export interface GeocodedCity {
  name: string;
  state: string;
  stateAbbr: string;
  lat: number;
  lng: number;
  displayName: string;
}

// Full state name → 2-letter abbreviation
const STATE_ABBR: Record<string, string> = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  "new hampshire": "NH",
  "new jersey": "NJ",
  "new mexico": "NM",
  "new york": "NY",
  "north carolina": "NC",
  "north dakota": "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  "rhode island": "RI",
  "south carolina": "SC",
  "south dakota": "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  "west virginia": "WV",
  wisconsin: "WI",
  wyoming: "WY",
  "district of columbia": "DC",
};

// Reverse: abbreviation → full name (lowercase)
const ABBR_TO_STATE: Record<string, string> = {};
for (const [name, abbr] of Object.entries(STATE_ABBR)) {
  ABBR_TO_STATE[abbr.toLowerCase()] = name;
}

/** Parse "Pasadena, CA" → { cityName: "Pasadena", stateFilter: "california" } */
export function parseQueryParts(raw: string): {
  cityName: string;
  stateFilter?: string;
} {
  const parts = raw.split(",").map((s) => s.trim());
  if (parts.length >= 2) {
    const cityName = parts[0];
    const stateRaw = parts[1].toLowerCase();
    // Check if it's a 2-letter abbreviation
    const fromAbbr = ABBR_TO_STATE[stateRaw];
    if (fromAbbr) {
      return { cityName, stateFilter: fromAbbr };
    }
    // Check if it's a full state name
    if (STATE_ABBR[stateRaw]) {
      return { cityName, stateFilter: stateRaw };
    }
    // Unknown state part — treat the whole thing as city name
    return { cityName: raw };
  }
  return { cityName: raw.trim() };
}

/** Get abbreviation for a state name (lowercase input). */
function getStateAbbr(stateName: string): string {
  return STATE_ABBR[stateName.toLowerCase()] ?? stateName.slice(0, 2).toUpperCase();
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
  };
}

/** Geocode a city name via Nominatim. Returns deduplicated results (one per state). */
export async function geocodeCity(
  cityName: string,
  stateFilter?: string,
): Promise<GeocodedCity[]> {
  const params = new URLSearchParams({
    q: stateFilter
      ? `${cityName}, ${getStateAbbr(stateFilter)}, United States`
      : `${cityName}, United States`,
    format: "json",
    addressdetails: "1",
    countrycodes: "us",
    limit: "5",
  });

  const url = `https://nominatim.openstreetmap.org/search?${params}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "FadeScore/1.0 (barber search)" },
    next: { revalidate: 86400 }, // 24h cache
  });

  if (!res.ok) return [];

  const data: NominatimResult[] = await res.json();

  // Deduplicate by state
  const seen = new Map<string, GeocodedCity>();

  for (const item of data) {
    const state = item.address?.state;
    if (!state) continue;

    const stateLower = state.toLowerCase();

    // If user specified a state filter, skip non-matching results
    if (stateFilter && stateLower !== stateFilter) continue;

    // Deduplicate: keep first result per state
    if (seen.has(stateLower)) continue;

    const abbr = getStateAbbr(stateLower);
    const name =
      item.address?.city ??
      item.address?.town ??
      item.address?.village ??
      cityName;

    seen.set(stateLower, {
      name,
      state: state,
      stateAbbr: abbr,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      displayName: `${name}, ${abbr}`,
    });
  }

  return Array.from(seen.values());
}
