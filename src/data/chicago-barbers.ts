import type { Barber } from "@/types";

/**
 * Curated barber data for Chicago, IL.
 * Reviews aggregated from Google, Yelp, and Booksy.
 *
 * When a city has curated data here, it takes priority over mock-generated barbers.
 */

// ─── CHICAGO, IL ──────────────────────────────────────────────────
// Curated from Google, Yelp, Booksy, and shop websites (March 2026)

// ── 1. The Belmont Barbershop ─────────────────────────────────────
const BELMONT_SHARED = {
  shopName: "The Belmont Barbershop",
  shopSlug: "the-belmont-barbershop-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "2328 W Belmont Ave, Chicago, IL 60618",
  phone: "(773) 296-0894",
  instagram: "@belmontbarber",
  website: "https://belmontbarbershop.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 538 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 310 },
  ],
  barbers: [
    { name: "Colin", slug: "colin-the-belmont-barbershop-chicago", rating: 4.9, reviewCount: 70 },
    { name: "Ralph", slug: "ralph-the-belmont-barbershop-chicago", rating: 4.9, reviewCount: 65 },
    { name: "Mike Gazzo", slug: "mike-gazzo-the-belmont-barbershop-chicago", rating: 4.8, reviewCount: 60 },
    { name: "Brian", slug: "brian-the-belmont-barbershop-chicago", rating: 4.8, reviewCount: 55 },
    { name: "Greg", slug: "greg-the-belmont-barbershop-chicago", rating: 4.8, reviewCount: 50 },
    { name: "Josh Cooley", slug: "josh-cooley-the-belmont-barbershop-chicago", rating: 4.8, reviewCount: 45 },
    { name: "Seabass", slug: "seabass-the-belmont-barbershop-chicago", rating: 4.7, reviewCount: 40 },
    { name: "Eric Olvera", slug: "eric-olvera-the-belmont-barbershop-chicago", rating: 4.7, reviewCount: 35 },
  ],
};

const BELMONT_BARBERS: Barber[] = [
  {
    id: "real-chi-belmont-colin",
    name: "Colin",
    slug: "colin-the-belmont-barbershop-chicago",
    fadeScore: 4.9,
    reviewCount: 70,
    specialties: ["Fades", "Beard", "Tapers"],
    ...BELMONT_SHARED,
  },
  {
    id: "real-chi-belmont-ralph",
    name: "Ralph",
    slug: "ralph-the-belmont-barbershop-chicago",
    fadeScore: 4.9,
    reviewCount: 65,
    specialties: ["Fades", "Razor Fade", "Line Up"],
    ...BELMONT_SHARED,
  },
  {
    id: "real-chi-belmont-mike",
    name: "Mike Gazzo",
    slug: "mike-gazzo-the-belmont-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 60,
    specialties: ["Fades", "Classic Cuts"],
    ...BELMONT_SHARED,
  },
  {
    id: "real-chi-belmont-brian",
    name: "Brian",
    slug: "brian-the-belmont-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 55,
    specialties: ["Fades", "Beard"],
    ...BELMONT_SHARED,
  },
  {
    id: "real-chi-belmont-greg",
    name: "Greg",
    slug: "greg-the-belmont-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Tapers"],
    ...BELMONT_SHARED,
  },
  {
    id: "real-chi-belmont-josh",
    name: "Josh Cooley",
    slug: "josh-cooley-the-belmont-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Line Up", "Beard"],
    ...BELMONT_SHARED,
  },
  {
    id: "real-chi-belmont-seabass",
    name: "Seabass",
    slug: "seabass-the-belmont-barbershop-chicago",
    fadeScore: 4.7,
    reviewCount: 40,
    specialties: ["Fades", "Razor Fade"],
    ...BELMONT_SHARED,
  },
  {
    id: "real-chi-belmont-eric",
    name: "Eric Olvera",
    slug: "eric-olvera-the-belmont-barbershop-chicago",
    fadeScore: 4.7,
    reviewCount: 35,
    specialties: ["Fades", "Classic Cuts", "Tapers"],
    ...BELMONT_SHARED,
  },
];

