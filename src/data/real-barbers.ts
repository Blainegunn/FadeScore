import type { Barber } from "@/types";
import { SLC_BARBERS, OGDEN_BARBERS, LOGAN_BARBERS, LAYTON_BARBERS, PROVO_BARBERS, SOUTH_JORDAN_BARBERS } from "./slc-barbers";
import { CHICAGO_BARBERS } from "./chicago-barbers";
import { HOUSTON_BARBERS } from "./houston-barbers";
import { PHOENIX_BARBERS } from "./phoenix-barbers";
import { SAN_ANTONIO_BARBERS } from "./san-antonio-barbers";
import { SAN_DIEGO_BARBERS } from "./san-diego-barbers";
import { SQUIRE_BARBERS } from "./squire";

/**
 * Curated barber data for cities where we have real info.
 * Reviews aggregated from Google, Yelp, and Facebook.
 */

// ─── LOS ANGELES, CA ────────────────────────────────────────────────
// Curated from Google, Yelp, Booksy, Squire, and shop websites (March 2026)

// ── 1. Grey Matter LA ───────────────────────────────────────────────
const GREY_MATTER_SHARED = {
  shopName: "Grey Matter LA",
  shopSlug: "grey-matter-la-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "145 N La Brea Ave, Ste A, Los Angeles, CA 90036",
  phone: "(323) 272-4513",
  instagram: "@greymatterla",
  website: "https://www.greymatterla.com",
  avgPrice: 65,
  reviews: [
    { platform: "yelp" as const, rating: 4.9, reviewCount: 288 },
    { platform: "google" as const, rating: 4.9, reviewCount: 198 },
  ],
  barbers: [
    { name: "Vince Garcia", slug: "vince-garcia-grey-matter-la-los-angeles", rating: 5.0, reviewCount: 80 },
    { name: "Vincent Sammut", slug: "vincent-sammut-grey-matter-la-los-angeles", rating: 4.9, reviewCount: 45 },
    { name: "Matt Vu", slug: "matt-vu-grey-matter-la-los-angeles", rating: 4.9, reviewCount: 38 },
    { name: "Steve", slug: "steve-grey-matter-la-los-angeles", rating: 4.8, reviewCount: 30 },
    { name: "Alex", slug: "alex-grey-matter-la-los-angeles", rating: 4.8, reviewCount: 25 },
  ],
};

const GREY_MATTER_BARBERS: Barber[] = [
  {
    id: "real-la-gm-vince",
    name: "Vince Garcia",
    slug: "vince-garcia-grey-matter-la-los-angeles",
    fadeScore: 5.0,
    reviewCount: 80,
    specialties: ["Fades", "Celebrity Cuts", "Razor Fade"],
    ...GREY_MATTER_SHARED,
  },
  {
    id: "real-la-gm-sammut",
    name: "Vincent Sammut",
    slug: "vincent-sammut-grey-matter-la-los-angeles",
    fadeScore: 4.9,
    reviewCount: 45,
    specialties: ["Fades", "Beard", "Tapers"],
    ...GREY_MATTER_SHARED,
  },
  {
    id: "real-la-gm-matt",
    name: "Matt Vu",
    slug: "matt-vu-grey-matter-la-los-angeles",
    fadeScore: 4.9,
    reviewCount: 38,
    specialties: ["Fades", "Line Up"],
    ...GREY_MATTER_SHARED,
  },
  {
    id: "real-la-gm-steve",
    name: "Steve",
    slug: "steve-grey-matter-la-los-angeles",
    fadeScore: 4.8,
    reviewCount: 30,
    specialties: ["Fades", "Beard"],
    ...GREY_MATTER_SHARED,
  },
  {
    id: "real-la-gm-alex",
    name: "Alex",
    slug: "alex-grey-matter-la-los-angeles",
    fadeScore: 4.8,
    reviewCount: 25,
    specialties: ["Fades", "Tapers"],
    ...GREY_MATTER_SHARED,
  },
];

// ── 2. Saints ───────────────────────────────────────────────────────
const SAINTS_SHARED = {
  shopName: "Saints",
  shopSlug: "saints-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "12796 Washington Blvd, Los Angeles, CA 90066",
  phone: "(424) 321-7448",
  instagram: "@saintsinlosangeles",
  website: "https://saintsinlosangeles.com",
  avgPrice: 80,
  reviews: [
    { platform: "yelp" as const, rating: 4.9, reviewCount: 238 },
    { platform: "squire" as const, rating: 5.0, reviewCount: 500 },
    { platform: "google" as const, rating: 5.0, reviewCount: 163 },
  ],
  barbers: [
    { name: "Frankee", slug: "frankee-saints-los-angeles", rating: 5.0, reviewCount: 120 },
    { name: "Marty Mejia", slug: "marty-mejia-saints-los-angeles", rating: 5.0, reviewCount: 95 },
    { name: "Jarvin", slug: "jarvin-saints-los-angeles", rating: 4.9, reviewCount: 85 },
  ],
};

const SAINTS_BARBERS: Barber[] = [
  {
    id: "real-la-saints-frankee",
    name: "Frankee",
    slug: "frankee-saints-los-angeles",
    fadeScore: 5.0,
    reviewCount: 120,
    specialties: ["Skin Fades", "Layered Shear", "Straight Razor"],
    ...SAINTS_SHARED,
  },
  {
    id: "real-la-saints-marty",
    name: "Marty Mejia",
    slug: "marty-mejia-saints-los-angeles",
    fadeScore: 5.0,
    reviewCount: 95,
    specialties: ["Fades", "Mid-Length Cuts", "Styling"],
    ...SAINTS_SHARED,
  },
  {
    id: "real-la-saints-jarvin",
    name: "Jarvin",
    slug: "jarvin-saints-los-angeles",
    fadeScore: 4.9,
    reviewCount: 85,
    specialties: ["Fades", "Beard", "Precision Cuts"],
    ...SAINTS_SHARED,
  },
];

// ── 3. Shorty's Barber Shop ─────────────────────────────────────────
const SHORTYS_SHARED = {
  shopName: "Shorty's Barber Shop",
  shopSlug: "shortys-barber-shop-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "755 N Fairfax Ave, Los Angeles, CA 90046",
  phone: "(323) 990-4301",
  instagram: "@shortys_barbershop",
  website: "https://www.shortysbarbershop.com",
  avgPrice: 45,
  reviews: [
    { platform: "yelp" as const, rating: 4.5, reviewCount: 537 },
    { platform: "google" as const, rating: 4.7, reviewCount: 366 },
  ],
  barbers: [
    { name: "Jose", slug: "jose-shortys-barber-shop-los-angeles", rating: 4.9, reviewCount: 60 },
    { name: "Earl", slug: "earl-shortys-barber-shop-los-angeles", rating: 4.8, reviewCount: 55 },
    { name: "Gilbert", slug: "gilbert-shortys-barber-shop-los-angeles", rating: 4.8, reviewCount: 50 },
    { name: "Christian", slug: "christian-shortys-barber-shop-los-angeles", rating: 4.7, reviewCount: 45 },
    { name: "Jessica", slug: "jessica-shortys-barber-shop-los-angeles", rating: 4.8, reviewCount: 40 },
    { name: "Dimas", slug: "dimas-shortys-barber-shop-los-angeles", rating: 4.7, reviewCount: 35 },
    { name: "Paul", slug: "paul-shortys-barber-shop-los-angeles", rating: 4.7, reviewCount: 30 },
    { name: "Maxx", slug: "maxx-shortys-barber-shop-los-angeles", rating: 4.6, reviewCount: 25 },
  ],
};

const SHORTYS_BARBERS: Barber[] = [
  {
    id: "real-la-shortys-jose",
    name: "Jose",
    slug: "jose-shortys-barber-shop-los-angeles",
    fadeScore: 4.9,
    reviewCount: 60,
    specialties: ["Fades", "Razor Fade", "Colors"],
    ...SHORTYS_SHARED,
  },
  {
    id: "real-la-shortys-earl",
    name: "Earl",
    slug: "earl-shortys-barber-shop-los-angeles",
    fadeScore: 4.8,
    reviewCount: 55,
    specialties: ["Fades", "Tapers", "Beard"],
    ...SHORTYS_SHARED,
  },
  {
    id: "real-la-shortys-gilbert",
    name: "Gilbert",
    slug: "gilbert-shortys-barber-shop-los-angeles",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Line Up"],
    ...SHORTYS_SHARED,
  },
  {
    id: "real-la-shortys-christian",
    name: "Christian",
    slug: "christian-shortys-barber-shop-los-angeles",
    fadeScore: 4.7,
    reviewCount: 45,
    specialties: ["Fades", "Highlights"],
    ...SHORTYS_SHARED,
  },
  {
    id: "real-la-shortys-jessica",
    name: "Jessica",
    slug: "jessica-shortys-barber-shop-los-angeles",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Colors", "Shampoo & Style"],
    ...SHORTYS_SHARED,
  },
  {
    id: "real-la-shortys-dimas",
    name: "Dimas",
    slug: "dimas-shortys-barber-shop-los-angeles",
    fadeScore: 4.7,
    reviewCount: 35,
    specialties: ["Fades", "Beard"],
    ...SHORTYS_SHARED,
  },
  {
    id: "real-la-shortys-paul",
    name: "Paul",
    slug: "paul-shortys-barber-shop-los-angeles",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Razor Fade"],
    ...SHORTYS_SHARED,
  },
  {
    id: "real-la-shortys-maxx",
    name: "Maxx",
    slug: "maxx-shortys-barber-shop-los-angeles",
    fadeScore: 4.6,
    reviewCount: 25,
    specialties: ["Fades", "Tapers"],
    ...SHORTYS_SHARED,
  },
];

// ── 4. Handsome Devil's Barber Shop ─────────────────────────────────
const HANDSOME_DEVIL_SHARED = {
  shopName: "Handsome Devil's Barber Shop",
  shopSlug: "handsome-devils-barber-shop-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "1523 N La Brea Ave, Ste 204, Los Angeles, CA 90028",
  phone: "(562) 857-4558",
  instagram: "@handsomedevilshollywood",
  website: "https://handsome-devil-s-barber-shop.placeid.site",
  avgPrice: 45,
  reviews: [
    { platform: "yelp" as const, rating: 5.0, reviewCount: 421 },
    { platform: "google" as const, rating: 4.7, reviewCount: 290 },
  ],
  barbers: [
    { name: "Matt", slug: "matt-handsome-devils-barber-shop-los-angeles", rating: 5.0, reviewCount: 290 },
  ],
};

const HANDSOME_DEVIL_BARBERS: Barber[] = [
  {
    id: "real-la-hd-matt",
    name: "Matt",
    slug: "matt-handsome-devils-barber-shop-los-angeles",
    fadeScore: 5.0,
    reviewCount: 290,
    specialties: ["Fades", "Precision Cuts", "Beard"],
    ...HANDSOME_DEVIL_SHARED,
  },
];

// ── 5. The Fade Inn Barber Shop ─────────────────────────────────────
const FADE_INN_SHARED = {
  shopName: "The Fade Inn Barber Shop",
  shopSlug: "the-fade-inn-barber-shop-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "5633 1/2 Hollywood Blvd, Los Angeles, CA 90028",
  phone: "(323) 467-7270",
  instagram: "@thefadeinn",
  website: "https://www.thefadeinn.com",
  avgPrice: 45,
  reviews: [
    { platform: "yelp" as const, rating: 4.5, reviewCount: 377 },
    { platform: "google" as const, rating: 4.4, reviewCount: 209 },
    { platform: "booksy" as const, rating: 4.8, reviewCount: 150 },
  ],
  barbers: [
    { name: "Alex", slug: "alex-the-fade-inn-barber-shop-los-angeles", rating: 4.9, reviewCount: 70 },
    { name: "Rami", slug: "rami-the-fade-inn-barber-shop-los-angeles", rating: 4.8, reviewCount: 50 },
    { name: "Darwin", slug: "darwin-the-fade-inn-barber-shop-los-angeles", rating: 4.8, reviewCount: 45 },
    { name: "Mary", slug: "mary-the-fade-inn-barber-shop-los-angeles", rating: 4.7, reviewCount: 30 },
  ],
};

const FADE_INN_BARBERS: Barber[] = [
  {
    id: "real-la-fi-alex",
    name: "Alex",
    slug: "alex-the-fade-inn-barber-shop-los-angeles",
    fadeScore: 4.9,
    reviewCount: 70,
    specialties: ["Fades", "Razor Fade", "Graphic Design"],
    ...FADE_INN_SHARED,
  },
  {
    id: "real-la-fi-rami",
    name: "Rami",
    slug: "rami-the-fade-inn-barber-shop-los-angeles",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Line Up", "Tapers"],
    ...FADE_INN_SHARED,
  },
  {
    id: "real-la-fi-darwin",
    name: "Darwin",
    slug: "darwin-the-fade-inn-barber-shop-los-angeles",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Beard", "Razor Fade"],
    ...FADE_INN_SHARED,
  },
  {
    id: "real-la-fi-mary",
    name: "Mary",
    slug: "mary-the-fade-inn-barber-shop-los-angeles",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Tapers", "Styling"],
    ...FADE_INN_SHARED,
  },
];

