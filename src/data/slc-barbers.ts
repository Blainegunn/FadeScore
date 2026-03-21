import type { Barber, HairType } from "@/types";

/**
 * Expanded Salt Lake City metro area barbers (100-mile radius).
 * Covers SLC proper, West Valley City, Sandy, Taylorsville, Midvale,
 * Murray, South Jordan, Herriman, Riverton, Draper, West Jordan,
 * Ogden, Layton, Clearfield, Roy, Provo, Orem, Logan, Centerville, Bountiful.
 *
 * All shops are local (no national chains) and offer fades/tapers.
 * Shop-level data (address, phone, ratings) sourced from Google, Yelp, Booksy, Facebook.
 * Individual barber names included ONLY when verified via booking platforms (Squire, Booksy).
 */

const SLC = { city: "Salt Lake City", citySlug: "salt-lake-city", state: "Utah" } as const;
const OGDEN = { city: "Ogden", citySlug: "ogden", state: "Utah" } as const;
const LOGAN = { city: "Logan", citySlug: "logan", state: "Utah" } as const;
const LAYTON = { city: "Layton", citySlug: "layton", state: "Utah" } as const;
const PROVO = { city: "Provo", citySlug: "provo", state: "Utah" } as const;
const SOUTH_JORDAN = { city: "South Jordan", citySlug: "south-jordan", state: "Utah" } as const;

type CityInfo = typeof SLC | typeof OGDEN | typeof LOGAN | typeof LAYTON | typeof PROVO | typeof SOUTH_JORDAN;

// ─── FADE ONE BARBERSHOP (verified via Booksy/website) ──────────────

const FADE_ONE_SHARED = {
  ...SLC,
  shopName: "Fade One Barbershop",
  shopSlug: "fade-one-barbershop-salt-lake-city",
  address: "3804 S Highland Dr, Suite 9/A, Salt Lake City, UT 84106",
  phone: "(385) 722-4449",
  instagram: "@fade_onebarbershop",
  website: "https://www.fadeonebarbershop.com",
  avgPrice: 40,
  reviews: [
    { platform: "google" as const, rating: 4.9, reviewCount: 286 },
  ],
  barbers: [
    { name: "Jon M.", slug: "jon-m-fade-one-barbershop-salt-lake-city", rating: 5.0, reviewCount: 35 },
    { name: "Mike M.", slug: "mike-m-fade-one-barbershop-salt-lake-city", rating: 4.8, reviewCount: 5 },
  ],
};

const FADE_ONE: Barber[] = [
  { id: "real-slc-fade-one", name: "Jon M.", slug: "jon-m-fade-one-barbershop-salt-lake-city", fadeScore: 4.9, reviewCount: 315, specialties: ["Fades", "Beard", "Razor Fade"], ...FADE_ONE_SHARED },
  { id: "real-slc-fade-one-mike", name: "Mike M.", slug: "mike-m-fade-one-barbershop-salt-lake-city", fadeScore: 4.8, reviewCount: 315, specialties: ["Fades", "Beard"], ...FADE_ONE_SHARED },
];

// ─── BARBER LEAGUE (verified via Squire/Booksy) ─────────────────────

const BARBER_LEAGUE_SHARED = {
  ...SLC,
  shopName: "Barber League",
  shopSlug: "barber-league-salt-lake-city",
  address: "10450 S State St, Ste 2122, Sandy, UT 84070",
  phone: "(801) 427-8260",
  instagram: "@barber.league801",
  website: "https://www.barberleague.com",
  avgPrice: 35,
  reviews: [
    { platform: "squire" as const, rating: 5.0, reviewCount: 50 },
    { platform: "booksy" as const, rating: 4.8, reviewCount: 130 },
  ],
  barbers: [
    { name: "Amir", slug: "amir-barber-league-salt-lake-city", rating: 5.0, reviewCount: 16 },
    { name: "Jay S.", slug: "jay-s-barber-league-salt-lake-city", rating: 5.0, reviewCount: 7 },
    { name: "Landry R.", slug: "landry-r-barber-league-salt-lake-city", rating: 5.0, reviewCount: 6 },
    { name: "Tai L.", slug: "tai-l-barber-league-salt-lake-city", rating: 5.0, reviewCount: 4 },
    { name: "Miguel A.", slug: "miguel-a-barber-league-salt-lake-city", rating: 5.0, reviewCount: 0 },
    { name: "Ewill", slug: "ewill-barber-league-salt-lake-city", rating: 5.0, reviewCount: 0 },
    { name: "Che", slug: "che-barber-league-salt-lake-city", rating: 5.0, reviewCount: 0 },
    { name: "Katie", slug: "katie-barber-league-salt-lake-city", rating: 5.0, reviewCount: 1 },
  ],
};

const BARBER_LEAGUE: Barber[] = [
  { id: "real-slc-bl-amir", name: "Amir", slug: "amir-barber-league-salt-lake-city", fadeScore: 4.9, reviewCount: 16, specialties: ["Fades", "Beard", "Line Up"], ...BARBER_LEAGUE_SHARED },
  { id: "real-slc-bl-jay", name: "Jay S.", slug: "jay-s-barber-league-salt-lake-city", fadeScore: 4.9, reviewCount: 7, specialties: ["Fades", "Beard"], ...BARBER_LEAGUE_SHARED },
  { id: "real-slc-bl-landry", name: "Landry R.", slug: "landry-r-barber-league-salt-lake-city", fadeScore: 4.8, reviewCount: 6, specialties: ["Fades", "Tapers"], ...BARBER_LEAGUE_SHARED },
  { id: "real-slc-bl-tai", name: "Tai L.", slug: "tai-l-barber-league-salt-lake-city", fadeScore: 4.8, reviewCount: 4, specialties: ["Fades", "Beard"], ...BARBER_LEAGUE_SHARED },
  { id: "real-slc-bl-miguel", name: "Miguel A.", slug: "miguel-a-barber-league-salt-lake-city", fadeScore: 4.7, reviewCount: 0, specialties: ["Fades", "Line Up"], ...BARBER_LEAGUE_SHARED },
  { id: "real-slc-bl-ewill", name: "Ewill", slug: "ewill-barber-league-salt-lake-city", fadeScore: 4.7, reviewCount: 0, specialties: ["Fades", "Tapers"], ...BARBER_LEAGUE_SHARED },
  { id: "real-slc-bl-che", name: "Che", slug: "che-barber-league-salt-lake-city", fadeScore: 4.7, reviewCount: 0, specialties: ["Fades"], ...BARBER_LEAGUE_SHARED },
  { id: "real-slc-bl-katie", name: "Katie", slug: "katie-barber-league-salt-lake-city", fadeScore: 4.7, reviewCount: 1, specialties: ["Fades", "Beard"], ...BARBER_LEAGUE_SHARED },
];

