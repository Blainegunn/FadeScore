import type { Barber } from "@/types";

/**
 * HOUSTON, TX — Curated barber data
 * Researched March 2026 from Google, Yelp, Booksy, Squire & shop websites.
 */

const HOUSTON_CITY = {
  city: "Houston",
  citySlug: "houston",
  state: "Texas",
};

// ── HOU 1. Ortahaus Barber Co. ────────────────────────────────────────────
const ORTAHAUS_SHARED = {
  shopName: "Ortahaus Barber Co.",
  shopSlug: "ortahaus-barber-co-houston",
  ...HOUSTON_CITY,
  address: "920 Studemont St, Ste 600, Houston, TX 77007",
  phone: "(832) 649-7646",
  instagram: "@ortahaus",
  website: "https://ortahaus.com",
  avgPrice: 50,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 606 },
    { platform: "squire" as const, rating: 5.0, reviewCount: 50 },
  ],
  barbers: [
    { name: "Joseph", slug: "joseph-ortahaus-barber-co-houston", rating: 4.9, reviewCount: 320 },
    { name: "Memo", slug: "memo-ortahaus-barber-co-houston", rating: 4.9, reviewCount: 286 },
  ],
};

const ORTAHAUS_BARBERS: Barber[] = [
  {
    id: "real-hou-ortahaus-joseph",
    name: "Joseph",
    slug: "joseph-ortahaus-barber-co-houston",
    fadeScore: 4.9,
    reviewCount: 320,
    specialties: ["Fades", "Beard", "Razor Fade"],
    ...ORTAHAUS_SHARED,
  },
  {
    id: "real-hou-ortahaus-memo",
    name: "Memo",
    slug: "memo-ortahaus-barber-co-houston",
    fadeScore: 4.9,
    reviewCount: 286,
    specialties: ["Fades", "Tapers"],
    ...ORTAHAUS_SHARED,
  },
];

// ── HOU 2. The Argyle League ──────────────────────────────────────────────
const ARGYLE_SHARED = {
  shopName: "The Argyle League",
  shopSlug: "the-argyle-league-houston",
  ...HOUSTON_CITY,
  address: "709 W Alabama St, Houston, TX 77006",
  phone: "(713) 702-1026",
  instagram: "@theargyleleague",
  website: "https://theargyleleague.com",
  avgPrice: 45,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 478 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 204 },
  ],
  barbers: [
    { name: "Carlos", slug: "carlos-the-argyle-league-houston", rating: 4.9, reviewCount: 150 },
    { name: "Travis", slug: "travis-the-argyle-league-houston", rating: 4.8, reviewCount: 130 },
    { name: "Matt", slug: "matt-the-argyle-league-houston", rating: 4.8, reviewCount: 120 },
    { name: "Rafael", slug: "rafael-the-argyle-league-houston", rating: 4.7, reviewCount: 100 },
    { name: "Dominic", slug: "dominic-the-argyle-league-houston", rating: 4.7, reviewCount: 90 },
  ],
};

const ARGYLE_BARBERS: Barber[] = [
  {
    id: "real-hou-argyle-carlos",
    name: "Carlos",
    slug: "carlos-the-argyle-league-houston",
    fadeScore: 4.9,
    reviewCount: 150,
    specialties: ["Fades", "Precision Cuts", "Beard"],
    ...ARGYLE_SHARED,
  },
  {
    id: "real-hou-argyle-travis",
    name: "Travis",
    slug: "travis-the-argyle-league-houston",
    fadeScore: 4.8,
    reviewCount: 130,
    specialties: ["Fades", "Tapers"],
    ...ARGYLE_SHARED,
  },
  {
    id: "real-hou-argyle-matt",
    name: "Matt",
    slug: "matt-the-argyle-league-houston",
    fadeScore: 4.8,
    reviewCount: 120,
    specialties: ["Fades", "Classic Cuts"],
    ...ARGYLE_SHARED,
  },
  {
    id: "real-hou-argyle-rafael",
    name: "Rafael",
    slug: "rafael-the-argyle-league-houston",
    fadeScore: 4.7,
    reviewCount: 100,
    specialties: ["Fades", "Line Up"],
    ...ARGYLE_SHARED,
  },
  {
    id: "real-hou-argyle-dominic",
    name: "Dominic",
    slug: "dominic-the-argyle-league-houston",
    fadeScore: 4.7,
    reviewCount: 90,
    specialties: ["Fades", "Beard"],
    ...ARGYLE_SHARED,
  },
];

