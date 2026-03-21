import type { Barber, Shop } from "@/types";

/**
 * Schema.org JSON-LD generators for SEO rich results.
 */

/** Barber profile page — Person + BarberShop */
export function getBarberJsonLd(barber: Barber) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: barber.name,
    jobTitle: "Barber",
    worksFor: {
      "@type": "BarberShop",
      name: barber.shopName,
      ...(barber.address && { address: barber.address }),
      ...(barber.phone && { telephone: barber.phone }),
      ...(barber.website && { url: barber.website }),
    },
    ...(barber.address && {
      address: {
        "@type": "PostalAddress",
        addressLocality: barber.city,
        addressRegion: barber.state,
      },
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: barber.fadeScore,
      bestRating: 5,
      worstRating: 1,
      reviewCount: barber.reviewCount,
    },
  };
}

/** Shop page — LocalBusiness (BarberShop) */
export function getShopJsonLd(shop: Shop) {
  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: shop.name,
    ...(shop.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: shop.address,
        addressLocality: shop.city,
        addressRegion: shop.state,
      },
    }),
    ...(shop.phone && { telephone: shop.phone }),
    ...(shop.website && { url: shop.website }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: shop.fadeScore,
      bestRating: 5,
      worstRating: 1,
      reviewCount: shop.barberCount,
    },
    priceRange: `$${shop.avgPrice}`,
  };
}

/** City listing page — ItemList of barbers */
export function getCityListJsonLd(
  barbers: Barber[],
  cityName: string,
  listName: string,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url,
    numberOfItems: barbers.length,
    itemListElement: barbers.slice(0, 20).map((barber, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BarberShop",
        name: `${barber.name} at ${barber.shopName}`,
        url: `https://fadescore.com/barber/${barber.slug}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: barber.fadeScore,
          bestRating: 5,
          worstRating: 1,
          reviewCount: barber.reviewCount,
        },
        priceRange: `$${barber.avgPrice}`,
      },
    })),
  };
}