// ── 2. Chicago's Best Barbershop ──────────────────────────────────
const CHICAGOS_BEST_SHARED = {
  shopName: "Chicago's Best Barbershop",
  shopSlug: "chicagos-best-barbershop-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "2318 N California Ave, Chicago, IL 60647",
  phone: "(773) 227-1314",
  instagram: "@chicagosbestbarbershop",
  website: "https://logansquarebarbershop.com",
  avgPrice: 25,
  reviews: [
    { platform: "booksy" as const, rating: 4.9, reviewCount: 508 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 67 },
  ],
  barbers: [
    { name: "Omar", slug: "omar-chicagos-best-barbershop-chicago", rating: 5.0, reviewCount: 81 },
    { name: "Jorge", slug: "jorge-chicagos-best-barbershop-chicago", rating: 4.9, reviewCount: 60 },
    { name: "Rob", slug: "rob-chicagos-best-barbershop-chicago", rating: 4.8, reviewCount: 50 },
    { name: "Ace", slug: "ace-chicagos-best-barbershop-chicago", rating: 4.8, reviewCount: 45 },
    { name: "Dom", slug: "dom-chicagos-best-barbershop-chicago", rating: 4.7, reviewCount: 40 },
  ],
};

const CHICAGOS_BEST_BARBERS: Barber[] = [
  {
    id: "real-chi-cb-omar",
    name: "Omar",
    slug: "omar-chicagos-best-barbershop-chicago",
    fadeScore: 5.0,
    reviewCount: 81,
    specialties: ["Fades", "Razor Fade", "Beard"],
    isCheap: true,
    ...CHICAGOS_BEST_SHARED,
  },
  {
    id: "real-chi-cb-jorge",
    name: "Jorge",
    slug: "jorge-chicagos-best-barbershop-chicago",
    fadeScore: 4.9,
    reviewCount: 60,
    specialties: ["Fades", "Tapers", "Line Up"],
    isCheap: true,
    ...CHICAGOS_BEST_SHARED,
  },
  {
    id: "real-chi-cb-rob",
    name: "Rob",
    slug: "rob-chicagos-best-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Classic Cuts"],
    isCheap: true,
    ...CHICAGOS_BEST_SHARED,
  },
  {
    id: "real-chi-cb-ace",
    name: "Ace",
    slug: "ace-chicagos-best-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 45,
    specialties: ["Fades", "Beard"],
    isCheap: true,
    ...CHICAGOS_BEST_SHARED,
  },
  {
    id: "real-chi-cb-dom",
    name: "Dom",
    slug: "dom-chicagos-best-barbershop-chicago",
    fadeScore: 4.7,
    reviewCount: 40,
    specialties: ["Fades", "Line Up"],
    isCheap: true,
    ...CHICAGOS_BEST_SHARED,
  },
];

// ── 3. Blind Barber Chicago ───────────────────────────────────────
const BLIND_BARBER_SHARED = {
  shopName: "Blind Barber Chicago",
  shopSlug: "blind-barber-chicago-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "948 W Fulton Market, Chicago, IL 60607",
  phone: "(312) 405-9929",
  instagram: "@blindbarber",
  website: "https://blindbarber.com/pages/chicago",
  avgPrice: 55,
  reviews: [
    { platform: "google" as const, rating: 4.5, reviewCount: 327 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 198 },
  ],
  barbers: [
    { name: "Kellcey", slug: "kellcey-blind-barber-chicago-chicago", rating: 4.7, reviewCount: 55 },
    { name: "Marcus", slug: "marcus-blind-barber-chicago-chicago", rating: 4.6, reviewCount: 50 },
    { name: "Toby", slug: "toby-blind-barber-chicago-chicago", rating: 4.6, reviewCount: 45 },
    { name: "Dave", slug: "dave-blind-barber-chicago-chicago", rating: 4.5, reviewCount: 40 },
  ],
};

