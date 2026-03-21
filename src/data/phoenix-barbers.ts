import type { Barber } from "@/types";

/**
 * Curated barber data for Phoenix, AZ.
 * Reviews aggregated from Google, Yelp, Squire, and Booksy.
 * Last updated: March 2026
 */

// ─── PHOENIX, AZ ─────────────────────────────────────────────────────

// ── 1. Pikasso Barber Shop ───────────────────────────────────────────
const PIKASSO_SHARED = {
  shopName: "Pikasso Barber Shop",
  shopSlug: "pikasso-barber-shop-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "914 E Camelback Rd, Ste 8, Phoenix, AZ 85014",
  phone: "(602) 265-1556",
  instagram: "@pikassobarbershop",
  website: "https://pikassobarbershop.com",
  avgPrice: 37,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 450 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 132 },
  ],
  barbers: [
    { name: "Shane Pikasso", slug: "shane-pikasso-pikasso-barber-shop-phoenix", rating: 4.9, reviewCount: 250 },
    { name: "Habi", slug: "habi-pikasso-barber-shop-phoenix", rating: 4.7, reviewCount: 200 },
  ],
};

const PIKASSO_BARBERS: Barber[] = [
  {
    id: "real-phx-pikasso-shane",
    name: "Shane Pikasso",
    slug: "shane-pikasso-pikasso-barber-shop-phoenix",
    fadeScore: 4.9,
    reviewCount: 250,
    specialties: ["Fades", "Razor Fade", "Designs"],
    ...PIKASSO_SHARED,
  },
  {
    id: "real-phx-pikasso-habi",
    name: "Habi",
    slug: "habi-pikasso-barber-shop-phoenix",
    fadeScore: 4.7,
    reviewCount: 200,
    specialties: ["Fades", "Beard"],
    ...PIKASSO_SHARED,
  },
];

// ── 2. Uptown Barbershop Original ────────────────────────────────────
const UPTOWN_SHARED = {
  shopName: "Uptown Barbershop Original",
  shopSlug: "uptown-barbershop-original-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "5808 N 16th St, Phoenix, AZ 85016",
  phone: "(602) 230-2406",
  instagram: "@uptown_barbershop_az",
  website: "https://uptownbarbershops.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.6, reviewCount: 500 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 484 },
    { platform: "squire" as const, rating: 4.8, reviewCount: 100 },
  ],
  barbers: [
    { name: "Boris Fuzailov", slug: "boris-fuzailov-uptown-barbershop-original-phoenix", rating: 4.8, reviewCount: 300 },
    { name: "Willie Smith", slug: "willie-smith-uptown-barbershop-original-phoenix", rating: 4.7, reviewCount: 250 },
  ],
};

const UPTOWN_BARBERS: Barber[] = [
  {
    id: "real-phx-uptown-boris",
    name: "Boris Fuzailov",
    slug: "boris-fuzailov-uptown-barbershop-original-phoenix",
    fadeScore: 4.8,
    reviewCount: 300,
    specialties: ["Fades", "Classic Cuts", "Beard"],
    ...UPTOWN_SHARED,
  },
  {
    id: "real-phx-uptown-willie",
    name: "Willie Smith",
    slug: "willie-smith-uptown-barbershop-original-phoenix",
    fadeScore: 4.7,
    reviewCount: 250,
    specialties: ["Fades", "Tapers"],
    ...UPTOWN_SHARED,
  },
];

