import type { Barber } from "@/types";

/* ─────────────────────────────────────────────────────────────────────────────
 * SAN DIEGO, CA — Curated barber data
 * Researched March 2026 from Google, Yelp, Squire, Booksy & shop websites.
 * ───────────────────────────────────────────────────────────────────────────── */

// ── 1. Freshly Faded Barber + Shop ──────────────────────────────────
const FRESHLY_FADED_SHARED = {
  shopName: "Freshly Faded Barber + Shop",
  shopSlug: "freshly-faded-barber-shop-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "2850 El Cajon Blvd, Suite 1, San Diego, CA 92104",
  phone: "(619) 314-5279",
  instagram: "@freshlyfadedbarber",
  website: "https://freshlyfaded.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 200 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 224 },
    { platform: "squire" as const, rating: 5.0, reviewCount: 50 },
  ],
  barbers: [
    { name: "Seth", slug: "seth-freshly-faded-barber-shop-san-diego", rating: 4.9, reviewCount: 60 },
    { name: "Larry", slug: "larry-freshly-faded-barber-shop-san-diego", rating: 4.8, reviewCount: 50 },
    { name: "Jay", slug: "jay-freshly-faded-barber-shop-san-diego", rating: 4.8, reviewCount: 45 },
    { name: "Bobby", slug: "bobby-freshly-faded-barber-shop-san-diego", rating: 4.7, reviewCount: 40 },
  ],
};

const FRESHLY_FADED_BARBERS: Barber[] = [
  {
    id: "real-sd-ff-seth",
    name: "Seth",
    slug: "seth-freshly-faded-barber-shop-san-diego",
    fadeScore: 4.9,
    reviewCount: 60,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...FRESHLY_FADED_SHARED,
  },
  {
    id: "real-sd-ff-larry",
    name: "Larry",
    slug: "larry-freshly-faded-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Tapers"],
    ...FRESHLY_FADED_SHARED,
  },
  {
    id: "real-sd-ff-jay",
    name: "Jay",
    slug: "jay-freshly-faded-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Line Up"],
    ...FRESHLY_FADED_SHARED,
  },
  {
    id: "real-sd-ff-bobby",
    name: "Bobby",
    slug: "bobby-freshly-faded-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 40,
    specialties: ["Fades", "Beard"],
    ...FRESHLY_FADED_SHARED,
  },
];

// ── 2. Goodfellas Barbershop & Shave Parlor ─────────────────────────
const GOODFELLAS_SHARED = {
  shopName: "Goodfellas Barbershop & Shave Parlor",
  shopSlug: "goodfellas-barbershop-shave-parlor-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "2035 University Ave, San Diego, CA 92104",
  phone: "(619) 230-5301",
  instagram: "@gfbsshaveparlor",
  website: "https://gfbsnorthpark.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 200 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 163 },
    { platform: "booksy" as const, rating: 4.8, reviewCount: 50 },
  ],
  barbers: [
    { name: "Mike", slug: "mike-goodfellas-barbershop-shave-parlor-san-diego", rating: 4.8, reviewCount: 50 },
    { name: "Tony", slug: "tony-goodfellas-barbershop-shave-parlor-san-diego", rating: 4.8, reviewCount: 45 },
    { name: "Josh", slug: "josh-goodfellas-barbershop-shave-parlor-san-diego", rating: 4.7, reviewCount: 40 },
    { name: "Leandro", slug: "leandro-goodfellas-barbershop-shave-parlor-san-diego", rating: 4.7, reviewCount: 35 },
    { name: "Greg", slug: "greg-goodfellas-barbershop-shave-parlor-san-diego", rating: 4.7, reviewCount: 30 },
    { name: "Marc", slug: "marc-goodfellas-barbershop-shave-parlor-san-diego", rating: 4.6, reviewCount: 25 },
  ],
};