// ── 6. Fades & Blades Barbershop ────────────────────────────────────
const FADES_BLADES_SHARED = {
  shopName: "Fades & Blades Barbershop",
  shopSlug: "fades-and-blades-barbershop-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "13619 Victory Blvd, Valley Glen, CA 91401",
  phone: "(818) 922-2335",
  instagram: "@fadesandbladesbarbershop",
  website: "https://fadesandblades.com",
  avgPrice: 35,
  reviews: [
    { platform: "yelp" as const, rating: 4.8, reviewCount: 130 },
    { platform: "google" as const, rating: 4.6, reviewCount: 59 },
  ],
  barbers: [
    { name: "Andy", slug: "andy-fades-and-blades-barbershop-los-angeles", rating: 4.9, reviewCount: 40 },
    { name: "Bree", slug: "bree-fades-and-blades-barbershop-los-angeles", rating: 4.8, reviewCount: 35 },
    { name: "Dadvo", slug: "dadvo-fades-and-blades-barbershop-los-angeles", rating: 4.8, reviewCount: 30 },
  ],
};

const FADES_BLADES_BARBERS: Barber[] = [
  {
    id: "real-la-fb-andy",
    name: "Andy",
    slug: "andy-fades-and-blades-barbershop-los-angeles",
    fadeScore: 4.9,
    reviewCount: 40,
    specialties: ["Fades", "Beard", "Razor Fade"],
    isHiddenGem: true,
    isCheap: true,
    ...FADES_BLADES_SHARED,
  },
  {
    id: "real-la-fb-bree",
    name: "Bree",
    slug: "bree-fades-and-blades-barbershop-los-angeles",
    fadeScore: 4.8,
    reviewCount: 35,
    specialties: ["Fades", "Tapers", "Dye"],
    isHiddenGem: true,
    isCheap: true,
    ...FADES_BLADES_SHARED,
  },
  {
    id: "real-la-fb-dadvo",
    name: "Dadvo",
    slug: "dadvo-fades-and-blades-barbershop-los-angeles",
    fadeScore: 4.8,
    reviewCount: 30,
    specialties: ["Fades", "Shave", "Line Up"],
    isHiddenGem: true,
    isCheap: true,
    ...FADES_BLADES_SHARED,
  },
];

// ── 7. Iconic Barbershop ────────────────────────────────────────────
const ICONIC_SHARED = {
  shopName: "Iconic Barbershop",
  shopSlug: "iconic-barbershop-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "8855 W Sunset Blvd, West Hollywood, CA 90069",
  phone: "(424) 284-3255",
  instagram: "@iconicbarbershopweho",
  website: "https://www.iconicbarbershopweho.com",
  avgPrice: 50,
  reviews: [
    { platform: "yelp" as const, rating: 4.8, reviewCount: 93 },
    { platform: "google" as const, rating: 4.9, reviewCount: 129 },
  ],
  barbers: [
    { name: "Tony", slug: "tony-iconic-barbershop-los-angeles", rating: 5.0, reviewCount: 45 },
    { name: "Ashton", slug: "ashton-iconic-barbershop-los-angeles", rating: 4.9, reviewCount: 35 },
    { name: "Eli", slug: "eli-iconic-barbershop-los-angeles", rating: 4.9, reviewCount: 30 },
  ],
};

const ICONIC_BARBERS: Barber[] = [
  {
    id: "real-la-iconic-tony",
    name: "Tony",
    slug: "tony-iconic-barbershop-los-angeles",
    fadeScore: 5.0,
    reviewCount: 45,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...ICONIC_SHARED,
  },
  {
    id: "real-la-iconic-ashton",
    name: "Ashton",
    slug: "ashton-iconic-barbershop-los-angeles",
    fadeScore: 4.9,
    reviewCount: 35,
    specialties: ["Beard Sculpting", "Fades", "Hot Towel Shave"],
    ...ICONIC_SHARED,
  },
  {
    id: "real-la-iconic-eli",
    name: "Eli",
    slug: "eli-iconic-barbershop-los-angeles",
    fadeScore: 4.9,
    reviewCount: 30,
    specialties: ["Fades", "Tapers", "Colors"],
    ...ICONIC_SHARED,
  },
];

// ── 8. Master Barbers LA ────────────────────────────────────────────
const MASTER_BARBERS_SHARED = {
  shopName: "Master Barbers LA",
  shopSlug: "master-barbers-la-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "5610 W Manchester Ave, Los Angeles, CA 90045",
  phone: "(424) 393-4015",
  instagram: "@masterbarbersla",
  website: "https://masterbarbersla.com",
  avgPrice: 45,
  reviews: [
    { platform: "yelp" as const, rating: 4.9, reviewCount: 300 },
    { platform: "google" as const, rating: 4.9, reviewCount: 233 },
  ],
  barbers: [
    { name: "Israel Castro", slug: "israel-castro-master-barbers-la-los-angeles", rating: 5.0, reviewCount: 80 },
    { name: "Ezra", slug: "ezra-master-barbers-la-los-angeles", rating: 5.0, reviewCount: 65 },
    { name: "Adrian", slug: "adrian-master-barbers-la-los-angeles", rating: 4.9, reviewCount: 55 },
    { name: "Lloyd", slug: "lloyd-master-barbers-la-los-angeles", rating: 4.8, reviewCount: 40 },
    { name: "Luna", slug: "luna-master-barbers-la-los-angeles", rating: 4.8, reviewCount: 20 },
  ],
};

const MASTER_BARBERS_LA: Barber[] = [
  {
    id: "real-la-mb-israel",
    name: "Israel Castro",
    slug: "israel-castro-master-barbers-la-los-angeles",
    fadeScore: 5.0,
    reviewCount: 80,
    specialties: ["Skin Fades", "Beard Detailing", "Straight Razor"],
    ...MASTER_BARBERS_SHARED,
  },
  {
    id: "real-la-mb-ezra",
    name: "Ezra",
    slug: "ezra-master-barbers-la-los-angeles",
    fadeScore: 5.0,
    reviewCount: 65,
    specialties: ["Fades", "Precision Cuts", "Beard"],
    ...MASTER_BARBERS_SHARED,
  },
  {
    id: "real-la-mb-adrian",
    name: "Adrian",
    slug: "adrian-master-barbers-la-los-angeles",
    fadeScore: 4.9,
    reviewCount: 55,
    specialties: ["Fades", "Scissor Cuts", "Tapers"],
    ...MASTER_BARBERS_SHARED,
  },
  {
    id: "real-la-mb-lloyd",
    name: "Lloyd",
    slug: "lloyd-master-barbers-la-los-angeles",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Beard", "Line Up"],
    ...MASTER_BARBERS_SHARED,
  },
  {
    id: "real-la-mb-luna",
    name: "Luna",
    slug: "luna-master-barbers-la-los-angeles",
    fadeScore: 4.8,
    reviewCount: 20,
    specialties: ["Fades", "Tapers"],
    ...MASTER_BARBERS_SHARED,
  },
];

// ── 9. Neighborhood Cutz ────────────────────────────────────────────
const NEIGHBORHOOD_CUTZ_SHARED = {
  shopName: "Neighborhood Cutz",
  shopSlug: "neighborhood-cutz-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "3959 Wilshire Blvd, Ste A23, Los Angeles, CA 90010",
  phone: "(213) 263-9243",
  instagram: "@neighborhoodcutz",
  website: "https://neighborhoodcutz.com",
  avgPrice: 35,
  reviews: [
    { platform: "yelp" as const, rating: 5.0, reviewCount: 132 },
    { platform: "booksy" as const, rating: 5.0, reviewCount: 559 },
    { platform: "google" as const, rating: 4.9, reviewCount: 84 },
  ],
  barbers: [
    { name: "Nacho", slug: "nacho-neighborhood-cutz-los-angeles", rating: 5.0, reviewCount: 200 },
  ],
};

const NEIGHBORHOOD_CUTZ_BARBERS: Barber[] = [
  {
    id: "real-la-nc-nacho",
    name: "Nacho",
    slug: "nacho-neighborhood-cutz-los-angeles",
    fadeScore: 5.0,
    reviewCount: 200,
    specialties: ["Fades", "Line Up", "Tapers"],
    isHiddenGem: true,
    isCheap: true,
    ...NEIGHBORHOOD_CUTZ_SHARED,
  },
];

// ── 10. Fellow Barber (Silver Lake) ─────────────────────────────────
const FELLOW_BARBER_SHARED = {
  shopName: "Fellow Barber",
  shopSlug: "fellow-barber-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "4451 W Sunset Blvd, Los Angeles, CA 90027",
  phone: "(323) 661-6535",
  instagram: "@fellowbarber",
  website: "https://www.fellowbarber.com",
  avgPrice: 40,
  reviews: [
    { platform: "yelp" as const, rating: 4.0, reviewCount: 653 },
    { platform: "google" as const, rating: 4.3, reviewCount: 350 },
  ],
  barbers: [
    { name: "Ismenia D.", slug: "ismenia-d-fellow-barber-los-angeles", rating: 4.9, reviewCount: 60 },
    { name: "Irena M.", slug: "irena-m-fellow-barber-los-angeles", rating: 4.8, reviewCount: 50 },
    { name: "Gabi M.", slug: "gabi-m-fellow-barber-los-angeles", rating: 4.8, reviewCount: 45 },
    { name: "Chris Rosson", slug: "chris-rosson-fellow-barber-los-angeles", rating: 4.7, reviewCount: 40 },
  ],
};

const FELLOW_BARBER_BARBERS: Barber[] = [
  {
    id: "real-la-fb-ismenia",
    name: "Ismenia D.",
    slug: "ismenia-d-fellow-barber-los-angeles",
    fadeScore: 4.9,
    reviewCount: 60,
    specialties: ["Scissor Cuts", "Razor Work", "Fades"],
    ...FELLOW_BARBER_SHARED,
  },
  {
    id: "real-la-fb-irena",
    name: "Irena M.",
    slug: "irena-m-fellow-barber-los-angeles",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Tapers", "Beard"],
    ...FELLOW_BARBER_SHARED,
  },
  {
    id: "real-la-fb-gabi",
    name: "Gabi M.",
    slug: "gabi-m-fellow-barber-los-angeles",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Line Up"],
    ...FELLOW_BARBER_SHARED,
  },
  {
    id: "real-la-fb-chris",
    name: "Chris Rosson",
    slug: "chris-rosson-fellow-barber-los-angeles",
    fadeScore: 4.7,
    reviewCount: 40,
    specialties: ["Fades", "Men's Grooming", "Styling"],
    ...FELLOW_BARBER_SHARED,
  },
];

// ── 11. Baxter Finley Barber & Shop ─────────────────────────────────
const BAXTER_FINLEY_SHARED = {
  shopName: "Baxter Finley Barber & Shop",
  shopSlug: "baxter-finley-barber-and-shop-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "515 N La Cienega Blvd, West Hollywood, CA 90048",
  phone: "(310) 657-4726",
  instagram: "@baxterfinley",
  website: "https://baxterofcalifornia.com/pages/baxter-finley",
  avgPrice: 59,
  reviews: [
    { platform: "yelp" as const, rating: 4.3, reviewCount: 256 },
    { platform: "google" as const, rating: 4.3, reviewCount: 111 },
    { platform: "facebook" as const, rating: 4.7, reviewCount: 224 },
  ],
  barbers: [
    { name: "Ananda", slug: "ananda-baxter-finley-barber-and-shop-los-angeles", rating: 4.9, reviewCount: 50 },
    { name: "Carmen", slug: "carmen-baxter-finley-barber-and-shop-los-angeles", rating: 4.8, reviewCount: 45 },
    { name: "Rebecah", slug: "rebecah-baxter-finley-barber-and-shop-los-angeles", rating: 4.8, reviewCount: 40 },
    { name: "Francisco", slug: "francisco-baxter-finley-barber-and-shop-los-angeles", rating: 4.7, reviewCount: 35 },
    { name: "Erik", slug: "erik-baxter-finley-barber-and-shop-los-angeles", rating: 4.7, reviewCount: 30 },
  ],
};