// ── 3. Roosevelt Barber Shop ─────────────────────────────────────────
const ROOSEVELT_SHARED = {
  shopName: "Roosevelt Barber Shop",
  shopSlug: "roosevelt-barber-shop-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "610 E Roosevelt St, Unit 152, Phoenix, AZ 85004",
  phone: "(602) 441-1717",
  instagram: "@rooseveltbarbershop",
  website: "https://rooseveltbarbershop.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.6, reviewCount: 337 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 145 },
  ],
  barbers: [
    { name: "Juan C.", slug: "juan-c-roosevelt-barber-shop-phoenix", rating: 4.8, reviewCount: 80 },
    { name: "Emilio", slug: "emilio-roosevelt-barber-shop-phoenix", rating: 4.7, reviewCount: 70 },
    { name: "Jen", slug: "jen-roosevelt-barber-shop-phoenix", rating: 4.7, reviewCount: 65 },
    { name: "Albert", slug: "albert-roosevelt-barber-shop-phoenix", rating: 4.7, reviewCount: 60 },
    { name: "Miguel", slug: "miguel-roosevelt-barber-shop-phoenix", rating: 4.6, reviewCount: 55 },
    { name: "Gil", slug: "gil-roosevelt-barber-shop-phoenix", rating: 4.6, reviewCount: 50 },
    { name: "Fernando", slug: "fernando-roosevelt-barber-shop-phoenix", rating: 4.6, reviewCount: 45 },
    { name: "Luis", slug: "luis-roosevelt-barber-shop-phoenix", rating: 4.5, reviewCount: 40 },
  ],
};

const ROOSEVELT_BARBERS: Barber[] = [
  {
    id: "real-phx-roosevelt-juan",
    name: "Juan C.",
    slug: "juan-c-roosevelt-barber-shop-phoenix",
    fadeScore: 4.8,
    reviewCount: 80,
    specialties: ["Fades", "Line Up", "Beard"],
    ...ROOSEVELT_SHARED,
  },
  {
    id: "real-phx-roosevelt-emilio",
    name: "Emilio",
    slug: "emilio-roosevelt-barber-shop-phoenix",
    fadeScore: 4.7,
    reviewCount: 70,
    specialties: ["Fades", "Tapers"],
    ...ROOSEVELT_SHARED,
  },
  {
    id: "real-phx-roosevelt-jen",
    name: "Jen",
    slug: "jen-roosevelt-barber-shop-phoenix",
    fadeScore: 4.7,
    reviewCount: 65,
    specialties: ["Fades", "Razor Fade"],
    ...ROOSEVELT_SHARED,
  },
  {
    id: "real-phx-roosevelt-albert",
    name: "Albert",
    slug: "albert-roosevelt-barber-shop-phoenix",
    fadeScore: 4.7,
    reviewCount: 60,
    specialties: ["Fades", "Beard"],
    ...ROOSEVELT_SHARED,
  },
  {
    id: "real-phx-roosevelt-miguel",
    name: "Miguel",
    slug: "miguel-roosevelt-barber-shop-phoenix",
    fadeScore: 4.6,
    reviewCount: 55,
    specialties: ["Fades", "Classic Cuts"],
    ...ROOSEVELT_SHARED,
  },
  {
    id: "real-phx-roosevelt-gil",
    name: "Gil",
    slug: "gil-roosevelt-barber-shop-phoenix",
    fadeScore: 4.6,
    reviewCount: 50,
    specialties: ["Fades", "Line Up"],
    ...ROOSEVELT_SHARED,
  },
  {
    id: "real-phx-roosevelt-fernando",
    name: "Fernando",
    slug: "fernando-roosevelt-barber-shop-phoenix",
    fadeScore: 4.6,
    reviewCount: 45,
    specialties: ["Fades", "Designs"],
    ...ROOSEVELT_SHARED,
  },
  {
    id: "real-phx-roosevelt-luis",
    name: "Luis",
    slug: "luis-roosevelt-barber-shop-phoenix",
    fadeScore: 4.5,
    reviewCount: 40,
    specialties: ["Fades", "Beard"],
    ...ROOSEVELT_SHARED,
  },
];