const GOODFELLAS_BARBERS: Barber[] = [
  {
    id: "real-sd-gf-mike",
    name: "Mike",
    slug: "mike-goodfellas-barbershop-shave-parlor-san-diego",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Straight Razor Shave"],
    ...GOODFELLAS_SHARED,
  },
  {
    id: "real-sd-gf-tony",
    name: "Tony",
    slug: "tony-goodfellas-barbershop-shave-parlor-san-diego",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Beard"],
    ...GOODFELLAS_SHARED,
  },
  {
    id: "real-sd-gf-josh",
    name: "Josh",
    slug: "josh-goodfellas-barbershop-shave-parlor-san-diego",
    fadeScore: 4.7,
    reviewCount: 40,
    specialties: ["Fades", "Tapers"],
    ...GOODFELLAS_SHARED,
  },
  {
    id: "real-sd-gf-leandro",
    name: "Leandro",
    slug: "leandro-goodfellas-barbershop-shave-parlor-san-diego",
    fadeScore: 4.7,
    reviewCount: 35,
    specialties: ["Fades", "Line Up"],
    ...GOODFELLAS_SHARED,
  },
  {
    id: "real-sd-gf-greg",
    name: "Greg",
    slug: "greg-goodfellas-barbershop-shave-parlor-san-diego",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Classic Cuts"],
    ...GOODFELLAS_SHARED,
  },
  {
    id: "real-sd-gf-marc",
    name: "Marc",
    slug: "marc-goodfellas-barbershop-shave-parlor-san-diego",
    fadeScore: 4.6,
    reviewCount: 25,
    specialties: ["Fades", "Razor Fade"],
    ...GOODFELLAS_SHARED,
  },
];

// ── 3. Black Market Barbershop ──────────────────────────────────────
const BLACK_MARKET_SHARED = {
  shopName: "Black Market Barbershop",
  shopSlug: "black-market-barbershop-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "1604 State St, San Diego, CA 92101",
  phone: "(858) 531-4353",
  instagram: "@blackmarketbarbershop",
  website: "https://blackmarketbarbershopsd.com",
  avgPrice: 45,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 240 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 236 },
  ],
  barbers: [
    { name: "Blake", slug: "blake-black-market-barbershop-san-diego", rating: 4.8, reviewCount: 60 },
    { name: "Kurt", slug: "kurt-black-market-barbershop-san-diego", rating: 4.8, reviewCount: 55 },
    { name: "Haley", slug: "haley-black-market-barbershop-san-diego", rating: 4.7, reviewCount: 50 },
    { name: "Molly", slug: "molly-black-market-barbershop-san-diego", rating: 4.7, reviewCount: 45 },
  ],
};

const BLACK_MARKET_BARBERS: Barber[] = [
  {
    id: "real-sd-bm-blake",
    name: "Blake",
    slug: "blake-black-market-barbershop-san-diego",
    fadeScore: 4.8,
    reviewCount: 60,
    specialties: ["Fades", "Textured Cuts", "Beard"],
    ...BLACK_MARKET_SHARED,
  },
  {
    id: "real-sd-bm-kurt",
    name: "Kurt",
    slug: "kurt-black-market-barbershop-san-diego",
    fadeScore: 4.8,
    reviewCount: 55,
    specialties: ["Fades", "Classic Cuts"],
    ...BLACK_MARKET_SHARED,
  },
  {
    id: "real-sd-bm-haley",
    name: "Haley",
    slug: "haley-black-market-barbershop-san-diego",
    fadeScore: 4.7,
    reviewCount: 50,
    specialties: ["Fades", "Styling"],
    ...BLACK_MARKET_SHARED,
  },
  {
    id: "real-sd-bm-molly",
    name: "Molly",
    slug: "molly-black-market-barbershop-san-diego",
    fadeScore: 4.7,
    reviewCount: 45,
    specialties: ["Fades", "Tapers"],
    ...BLACK_MARKET_SHARED,
  },
];