const BAXTER_FINLEY_BARBERS: Barber[] = [
  {
    id: "real-la-bf-ananda",
    name: "Ananda",
    slug: "ananda-baxter-finley-barber-and-shop-los-angeles",
    fadeScore: 4.9,
    reviewCount: 50,
    specialties: ["Fades", "Hot Towel Shave", "Beard"],
    ...BAXTER_FINLEY_SHARED,
  },
  {
    id: "real-la-bf-carmen",
    name: "Carmen",
    slug: "carmen-baxter-finley-barber-and-shop-los-angeles",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Precision Cuts", "Tapers"],
    ...BAXTER_FINLEY_SHARED,
  },
  {
    id: "real-la-bf-rebecah",
    name: "Rebecah",
    slug: "rebecah-baxter-finley-barber-and-shop-los-angeles",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Styling", "Beard"],
    ...BAXTER_FINLEY_SHARED,
  },
  {
    id: "real-la-bf-francisco",
    name: "Francisco",
    slug: "francisco-baxter-finley-barber-and-shop-los-angeles",
    fadeScore: 4.7,
    reviewCount: 35,
    specialties: ["Fades", "Razor Fade"],
    ...BAXTER_FINLEY_SHARED,
  },
  {
    id: "real-la-bf-erik",
    name: "Erik",
    slug: "erik-baxter-finley-barber-and-shop-los-angeles",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Tapers", "Line Up"],
    ...BAXTER_FINLEY_SHARED,
  },
];

// ── 12. Gornik & Drucker ────────────────────────────────────────────
const GORNIK_DRUCKER_SHARED = {
  shopName: "Gornik & Drucker",
  shopSlug: "gornik-and-drucker-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "225 N Canon Dr, Beverly Hills, CA 90210",
  phone: "(310) 860-7819",
  instagram: "@gornikanddrucker",
  website: "https://www.gornikanddrucker.com",
  avgPrice: 85,
  reviews: [
    { platform: "yelp" as const, rating: 4.0, reviewCount: 40 },
    { platform: "booksy" as const, rating: 4.8, reviewCount: 60 },
  ],
  barbers: [
    { name: "Joshua Joseph", slug: "joshua-joseph-gornik-and-drucker-los-angeles", rating: 4.9, reviewCount: 20 },
    { name: "Carlitos DoSouto", slug: "carlitos-dosouto-gornik-and-drucker-los-angeles", rating: 4.9, reviewCount: 18 },
    { name: "Cesar Paniagua", slug: "cesar-paniagua-gornik-and-drucker-los-angeles", rating: 4.8, reviewCount: 15 },
    { name: "Armando Reyes", slug: "armando-reyes-gornik-and-drucker-los-angeles", rating: 4.8, reviewCount: 12 },
    { name: "Gregory Gornik", slug: "gregory-gornik-gornik-and-drucker-los-angeles", rating: 4.7, reviewCount: 10 },
    { name: "Ernie Trevizo", slug: "ernie-trevizo-gornik-and-drucker-los-angeles", rating: 4.7, reviewCount: 8 },
  ],
};

const GORNIK_DRUCKER_BARBERS: Barber[] = [
  {
    id: "real-la-gd-joshua",
    name: "Joshua Joseph",
    slug: "joshua-joseph-gornik-and-drucker-los-angeles",
    fadeScore: 4.9,
    reviewCount: 20,
    specialties: ["Classic Cuts", "Straight Razor Shave", "Beard"],
    ...GORNIK_DRUCKER_SHARED,
  },
  {
    id: "real-la-gd-carlitos",
    name: "Carlitos DoSouto",
    slug: "carlitos-dosouto-gornik-and-drucker-los-angeles",
    fadeScore: 4.9,
    reviewCount: 18,
    specialties: ["Fades", "Hot Towel Shave", "Beard"],
    ...GORNIK_DRUCKER_SHARED,
  },
  {
    id: "real-la-gd-cesar",
    name: "Cesar Paniagua",
    slug: "cesar-paniagua-gornik-and-drucker-los-angeles",
    fadeScore: 4.8,
    reviewCount: 15,
    specialties: ["Executive Grooming", "Fades", "Straight Razor"],
    ...GORNIK_DRUCKER_SHARED,
  },
  {
    id: "real-la-gd-armando",
    name: "Armando Reyes",
    slug: "armando-reyes-gornik-and-drucker-los-angeles",
    fadeScore: 4.8,
    reviewCount: 12,
    specialties: ["Fades", "Classic Cuts"],
    ...GORNIK_DRUCKER_SHARED,
  },
  {
    id: "real-la-gd-gregory",
    name: "Gregory Gornik",
    slug: "gregory-gornik-gornik-and-drucker-los-angeles",
    fadeScore: 4.7,
    reviewCount: 10,
    specialties: ["Classic Cuts", "Straight Razor Shave"],
    ...GORNIK_DRUCKER_SHARED,
  },
  {
    id: "real-la-gd-ernie",
    name: "Ernie Trevizo",
    slug: "ernie-trevizo-gornik-and-drucker-los-angeles",
    fadeScore: 4.7,
    reviewCount: 8,
    specialties: ["Fades", "Beard", "Tapers"],
    ...GORNIK_DRUCKER_SHARED,
  },
];

// ── 13. The Jackal & Hare Cut Club ──────────────────────────────────
const JACKAL_HARE_SHARED = {
  shopName: "The Jackal & Hare Cut Club",
  shopSlug: "the-jackal-and-hare-cut-club-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "2470 Glendale Blvd, Los Angeles, CA 90039",
  phone: "(213) 524-3901",
  instagram: "@jackalandhare",
  website: "https://jackalandharecutclub.com",
  avgPrice: 55,
  reviews: [
    { platform: "yelp" as const, rating: 4.9, reviewCount: 76 },
    { platform: "google" as const, rating: 4.97, reviewCount: 76 },
    { platform: "booksy" as const, rating: 5.0, reviewCount: 91 },
  ],
  barbers: [
    { name: "Mel", slug: "mel-the-jackal-and-hare-cut-club-los-angeles", rating: 5.0, reviewCount: 30 },
    { name: "Tawni", slug: "tawni-the-jackal-and-hare-cut-club-los-angeles", rating: 5.0, reviewCount: 25 },
    { name: "Chunsly", slug: "chunsly-the-jackal-and-hare-cut-club-los-angeles", rating: 4.9, reviewCount: 20 },
    { name: "Ross Mendoza", slug: "ross-mendoza-the-jackal-and-hare-cut-club-los-angeles", rating: 4.9, reviewCount: 18 },
    { name: "Veebee", slug: "veebee-the-jackal-and-hare-cut-club-los-angeles", rating: 4.8, reviewCount: 15 },
  ],
};

const JACKAL_HARE_BARBERS: Barber[] = [
  {
    id: "real-la-jh-mel",
    name: "Mel",
    slug: "mel-the-jackal-and-hare-cut-club-los-angeles",
    fadeScore: 5.0,
    reviewCount: 30,
    specialties: ["Fades", "Precision Cuts", "All Hair Types"],
    ...JACKAL_HARE_SHARED,
  },
  {
    id: "real-la-jh-tawni",
    name: "Tawni",
    slug: "tawni-the-jackal-and-hare-cut-club-los-angeles",
    fadeScore: 5.0,
    reviewCount: 25,
    specialties: ["Fades", "Styling", "Tapers"],
    ...JACKAL_HARE_SHARED,
  },
  {
    id: "real-la-jh-chunsly",
    name: "Chunsly",
    slug: "chunsly-the-jackal-and-hare-cut-club-los-angeles",
    fadeScore: 4.9,
    reviewCount: 20,
    specialties: ["Fades", "Line Up", "Beard"],
    ...JACKAL_HARE_SHARED,
  },
  {
    id: "real-la-jh-ross",
    name: "Ross Mendoza",
    slug: "ross-mendoza-the-jackal-and-hare-cut-club-los-angeles",
    fadeScore: 4.9,
    reviewCount: 18,
    specialties: ["Fades", "Tapers"],
    ...JACKAL_HARE_SHARED,
  },
  {
    id: "real-la-jh-veebee",
    name: "Veebee",
    slug: "veebee-the-jackal-and-hare-cut-club-los-angeles",
    fadeScore: 4.8,
    reviewCount: 15,
    specialties: ["Fades", "Styling", "All Hair Types"],
    ...JACKAL_HARE_SHARED,
  },
];

// ── 14. Eddie's Edition (Mid Wilshire) ──────────────────────────────
const EDDIES_EDITION_SHARED = {
  shopName: "Eddie's Edition",
  shopSlug: "eddies-edition-los-angeles",
  city: "Los Angeles",
  citySlug: "los-angeles",
  state: "California",
  address: "4045 Wilshire Blvd, Los Angeles, CA 90010",
  phone: "(626) 888-8052",
  instagram: "@eddies_edition",
  website: "https://www.eddiesedition.com",
  avgPrice: 45,
  reviews: [
    { platform: "yelp" as const, rating: 4.8, reviewCount: 135 },
    { platform: "google" as const, rating: 4.9, reviewCount: 28 },
  ],
  barbers: [
    { name: "Royce", slug: "royce-eddies-edition-los-angeles", rating: 4.9, reviewCount: 25 },
    { name: "Victor", slug: "victor-eddies-edition-los-angeles", rating: 4.9, reviewCount: 22 },
    { name: "Heidi", slug: "heidi-eddies-edition-los-angeles", rating: 4.8, reviewCount: 20 },
    { name: "Ashley", slug: "ashley-eddies-edition-los-angeles", rating: 4.8, reviewCount: 18 },
    { name: "Yuna", slug: "yuna-eddies-edition-los-angeles", rating: 4.8, reviewCount: 15 },
    { name: "Jun", slug: "jun-eddies-edition-los-angeles", rating: 4.7, reviewCount: 12 },
  ],
};

const EDDIES_EDITION_BARBERS: Barber[] = [
  {
    id: "real-la-ee-royce",
    name: "Royce",
    slug: "royce-eddies-edition-los-angeles",
    fadeScore: 4.9,
    reviewCount: 25,
    specialties: ["Fades", "Precision Cuts", "Styling"],
    ...EDDIES_EDITION_SHARED,
  },
  {
    id: "real-la-ee-victor",
    name: "Victor",
    slug: "victor-eddies-edition-los-angeles",
    fadeScore: 4.9,
    reviewCount: 22,
    specialties: ["Fades", "Tapers", "Line Up"],
    ...EDDIES_EDITION_SHARED,
  },
  {
    id: "real-la-ee-heidi",
    name: "Heidi",
    slug: "heidi-eddies-edition-los-angeles",
    fadeScore: 4.8,
    reviewCount: 20,
    specialties: ["Fades", "Scissor Cuts"],
    ...EDDIES_EDITION_SHARED,
  },
  {
    id: "real-la-ee-ashley",
    name: "Ashley",
    slug: "ashley-eddies-edition-los-angeles",
    fadeScore: 4.8,
    reviewCount: 18,
    specialties: ["Fades", "Styling"],
    ...EDDIES_EDITION_SHARED,
  },
  {
    id: "real-la-ee-yuna",
    name: "Yuna",
    slug: "yuna-eddies-edition-los-angeles",
    fadeScore: 4.8,
    reviewCount: 15,
    specialties: ["Fades", "Precision Cuts"],
    ...EDDIES_EDITION_SHARED,
  },
  {
    id: "real-la-ee-jun",
    name: "Jun",
    slug: "jun-eddies-edition-los-angeles",
    fadeScore: 4.7,
    reviewCount: 12,
    specialties: ["Fades", "Tapers"],
    ...EDDIES_EDITION_SHARED,
  },
];

// Combine all LA barbers
const LA_BARBERS: Barber[] = [
  ...GREY_MATTER_BARBERS,
  ...SAINTS_BARBERS,
  ...SHORTYS_BARBERS,
  ...HANDSOME_DEVIL_BARBERS,
  ...FADE_INN_BARBERS,
  ...FADES_BLADES_BARBERS,
  ...ICONIC_BARBERS,
  ...MASTER_BARBERS_LA,
  ...NEIGHBORHOOD_CUTZ_BARBERS,
  ...FELLOW_BARBER_BARBERS,
  ...BAXTER_FINLEY_BARBERS,
  ...GORNIK_DRUCKER_BARBERS,
  ...JACKAL_HARE_BARBERS,
  ...EDDIES_EDITION_BARBERS,
];

/* ─────────────────────────────────────────────────────────────────────────────
 * NEW YORK CITY — Curated barber data
 * Researched March 2026 from Google, Yelp, Squire, Booksy & shop websites.
 * ───────────────────────────────────────────────────────────────────────────── */

// ── NYC 1. Blind Barber (East Village) ──────────────────────────────────────
const BLIND_BARBER_SHARED = {
  shopName: "Blind Barber",
  shopSlug: "blind-barber-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "339 E 10th St, New York, NY 10009",
  phone: "(212) 228-2123",
  instagram: "@blindbarber",
  website: "https://blindbarber.com",
  avgPrice: 55,
  reviews: [
    { platform: "yelp" as const, rating: 4.0, reviewCount: 570 },
    { platform: "google" as const, rating: 4.4, reviewCount: 959 },
  ],
  barbers: [
    { name: "Dan", slug: "dan-blind-barber-new-york", rating: 4.8, reviewCount: 45 },
    { name: "Dylan", slug: "dylan-blind-barber-new-york", rating: 4.9, reviewCount: 38 },
    { name: "Eli", slug: "eli-blind-barber-new-york", rating: 4.7, reviewCount: 32 },
    { name: "Jeremy", slug: "jeremy-blind-barber-new-york", rating: 4.7, reviewCount: 28 },
    { name: "Andre", slug: "andre-blind-barber-new-york", rating: 4.6, reviewCount: 22 },
    { name: "Troy", slug: "troy-blind-barber-new-york", rating: 4.8, reviewCount: 19 },
  ],
};

