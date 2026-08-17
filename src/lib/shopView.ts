import { activeCategories, TENANTS, tenantsByFloor } from '../data/tenants';
import { CATEGORY_ICON } from '../components/icons';
import { BUILDING } from '../data/site';
import type { Dict } from '../i18n';

/**
 * Builds a fully JSON-serializable view model for the shop directory.
 *
 * The directory is a hydrated island, and Astro serializes island props to JSON
 * — so it cannot receive the `Dict` itself, whose members include functions like
 * `level(n)` and `verifiedCount(a, b)`. Resolving every string here keeps the
 * client bundle free of all four locale dictionaries as well.
 */

export interface TenantView {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly categoryLabel: string;
  readonly iconPath: string;
  readonly unit: string | null;
  readonly phone: string | null;
  readonly hours: string | null;
  readonly url: string | null;
  readonly unverified: boolean;
}

export interface LevelView {
  readonly floor: number;
  readonly title: string;
  readonly lead: string;
  readonly tenants: readonly TenantView[];
}

export interface ShopDirectoryView {
  readonly levels: readonly LevelView[];
  readonly categories: readonly { readonly value: string; readonly label: string }[];
  readonly strings: {
    readonly filterAll: string;
    readonly filterLabel: string;
    readonly unitLabel: string;
    readonly hoursLabel: string;
    readonly callLabel: string;
    readonly websiteLabel: string;
    readonly toBeConfirmed: string;
    readonly emptyFiltered: string;
    readonly notice: string | null;
    readonly verifiedCount: string;
  };
}

export function buildShopDirectoryView(dict: Dict): ShopDirectoryView {
  const levels = (BUILDING.retailLevels as readonly (1 | 2)[]).map((floor) => ({
    floor,
    title: dict.floors.level(floor),
    lead: dict.floors.levelLead[floor],
    tenants: tenantsByFloor(floor).map(
      (t): TenantView => ({
        id: t.id,
        name: t.name,
        category: t.category,
        categoryLabel: dict.floors.categories[t.category],
        iconPath: CATEGORY_ICON[t.category],
        unit: t.unit ?? null,
        phone: t.phone ?? null,
        hours: t.hours ?? null,
        url: t.url ?? null,
        unverified: Boolean(t.placeholder),
      }),
    ),
  }));

  const verified = TENANTS.filter((t) => !t.placeholder).length;

  return {
    levels,
    categories: activeCategories().map((c) => ({ value: c, label: dict.floors.categories[c] })),
    strings: {
      filterAll: dict.floors.filterAll,
      filterLabel: dict.floors.filterLabel,
      unitLabel: dict.floors.unitLabel,
      hoursLabel: dict.floors.hoursLabel,
      callLabel: dict.floors.callLabel,
      websiteLabel: dict.floors.websiteLabel,
      toBeConfirmed: dict.floors.toBeConfirmed,
      emptyFiltered: dict.floors.emptyFiltered,
      notice: verified < TENANTS.length ? dict.floors.placeholderNotice : null,
      verifiedCount: dict.floors.verifiedCount(verified, TENANTS.length),
    },
  };
}
