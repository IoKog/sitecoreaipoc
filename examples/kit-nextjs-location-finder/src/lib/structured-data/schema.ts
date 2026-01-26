/**
 * Schema.org structured data generators
 * Provides functions to generate JSON-LD structured data for SEO and rich snippets
 */
import type { JsonLdValue } from './jsonld';

export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
}

export interface WebPageSchema {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  description?: string;
  url: string;
  inLanguage?: string;
}

export interface PlaceSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness' | 'Place';
  name: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
}

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description?: string;
  image?: string;
  url?: string;
  offers?: {
    '@type': 'Offer';
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

export interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface ReviewSchema {
  '@context': 'https://schema.org';
  '@type': 'Review';
  author?: {
    '@type': 'Person';
    name: string;
  };
  reviewBody?: string;
  reviewRating?: {
    '@type': 'Rating';
    ratingValue?: number;
    bestRating?: number;
  };
}

export interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export function generateWebSiteSchema(
  siteName: string,
  siteUrl: string,
  description?: string
): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  } as JsonLdValue;
}

export function generateOrganizationSchema(
  name: string,
  url: string,
  logo?: string,
  description?: string
): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
  } as JsonLdValue;
}

export function generateWebPageSchema(
  pageName: string,
  pageUrl: string,
  description?: string,
  locale?: string
): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageName,
    description,
    url: pageUrl,
    inLanguage: locale || 'en',
  } as JsonLdValue;
}

export function generatePlaceSchema(
  name: string,
  streetAddress?: string,
  city?: string,
  region?: string,
  postalCode?: string,
  country?: string,
  latitude?: number,
  longitude?: number
): JsonLdValue {
  const schema: { [key: string]: JsonLdValue } = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: city,
      addressRegion: region,
      postalCode,
      addressCountry: country || 'US',
    } as JsonLdValue,
  };

  if (latitude && longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    } as JsonLdValue;
  }

  return schema as JsonLdValue;
}

export function generateProductSchema(
  name: string,
  description?: string,
  image?: string,
  url?: string,
  price?: string,
  priceCurrency: string = 'USD'
): JsonLdValue {
  const schema: { [key: string]: JsonLdValue } = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
  };

  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price: price.replace(/[^0-9.]/g, ''), // Strip currency symbols
      priceCurrency,
      availability: 'https://schema.org/InStock',
    } as JsonLdValue;
  }

  return schema as JsonLdValue;
}

export function generateFAQPageSchema(
  questions: Array<{ question: string; answer: string }>
): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  } as JsonLdValue;
}

export function generateReviewSchema(
  authorName: string,
  reviewBody?: string,
  ratingValue?: number,
  bestRating: number = 5
): JsonLdValue {
  const schema: { [key: string]: JsonLdValue } = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: authorName,
    } as JsonLdValue,
    reviewBody,
  };

  if (ratingValue !== undefined) {
    schema.reviewRating = {
      '@type': 'Rating',
      ratingValue,
      bestRating,
    } as JsonLdValue;
  }

  return schema as JsonLdValue;
}

export function generateBreadcrumbListSchema(
  breadcrumbs: Array<{ name: string; url?: string }>
): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  } as JsonLdValue;
}