const BLIND_BARBER_BARBERS: Barber[] = [
  {
    id: "real-nyc-bb-dan",
    name: "Dan",
    slug: "dan-blind-barber-new-york",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Beard", "Classic Cuts"],
    ...BLIND_BARBER_SHARED,
  },
  {
    id: "real-nyc-bb-dylan",
    name: "Dylan",
    slug: "dylan-blind-barber-new-york",
    fadeScore: 4.9,
    reviewCount: 38,
    specialties: ["Fades", "Tapers", "Razor Fade"],
    ...BLIND_BARBER_SHARED,
  },
  {
    id: "real-nyc-bb-eli",
    name: "Eli",
    slug: "eli-blind-barber-new-york",
    fadeScore: 4.7,
    reviewCount: 32,
    specialties: ["Fades", "Beard"],
    ...BLIND_BARBER_SHARED,
  },
  {
    id: "real-nyc-bb-jeremy",
    name: "Jeremy",
    slug: "jeremy-blind-barber-new-york",
    fadeScore: 4.7,
    reviewCount: 28,
    specialties: ["Classic Cuts", "Tapers"],
    ...BLIND_BARBER_SHARED,
  },
  {
    id: "real-nyc-bb-andre",
    name: "Andre",
    slug: "andre-blind-barber-new-york",
    fadeScore: 4.6,
    reviewCount: 22,
    specialties: ["Fades", "Line Up"],
    ...BLIND_BARBER_SHARED,
  },
  {
    id: "real-nyc-bb-troy",
    name: "Troy",
    slug: "troy-blind-barber-new-york",
    fadeScore: 4.8,
    reviewCount: 19,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...BLIND_BARBER_SHARED,
  },
];

// ── NYC 2. Fellow Barber (West Village) ─────────────────────────────────────
const FELLOW_BARBER_WV_SHARED = {
  shopName: "Fellow Barber",
  shopSlug: "fellow-barber-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "5 Horatio St, New York, NY 10014",
  phone: "(212) 929-3917",
  instagram: "@fellowbarber",
  website: "https://www.fellowbarber.com",
  avgPrice: 60,
  reviews: [
    { platform: "yelp" as const, rating: 3.5, reviewCount: 262 },
    { platform: "google" as const, rating: 4.2, reviewCount: 480 },
  ],
  barbers: [
    { name: "Emily Clark", slug: "emily-clark-fellow-barber-new-york", rating: 4.9, reviewCount: 55 },
    { name: "Eliran M.", slug: "eliran-m-fellow-barber-new-york", rating: 4.8, reviewCount: 42 },
    { name: "Stephen Wu", slug: "stephen-wu-fellow-barber-new-york", rating: 4.7, reviewCount: 38 },
    { name: "Lex V.", slug: "lex-v-fellow-barber-new-york", rating: 4.7, reviewCount: 30 },
    { name: "Sam", slug: "sam-fellow-barber-new-york", rating: 4.9, reviewCount: 48 },
  ],
};

const FELLOW_BARBER_WV_BARBERS: Barber[] = [
  {
    id: "real-nyc-fb-emily",
    name: "Emily Clark",
    slug: "emily-clark-fellow-barber-new-york",
    fadeScore: 4.9,
    reviewCount: 55,
    specialties: ["Classic Cuts", "Tapers", "Styling"],
    ...FELLOW_BARBER_WV_SHARED,
  },
  {
    id: "real-nyc-fb-eliran",
    name: "Eliran M.",
    slug: "eliran-m-fellow-barber-new-york",
    fadeScore: 4.8,
    reviewCount: 42,
    specialties: ["Fades", "Beard", "Razor Fade"],
    ...FELLOW_BARBER_WV_SHARED,
  },
  {
    id: "real-nyc-fb-stephen",
    name: "Stephen Wu",
    slug: "stephen-wu-fellow-barber-new-york",
    fadeScore: 4.7,
    reviewCount: 38,
    specialties: ["Fades", "Tapers"],
    ...FELLOW_BARBER_WV_SHARED,
  },
  {
    id: "real-nyc-fb-lex",
    name: "Lex V.",
    slug: "lex-v-fellow-barber-new-york",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Skin Fades", "Long Cuts"],
    ...FELLOW_BARBER_WV_SHARED,
  },
  {
    id: "real-nyc-fb-sam",
    name: "Sam",
    slug: "sam-fellow-barber-new-york",
    fadeScore: 4.9,
    reviewCount: 48,
    specialties: ["Fades", "Styling", "Classic Cuts"],
    ...FELLOW_BARBER_WV_SHARED,
  },
];

// ── NYC 3. Frank's Chop Shop (Lower East Side) ─────────────────────────────
const FRANKS_CHOP_SHARED = {
  shopName: "Frank's Chop Shop",
  shopSlug: "franks-chop-shop-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "19 Essex St, New York, NY 10002",
  phone: "(212) 228-7442",
  instagram: "@frankschopshop",
  website: "http://www.frankschopshop.com",
  avgPrice: 65,
  reviews: [
    { platform: "yelp" as const, rating: 4.0, reviewCount: 137 },
    { platform: "squire" as const, rating: 4.8, reviewCount: 210 },
  ],
  barbers: [
    { name: "Pree", slug: "pree-franks-chop-shop-new-york", rating: 4.9, reviewCount: 35 },
    { name: "Hiro", slug: "hiro-franks-chop-shop-new-york", rating: 4.8, reviewCount: 28 },
    { name: "Lex", slug: "lex-franks-chop-shop-new-york", rating: 4.8, reviewCount: 25 },
    { name: "Kenbo", slug: "kenbo-franks-chop-shop-new-york", rating: 4.7, reviewCount: 22 },
    { name: "Tommy N.", slug: "tommy-n-franks-chop-shop-new-york", rating: 4.7, reviewCount: 20 },
    { name: "Julian", slug: "julian-franks-chop-shop-new-york", rating: 4.6, reviewCount: 18 },
    { name: "Zay", slug: "zay-franks-chop-shop-new-york", rating: 4.7, reviewCount: 15 },
    { name: "Abdul N.", slug: "abdul-n-franks-chop-shop-new-york", rating: 4.6, reviewCount: 12 },
  ],
};

const FRANKS_CHOP_BARBERS: Barber[] = [
  {
    id: "real-nyc-fc-pree",
    name: "Pree",
    slug: "pree-franks-chop-shop-new-york",
    fadeScore: 4.9,
    reviewCount: 35,
    specialties: ["Fades", "Beard", "Razor Shave"],
    ...FRANKS_CHOP_SHARED,
  },
  {
    id: "real-nyc-fc-hiro",
    name: "Hiro",
    slug: "hiro-franks-chop-shop-new-york",
    fadeScore: 4.8,
    reviewCount: 28,
    specialties: ["Fades", "Classic Cuts"],
    ...FRANKS_CHOP_SHARED,
  },
  {
    id: "real-nyc-fc-lex",
    name: "Lex",
    slug: "lex-franks-chop-shop-new-york",
    fadeScore: 4.8,
    reviewCount: 25,
    specialties: ["Fades", "Tapers", "Line Up"],
    ...FRANKS_CHOP_SHARED,
  },
  {
    id: "real-nyc-fc-kenbo",
    name: "Kenbo",
    slug: "kenbo-franks-chop-shop-new-york",
    fadeScore: 4.7,
    reviewCount: 22,
    specialties: ["Fades", "Beard"],
    ...FRANKS_CHOP_SHARED,
  },
  {
    id: "real-nyc-fc-tommy",
    name: "Tommy N.",
    slug: "tommy-n-franks-chop-shop-new-york",
    fadeScore: 4.7,
    reviewCount: 20,
    specialties: ["Classic Cuts", "Razor Shave"],
    ...FRANKS_CHOP_SHARED,
  },
  {
    id: "real-nyc-fc-julian",
    name: "Julian",
    slug: "julian-franks-chop-shop-new-york",
    fadeScore: 4.6,
    reviewCount: 18,
    specialties: ["Fades", "Tapers"],
    ...FRANKS_CHOP_SHARED,
  },
  {
    id: "real-nyc-fc-zay",
    name: "Zay",
    slug: "zay-franks-chop-shop-new-york",
    fadeScore: 4.7,
    reviewCount: 15,
    specialties: ["Fades", "Line Up"],
    ...FRANKS_CHOP_SHARED,
  },
  {
    id: "real-nyc-fc-abdul",
    name: "Abdul N.",
    slug: "abdul-n-franks-chop-shop-new-york",
    fadeScore: 4.6,
    reviewCount: 12,
    specialties: ["Fades", "Beard"],
    ...FRANKS_CHOP_SHARED,
  },
];

// ── NYC 4. Astor Place Hairstylists (NoHo) ─────────────────────────────────
const ASTOR_PLACE_SHARED = {
  shopName: "Astor Place Hairstylists",
  shopSlug: "astor-place-hairstylists-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "2 Astor Pl, Manhattan, NY 10003",
  phone: "(212) 475-9854",
  instagram: "@astorplacehairstylists",
  website: "https://www.astorplacehairnyc.com",
  avgPrice: 20,
  reviews: [
    { platform: "yelp" as const, rating: 3.5, reviewCount: 524 },
    { platform: "google" as const, rating: 4.1, reviewCount: 955 },
  ],
  barbers: [
    { name: "Jose", slug: "jose-astor-place-hairstylists-new-york", rating: 4.8, reviewCount: 40 },
    { name: "Regina", slug: "regina-astor-place-hairstylists-new-york", rating: 4.7, reviewCount: 30 },
    { name: "Marco", slug: "marco-astor-place-hairstylists-new-york", rating: 4.5, reviewCount: 25 },
    { name: "Luis", slug: "luis-astor-place-hairstylists-new-york", rating: 4.4, reviewCount: 20 },
  ],
};

const ASTOR_PLACE_BARBERS: Barber[] = [
  {
    id: "real-nyc-ap-jose",
    name: "Jose",
    slug: "jose-astor-place-hairstylists-new-york",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Classic Cuts", "Line Up"],
    isCheap: true,
    ...ASTOR_PLACE_SHARED,
  },
  {
    id: "real-nyc-ap-regina",
    name: "Regina",
    slug: "regina-astor-place-hairstylists-new-york",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Tapers", "Styling"],
    isCheap: true,
    ...ASTOR_PLACE_SHARED,
  },
  {
    id: "real-nyc-ap-marco",
    name: "Marco",
    slug: "marco-astor-place-hairstylists-new-york",
    fadeScore: 4.5,
    reviewCount: 25,
    specialties: ["Fades", "Beard"],
    isCheap: true,
    isHiddenGem: true,
    ...ASTOR_PLACE_SHARED,
  },
  {
    id: "real-nyc-ap-luis",
    name: "Luis",
    slug: "luis-astor-place-hairstylists-new-york",
    fadeScore: 4.4,
    reviewCount: 20,
    specialties: ["Classic Cuts", "Tapers"],
    isCheap: true,
    ...ASTOR_PLACE_SHARED,
  },
];

// ── NYC 5. Persons of Interest (Carroll Gardens, Brooklyn) ──────────────────
const POI_SHARED = {
  shopName: "Persons of Interest",
  shopSlug: "persons-of-interest-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "299 Smith St, Brooklyn, NY 11231",
  phone: "(718) 858-5300",
  instagram: "@personsofinterestbklyn",
  website: "https://www.personsofinterestbklyn.com",
  avgPrice: 45,
  reviews: [
    { platform: "yelp" as const, rating: 4.5, reviewCount: 103 },
    { platform: "google" as const, rating: 4.7, reviewCount: 119 },
  ],
  barbers: [
    { name: "Kathleen", slug: "kathleen-persons-of-interest-new-york", rating: 4.9, reviewCount: 22 },
    { name: "Danny", slug: "danny-persons-of-interest-new-york", rating: 4.8, reviewCount: 18 },
    { name: "Jess", slug: "jess-persons-of-interest-new-york", rating: 4.7, reviewCount: 15 },
    { name: "Po", slug: "po-persons-of-interest-new-york", rating: 4.7, reviewCount: 12 },
    { name: "Caroline", slug: "caroline-persons-of-interest-new-york", rating: 4.6, reviewCount: 10 },
  ],
};

