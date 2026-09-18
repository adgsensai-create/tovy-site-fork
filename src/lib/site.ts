// Single source of truth for business facts used in metadata and JSON-LD.
// Keep these in sync with the Google Business Profile (NAP consistency).

export const site = {
  name: "Tovy Photography",
  url: "https://tovyphotography.com",
  photographer: "Gabi Tovy",
  email: "tovypics@gmail.com",
  phone: "+1-847-542-2073",
  phoneDisplay: "(847) 542-2073",
  instagram: "https://www.instagram.com/tovyphotography/",
  instagramHandle: "@tovyphotography",
  locality: "Skokie",
  region: "IL",
  postalCode: "60076",
  country: "US",
  geo: { latitude: 42.0334, longitude: -87.7334 },
  // Published package prices. Update here and everything downstream follows.
  pricing: {
    mini: 200,
    classic: 325,
    full: 500,
    travelFee: 50,
    travelRadiusMiles: 10,
    extraTimePer15Min: 100,
  },
  priceRange: "$200-$500",
  tagline: "Seeing the good in your world",
};

export const serviceAreaNames = [
  "Skokie",
  "Evanston",
  "Lincolnwood",
  "Wilmette",
  "Morton Grove",
  "Glenview",
  "Niles",
  "Northbrook",
  "Park Ridge",
  "Winnetka",
  "Highland Park",
  "West Rogers Park",
  "Chicago",
];

export function localBusinessJsonLd(overrides: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/photos/hero-engagement-lift.jpg`,
    priceRange: site.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: serviceAreaNames.map((name) => ({ "@type": "City", name })),
    sameAs: [site.instagram],
    founder: { "@type": "Person", name: site.photographer },
    ...overrides,
  };
}

export interface Faq {
  question: string;
  answer: string;
}

// FAQPage JSON-LD. Ampersands are avoided in copy so the output stays clean.
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
