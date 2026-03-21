export interface ReviewSource {
  platform: "google" | "yelp" | "facebook" | "booksy" | "squire";
  rating: number;
  reviewCount: number;
}

export interface Barber {
  id: string;
  name: string;
  slug: string;
  city: string;
  citySlug: string;
  state: string;
  shopName: string;
  shopSlug: string;
  fadeScore: number;
  reviewCount: number;
  avgPrice: number;
  specialties: string[];
  hairTypes?: HairType[];
  cutTypes?: CutType[];
  isHiddenGem?: boolean;
  isCheap?: boolean;
  /** Real barber data fields (optional, only for curated entries) */
  address?: string;
  phone?: string;
  instagram?: string;
  website?: string;
  reviews?: ReviewSource[];
  barbers?: { name: string; slug?: string; rating: number; reviewCount: number }[];
  latitude?: number;
  longitude?: number;
}

export interface Shop {
  id: string;
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  state: string;
  address?: string;
  phone?: string;
  instagram?: string;
  website?: string;
  reviews?: ReviewSource[];
  avgPrice: number;
  fadeScore: number;
  barberCount: number;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  stateAbbr?: string;
  latitude?: number;
  longitude?: number;
}

export type HairType = "textured-coily" | "straight" | "wavy" | "all";

export type CutType =
  | "skin-fade"
  | "taper-fade"
  | "lineup"
  | "beard"
  | "designs"
  | "locs"
  | "braids"
  | "razor-fade"
  | "classic-cut"
  | "straight-razor"
  | "styling"
  | "colors"
  | "precision-cut";

export type PageVariant = "best" | "best-fade" | "cheap";

/** Barber intake form submission (for email follow-up and data updates). */
export interface BarberIntakeSubmission {
  id: string;
  submittedAt: string; // ISO
  email: string;
  /** If they selected an existing barber from the list */
  barberSlug?: string;
  barberName?: string;
  shopName?: string;
  city?: string;
  state?: string;
  /** If not listed: free-form details */
  notListed?: boolean;
  customName?: string;
  customShopName?: string;
  customCity?: string;
  customState?: string;
  hairTypes: HairType[];
  cutTypes: CutType[];
  notes?: string;
}