const BLIND_BARBER_BARBERS: Barber[] = [
  {
    id: "real-chi-blind-kellcey",
    name: "Kellcey",
    slug: "kellcey-blind-barber-chicago-chicago",
    fadeScore: 4.7,
    reviewCount: 55,
    specialties: ["Fades", "Beard", "Classic Cuts"],
    ...BLIND_BARBER_SHARED,
  },
  {
    id: "real-chi-blind-marcus",
    name: "Marcus",
    slug: "marcus-blind-barber-chicago-chicago",
    fadeScore: 4.6,
    reviewCount: 50,
    specialties: ["Fades", "Tapers"],
    ...BLIND_BARBER_SHARED,
  },
  {
    id: "real-chi-blind-toby",
    name: "Toby",
    slug: "toby-blind-barber-chicago-chicago",
    fadeScore: 4.6,
    reviewCount: 45,
    specialties: ["Fades", "Line Up", "Razor Fade"],
    ...BLIND_BARBER_SHARED,
  },
  {
    id: "real-chi-blind-dave",
    name: "Dave",
    slug: "dave-blind-barber-chicago-chicago",
    fadeScore: 4.5,
    reviewCount: 40,
    specialties: ["Fades", "Beard"],
    ...BLIND_BARBER_SHARED,
  },
];

// ── 4. Handcrafted Barbershop ─────────────────────────────────────
const HANDCRAFTED_SHARED = {
  shopName: "Handcrafted Barbershop",
  shopSlug: "handcrafted-barbershop-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "1223 W Grand Ave, Chicago, IL 60642",
  phone: "(312) 265-1237",
  instagram: "@handcraftedbarbershop",
  avgPrice: 21,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 189 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 60 },
  ],
  barbers: [
    { name: "Isaac Holmes", slug: "isaac-holmes-handcrafted-barbershop-chicago", rating: 4.9, reviewCount: 40 },
    { name: "Travis", slug: "travis-handcrafted-barbershop-chicago", rating: 4.8, reviewCount: 35 },
    { name: "Greg Kristopik", slug: "greg-kristopik-handcrafted-barbershop-chicago", rating: 4.8, reviewCount: 30 },
    { name: "Will", slug: "will-handcrafted-barbershop-chicago", rating: 4.8, reviewCount: 28 },
    { name: "Clinton", slug: "clinton-handcrafted-barbershop-chicago", rating: 4.8, reviewCount: 25 },
    { name: "Doug", slug: "doug-handcrafted-barbershop-chicago", rating: 4.7, reviewCount: 20 },
  ],
};

const HANDCRAFTED_BARBERS: Barber[] = [
  {
    id: "real-chi-handcrafted-isaac",
    name: "Isaac Holmes",
    slug: "isaac-holmes-handcrafted-barbershop-chicago",
    fadeScore: 4.9,
    reviewCount: 40,
    specialties: ["Fades", "Razor Fade", "Line Up"],
    isCheap: true,
    isHiddenGem: true,
    ...HANDCRAFTED_SHARED,
  },
  {
    id: "real-chi-handcrafted-travis",
    name: "Travis",
    slug: "travis-handcrafted-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 35,
    specialties: ["Fades", "Beard", "Classic Cuts"],
    isCheap: true,
    ...HANDCRAFTED_SHARED,
  },
  {
    id: "real-chi-handcrafted-greg",
    name: "Greg Kristopik",
    slug: "greg-kristopik-handcrafted-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 30,
    specialties: ["Fades", "Tapers"],
    isCheap: true,
    ...HANDCRAFTED_SHARED,
  },
  {
    id: "real-chi-handcrafted-will",
    name: "Will",
    slug: "will-handcrafted-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 28,
    specialties: ["Fades", "Line Up"],
    isCheap: true,
    ...HANDCRAFTED_SHARED,
  },
  {
    id: "real-chi-handcrafted-clinton",
    name: "Clinton",
    slug: "clinton-handcrafted-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 25,
    specialties: ["Fades", "Beard"],
    isCheap: true,
    ...HANDCRAFTED_SHARED,
  },
  {
    id: "real-chi-handcrafted-doug",
    name: "Doug",
    slug: "doug-handcrafted-barbershop-chicago",
    fadeScore: 4.7,
    reviewCount: 20,
    specialties: ["Fades", "Classic Cuts", "Tapers"],
    isCheap: true,
    ...HANDCRAFTED_SHARED,
  },
];

