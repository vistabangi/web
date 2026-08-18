/**
 * Commercial outlets across the Level 1 and Level 2 podium, presented on the
 * site as one combined directory.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 *  HOW TO EDIT  (no code changes needed — just edit the array)
 * ═══════════════════════════════════════════════════════════════════════════
 *  LOT NUMBERS drive everything. The building numbers its lots `<level>-<lot>`,
 *  so the first digit IS the floor: `1-07` is Level 1, `2-07` is Level 2. The
 *  level shown on each card is derived from `unit` by `levelsOf()` below — there
 *  is deliberately no separate `floor` field to fall out of sync with it.
 *
 *  An outlet spanning both levels lists every range it occupies, comma
 *  separated, e.g. `'1-08 – 1-11, 2-08 – 2-11'`. It is then shown as Levels 1 & 2.
 *
 *  Leave `unit` off when the lot is genuinely unknown: the card omits the level
 *  and lot line rather than guessing, and the outlet counts against the
 *  "N of M lot numbers confirmed" figure until it is filled in.
 *
 *  LINKS: `url` is the outlet's own website, `mapUrl` its Google listing. Both
 *  render beneath the name, so supply both where they exist.
 *
 *  LOGOS: drop a square image in `public/images/shops/`. The file name must
 *  match `id`, or set `logoFile` to the base name when it differs.
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
  /**
   * Lot number, range, or comma-separated ranges — e.g. `'1-07'`, `'1-03A'`,
   * `'1-08 – 1-11, 2-08 – 2-11'`. The leading digit of each part is the level.
   * Omit when unknown.
   */
  readonly unit?: string;
  readonly phone?: string;
  readonly hours?: string;
  /** The outlet's own website. */
  readonly url?: string;
  /** The outlet's Google listing. */
  readonly mapUrl?: string;
  /** Logo file base name in public/images/shops/, if it differs from `id`. */
  readonly logoFile?: string;
}

/**
 * SOURCES for the lot numbers below (retrieved August 2026). Names throughout
 * were confirmed by Vista Bangi management via the Google listings in `mapUrl`.
 *
 *   ZUS Coffee            zuscoffee.com outlet page      → "1-06 (Ground Floor)"
 *   CAFÉ by 7-Eleven      outlet listing                 → "SEL 1-07"
 *   eco-shop              eco-shop.com.my store locator  → "1-08 & 2-08 … 1-11 & 2-11"
 *   Klinik Iman Medic     medical.my directory           → "1-03A"
 *   Klinik Khalifah       asiafirms / medical.my         → "1-05"
 *   Dentacity             dentacity.my contact page      → "2-07"
 *   Bangi Dental Cottage  hokucare / compumed listings   → "1-13a (ground floor)"
 *
 * ⚠️ RBS 1 Bistro's lot is DERIVED, not sourced: Richiamo Coffee published its
 * address as lot 1-02, and management advised RBS took that lot over. Sound,
 * but worth confirming on site.
 *
 * ⚠️ Seven outlets still have no lot number — see README § "The outlet
 * directory". They render without a level or lot rather than with a guess.
 */