// ── 4. Ace of Fades Executive ────────────────────────────────────────
const ACE_OF_FADES_SHARED = {
  shopName: "Ace of Fades Executive",
  shopSlug: "ace-of-fades-executive-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "3201 N 16th St, Ste 3, Phoenix, AZ 85016",
  phone: "(602) 264-4634",
  instagram: "@aceoffades_az",
  website: "https://aceoffadesaz.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 200 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 82 },
    { platform: "booksy" as const, rating: 4.9, reviewCount: 50 },
  ],
  barbers: [
    { name: "Naimah", slug: "naimah-ace-of-fades-executive-phoenix", rating: 4.9, reviewCount: 55 },
    { name: "Mario", slug: "mario-ace-of-fades-executive-phoenix", rating: 4.8, reviewCount: 50 },
    { name: "Jackie", slug: "jackie-ace-of-fades-executive-phoenix", rating: 4.8, reviewCount: 45 },
    { name: "Christopher", slug: "christopher-ace-of-fades-executive-phoenix", rating: 4.8, reviewCount: 40 },
    { name: "Cesar", slug: "cesar-ace-of-fades-executive-phoenix", rating: 4.7, reviewCount: 35 },
    { name: "Amari", slug: "amari-ace-of-fades-executive-phoenix", rating: 4.7, reviewCount: 30 },
    { name: "Dekkar", slug: "dekkar-ace-of-fades-executive-phoenix", rating: 4.7, reviewCount: 28 },
    { name: "Daniel", slug: "daniel-ace-of-fades-executive-phoenix", rating: 4.6, reviewCount: 25 },
    { name: "Marisa", slug: "marisa-ace-of-fades-executive-phoenix", rating: 4.6, reviewCount: 22 },
  ],
};

const ACE_OF_FADES_BARBERS: Barber[] = [
  {
    id: "real-phx-ace-naimah",
    name: "Naimah",
    slug: "naimah-ace-of-fades-executive-phoenix",
    fadeScore: 4.9,
    reviewCount: 55,
    specialties: ["Fades", "Beard", "Line Up"],
    ...ACE_OF_FADES_SHARED,
  },
  {
    id: "real-phx-ace-mario",
    name: "Mario",
    slug: "mario-ace-of-fades-executive-phoenix",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Tapers"],
    ...ACE_OF_FADES_SHARED,
  },
  {
    id: "real-phx-ace-jackie",
    name: "Jackie",
    slug: "jackie-ace-of-fades-executive-phoenix",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Razor Fade"],
    ...ACE_OF_FADES_SHARED,
  },
  {
    id: "real-phx-ace-christopher",
    name: "Christopher",
    slug: "christopher-ace-of-fades-executive-phoenix",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Classic Cuts"],
    ...ACE_OF_FADES_SHARED,
  },
  {
    id: "real-phx-ace-cesar",
    name: "Cesar",
    slug: "cesar-ace-of-fades-executive-phoenix",
    fadeScore: 4.7,
    reviewCount: 35,
    specialties: ["Fades", "Designs"],
    ...ACE_OF_FADES_SHARED,
  },
  {
    id: "real-phx-ace-amari",
    name: "Amari",
    slug: "amari-ace-of-fades-executive-phoenix",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Line Up"],
    ...ACE_OF_FADES_SHARED,
  },
  {
    id: "real-phx-ace-dekkar",
    name: "Dekkar",
    slug: "dekkar-ace-of-fades-executive-phoenix",
    fadeScore: 4.7,
    reviewCount: 28,
    specialties: ["Fades", "Beard"],
    ...ACE_OF_FADES_SHARED,
  },
  {
    id: "real-phx-ace-daniel",
    name: "Daniel",
    slug: "daniel-ace-of-fades-executive-phoenix",
    fadeScore: 4.6,
    reviewCount: 25,
    specialties: ["Fades", "Tapers"],
    ...ACE_OF_FADES_SHARED,
  },
  {
    id: "real-phx-ace-marisa",
    name: "Marisa",
    slug: "marisa-ace-of-fades-executive-phoenix",
    fadeScore: 4.6,
    reviewCount: 22,
    specialties: ["Fades", "Styling"],
    ...ACE_OF_FADES_SHARED,
  },
];