// ── 5. Joe's Barbershop Chicago ───────────────────────────────────
const JOES_SHARED = {
  shopName: "Joe's Barbershop Chicago",
  shopSlug: "joes-barbershop-chicago-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "2641 W Fullerton Ave, Chicago, IL 60647",
  phone: "(773) 252-3980",
  instagram: "@joesbarbershopchicago",
  website: "https://joesbarbershopchicago.com",
  avgPrice: 25,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 165 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 258 },
  ],
  barbers: [
    { name: "Joe Caccavella Jr.", slug: "joe-caccavella-jr-joes-barbershop-chicago-chicago", rating: 4.8, reviewCount: 60 },
    { name: "Pedro", slug: "pedro-joes-barbershop-chicago-chicago", rating: 4.8, reviewCount: 50 },
    { name: "Jim", slug: "jim-joes-barbershop-chicago-chicago", rating: 4.7, reviewCount: 40 },
  ],
};

const JOES_BARBERS: Barber[] = [
  {
    id: "real-chi-joes-joe",
    name: "Joe Caccavella Jr.",
    slug: "joe-caccavella-jr-joes-barbershop-chicago-chicago",
    fadeScore: 4.8,
    reviewCount: 60,
    specialties: ["Fades", "Classic Cuts", "Beard"],
    isCheap: true,
    ...JOES_SHARED,
  },
  {
    id: "real-chi-joes-pedro",
    name: "Pedro",
    slug: "pedro-joes-barbershop-chicago-chicago",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Tapers", "Line Up"],
    isCheap: true,
    ...JOES_SHARED,
  },
  {
    id: "real-chi-joes-jim",
    name: "Jim",
    slug: "jim-joes-barbershop-chicago-chicago",
    fadeScore: 4.7,
    reviewCount: 40,
    specialties: ["Fades", "Razor Fade"],
    isCheap: true,
    ...JOES_SHARED,
  },
];

// ── 6. Kenny Mac's Barbershop ─────────────────────────────────────
const KENNY_MACS_SHARED = {
  shopName: "Kenny Mac's Barbershop",
  shopSlug: "kenny-macs-barbershop-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "4427 N Broadway St, Chicago, IL 60640",
  phone: "(773) 754-7110",
  instagram: "@kennymacsbarber",
  website: "https://kennymacsbarbershop.com",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.6, reviewCount: 245 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 251 },
  ],
  barbers: [
    { name: "Kenny Mac", slug: "kenny-mac-kenny-macs-barbershop-chicago", rating: 4.8, reviewCount: 80 },
    { name: "Tree", slug: "tree-kenny-macs-barbershop-chicago", rating: 4.7, reviewCount: 60 },
    { name: "A.O.", slug: "ao-kenny-macs-barbershop-chicago", rating: 4.7, reviewCount: 50 },
  ],
};

