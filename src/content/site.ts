/**
 * True Hairdressers – single source of truth for every fact on the site.
 *
 * Pages, header, footer and JSON-LD all read from here. Edit this file to
 * change NAP details, hours, links, services or qualifications.
 *
 * Anything still waiting on Rachel is marked with a `confirm()` placeholder.
 * Those render visibly on the site as "[CONFIRM: …]" so nothing goes live
 * by accident. Search the repo for "CONFIRM" to find them all.
 */

/** A value we don't have yet. Rendered visibly by <Confirm />. */
export interface Placeholder {
  confirm: string;
}
export const confirm = (note: string): Placeholder => ({ confirm: note });
export const isPlaceholder = (v: unknown): v is Placeholder =>
  typeof v === 'object' && v !== null && 'confirm' in v;

// ---------------------------------------------------------------------------
// Business & NAP – must match the Google Business Profile exactly.
// ---------------------------------------------------------------------------

/** Live domain (www is primary; the bare domain redirects). Also used by astro.config. */
export const SITE_URL = 'https://www.truehairdressers.co.uk';

export const business = {
  name: 'True Hairdressers',
  shortName: 'True',
  tagline: 'Your friendly local hairdresser in the heart of Whitnash',
  owner: {
    givenName: 'Rachel',
    familyName: 'Palmer' as Placeholder | string,
    jobTitle: 'Hairdresser and owner',
    yearsQualified: 22,
    yearsInSalons: 27,
  },
  yearOpened: 2017 as Placeholder | number,
  address: {
    street: '75 Home Farm Crescent',
    locality: 'Whitnash',
    town: 'Leamington Spa',
    region: 'Warwickshire',
    postcode: 'CV31 2QY',
    country: 'GB',
  },
  /** One-line address – use this everywhere so NAP stays identical. */
  addressLine: '75 Home Farm Crescent, Whitnash, Leamington Spa CV31 2QY',
  geo: { lat: 52.2690469, lng: -1.5209224 },
  areaServed: ['Whitnash', 'Leamington Spa', 'Warwick'],
  /** From the Google Business Profile. */
  phone: { display: '07772 036680', tel: '+447772036680' } as Placeholder | { display: string; tel: string },
  email: confirm('email – or leave off') as Placeholder | string | null,
} as const;

export const links = {
  fresha:
    'https://www.fresha.com/en-GB/a/true-hairdressers-whitnash-royal-leamington-spa-home-farm-crescent-gyv2wyyx',
  facebook: 'https://www.facebook.com/Truehairdresserswhitnash/',
  instagram: 'https://www.instagram.com/truehairdressers/',
  peakSeo: 'https://peakseo.co.uk',
  /** Took the photos of Rachel and Monty – credited in the footer and on About. */
  photographer: 'https://www.kerriepalmerphotography.co.uk/',
  /** Google Business Profile – where "Read more reviews" points. */
  googleReviews: 'https://www.google.com/maps/place/?q=place_id:ChIJ2wP5RwU1d0gRX4uqPU52nvY',
  /** Rachel's Tropic Ambassador shop – orders through it are linked to her. */
  tropic: 'https://www.tropicskincare.com/rachelpalmer',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=True+Hairdressers%2C+75+Home+Farm+Crescent%2C+Whitnash%2C+Leamington+Spa+CV31+2QY',
  mapEmbed:
    'https://maps.google.com/maps?q=True+Hairdressers%2C+75+Home+Farm+Crescent%2C+Whitnash%2C+Leamington+Spa+CV31+2QY&z=16&output=embed',
} as const;

// ---------------------------------------------------------------------------
// Opening hours (Europe/London). `null` = closed.
// Order is Monday-first for display; `jsDay` matches Date#getDay().
// ---------------------------------------------------------------------------

export interface DayHours {
  day: string;
  short: string;
  jsDay: number;
  hours: { open: string; close: string } | null;
}

