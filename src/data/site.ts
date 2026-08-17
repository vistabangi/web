/**
 * Single source of truth for Vista Bangi building + contact facts.
 *
 * ⚠️ Fields marked `CONFIRM` are drawn from public property listings, not from
 * management records. Verify each against the strata/management office before
 * launch — see README.md § "Facts to confirm".
 */

export interface GeoPoint {
  readonly lat: number;
  readonly lng: number;
}

export interface Block {
  readonly id: string;
  readonly name: string;
  readonly floors: number;
  /** Total residential units, or null when not yet confirmed. */
  readonly units: number | null;
}

export const BUILDING = {
  name: 'Vista Bangi Service Apartment',
  shortName: 'Vista Bangi',
  /** Storeys per residential block, as advised by management. */
  floors: 38,
  blocks: [
    // CONFIRM: public listings quote 526 (A) and 492 (B) units across 39 storeys.
    // Management advised 38 storeys, so unit counts stay null until verified.
    { id: 'a', name: 'Block A', floors: 38, units: null },
    { id: 'b', name: 'Block B', floors: 38, units: null },
  ] satisfies readonly Block[],
  /** Commercial podium levels that host the shop directory. */
  retailLevels: [1, 2],
  tenure: 'Freehold',
  shortStayFriendly: true,
} as const;

/**
 * Address. Corroborated across several independent listings (EdgeProp, Ziba
 * Property, and the registered addresses of the Richiamo Coffee, ZUS Coffee and
 * 7-Eleven outlets in the podium), all of which give 43000 Kajang.
 */
export const ADDRESS = {
  streetNumber: '18',
  street: 'Jalan Reko',
  locality: 'Taman Sri Reko',
  city: 'Kajang',
  state: 'Selangor',
  postcode: '43000',
  country: 'Malaysia',
  countryCode: 'MY',
} as const;

/** Formatted single-line address used in copy, JSON-LD and map links. */
export const ADDRESS_LINE = [
  BUILDING.name,
  `${ADDRESS.streetNumber}, ${ADDRESS.street}`,
  ADDRESS.locality,
  `${ADDRESS.postcode} ${ADDRESS.city}`,
  ADDRESS.state,
  ADDRESS.country,
].join(', ');

/**
 * Exact pin coordinates.
 *
 * Deliberately `null` until surveyed: an inaccurate pin is worse than none, so
 * while this is null the map falls back to a Google Maps *place search*, which
 * resolves the building by name. Fill this in (right-click the building in
 * Google Maps → click the lat/lng to copy) and the embed, every map link and the
 * JSON-LD `geo` block all upgrade to an exact pin automatically.
 */
export const COORDINATES: GeoPoint | null = null;

/** Google Maps place identifier, used verbatim for search-based links. */
export const MAP_QUERY = `${BUILDING.name}, ${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.state}`;

export const SECURITY = {
  guarded24h: true,
  cctv: true,
  /** CONFIRM: whether access is card/fob controlled at lobby + lift. */
  accessCardEntry: true,
  /** CONFIRM: whether the scheme has a single controlled entry point. */
  gatedEntry: true,
  visitorRegistration: true,
} as const;

export const TRANSPORT = [
  // Distances from public listings — CONFIRM before publishing.
  { name: 'UKM KTM Komuter Station', distanceKm: 0.5 },
  { name: 'Universiti Kebangsaan Malaysia (UKM)', distanceKm: 3 },
  { name: 'Kajang town centre', distanceKm: 6 },
  { name: 'IOI City Mall, Putrajaya', distanceKm: 15 },
] as const;

export const HIGHWAYS = ['SILK', 'LEKAS', 'MEX', 'PLUS', 'KLIA Expressway'] as const;

/**
 * Contact details.
 *
 * ⚠️ ALL PLACEHOLDERS. Replace with the real management office / short-stay
 * contacts. `null` entries are omitted from the page and from JSON-LD rather
 * than shown as empty, so it is safe to leave them unset.
 */
export const CONTACT = {
  managementPhone: null as string | null, // e.g. '+60312345678'
  managementEmail: null as string | null, // e.g. 'management@vistabangi.com'
  whatsapp: null as string | null, // digits only, intl format e.g. '60123456789'
  officeHours: null as string | null, // e.g. 'Mon–Fri 9:00–17:00, Sat 9:00–13:00'
} as const;

export const SOCIAL = {
  facebook: null as string | null,
  instagram: null as string | null,
  airbnbSearch: null as string | null, // paste your Airbnb listing/search URL
} as const;

export const SITE_URL = 'https://vistabangi.com';

/**
 * Social share image, root-relative (e.g. '/og.png').
 *
 * Left null so no broken image is advertised to Facebook/WhatsApp/X. Drop a
 * 1200×630 PNG at `public/og.png`, set this to '/og.png', and the og:image and
 * twitter:card tags start emitting.
 */
export const OG_IMAGE: string | null = null;