const KENNY_MACS_BARBERS: Barber[] = [
  {
    id: "real-chi-kenny-kenny",
    name: "Kenny Mac",
    slug: "kenny-mac-kenny-macs-barbershop-chicago",
    fadeScore: 4.8,
    reviewCount: 80,
    specialties: ["Fades", "Beard", "Line Up"],
    ...KENNY_MACS_SHARED,
  },
  {
    id: "real-chi-kenny-tree",
    name: "Tree",
    slug: "tree-kenny-macs-barbershop-chicago",
    fadeScore: 4.7,
    reviewCount: 60,
    specialties: ["Fades", "Tapers", "Classic Cuts"],
    ...KENNY_MACS_SHARED,
  },
  {
    id: "real-chi-kenny-ao",
    name: "A.O.",
    slug: "ao-kenny-macs-barbershop-chicago",
    fadeScore: 4.7,
    reviewCount: 50,
    specialties: ["Fades", "Razor Fade"],
    ...KENNY_MACS_SHARED,
  },
];

// ── 7. Groom for Gentlemen ────────────────────────────────────────
const GROOM_SHARED = {
  shopName: "Groom for Gentlemen",
  shopSlug: "groom-for-gentlemen-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "124 W Kinzie St, Chicago, IL 60654",
  phone: "(312) 625-1124",
  instagram: "@groomchicago",
  website: "https://groomchicago.com",
  avgPrice: 45,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 100 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 41 },
  ],
  barbers: [
    { name: "Nikki", slug: "nikki-groom-for-gentlemen-chicago", rating: 4.9, reviewCount: 30 },
    { name: "Max", slug: "max-groom-for-gentlemen-chicago", rating: 4.8, reviewCount: 25 },
    { name: "Alyssa", slug: "alyssa-groom-for-gentlemen-chicago", rating: 4.8, reviewCount: 22 },
    { name: "Veronica", slug: "veronica-groom-for-gentlemen-chicago", rating: 4.8, reviewCount: 20 },
    { name: "Anna", slug: "anna-groom-for-gentlemen-chicago", rating: 4.7, reviewCount: 18 },
    { name: "Guillermo", slug: "guillermo-groom-for-gentlemen-chicago", rating: 4.7, reviewCount: 15 },
  ],
};

const GROOM_BARBERS: Barber[] = [
  {
    id: "real-chi-groom-nikki",
    name: "Nikki",
    slug: "nikki-groom-for-gentlemen-chicago",
    fadeScore: 4.9,
    reviewCount: 30,
    specialties: ["Fades", "Beard", "Tapers"],
    ...GROOM_SHARED,
  },
  {
    id: "real-chi-groom-max",
    name: "Max",
    slug: "max-groom-for-gentlemen-chicago",
    fadeScore: 4.8,
    reviewCount: 25,
    specialties: ["Fades", "Line Up", "Classic Cuts"],
    ...GROOM_SHARED,
  },
  {
    id: "real-chi-groom-alyssa",
    name: "Alyssa",
    slug: "alyssa-groom-for-gentlemen-chicago",
    fadeScore: 4.8,
    reviewCount: 22,
    specialties: ["Fades", "Razor Fade"],
    ...GROOM_SHARED,
  },
  {
    id: "real-chi-groom-veronica",
    name: "Veronica",
    slug: "veronica-groom-for-gentlemen-chicago",
    fadeScore: 4.8,
    reviewCount: 20,
    specialties: ["Fades", "Beard"],
    ...GROOM_SHARED,
  },
  {
    id: "real-chi-groom-anna",
    name: "Anna",
    slug: "anna-groom-for-gentlemen-chicago",
    fadeScore: 4.7,
    reviewCount: 18,
    specialties: ["Fades", "Tapers", "Line Up"],
    ...GROOM_SHARED,
  },
  {
    id: "real-chi-groom-guillermo",
    name: "Guillermo",
    slug: "guillermo-groom-for-gentlemen-chicago",
    fadeScore: 4.7,
    reviewCount: 15,
    specialties: ["Fades", "Classic Cuts"],
    ...GROOM_SHARED,
  },
];