export const hours: DayHours[] = [
  { day: 'Monday', short: 'Mon', jsDay: 1, hours: null },
  { day: 'Tuesday', short: 'Tue', jsDay: 2, hours: { open: '09:00', close: '15:00' } },
  { day: 'Wednesday', short: 'Wed', jsDay: 3, hours: { open: '09:00', close: '20:00' } },
  { day: 'Thursday', short: 'Thu', jsDay: 4, hours: null },
  { day: 'Friday', short: 'Fri', jsDay: 5, hours: { open: '09:00', close: '15:00' } },
  { day: 'Saturday', short: 'Sat', jsDay: 6, hours: { open: '09:00', close: '15:00' } },
  { day: 'Sunday', short: 'Sun', jsDay: 0, hours: null },
];

export const lateNightNote = 'Late appointments until 8pm on Wednesdays.';

/** "09:00" -> "9am", "15:30" -> "3:30pm" */
export function formatTime(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`;
}

export const formatHours = (d: DayHours) =>
  d.hours ? `${formatTime(d.hours.open)} – ${formatTime(d.hours.close)}` : 'Closed';

/** e.g. "Tue, Fri & Sat 9am–3pm · Wed 9am–8pm" for compact footers. */
export const hoursSummary = 'Tue, Fri & Sat 9am – 3pm · Wed 9am – 8pm · Mon, Thu & Sun closed';

// ---------------------------------------------------------------------------
// Services – no prices (they live on Fresha).
// `group` drives the four homepage cards and the /services/ anchors.
// ---------------------------------------------------------------------------

export type ServiceGroup = 'cutting' | 'colour' | 'blow-dries' | 'hair-up';

export interface Service {
  id: string;
  name: string;
  group: ServiceGroup;
  description: string;
  confirm?: string;
}

export const services: Service[] = [
  {
    id: 'ladies-cutting',
    name: "Ladies' cutting",
    group: 'cutting',
    description:
      'Cuts tailored to your hair, your face shape and how much time you want to spend styling it.',
  },
  {
    id: 'gents-cuts',
    name: "Gents' cuts",
    group: 'cutting',
    description: 'Smart, simple cuts for men, done properly.',
  },
  {
    id: 'creative-cutting',
    name: 'Creative cutting',
    group: 'cutting',
    description:
      'Something new? Goldwell creative cutting training means Rachel can take you somewhere different, from a restyle to a bold change.',
  },
  {
    id: 'colouring',
    name: 'Colouring',
    group: 'colour',
    description: 'Root touch-ups, all-over colour and grey coverage with Goldwell colour.',
  },
  {
    id: 'creative-colour',
    name: 'Creative colour',
    group: 'colour',
    description:
      'Highlights, lowlights, balayage, foils and toners, backed by Goldwell Creative Colour and Colour Masters training.',
  },
  {
    id: 'blow-dries',
    name: 'Blow-dries',
    group: 'blow-dries',
    description: 'A salon-fresh finish for a night out, an event or just because.',
  },
  {
    id: 'hair-up',
    name: 'Hair up',
    group: 'hair-up',
    description: 'Proms, parties, nights out and special occasions.',
  },
];

export const serviceGroups: Record<
  ServiceGroup,
  { name: string; summary: string; anchorText: string }
> = {
  cutting: {
    name: 'Cutting',
    summary: "Ladies', gents' and creative cuts, tailored to you and your hair.",
    anchorText: 'haircuts in Whitnash',
  },
  colour: {
    name: 'Colour',
    summary: 'Goldwell colour, from root touch-ups and grey coverage to balayage and foils.',
    anchorText: 'hair colour in Whitnash',
  },
  'blow-dries': {
    name: 'Blow-dries',
    summary: 'A salon-fresh finish for a night out, an event or just because.',
    anchorText: 'blow-dries in Whitnash',
  },
  'hair-up': {
    name: 'Hair up',
    summary: 'Proms, parties, nights out and special occasions.',
    anchorText: 'hair up in Leamington Spa',
  },
};

// ---------------------------------------------------------------------------
// Qualifications & products
// ---------------------------------------------------------------------------

export const qualifications = [
  'NVQ Level 2 in Hairdressing',
  'Goldwell Creative Colour',
  'Goldwell Creative Cutting',
  'Goldwell Colour Masters',
] as const;

/** Only Goldwell and Maria Nila – the other logos in Basecamp are not used. */
export const products = [
  { name: 'Goldwell', use: 'colour' },
  { name: 'Maria Nila', use: 'care and styling' },
] as const;

// ---------------------------------------------------------------------------
// Salon details (answers from Rachel, Nov 2026). Patch-test policy is
// deliberately left off the site at Rachel's request.
// ---------------------------------------------------------------------------

export const salonDetails = {
  drinks: 'Tea and coffee on offer' as Placeholder | string,
  parking: 'Free parking outside the parade.' as Placeholder | string,
  monty:
    "Monty's a toy poodle and he's in the salon most days – worth knowing if you have a dog allergy." as
      | Placeholder
      | string,
  mariaNilaAngle: 'Maria Nila products are 100% vegan and cruelty-free.' as Placeholder | string | null,
};

// ---------------------------------------------------------------------------
// Tropic – Rachel is a Tropic Ambassador (separate from the salon's products).
// ---------------------------------------------------------------------------

export const tropic = {
  name: 'Tropic',
  role: 'Tropic Ambassador',
  linkLabel: 'Shop Tropic with Rachel',
} as const;

// ---------------------------------------------------------------------------
// Reviews – copied WORD FOR WORD from Google / Fresha. Never edit the text,
// never write one. Shown as first name + surname initial for privacy.
// No Review/AggregateRating schema (Google treats self-hosted reviews of your
// own business as ineligible for stars, and the brief rules it out).
// ---------------------------------------------------------------------------

export interface Review {
  author: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: 'Google' | 'Fresha';
  /** YYYY-MM, as shown on the platform. */
  date: string;
}

export const reviews: Review[] = [
  // Google reviews pulled via Local Falcon (Nov 2026), quoted exactly.
  // Left out on purpose: reviews naming other stylists ("Caz", "Siobhan",
  // "stylists"), the wedding-party review (Rachel doesn't do bridal), empty
  // star-only reviews, and the reviewer related to Peak SEO.
  {
    author: 'Lucy A.',
    rating: 5,
    source: 'Google',
    date: '2026-07',
    text: "I've been coming to Rachel for over 4 years now and I wouldn't go anywhere else. No one can cut bobbed hair as good as her! She's always got great advice when I want a change or try a new product. Great chat and good fun every time I visit. I also bring my son to have his haircut with Rachel after a bad experience with a children's hairdresser and she's fantastic with him and he's now much more relaxed about getting his haircut. I highly recommend!",
  },
  {
    author: 'Laura C.',
    rating: 5,
    source: 'Google',
    date: '2026-03',
    text: 'Lovely salon experience. Rachel is a highly skilled and very knowledgeable hairdresser. I wouldn’t trust anyone else.',
  },
  {
    author: 'Maggie S.',
    rating: 5,
    source: 'Google',
    date: '2026-03',
    text: 'Amazing service, great atmosphere. Rachel always makes you feel welcome and relaxed. Great knowledge and creativity',
  },
  {
    author: 'Nichola B.',
    rating: 5,
    source: 'Google',
    date: '2026-09',
    text: 'Amazing people. Perfect cut! And.... Good cuppa tea. Winner x',
  },
  {
    author: 'Michelle H.',
    rating: 5,
    source: 'Google',
    date: '2026-03',
    text: 'Very friendly salon. Colour, cuts and styling always great, I always come out feeling 100%!!!',
  },
  {
    author: 'Bal P.',
    rating: 5,
    source: 'Google',
    date: '2026-03',
    text: 'Always a pleasure, great service, love my hair xx',
  },
];

// ---------------------------------------------------------------------------
// Photo credit
// ---------------------------------------------------------------------------

export const photoCredit = {
  subject: 'Photos of Rachel and Monty',
  name: 'Kerrie Palmer Photography',
  display: 'kerriepalmerphotography.co.uk',
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Book', href: '/book/' },
] as const;
