/**
 * Zip code → city mapping and coordinates for "search by zip" and radius.
 * One primary zip per city. Expand with more zips as needed.
 */
export interface ZipInfo {
  zip: string;
  lat: number;
  lng: number;
  citySlug: string;
  cityName: string;
  state: string;
}

export const ZIPS: ZipInfo[] = [
  { zip: "10001", lat: 40.7506, lng: -73.9971, citySlug: "new-york", cityName: "New York", state: "New York" },
  { zip: "90001", lat: 33.9731, lng: -118.2479, citySlug: "los-angeles", cityName: "Los Angeles", state: "California" },
  { zip: "60601", lat: 41.8853, lng: -87.6222, citySlug: "chicago", cityName: "Chicago", state: "Illinois" },
  { zip: "77001", lat: 29.7508, lng: -95.3621, citySlug: "houston", cityName: "Houston", state: "Texas" },
  { zip: "85001", lat: 33.4484, lng: -112.074, citySlug: "phoenix", cityName: "Phoenix", state: "Arizona" },
  { zip: "19101", lat: 39.9526, lng: -75.1652, citySlug: "philadelphia", cityName: "Philadelphia", state: "Pennsylvania" },
  { zip: "78201", lat: 29.4241, lng: -98.4936, citySlug: "san-antonio", cityName: "San Antonio", state: "Texas" },
  { zip: "92101", lat: 32.7157, lng: -117.1611, citySlug: "san-diego", cityName: "San Diego", state: "California" },
  { zip: "75201", lat: 32.7767, lng: -96.797, citySlug: "dallas", cityName: "Dallas", state: "Texas" },
  { zip: "95101", lat: 37.3382, lng: -121.8863, citySlug: "san-jose", cityName: "San Jose", state: "California" },
  { zip: "78701", lat: 30.2672, lng: -97.7431, citySlug: "austin", cityName: "Austin", state: "Texas" },
  { zip: "32201", lat: 30.3322, lng: -81.6557, citySlug: "jacksonville", cityName: "Jacksonville", state: "Florida" },
  { zip: "76101", lat: 32.7555, lng: -97.3308, citySlug: "fort-worth", cityName: "Fort Worth", state: "Texas" },
  { zip: "43201", lat: 39.9612, lng: -82.9988, citySlug: "columbus", cityName: "Columbus", state: "Ohio" },
  { zip: "28201", lat: 35.2271, lng: -80.8431, citySlug: "charlotte", cityName: "Charlotte", state: "North Carolina" },
  { zip: "94102", lat: 37.7749, lng: -122.4194, citySlug: "san-francisco", cityName: "San Francisco", state: "California" },
  { zip: "46201", lat: 39.7684, lng: -86.1581, citySlug: "indianapolis", cityName: "Indianapolis", state: "Indiana" },
  { zip: "98101", lat: 47.6062, lng: -122.3321, citySlug: "seattle", cityName: "Seattle", state: "Washington" },
  { zip: "80201", lat: 39.7392, lng: -104.9903, citySlug: "denver", cityName: "Denver", state: "Colorado" },
  { zip: "20001", lat: 38.9072, lng: -77.0369, citySlug: "washington-dc", cityName: "Washington", state: "District of Columbia" },
  { zip: "02101", lat: 42.3601, lng: -71.0589, citySlug: "boston", cityName: "Boston", state: "Massachusetts" },
  { zip: "37201", lat: 36.1627, lng: -86.7816, citySlug: "nashville", cityName: "Nashville", state: "Tennessee" },
  { zip: "48201", lat: 42.3314, lng: -83.0458, citySlug: "detroit", cityName: "Detroit", state: "Michigan" },
  { zip: "73101", lat: 35.4676, lng: -97.5164, citySlug: "oklahoma-city", cityName: "Oklahoma City", state: "Oklahoma" },
  { zip: "97201", lat: 45.5231, lng: -122.6765, citySlug: "portland", cityName: "Portland", state: "Oregon" },
  { zip: "89101", lat: 36.1699, lng: -115.1398, citySlug: "las-vegas", cityName: "Las Vegas", state: "Nevada" },
  { zip: "38101", lat: 35.1495, lng: -90.049, citySlug: "memphis", cityName: "Memphis", state: "Tennessee" },
  { zip: "40201", lat: 38.2527, lng: -85.7585, citySlug: "louisville", cityName: "Louisville", state: "Kentucky" },
  { zip: "21201", lat: 39.2904, lng: -76.6122, citySlug: "baltimore", cityName: "Baltimore", state: "Maryland" },
  { zip: "53201", lat: 43.0389, lng: -87.9065, citySlug: "milwaukee", cityName: "Milwaukee", state: "Wisconsin" },
  { zip: "87101", lat: 35.0844, lng: -106.6504, citySlug: "albuquerque", cityName: "Albuquerque", state: "New Mexico" },
  { zip: "85701", lat: 32.2217, lng: -110.9265, citySlug: "tucson", cityName: "Tucson", state: "Arizona" },
  { zip: "93701", lat: 36.7378, lng: -119.7871, citySlug: "fresno", cityName: "Fresno", state: "California" },
  { zip: "95814", lat: 38.5816, lng: -121.4944, citySlug: "sacramento", cityName: "Sacramento", state: "California" },
  { zip: "30301", lat: 33.749, lng: -84.388, citySlug: "atlanta", cityName: "Atlanta", state: "Georgia" },
  { zip: "64101", lat: 39.0997, lng: -94.5786, citySlug: "kansas-city", cityName: "Kansas City", state: "Missouri" },
  { zip: "85201", lat: 33.4152, lng: -111.8315, citySlug: "mesa", cityName: "Mesa", state: "Arizona" },
  { zip: "23451", lat: 36.8529, lng: -75.978, citySlug: "virginia-beach", cityName: "Virginia Beach", state: "Virginia" },
  { zip: "90801", lat: 33.7701, lng: -118.1937, citySlug: "long-beach", cityName: "Long Beach", state: "California" },
  { zip: "80901", lat: 38.8339, lng: -104.8214, citySlug: "colorado-springs", cityName: "Colorado Springs", state: "Colorado" },
  { zip: "27601", lat: 35.7796, lng: -78.6382, citySlug: "raleigh", cityName: "Raleigh", state: "North Carolina" },
  { zip: "33101", lat: 25.7617, lng: -80.1918, citySlug: "miami", cityName: "Miami", state: "Florida" },
  { zip: "68101", lat: 41.2565, lng: -95.9345, citySlug: "omaha", cityName: "Omaha", state: "Nebraska" },
  { zip: "94601", lat: 37.8044, lng: -122.2712, citySlug: "oakland", cityName: "Oakland", state: "California" },
  { zip: "55401", lat: 44.9778, lng: -93.265, citySlug: "minneapolis", cityName: "Minneapolis", state: "Minnesota" },
  { zip: "74101", lat: 36.1539, lng: -95.9928, citySlug: "tulsa", cityName: "Tulsa", state: "Oklahoma" },
  { zip: "44101", lat: 41.4993, lng: -81.6944, citySlug: "cleveland", cityName: "Cleveland", state: "Ohio" },
  { zip: "67201", lat: 37.6872, lng: -97.3301, citySlug: "wichita", cityName: "Wichita", state: "Kansas" },
  { zip: "76001", lat: 32.7357, lng: -97.1081, citySlug: "arlington", cityName: "Arlington", state: "Texas" },
  { zip: "70112", lat: 29.9511, lng: -90.0715, citySlug: "new-orleans", cityName: "New Orleans", state: "Louisiana" },
  { zip: "93301", lat: 35.3733, lng: -119.0187, citySlug: "bakersfield", cityName: "Bakersfield", state: "California" },
  { zip: "33601", lat: 27.9506, lng: -82.4572, citySlug: "tampa", cityName: "Tampa", state: "Florida" },
  { zip: "96801", lat: 21.3069, lng: -157.8583, citySlug: "honolulu", cityName: "Honolulu", state: "Hawaii" },
  { zip: "80010", lat: 39.7294, lng: -104.8319, citySlug: "aurora", cityName: "Aurora", state: "Colorado" },
  { zip: "92801", lat: 33.8366, lng: -117.9143, citySlug: "anaheim", cityName: "Anaheim", state: "California" },
  { zip: "92701", lat: 33.7455, lng: -117.8677, citySlug: "santa-ana", cityName: "Santa Ana", state: "California" },
  { zip: "63101", lat: 38.627, lng: -90.1994, citySlug: "st-louis", cityName: "St. Louis", state: "Missouri" },
  { zip: "92501", lat: 33.9533, lng: -117.3962, citySlug: "riverside", cityName: "Riverside", state: "California" },
  { zip: "78401", lat: 27.8006, lng: -97.3964, citySlug: "corpus-christi", cityName: "Corpus Christi", state: "Texas" },
  { zip: "15201", lat: 40.4406, lng: -79.9959, citySlug: "pittsburgh", cityName: "Pittsburgh", state: "Pennsylvania" },
  { zip: "40501", lat: 38.0406, lng: -84.5037, citySlug: "lexington", cityName: "Lexington", state: "Kentucky" },
  { zip: "99501", lat: 61.2181, lng: -149.9003, citySlug: "anchorage", cityName: "Anchorage", state: "Alaska" },
  { zip: "95201", lat: 37.9577, lng: -121.2908, citySlug: "stockton", cityName: "Stockton", state: "California" },
  { zip: "45201", lat: 39.1031, lng: -84.512, citySlug: "cincinnati", cityName: "Cincinnati", state: "Ohio" },
  { zip: "55101", lat: 44.9537, lng: -93.09, citySlug: "st-paul", cityName: "St. Paul", state: "Minnesota" },
  { zip: "43601", lat: 41.6528, lng: -83.5379, citySlug: "toledo", cityName: "Toledo", state: "Ohio" },
  { zip: "07101", lat: 40.7357, lng: -74.1724, citySlug: "newark", cityName: "Newark", state: "New Jersey" },
  { zip: "27401", lat: 36.0726, lng: -79.792, citySlug: "greensboro", cityName: "Greensboro", state: "North Carolina" },
  { zip: "75001", lat: 33.0198, lng: -96.6989, citySlug: "plano", cityName: "Plano", state: "Texas" },
  { zip: "89001", lat: 36.0395, lng: -114.9817, citySlug: "henderson", cityName: "Henderson", state: "Nevada" },
  { zip: "68501", lat: 40.8258, lng: -96.6852, citySlug: "lincoln", cityName: "Lincoln", state: "Nebraska" },
  { zip: "14201", lat: 42.8864, lng: -78.8784, citySlug: "buffalo", cityName: "Buffalo", state: "New York" },
  { zip: "46801", lat: 41.0793, lng: -85.1394, citySlug: "fort-wayne", cityName: "Fort Wayne", state: "Indiana" },
  { zip: "07301", lat: 40.7178, lng: -74.0431, citySlug: "jersey-city", cityName: "Jersey City", state: "New Jersey" },
  { zip: "33701", lat: 27.7676, lng: -82.6403, citySlug: "st-petersburg", cityName: "St. Petersburg", state: "Florida" },
  { zip: "91910", lat: 32.6401, lng: -117.0842, citySlug: "chula-vista", cityName: "Chula Vista", state: "California" },
  { zip: "32801", lat: 28.5383, lng: -81.3792, citySlug: "orlando", cityName: "Orlando", state: "Florida" },
  { zip: "23501", lat: 36.8508, lng: -76.2859, citySlug: "norfolk", cityName: "Norfolk", state: "Virginia" },
  { zip: "85224", lat: 33.3062, lng: -111.8413, citySlug: "chandler", cityName: "Chandler", state: "Arizona" },
  { zip: "78040", lat: 27.5036, lng: -99.5075, citySlug: "laredo", cityName: "Laredo", state: "Texas" },
  { zip: "53701", lat: 43.0731, lng: -89.4012, citySlug: "madison", cityName: "Madison", state: "Wisconsin" },
  { zip: "27701", lat: 35.994, lng: -78.8986, citySlug: "durham", cityName: "Durham", state: "North Carolina" },
  { zip: "27101", lat: 36.0999, lng: -80.2442, citySlug: "winston-salem", cityName: "Winston-Salem", state: "North Carolina" },
  { zip: "75040", lat: 32.9126, lng: -96.6389, citySlug: "garland", cityName: "Garland", state: "Texas" },
  { zip: "33010", lat: 25.8576, lng: -80.2781, citySlug: "hialeah", cityName: "Hialeah", state: "Florida" },
  { zip: "89501", lat: 39.5296, lng: -119.8138, citySlug: "reno", cityName: "Reno", state: "Nevada" },
  { zip: "70801", lat: 30.4515, lng: -91.1871, citySlug: "baton-rouge", cityName: "Baton Rouge", state: "Louisiana" },
  { zip: "92602", lat: 33.6846, lng: -117.8265, citySlug: "irvine", cityName: "Irvine", state: "California" },
  { zip: "23320", lat: 36.7682, lng: -76.2875, citySlug: "chesapeake", cityName: "Chesapeake", state: "Virginia" },
  { zip: "75014", lat: 32.814, lng: -96.9489, citySlug: "irving", cityName: "Irving", state: "Texas" },
  { zip: "89030", lat: 36.1989, lng: -115.1175, citySlug: "north-las-vegas", cityName: "North Las Vegas", state: "Nevada" },
  { zip: "85233", lat: 33.3528, lng: -111.789, citySlug: "gilbert", cityName: "Gilbert", state: "Arizona" },
  { zip: "85250", lat: 33.4942, lng: -111.9261, citySlug: "scottsdale", cityName: "Scottsdale", state: "Arizona" },
  { zip: "84101", lat: 40.7608, lng: -111.891, citySlug: "salt-lake-city", cityName: "Salt Lake City", state: "Utah" },
  { zip: "84401", lat: 41.223, lng: -111.9738, citySlug: "ogden", cityName: "Ogden", state: "Utah" },
  { zip: "84321", lat: 41.7355, lng: -111.8344, citySlug: "logan", cityName: "Logan", state: "Utah" },
  { zip: "84041", lat: 41.0602, lng: -111.9711, citySlug: "layton", cityName: "Layton", state: "Utah" },
  { zip: "84601", lat: 40.2338, lng: -111.6585, citySlug: "provo", cityName: "Provo", state: "Utah" },
  { zip: "84095", lat: 40.5622, lng: -111.9297, citySlug: "south-jordan", cityName: "South Jordan", state: "Utah" },
  { zip: "83701", lat: 43.615, lng: -116.2023, citySlug: "boise", cityName: "Boise", state: "Idaho" },
  { zip: "94536", lat: 37.5485, lng: -121.9886, citySlug: "fremont", cityName: "Fremont", state: "California" },
  { zip: "23218", lat: 37.5407, lng: -77.436, citySlug: "richmond", cityName: "Richmond", state: "Virginia" },
  { zip: "92401", lat: 34.1083, lng: -117.2898, citySlug: "san-bernardino", cityName: "San Bernardino", state: "California" },
  { zip: "35201", lat: 33.5207, lng: -86.8025, citySlug: "birmingham", cityName: "Birmingham", state: "Alabama" },
  { zip: "99201", lat: 47.6588, lng: -117.426, citySlug: "spokane", cityName: "Spokane", state: "Washington" },
  { zip: "14601", lat: 43.1566, lng: -77.6088, citySlug: "rochester", cityName: "Rochester", state: "New York" },
  { zip: "50301", lat: 41.5868, lng: -93.625, citySlug: "des-moines", cityName: "Des Moines", state: "Iowa" },
  { zip: "95350", lat: 37.6391, lng: -120.9969, citySlug: "modesto", cityName: "Modesto", state: "California" },
  { zip: "28301", lat: 35.0527, lng: -78.8784, citySlug: "fayetteville", cityName: "Fayetteville", state: "North Carolina" },
  { zip: "98401", lat: 47.2529, lng: -122.4443, citySlug: "tacoma", cityName: "Tacoma", state: "Washington" },
  { zip: "92335", lat: 34.0922, lng: -117.435, citySlug: "fontana", cityName: "Fontana", state: "California" },
  { zip: "93030", lat: 34.1975, lng: -119.1771, citySlug: "oxnard", cityName: "Oxnard", state: "California" },
  { zip: "92553", lat: 33.9425, lng: -117.2297, citySlug: "moreno-valley", cityName: "Moreno Valley", state: "California" },
  { zip: "75033", lat: 33.1507, lng: -96.8236, citySlug: "frisco", cityName: "Frisco", state: "Texas" },
  { zip: "85301", lat: 33.5387, lng: -112.186, citySlug: "glendale", cityName: "Glendale", state: "Arizona" },
  { zip: "10701", lat: 40.9312, lng: -73.8987, citySlug: "yonkers", cityName: "Yonkers", state: "New York" },
  { zip: "92646", lat: 33.6595, lng: -117.9988, citySlug: "huntington-beach", cityName: "Huntington Beach", state: "California" },
  { zip: "60502", lat: 41.7606, lng: -88.3201, citySlug: "aurora-il", cityName: "Aurora", state: "Illinois" },
  { zip: "36101", lat: 32.3668, lng: -86.2999, citySlug: "montgomery", cityName: "Montgomery", state: "Alabama" },
  { zip: "79101", lat: 35.222, lng: -101.8313, citySlug: "amarillo", cityName: "Amarillo", state: "Texas" },
  { zip: "72201", lat: 34.7465, lng: -92.2896, citySlug: "little-rock", cityName: "Little Rock", state: "Arkansas" },
  { zip: "44301", lat: 41.0814, lng: -81.519, citySlug: "akron", cityName: "Akron", state: "Ohio" },
  { zip: "31901", lat: 32.461, lng: -84.9877, citySlug: "columbus-ga", cityName: "Columbus", state: "Georgia" },
  { zip: "30901", lat: 33.4735, lng: -82.0105, citySlug: "augusta", cityName: "Augusta", state: "Georgia" },
  { zip: "49501", lat: 42.9634, lng: -85.6681, citySlug: "grand-rapids", cityName: "Grand Rapids", state: "Michigan" },
];

/** Check local list first, then fall back to Zippopotam.us API */
export async function getZipInfo(zip: string): Promise<ZipInfo | undefined> {
  const normalized = zip.replace(/\s/g, "").slice(0, 5);
  const local = ZIPS.find((z) => z.zip === normalized);
  if (local) return local;

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${normalized}`, {
      next: { revalidate: 86400 }, // cache for 24h
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    const place = data.places?.[0];
    if (!place) return undefined;
    const cityName: string = place["place name"];
    const state: string = place.state;
    const lat = parseFloat(place.latitude);
    const lng = parseFloat(place.longitude);
    const citySlug = cityName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { zip: normalized, lat, lng, citySlug, cityName, state };
  } catch {
    return undefined;
  }
}