// ── 8. Levant Barber Shop ─────────────────────────────────────────
const LEVANT_SHARED = {
  shopName: "Levant Barber Shop",
  shopSlug: "levant-barber-shop-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "149 W Chicago Ave, Chicago, IL 60654",
  phone: "(312) 500-5003",
  instagram: "@levantbarbershop",
  website: "https://levantbarbershop.com",
  avgPrice: 55,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 165 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 23 },
  ],
  barbers: [
    { name: "Adam", slug: "adam-levant-barber-shop-chicago", rating: 4.9, reviewCount: 40 },
    { name: "Matt", slug: "matt-levant-barber-shop-chicago", rating: 4.9, reviewCount: 35 },
    { name: "Willow", slug: "willow-levant-barber-shop-chicago", rating: 4.8, reviewCount: 30 },
    { name: "Ahmad", slug: "ahmad-levant-barber-shop-chicago", rating: 4.7, reviewCount: 25 },
    { name: "Vissi", slug: "vissi-levant-barber-shop-chicago", rating: 4.7, reviewCount: 20 },
  ],
};

const LEVANT_BARBERS: Barber[] = [
  {
    id: "real-chi-levant-adam",
    name: "Adam",
    slug: "adam-levant-barber-shop-chicago",
    fadeScore: 4.9,
    reviewCount: 40,
    specialties: ["Fades", "Beard", "Razor Fade"],
    ...LEVANT_SHARED,
  },
  {
    id: "real-chi-levant-matt",
    name: "Matt",
    slug: "matt-levant-barber-shop-chicago",
    fadeScore: 4.9,
    reviewCount: 35,
    specialties: ["Fades", "Tapers", "Line Up"],
    ...LEVANT_SHARED,
  },
  {
    id: "real-chi-levant-willow",
    name: "Willow",
    slug: "willow-levant-barber-shop-chicago",
    fadeScore: 4.8,
    reviewCount: 30,
    specialties: ["Fades", "Classic Cuts"],
    ...LEVANT_SHARED,
  },
  {
    id: "real-chi-levant-ahmad",
    name: "Ahmad",
    slug: "ahmad-levant-barber-shop-chicago",
    fadeScore: 4.7,
    reviewCount: 25,
    specialties: ["Fades", "Beard"],
    ...LEVANT_SHARED,
  },
  {
    id: "real-chi-levant-vissi",
    name: "Vissi",
    slug: "vissi-levant-barber-shop-chicago",
    fadeScore: 4.7,
    reviewCount: 20,
    specialties: ["Fades", "Line Up", "Tapers"],
    ...LEVANT_SHARED,
  },
];

// ── 9. Old Town Barbershop ────────────────────────────────────────
const OLD_TOWN_SHARED = {
  shopName: "Old Town Barbershop",
  shopSlug: "old-town-barbershop-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "1339 N Wells St Fl 2, Chicago, IL 60610",
  phone: "(312) 573-3809",
  instagram: "@oldtownbarbershopchicago",
  website: "https://oldtownbarbershopchicago.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.5, reviewCount: 248 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 181 },
  ],
  barbers: [
    { name: "Ike", slug: "ike-old-town-barbershop-chicago", rating: 4.6, reviewCount: 55 },
    { name: "Darlene", slug: "darlene-old-town-barbershop-chicago", rating: 4.6, reviewCount: 50 },
    { name: "Jeff", slug: "jeff-old-town-barbershop-chicago", rating: 4.5, reviewCount: 45 },
  ],
};

const OLD_TOWN_BARBERS: Barber[] = [
  {
    id: "real-chi-oldtown-ike",
    name: "Ike",
    slug: "ike-old-town-barbershop-chicago",
    fadeScore: 4.6,
    reviewCount: 55,
    specialties: ["Fades", "Classic Cuts", "Beard"],
    ...OLD_TOWN_SHARED,
  },
  {
    id: "real-chi-oldtown-darlene",
    name: "Darlene",
    slug: "darlene-old-town-barbershop-chicago",
    fadeScore: 4.6,
    reviewCount: 50,
    specialties: ["Fades", "Tapers"],
    ...OLD_TOWN_SHARED,
  },
  {
    id: "real-chi-oldtown-jeff",
    name: "Jeff",
    slug: "jeff-old-town-barbershop-chicago",
    fadeScore: 4.5,
    reviewCount: 45,
    specialties: ["Fades", "Razor Fade", "Line Up"],
    ...OLD_TOWN_SHARED,
  },
];