// ── 5. The Greater Good PHX ──────────────────────────────────────────
const GREATER_GOOD_SHARED = {
  shopName: "The Greater Good PHX",
  shopSlug: "the-greater-good-phx-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "818 N Central Ave, Phoenix, AZ 85004",
  phone: "(602) 612-3187",
  instagram: "@thegreatergoodphx",
  website: "https://thegreatergoodphx.com",
  avgPrice: 55,
  reviews: [
    { platform: "squire" as const, rating: 5.0, reviewCount: 273 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 28 },
  ],
  barbers: [
    { name: "Jessie Ponce", slug: "jessie-ponce-the-greater-good-phx-phoenix", rating: 5.0, reviewCount: 80 },
    { name: "Jody S.", slug: "jody-s-the-greater-good-phx-phoenix", rating: 4.9, reviewCount: 55 },
    { name: "Diego M.", slug: "diego-m-the-greater-good-phx-phoenix", rating: 4.8, reviewCount: 45 },
    { name: "Raul", slug: "raul-the-greater-good-phx-phoenix", rating: 4.8, reviewCount: 40 },
    { name: "Johnny", slug: "johnny-the-greater-good-phx-phoenix", rating: 4.7, reviewCount: 30 },
    { name: "Nevin", slug: "nevin-the-greater-good-phx-phoenix", rating: 4.7, reviewCount: 25 },
  ],
};

const GREATER_GOOD_BARBERS: Barber[] = [
  {
    id: "real-phx-greatergood-jessie",
    name: "Jessie Ponce",
    slug: "jessie-ponce-the-greater-good-phx-phoenix",
    fadeScore: 5.0,
    reviewCount: 80,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...GREATER_GOOD_SHARED,
  },
  {
    id: "real-phx-greatergood-jody",
    name: "Jody S.",
    slug: "jody-s-the-greater-good-phx-phoenix",
    fadeScore: 4.9,
    reviewCount: 55,
    specialties: ["Fades", "Tapers"],
    ...GREATER_GOOD_SHARED,
  },
  {
    id: "real-phx-greatergood-diego",
    name: "Diego M.",
    slug: "diego-m-the-greater-good-phx-phoenix",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Line Up"],
    ...GREATER_GOOD_SHARED,
  },
  {
    id: "real-phx-greatergood-raul",
    name: "Raul",
    slug: "raul-the-greater-good-phx-phoenix",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Classic Cuts"],
    ...GREATER_GOOD_SHARED,
  },
  {
    id: "real-phx-greatergood-johnny",
    name: "Johnny",
    slug: "johnny-the-greater-good-phx-phoenix",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Beard"],
    ...GREATER_GOOD_SHARED,
  },
  {
    id: "real-phx-greatergood-nevin",
    name: "Nevin",
    slug: "nevin-the-greater-good-phx-phoenix",
    fadeScore: 4.7,
    reviewCount: 25,
    specialties: ["Fades", "Styling"],
    ...GREATER_GOOD_SHARED,
  },
];

// ── 6. Classic Barbershop ────────────────────────────────────────────
const CLASSIC_SHARED = {
  shopName: "Classic Barbershop",
  shopSlug: "classic-barbershop-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "12609 N Tatum Blvd, Phoenix, AZ 85032",
  phone: "(602) 787-4119",
  instagram: "@classicbarbershopaz",
  website: "https://classicbarbershopaz.com",
  avgPrice: 30,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 500 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 154 },
  ],
  barbers: [
    { name: "Lydia", slug: "lydia-classic-barbershop-phoenix", rating: 4.8, reviewCount: 180 },
    { name: "Tony", slug: "tony-classic-barbershop-phoenix", rating: 4.7, reviewCount: 160 },
    { name: "Marcus", slug: "marcus-classic-barbershop-phoenix", rating: 4.7, reviewCount: 140 },
    { name: "Steve", slug: "steve-classic-barbershop-phoenix", rating: 4.6, reviewCount: 120 },
  ],
};

