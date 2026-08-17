/**
 * Commercial outlets across the Level 1 and Level 2 podium, presented on the
 * site as one combined directory.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 *  HOW TO EDIT  (no code changes needed — just edit the array)
 * ═══════════════════════════════════════════════════════════════════════════
 *  `floor` is OPTIONAL. Set it only when you know which level the outlet is on;
 *  entries without it simply omit the level badge instead of guessing.
 *
 *  `placeholder: true` marks an entry whose details are NOT confirmed. It
 *  renders with a dashed border and a "to be confirmed" badge. Delete the flag
 *  once checked.
 *
 *  SHOP LOGOS: drop a square image in `public/images/shops/`. By default the file
 *  name must match the entry's `id` (e.g. `dentacity.png`); when it does not,
 *  set `logoFile` to the base name instead (e.g. `logoFile: 'zus'` for
 *  `zus.png`). Either way it is picked up on the next build — see
 *  src/lib/assets.ts. Outlets without a logo file render an empty circle, so the
 *  row stays aligned either way. `.png`, `.jpg`, `.jpeg`, `.svg` and `.webp` are
 *  all recognised.
 *
 *  Unit numbering follows the building's scheme: Level 1 lots are `1-xx`,
 *  Level 2 lots are `2-xx`.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type TenantCategory =
  | 'fnb'
  | 'grocery'
  | 'health'
  | 'dental'
  | 'education'
  | 'tech'
  | 'services'
  | 'retail'
  | 'beauty'
  | 'laundry';

export interface Tenant {
  readonly id: string;
  readonly name: string;
  readonly category: TenantCategory;
  /** Podium level, when known. Omit rather than guess. */
  readonly floor?: 1 | 2;
  /** Lot number or range, e.g. "1-02" or "1-08 – 1-11". Optional. */
  readonly unit?: string;
  /** Intl format, e.g. "+60123456789". Optional. */
  readonly phone?: string;
  /** Free text, e.g. "Daily 8:00–22:00". Optional. */
  readonly hours?: string;
  /** The outlet's own site or brand page. Optional. */
  readonly url?: string;
  /** Google listing for the outlet. Optional. */
  readonly mapUrl?: string;
  /**
   * Base name of the logo file in `public/images/shops/`, without extension.
   * Only needed when it differs from `id`.
   */
  readonly logoFile?: string;
  /** Present = details unconfirmed. Remove once checked on site. */
  readonly placeholder?: true;
}

/**
 * SOURCES
 *
 * Names below were supplied by Vista Bangi management as Google listing links
 * (recorded in `mapUrl`) — these are first-party confirmations, so they are not
 * flagged as placeholders even where the lot number is still unknown.
 *
 * Lot numbers for ZUS Coffee, 7-Eleven and eco-shop come from those chains' own
 * published outlet addresses:
 *   ZUS Coffee  zuscoffee.com  → "1-06 (Ground Floor) Vista Bangi, Jalan Reko"
 *   7-Eleven    listed as "SEL 1-07, Vista Bangi, Jln Reko, 43000 Kajang"
 *   eco-shop    eco-shop.com.my/store-locator → "1-08 & 2-08 … 1-11 & 2-11"
 *
 * Note: Richiamo Coffee (formerly lot 1-02) has CLOSED — its lot was taken over
 * by RBS 1 Bistro — so it is deliberately absent rather than listed as shut.
 */