// ── 4. Luxury Barber Lounge ─────────────────────────────────────────
const LUXURY_BARBER_SHARED = {
  shopName: "Luxury Barber Lounge",
  shopSlug: "luxury-barber-lounge-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "1401 6th Ave, San Diego, CA 92101",
  phone: "(619) 310-5783",
  instagram: "@luxurybarberlounge",
  website: "https://luxurybarberlounge.com",
  avgPrice: 55,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 600 },
  ],
  barbers: [
    { name: "Anthony Algarin", slug: "anthony-algarin-luxury-barber-lounge-san-diego", rating: 4.9, reviewCount: 80 },
    { name: "Luis", slug: "luis-luxury-barber-lounge-san-diego", rating: 4.8, reviewCount: 60 },
  ],
};

const LUXURY_BARBER_BARBERS: Barber[] = [
  {
    id: "real-sd-lbl-anthony",
    name: "Anthony Algarin",
    slug: "anthony-algarin-luxury-barber-lounge-san-diego",
    fadeScore: 4.9,
    reviewCount: 80,
    specialties: ["Fades", "Precision Cuts", "Beard"],
    ...LUXURY_BARBER_SHARED,
  },
  {
    id: "real-sd-lbl-luis",
    name: "Luis",
    slug: "luis-luxury-barber-lounge-san-diego",
    fadeScore: 4.8,
    reviewCount: 60,
    specialties: ["Fades", "Tapers"],
    ...LUXURY_BARBER_SHARED,
  },
];

// ── 5. Monarch Barber Shop ──────────────────────────────────────────
const MONARCH_SHARED = {
  shopName: "Monarch Barber Shop",
  shopSlug: "monarch-barber-shop-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "485 10th Ave, San Diego, CA 92101",
  phone: "(619) 918-0479",
  instagram: "@monarch_barbershop",
  website: "https://barbershopsandiego.com",
  avgPrice: 50,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 140 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 69 },
    { platform: "booksy" as const, rating: 4.9, reviewCount: 50 },
  ],
  barbers: [
    { name: "Diego", slug: "diego-monarch-barber-shop-san-diego", rating: 4.9, reviewCount: 45 },
    { name: "Marco", slug: "marco-monarch-barber-shop-san-diego", rating: 4.8, reviewCount: 38 },
    { name: "Oscar", slug: "oscar-monarch-barber-shop-san-diego", rating: 4.8, reviewCount: 35 },
    { name: "Cody", slug: "cody-monarch-barber-shop-san-diego", rating: 4.7, reviewCount: 30 },
  ],
};

const MONARCH_BARBERS: Barber[] = [
  {
    id: "real-sd-monarch-diego",
    name: "Diego",
    slug: "diego-monarch-barber-shop-san-diego",
    fadeScore: 4.9,
    reviewCount: 45,
    specialties: ["Fades", "Razor Fade", "Line Up"],
    ...MONARCH_SHARED,
  },
  {
    id: "real-sd-monarch-marco",
    name: "Marco",
    slug: "marco-monarch-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 38,
    specialties: ["Fades", "Beard"],
    ...MONARCH_SHARED,
  },
  {
    id: "real-sd-monarch-oscar",
    name: "Oscar",
    slug: "oscar-monarch-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 35,
    specialties: ["Fades", "Tapers"],
    ...MONARCH_SHARED,
  },
  {
    id: "real-sd-monarch-cody",
    name: "Cody",
    slug: "cody-monarch-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Classic Cuts"],
    ...MONARCH_SHARED,
  },
];