const CLASSIC_BARBERS: Barber[] = [
  {
    id: "real-phx-classic-lydia",
    name: "Lydia",
    slug: "lydia-classic-barbershop-phoenix",
    fadeScore: 4.8,
    reviewCount: 180,
    specialties: ["Fades", "Classic Cuts", "Line Up"],
    isCheap: true,
    ...CLASSIC_SHARED,
  },
  {
    id: "real-phx-classic-tony",
    name: "Tony",
    slug: "tony-classic-barbershop-phoenix",
    fadeScore: 4.7,
    reviewCount: 160,
    specialties: ["Fades", "Beard"],
    isCheap: true,
    ...CLASSIC_SHARED,
  },
  {
    id: "real-phx-classic-marcus",
    name: "Marcus",
    slug: "marcus-classic-barbershop-phoenix",
    fadeScore: 4.7,
    reviewCount: 140,
    specialties: ["Fades", "Tapers"],
    isCheap: true,
    ...CLASSIC_SHARED,
  },
  {
    id: "real-phx-classic-steve",
    name: "Steve",
    slug: "steve-classic-barbershop-phoenix",
    fadeScore: 4.6,
    reviewCount: 120,
    specialties: ["Fades", "Razor Fade"],
    isCheap: true,
    ...CLASSIC_SHARED,
  },
];

// ── 7. Blades of Gold ────────────────────────────────────────────────
const BLADES_OF_GOLD_SHARED = {
  shopName: "Blades of Gold",
  shopSlug: "blades-of-gold-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "7000 N 16th St, Ste 160, Phoenix, AZ 85020",
  phone: "(602) 600-0424",
  instagram: "@bladesofgold2023",
  website: "https://bladesofgoldaz.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 351 },
  ],
  barbers: [
    { name: "Mike", slug: "mike-blades-of-gold-phoenix", rating: 4.9, reviewCount: 130 },
    { name: "Eddie", slug: "eddie-blades-of-gold-phoenix", rating: 4.9, reviewCount: 120 },
    { name: "Jack", slug: "jack-blades-of-gold-phoenix", rating: 4.8, reviewCount: 100 },
  ],
};

const BLADES_OF_GOLD_BARBERS: Barber[] = [
  {
    id: "real-phx-bog-mike",
    name: "Mike",
    slug: "mike-blades-of-gold-phoenix",
    fadeScore: 4.9,
    reviewCount: 130,
    specialties: ["Fades", "Beard", "Razor Fade"],
    ...BLADES_OF_GOLD_SHARED,
  },
  {
    id: "real-phx-bog-eddie",
    name: "Eddie",
    slug: "eddie-blades-of-gold-phoenix",
    fadeScore: 4.9,
    reviewCount: 120,
    specialties: ["Fades", "Line Up"],
    ...BLADES_OF_GOLD_SHARED,
  },
  {
    id: "real-phx-bog-jack",
    name: "Jack",
    slug: "jack-blades-of-gold-phoenix",
    fadeScore: 4.8,
    reviewCount: 100,
    specialties: ["Fades", "Tapers"],
    ...BLADES_OF_GOLD_SHARED,
  },
];

// ── 8. Pop's Barbershop ──────────────────────────────────────────────
const POPS_SHARED = {
  shopName: "Pop's Barbershop",
  shopSlug: "pops-barbershop-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "9614 N 7th St, Phoenix, AZ 85020",
  phone: "(602) 944-2272",
  instagram: "@pops.barbershop",
  website: "https://popsbarber.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 200 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 31 },
  ],
  barbers: [
    { name: "Yuri", slug: "yuri-pops-barbershop-phoenix", rating: 4.8, reviewCount: 80 },
    { name: "Ricardo", slug: "ricardo-pops-barbershop-phoenix", rating: 4.8, reviewCount: 70 },
    { name: "Shizzle", slug: "shizzle-pops-barbershop-phoenix", rating: 4.7, reviewCount: 50 },
  ],
};

const POPS_BARBERS: Barber[] = [
  {
    id: "real-phx-pops-yuri",
    name: "Yuri",
    slug: "yuri-pops-barbershop-phoenix",
    fadeScore: 4.8,
    reviewCount: 80,
    specialties: ["Fades", "Classic Cuts"],
    ...POPS_SHARED,
  },
  {
    id: "real-phx-pops-ricardo",
    name: "Ricardo",
    slug: "ricardo-pops-barbershop-phoenix",
    fadeScore: 4.8,
    reviewCount: 70,
    specialties: ["Fades", "Beard"],
    ...POPS_SHARED,
  },
  {
    id: "real-phx-pops-shizzle",
    name: "Shizzle",
    slug: "shizzle-pops-barbershop-phoenix",
    fadeScore: 4.7,
    reviewCount: 50,
    specialties: ["Fades", "Tapers", "Line Up"],
    ...POPS_SHARED,
  },
];

