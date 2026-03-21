import type { Barber, Shop, ReviewSource } from "@/types";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Barber data access layer — queries Supabase.
 * Return types match the existing Barber/Shop interfaces.
 */

function getSupabase() {
  return createSupabaseAdmin();
}

// ── Mappers ────────────────────────────────────────────────────────

interface BarberRow {
  id: string;
  slug: string;
  name: string;
  fade_score: number;
  review_count: number;
  avg_price: number;
  specialties: string[];
  hair_types: string[];
  cut_types: string[];
  is_hidden_gem: boolean;
  is_cheap: boolean;
  shops: {
    slug: string;
    name: string;
    address: string | null;
    phone: string | null;
    instagram: string | null;
    website: string | null;
    booking_url: string | null;
    latitude: number | null;
    longitude: number | null;
    cities: {
      slug: string;
      name: string;
      state: string;
    };
    review_sources: {
      platform: string;
      rating: number;
      review_count: number;
    }[];
  };
}

function mapBarberRow(row: BarberRow): Barber {
  const shop = row.shops;
  const city = shop.cities;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    city: city.name,
    citySlug: city.slug,
    state: city.state,
    shopName: shop.name,
    shopSlug: shop.slug,
    fadeScore: Number(row.fade_score),
    reviewCount: row.review_count,
    avgPrice: row.avg_price,
    specialties: row.specialties ?? [],
    hairTypes: (row.hair_types ?? []) as Barber["hairTypes"],
    cutTypes: (row.cut_types ?? []) as Barber["cutTypes"],
    isHiddenGem: row.is_hidden_gem,
    isCheap: row.is_cheap,
    address: shop.address ?? undefined,
    phone: shop.phone ?? undefined,
    instagram: shop.instagram ?? undefined,
    website: shop.website ?? undefined,
    reviews: (shop.review_sources ?? []).map((r) => ({
      platform: r.platform as ReviewSource["platform"],
      rating: Number(r.rating),
      reviewCount: r.review_count,
    })),
    latitude: shop.latitude ?? undefined,
    longitude: shop.longitude ?? undefined,
  };
}

const BARBER_SELECT = `
  id, slug, name, fade_score, review_count, avg_price,
  specialties, hair_types, cut_types, is_hidden_gem, is_cheap,
  shops!inner (
    slug, name, address, phone, instagram, website, booking_url, latitude, longitude,
    cities!inner ( slug, name, state ),
    review_sources ( platform, rating, review_count )
  )
`;

// ── Queries ────────────────────────────────────────────────────────

export async function getBarbersByCity(citySlug: string): Promise<Barber[]> {
  const { data, error } = await getSupabase()
    .from("barbers")
    .select(BARBER_SELECT)
    .eq("shops.cities.slug", citySlug)
    .order("fade_score", { ascending: false });

  if (error) {
    console.error("getBarbersByCity error:", error);
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => mapBarberRow(row));
}