const POI_BARBERS: Barber[] = [
  {
    id: "real-nyc-poi-kathleen",
    name: "Kathleen",
    slug: "kathleen-persons-of-interest-new-york",
    fadeScore: 4.9,
    reviewCount: 22,
    specialties: ["Classic Cuts", "Beard", "Razor Shave"],
    ...POI_SHARED,
  },
  {
    id: "real-nyc-poi-danny",
    name: "Danny",
    slug: "danny-persons-of-interest-new-york",
    fadeScore: 4.8,
    reviewCount: 18,
    specialties: ["Fades", "Tapers"],
    ...POI_SHARED,
  },
  {
    id: "real-nyc-poi-jess",
    name: "Jess",
    slug: "jess-persons-of-interest-new-york",
    fadeScore: 4.7,
    reviewCount: 15,
    specialties: ["Fades", "Line Up"],
    ...POI_SHARED,
  },
  {
    id: "real-nyc-poi-po",
    name: "Po",
    slug: "po-persons-of-interest-new-york",
    fadeScore: 4.7,
    reviewCount: 12,
    specialties: ["Classic Cuts", "Beard"],
    ...POI_SHARED,
  },
  {
    id: "real-nyc-poi-caroline",
    name: "Caroline",
    slug: "caroline-persons-of-interest-new-york",
    fadeScore: 4.6,
    reviewCount: 10,
    specialties: ["Fades", "Styling"],
    ...POI_SHARED,
  },
];

// ── NYC 6. Mildred New York (Lower East Side) ──────────────────────────────
const MILDRED_SHARED = {
  shopName: "Mildred New York",
  shopSlug: "mildred-new-york-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "124 Ridge St, New York, NY 10002",
  phone: "(646) 912-9332",
  instagram: "@mildrednewyork",
  website: "https://mildrednewyork.com",
  avgPrice: 62,
  reviews: [
    { platform: "yelp" as const, rating: 5.0, reviewCount: 19 },
    { platform: "google" as const, rating: 4.9, reviewCount: 239 },
  ],
  barbers: [
    { name: "Rob McMillen", slug: "rob-mcmillen-mildred-new-york-new-york", rating: 5.0, reviewCount: 30 },
    { name: "Eric Holmes", slug: "eric-holmes-mildred-new-york-new-york", rating: 4.9, reviewCount: 25 },
    { name: "Paul Langevin", slug: "paul-langevin-mildred-new-york-new-york", rating: 4.9, reviewCount: 22 },
    { name: "Logan", slug: "logan-mildred-new-york-new-york", rating: 4.8, reviewCount: 18 },
    { name: "Vinny", slug: "vinny-mildred-new-york-new-york", rating: 4.8, reviewCount: 15 },
  ],
};

const MILDRED_BARBERS: Barber[] = [
  {
    id: "real-nyc-mil-rob",
    name: "Rob McMillen",
    slug: "rob-mcmillen-mildred-new-york-new-york",
    fadeScore: 5.0,
    reviewCount: 30,
    specialties: ["Classic Cuts", "Beard", "Styling"],
    ...MILDRED_SHARED,
  },
  {
    id: "real-nyc-mil-eric",
    name: "Eric Holmes",
    slug: "eric-holmes-mildred-new-york-new-york",
    fadeScore: 4.9,
    reviewCount: 25,
    specialties: ["Fades", "Tapers", "Beard"],
    ...MILDRED_SHARED,
  },
  {
    id: "real-nyc-mil-paul",
    name: "Paul Langevin",
    slug: "paul-langevin-mildred-new-york-new-york",
    fadeScore: 4.9,
    reviewCount: 22,
    specialties: ["Classic Cuts", "Razor Shave"],
    ...MILDRED_SHARED,
  },
  {
    id: "real-nyc-mil-logan",
    name: "Logan",
    slug: "logan-mildred-new-york-new-york",
    fadeScore: 4.8,
    reviewCount: 18,
    specialties: ["Fades", "Line Up"],
    ...MILDRED_SHARED,
  },
  {
    id: "real-nyc-mil-vinny",
    name: "Vinny",
    slug: "vinny-mildred-new-york-new-york",
    fadeScore: 4.8,
    reviewCount: 15,
    specialties: ["Fades", "Beard", "Tapers"],
    ...MILDRED_SHARED,
  },
];

// ── NYC 7. Otis & Finn (Long Island City / Greenpoint) ─────────────────────
const OTIS_FINN_SHARED = {
  shopName: "Otis & Finn Barbershop",
  shopSlug: "otis-finn-barbershop-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "11-16 44th Ave, Long Island City, NY 11101",
  phone: "(718) 392-2327",
  instagram: "@otisandfinnbarbershop",
  website: "https://www.otisandfinn.com",
  avgPrice: 40,
  reviews: [
    { platform: "yelp" as const, rating: 4.5, reviewCount: 113 },
    { platform: "google" as const, rating: 4.7, reviewCount: 185 },
  ],
  barbers: [
    { name: "Fred", slug: "fred-otis-finn-barbershop-new-york", rating: 5.0, reviewCount: 28 },
    { name: "Michelle", slug: "michelle-otis-finn-barbershop-new-york", rating: 4.9, reviewCount: 22 },
    { name: "Charlie", slug: "charlie-otis-finn-barbershop-new-york", rating: 4.8, reviewCount: 20 },
    { name: "Hunter", slug: "hunter-otis-finn-barbershop-new-york", rating: 4.8, reviewCount: 18 },
    { name: "Kirk", slug: "kirk-otis-finn-barbershop-new-york", rating: 4.7, reviewCount: 15 },
    { name: "Joel", slug: "joel-otis-finn-barbershop-new-york", rating: 4.7, reviewCount: 12 },
  ],
};

const OTIS_FINN_BARBERS: Barber[] = [
  {
    id: "real-nyc-of-fred",
    name: "Fred",
    slug: "fred-otis-finn-barbershop-new-york",
    fadeScore: 5.0,
    reviewCount: 28,
    specialties: ["Fades", "Beard", "Classic Cuts"],
    ...OTIS_FINN_SHARED,
  },
  {
    id: "real-nyc-of-michelle",
    name: "Michelle",
    slug: "michelle-otis-finn-barbershop-new-york",
    fadeScore: 4.9,
    reviewCount: 22,
    specialties: ["Fades", "Tapers", "Styling"],
    ...OTIS_FINN_SHARED,
  },
  {
    id: "real-nyc-of-charlie",
    name: "Charlie",
    slug: "charlie-otis-finn-barbershop-new-york",
    fadeScore: 4.8,
    reviewCount: 20,
    specialties: ["Fades", "Line Up"],
    ...OTIS_FINN_SHARED,
  },
  {
    id: "real-nyc-of-hunter",
    name: "Hunter",
    slug: "hunter-otis-finn-barbershop-new-york",
    fadeScore: 4.8,
    reviewCount: 18,
    specialties: ["Classic Cuts", "Beard"],
    ...OTIS_FINN_SHARED,
  },
  {
    id: "real-nyc-of-kirk",
    name: "Kirk",
    slug: "kirk-otis-finn-barbershop-new-york",
    fadeScore: 4.7,
    reviewCount: 15,
    specialties: ["Fades", "Tapers"],
    ...OTIS_FINN_SHARED,
  },
  {
    id: "real-nyc-of-joel",
    name: "Joel",
    slug: "joel-otis-finn-barbershop-new-york",
    fadeScore: 4.7,
    reviewCount: 12,
    specialties: ["Fades", "Beard"],
    ...OTIS_FINN_SHARED,
  },
];

// ── NYC 8. Made Man Barbershop (Greenwich Village) ─────────────────────────
const MADE_MAN_SHARED = {
  shopName: "Made Man Barbershop",
  shopSlug: "made-man-barbershop-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "60 E 8th St, New York, NY 10003",
  phone: "(212) 598-1840",
  instagram: "@mademan.barber",
  website: "https://mademanbarber.com",
  avgPrice: 40,
  reviews: [
    { platform: "yelp" as const, rating: 4.5, reviewCount: 569 },
    { platform: "google" as const, rating: 4.9, reviewCount: 1521 },
  ],
  barbers: [
    { name: "Adam", slug: "adam-made-man-barbershop-new-york", rating: 4.9, reviewCount: 45 },
    { name: "Ely", slug: "ely-made-man-barbershop-new-york", rating: 4.8, reviewCount: 38 },
    { name: "Steve", slug: "steve-made-man-barbershop-new-york", rating: 4.8, reviewCount: 35 },
    { name: "Richie", slug: "richie-made-man-barbershop-new-york", rating: 4.7, reviewCount: 30 },
    { name: "Dennis", slug: "dennis-made-man-barbershop-new-york", rating: 4.7, reviewCount: 25 },
    { name: "Shams", slug: "shams-made-man-barbershop-new-york", rating: 4.6, reviewCount: 20 },
  ],
};

const MADE_MAN_BARBERS: Barber[] = [
  {
    id: "real-nyc-mm-adam",
    name: "Adam",
    slug: "adam-made-man-barbershop-new-york",
    fadeScore: 4.9,
    reviewCount: 45,
    specialties: ["Fades", "Beard", "Line Up"],
    ...MADE_MAN_SHARED,
  },
  {
    id: "real-nyc-mm-ely",
    name: "Ely",
    slug: "ely-made-man-barbershop-new-york",
    fadeScore: 4.8,
    reviewCount: 38,
    specialties: ["Fades", "Styling", "Classic Cuts"],
    ...MADE_MAN_SHARED,
  },
  {
    id: "real-nyc-mm-steve",
    name: "Steve",
    slug: "steve-made-man-barbershop-new-york",
    fadeScore: 4.8,
    reviewCount: 35,
    specialties: ["Fades", "Tapers"],
    ...MADE_MAN_SHARED,
  },
  {
    id: "real-nyc-mm-richie",
    name: "Richie",
    slug: "richie-made-man-barbershop-new-york",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Beard", "Razor Shave"],
    ...MADE_MAN_SHARED,
  },
  {
    id: "real-nyc-mm-dennis",
    name: "Dennis",
    slug: "dennis-made-man-barbershop-new-york",
    fadeScore: 4.7,
    reviewCount: 25,
    specialties: ["Fades", "Line Up"],
    ...MADE_MAN_SHARED,
  },
  {
    id: "real-nyc-mm-shams",
    name: "Shams",
    slug: "shams-made-man-barbershop-new-york",
    fadeScore: 4.6,
    reviewCount: 20,
    specialties: ["Fades", "Tapers", "Beard"],
    ...MADE_MAN_SHARED,
  },
];

// ── NYC 9. Pall Mall Barbers (Midtown / Rockefeller Center) ────────────────
const PALL_MALL_SHARED = {
  shopName: "Pall Mall Barbers",
  shopSlug: "pall-mall-barbers-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "10 Rockefeller Plaza, New York, NY 10020",
  phone: "(212) 586-2220",
  instagram: "@pallmallbarbers.nyc",
  website: "https://www.pallmallbarbers.nyc",
  avgPrice: 55,
  reviews: [
    { platform: "yelp" as const, rating: 4.0, reviewCount: 29 },
    { platform: "google" as const, rating: 5.0, reviewCount: 150 },
  ],
  barbers: [
    { name: "Kelli", slug: "kelli-pall-mall-barbers-new-york", rating: 4.9, reviewCount: 20 },
    { name: "O.D.", slug: "od-pall-mall-barbers-new-york", rating: 4.8, reviewCount: 18 },
    { name: "Claribel", slug: "claribel-pall-mall-barbers-new-york", rating: 4.7, reviewCount: 12 },
    { name: "Olivia", slug: "olivia-pall-mall-barbers-new-york", rating: 4.7, reviewCount: 10 },
  ],
};

const PALL_MALL_BARBERS_NYC: Barber[] = [
  {
    id: "real-nyc-pm-kelli",
    name: "Kelli",
    slug: "kelli-pall-mall-barbers-new-york",
    fadeScore: 4.9,
    reviewCount: 20,
    specialties: ["Classic Cuts", "Beard", "Hot Towel Shave"],
    ...PALL_MALL_SHARED,
  },
  {
    id: "real-nyc-pm-od",
    name: "O.D.",
    slug: "od-pall-mall-barbers-new-york",
    fadeScore: 4.8,
    reviewCount: 18,
    specialties: ["Fades", "Beard", "Line Up"],
    ...PALL_MALL_SHARED,
  },
  {
    id: "real-nyc-pm-claribel",
    name: "Claribel",
    slug: "claribel-pall-mall-barbers-new-york",
    fadeScore: 4.7,
    reviewCount: 12,
    specialties: ["Fades", "Tapers"],
    ...PALL_MALL_SHARED,
  },
  {
    id: "real-nyc-pm-olivia",
    name: "Olivia",
    slug: "olivia-pall-mall-barbers-new-york",
    fadeScore: 4.7,
    reviewCount: 10,
    specialties: ["Classic Cuts", "Styling"],
    ...PALL_MALL_SHARED,
  },
];