// ── 10. Artur's Barber Shop ───────────────────────────────────────
const ARTURS_SHARED = {
  shopName: "Artur's Barber Shop",
  shopSlug: "arturs-barber-shop-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "1135 W Bryn Mawr Ave, Chicago, IL 60660",
  phone: "(872) 208-5558",
  instagram: "@artursbarbershop",
  website: "https://artursbarbershop.com",
  avgPrice: 25,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 187 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 89 },
  ],
  barbers: [
    { name: "Artur", slug: "artur-arturs-barber-shop-chicago", rating: 4.9, reviewCount: 50 },
    { name: "David", slug: "david-arturs-barber-shop-chicago", rating: 4.8, reviewCount: 40 },
    { name: "Turan", slug: "turan-arturs-barber-shop-chicago", rating: 4.7, reviewCount: 35 },
    { name: "Aaron", slug: "aaron-arturs-barber-shop-chicago", rating: 4.7, reviewCount: 30 },
  ],
};

const ARTURS_BARBERS: Barber[] = [
  {
    id: "real-chi-arturs-artur",
    name: "Artur",
    slug: "artur-arturs-barber-shop-chicago",
    fadeScore: 4.9,
    reviewCount: 50,
    specialties: ["Fades", "Beard", "Classic Cuts"],
    isCheap: true,
    ...ARTURS_SHARED,
  },
  {
    id: "real-chi-arturs-david",
    name: "David",
    slug: "david-arturs-barber-shop-chicago",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Tapers", "Line Up"],
    isCheap: true,
    ...ARTURS_SHARED,
  },
  {
    id: "real-chi-arturs-turan",
    name: "Turan",
    slug: "turan-arturs-barber-shop-chicago",
    fadeScore: 4.7,
    reviewCount: 35,
    specialties: ["Fades", "Razor Fade"],
    isCheap: true,
    ...ARTURS_SHARED,
  },
  {
    id: "real-chi-arturs-aaron",
    name: "Aaron",
    slug: "aaron-arturs-barber-shop-chicago",
    fadeScore: 4.7,
    reviewCount: 30,
    specialties: ["Fades", "Beard"],
    isCheap: true,
    ...ARTURS_SHARED,
  },
];

// ── 11. Goodman's Barber Lounge ───────────────────────────────────
const GOODMANS_SHARED = {
  shopName: "Goodman's Barber Lounge",
  shopSlug: "goodmans-barber-lounge-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "443 W Chicago Ave, Chicago, IL 60654",
  phone: "(872) 333-2433",
  instagram: "@goodmansbarberlounge",
  website: "https://goodmansbarberlounge.com",
  avgPrice: 50,
  reviews: [
    { platform: "google" as const, rating: 4.5, reviewCount: 360 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 14 },
  ],
  barbers: [
    { name: "Sam", slug: "sam-goodmans-barber-lounge-chicago", rating: 4.7, reviewCount: 45 },
    { name: "Yousef", slug: "yousef-goodmans-barber-lounge-chicago", rating: 4.7, reviewCount: 42 },
    { name: "Yaya", slug: "yaya-goodmans-barber-lounge-chicago", rating: 4.6, reviewCount: 38 },
    { name: "Hameza", slug: "hameza-goodmans-barber-lounge-chicago", rating: 4.6, reviewCount: 35 },
    { name: "Henry", slug: "henry-goodmans-barber-lounge-chicago", rating: 4.5, reviewCount: 30 },
    { name: "Rami", slug: "rami-goodmans-barber-lounge-chicago", rating: 4.5, reviewCount: 28 },
  ],
};