export async function getAllBarbers(): Promise<Barber[]> {
  const { data, error } = await getSupabase()
    .from("barbers")
    .select(BARBER_SELECT)
    .order("name");

  if (error) {
    console.error("getAllBarbers error:", error);
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const barbers = (data ?? []).map((row: any) => mapBarberRow(row));
  return barbers.sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
}

export async function getBarberBySlug(slug: string): Promise<Barber | null> {
  const { data, error } = await getSupabase()
    .from("barbers")
    .select(BARBER_SELECT)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const barber = mapBarberRow(data as any);

  // Also load team/barbers at same shop
  const { data: teamData } = await getSupabase()
    .from("barbers")
    .select("name, slug, fade_score, review_count")
    .eq("shop_id", (data as Record<string, unknown>).shop_id as string);

  if (teamData && teamData.length > 0) {
    barber.barbers = teamData.map((b) => ({
      name: b.name,
      slug: b.slug,
      rating: Number(b.fade_score),
      reviewCount: b.review_count,
    }));
  }

  return barber;
}

export async function getAllBarbersForHiddenGems(): Promise<Barber[]> {
  const { data, error } = await getSupabase()
    .from("barbers")
    .select(BARBER_SELECT)
    .eq("is_hidden_gem", true)
    .order("fade_score", { ascending: false })
    .limit(50);

  if (error) {
    console.error("getAllBarbersForHiddenGems error:", error.message, error.code, error.details, error.hint);
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => mapBarberRow(row));
}

export async function getShopsForCity(citySlug: string): Promise<Shop[]> {
  const { data: cityData } = await getSupabase()
    .from("cities")
    .select("id")
    .eq("slug", citySlug)
    .single();

  if (!cityData) return [];

  const { data, error } = await getSupabase()
    .from("shops")
    .select(`
      id, slug, name, address, phone, instagram, website,
      avg_price, fade_score, booking_url, claimed_by,
      cities!inner ( slug, name, state ),
      review_sources ( platform, rating, review_count ),
      barbers ( id )
    `)
    .eq("city_id", cityData.id)
    .order("fade_score", { ascending: false });

  if (error) {
    console.error("getShopsForCity error:", error);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    city: row.cities.name,
    citySlug: row.cities.slug,
    state: row.cities.state,
    address: row.address ?? undefined,
    phone: row.phone ?? undefined,
    instagram: row.instagram ?? undefined,
    website: row.website ?? undefined,
    reviews: (row.review_sources ?? []).map((r: { platform: string; rating: number; review_count: number }) => ({
      platform: r.platform as ReviewSource["platform"],
      rating: Number(r.rating),
      reviewCount: r.review_count,
    })),
    avgPrice: row.avg_price,
    fadeScore: Number(row.fade_score),
    barberCount: (row.barbers ?? []).length,
    bookingUrl: row.booking_url ?? undefined,
    claimedBy: row.claimed_by ?? undefined,
  }));
}

export async function getShopBySlug(slug: string): Promise<(Shop & { bookingUrl?: string; claimedBy?: string }) | null> {
  const { data, error } = await getSupabase()
    .from("shops")
    .select(`
      id, slug, name, address, phone, instagram, website,
      avg_price, fade_score, booking_url, claimed_by,
      cities!inner ( slug, name, state ),
      review_sources ( platform, rating, review_count ),
      barbers ( id )
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    city: row.cities.name,
    citySlug: row.cities.slug,
    state: row.cities.state,
    address: row.address ?? undefined,
    phone: row.phone ?? undefined,
    instagram: row.instagram ?? undefined,
    website: row.website ?? undefined,
    reviews: (row.review_sources ?? []).map((r: { platform: string; rating: number; review_count: number }) => ({
      platform: r.platform as ReviewSource["platform"],
      rating: Number(r.rating),
      reviewCount: r.review_count,
    })),
    avgPrice: row.avg_price,
    fadeScore: Number(row.fade_score),
    barberCount: (row.barbers ?? []).length,
    bookingUrl: row.booking_url ?? undefined,
    claimedBy: row.claimed_by ?? undefined,
  };
}

export async function getBarbersByShop(shopSlug: string): Promise<Barber[]> {
  const { data, error } = await getSupabase()
    .from("barbers")
    .select(BARBER_SELECT)
    .eq("shops.slug", shopSlug)
    .order("fade_score", { ascending: false });

  if (error) {
    console.error("getBarbersByShop error:", error);
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => mapBarberRow(row));
}

/** Get all shops (for intake autocomplete). */
export async function getAllShops(): Promise<{ slug: string; name: string; city: string; state: string }[]> {
  const { data, error } = await getSupabase()
    .from("shops")
    .select("slug, name, cities!inner ( name, state )")
    .order("name");

  if (error) {
    console.error("getAllShops error:", error);
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => ({
    slug: row.slug,
    name: row.name,
    city: row.cities.name,
    state: row.cities.state,
  }));
}

/** Get all barber slugs (for sitemap generation). */
export async function getAllBarberSlugs(): Promise<string[]> {
  const { data } = await getSupabase().from("barbers").select("slug");
  return (data ?? []).map((r) => r.slug);
}

/** Get all shop slugs (for sitemap generation). */
export async function getAllShopSlugs(): Promise<string[]> {
  const { data } = await getSupabase().from("shops").select("slug");
  return (data ?? []).map((r) => r.slug);
}
