/**
 * Shop + business directory for the Level 1 and Level 2 commercial podium.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 *  HOW TO EDIT  (no code changes needed — just edit the array below)
 * ═══════════════════════════════════════════════════════════════════════════
 *  `placeholder: true` marks an entry whose details are NOT yet verified. It
 *  renders with a dashed border and a "to be confirmed" badge, so the site never
 *  states a trading name or unit number nobody has checked.
 *
 *  To promote an entry to verified:
 *    1. Correct `name` to the trading name on the shopfront.
 *    2. Set `unit` to the lot number, and `category` if it is wrong.
 *    3. Add `phone` / `hours` / `url` if known — all optional.
 *    4. DELETE `placeholder: true`.
 *
 *  Unit numbering follows the building's own scheme: Level 1 lots are `1-xx`,
 *  Level 2 lots are `2-xx`.
 *
 *  Category labels are translated in src/i18n/{en,ms,ta,zh}.ts under
 *  `floors.categories` — add a category to TenantCategory and all four locales
 *  must supply a label or `astro check` fails the build.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  SOURCES for the verified entries below (retrieved August 2026):
 *    Richiamo Coffee  richiamocoffee.com/store/richiamo-coffee-vista-bangi
 *                     → "Unit 1-02, Ground Floor, Vista Bangi, 43000 Kajang"
 *    ZUS Coffee       zuscoffee.com/2024/03/07/zus-coffee-vista-bangi-jalan-reko
 *                     → "1-06 (Ground Floor) Vista Bangi, Jalan Reko"
 *    7-Eleven         listed as "SEL 1-07, Vista Bangi, Jln Reko, 43000 Kajang"
 *    eco-shop         eco-shop.com.my/store-locator
 *                     → "Unit 1-08 & 2-08, 1-09 & 2-09, 1-10 & 2-10,
 *                        1-11 & 2-11 (Ground & 1st Floor)"
 *
 *  Note the naming mismatch: those sources call the podium levels "Ground" and
 *  "1st" floor, while the building's own lot numbers (1-xx, 2-xx) and the
 *  brief for this site call them Level 1 and Level 2. The lot numbers are the
 *  reliable key, so they drive `floor` here.
 */

export type TenantCategory =
  | 'fnb'
  | 'grocery'
  | 'health'
  | 'beauty'
  | 'services'
  | 'retail'
  | 'education'
  | 'laundry';

export interface Tenant {
  readonly id: string;
  readonly name: string;
  readonly category: TenantCategory;
  /** Podium level: 1 or 2. */
  readonly floor: 1 | 2;
  /** Lot number or range, e.g. "1-02" or "1-08 – 1-11". Optional. */
  readonly unit?: string;
  /** Intl format, e.g. "+60123456789". Optional. */
  readonly phone?: string;
  /** Free text, e.g. "Daily 8:00–22:00". Optional. */
  readonly hours?: string;
  /** Outlet or brand page. Optional. */
  readonly url?: string;
  /** Present = details unverified. Remove once checked on site. */
  readonly placeholder?: true;
}

export const TENANTS: readonly Tenant[] = [
  // ── Level 1 · verified ───────────────────────────────────────────────────
  {
    id: 'richiamo',
    name: 'Richiamo Coffee',
    category: 'fnb',
    floor: 1,
    unit: '1-02',
    url: 'https://www.richiamocoffee.com/store/richiamo-coffee-vista-bangi/',
  },
  {
    id: 'zus',
    name: 'ZUS Coffee',
    category: 'fnb',
    floor: 1,
    unit: '1-06',
    url: 'https://zuscoffee.com/2024/03/07/zus-coffee-vista-bangi-jalan-reko/',
  },
  { id: 'seven-eleven', name: '7-Eleven', category: 'retail', floor: 1, unit: '1-07' },
  {
    id: 'eco-shop-l1',
    name: 'eco-shop',
    category: 'retail',
    floor: 1,
    unit: '1-08 – 1-11',
    url: 'https://www.eco-shop.com.my/store-locator',
  },

  // ── Level 1 · present, lot number not yet confirmed ──────────────────────
  { id: '99-speedmart', name: '99 Speedmart', category: 'grocery', floor: 1, placeholder: true },
  { id: 'kk-mart', name: 'KK Mart', category: 'retail', floor: 1, placeholder: true },
  { id: 'klinik-l1', name: 'Klinik / Medical Centre', category: 'health', floor: 1, placeholder: true },
  { id: 'restoran-l1', name: 'Restoran / Mamak', category: 'fnb', floor: 1, placeholder: true },
  { id: 'pharmacy-l1', name: 'Pharmacy', category: 'health', floor: 1, placeholder: true },
  { id: 'salon-l1', name: 'Salon / Barber', category: 'beauty', floor: 1, placeholder: true },

  // ── Level 2 · verified ───────────────────────────────────────────────────
  {
    id: 'eco-shop-l2',
    name: 'eco-shop',
    category: 'retail',
    floor: 2,
    unit: '2-08 – 2-11',
    url: 'https://www.eco-shop.com.my/store-locator',
  },

  // ── Level 2 · to be surveyed ─────────────────────────────────────────────
  { id: 'klinik-l2', name: 'Klinik / Dental', category: 'health', floor: 2, placeholder: true },
  { id: 'tuition-l2', name: 'Tuition / Learning Centre', category: 'education', floor: 2, placeholder: true },
  { id: 'dobi-l2', name: 'Dobi / Laundry', category: 'laundry', floor: 2, placeholder: true },
  { id: 'spa-l2', name: 'Spa & Wellness', category: 'beauty', floor: 2, placeholder: true },
  { id: 'office-l2', name: 'Office / Services', category: 'services', floor: 2, placeholder: true },
];

/** Tenants on a given podium level: verified first, then alphabetical. */
export function tenantsByFloor(floor: 1 | 2): readonly Tenant[] {
  return TENANTS.filter((t) => t.floor === floor).sort((a, b) => {
    if (Boolean(a.placeholder) !== Boolean(b.placeholder)) return a.placeholder ? 1 : -1;
    return a.name.localeCompare(b.name);
  });
}

/** Distinct categories actually present, in TenantCategory declaration order. */
const CATEGORY_ORDER: readonly TenantCategory[] = [
  'fnb',
  'grocery',
  'health',
  'beauty',
  'services',
  'retail',
  'education',
  'laundry',
];

export function activeCategories(): readonly TenantCategory[] {
  const present = new Set(TENANTS.map((t) => t.category));
  return CATEGORY_ORDER.filter((c) => present.has(c));
}

/** True while any entry is still unverified — drives the "being compiled" notice. */
export const HAS_PLACEHOLDER_TENANTS = TENANTS.some((t) => t.placeholder);