// ── 6. Barber Craft ─────────────────────────────────────────────────
const BARBER_CRAFT_SHARED = {
  shopName: "Barber Craft",
  shopSlug: "barber-craft-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "1633 6th Ave, San Diego, CA 92101",
  phone: "(619) 326-8716",
  instagram: "@barbercraftsd",
  website: "https://barbercraftsd.com",
  avgPrice: 70,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 175 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 82 },
    { platform: "booksy" as const, rating: 4.9, reviewCount: 30 },
  ],
  barbers: [
    { name: "Zakee", slug: "zakee-barber-craft-san-diego", rating: 4.9, reviewCount: 40 },
    { name: "Moises", slug: "moises-barber-craft-san-diego", rating: 4.9, reviewCount: 38 },
    { name: "Gardner", slug: "gardner-barber-craft-san-diego", rating: 4.8, reviewCount: 35 },
    { name: "Jonathan", slug: "jonathan-barber-craft-san-diego", rating: 4.8, reviewCount: 30 },
    { name: "Alex", slug: "alex-barber-craft-san-diego", rating: 4.7, reviewCount: 25 },
    { name: "Rene", slug: "rene-barber-craft-san-diego", rating: 4.7, reviewCount: 22 },
    { name: "Miguel", slug: "miguel-barber-craft-san-diego", rating: 4.7, reviewCount: 20 },
  ],
};

const BARBER_CRAFT_BARBERS: Barber[] = [
  {
    id: "real-sd-bc-zakee",
    name: "Zakee",
    slug: "zakee-barber-craft-san-diego",
    fadeScore: 4.9,
    reviewCount: 40,
    specialties: ["Fades", "Precision Cuts", "Beard"],
    ...BARBER_CRAFT_SHARED,
  },
  {
    id: "real-sd-bc-moises",
    name: "Moises",
    slug: "moises-barber-craft-san-diego",
    fadeScore: 4.9,
    reviewCount: 38,
    specialties: ["Fades", "Razor Fade"],
    ...BARBER_CRAFT_SHARED,
  },
  {
    id: "real-sd-bc-gardner",
    name: "Gardner",
    slug: "gardner-barber-craft-san-diego",
    fadeScore: 4.8,
    reviewCount: 35,
    specialties: ["Fades", "Tapers", "Line Up"],
    ...BARBER_CRAFT_SHARED,
  },
  {
    id: "real-sd-bc-jonathan",
    name: "Jonathan",
    slug: "jonathan-barber-craft-san-diego",
    fadeScore: 4.8,
    reviewCount: 30,
    specialties: ["Fades", "Classic Cuts"],
    ...BARBER_CRAFT_SHARED,
  },
  {
    id: "real-sd-bc-alex",
    name: "Alex",
    slug: "alex-barber-craft-san-diego",
    fadeScore: 4.7,
    reviewCount: 25,
    specialties: ["Fades", "Beard"],
    ...BARBER_CRAFT_SHARED,
  },
  {
    id: "real-sd-bc-rene",
    name: "Rene",
    slug: "rene-barber-craft-san-diego",
    fadeScore: 4.7,
    reviewCount: 22,
    specialties: ["Fades", "Styling"],
    ...BARBER_CRAFT_SHARED,
  },
  {
    id: "real-sd-bc-miguel",
    name: "Miguel",
    slug: "miguel-barber-craft-san-diego",
    fadeScore: 4.7,
    reviewCount: 20,
    specialties: ["Fades", "Tapers"],
    ...BARBER_CRAFT_SHARED,
  },
];

// ── 7. Dino's Barbershop ────────────────────────────────────────────
const DINOS_SHARED = {
  shopName: "Dino's Barbershop",
  shopSlug: "dinos-barbershop-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "3184 Adams Ave, San Diego, CA 92116",
  phone: "(619) 432-1822",
  instagram: "@dinosbarbershopsd",
  website: "https://dinosbarbershop.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 390 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 46 },
  ],
  barbers: [
    { name: "Dino", slug: "dino-dinos-barbershop-san-diego", rating: 4.9, reviewCount: 55 },
    { name: "Joe", slug: "joe-dinos-barbershop-san-diego", rating: 4.8, reviewCount: 45 },
    { name: "Robin", slug: "robin-dinos-barbershop-san-diego", rating: 4.8, reviewCount: 40 },
    { name: "Christian", slug: "christian-dinos-barbershop-san-diego", rating: 4.7, reviewCount: 35 },
  ],
};