// ── NYC 10. Cut Shop (Greenpoint, Brooklyn -- formerly Tomcats) ─────────────
const CUT_SHOP_SHARED = {
  shopName: "Cut Shop",
  shopSlug: "cut-shop-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "191 Nassau Ave, Brooklyn, NY 11222",
  phone: "(347) 294-0509",
  instagram: "@cutshopnyc",
  website: "https://www.cutshopnyc.com",
  avgPrice: 45,
  reviews: [
    { platform: "yelp" as const, rating: 4.5, reviewCount: 20 },
    { platform: "google" as const, rating: 4.8, reviewCount: 95 },
  ],
  barbers: [
    { name: "Jonny", slug: "jonny-cut-shop-new-york", rating: 4.9, reviewCount: 25 },
    { name: "Manny", slug: "manny-cut-shop-new-york", rating: 4.8, reviewCount: 18 },
    { name: "Yuliy", slug: "yuliy-cut-shop-new-york", rating: 4.7, reviewCount: 15 },
    { name: "Derek", slug: "derek-cut-shop-new-york", rating: 4.8, reviewCount: 20 },
  ],
};

const CUT_SHOP_BARBERS: Barber[] = [
  {
    id: "real-nyc-cs-jonny",
    name: "Jonny",
    slug: "jonny-cut-shop-new-york",
    fadeScore: 4.9,
    reviewCount: 25,
    specialties: ["Fades", "Classic Cuts", "Pompadour"],
    ...CUT_SHOP_SHARED,
  },
  {
    id: "real-nyc-cs-manny",
    name: "Manny",
    slug: "manny-cut-shop-new-york",
    fadeScore: 4.8,
    reviewCount: 18,
    specialties: ["Fades", "Tapers", "Beard"],
    ...CUT_SHOP_SHARED,
  },
  {
    id: "real-nyc-cs-yuliy",
    name: "Yuliy",
    slug: "yuliy-cut-shop-new-york",
    fadeScore: 4.7,
    reviewCount: 15,
    specialties: ["Fades", "Line Up"],
    ...CUT_SHOP_SHARED,
  },
  {
    id: "real-nyc-cs-derek",
    name: "Derek",
    slug: "derek-cut-shop-new-york",
    fadeScore: 4.8,
    reviewCount: 20,
    specialties: ["Classic Cuts", "Undercut", "Fades"],
    ...CUT_SHOP_SHARED,
  },
];

// ── NYC 11. Ace of Fades (Chelsea) ──────────────────────────────────────────
const ACE_FADES_SHARED = {
  shopName: "Ace of Fades Barber Shop",
  shopSlug: "ace-of-fades-barber-shop-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "128 8th Ave, New York, NY 10011",
  phone: "(332) 222-8568",
  instagram: "@aceoffadesny",
  website: "https://aceoffadesbarbershop.org",
  avgPrice: 45,
  reviews: [
    { platform: "yelp" as const, rating: 4.5, reviewCount: 36 },
    { platform: "booksy" as const, rating: 4.8, reviewCount: 85 },
  ],
  barbers: [
    { name: "Julia", slug: "julia-ace-of-fades-barber-shop-new-york", rating: 4.9, reviewCount: 22 },
    { name: "CJ", slug: "cj-ace-of-fades-barber-shop-new-york", rating: 4.8, reviewCount: 18 },
    { name: "Lilia", slug: "lilia-ace-of-fades-barber-shop-new-york", rating: 4.7, reviewCount: 15 },
    { name: "Arthur", slug: "arthur-ace-of-fades-barber-shop-new-york", rating: 4.8, reviewCount: 20 },
  ],
};

const ACE_FADES_BARBERS: Barber[] = [
  {
    id: "real-nyc-aof-julia",
    name: "Julia",
    slug: "julia-ace-of-fades-barber-shop-new-york",
    fadeScore: 4.9,
    reviewCount: 22,
    specialties: ["Fades", "Tapers", "Beard"],
    ...ACE_FADES_SHARED,
  },
  {
    id: "real-nyc-aof-cj",
    name: "CJ",
    slug: "cj-ace-of-fades-barber-shop-new-york",
    fadeScore: 4.8,
    reviewCount: 18,
    specialties: ["Fades", "Line Up", "Razor Fade"],
    ...ACE_FADES_SHARED,
  },
  {
    id: "real-nyc-aof-lilia",
    name: "Lilia",
    slug: "lilia-ace-of-fades-barber-shop-new-york",
    fadeScore: 4.7,
    reviewCount: 15,
    specialties: ["Fades", "Styling"],
    ...ACE_FADES_SHARED,
  },
  {
    id: "real-nyc-aof-arthur",
    name: "Arthur",
    slug: "arthur-ace-of-fades-barber-shop-new-york",
    fadeScore: 4.8,
    reviewCount: 20,
    specialties: ["Fades", "Classic Cuts", "Beard"],
    ...ACE_FADES_SHARED,
  },
];

// ── NYC 12. Filthy Rich Barbershop (Williamsburg, Brooklyn) ─────────────────
const FILTHY_RICH_SHARED = {
  shopName: "Filthy Rich Barbershop",
  shopSlug: "filthy-rich-barbershop-new-york",
  city: "New York",
  citySlug: "new-york",
  state: "New York",
  address: "148 Havemeyer St, Brooklyn, NY 11211",
  phone: "(718) 396-3300",
  instagram: "@filthyrichbarbershop",
  website: "https://filthyrichbarbershop.com",
  avgPrice: 45,
  reviews: [
    { platform: "yelp" as const, rating: 4.5, reviewCount: 46 },
    { platform: "google" as const, rating: 4.7, reviewCount: 120 },
  ],
  barbers: [
    { name: "Ronnie J.", slug: "ronnie-j-filthy-rich-barbershop-new-york", rating: 4.9, reviewCount: 25 },
    { name: "Faze", slug: "faze-filthy-rich-barbershop-new-york", rating: 4.8, reviewCount: 20 },
    { name: "Tony", slug: "tony-filthy-rich-barbershop-new-york", rating: 4.7, reviewCount: 18 },
    { name: "Jefferson B. Ramos", slug: "jefferson-b-ramos-filthy-rich-barbershop-new-york", rating: 4.6, reviewCount: 12 },
  ],
};

const FILTHY_RICH_BARBERS: Barber[] = [
  {
    id: "real-nyc-fr-ronnie",
    name: "Ronnie J.",
    slug: "ronnie-j-filthy-rich-barbershop-new-york",
    fadeScore: 4.9,
    reviewCount: 25,
    specialties: ["Fades", "Tapers", "Line Up"],
    ...FILTHY_RICH_SHARED,
  },
  {
    id: "real-nyc-fr-faze",
    name: "Faze",
    slug: "faze-filthy-rich-barbershop-new-york",
    fadeScore: 4.8,
    reviewCount: 20,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...FILTHY_RICH_SHARED,
  },
  {
    id: "real-nyc-fr-tony",
    name: "Tony",
    slug: "tony-filthy-rich-barbershop-new-york",
    fadeScore: 4.7,
    reviewCount: 18,
    specialties: ["Fades", "Classic Cuts"],
    ...FILTHY_RICH_SHARED,
  },
  {
    id: "real-nyc-fr-jefferson",
    name: "Jefferson B. Ramos",
    slug: "jefferson-b-ramos-filthy-rich-barbershop-new-york",
    fadeScore: 4.6,
    reviewCount: 12,
    specialties: ["Fades", "Tapers", "Beard"],
    ...FILTHY_RICH_SHARED,
  },
];

// Combine all NYC barbers
const NYC_BARBERS: Barber[] = [
  ...BLIND_BARBER_BARBERS,
  ...FELLOW_BARBER_WV_BARBERS,
  ...FRANKS_CHOP_BARBERS,
  ...ASTOR_PLACE_BARBERS,
  ...POI_BARBERS,
  ...MILDRED_BARBERS,
  ...OTIS_FINN_BARBERS,
  ...MADE_MAN_BARBERS,
  ...PALL_MALL_BARBERS_NYC,
  ...CUT_SHOP_BARBERS,
  ...ACE_FADES_BARBERS,
  ...FILTHY_RICH_BARBERS,
];

/* ─────────────────────────────────────────────────────────────────────────────
 * DALLAS, TX — Curated barber data
 * Researched March 2026 from Google, Yelp, Booksy, Squire, Birdeye, Fresha
 * & shop websites.
 * ───────────────────────────────────────────────────────────────────────────── */

const DALLAS_CITY = {
  city: "Dallas",
  citySlug: "dallas",
  state: "Texas",
};

// ── DAL 1. Kutinfed Barbershop ──────────────────────────────────────────────
const KUTINFED_SHARED = {
  shopName: "Kutinfed Barbershop",
  shopSlug: "kutinfed-barbershop-dallas",
  ...DALLAS_CITY,
  address: "6514 Skillman St, Dallas, TX 75231",
  phone: "(214) 517-8741",
  instagram: "@kutinfed",
  website: "https://kutinfed.com",
  avgPrice: 30,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 616 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 71 },
  ],
  barbers: [
    { name: "Bry", slug: "bry-kutinfed-barbershop-dallas", rating: 4.9, reviewCount: 85 },
    { name: "Chyno", slug: "chyno-kutinfed-barbershop-dallas", rating: 4.9, reviewCount: 72 },
    { name: "Deshaun", slug: "deshaun-kutinfed-barbershop-dallas", rating: 4.8, reviewCount: 60 },
    { name: "Round", slug: "round-kutinfed-barbershop-dallas", rating: 4.8, reviewCount: 55 },
    { name: "D", slug: "d-kutinfed-barbershop-dallas", rating: 4.7, reviewCount: 50 },
    { name: "Black", slug: "black-kutinfed-barbershop-dallas", rating: 4.7, reviewCount: 48 },
  ],
};

const KUTINFED_BARBERS: Barber[] = [
  {
    id: "real-dal-kutinfed-bry",
    name: "Bry",
    slug: "bry-kutinfed-barbershop-dallas",
    fadeScore: 4.9,
    reviewCount: 85,
    specialties: ["Fades", "Precision Scissors", "Bald Fades"],
    ...KUTINFED_SHARED,
  },
  {
    id: "real-dal-kutinfed-chyno",
    name: "Chyno",
    slug: "chyno-kutinfed-barbershop-dallas",
    fadeScore: 4.9,
    reviewCount: 72,
    specialties: ["Fades", "Designs", "Tapers"],
    ...KUTINFED_SHARED,
  },
  {
    id: "real-dal-kutinfed-deshaun",
    name: "Deshaun",
    slug: "deshaun-kutinfed-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 60,
    specialties: ["Fades", "Beard"],
    ...KUTINFED_SHARED,
  },
  {
    id: "real-dal-kutinfed-round",
    name: "Round",
    slug: "round-kutinfed-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 55,
    specialties: ["Fades", "Tapers"],
    ...KUTINFED_SHARED,
  },
  {
    id: "real-dal-kutinfed-d",
    name: "D",
    slug: "d-kutinfed-barbershop-dallas",
    fadeScore: 4.7,
    reviewCount: 50,
    specialties: ["Fades", "Line Up"],
    ...KUTINFED_SHARED,
  },
  {
    id: "real-dal-kutinfed-black",
    name: "Black",
    slug: "black-kutinfed-barbershop-dallas",
    fadeScore: 4.7,
    reviewCount: 48,
    specialties: ["Fades", "Beard"],
    ...KUTINFED_SHARED,
  },
];

// ── DAL 2. Blade 21 Barbershop ─────────────────────────────────────────────
const BLADE21_SHARED = {
  shopName: "Blade 21 Barbershop",
  shopSlug: "blade-21-barbershop-dallas",
  ...DALLAS_CITY,
  address: "12101 Greenville Ave, Ste 108, Dallas, TX 75243",
  phone: "(214) 258-5891",
  instagram: "@blade21barbershop",
  website: "https://blade21barbershop.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 441 },
  ],
  barbers: [
    { name: "Benu", slug: "benu-blade-21-barbershop-dallas", rating: 5.0, reviewCount: 120 },
    { name: "Calvin", slug: "calvin-blade-21-barbershop-dallas", rating: 4.9, reviewCount: 95 },
    { name: "Kevin", slug: "kevin-blade-21-barbershop-dallas", rating: 4.8, reviewCount: 80 },
    { name: "Marcus", slug: "marcus-blade-21-barbershop-dallas", rating: 4.8, reviewCount: 70 },
    { name: "Cash", slug: "cash-blade-21-barbershop-dallas", rating: 4.7, reviewCount: 55 },
  ],
};