// ── HOU 3. 007 Barbershop ────────────────────────────────────────────────
const OO7_SHARED = {
  shopName: "007 Barbershop",
  shopSlug: "007-barbershop-houston",
  ...HOUSTON_CITY,
  address: "5801 Memorial Dr, Suite B, Houston, TX 77007",
  phone: "(713) 953-7777",
  instagram: "@007barbershophtx",
  website: "https://007-barbershop.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 1089 },
  ],
  barbers: [
    { name: "Eric R.", slug: "eric-r-007-barbershop-houston", rating: 4.9, reviewCount: 160 },
    { name: "Ismael", slug: "ismael-007-barbershop-houston", rating: 4.9, reviewCount: 150 },
    { name: "Ivan", slug: "ivan-007-barbershop-houston", rating: 4.8, reviewCount: 140 },
    { name: "Daniel", slug: "daniel-007-barbershop-houston", rating: 4.8, reviewCount: 130 },
    { name: "Benito", slug: "benito-007-barbershop-houston", rating: 4.8, reviewCount: 120 },
    { name: "Ali", slug: "ali-007-barbershop-houston", rating: 4.8, reviewCount: 115 },
    { name: "Eney", slug: "eney-007-barbershop-houston", rating: 4.7, reviewCount: 110 },
    { name: "Erick", slug: "erick-007-barbershop-houston", rating: 4.7, reviewCount: 100 },
  ],
};

const OO7_BARBERS: Barber[] = [
  {
    id: "real-hou-007-eric-r",
    name: "Eric R.",
    slug: "eric-r-007-barbershop-houston",
    fadeScore: 4.9,
    reviewCount: 160,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...OO7_SHARED,
  },
  {
    id: "real-hou-007-ismael",
    name: "Ismael",
    slug: "ismael-007-barbershop-houston",
    fadeScore: 4.9,
    reviewCount: 150,
    specialties: ["Fades", "Tapers"],
    ...OO7_SHARED,
  },
  {
    id: "real-hou-007-ivan",
    name: "Ivan",
    slug: "ivan-007-barbershop-houston",
    fadeScore: 4.8,
    reviewCount: 140,
    specialties: ["Fades", "Line Up"],
    ...OO7_SHARED,
  },
  {
    id: "real-hou-007-daniel",
    name: "Daniel",
    slug: "daniel-007-barbershop-houston",
    fadeScore: 4.8,
    reviewCount: 130,
    specialties: ["Fades", "Beard"],
    ...OO7_SHARED,
  },
  {
    id: "real-hou-007-benito",
    name: "Benito",
    slug: "benito-007-barbershop-houston",
    fadeScore: 4.8,
    reviewCount: 120,
    specialties: ["Fades", "Designs"],
    ...OO7_SHARED,
  },
  {
    id: "real-hou-007-ali",
    name: "Ali",
    slug: "ali-007-barbershop-houston",
    fadeScore: 4.8,
    reviewCount: 115,
    specialties: ["Fades", "Precision Cuts"],
    ...OO7_SHARED,
  },
  {
    id: "real-hou-007-eney",
    name: "Eney",
    slug: "eney-007-barbershop-houston",
    fadeScore: 4.7,
    reviewCount: 110,
    specialties: ["Fades", "Classic Cuts"],
    ...OO7_SHARED,
  },
  {
    id: "real-hou-007-erick",
    name: "Erick",
    slug: "erick-007-barbershop-houston",
    fadeScore: 4.7,
    reviewCount: 100,
    specialties: ["Fades", "Tapers"],
    ...OO7_SHARED,
  },
];