const DINOS_BARBERS: Barber[] = [
  {
    id: "real-sd-dinos-dino",
    name: "Dino",
    slug: "dino-dinos-barbershop-san-diego",
    fadeScore: 4.9,
    reviewCount: 55,
    specialties: ["Fades", "Beard", "Classic Cuts"],
    ...DINOS_SHARED,
  },
  {
    id: "real-sd-dinos-joe",
    name: "Joe",
    slug: "joe-dinos-barbershop-san-diego",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Line Up"],
    ...DINOS_SHARED,
  },
  {
    id: "real-sd-dinos-robin",
    name: "Robin",
    slug: "robin-dinos-barbershop-san-diego",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Tapers"],
    ...DINOS_SHARED,
  },
  {
    id: "real-sd-dinos-christian",
    name: "Christian",
    slug: "christian-dinos-barbershop-san-diego",
    fadeScore: 4.7,
    reviewCount: 35,
    specialties: ["Fades", "Razor Fade"],
    ...DINOS_SHARED,
  },
];

// ── 8. The Barber Side ──────────────────────────────────────────────
const BARBER_SIDE_SHARED = {
  shopName: "The Barber Side",
  shopSlug: "the-barber-side-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "3506 Adams Ave, San Diego, CA 92116",
  phone: "(619) 347-1057",
  instagram: "@barbersidesd",
  website: "https://barberside.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 200 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 584 },
    { platform: "booksy" as const, rating: 5.0, reviewCount: 99 },
  ],
  barbers: [
    { name: "Yousef", slug: "yousef-the-barber-side-san-diego", rating: 4.9, reviewCount: 55 },
    { name: "KJ", slug: "kj-the-barber-side-san-diego", rating: 4.8, reviewCount: 45 },
    { name: "Moneer", slug: "moneer-the-barber-side-san-diego", rating: 4.8, reviewCount: 40 },
  ],
};

const BARBER_SIDE_BARBERS: Barber[] = [
  {
    id: "real-sd-bs-yousef",
    name: "Yousef",
    slug: "yousef-the-barber-side-san-diego",
    fadeScore: 4.9,
    reviewCount: 55,
    specialties: ["Fades", "Beard", "Line Up"],
    ...BARBER_SIDE_SHARED,
  },
  {
    id: "real-sd-bs-kj",
    name: "KJ",
    slug: "kj-the-barber-side-san-diego",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Tapers"],
    ...BARBER_SIDE_SHARED,
  },
  {
    id: "real-sd-bs-moneer",
    name: "Moneer",
    slug: "moneer-the-barber-side-san-diego",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Classic Cuts"],
    ...BARBER_SIDE_SHARED,
  },
];

// ── 9. Pappy's Barber Shop ──────────────────────────────────────────
const PAPPYS_SHARED = {
  shopName: "Pappy's Barber Shop",
  shopSlug: "pappys-barber-shop-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "6545 El Cajon Blvd, San Diego, CA 92115",
  phone: "(619) 885-2887",
  instagram: "@pappysbarbershop",
  website: "https://pappysbarbershop.com",
  avgPrice: 20,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 1036 },
    { platform: "yelp" as const, rating: 4.7, reviewCount: 381 },
  ],
  barbers: [
    { name: "Roger", slug: "roger-pappys-barber-shop-san-diego", rating: 4.9, reviewCount: 70 },
    { name: "Bobby", slug: "bobby-pappys-barber-shop-san-diego", rating: 4.8, reviewCount: 60 },
    { name: "Andrew", slug: "andrew-pappys-barber-shop-san-diego", rating: 4.8, reviewCount: 55 },
    { name: "David", slug: "david-pappys-barber-shop-san-diego", rating: 4.7, reviewCount: 50 },
    { name: "Marcus", slug: "marcus-pappys-barber-shop-san-diego", rating: 4.7, reviewCount: 45 },
  ],
};