export const TENANTS: readonly Tenant[] = [
  // ── Food & drink ─────────────────────────────────────────────────────────
  {
    id: 'rbs-1-bistro',
    name: 'RBS 1 Bistro',
    category: 'fnb',
    logoFile: 'rbs',
    mapUrl: 'https://share.google/iigcWiy65bVXxLYkk',
  },
  {
    id: 'restoran-madame',
    name: 'Restoran Madame',
    category: 'fnb',
    logoFile: 'madame',
    mapUrl: 'https://share.google/JzZnrhXNHoNnHT9Ry',
  },
  {
    id: 'zus-coffee',
    name: 'ZUS Coffee',
    category: 'fnb',
    floor: 1,
    unit: '1-06',
    logoFile: 'zus',
    url: 'https://zuscoffee.com/2024/03/07/zus-coffee-vista-bangi-jalan-reko/',
  },
  {
    // Google lists this outlet as "CAFÉ by 7-Eleven Vista Bangi (#2939)" — the
    // café-format store rather than a plain convenience branch.
    id: 'seven-eleven',
    name: 'CAFÉ by 7-Eleven',
    category: 'fnb',
    floor: 1,
    unit: '1-07',
    logoFile: '7-eleven',
    mapUrl: 'https://share.google/OVvomaMjE4blVg2XK',
  },

  // ── Clinics ──────────────────────────────────────────────────────────────
  {
    id: 'klinik-iman-medic',
    name: 'Klinik Iman Medic',
    category: 'health',
    logoFile: 'iman-medic',
    mapUrl: 'https://share.google/Bh6pIi742UUcgF5h8',
  },
  {
    id: 'klinik-khalifah',
    name: 'Klinik Khalifah',
    category: 'health',
    mapUrl: 'https://share.google/NOS6GJnkkKyn78DVJ',
  },

  // ── Dental ───────────────────────────────────────────────────────────────
  {
    id: 'bangi-dental-cottage',
    name: 'Bangi Dental Cottage',
    category: 'dental',
    logoFile: 'dental-cottage',
    mapUrl: 'https://share.google/H91TLl3UHvNBAvuQv',
  },
  {
    id: 'dentacity',
    name: 'Klinik Pergigian Dentacity',
    category: 'dental',
    mapUrl: 'https://share.google/VBg8BOu20snsOYdHr',
  },

  // ── Early education ──────────────────────────────────────────────────────
  {
    id: 'tadika-nimblebee',
    name: 'Tadika Nimblebee',
    category: 'education',
    logoFile: 'nimblebee',
    mapUrl: 'https://share.google/kmoenjNDifWGfty50',
  },
  {
    id: 'al-kauthar-eduqids',
    name: 'Al Kauthar Eduqids Playschool',
    category: 'education',
    logoFile: 'al-kauthar',
    mapUrl: 'https://share.google/jCYqmKCeLdCeKbNKF',
  },
  {
    id: 'the-childtime',
    name: 'The ChildTime Preschool',
    category: 'education',
    logoFile: 'the-child-time',
    mapUrl: 'https://share.google/W6wN73ooFvxIHKmu0',
  },

  // ── Technology ───────────────────────────────────────────────────────────
  {
    id: 'izzy-solutions',
    name: 'IZZY Solutions',
    category: 'tech',
    mapUrl: 'https://share.google/QPiY3kLoATYupFAYW',
  },

  // ── Retail & groceries ───────────────────────────────────────────────────
  {
    id: 'eco-shop',
    name: 'eco-shop',
    category: 'retail',
    unit: '1-08 – 1-11, 2-08 – 2-11',
    url: 'https://www.eco-shop.com.my/store-locator',
  },
  {
    // Google: "99 Speedmart 2924 Vista Bangi".
    id: '99-speedmart',
    name: '99 Speedmart',
    category: 'grocery',
    mapUrl: 'https://share.google/gSTPikK5rJzkzzWiN',
  },
  {
    // Google: "KK Mart Concept Store Residence - Vista Bangi (RVB)".
    id: 'kk-mart',
    name: 'KK Mart Concept Store',
    category: 'retail',
    mapUrl: 'https://share.google/r87pQWBYAxQhcVDSa',
  },
];

/** Verified entries first, then alphabetical within each group. */
export function sortedTenants(): readonly Tenant[] {
  return [...TENANTS].sort((a, b) => {
    if (Boolean(a.placeholder) !== Boolean(b.placeholder)) return a.placeholder ? 1 : -1;
    return a.name.localeCompare(b.name);
  });
}

/** Declaration order, used to keep the filter chips stable. */
const CATEGORY_ORDER: readonly TenantCategory[] = [
  'fnb',
  'grocery',
  'health',
  'dental',
  'education',
  'tech',
  'services',
  'retail',
  'beauty',
  'laundry',
];

/** Only the categories actually present get a filter chip. */
export function activeCategories(): readonly TenantCategory[] {
  const present = new Set(TENANTS.map((t) => t.category));
  return CATEGORY_ORDER.filter((c) => present.has(c));
}

export const VERIFIED_TENANT_COUNT = TENANTS.filter((t) => !t.placeholder).length;