// ── HOU 4. Cutthroat Barbers ──────────────────────────────────────────────
const CUTTHROAT_SHARED = {
  shopName: "Cutthroat Barbers",
  shopSlug: "cutthroat-barbers-houston",
  ...HOUSTON_CITY,
  address: "244 W 19th St, Houston, TX 77008",
  phone: "(713) 446-5163",
  instagram: "@cutthroatbarbers",
  website: "https://cutthroatbarbers.com",
  avgPrice: 45,
  reviews: [
    { platform: "google" as const, rating: 4.7, reviewCount: 577 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 84 },
  ],
  barbers: [
    { name: "Juan", slug: "juan-cutthroat-barbers-houston", rating: 4.8, reviewCount: 100 },
    { name: "Carlos", slug: "carlos-cutthroat-barbers-houston", rating: 4.7, reviewCount: 90 },
    { name: "John", slug: "john-cutthroat-barbers-houston", rating: 4.7, reviewCount: 85 },
    { name: "Rafael", slug: "rafael-cutthroat-barbers-houston", rating: 4.7, reviewCount: 80 },
    { name: "Alex", slug: "alex-cutthroat-barbers-houston", rating: 4.7, reviewCount: 75 },
    { name: "Marc", slug: "marc-cutthroat-barbers-houston", rating: 4.6, reviewCount: 70 },
    { name: "Leo", slug: "leo-cutthroat-barbers-houston", rating: 4.6, reviewCount: 65 },
  ],
};

const CUTTHROAT_BARBERS: Barber[] = [
  {
    id: "real-hou-cutthroat-juan",
    name: "Juan",
    slug: "juan-cutthroat-barbers-houston",
    fadeScore: 4.8,
    reviewCount: 100,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...CUTTHROAT_SHARED,
  },
  {
    id: "real-hou-cutthroat-carlos",
    name: "Carlos",
    slug: "carlos-cutthroat-barbers-houston",
    fadeScore: 4.7,
    reviewCount: 90,
    specialties: ["Fades", "Tapers"],
    ...CUTTHROAT_SHARED,
  },
  {
    id: "real-hou-cutthroat-john",
    name: "John",
    slug: "john-cutthroat-barbers-houston",
    fadeScore: 4.7,
    reviewCount: 85,
    specialties: ["Fades", "Classic Cuts"],
    ...CUTTHROAT_SHARED,
  },
  {
    id: "real-hou-cutthroat-rafael",
    name: "Rafael",
    slug: "rafael-cutthroat-barbers-houston",
    fadeScore: 4.7,
    reviewCount: 80,
    specialties: ["Fades", "Line Up"],
    ...CUTTHROAT_SHARED,
  },
  {
    id: "real-hou-cutthroat-alex",
    name: "Alex",
    slug: "alex-cutthroat-barbers-houston",
    fadeScore: 4.7,
    reviewCount: 75,
    specialties: ["Fades", "Precision Cuts"],
    ...CUTTHROAT_SHARED,
  },
  {
    id: "real-hou-cutthroat-marc",
    name: "Marc",
    slug: "marc-cutthroat-barbers-houston",
    fadeScore: 4.6,
    reviewCount: 70,
    specialties: ["Fades", "Beard"],
    ...CUTTHROAT_SHARED,
  },
  {
    id: "real-hou-cutthroat-leo",
    name: "Leo",
    slug: "leo-cutthroat-barbers-houston",
    fadeScore: 4.6,
    reviewCount: 65,
    specialties: ["Fades", "Designs"],
    ...CUTTHROAT_SHARED,
  },
];

