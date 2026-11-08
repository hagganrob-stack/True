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

/** Placeholder until the domain is confirmed. Also used by astro.config. */
export const SITE_URL = 'https://true-hairdressers.vercel.app';

export const business = {
  name: 'True Hairdressers',
  shortName: 'True',
  tagline: 'Your friendly local hairdresser in the heart of Whitnash',
  owner: {
    givenName: 'Rachel',
    familyName: confirm("Rachel's surname, if she wants it used") as Placeholder | string,
    jobTitle: 'Hairdresser and owner',
    yearsQualified: 22,
    yearsInSalons: 27,
  },
  yearOpened: confirm('year True opened') as Placeholder | number,
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
  phone: confirm('salon phone number') as Placeholder | { display: string; tel: string },
  email: confirm('email – or leave off') as Placeholder | string | null,
} as const;

export const links = {
  fresha:
    'https://www.fresha.com/en-GB/a/true-hairdressers-whitnash-royal-leamington-spa-home-farm-crescent-gyv2wyyx',
  facebook: 'https://www.facebook.com/Truehairdresserswhitnash/',
  instagram: 'https://www.instagram.com/truehairdressers/',
  peakSeo: 'https://peakseo.co.uk',
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
      'Highlights, lowlights and more creative colour work, backed by Goldwell Creative Colour and Colour Masters training.',
    confirm: 'specific techniques offered, e.g. balayage, foils, toners – list only what Rachel confirms',
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
    description: 'Weddings, proms, parties and special occasions.',
    confirm: 'does Rachel do bridal/wedding-morning hair, trials or travel?',
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
    summary: 'Goldwell colour, from root touch-ups and grey coverage to creative colour.',
    anchorText: 'hair colour in Whitnash',
  },
  'blow-dries': {
    name: 'Blow-dries',
    summary: 'A salon-fresh finish for a night out, an event or just because.',
    anchorText: 'blow-dries in Whitnash',
  },
  'hair-up': {
    name: 'Hair up',
    summary: 'Weddings, proms, parties and special occasions.',
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
// Salon details still waiting on Rachel (BRIEF §10). Swap each confirm() for
// the real answer (a string) once she replies.
// ---------------------------------------------------------------------------

export const salonDetails = {
  drinks: confirm('offer drinks?') as Placeholder | string,
  parking: confirm('parking – is there free parking outside the parade?') as Placeholder | string,
  patchTest: confirm('patch/skin test policy for colour clients') as Placeholder | string,
  monty: confirm('is Monty in the salon most days? breed? (useful for anyone with allergies)') as
    | Placeholder
    | string,
  mariaNilaAngle: confirm('Maria Nila is vegan/cruelty-free – only mention if Rachel wants that angle') as
    | Placeholder
    | string
    | null,
  salonPhotos: confirm('photos of the salon front and inside') as Placeholder | null,
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Book', href: '/book/' },
] as const;