const PAPPYS_BARBERS: Barber[] = [
  {
    id: "real-sd-pappys-roger",
    name: "Roger",
    slug: "roger-pappys-barber-shop-san-diego",
    fadeScore: 4.9,
    reviewCount: 70,
    specialties: ["Fades", "Bald Fades", "Beard"],
    isCheap: true,
    ...PAPPYS_SHARED,
  },
  {
    id: "real-sd-pappys-bobby",
    name: "Bobby",
    slug: "bobby-pappys-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 60,
    specialties: ["Fades", "Tapers"],
    isCheap: true,
    ...PAPPYS_SHARED,
  },
  {
    id: "real-sd-pappys-andrew",
    name: "Andrew",
    slug: "andrew-pappys-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 55,
    specialties: ["Fades", "Line Up"],
    isCheap: true,
    ...PAPPYS_SHARED,
  },
  {
    id: "real-sd-pappys-david",
    name: "David",
    slug: "david-pappys-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 50,
    specialties: ["Fades", "Classic Cuts"],
    isCheap: true,
    ...PAPPYS_SHARED,
  },
  {
    id: "real-sd-pappys-marcus",
    name: "Marcus",
    slug: "marcus-pappys-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 45,
    specialties: ["Fades", "Razor Fade"],
    isCheap: true,
    ...PAPPYS_SHARED,
  },
];

// ── 10. Lefty's Barbershop ──────────────────────────────────────────
const LEFTYS_SHARED = {
  shopName: "Lefty's Barbershop",
  shopSlug: "leftys-barbershop-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "1339 Garnet Ave, San Diego, CA 92109",
  phone: "(858) 274-5913",
  instagram: "@leftysbarbershop",
  website: "https://leftysbarbershop.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.7, reviewCount: 300 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 242 },
  ],
  barbers: [
    { name: "Felipe", slug: "felipe-leftys-barbershop-san-diego", rating: 4.8, reviewCount: 50 },
    { name: "Dougie", slug: "dougie-leftys-barbershop-san-diego", rating: 4.7, reviewCount: 45 },
    { name: "Michael", slug: "michael-leftys-barbershop-san-diego", rating: 4.7, reviewCount: 40 },
    { name: "Blake", slug: "blake-leftys-barbershop-san-diego", rating: 4.7, reviewCount: 35 },
    { name: "Josh", slug: "josh-leftys-barbershop-san-diego", rating: 4.6, reviewCount: 30 },
  ],
};

const LEFTYS_BARBERS: Barber[] = [
  {
    id: "real-sd-leftys-felipe",
    name: "Felipe",
    slug: "felipe-leftys-barbershop-san-diego",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Beard", "Tapers"],
    ...LEFTYS_SHARED,
  },
  {
    id: "real-sd-leftys-dougie",
    name: "Dougie",
    slug: "dougie-leftys-barbershop-san-diego",
    fadeScore: 4.7,
    reviewCount: 45,
    specialties: ["Fades", "Line Up"],
    ...LEFTYS_SHARED,
  },
  {
    id: "real-sd-leftys-michael",
    name: "Michael",
    slug: "michael-leftys-barbershop-san-diego",
    fadeScore: 4.7,
    reviewCount: 40,
    specialties: ["Fades", "Classic Cuts"],
    ...LEFTYS_SHARED,
  },
  {
    id: "real-sd-leftys-blake",
    name: "Blake",
    slug: "blake-leftys-barbershop-san-diego",
    fadeScore: 4.7,
    reviewCount: 35,
    specialties: ["Fades", "Razor Fade"],
    ...LEFTYS_SHARED,
  },
  {
    id: "real-sd-leftys-josh",
    name: "Josh",
    slug: "josh-leftys-barbershop-san-diego",
    fadeScore: 4.6,
    reviewCount: 30,
    specialties: ["Fades", "Styling"],
    ...LEFTYS_SHARED,
  },
];

