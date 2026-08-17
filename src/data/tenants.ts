/**
 * Shop + business directory for the Level 1 and Level 2 commercial podium.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 *  HOW TO FILL THIS IN  (no code changes needed — just edit this array)
 * ═══════════════════════════════════════════════════════════════════════════
 *  Every entry below is a PLACEHOLDER: `placeholder: true` makes the card render
 *  with a dashed border and a "to be confirmed" badge, so the site never claims
 *  a business exists under a name we have not verified.
 *
 *  For each real tenant:
 *    1. Set `name` to the trading name on the shopfront.
 *    2. Set `category` (drives the filter chips + icon; see TenantCategory).
 *    3. Set `floor` to 1 or 2, and `unit` to the lot number if you have it.
 *    4. Add `phone` / `hours` if known — both are optional.
 *    5. DELETE `placeholder: true` — that is what promotes it to a live entry.
 *
 *  Delete any surplus placeholders, and copy an entry to add more.
 *  Category display names are translated in src/i18n/{en,ms,ta}.ts.
 * ═══════════════════════════════════════════════════════════════════════════
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
  /** Lot / unit number, e.g. "1-08". Optional. */
  readonly unit?: string;
  /** Intl format, e.g. "+60123456789". Optional. */
  readonly phone?: string;
  /** Free text, e.g. "Daily 8:00–22:00". Optional. */
  readonly hours?: string;
  /** Present = unverified. Remove once the real details are entered. */
  readonly placeholder?: true;
}

export const TENANTS: readonly Tenant[] = [
  // ── Level 1 ──────────────────────────────────────────────────────────────
  { id: 'l1-01', name: 'Mini Market / Grocer', category: 'grocery', floor: 1, unit: '1-01', placeholder: true },
  { id: 'l1-02', name: 'Kopitiam / Café', category: 'fnb', floor: 1, unit: '1-02', placeholder: true },
  { id: 'l1-03', name: 'Restoran / Food Court', category: 'fnb', floor: 1, unit: '1-03', placeholder: true },
  { id: 'l1-04', name: 'Pharmacy', category: 'health', floor: 1, unit: '1-04', placeholder: true },
  { id: 'l1-05', name: 'Laundrette', category: 'laundry', floor: 1, unit: '1-05', placeholder: true },
  { id: 'l1-06', name: 'Barber / Salon', category: 'beauty', floor: 1, unit: '1-06', placeholder: true },
  { id: 'l1-07', name: 'Convenience Store', category: 'retail', floor: 1, unit: '1-07', placeholder: true },

  // ── Level 2 ──────────────────────────────────────────────────────────────
  { id: 'l2-01', name: 'Clinic', category: 'health', floor: 2, unit: '2-01', placeholder: true },
  { id: 'l2-02', name: 'Tuition / Learning Centre', category: 'education', floor: 2, unit: '2-02', placeholder: true },
  { id: 'l2-03', name: 'Dobi / Dry Cleaning', category: 'laundry', floor: 2, unit: '2-03', placeholder: true },
  { id: 'l2-04', name: 'Spa & Wellness', category: 'beauty', floor: 2, unit: '2-04', placeholder: true },
  { id: 'l2-05', name: 'Office / Co-working', category: 'services', floor: 2, unit: '2-05', placeholder: true },
  { id: 'l2-06', name: 'Print & Courier Services', category: 'services', floor: 2, unit: '2-06', placeholder: true },
];

/** Tenants on a given podium level, placeholders sorted last. */
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

/** True when no tenant has been verified yet — used to show a notice. */
export const ALL_TENANTS_PLACEHOLDER = TENANTS.every((t) => t.placeholder);