const GOODMANS_BARBERS: Barber[] = [
  {
    id: "real-chi-goodmans-sam",
    name: "Sam",
    slug: "sam-goodmans-barber-lounge-chicago",
    fadeScore: 4.7,
    reviewCount: 45,
    specialties: ["Fades", "Beard", "Line Up"],
    ...GOODMANS_SHARED,
  },
  {
    id: "real-chi-goodmans-yousef",
    name: "Yousef",
    slug: "yousef-goodmans-barber-lounge-chicago",
    fadeScore: 4.7,
    reviewCount: 42,
    specialties: ["Fades", "Razor Fade", "Tapers"],
    ...GOODMANS_SHARED,
  },
  {
    id: "real-chi-goodmans-yaya",
    name: "Yaya",
    slug: "yaya-goodmans-barber-lounge-chicago",
    fadeScore: 4.6,
    reviewCount: 38,
    specialties: ["Fades", "Classic Cuts"],
    ...GOODMANS_SHARED,
  },
  {
    id: "real-chi-goodmans-hameza",
    name: "Hameza",
    slug: "hameza-goodmans-barber-lounge-chicago",
    fadeScore: 4.6,
    reviewCount: 35,
    specialties: ["Fades", "Beard"],
    ...GOODMANS_SHARED,
  },
  {
    id: "real-chi-goodmans-henry",
    name: "Henry",
    slug: "henry-goodmans-barber-lounge-chicago",
    fadeScore: 4.5,
    reviewCount: 30,
    specialties: ["Fades", "Tapers", "Line Up"],
    ...GOODMANS_SHARED,
  },
  {
    id: "real-chi-goodmans-rami",
    name: "Rami",
    slug: "rami-goodmans-barber-lounge-chicago",
    fadeScore: 4.5,
    reviewCount: 28,
    specialties: ["Fades", "Razor Fade"],
    ...GOODMANS_SHARED,
  },
];

// ── 12. Merchant & Rhoades ────────────────────────────────────────
const MERCHANT_SHARED = {
  shopName: "Merchant & Rhoades",
  shopSlug: "merchant-and-rhoades-chicago",
  city: "Chicago",
  citySlug: "chicago",
  state: "Illinois",
  address: "900 N Michigan Ave Level 6, Chicago, IL 60611",
  phone: "(312) 337-2525",
  instagram: "@merchantandrhoades",
  website: "https://merchantandrhoades.com",
  avgPrice: 60,
  reviews: [
    { platform: "google" as const, rating: 4.5, reviewCount: 100 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 35 },
  ],
  barbers: [
    { name: "Kirk Merchant Jr.", slug: "kirk-merchant-jr-merchant-and-rhoades-chicago", rating: 4.7, reviewCount: 50 },
  ],
};

const MERCHANT_BARBERS: Barber[] = [
  {
    id: "real-chi-merchant-kirk",
    name: "Kirk Merchant Jr.",
    slug: "kirk-merchant-jr-merchant-and-rhoades-chicago",
    fadeScore: 4.7,
    reviewCount: 50,
    specialties: ["Fades", "Classic Cuts", "Beard"],
    ...MERCHANT_SHARED,
  },
];

// Combine all Chicago barbers
export const CHICAGO_BARBERS: Barber[] = [
  ...BELMONT_BARBERS,
  ...CHICAGOS_BEST_BARBERS,
  ...BLIND_BARBER_BARBERS,
  ...HANDCRAFTED_BARBERS,
  ...JOES_BARBERS,
  ...KENNY_MACS_BARBERS,
  ...GROOM_BARBERS,
  ...LEVANT_BARBERS,
  ...OLD_TOWN_BARBERS,
  ...ARTURS_BARBERS,
  ...GOODMANS_BARBERS,
  ...MERCHANT_BARBERS,
];
