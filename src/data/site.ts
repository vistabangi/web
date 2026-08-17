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
  street: 'Jalan Reko',
  locality: 'Taman Sri Reko',
  city: 'Kajang',
  state: 'Selangor',
  postcode: '43000',
  country: 'Malaysia',
  countryCode: 'MY',
} as const;

/**
 * Formatted single-line address used in the footer, the location section,
 * JSON-LD and the copy-to-clipboard button.
 *
 * The street number ("18") that appears on some property listings is omitted
 * here at management's direction.
 */
export const ADDRESS_LINE = [
  BUILDING.name,
  ADDRESS.street,
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

// Ordered nearest first — the Nearby list renders them in this order.
export const TRANSPORT = [
  // Distances from public listings — CONFIRM before publishing.
  { name: 'UKM KTM Komuter Station', distanceKm: 0.5 },
  { name: 'Universiti Kebangsaan Malaysia (UKM)', distanceKm: 3 },
  { name: 'Kajang town centre', distanceKm: 6 },
  // Reachable on the T464 MRT feeder bus — about 11 minutes.
  { name: 'MRT Kajang Station', distanceKm: 11 },
  { name: 'IOI City Mall, Putrajaya', distanceKm: 15 },
] as const;

export const HIGHWAYS = ['SILK', 'LEKAS', 'MEX', 'PLUS', 'KLIA Expressway'] as const;

/**
 * Vista Bangi management office contacts.
 *
 * A `null` entry is omitted from the page and from JSON-LD rather than shown as
 * empty, so it is safe to leave one unset. The same number serves as phone and
 * WhatsApp; `whatsapp` is stored as bare digits for the wa.me link.
 */
export const CONTACT = {
  managementPhone: '+60 11-3675 9979' as string | null,
  managementEmail: 'vbmgmt22@gmail.com' as string | null,
  whatsapp: '601136759979' as string | null,
  officeHours: '9:00 AM – 5:30 PM' as string | null,
} as const;

/** Site sponsor, credited in the footer and on the splash screen. */
export const SPONSOR = {
  name: 'Al Fateh Digital',
  url: 'https://www.alfatehdigital.com.my/',
} as const;

export const SOCIAL = {
  facebook: null as string | null,
  instagram: null as string | null,
  /**
   * Airbnb search for this building. Trimmed to the stable, shareable form —
   * the original link also carried `place_id`, `location_bb` and `acp_id`
   * session parameters, which are tied to one browsing session and add nothing
   * once the place slug is present.
   */
  airbnbSearch:
    'https://www.airbnb.com/s/Vista-Bangi-Service-Apartment--Kajang--Selangor/homes' as string | null,
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