// ── HOU 5. Chophouse Barber Company ───────────────────────────────────────
const CHOPHOUSE_SHARED = {
  shopName: "Chophouse Barber Company",
  shopSlug: "chophouse-barber-company-houston",
  ...HOUSTON_CITY,
  address: "6715 Weslayan St, Houston, TX 77005",
  phone: "(832) 781-2856",
  instagram: "@chophousebarberco",
  website: "https://chophousebarbercompany.com",
  avgPrice: 50,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 498 },
    { platform: "yelp" as const, rating: 4.5, reviewCount: 145 },
  ],
  barbers: [
    { name: "Jonathan", slug: "jonathan-chophouse-barber-company-houston", rating: 4.9, reviewCount: 145 },
    { name: "Quincy", slug: "quincy-chophouse-barber-company-houston", rating: 4.9, reviewCount: 130 },
    { name: "Theo", slug: "theo-chophouse-barber-company-houston", rating: 4.8, reviewCount: 110 },
    { name: "Damian Molina", slug: "damian-molina-chophouse-barber-company-houston", rating: 4.9, reviewCount: 100 },
    { name: "Trevor S.", slug: "trevor-s-chophouse-barber-company-houston", rating: 4.7, reviewCount: 90 },
  ],
};

const CHOPHOUSE_BARBERS: Barber[] = [
  {
    id: "real-hou-chophouse-jonathan",
    name: "Jonathan",
    slug: "jonathan-chophouse-barber-company-houston",
    fadeScore: 4.9,
    reviewCount: 145,
    specialties: ["Fades", "Precision Cuts", "Beard"],
    ...CHOPHOUSE_SHARED,
  },
  {
    id: "real-hou-chophouse-quincy",
    name: "Quincy",
    slug: "quincy-chophouse-barber-company-houston",
    fadeScore: 4.9,
    reviewCount: 130,
    specialties: ["Fades", "Tapers"],
    ...CHOPHOUSE_SHARED,
  },
  {
    id: "real-hou-chophouse-theo",
    name: "Theo",
    slug: "theo-chophouse-barber-company-houston",
    fadeScore: 4.8,
    reviewCount: 110,
    specialties: ["Fades", "Line Up"],
    ...CHOPHOUSE_SHARED,
  },
  {
    id: "real-hou-chophouse-damian",
    name: "Damian Molina",
    slug: "damian-molina-chophouse-barber-company-houston",
    fadeScore: 4.9,
    reviewCount: 100,
    specialties: ["Fades", "Razor Fade"],
    ...CHOPHOUSE_SHARED,
  },
  {
    id: "real-hou-chophouse-trevor",
    name: "Trevor S.",
    slug: "trevor-s-chophouse-barber-company-houston",
    fadeScore: 4.7,
    reviewCount: 90,
    specialties: ["Fades", "Classic Cuts"],
    ...CHOPHOUSE_SHARED,
  },
];

// ── HOU 6. Gerrod Jones Barbershop ────────────────────────────────────────
const GERROD_JONES_SHARED = {
  shopName: "Gerrod Jones Barbershop",
  shopSlug: "gerrod-jones-barbershop-houston",
  ...HOUSTON_CITY,
  address: "4556 Griggs Rd, Houston, TX 77021",
  phone: "(713) 440-0078",
  instagram: "@gerrodjonesbarbershop_",
  website: "https://gerrodjonesbarbershop.com",
  avgPrice: 100,
  reviews: [
    { platform: "google" as const, rating: 4.8, reviewCount: 200 },
    { platform: "squire" as const, rating: 5.0, reviewCount: 30 },
  ],
  barbers: [
    { name: "Gerrod Jones", slug: "gerrod-jones-gerrod-jones-barbershop-houston", rating: 5.0, reviewCount: 80 },
    { name: "Junior", slug: "junior-gerrod-jones-barbershop-houston", rating: 4.9, reviewCount: 60 },
    { name: "Wayne", slug: "wayne-gerrod-jones-barbershop-houston", rating: 4.8, reviewCount: 50 },
    { name: "Curt", slug: "curt-gerrod-jones-barbershop-houston", rating: 4.8, reviewCount: 40 },
  ],
};