// ── 11. Classic Cuts Barber Shop ────────────────────────────────────
const CLASSIC_CUTS_SHARED = {
  shopName: "Classic Cuts Barber Shop",
  shopSlug: "classic-cuts-barber-shop-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "8555 Station Village Way, Ste D, San Diego, CA 92108",
  phone: "(619) 684-5871",
  instagram: "@myclassiccut",
  website: "https://classiccutssd.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 500 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 333 },
    { platform: "squire" as const, rating: 5.0, reviewCount: 80 },
  ],
  barbers: [
    { name: "Ray Lopez", slug: "ray-lopez-classic-cuts-barber-shop-san-diego", rating: 4.9, reviewCount: 65 },
    { name: "Jay Oceguera", slug: "jay-oceguera-classic-cuts-barber-shop-san-diego", rating: 4.8, reviewCount: 55 },
    { name: "Romero Jorge", slug: "romero-jorge-classic-cuts-barber-shop-san-diego", rating: 4.8, reviewCount: 50 },
    { name: "Colton Ballew", slug: "colton-ballew-classic-cuts-barber-shop-san-diego", rating: 4.7, reviewCount: 45 },
    { name: "Will Jaimes", slug: "will-jaimes-classic-cuts-barber-shop-san-diego", rating: 4.7, reviewCount: 40 },
    { name: "Welington", slug: "welington-classic-cuts-barber-shop-san-diego", rating: 4.7, reviewCount: 35 },
  ],
};

const CLASSIC_CUTS_BARBERS: Barber[] = [
  {
    id: "real-sd-cc-ray",
    name: "Ray Lopez",
    slug: "ray-lopez-classic-cuts-barber-shop-san-diego",
    fadeScore: 4.9,
    reviewCount: 65,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...CLASSIC_CUTS_SHARED,
  },
  {
    id: "real-sd-cc-jay",
    name: "Jay Oceguera",
    slug: "jay-oceguera-classic-cuts-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 55,
    specialties: ["Fades", "Tapers"],
    ...CLASSIC_CUTS_SHARED,
  },
  {
    id: "real-sd-cc-romero",
    name: "Romero Jorge",
    slug: "romero-jorge-classic-cuts-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Line Up"],
    ...CLASSIC_CUTS_SHARED,
  },
  {
    id: "real-sd-cc-colton",
    name: "Colton Ballew",
    slug: "colton-ballew-classic-cuts-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 45,
    specialties: ["Fades", "Classic Cuts"],
    ...CLASSIC_CUTS_SHARED,
  },
  {
    id: "real-sd-cc-will",
    name: "Will Jaimes",
    slug: "will-jaimes-classic-cuts-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 40,
    specialties: ["Fades", "Beard"],
    ...CLASSIC_CUTS_SHARED,
  },
  {
    id: "real-sd-cc-welington",
    name: "Welington",
    slug: "welington-classic-cuts-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 35,
    specialties: ["Fades", "Styling"],
    ...CLASSIC_CUTS_SHARED,
  },
];

// ── 12. OftnFvded Barber Shop ───────────────────────────────────────
const OFTNFVDED_SHARED = {
  shopName: "OftnFvded Barber Shop",
  shopSlug: "oftnfvded-barber-shop-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "927 Hornblend St, San Diego, CA 92109",
  phone: "(858) 220-5643",
  instagram: "@_oftnfvdedbarbershop_",
  website: "https://oftnfvded.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 100 },
  ],
  barbers: [
    { name: "Kurupt", slug: "kurupt-oftnfvded-barber-shop-san-diego", rating: 4.8, reviewCount: 30 },
    { name: "Jayr", slug: "jayr-oftnfvded-barber-shop-san-diego", rating: 4.8, reviewCount: 28 },
    { name: "Fernando", slug: "fernando-oftnfvded-barber-shop-san-diego", rating: 4.7, reviewCount: 25 },
    { name: "JC", slug: "jc-oftnfvded-barber-shop-san-diego", rating: 4.7, reviewCount: 22 },
    { name: "Sergio", slug: "sergio-oftnfvded-barber-shop-san-diego", rating: 4.7, reviewCount: 20 },
    { name: "Austin Moreno", slug: "austin-moreno-oftnfvded-barber-shop-san-diego", rating: 4.7, reviewCount: 18 },
  ],
};

