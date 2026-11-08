/**
 * JSON-LD builders. Everything comes from src/content/site.ts so NAP,
 * hours and services can never drift from what's shown on the page.
 * No AggregateRating / Review – we have no reviews on the site.
 */
import {
  SITE_URL,
  business,
  links,
  hours,
  services,
  qualifications,
  isPlaceholder,
} from '../content/site';

export const SALON_ID = `${SITE_URL}/#salon`;
export const PERSON_ID = `${SITE_URL}/about/#rachel`;

export function hairSalonSchema(opts: { image: string; logo?: string }) {
  const open = hours.filter((d) => d.hours);
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': SALON_ID,
    name: business.name,
    url: `${SITE_URL}/`,
    image: opts.image,
    logo: opts.logo ?? opts.image,
    ...(isPlaceholder(business.phone) ? {} : { telephone: business.phone.display }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: open.map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${d.day}`,
      opens: d.hours!.open,
      closes: d.hours!.close,
    })),
    areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
    sameAs: [links.facebook, links.instagram, links.fresha],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: links.fresha,
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
      result: { '@type': 'Reservation', name: 'Hair appointment' },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hair services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          url: `${SITE_URL}/services/#${s.id}`,
        },
      })),
    },
  };
}

export function personSchema(image: string) {
  const { owner } = business;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: isPlaceholder(owner.familyName) ? owner.givenName : `${owner.givenName} ${owner.familyName}`,
    givenName: owner.givenName,
    jobTitle: owner.jobTitle,
    image,
    worksFor: { '@id': SALON_ID },
    hasCredential: qualifications.map((name) => ({
      '@type': 'EducationalOccupationalCredential',
      name,
      credentialCategory: name.startsWith('NVQ') ? 'certificate' : 'professional training',
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