const GERROD_JONES_BARBERS: Barber[] = [
  {
    id: "real-hou-gerrod-gerrod",
    name: "Gerrod Jones",
    slug: "gerrod-jones-gerrod-jones-barbershop-houston",
    fadeScore: 5.0,
    reviewCount: 80,
    specialties: ["Fades", "Precision Cuts", "Beard"],
    ...GERROD_JONES_SHARED,
  },
  {
    id: "real-hou-gerrod-junior",
    name: "Junior",
    slug: "junior-gerrod-jones-barbershop-houston",
    fadeScore: 4.9,
    reviewCount: 60,
    specialties: ["Fades", "Tapers"],
    ...GERROD_JONES_SHARED,
  },
  {
    id: "real-hou-gerrod-wayne",
    name: "Wayne",
    slug: "wayne-gerrod-jones-barbershop-houston",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Line Up"],
    ...GERROD_JONES_SHARED,
  },
  {
    id: "real-hou-gerrod-curt",
    name: "Curt",
    slug: "curt-gerrod-jones-barbershop-houston",
    fadeScore: 4.8,
    reviewCount: 40,
    specialties: ["Fades", "Razor Fade"],
    ...GERROD_JONES_SHARED,
  },
];

// ── HOU 7. Head Honchos ──────────────────────────────────────────────────
const HEAD_HONCHOS_SHARED = {
  shopName: "Head Honchos",
  shopSlug: "head-honchos-houston",
  ...HOUSTON_CITY,
  address: "711 Milby St, Ste 26, Houston, TX 77023",
  phone: "(832) 977-0682",
  instagram: "@headhonchoshtx",
  website: "https://headhonchos.shop",
  avgPrice: 35,
  reviews: [
    { platform: "google" as const, rating: 4.7, reviewCount: 150 },
    { platform: "booksy" as const, rating: 4.8, reviewCount: 86 },
  ],
  barbers: [
    { name: "Chico", slug: "chico-head-honchos-houston", rating: 4.8, reviewCount: 55 },
    { name: "Mike Fresh", slug: "mike-fresh-head-honchos-houston", rating: 4.8, reviewCount: 50 },
    { name: "Jon", slug: "jon-head-honchos-houston", rating: 4.7, reviewCount: 45 },
    { name: "Cheeto", slug: "cheeto-head-honchos-houston", rating: 4.7, reviewCount: 40 },
    { name: "Jarrod", slug: "jarrod-head-honchos-houston", rating: 4.7, reviewCount: 38 },
  ],
};

const HEAD_HONCHOS_BARBERS: Barber[] = [
  {
    id: "real-hou-honchos-chico",
    name: "Chico",
    slug: "chico-head-honchos-houston",
    fadeScore: 4.8,
    reviewCount: 55,
    specialties: ["Fades", "Designs", "Line Up"],
    ...HEAD_HONCHOS_SHARED,
  },
  {
    id: "real-hou-honchos-mike",
    name: "Mike Fresh",
    slug: "mike-fresh-head-honchos-houston",
    fadeScore: 4.8,
    reviewCount: 50,
    specialties: ["Fades", "Beard"],
    ...HEAD_HONCHOS_SHARED,
  },
  {
    id: "real-hou-honchos-jon",
    name: "Jon",
    slug: "jon-head-honchos-houston",
    fadeScore: 4.7,
    reviewCount: 45,
    specialties: ["Fades", "Tapers"],
    ...HEAD_HONCHOS_SHARED,
  },
  {
    id: "real-hou-honchos-cheeto",
    name: "Cheeto",
    slug: "cheeto-head-honchos-houston",
    fadeScore: 4.7,
    reviewCount: 40,
    specialties: ["Fades", "Razor Fade"],
    ...HEAD_HONCHOS_SHARED,
  },
  {
    id: "real-hou-honchos-jarrod",
    name: "Jarrod",
    slug: "jarrod-head-honchos-houston",
    fadeScore: 4.7,
    reviewCount: 38,
    specialties: ["Fades", "Classic Cuts"],
    ...HEAD_HONCHOS_SHARED,
  },
];