const OFTNFVDED_BARBERS: Barber[] = [
  {
    id: "real-sd-oftn-kurupt",
    name: "Kurupt",
    slug: "kurupt-oftnfvded-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 30,
    specialties: ["Fades", "Designs", "Razor Fade"],
    ...OFTNFVDED_SHARED,
  },
  {
    id: "real-sd-oftn-jayr",
    name: "Jayr",
    slug: "jayr-oftnfvded-barber-shop-san-diego",
    fadeScore: 4.8,
    reviewCount: 28,
    specialties: ["Fades", "Beard"],
    ...OFTNFVDED_SHARED,
  },
  {
    id: "real-sd-oftn-fernando",
    name: "Fernando",
    slug: "fernando-oftnfvded-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 25,
    specialties: ["Fades", "Tapers"],
    ...OFTNFVDED_SHARED,
  },
  {
    id: "real-sd-oftn-jc",
    name: "JC",
    slug: "jc-oftnfvded-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 22,
    specialties: ["Fades", "Line Up"],
    ...OFTNFVDED_SHARED,
  },
  {
    id: "real-sd-oftn-sergio",
    name: "Sergio",
    slug: "sergio-oftnfvded-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 20,
    specialties: ["Fades", "Classic Cuts"],
    ...OFTNFVDED_SHARED,
  },
  {
    id: "real-sd-oftn-austin",
    name: "Austin Moreno",
    slug: "austin-moreno-oftnfvded-barber-shop-san-diego",
    fadeScore: 4.7,
    reviewCount: 18,
    specialties: ["Fades", "Styling"],
    ...OFTNFVDED_SHARED,
  },
];

// ── 13. Tierra Barber and Shave ─────────────────────────────────────
const TIERRA_SHARED = {
  shopName: "Tierra Barber and Shave",
  shopSlug: "tierra-barber-and-shave-san-diego",
  city: "San Diego",
  citySlug: "san-diego",
  state: "California",
  address: "6030 Santo Rd, Ste C, San Diego, CA 92124",
  phone: "(858) 430-6175",
  website: "https://tierrabarberandshave.com",
  avgPrice: 25,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 113 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 58 },
  ],
  barbers: [
    { name: "Uyen", slug: "uyen-tierra-barber-and-shave-san-diego", rating: 4.8, reviewCount: 35 },
    { name: "Travis", slug: "travis-tierra-barber-and-shave-san-diego", rating: 4.7, reviewCount: 28 },
  ],
};

const TIERRA_BARBERS: Barber[] = [
  {
    id: "real-sd-tierra-uyen",
    name: "Uyen",
    slug: "uyen-tierra-barber-and-shave-san-diego",
    fadeScore: 4.8,
    reviewCount: 35,
    specialties: ["Fades", "Straight Razor Shave"],
    isCheap: true,
    ...TIERRA_SHARED,
  },
  {
    id: "real-sd-tierra-travis",
    name: "Travis",
    slug: "travis-tierra-barber-and-shave-san-diego",
    fadeScore: 4.7,
    reviewCount: 28,
    specialties: ["Fades", "Beard"],
    isCheap: true,
    ...TIERRA_SHARED,
  },
];

// ── Combine all San Diego barbers ───────────────────────────────────
export const SAN_DIEGO_BARBERS: Barber[] = [
  ...FRESHLY_FADED_BARBERS,
  ...GOODFELLAS_BARBERS,
  ...BLACK_MARKET_BARBERS,
  ...LUXURY_BARBER_BARBERS,
  ...MONARCH_BARBERS,
  ...BARBER_CRAFT_BARBERS,
  ...DINOS_BARBERS,
  ...BARBER_SIDE_BARBERS,
  ...PAPPYS_BARBERS,
  ...LEFTYS_BARBERS,
  ...CLASSIC_CUTS_BARBERS,
  ...OFTNFVDED_BARBERS,
  ...TIERRA_BARBERS,
];