export const TENANTS: readonly Tenant[] = [
  // ── Food & drink ─────────────────────────────────────────────────────────
  {
    id: 'rbs-1-bistro',
    name: 'RBS 1 Bistro',
    category: 'fnb',
    unit: '1-02', // Derived from Richiamo Coffee's former lot — confirm on site.
    logoFile: 'rbs',
    url: 'https://www.instagram.com/popular/rbs-1-bistro-vista-bangi/',
    mapUrl: 'https://share.google/iigcWiy65bVXxLYkk',
  },
  {
    id: 'restoran-madame',
    name: 'Restoran Madame',
    category: 'fnb',
    logoFile: 'madame',
    url: 'https://www.instagram.com/madamekafe_official',
    mapUrl: 'https://share.google/JzZnrhXNHoNnHT9Ry',
  },
  {
    id: 'zus-coffee',
    name: 'ZUS Coffee',
    category: 'fnb',
    unit: '1-06',
    logoFile: 'zus',
    url: 'https://zuscoffee.com/',
    mapUrl: 'https://share.google/VQTOxIEbU3Yg8g7Rw',
  },
  {
    id: 'seven-eleven',
    name: 'CAFÉ by 7-Eleven',
    category: 'fnb',
    unit: '1-07',
    logoFile: '7-eleven',
    url: 'https://www.7eleven.com.my/store-locator/',
    mapUrl: 'https://share.google/OVvomaMjE4blVg2XK',
  },

  // ── Clinics ──────────────────────────────────────────────────────────────
  {
    id: 'klinik-iman-medic',
    name: 'Klinik Iman Medic',
    category: 'health',
    unit: '1-03A',
    logoFile: 'iman-medic',
    url: 'https://www.klinikimanmedicbangi.com/',
    mapUrl: 'https://share.google/Bh6pIi742UUcgF5h8',
  },
  {
    id: 'klinik-khalifah',
    name: 'Klinik Khalifah',
    category: 'health',
    unit: '1-05',
    url: 'https://klinikkhalifahhq.com/',
    mapUrl: 'https://share.google/NOS6GJnkkKyn78DVJ',
  },

  // ── Dental ───────────────────────────────────────────────────────────────
  {
    id: 'bangi-dental-cottage',
    name: 'Bangi Dental Cottage',
    category: 'dental',
    unit: '1-13A',
    logoFile: 'dental-cottage',
    url: 'https://lavistadental.com/',
    mapUrl: 'https://share.google/H91TLl3UHvNBAvuQv',
  },
  {
    id: 'dentacity',
    name: 'Klinik Pergigian Dentacity',
    category: 'dental',
    unit: '2-07',
    url: 'https://dentacity.my/',
    mapUrl: 'https://share.google/VBg8BOu20snsOYdHr',
  },

  // ── Early education ──────────────────────────────────────────────────────
  {
    id: 'tadika-nimblebee',
    name: 'Tadika Nimblebee',
    category: 'education',
    logoFile: 'nimblebee',
    url: 'https://www.nimblebee.my/vista-bangi/',
    mapUrl: 'https://share.google/kmoenjNDifWGfty50',
  },
  {
    id: 'al-kauthar-eduqids',
    name: 'Al Kauthar Eduqids Playschool',
    category: 'education',
    logoFile: 'al-kauthar',
    url: 'https://alkauthareduqids.edu.my/',
    mapUrl: 'https://share.google/jCYqmKCeLdCeKbNKF',
  },
  {
    id: 'the-childtime',
    name: 'The ChildTime Preschool',
    category: 'education',
    logoFile: 'the-child-time',
    url: 'https://thechildtime.com/',
    mapUrl: 'https://share.google/W6wN73ooFvxIHKmu0',
  },

  // ── Technology ───────────────────────────────────────────────────────────
  {
    id: 'izzy-solutions',
    name: 'IZZY Solutions',
    category: 'tech',
    url: 'https://izzysolutions.my/',
    mapUrl: 'https://share.google/QPiY3kLoATYupFAYW',
  },

  // ── Retail & groceries ───────────────────────────────────────────────────
  {
    id: 'eco-shop',
    name: 'eco-shop',
    category: 'retail',
    unit: '1-08 – 1-11, 2-08 – 2-11',
    url: 'https://www.eco-shop.com.my/store-locator',
    mapUrl: 'https://share.google/P7aR3p6wsuoe4M1Za',
  },
  {
    id: '99-speedmart',
    name: '99 Speedmart',
    category: 'grocery',
    url: 'https://99speedmart.com.my/',
    mapUrl: 'https://share.google/gSTPikK5rJzkzzWiN',
  },
  {
    id: 'kk-mart',
    name: 'KK Mart Concept Store',
    category: 'retail',
    url: 'https://kksupermart.my/',
    mapUrl: 'https://share.google/r87pQWBYAxQhcVDSa',
  },
];

/**
 * Levels an outlet occupies, read from the leading digit of every lot in
 * `unit`. `'1-08 – 1-11, 2-08 – 2-11'` yields `[1, 2]`; an absent or
 * unparseable `unit` yields `[]`, and the card then shows no level.
 */
export function levelsOf(tenant: Tenant): readonly number[] {
  if (!tenant.unit) return [];
  const levels = new Set<number>();
  for (const [, digit] of tenant.unit.matchAll(/(\d)\s*-\s*\d/g)) {
    levels.add(Number(digit));
  }
  return [...levels].sort((a, b) => a - b);
}

/** Outlets with a known lot first, then alphabetical within each group. */
export function sortedTenants(): readonly Tenant[] {
  return [...TENANTS].sort((a, b) => {
    if (Boolean(a.unit) !== Boolean(b.unit)) return a.unit ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

/** Declaration order, to keep the filter chips stable. */
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

/** How many outlets have a confirmed lot number. */
export const TENANTS_WITH_UNIT = TENANTS.filter((t) => t.unit).length;