const BLADE21_BARBERS: Barber[] = [
  {
    id: "real-dal-blade21-benu",
    name: "Benu",
    slug: "benu-blade-21-barbershop-dallas",
    fadeScore: 5.0,
    reviewCount: 120,
    specialties: ["Fades", "Precision Cuts", "Beard"],
    ...BLADE21_SHARED,
  },
  {
    id: "real-dal-blade21-calvin",
    name: "Calvin",
    slug: "calvin-blade-21-barbershop-dallas",
    fadeScore: 4.9,
    reviewCount: 95,
    specialties: ["Fades", "Tapers"],
    ...BLADE21_SHARED,
  },
  {
    id: "real-dal-blade21-kevin",
    name: "Kevin",
    slug: "kevin-blade-21-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 80,
    specialties: ["Fades", "Trendy Styles"],
    ...BLADE21_SHARED,
  },
  {
    id: "real-dal-blade21-marcus",
    name: "Marcus",
    slug: "marcus-blade-21-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 70,
    specialties: ["Beard", "Fades", "Line Up"],
    ...BLADE21_SHARED,
  },
  {
    id: "real-dal-blade21-cash",
    name: "Cash",
    slug: "cash-blade-21-barbershop-dallas",
    fadeScore: 4.7,
    reviewCount: 55,
    specialties: ["Fades", "Designs"],
    ...BLADE21_SHARED,
  },
];

// ── DAL 3. HQ Barbershop ───────────────────────────────────────────────────
const HQ_SHARED = {
  shopName: "HQ Barbershop",
  shopSlug: "hq-barbershop-dallas",
  ...DALLAS_CITY,
  address: "3527 Oak Lawn Ave, Dallas, TX 75219",
  phone: "(214) 741-1744",
  instagram: "@hqbarbershop.ig",
  website: "https://thehqbarbershop.com",
  avgPrice: 50,
  reviews: [
    { platform: "google" as const, rating: 5.0, reviewCount: 167 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 178 },
  ],
  barbers: [
    { name: "Jordan Kiswani", slug: "jordan-kiswani-hq-barbershop-dallas", rating: 5.0, reviewCount: 45 },
    { name: "Anwar", slug: "anwar-hq-barbershop-dallas", rating: 4.9, reviewCount: 38 },
    { name: "Taylor", slug: "taylor-hq-barbershop-dallas", rating: 4.9, reviewCount: 35 },
    { name: "Marcus", slug: "marcus-hq-barbershop-dallas", rating: 4.8, reviewCount: 30 },
    { name: "Daniela Perez", slug: "daniela-perez-hq-barbershop-dallas", rating: 4.8, reviewCount: 28 },
    { name: "Brie Dunn", slug: "brie-dunn-hq-barbershop-dallas", rating: 4.8, reviewCount: 25 },
    { name: "Steve", slug: "steve-hq-barbershop-dallas", rating: 4.7, reviewCount: 20 },
    { name: "Jenny", slug: "jenny-hq-barbershop-dallas", rating: 4.7, reviewCount: 18 },
  ],
};

const HQ_BARBERS: Barber[] = [
  {
    id: "real-dal-hq-jordan",
    name: "Jordan Kiswani",
    slug: "jordan-kiswani-hq-barbershop-dallas",
    fadeScore: 5.0,
    reviewCount: 45,
    specialties: ["Fades", "Beard", "Hot Towel Shave"],
    ...HQ_SHARED,
  },
  {
    id: "real-dal-hq-anwar",
    name: "Anwar",
    slug: "anwar-hq-barbershop-dallas",
    fadeScore: 4.9,
    reviewCount: 38,
    specialties: ["Fades", "Beard", "Line Up"],
    ...HQ_SHARED,
  },
  {
    id: "real-dal-hq-taylor",
    name: "Taylor",
    slug: "taylor-hq-barbershop-dallas",
    fadeScore: 4.9,
    reviewCount: 35,
    specialties: ["Fades", "Tapers"],
    ...HQ_SHARED,
  },
  {
    id: "real-dal-hq-marcus",
    name: "Marcus",
    slug: "marcus-hq-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 30,
    specialties: ["Fades", "Precision Cuts"],
    ...HQ_SHARED,
  },
  {
    id: "real-dal-hq-daniela",
    name: "Daniela Perez",
    slug: "daniela-perez-hq-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 28,
    specialties: ["Fades", "Beard"],
    ...HQ_SHARED,
  },
  {
    id: "real-dal-hq-brie",
    name: "Brie Dunn",
    slug: "brie-dunn-hq-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 25,
    specialties: ["Fades", "Tapers", "Beard"],
    ...HQ_SHARED,
  },
  {
    id: "real-dal-hq-steve",
    name: "Steve",
    slug: "steve-hq-barbershop-dallas",
    fadeScore: 4.7,
    reviewCount: 20,
    specialties: ["Fades", "Line Up"],
    ...HQ_SHARED,
  },
  {
    id: "real-dal-hq-jenny",
    name: "Jenny",
    slug: "jenny-hq-barbershop-dallas",
    fadeScore: 4.7,
    reviewCount: 18,
    specialties: ["Fades", "Precision Cuts"],
    ...HQ_SHARED,
  },
];

// ── DAL 4. The Pegasus Barbershop ──────────────────────────────────────────
const PEGASUS_SHARED = {
  shopName: "The Pegasus Barbershop",
  shopSlug: "the-pegasus-barbershop-dallas",
  ...DALLAS_CITY,
  address: "222 S St Paul St, Ste 110, Dallas, TX 75201",
  phone: "(972) 754-5490",
  website: "https://pegasusbarbershop.com",
  avgPrice: 45,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 93 },
  ],
  barbers: [
    { name: "Steven Lopez", slug: "steven-lopez-the-pegasus-barbershop-dallas", rating: 5.0, reviewCount: 93 },
  ],
};

const PEGASUS_BARBERS: Barber[] = [
  {
    id: "real-dal-pegasus-steven",
    name: "Steven Lopez",
    slug: "steven-lopez-the-pegasus-barbershop-dallas",
    fadeScore: 4.9,
    reviewCount: 93,
    specialties: ["Fades", "Razor Fade", "Beard", "Hot Towel Shave"],
    ...PEGASUS_SHARED,
  },
];

// ── DAL 5. Rob's Chop Shop ────────────────────────────────────────────────
const ROBS_SHARED = {
  shopName: "Rob's Chop Shop",
  shopSlug: "robs-chop-shop-dallas",
  ...DALLAS_CITY,
  address: "3613 Parry Ave, Dallas, TX 75226",
  phone: "(214) 824-7627",
  website: "https://www.robschopshop.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 412 },
    { platform: "yelp" as const, rating: 4.7, reviewCount: 127 },
  ],
  barbers: [
    { name: "Rob", slug: "rob-robs-chop-shop-dallas", rating: 4.9, reviewCount: 200 },
  ],
};

const ROBS_BARBERS: Barber[] = [
  {
    id: "real-dal-robs-rob",
    name: "Rob",
    slug: "rob-robs-chop-shop-dallas",
    fadeScore: 4.9,
    reviewCount: 200,
    specialties: ["Classic Cuts", "Tapers", "Hot Towel Shave"],
    ...ROBS_SHARED,
  },
];

// ── DAL 6. Dallas Fades Barbershop ─────────────────────────────────────────
const DALLAS_FADES_SHARED = {
  shopName: "Dallas Fades Barbershop",
  shopSlug: "dallas-fades-barbershop-dallas",
  ...DALLAS_CITY,
  address: "124 N Peak St, Dallas, TX 75226",
  phone: "(972) 807-2072",
  instagram: "@dallasfadesofficial",
  website: "https://dallasfadesofficial.com",
  avgPrice: 25,
  reviews: [
    { platform: "google" as const, rating: 4.4, reviewCount: 570 },
    { platform: "yelp" as const, rating: 3.6, reviewCount: 89 },
    { platform: "facebook" as const, rating: 4.8, reviewCount: 63 },
  ],
  barbers: [
    { name: "Jean", slug: "jean-dallas-fades-barbershop-dallas", rating: 4.8, reviewCount: 65 },
    { name: "Greg", slug: "greg-dallas-fades-barbershop-dallas", rating: 4.7, reviewCount: 58 },
    { name: "Sergio", slug: "sergio-dallas-fades-barbershop-dallas", rating: 4.7, reviewCount: 52 },
    { name: "Mr. Ant", slug: "mr-ant-dallas-fades-barbershop-dallas", rating: 4.7, reviewCount: 48 },
    { name: "Alex", slug: "alex-dallas-fades-barbershop-dallas", rating: 4.6, reviewCount: 42 },
    { name: "Bryan", slug: "bryan-dallas-fades-barbershop-dallas", rating: 4.6, reviewCount: 40 },
    { name: "Robbie", slug: "robbie-dallas-fades-barbershop-dallas", rating: 4.5, reviewCount: 35 },
    { name: "Mickey", slug: "mickey-dallas-fades-barbershop-dallas", rating: 4.5, reviewCount: 30 },
    { name: "KA", slug: "ka-dallas-fades-barbershop-dallas", rating: 4.5, reviewCount: 28 },
  ],
};

const DALLAS_FADES_BARBERS: Barber[] = [
  {
    id: "real-dal-dfades-jean",
    name: "Jean",
    slug: "jean-dallas-fades-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 65,
    specialties: ["Fades", "Bald Fades", "Beard"],
    isCheap: true,
    ...DALLAS_FADES_SHARED,
  },
  {
    id: "real-dal-dfades-greg",
    name: "Greg",
    slug: "greg-dallas-fades-barbershop-dallas",
    fadeScore: 4.7,
    reviewCount: 58,
    specialties: ["Fades", "Tapers"],
    isCheap: true,
    ...DALLAS_FADES_SHARED,
  },
  {
    id: "real-dal-dfades-sergio",
    name: "Sergio",
    slug: "sergio-dallas-fades-barbershop-dallas",
    fadeScore: 4.7,
    reviewCount: 52,
    specialties: ["Fades", "Beard Fade"],
    isCheap: true,
    ...DALLAS_FADES_SHARED,
  },
  {
    id: "real-dal-dfades-mrant",
    name: "Mr. Ant",
    slug: "mr-ant-dallas-fades-barbershop-dallas",
    fadeScore: 4.7,
    reviewCount: 48,
    specialties: ["Fades", "Designs"],
    isCheap: true,
    ...DALLAS_FADES_SHARED,
  },
  {
    id: "real-dal-dfades-alex",
    name: "Alex",
    slug: "alex-dallas-fades-barbershop-dallas",
    fadeScore: 4.6,
    reviewCount: 42,
    specialties: ["Fades", "Line Up"],
    isCheap: true,
    ...DALLAS_FADES_SHARED,
  },
  {
    id: "real-dal-dfades-bryan",
    name: "Bryan",
    slug: "bryan-dallas-fades-barbershop-dallas",
    fadeScore: 4.6,
    reviewCount: 40,
    specialties: ["Fades", "Beard"],
    isCheap: true,
    ...DALLAS_FADES_SHARED,
  },
  {
    id: "real-dal-dfades-robbie",
    name: "Robbie",
    slug: "robbie-dallas-fades-barbershop-dallas",
    fadeScore: 4.5,
    reviewCount: 35,
    specialties: ["Fades", "Tapers"],
    isCheap: true,
    ...DALLAS_FADES_SHARED,
  },
  {
    id: "real-dal-dfades-mickey",
    name: "Mickey",
    slug: "mickey-dallas-fades-barbershop-dallas",
    fadeScore: 4.5,
    reviewCount: 30,
    specialties: ["Fades", "Burst Fade"],
    isCheap: true,
    ...DALLAS_FADES_SHARED,
  },
  {
    id: "real-dal-dfades-ka",
    name: "KA",
    slug: "ka-dallas-fades-barbershop-dallas",
    fadeScore: 4.5,
    reviewCount: 28,
    specialties: ["Fades", "Color Enhancement"],
    isCheap: true,
    ...DALLAS_FADES_SHARED,
  },
];

// ── DAL 7. Sovereign Barber Shop ──────────────────────────────────────────
const SOVEREIGN_SHARED = {
  shopName: "Sovereign Barber Shop",
  shopSlug: "sovereign-barber-shop-dallas",
  ...DALLAS_CITY,
  address: "400 N Akard St, Ste 106, Dallas, TX 75201",
  phone: "(214) 741-4489",
  website: "https://www.sovereignbarbers.com",
  avgPrice: 25,
  reviews: [
    { platform: "google" as const, rating: 4.4, reviewCount: 74 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 45 },
  ],
  barbers: [
    { name: "Roberto", slug: "roberto-sovereign-barber-shop-dallas", rating: 4.9, reviewCount: 30 },
    { name: "Juke Higgins", slug: "juke-higgins-sovereign-barber-shop-dallas", rating: 4.7, reviewCount: 22 },
    { name: "Ryan Standifer", slug: "ryan-standifer-sovereign-barber-shop-dallas", rating: 4.6, reviewCount: 18 },
  ],
};