// ── 9. Top Tier Barbershop ───────────────────────────────────────────
const TOP_TIER_SHARED = {
  shopName: "Top Tier Barbershop",
  shopSlug: "top-tier-barbershop-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "3031 E Indian School Rd, Ste 7, Phoenix, AZ 85016",
  phone: "(602) 281-6118",
  instagram: "@toptierbarbershop_az",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 174 },
    { platform: "booksy" as const, rating: 5.0, reviewCount: 73 },
  ],
  barbers: [
    { name: "Omar", slug: "omar-top-tier-barbershop-phoenix", rating: 4.9, reviewCount: 90 },
    { name: "Casey", slug: "casey-top-tier-barbershop-phoenix", rating: 4.8, reviewCount: 80 },
    { name: "Alina", slug: "alina-top-tier-barbershop-phoenix", rating: 4.8, reviewCount: 75 },
  ],
};

const TOP_TIER_BARBERS: Barber[] = [
  {
    id: "real-phx-toptier-omar",
    name: "Omar",
    slug: "omar-top-tier-barbershop-phoenix",
    fadeScore: 4.9,
    reviewCount: 90,
    specialties: ["Fades", "Razor Fade", "Designs"],
    ...TOP_TIER_SHARED,
  },
  {
    id: "real-phx-toptier-casey",
    name: "Casey",
    slug: "casey-top-tier-barbershop-phoenix",
    fadeScore: 4.8,
    reviewCount: 80,
    specialties: ["Fades", "Beard"],
    ...TOP_TIER_SHARED,
  },
  {
    id: "real-phx-toptier-alina",
    name: "Alina",
    slug: "alina-top-tier-barbershop-phoenix",
    fadeScore: 4.8,
    reviewCount: 75,
    specialties: ["Fades", "Styling", "Line Up"],
    ...TOP_TIER_SHARED,
  },
];

// ── 10. The Local Barber & Shop ──────────────────────────────────────
const LOCAL_BARBER_SHARED = {
  shopName: "The Local Barber & Shop",
  shopSlug: "the-local-barber-and-shop-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "5813 N 7th St, Ste 101, Phoenix, AZ 85014",
  phone: "(602) 710-1749",
  instagram: "@thelocalbarberdowntown",
  website: "https://thelocalbarberandshop.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 679 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 169 },
  ],
  barbers: [
    { name: "Matt", slug: "matt-the-local-barber-and-shop-phoenix", rating: 4.9, reviewCount: 80 },
    { name: "Rob", slug: "rob-the-local-barber-and-shop-phoenix", rating: 4.9, reviewCount: 75 },
    { name: "Eric", slug: "eric-the-local-barber-and-shop-phoenix", rating: 4.8, reviewCount: 70 },
    { name: "Mo", slug: "mo-the-local-barber-and-shop-phoenix", rating: 4.8, reviewCount: 65 },
    { name: "Noah", slug: "noah-the-local-barber-and-shop-phoenix", rating: 4.8, reviewCount: 60 },
    { name: "David", slug: "david-the-local-barber-and-shop-phoenix", rating: 4.7, reviewCount: 55 },
    { name: "Liv", slug: "liv-the-local-barber-and-shop-phoenix", rating: 4.7, reviewCount: 50 },
    { name: "Scotty", slug: "scotty-the-local-barber-and-shop-phoenix", rating: 4.7, reviewCount: 48 },
    { name: "Zakk", slug: "zakk-the-local-barber-and-shop-phoenix", rating: 4.6, reviewCount: 42 },
    { name: "Jolie", slug: "jolie-the-local-barber-and-shop-phoenix", rating: 4.6, reviewCount: 40 },
    { name: "Grace", slug: "grace-the-local-barber-and-shop-phoenix", rating: 4.6, reviewCount: 35 },
  ],
};