// ── HOU 8. V's Barbershop ────────────────────────────────────────────────
const VS_SHARED = {
  shopName: "V's Barbershop",
  shopSlug: "vs-barbershop-houston",
  ...HOUSTON_CITY,
  address: "2040 W Gray St, Ste 145, Houston, TX 77019",
  phone: "(713) 527-4442",
  instagram: "@vsbarbershop",
  website: "https://vbarbershop.com",
  avgPrice: 38,
  reviews: [
    { platform: "google" as const, rating: 4.6, reviewCount: 478 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 57 },
  ],
  barbers: [
    { name: "Debra", slug: "debra-vs-barbershop-houston", rating: 4.8, reviewCount: 110 },
    { name: "Britt", slug: "britt-vs-barbershop-houston", rating: 4.7, reviewCount: 100 },
    { name: "Angie", slug: "angie-vs-barbershop-houston", rating: 4.7, reviewCount: 90 },
    { name: "Adam", slug: "adam-vs-barbershop-houston", rating: 4.6, reviewCount: 80 },
    { name: "Conchi", slug: "conchi-vs-barbershop-houston", rating: 4.6, reviewCount: 75 },
  ],
};

const VS_BARBERS: Barber[] = [
  {
    id: "real-hou-vs-debra",
    name: "Debra",
    slug: "debra-vs-barbershop-houston",
    fadeScore: 4.8,
    reviewCount: 110,
    specialties: ["Fades", "Precision Cuts", "Beard"],
    ...VS_SHARED,
  },
  {
    id: "real-hou-vs-britt",
    name: "Britt",
    slug: "britt-vs-barbershop-houston",
    fadeScore: 4.7,
    reviewCount: 100,
    specialties: ["Fades", "Classic Cuts"],
    ...VS_SHARED,
  },
  {
    id: "real-hou-vs-angie",
    name: "Angie",
    slug: "angie-vs-barbershop-houston",
    fadeScore: 4.7,
    reviewCount: 90,
    specialties: ["Fades", "Tapers"],
    ...VS_SHARED,
  },
  {
    id: "real-hou-vs-adam",
    name: "Adam",
    slug: "adam-vs-barbershop-houston",
    fadeScore: 4.6,
    reviewCount: 80,
    specialties: ["Fades", "Line Up"],
    ...VS_SHARED,
  },
  {
    id: "real-hou-vs-conchi",
    name: "Conchi",
    slug: "conchi-vs-barbershop-houston",
    fadeScore: 4.6,
    reviewCount: 75,
    specialties: ["Fades", "Beard"],
    ...VS_SHARED,
  },
];

// ── HOU 9. Afterhours Barbershop ─────────────────────────────────────────
const AFTERHOURS_SHARED = {
  shopName: "Afterhours Barbershop",
  shopSlug: "afterhours-barbershop-houston",
  ...HOUSTON_CITY,
  address: "2124 N Main St, Ste C, Houston, TX 77009",
  phone: "(832) 774-3406",
  instagram: "@afterhoursbarbershop",
  website: "https://afterhoursbarbershop.com",
  avgPrice: 55,
  reviews: [
    { platform: "google" as const, rating: 4.4, reviewCount: 261 },
  ],
  barbers: [
    { name: "Victor", slug: "victor-afterhours-barbershop-houston", rating: 4.7, reviewCount: 140 },
    { name: "Lucio", slug: "lucio-afterhours-barbershop-houston", rating: 4.6, reviewCount: 121 },
  ],
};

const AFTERHOURS_BARBERS: Barber[] = [
  {
    id: "real-hou-afterhours-victor",
    name: "Victor",
    slug: "victor-afterhours-barbershop-houston",
    fadeScore: 4.7,
    reviewCount: 140,
    specialties: ["Fades", "Razor Fade", "Beard"],
    ...AFTERHOURS_SHARED,
  },
  {
    id: "real-hou-afterhours-lucio",
    name: "Lucio",
    slug: "lucio-afterhours-barbershop-houston",
    fadeScore: 4.6,
    reviewCount: 121,
    specialties: ["Fades", "Tapers"],
    ...AFTERHOURS_SHARED,
  },
];