const SOVEREIGN_BARBERS: Barber[] = [
  {
    id: "real-dal-sov-roberto",
    name: "Roberto",
    slug: "roberto-sovereign-barber-shop-dallas",
    fadeScore: 4.9,
    reviewCount: 30,
    specialties: ["Fades", "Classic Cuts", "Beard"],
    isCheap: true,
    ...SOVEREIGN_SHARED,
  },
  {
    id: "real-dal-sov-juke",
    name: "Juke Higgins",
    slug: "juke-higgins-sovereign-barber-shop-dallas",
    fadeScore: 4.7,
    reviewCount: 22,
    specialties: ["Fades", "All Textures", "Military Cuts"],
    isCheap: true,
    ...SOVEREIGN_SHARED,
  },
  {
    id: "real-dal-sov-ryan",
    name: "Ryan Standifer",
    slug: "ryan-standifer-sovereign-barber-shop-dallas",
    fadeScore: 4.6,
    reviewCount: 18,
    specialties: ["Fades", "Tapers"],
    isCheap: true,
    ...SOVEREIGN_SHARED,
  },
];

// ── DAL 8. The Fade Shop ──────────────────────────────────────────────────
const FADE_SHOP_SHARED = {
  shopName: "The Fade Shop",
  shopSlug: "the-fade-shop-dallas",
  ...DALLAS_CITY,
  address: "18900 Dallas Pkwy, Ste 107, Dallas, TX 75287",
  phone: "(972) 930-9910",
  website: "http://fadeshop.com",
  avgPrice: 30,
  reviews: [
    { platform: "google" as const, rating: 4.5, reviewCount: 89 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 39 },
    { platform: "facebook" as const, rating: 4.8, reviewCount: 214 },
  ],
  barbers: [
    { name: "Ozell Graham", slug: "ozell-graham-the-fade-shop-dallas", rating: 4.8, reviewCount: 50 },
  ],
};

const FADE_SHOP_BARBERS: Barber[] = [
  {
    id: "real-dal-fadeshop-ozell",
    name: "Ozell Graham",
    slug: "ozell-graham-the-fade-shop-dallas",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Precision Cuts", "Beard", "Designer Cuts"],
    ...FADE_SHOP_SHARED,
  },
];

// ── DAL 9. Scissors & Scotch ──────────────────────────────────────────────
const SCISSORS_SCOTCH_SHARED = {
  shopName: "Scissors & Scotch",
  shopSlug: "scissors-and-scotch-dallas",
  ...DALLAS_CITY,
  address: "100 Crescent Ct, Ste 150, Dallas, TX 75201",
  phone: "(469) 206-0394",
  instagram: "@scissorsscotch",
  website: "https://scissorsscotch.com/locations/tx/dallas/uptown/",
  avgPrice: 48,
  reviews: [
    { platform: "google" as const, rating: 4.2, reviewCount: 150 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 53 },
  ],
  barbers: [
    { name: "Kryz", slug: "kryz-scissors-and-scotch-dallas", rating: 4.8, reviewCount: 30 },
    { name: "Liz", slug: "liz-scissors-and-scotch-dallas", rating: 4.7, reviewCount: 25 },
    { name: "Natasha", slug: "natasha-scissors-and-scotch-dallas", rating: 4.6, reviewCount: 20 },
  ],
};

const SCISSORS_SCOTCH_BARBERS: Barber[] = [
  {
    id: "real-dal-ss-kryz",
    name: "Kryz",
    slug: "kryz-scissors-and-scotch-dallas",
    fadeScore: 4.8,
    reviewCount: 30,
    specialties: ["Fades", "Beard", "Hot Towel Shave"],
    ...SCISSORS_SCOTCH_SHARED,
  },
  {
    id: "real-dal-ss-liz",
    name: "Liz",
    slug: "liz-scissors-and-scotch-dallas",
    fadeScore: 4.7,
    reviewCount: 25,
    specialties: ["Tapers", "Classic Cuts"],
    ...SCISSORS_SCOTCH_SHARED,
  },
  {
    id: "real-dal-ss-natasha",
    name: "Natasha",
    slug: "natasha-scissors-and-scotch-dallas",
    fadeScore: 4.6,
    reviewCount: 20,
    specialties: ["Fades", "Precision Cuts"],
    ...SCISSORS_SCOTCH_SHARED,
  },
];

// ── DAL 10. Alton's Old School Barbershop ─────────────────────────────────
const ALTONS_SHARED = {
  shopName: "Alton's Old School Barbershop",
  shopSlug: "altons-old-school-barbershop-dallas",
  ...DALLAS_CITY,
  address: "1911 Abrams Pkwy, Ste 102, Dallas, TX 75214",
  phone: "(469) 804-4404",
  instagram: "@altonsbarbershop",
  website: "https://altonsoldschoolbarber.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 196 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 57 },
  ],
  barbers: [
    { name: "Michael", slug: "michael-altons-old-school-barbershop-dallas", rating: 4.9, reviewCount: 55 },
    { name: "Moses", slug: "moses-altons-old-school-barbershop-dallas", rating: 4.8, reviewCount: 45 },
    { name: "Kevin Perrault", slug: "kevin-perrault-altons-old-school-barbershop-dallas", rating: 4.8, reviewCount: 40 },
    { name: "Daunya", slug: "daunya-altons-old-school-barbershop-dallas", rating: 4.7, reviewCount: 30 },
  ],
};

const ALTONS_BARBERS: Barber[] = [
  {
    id: "real-dal-altons-michael",
    name: "Michael",
    slug: "michael-altons-old-school-barbershop-dallas",
    fadeScore: 4.9,
    reviewCount: 55,
    specialties: ["Classic Cuts", "Fades", "Hot Towel Shave"],
    ...ALTONS_SHARED,
  },
  {
    id: "real-dal-altons-moses",
    name: "Moses",
    slug: "moses-altons-old-school-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Beard"],
    ...ALTONS_SHARED,
  },
  {
    id: "real-dal-altons-kevin",
    name: "Kevin Perrault",
    slug: "kevin-perrault-altons-old-school-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Tapers", "Beard"],
    ...ALTONS_SHARED,
  },
  {
    id: "real-dal-altons-daunya",
    name: "Daunya",
    slug: "daunya-altons-old-school-barbershop-dallas",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Classic Cuts"],
    ...ALTONS_SHARED,
  },
];

// ── DAL 11. Brownie's Barber Shop ─────────────────────────────────────────
const BROWNIES_SHARED = {
  shopName: "Brownie's Barber Shop",
  shopSlug: "brownies-barber-shop-dallas",
  ...DALLAS_CITY,
  address: "4317 Lemmon Ave, Ste A, Dallas, TX 75219",
  phone: "(214) 526-9207",
  avgPrice: 10,
  reviews: [
    { platform: "google" as const, rating: 4.5, reviewCount: 87 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 152 },
  ],
  barbers: [
    { name: "Ray", slug: "ray-brownies-barber-shop-dallas", rating: 4.8, reviewCount: 60 },
    { name: "Eddie", slug: "eddie-brownies-barber-shop-dallas", rating: 4.6, reviewCount: 40 },
  ],
};

const BROWNIES_BARBERS: Barber[] = [
  {
    id: "real-dal-brownies-ray",
    name: "Ray",
    slug: "ray-brownies-barber-shop-dallas",
    fadeScore: 4.8,
    reviewCount: 60,
    specialties: ["Classic Cuts", "Flat Top", "Tapers"],
    isCheap: true,
    isHiddenGem: true,
    ...BROWNIES_SHARED,
  },
  {
    id: "real-dal-brownies-eddie",
    name: "Eddie",
    slug: "eddie-brownies-barber-shop-dallas",
    fadeScore: 4.6,
    reviewCount: 40,
    specialties: ["Classic Cuts", "Tapers"],
    isCheap: true,
    isHiddenGem: true,
    ...BROWNIES_SHARED,
  },
];

// ── DAL 12. KN Barbershop ─────────────────────────────────────────────────
const KN_SHARED = {
  shopName: "KN Barbershop",
  shopSlug: "kn-barbershop-dallas",
  ...DALLAS_CITY,
  address: "1400 Hi Line Dr, Ste 30, Dallas, TX 75207",
  website: "https://booksy.com/en-us/528439_kn-barbershop_barber-shop_134786_dallas",
  avgPrice: 50,
  reviews: [
    { platform: "booksy" as const, rating: 5.0, reviewCount: 69 },
  ],
  barbers: [
    { name: "Khoi Nguyen", slug: "khoi-nguyen-kn-barbershop-dallas", rating: 5.0, reviewCount: 69 },
  ],
};

const KN_BARBERS: Barber[] = [
  {
    id: "real-dal-kn-khoi",
    name: "Khoi Nguyen",
    slug: "khoi-nguyen-kn-barbershop-dallas",
    fadeScore: 5.0,
    reviewCount: 69,
    specialties: ["Precision Cuts", "Fades", "Classic Barbering"],
    ...KN_SHARED,
  },
];

// ── DAL 13. Sir Sweeney Barbershop & Lounge ───────────────────────────────
const SIR_SWEENEY_SHARED = {
  shopName: "Sir Sweeney Barbershop & Lounge",
  shopSlug: "sir-sweeney-barbershop-dallas",
  ...DALLAS_CITY,
  address: "2426 Victory Park Ln, Dallas, TX 75219",
  instagram: "@sirsweeneydallas",
  website: "https://www.sirsweeney.com",
  avgPrice: 55,
  reviews: [
    { platform: "google" as const, rating: 4.7, reviewCount: 66 },
  ],
  barbers: [
    { name: "Jeff Adams", slug: "jeff-adams-sir-sweeney-barbershop-dallas", rating: 4.8, reviewCount: 25 },
  ],
};

const SIR_SWEENEY_BARBERS: Barber[] = [
  {
    id: "real-dal-sweeney-jeff",
    name: "Jeff Adams",
    slug: "jeff-adams-sir-sweeney-barbershop-dallas",
    fadeScore: 4.8,
    reviewCount: 25,
    specialties: ["Fades", "Hot Towel Shave", "Beard", "Luxury Grooming"],
    ...SIR_SWEENEY_SHARED,
  },
];

// ── DAL 14. Merriweather & Co. ────────────────────────────────────────────
const MERRIWEATHER_SHARED = {
  shopName: "Merriweather & Co.",
  shopSlug: "merriweather-and-co-dallas",
  ...DALLAS_CITY,
  address: "7751 Bonnie View Rd, Dallas, TX 75241",
  phone: "(214) 875-7685",
  instagram: "@merriweatherandco",
  website: "https://merriweatherandco.com",
  avgPrice: 25,
  reviews: [
    { platform: "google" as const, rating: 4.7, reviewCount: 292 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 14 },
    { platform: "squire" as const, rating: 5.0, reviewCount: 50 },
  ],
  barbers: [
    { name: "Wendell Merriweather", slug: "wendell-merriweather-merriweather-and-co-dallas", rating: 5.0, reviewCount: 50 },
  ],
};

const MERRIWEATHER_BARBERS: Barber[] = [
  {
    id: "real-dal-merri-wendell",
    name: "Wendell Merriweather",
    slug: "wendell-merriweather-merriweather-and-co-dallas",
    fadeScore: 4.9,
    reviewCount: 50,
    specialties: ["Fades", "Classic Cuts", "Beard", "Shoe Shine"],
    isCheap: true,
    isHiddenGem: true,
    ...MERRIWEATHER_SHARED,
  },
];

// Combine all Dallas barbers
const DALLAS_BARBERS: Barber[] = [
  ...KUTINFED_BARBERS,
  ...BLADE21_BARBERS,
  ...HQ_BARBERS,
  ...PEGASUS_BARBERS,
  ...ROBS_BARBERS,
  ...DALLAS_FADES_BARBERS,
  ...SOVEREIGN_BARBERS,
  ...FADE_SHOP_BARBERS,
  ...SCISSORS_SCOTCH_BARBERS,
  ...ALTONS_BARBERS,
  ...BROWNIES_BARBERS,
  ...KN_BARBERS,
  ...SIR_SWEENEY_BARBERS,
  ...MERRIWEATHER_BARBERS,
];

/**
 * Map of city slugs to curated barber arrays.
 * Add more cities by adding entries here.
 */
export const REAL_BARBERS: Record<string, Barber[]> = {
  // Hand-curated cities
  "salt-lake-city": SLC_BARBERS,
  "ogden": OGDEN_BARBERS,
  "logan": LOGAN_BARBERS,
  "layton": LAYTON_BARBERS,
  "provo": PROVO_BARBERS,
  "south-jordan": SOUTH_JORDAN_BARBERS,
  "los-angeles": LA_BARBERS,
  "new-york": NYC_BARBERS,
  "chicago": CHICAGO_BARBERS,
  "houston": HOUSTON_BARBERS,
  "phoenix": PHOENIX_BARBERS,
  "dallas": DALLAS_BARBERS,
  "san-antonio": SAN_ANTONIO_BARBERS,
  "san-diego": SAN_DIEGO_BARBERS,
  // Squire-sourced cities (auto-generated)
  ...SQUIRE_BARBERS,
};