const LOCAL_BARBER_BARBERS: Barber[] = [
  {
    id: "real-phx-local-matt",
    name: "Matt",
    slug: "matt-the-local-barber-and-shop-phoenix",
    fadeScore: 4.9,
    reviewCount: 80,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-rob",
    name: "Rob",
    slug: "rob-the-local-barber-and-shop-phoenix",
    fadeScore: 4.9,
    reviewCount: 75,
    specialties: ["Fades", "Classic Cuts"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-eric",
    name: "Eric",
    slug: "eric-the-local-barber-and-shop-phoenix",
    fadeScore: 4.8,
    reviewCount: 70,
    specialties: ["Fades", "Tapers"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-mo",
    name: "Mo",
    slug: "mo-the-local-barber-and-shop-phoenix",
    fadeScore: 4.8,
    reviewCount: 65,
    specialties: ["Fades", "Line Up"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-noah",
    name: "Noah",
    slug: "noah-the-local-barber-and-shop-phoenix",
    fadeScore: 4.8,
    reviewCount: 60,
    specialties: ["Fades", "Beard"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-david",
    name: "David",
    slug: "david-the-local-barber-and-shop-phoenix",
    fadeScore: 4.7,
    reviewCount: 55,
    specialties: ["Fades", "Designs"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-liv",
    name: "Liv",
    slug: "liv-the-local-barber-and-shop-phoenix",
    fadeScore: 4.7,
    reviewCount: 50,
    specialties: ["Fades", "Styling"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-scotty",
    name: "Scotty",
    slug: "scotty-the-local-barber-and-shop-phoenix",
    fadeScore: 4.7,
    reviewCount: 48,
    specialties: ["Fades", "Razor Fade"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-zakk",
    name: "Zakk",
    slug: "zakk-the-local-barber-and-shop-phoenix",
    fadeScore: 4.6,
    reviewCount: 42,
    specialties: ["Fades", "Tapers"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-jolie",
    name: "Jolie",
    slug: "jolie-the-local-barber-and-shop-phoenix",
    fadeScore: 4.6,
    reviewCount: 40,
    specialties: ["Fades", "Classic Cuts"],
    ...LOCAL_BARBER_SHARED,
  },
  {
    id: "real-phx-local-grace",
    name: "Grace",
    slug: "grace-the-local-barber-and-shop-phoenix",
    fadeScore: 4.6,
    reviewCount: 35,
    specialties: ["Fades", "Line Up"],
    ...LOCAL_BARBER_SHARED,
  },
];

// ── 11. Classic Man Barbershop ───────────────────────────────────────
const CLASSIC_MAN_SHARED = {
  shopName: "Classic Man Barbershop",
  shopSlug: "classic-man-barbershop-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "3114 E Shea Blvd, Phoenix, AZ 85028",
  phone: "(602) 992-8980",
  website: "https://classicmanphx.com",
  avgPrice: 30,
  reviews: [
    { platform: "google" as const, rating: 4.7, reviewCount: 200 },
    { platform: "yelp" as const, rating: 4.6, reviewCount: 66 },
  ],
  barbers: [
    { name: "Paul", slug: "paul-classic-man-barbershop-phoenix", rating: 4.8, reviewCount: 140 },
    { name: "Max", slug: "max-classic-man-barbershop-phoenix", rating: 4.7, reviewCount: 120 },
  ],
};

const CLASSIC_MAN_BARBERS: Barber[] = [
  {
    id: "real-phx-classicman-paul",
    name: "Paul",
    slug: "paul-classic-man-barbershop-phoenix",
    fadeScore: 4.8,
    reviewCount: 140,
    specialties: ["Fades", "Classic Cuts", "Beard"],
    isCheap: true,
    ...CLASSIC_MAN_SHARED,
  },
  {
    id: "real-phx-classicman-max",
    name: "Max",
    slug: "max-classic-man-barbershop-phoenix",
    fadeScore: 4.7,
    reviewCount: 120,
    specialties: ["Fades", "Tapers"],
    isCheap: true,
    ...CLASSIC_MAN_SHARED,
  },
];

// ── 12. True Fades Barbershop ────────────────────────────────────────
const TRUE_FADES_SHARED = {
  shopName: "True Fades Barbershop",
  shopSlug: "true-fades-barbershop-phoenix",
  city: "Phoenix",
  citySlug: "phoenix",
  state: "Arizona",
  address: "7448 W Glendale Ave, Ste 107, Glendale, AZ 85303",
  phone: "(623) 213-8865",
  instagram: "@truefades",
  website: "https://truefadesbarbershop.com",
  avgPrice: 35,
  reviews: [
    { platform: "squire" as const, rating: 5.0, reviewCount: 1477 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 34 },
  ],
  barbers: [
    { name: "Tootie", slug: "tootie-true-fades-barbershop-phoenix", rating: 4.9, reviewCount: 300 },
    { name: "Christian N.", slug: "christian-n-true-fades-barbershop-phoenix", rating: 4.9, reviewCount: 280 },
    { name: "Jovany C.", slug: "jovany-c-true-fades-barbershop-phoenix", rating: 4.8, reviewCount: 250 },
    { name: "Raul V.", slug: "raul-v-true-fades-barbershop-phoenix", rating: 4.8, reviewCount: 230 },
    { name: "Benny O.", slug: "benny-o-true-fades-barbershop-phoenix", rating: 4.7, reviewCount: 210 },
    { name: "Zach L.", slug: "zach-l-true-fades-barbershop-phoenix", rating: 4.7, reviewCount: 200 },
  ],
};

const TRUE_FADES_BARBERS: Barber[] = [
  {
    id: "real-phx-truefades-tootie",
    name: "Tootie",
    slug: "tootie-true-fades-barbershop-phoenix",
    fadeScore: 4.9,
    reviewCount: 300,
    specialties: ["Fades", "Beard", "Line Up"],
    ...TRUE_FADES_SHARED,
  },
  {
    id: "real-phx-truefades-christian",
    name: "Christian N.",
    slug: "christian-n-true-fades-barbershop-phoenix",
    fadeScore: 4.9,
    reviewCount: 280,
    specialties: ["Fades", "Razor Fade"],
    ...TRUE_FADES_SHARED,
  },
  {
    id: "real-phx-truefades-jovany",
    name: "Jovany C.",
    slug: "jovany-c-true-fades-barbershop-phoenix",
    fadeScore: 4.8,
    reviewCount: 250,
    specialties: ["Fades", "Tapers"],
    ...TRUE_FADES_SHARED,
  },
  {
    id: "real-phx-truefades-raul",
    name: "Raul V.",
    slug: "raul-v-true-fades-barbershop-phoenix",
    fadeScore: 4.8,
    reviewCount: 230,
    specialties: ["Fades", "Designs"],
    ...TRUE_FADES_SHARED,
  },
  {
    id: "real-phx-truefades-benny",
    name: "Benny O.",
    slug: "benny-o-true-fades-barbershop-phoenix",
    fadeScore: 4.7,
    reviewCount: 210,
    specialties: ["Fades", "Classic Cuts"],
    ...TRUE_FADES_SHARED,
  },
  {
    id: "real-phx-truefades-zach",
    name: "Zach L.",
    slug: "zach-l-true-fades-barbershop-phoenix",
    fadeScore: 4.7,
    reviewCount: 200,
    specialties: ["Fades", "Beard"],
    ...TRUE_FADES_SHARED,
  },
];

// Combine all Phoenix barbers
export const PHOENIX_BARBERS: Barber[] = [
  ...PIKASSO_BARBERS,
  ...UPTOWN_BARBERS,
  ...ROOSEVELT_BARBERS,
  ...ACE_OF_FADES_BARBERS,
  ...GREATER_GOOD_BARBERS,
  ...CLASSIC_BARBERS,
  ...BLADES_OF_GOLD_BARBERS,
  ...POPS_BARBERS,
  ...TOP_TIER_BARBERS,
  ...LOCAL_BARBER_BARBERS,
  ...CLASSIC_MAN_BARBERS,
  ...TRUE_FADES_BARBERS,
];