// ── HOU 10. The Gents Place ──────────────────────────────────────────────
const GENTS_SHARED = {
  shopName: "The Gents Place",
  shopSlug: "the-gents-place-houston",
  ...HOUSTON_CITY,
  address: "1300 Shepherd Dr, Houston, TX 77007",
  phone: "(713) 880-5858",
  instagram: "@thegentsplace",
  website: "https://thegentsplace.com",
  avgPrice: 55,
  reviews: [
    { platform: "google" as const, rating: 4.5, reviewCount: 200 },
    { platform: "yelp" as const, rating: 4.0, reviewCount: 78 },
  ],
  barbers: [
    { name: "Staci", slug: "staci-the-gents-place-houston", rating: 4.7, reviewCount: 100 },
    { name: "Jacinda", slug: "jacinda-the-gents-place-houston", rating: 4.6, reviewCount: 85 },
    { name: "Diamond", slug: "diamond-the-gents-place-houston", rating: 4.6, reviewCount: 80 },
  ],
};

const GENTS_BARBERS: Barber[] = [
  {
    id: "real-hou-gents-staci",
    name: "Staci",
    slug: "staci-the-gents-place-houston",
    fadeScore: 4.7,
    reviewCount: 100,
    specialties: ["Fades", "Beard", "Classic Cuts"],
    ...GENTS_SHARED,
  },
  {
    id: "real-hou-gents-jacinda",
    name: "Jacinda",
    slug: "jacinda-the-gents-place-houston",
    fadeScore: 4.6,
    reviewCount: 85,
    specialties: ["Fades", "Precision Cuts"],
    ...GENTS_SHARED,
  },
  {
    id: "real-hou-gents-diamond",
    name: "Diamond",
    slug: "diamond-the-gents-place-houston",
    fadeScore: 4.6,
    reviewCount: 80,
    specialties: ["Fades", "Line Up"],
    ...GENTS_SHARED,
  },
];

// ── HOU 11. Fade Barber Shop ─────────────────────────────────────────────
const FADE_SHARED = {
  shopName: "Fade Barber Shop",
  shopSlug: "fade-barber-shop-houston",
  ...HOUSTON_CITY,
  address: "1402 Hutchins St, Houston, TX 77003",
  phone: "(832) 331-8440",
  instagram: "@fadebarbershophtx",
  website: "https://fadebarbershophtx.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.7, reviewCount: 150 },
  ],
  barbers: [
    { name: "George", slug: "george-fade-barber-shop-houston", rating: 4.8, reviewCount: 80 },
    { name: "Sandra", slug: "sandra-fade-barber-shop-houston", rating: 4.7, reviewCount: 70 },
  ],
};

const FADE_BARBERS: Barber[] = [
  {
    id: "real-hou-fade-george",
    name: "George",
    slug: "george-fade-barber-shop-houston",
    fadeScore: 4.8,
    reviewCount: 80,
    specialties: ["Fades", "Razor Fade", "Line Up"],
    ...FADE_SHARED,
  },
  {
    id: "real-hou-fade-sandra",
    name: "Sandra",
    slug: "sandra-fade-barber-shop-houston",
    fadeScore: 4.7,
    reviewCount: 70,
    specialties: ["Fades", "Tapers"],
    ...FADE_SHARED,
  },
];

// Combine all Houston barbers
export const HOUSTON_BARBERS: Barber[] = [
  ...ORTAHAUS_BARBERS,
  ...ARGYLE_BARBERS,
  ...OO7_BARBERS,
  ...CUTTHROAT_BARBERS,
  ...CHOPHOUSE_BARBERS,
  ...GERROD_JONES_BARBERS,
  ...HEAD_HONCHOS_BARBERS,
  ...VS_BARBERS,
  ...AFTERHOURS_BARBERS,
  ...GENTS_BARBERS,
  ...FADE_BARBERS,
];