// ─── ALL OTHER SHOPS (single "team" entries — shop data verified, individual barbers not) ──

function shop(id: string, slug: string, name: string, shopName: string, shopSlug: string, opts: {
  address: string; fadeScore: number; reviewCount: number; avgPrice: number;
  specialties: string[]; phone?: string; instagram?: string; website?: string;
  isHiddenGem?: boolean; isCheap?: boolean; hairTypes?: HairType[];
  reviews: { platform: string; rating: number; reviewCount: number }[];
}, cityInfo: CityInfo = SLC): Barber {
  return {
    id, name, slug, shopName, shopSlug, ...cityInfo,
    fadeScore: opts.fadeScore, reviewCount: opts.reviewCount, avgPrice: opts.avgPrice,
    specialties: opts.specialties, address: opts.address,
    phone: opts.phone, instagram: opts.instagram, website: opts.website,
    isHiddenGem: opts.isHiddenGem, isCheap: opts.isCheap,
    hairTypes: opts.hairTypes,
    reviews: opts.reviews as Barber["reviews"],
  };
}

const OTHER_SHOPS: Barber[] = [
  // Another Level Barbershop — recommended for Black hair (Medium article, Yelp)
  shop("real-slc-another-level", "another-level-barbershop-salt-lake-city", "Another Level Barbershop", "Another Level Barbershop", "another-level-barbershop-salt-lake-city", {
    address: "631 W North Temple, Ste 600, Salt Lake City, UT 84116", phone: "(801) 534-1003",
    instagram: "@anotherlevelbarbershop", website: "https://www.anotherlevelbarbers.com",
    fadeScore: 4.5, reviewCount: 81, avgPrice: 30, specialties: ["Fades", "Beard", "Line Up"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 81 }],
  }),

  // Black Diamond Barbershop and Salon — diverse artists, inclusive (Google, Yelp)
  shop("real-slc-black-diamond", "black-diamond-barbershop-salt-lake-city", "Black Diamond Barbershop", "Black Diamond Barbershop and Salon", "black-diamond-barbershop-salt-lake-city", {
    address: "1760 S 1100 E, Ste 8, Salt Lake City, UT 84105", phone: "(801) 467-8104",
    instagram: "@blackdiamondbarbershopandsalon", website: "https://www.blackdiamondbarbershop.com",
    fadeScore: 4.7, reviewCount: 185, avgPrice: 35, specialties: ["Fades", "Braids", "Designs"],
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 185 }, { platform: "yelp", rating: 4.0, reviewCount: 43 }],
  }),

  // Black Borough Barbershop
  shop("real-slc-black-borough", "black-borough-barbershop-salt-lake-city", "Black Borough Barbershop", "Black Borough Barbershop", "black-borough-barbershop-salt-lake-city", {
    address: "1033 E 2100 S, Ste 211, Salt Lake City, UT 84106", phone: "(801) 657-7294",
    fadeScore: 4.5, reviewCount: 32, avgPrice: 30, specialties: ["Fades", "Beard", "Edge Up"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 32 }],
  }),

  // Loc'd N Faded SLC — Black-owned, locs + fades (Voyage Utah, Google)
  shop("real-slc-locd-n-faded", "locd-n-faded-slc-salt-lake-city", "Loc'd N Faded SLC", "Loc'd N Faded SLC", "locd-n-faded-slc-salt-lake-city", {
    address: "10965 State St, Suite 102, Sandy, UT 84070", phone: "(801) 884-7232",
    instagram: "@locdnfadedslc", website: "https://locdnfadedslc.com",
    fadeScore: 4.9, reviewCount: 87, avgPrice: 35, specialties: ["Fades", "Locs", "Beard"],
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 87 }],
  }),

  // Chai's Barber Shop — Utah Black Chamber of Commerce listed
  shop("real-slc-chais", "chais-barber-shop-salt-lake-city", "Chai's Barber Shop", "Chai's Barber Shop", "chais-barber-shop-salt-lake-city", {
    address: "2943 E 3300 S, Salt Lake City, UT 84109", phone: "(801) 573-3296",
    website: "https://chaisbarbershop.weebly.com",
    fadeScore: 4.5, reviewCount: 34, avgPrice: 28, specialties: ["Fades", "Tapers", "Beard"],
    isHiddenGem: true, isCheap: true,
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 34 }],
  }),

  // Break Bread Barber Co — "Utah's Urban Barber Shop" (Google, Facebook)
  shop("real-slc-break-bread", "break-bread-barber-co-salt-lake-city", "Break Bread Barber Co", "Break Bread Barber Co", "break-bread-barber-co-salt-lake-city", {
    address: "910 N 900 W, Suite A, Salt Lake City, UT 84116", phone: "(385) 483-4077",
    instagram: "@breakbreadbarberco", website: "https://breakbreadbarber.com",
    fadeScore: 4.8, reviewCount: 157, avgPrice: 35, specialties: ["Fades", "Beard", "Line Up"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 157 }, { platform: "facebook", rating: 5.0, reviewCount: 30 }],
  }),

  // Xcellent Cuts (Booksy listing)
  shop("real-slc-xcellent", "xcellent-cuts-salt-lake-city", "Xcellent Cuts", "Xcellent Cuts", "xcellent-cuts-salt-lake-city", {
    address: "1651 W 4800 S, Taylorsville, UT 84123", instagram: "@xcellentcuts",
    fadeScore: 4.9, reviewCount: 45, avgPrice: 30, specialties: ["Fades", "Beard", "Line Up"],
    isHiddenGem: true,
    reviews: [{ platform: "booksy", rating: 5.0, reviewCount: 45 }],
  }),

  // JT's Barbershop (Google)
  shop("real-slc-jts", "jts-barbershop-salt-lake-city", "JT's Barbershop", "JT's Barbershop", "jts-barbershop-salt-lake-city", {
    address: "33 E Kelsey Ave, Salt Lake City, UT 84111", phone: "(801) 556-0195",
    fadeScore: 4.9, reviewCount: 44, avgPrice: 30, specialties: ["Fades", "Beard", "Line Up"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 44 }],
  }),

  // Visions Barbershop (Yelp)
  shop("real-slc-visions", "visions-barbershop-salt-lake-city", "Visions Barbershop", "Visions Barbershop", "visions-barbershop-salt-lake-city", {
    address: "3424 S State St, Suite E, South Salt Lake, UT 84115", phone: "(801) 706-1705",
    fadeScore: 4.5, reviewCount: 22, avgPrice: 28, specialties: ["Fades", "Tapers", "Beard"],
    isCheap: true,
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 22 }],
  }),

  // Cutthroat Barbershop — West Valley City (Yelp)
  shop("real-slc-cutthroat-wvc", "cutthroat-barbershop-wvc-salt-lake-city", "Cutthroat Barbershop", "Cutthroat Barbershop", "cutthroat-barbershop-wvc-salt-lake-city", {
    address: "2851 S Redwood Rd, West Valley City, UT 84119", phone: "(385) 242-7523",
    instagram: "@cutthroat.barbershop", website: "https://www.cutthroatbarbershopslc.com",
    fadeScore: 4.5, reviewCount: 72, avgPrice: 30, specialties: ["Fades", "Designs", "Straight Razor"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 72 }],
  }),

  // Cutthroat Barbershop — South Jordan (Yelp)
  shop("real-slc-cutthroat-sj", "cutthroat-south-jordan-salt-lake-city", "Cutthroat Barbershop South Jordan", "Cutthroat Barbershop South Jordan", "cutthroat-barbershop-sj-salt-lake-city", {
    address: "10610 S 1776 W, Ste D, South Jordan, UT 84095", phone: "(385) 529-5612",
    instagram: "@cutthroat.barbershop", website: "https://www.cutthroatbarbershopslc.com",
    fadeScore: 4.5, reviewCount: 42, avgPrice: 30, specialties: ["Fades", "Tapers", "Straight Razor"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 42 }],
  }, SOUTH_JORDAN),

  // Cutthroat Barbershop — Sandy (Google)
  shop("real-slc-cutthroat-sandy", "cutthroat-sandy-salt-lake-city", "Cutthroat Barbershop Sandy", "Cutthroat Barbershop Sandy", "cutthroat-barbershop-sandy-salt-lake-city", {
    address: "7701 S 700 E, Sandy, UT 84047", phone: "(801) 666-8097",
    instagram: "@cutthroat.barbershop", website: "https://www.cutthroatbarbershopslc.com",
    fadeScore: 4.6, reviewCount: 77, avgPrice: 30, specialties: ["Fades", "Tapers", "Designs"],
    reviews: [{ platform: "google", rating: 4.6, reviewCount: 77 }],
  }),

  // Shades of Fades Barbershop (Google, Facebook)
  shop("real-slc-shades-of-fades", "shades-of-fades-salt-lake-city", "Shades of Fades Barbershop", "Shades of Fades Barbershop", "shades-of-fades-salt-lake-city", {
    address: "6888 S Redwood Rd, West Jordan, UT 84084", phone: "(385) 271-7035",
    website: "https://shadesoffadesbarbershop.com",
    fadeScore: 4.7, reviewCount: 96, avgPrice: 28, specialties: ["Fades", "Beard", "Line Up"],
    isHiddenGem: true, isCheap: true,
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 96 }, { platform: "facebook", rating: 4.2, reviewCount: 10 }],
  }),

  // Oish Barber Shop (Facebook, Yelp)
  shop("real-slc-oish", "oish-barber-shop-salt-lake-city", "Oish Barber Shop", "Oish Barber Shop", "oish-barber-shop-salt-lake-city", {
    address: "3666 W 3500 S, West Valley City, UT 84120", phone: "(801) 840-4856",
    instagram: "@oishbarbershop", website: "https://oishmerch.com",
    fadeScore: 4.6, reviewCount: 387, avgPrice: 30, specialties: ["Fades", "Beard", "Designs"],
    reviews: [{ platform: "facebook", rating: 4.6, reviewCount: 387 }, { platform: "yelp", rating: 4.5, reviewCount: 32 }],
  }),

  // Denny's Barber Salon (Google)
  shop("real-slc-dennys", "dennys-barber-salon-salt-lake-city", "Denny's Barber Salon", "Denny's Barber Salon", "dennys-barber-salon-salt-lake-city", {
    address: "3460 S Redwood Rd, Unit 4, West Valley City, UT 84119", phone: "(385) 242-7090",
    instagram: "@barberdenny",
    fadeScore: 4.7, reviewCount: 40, avgPrice: 25, specialties: ["Fades", "Beard", "Line Up"],
    isHiddenGem: true, isCheap: true,
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 40 }],
  }),

  // A Philly Aided Barbers (Google)
  shop("real-slc-philly-aided", "a-philly-aided-barbers-salt-lake-city", "A Philly Aided Barbers", "A Philly Aided Barbers", "a-philly-aided-barbers-salt-lake-city", {
    address: "5608 S Redwood Rd, Taylorsville, UT 84123", phone: "(385) 237-3875",
    instagram: "@aphillyaided_barbers", website: "https://www.aphillyaided.com",
    fadeScore: 4.9, reviewCount: 191, avgPrice: 30, specialties: ["Fades", "Beard", "Straight Razor"],
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 191 }],
  }),

  // The Barber House (Google)
  shop("real-slc-barber-house", "the-barber-house-salt-lake-city", "The Barber House", "The Barber House", "the-barber-house-salt-lake-city", {
    address: "2308 W 5400 S, Taylorsville, UT 84129", phone: "(385) 900-4699",
    fadeScore: 4.9, reviewCount: 70, avgPrice: 30, specialties: ["Fades", "Tapers", "Designs"],
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 70 }],
  }),

  // The Firme Fade Barber Shop (Google)
  shop("real-slc-firme-fade", "firme-fade-barber-shop-salt-lake-city", "The Firme Fade Barber Shop", "The Firme Fade Barber Shop", "the-firme-fade-salt-lake-city", {
    address: "4840 S Redwood Rd, Taylorsville, UT 84123", instagram: "@thefirmefade_23",
    fadeScore: 4.5, reviewCount: 20, avgPrice: 28, specialties: ["Fades", "Tapers", "Line Up"],
    isCheap: true,
    reviews: [{ platform: "google", rating: 4.5, reviewCount: 20 }],
  }),

  // In The Cut Barbershop (Google)
  shop("real-slc-in-the-cut", "in-the-cut-barbershop-salt-lake-city", "In The Cut Barbershop", "In The Cut Barbershop", "in-the-cut-barbershop-salt-lake-city", {
    address: "7046 S State St, Midvale, UT 84047", phone: "(801) 666-2099",
    website: "https://inthecutmidvale.com",
    fadeScore: 4.8, reviewCount: 213, avgPrice: 40, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 213 }],
  }),

  // Faded Barbershop — Riverton (Yelp)
  shop("real-slc-faded-riverton", "faded-barbershop-riverton-salt-lake-city", "Faded Barbershop", "Faded Barbershop", "faded-barbershop-riverton-salt-lake-city", {
    address: "12652 S 2700 W, Ste C, Riverton, UT 84065", phone: "(801) 680-9474",
    instagram: "@faded_saltlake", website: "https://www.fadedsaltlake.com",
    fadeScore: 4.5, reviewCount: 16, avgPrice: 30, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 16 }],
  }, SOUTH_JORDAN),

  // Faded Forge Barbershop — Layton (Google)
  shop("real-slc-faded-forge", "faded-forge-barbershop-salt-lake-city", "Faded Forge Barbershop", "Faded Forge Barbershop", "faded-forge-barbershop-salt-lake-city", {
    address: "2146 N Main St, Suite 526, Layton, UT 84041", phone: "(385) 453-9641",
    fadeScore: 4.6, reviewCount: 25, avgPrice: 30, specialties: ["Fades", "Tapers", "Straight Razor"],
    reviews: [{ platform: "google", rating: 4.6, reviewCount: 25 }],
  }, LAYTON),

  // Ace of Fades — Clearfield (Google)
  shop("real-slc-ace-of-fades", "ace-of-fades-salt-lake-city", "Ace of Fades", "Ace of Fades", "ace-of-fades-salt-lake-city", {
    address: "525 State St, #5, Clearfield, UT 84015",
    fadeScore: 4.8, reviewCount: 89, avgPrice: 30, specialties: ["Fades", "Tapers", "Line Up"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 89 }],
  }, LAYTON),

  // Fades and Shades Barber Shop — Roy (Facebook)
  shop("real-slc-fades-shades", "fades-and-shades-salt-lake-city", "Fades and Shades Barber Shop", "Fades and Shades Barber Shop", "fades-and-shades-salt-lake-city", {
    address: "1975 W 5300 S, Roy, UT 84067", phone: "(801) 686-4041",
    fadeScore: 4.8, reviewCount: 10, avgPrice: 28, specialties: ["Fades", "Tapers", "Beard"],
    isHiddenGem: true, isCheap: true,
    reviews: [{ platform: "facebook", rating: 4.8, reviewCount: 10 }],
  }, OGDEN),

  // Regal Barber Co — Murray (Yelp)
  shop("real-slc-regal-murray", "regal-barber-co-murray-salt-lake-city", "Regal Barber Co", "Regal Barber Co", "regal-barber-co-murray-salt-lake-city", {
    address: "282 W 4500 S, Murray, UT 84107", website: "https://regalbarberco.com",
    fadeScore: 4.5, reviewCount: 24, avgPrice: 32, specialties: ["Fades", "Tapers", "Designs"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 24 }],
  }),

  // Regal Barber Co — West Valley City (Google)
  shop("real-slc-regal-wvc", "regal-barber-co-wvc-salt-lake-city", "Regal Barber Co West Valley", "Regal Barber Co West Valley", "regal-barber-co-wvc-salt-lake-city", {
    address: "2222 W 3500 S, Ste A3, West Valley City, UT 84119", phone: "(385) 270-5138",
    website: "https://regalbarberco.com",
    fadeScore: 4.5, reviewCount: 20, avgPrice: 32, specialties: ["Fades", "Tapers", "Designs"],
    reviews: [{ platform: "google", rating: 4.5, reviewCount: 20 }],
  }),

  // On The Blade Barber Company (Google)
  shop("real-slc-on-the-blade", "on-the-blade-barber-co-salt-lake-city", "On The Blade Barber Company", "On The Blade Barber Company", "on-the-blade-barber-co-salt-lake-city", {
    address: "11 E 400 S, Salt Lake City, UT 84111", phone: "(801) 364-1924",
    website: "https://www.onthebladebarberco.com",
    fadeScore: 4.9, reviewCount: 124, avgPrice: 35, specialties: ["Fades", "Beard", "Line Up"],
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 124 }],
  }),

  // Jae's Barbershop (Yelp)
  shop("real-slc-jaes", "jaes-barbershop-salt-lake-city", "Jae's Barbershop", "Jae's Barbershop", "jaes-barbershop-salt-lake-city", {
    address: "3848 S West Temple, Suite 110, Salt Lake City, UT 84115", phone: "(801) 486-0282",
    website: "https://jaesbarbershop.com",
    fadeScore: 4.5, reviewCount: 15, avgPrice: 30, specialties: ["Fades", "Tapers", "Straight Razor"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 15 }],
  }),

  // The Block Barbershop — Downtown (Google)
  shop("real-slc-block-dt", "block-barbershop-downtown-salt-lake-city", "The Block Barbershop", "The Block Barbershop", "the-block-barbershop-salt-lake-city", {
    address: "218 S 200 E, Salt Lake City, UT 84111", website: "https://www.blockbarbershopslc.com",
    fadeScore: 4.9, reviewCount: 162, avgPrice: 30, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 162 }],
  }),

  // The Block Barbershop — Sugar House (Google)
  shop("real-slc-block-sh", "block-barbershop-sugar-house-salt-lake-city", "The Block Barbershop Sugar House", "The Block Barbershop Sugar House", "the-block-sugar-house-salt-lake-city", {
    address: "2075 S 700 E, Salt Lake City, UT 84105", website: "https://www.blockbarbershopslc.com",
    fadeScore: 4.8, reviewCount: 80, avgPrice: 30, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 80 }],
  }),

  // The Block Barbershop — Cottonwood Heights (Google)
  shop("real-slc-block-cw", "block-barbershop-cottonwood-salt-lake-city", "The Block Barbershop Cottonwood Heights", "The Block Barbershop Cottonwood Heights", "the-block-cottonwood-salt-lake-city", {
    address: "1844 E Fort Union Blvd, Ste 16, Cottonwood Heights, UT 84121", website: "https://www.blockbarbershopslc.com",
    fadeScore: 4.7, reviewCount: 50, avgPrice: 30, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 50 }],
  }),

  // Clean Cut Barber Shop (Google)
  shop("real-slc-cleancut", "clean-cut-barber-shop-salt-lake-city", "Clean Cut Barber Shop", "Clean Cut Barber Shop", "clean-cut-barber-shop-salt-lake-city", {
    address: "21 E Kelsey Ave, Salt Lake City, UT 84111", phone: "(801) 671-2613",
    website: "https://cleancutslc.com",
    fadeScore: 4.8, reviewCount: 91, avgPrice: 28, specialties: ["Fades", "Tapers", "Beard"],
    isHiddenGem: true, isCheap: true,
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 91 }],
  }),

  // The Salt Lake Barber Company (Yelp)
  shop("real-slc-slbc-main", "salt-lake-barber-company-salt-lake-city", "The Salt Lake Barber Company", "The Salt Lake Barber Company", "salt-lake-barber-company-salt-lake-city", {
    address: "10 E 800 S, Salt Lake City, UT 84111", phone: "(385) 261-2196",
    instagram: "@saltlakebarberco", website: "https://saltlakebarberco.com",
    fadeScore: 4.5, reviewCount: 58, avgPrice: 35, specialties: ["Fades", "Tapers", "Straight Razor"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 58 }],
  }),

  // The Salt Lake Barber Company — Westside (Google)
  shop("real-slc-slbc-west", "salt-lake-barber-company-westside-salt-lake-city", "The Salt Lake Barber Company Westside", "The Salt Lake Barber Company Westside", "salt-lake-barber-company-westside-salt-lake-city", {
    address: "285 N 900 W, Salt Lake City, UT 84116", instagram: "@saltlakebarberco",
    website: "https://saltlakebarberco.com",
    fadeScore: 4.6, reviewCount: 30, avgPrice: 35, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 4.6, reviewCount: 30 }],
  }),

  // The Bureau Barber + Shop (Google, Yelp)
  shop("real-slc-bureau", "bureau-barber-shop-salt-lake-city", "The Bureau Barber + Shop", "The Bureau Barber + Shop", "the-bureau-barber-salt-lake-city", {
    address: "281 S Weechquootee Pl, Salt Lake City, UT 84111", phone: "(801) 410-4007",
    website: "https://www.bureaubarbershop.com",
    fadeScore: 4.7, reviewCount: 269, avgPrice: 40, specialties: ["Fades", "Skin Fade", "Beard"],
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 269 }, { platform: "yelp", rating: 4.0, reviewCount: 30 }],
  }),

  // GQ Barber Co (Google)
  shop("real-slc-gq", "gq-barber-co-salt-lake-city", "GQ Barber Co", "GQ Barber Co", "gq-barber-co-salt-lake-city", {
    address: "587 Fort Union Blvd, Midvale, UT 84047", phone: "(385) 228-5938",
    instagram: "@gqbarberco.slc", website: "https://www.gqbarber.co",
    fadeScore: 4.8, reviewCount: 45, avgPrice: 35, specialties: ["Fades", "Beard", "Modern Cuts"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 45 }],
  }),

  // Love Thy Barber (Yelp)
  shop("real-slc-love-thy", "love-thy-barber-salt-lake-city", "Love Thy Barber", "Love Thy Barber", "love-thy-barber-salt-lake-city", {
    address: "10965 State St, Suite 113, Sandy, UT 84070", phone: "(801) 742-1285",
    instagram: "@559hair",
    fadeScore: 4.5, reviewCount: 15, avgPrice: 30, specialties: ["Fades", "Beard", "Straight Razor"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 15 }],
  }),

  // Bootlegged Barber Co (Google)
  shop("real-slc-bootlegged", "bootlegged-barber-co-salt-lake-city", "Bootlegged Barber Co", "Bootlegged Barber Co", "bootlegged-barber-co-salt-lake-city", {
    address: "49 W 10600 S, Sandy, UT 84070", phone: "(801) 835-2091",
    instagram: "@bootleggedbarber_sandy", website: "https://www.bootleggedbarberco.com",
    fadeScore: 4.7, reviewCount: 60, avgPrice: 35, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 60 }],
  }),

  // Excel Barber Shop (Google)
  shop("real-slc-excel", "excel-barber-shop-salt-lake-city", "Excel Barber Shop", "Excel Barber Shop", "excel-barber-shop-salt-lake-city", {
    address: "880 E 9400 S, Ste 101, Sandy, UT 84094", phone: "(801) 300-8474",
    fadeScore: 4.9, reviewCount: 187, avgPrice: 30, specialties: ["Fades", "Beard", "Line Up"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 187 }],
  }),

  // Boba Cutz (Yelp)
  shop("real-slc-boba", "boba-cutz-salt-lake-city", "Boba Cutz", "Boba Cutz", "boba-cutz-salt-lake-city", {
    address: "25 E Kensington Ave, Salt Lake City, UT 84115", website: "https://www.bobacutz.com",
    fadeScore: 4.5, reviewCount: 21, avgPrice: 35, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 21 }],
  }),

  // Kraken Barbers (Google, Yelp)
  shop("real-slc-kraken", "kraken-barbers-salt-lake-city", "Kraken Barbers", "Kraken Barbers", "kraken-barbers-salt-lake-city", {
    address: "43 Fort Union Blvd, S72 Salon Studio, Midvale, UT 84047", phone: "(801) 634-5658",
    website: "https://www.krakenbarbers.com",
    fadeScore: 4.9, reviewCount: 333, avgPrice: 35, specialties: ["Fades", "Beard", "Classic Shave"],
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 200 }, { platform: "yelp", rating: 4.5, reviewCount: 133 }],
  }),

  // Tailored Barber Company — Ogden (Google)
  shop("real-slc-tailored", "tailored-barber-company-salt-lake-city", "Tailored Barber Company", "Tailored Barber Company", "tailored-barber-company-salt-lake-city", {
    address: "753 S Washington Blvd, Ogden, UT 84404", phone: "(385) 354-5748",
    instagram: "@tailored_barber_co", website: "https://www.tailoredbarberco.com",
    fadeScore: 4.8, reviewCount: 75, avgPrice: 30, specialties: ["Fades", "Burst Fade", "Designs"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 75 }],
  }, OGDEN),

  // OakRidge Barbers — Ogden (Google)
  shop("real-slc-oakridge", "oakridge-barbers-salt-lake-city", "OakRidge Barbers", "OakRidge Barbers", "oakridge-barbers-salt-lake-city", {
    address: "700 40th St, Ogden, UT 84403", phone: "(801) 394-1624",
    instagram: "@Oakridge_barbers",
    fadeScore: 4.8, reviewCount: 133, avgPrice: 22, specialties: ["Fades", "Military Cuts", "Straight Razor"],
    isCheap: true, isHiddenGem: true,
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 133 }],
  }, OGDEN),

  // J & P Barber Shop — Layton (Yelp)
  shop("real-slc-jp", "j-and-p-barber-shop-salt-lake-city", "J & P Barber Shop", "J & P Barber Shop", "j-and-p-barber-shop-salt-lake-city", {
    address: "1014 W Gentile St, Layton, UT 84041", phone: "(801) 546-2053",
    fadeScore: 4.5, reviewCount: 18, avgPrice: 25, specialties: ["Fades", "Tapers", "Hot Lather Shave"],
    isCheap: true,
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 18 }],
  }, LAYTON),

  // Salty Barbers — Provo (Google, Booksy)
  shop("real-slc-salty", "salty-barbers-salt-lake-city", "Salty Barbers", "Salty Barbers", "salty-barbers-salt-lake-city", {
    address: "46 W Center St, Provo, UT 84601", phone: "(801) 310-3616",
    instagram: "@saltybarbers", website: "https://www.saltybarbers.com",
    fadeScore: 4.7, reviewCount: 95, avgPrice: 30, specialties: ["Fades", "Straight Razor", "Beard"],
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 95 }, { platform: "booksy", rating: 5.0, reviewCount: 30 }],
  }, PROVO),

  // The Man Barber — Provo (Google, Yelp)
  shop("real-slc-manbarber", "the-man-barber-salt-lake-city", "The Man Barber", "The Man Barber", "the-man-barber-salt-lake-city", {
    address: "120 W Center St, Provo, UT 84601", phone: "(801) 896-7163",
    instagram: "@the_man_barber", website: "https://www.themanbarber.com",
    fadeScore: 4.7, reviewCount: 182, avgPrice: 30, specialties: ["Fades", "Straight Razor", "Classic Cuts"],
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 182 }, { platform: "yelp", rating: 4.5, reviewCount: 52 }],
  }, PROVO),

  // Boneyard Barbering — Provo (Yelp)
  shop("real-slc-boneyard", "boneyard-barbering-salt-lake-city", "Boneyard Barbering", "Boneyard Barbering", "boneyard-barbering-salt-lake-city", {
    address: "190 W 400 N, Provo, UT 84601", phone: "(385) 283-7752",
    website: "https://boneyardbarbering.com",
    fadeScore: 4.5, reviewCount: 25, avgPrice: 30, specialties: ["Fades", "Line Up", "Beard"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 25 }],
  }, PROVO),

  // Elevate Barbershop — Centerville (Google)
  shop("real-slc-elevate", "elevate-barbershop-salt-lake-city", "Elevate Barbershop", "Elevate Barbershop", "elevate-barbershop-salt-lake-city", {
    address: "181 S Main St, Centerville, UT 84014", phone: "(801) 292-2100",
    fadeScore: 4.9, reviewCount: 114, avgPrice: 30, specialties: ["Fades", "Clipper Cuts", "Beard"],
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 114 }],
  }),

  // United Barber Company — Bountiful (Google)
  shop("real-slc-united", "united-barber-company-salt-lake-city", "United Barber Company", "United Barber Company", "united-barber-company-salt-lake-city", {
    address: "273 W 500 S, Ste 13, Bountiful, UT 84010", phone: "(385) 777-2943",
    website: "https://unitedbarberco.com",
    fadeScore: 4.9, reviewCount: 119, avgPrice: 30, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 119 }],
  }),

  // Hall of Fades Barber Studio — Draper (Google)
  shop("real-slc-hall-of-fades", "hall-of-fades-salt-lake-city", "Hall of Fades Barber Studio", "Hall of Fades Barber Studio", "hall-of-fades-salt-lake-city", {
    address: "441 12300 S, Ste 103, Draper, UT 84020", phone: "(385) 220-4898",
    website: "https://halloffadesbarber.com",
    fadeScore: 4.6, reviewCount: 30, avgPrice: 30, specialties: ["Fades", "Scalp Treatment", "Beard"],
    reviews: [{ platform: "google", rating: 4.6, reviewCount: 30 }],
  }),

  // Shear Grooves — West Valley City (Google)
  shop("real-slc-shear", "shear-grooves-salt-lake-city", "Shear Grooves", "Shear Grooves", "shear-grooves-salt-lake-city", {
    address: "3536 W 3100 S, West Valley City, UT 84119", phone: "(801) 972-2929",
    fadeScore: 4.4, reviewCount: 15, avgPrice: 20, specialties: ["Fades", "Tapers", "Classic Cuts"],
    isCheap: true,
    reviews: [{ platform: "google", rating: 4.4, reviewCount: 15 }],
  }),

  // Salt City Barbershop — Midvale (Yelp)
  shop("real-slc-saltcity", "salt-city-barbershop-salt-lake-city", "Salt City Barbershop", "Salt City Barbershop", "salt-city-barbershop-salt-lake-city", {
    address: "752 E Fort Union Blvd, Midvale, UT 84047", phone: "(385) 900-8557",
    website: "https://www.saltcitybarber.com",
    fadeScore: 4.5, reviewCount: 12, avgPrice: 30, specialties: ["Fades", "Tapers", "Classic Cuts"],
    reviews: [{ platform: "yelp", rating: 4.5, reviewCount: 12 }],
  }),

  // ─── OGDEN AREA ──────────────────────────────────────────────────────

  // Syn- House of Hair — Ogden (Google, Vagaro)
  shop("real-slc-syn", "syn-house-of-hair-salt-lake-city", "Syn- House of Hair", "Syn- House of Hair", "syn-house-of-hair-salt-lake-city", {
    address: "2419 Kiesel Ave, Ogden, UT 84401", phone: "(801) 896-8273",
    fadeScore: 4.9, reviewCount: 28, avgPrice: 35, specialties: ["Fades", "Straight Razor", "Beard"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 28 }],
  }, OGDEN),

  // Gents Barbershop — Ogden (Google)
  shop("real-slc-gents-ogden", "gents-barbershop-salt-lake-city", "Gents Barbershop", "Gents Barbershop", "gents-barbershop-salt-lake-city", {
    address: "216 24th St, Ogden, UT 84401", phone: "(801) 721-8611",
    fadeScore: 4.8, reviewCount: 166, avgPrice: 30, specialties: ["Fades", "Tapers", "Classic Cuts"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 166 }],
  }, OGDEN),

  // Moore's Barber Shop — Ogden Historic 25th St (Google)
  shop("real-slc-moores", "moores-barber-shop-salt-lake-city", "Moore's Barber Shop", "Moore's Barber Shop", "moores-barber-shop-salt-lake-city", {
    address: "196 25th St, Ogden, UT 84401", phone: "(801) 898-6134",
    website: "https://mooresbarbershopogden.com",
    fadeScore: 4.9, reviewCount: 80, avgPrice: 25, specialties: ["Fades", "Tapers", "Beard"],
    isHiddenGem: true, isCheap: true,
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 80 }],
  }, OGDEN),

  // Empyre Barbershop — North Ogden (Google)
  shop("real-slc-empyre", "empyre-barbershop-salt-lake-city", "Empyre Barbershop", "Empyre Barbershop", "empyre-barbershop-salt-lake-city", {
    address: "2426 N Washington Blvd, North Ogden, UT 84414", phone: "(385) 333-9129",
    instagram: "@empyrebarbershop", website: "https://www.empyrebarbershop.com",
    fadeScore: 4.9, reviewCount: 221, avgPrice: 40, specialties: ["Fades", "Skin Fade", "Beard"],
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 221 }],
  }, OGDEN),

  // Port Town Barber — Ogden (Google)
  shop("real-slc-port-town", "port-town-barber-salt-lake-city", "Port Town Barber", "Port Town Barber", "port-town-barber-salt-lake-city", {
    address: "3040 Washington Blvd, Ogden, UT 84401", phone: "(385) 389-9459",
    website: "https://www.porttownbarber.com",
    fadeScore: 4.9, reviewCount: 24, avgPrice: 35, specialties: ["Fades", "Straight Razor", "Classic Cuts"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 24 }],
  }, OGDEN),

  // Ogden Barber Company — Ogden (Google)
  shop("real-slc-ogden-barber-co", "ogden-barber-company-salt-lake-city", "Ogden Barber Company", "Ogden Barber Company", "ogden-barber-company-salt-lake-city", {
    address: "2338 Washington Blvd, Ogden, UT 84401", phone: "(385) 390-2047",
    website: "https://ogdenbarberco.com",
    fadeScore: 4.9, reviewCount: 236, avgPrice: 35, specialties: ["Fades", "Beard", "Hot Towel Shave"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 236 }],
  }, OGDEN),

  // Thee Barber Shop — Ogden (Google)
  shop("real-slc-thee", "thee-barber-shop-salt-lake-city", "Thee Barber Shop", "Thee Barber Shop", "thee-barber-shop-salt-lake-city", {
    address: "3084 S 1900 W, Ste B, Ogden, UT 84401", phone: "(801) 388-8447",
    fadeScore: 4.7, reviewCount: 12, avgPrice: 22, specialties: ["Fades", "Tapers", "Classic Cuts"],
    isCheap: true,
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 12 }],
  }, OGDEN),

  // ─── LOGAN AREA ──────────────────────────────────────────────────────

  // Pablo's Barbershop — Logan (Google, Yelp)
  shop("real-slc-pablos", "pablos-barbershop-salt-lake-city", "Pablo's Barbershop", "Pablo's Barbershop", "pablos-barbershop-salt-lake-city", {
    address: "559 N Main St, Logan, UT 84321", phone: "(435) 713-4333",
    fadeScore: 4.5, reviewCount: 344, avgPrice: 20, specialties: ["Fades", "Tapers", "Line Up"],
    isCheap: true,
    reviews: [{ platform: "google", rating: 4.5, reviewCount: 344 }],
  }, LOGAN),

  // G.O.A.T. Haircuts — Logan (Google)
  shop("real-slc-goat", "goat-haircuts-salt-lake-city", "G.O.A.T. Haircuts", "G.O.A.T. Haircuts", "goat-haircuts-salt-lake-city", {
    address: "532 S Main St, Suite 1, Logan, UT 84321", phone: "(435) 787-7110",
    website: "https://goathaircuts.com/logan",
    fadeScore: 4.9, reviewCount: 1000, avgPrice: 30, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 1000 }],
  }, LOGAN),

  // Cache Cuts — Logan (website)
  shop("real-slc-cache-cuts", "cache-cuts-salt-lake-city", "Cache Cuts", "Cache Cuts", "cache-cuts-salt-lake-city", {
    address: "418 N 175 E, Suite 230, Logan, UT 84321",
    website: "https://cachecuts.com",
    fadeScore: 4.7, reviewCount: 30, avgPrice: 30, specialties: ["Fades", "Straight Razor", "Beard"],
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 30 }],
  }, LOGAN),

  // Imperial Barbershop — Logan (Google)
  shop("real-slc-imperial", "imperial-barbershop-salt-lake-city", "Imperial Barbershop", "Imperial Barbershop", "imperial-barbershop-salt-lake-city", {
    address: "990 Main St, Suite F1, Logan, UT 84321", phone: "(801) 391-3084",
    website: "https://www.imperialbarbershoplc.com",
    fadeScore: 4.8, reviewCount: 66, avgPrice: 25, specialties: ["Fades", "Line Up", "Beard"],
    isHiddenGem: true, isCheap: true,
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 66 }],
  }, LOGAN),

  // ─── LAYTON AREA ─────────────────────────────────────────────────────

  // Charlie's Barbershop — Layton (Google, Booksy)
  shop("real-slc-charlies", "charlies-barbershop-salt-lake-city", "Charlie's Barbershop", "Charlie's Barbershop", "charlies-barbershop-salt-lake-city", {
    address: "1095 N Main St, Suite 10, Layton, UT 84041", phone: "(801) 678-0894",
    fadeScore: 4.5, reviewCount: 62, avgPrice: 30, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 4.5, reviewCount: 62 }],
  }, LAYTON),

  // Main Street Barber Lounge — Layton (Google)
  shop("real-slc-main-st-lounge", "main-street-barber-lounge-salt-lake-city", "Main Street Barber Lounge", "Main Street Barber Lounge", "main-street-barber-lounge-salt-lake-city", {
    address: "1464 N Main St, Layton, UT 84041", phone: "(801) 544-7888",
    instagram: "@mainstreetbarberlounge", website: "https://mainstreetbarberlounge.com",
    fadeScore: 4.8, reviewCount: 86, avgPrice: 30, specialties: ["Fades", "Beard", "Classic Cuts"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 86 }],
  }, LAYTON),

  // Fresh Styles Barbershop — Layton (Google)
  shop("real-slc-fresh-styles", "fresh-styles-barbershop-salt-lake-city", "Fresh Styles Barbershop", "Fresh Styles Barbershop", "fresh-styles-barbershop-salt-lake-city", {
    address: "2704 N Hillfield Rd, Ste 4, Layton, UT 84041", phone: "(385) 393-8418",
    fadeScore: 4.9, reviewCount: 815, avgPrice: 30, specialties: ["Fades", "Tapers", "Designs"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 815 }],
  }, LAYTON),

  // ─── SOUTH JORDAN / HERRIMAN / BLUFFDALE ─────────────────────────────

  // Oscar's Barbershop — South Jordan (Google)
  shop("real-slc-oscars-sj", "oscars-barbershop-south-jordan-salt-lake-city", "Oscar's Barbershop", "Oscar's Barbershop", "oscars-barbershop-south-jordan-salt-lake-city", {
    address: "3731 S Jordan Pkwy, Ste 101, South Jordan, UT 84009", phone: "(385) 281-2148",
    instagram: "@oscarsbarbershop.slc", website: "https://www.oscarsbarbershopslc.com",
    fadeScore: 4.8, reviewCount: 50, avgPrice: 30, specialties: ["Fades", "Beard", "Designs"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 50 }],
  }, SOUTH_JORDAN),

  // Fast Times Barber Co — South Jordan (Google)
  shop("real-slc-fast-times", "fast-times-barber-co-salt-lake-city", "Fast Times Barber Co", "Fast Times Barber Co", "fast-times-barber-co-salt-lake-city", {
    address: "3678 W 9800 S, South Jordan, UT 84009", phone: "(385) 227-3966",
    website: "https://www.fasttimesbarberco.com",
    fadeScore: 4.7, reviewCount: 75, avgPrice: 35, specialties: ["Fades", "Straight Razor", "Beard"],
    reviews: [{ platform: "google", rating: 4.7, reviewCount: 75 }],
  }, SOUTH_JORDAN),

  // Eastman's Barbershop — Riverton/Herriman area (Google)
  shop("real-slc-eastmans", "eastmans-barbershop-salt-lake-city", "Eastman's Barbershop", "Eastman's Barbershop", "eastmans-barbershop-salt-lake-city", {
    address: "2364 W 12600 S, Suite C, Riverton, UT 84065", phone: "(801) 502-4099",
    instagram: "@eastmans_barbershop",
    fadeScore: 4.9, reviewCount: 227, avgPrice: 30, specialties: ["Fades", "Beard", "Classic Cuts"],
    reviews: [{ platform: "google", rating: 4.9, reviewCount: 227 }],
  }, SOUTH_JORDAN),

  // Jordan's Barbershop — Bluffdale (Google)
  shop("real-slc-jordans", "jordans-barbershop-salt-lake-city", "Jordan's Barbershop", "Jordan's Barbershop", "jordans-barbershop-salt-lake-city", {
    address: "13961 S Redwood Rd, Unit 101, Bluffdale, UT 84065", phone: "(385) 281-2939",
    website: "https://jordansbarbershoputah.com",
    fadeScore: 4.9, reviewCount: 247, avgPrice: 30, specialties: ["Fades", "Tapers", "Beard"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 247 }],
  }, SOUTH_JORDAN),

  // ─── PROVO / OREM AREA ───────────────────────────────────────────────

  // OTR Cuts by Reezy — Orem (Google)
  shop("real-slc-otr-cuts", "otr-cuts-by-reezy-salt-lake-city", "OTR Cuts by Reezy", "OTR Cuts by Reezy", "otr-cuts-by-reezy-salt-lake-city", {
    address: "570 E University Pkwy, Suite 18, Orem, UT 84097",
    fadeScore: 4.9, reviewCount: 316, avgPrice: 35, specialties: ["Fades", "Tapers", "Designs"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 316 }],
  }, PROVO),

  // The Fellas Chop Shop — Orem (Google)
  shop("real-slc-fellas", "fellas-chop-shop-salt-lake-city", "The Fellas Chop Shop", "The Fellas Chop Shop", "fellas-chop-shop-salt-lake-city", {
    address: "450 W 800 N, Orem, UT 84057", phone: "(801) 607-1412",
    website: "https://book.thefellas.com/orem-shop",
    fadeScore: 4.8, reviewCount: 50, avgPrice: 30, specialties: ["Fades", "Straight Razor", "Beard"],
    reviews: [{ platform: "google", rating: 4.8, reviewCount: 50 }],
  }, PROVO),

  // Redemption Barber Co — Lindon/Orem (Google)
  shop("real-slc-redemption", "redemption-barber-co-salt-lake-city", "Redemption Barber Co", "Redemption Barber Co", "redemption-barber-co-salt-lake-city", {
    address: "135 S State St, Suite 5, Lindon, UT 84042", phone: "(385) 268-9779",
    fadeScore: 4.9, reviewCount: 255, avgPrice: 35, specialties: ["Fades", "Beard", "Line Up"],
    reviews: [{ platform: "google", rating: 5.0, reviewCount: 255 }],
  }, PROVO),

];

// ─── EXPORT BY CITY ─────────────────────────────────────────────────

const ALL = [...FADE_ONE, ...BARBER_LEAGUE, ...OTHER_SHOPS];

function byCity(slug: string) {
  return ALL.filter((b) => b.citySlug === slug).sort((a, b) => b.fadeScore - a.fadeScore);
}

export const SLC_BARBERS = byCity("salt-lake-city");
export const OGDEN_BARBERS = byCity("ogden");
export const LOGAN_BARBERS = byCity("logan");
export const LAYTON_BARBERS = byCity("layton");
export const PROVO_BARBERS = byCity("provo");
export const SOUTH_JORDAN_BARBERS = byCity("south-jordan");

/** @deprecated Use city-specific exports instead */
export const SLC_EXPANDED_BARBERS = ALL.sort((a, b) => b.fadeScore - a.fadeScore);
