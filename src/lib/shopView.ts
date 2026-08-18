import {
  activeCategories,
  levelsOf,
  sortedTenants,
  TENANTS,
  TENANTS_WITH_UNIT,
} from '../data/tenants';
import type { Dict } from '../i18n';

/**
 * Builds a fully JSON-serializable view model for the outlet directory.
 *
 * The directory is a hydrated island, and Astro serializes island props to JSON
 * — so it cannot receive the `Dict` itself, whose members include functions like
 * `levelLabel(n)` and `verifiedCount(a, b)`. Resolving every string here also
 * keeps all four locale dictionaries out of the client bundle.
 */

export interface OutletView {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly categoryLabel: string;
  readonly logo: string | null;
  readonly logoAlt: string;
  readonly levelLabel: string | null;
  readonly unit: string | null;
  readonly phone: string | null;
  readonly hours: string | null;
  readonly url: string | null;
  readonly mapUrl: string | null;
}

export interface OutletDirectoryView {
  readonly outlets: readonly OutletView[];
  readonly categories: readonly { readonly value: string; readonly label: string }[];
  readonly strings: {
    readonly title: string;
    readonly intro: string;
    readonly levelsCaption: string;
    readonly filterAll: string;
    readonly filterLabel: string;
    readonly unitLabel: string;
    readonly hoursLabel: string;
    readonly callLabel: string;
    readonly websiteLabel: string;
    readonly mapLabel: string;
    readonly emptyFiltered: string;
    readonly notice: string | null;
    readonly verifiedCount: string;
  };
}

export function buildOutletDirectoryView(
  dict: Dict,
  shopLogos: Record<string, string>,
): OutletDirectoryView {
  const t = dict.outlets;

  return {
    outlets: sortedTenants().map((tenant): OutletView => {
      const levels = levelsOf(tenant);
      return {
        id: tenant.id,
        name: tenant.name,
        category: tenant.category,
        categoryLabel: t.categories[tenant.category],
        logo: shopLogos[tenant.id] ?? null,
        logoAlt: t.logoAlt(tenant.name),
        // One level reads "Level 2"; spanning both reuses the section caption,
        // which already says "Levels 1 & 2" in every locale.
        levelLabel:
          levels.length === 1 ? t.levelLabel(levels[0]!) : levels.length > 1 ? t.levelsCaption : null,
        unit: tenant.unit ?? null,
        phone: tenant.phone ?? null,
        hours: tenant.hours ?? null,
        url: tenant.url ?? null,
        mapUrl: tenant.mapUrl ?? null,
      };
    }),
    categories: activeCategories().map((c) => ({ value: c, label: t.categories[c] })),
    strings: {
      title: t.title,
      intro: t.intro,
      levelsCaption: t.levelsCaption,
      filterAll: t.filterAll,
      filterLabel: t.filterLabel,
      unitLabel: t.unitLabel,
      hoursLabel: t.hoursLabel,
      callLabel: t.callLabel,
      websiteLabel: t.websiteLabel,
      mapLabel: t.mapLabel,
      emptyFiltered: t.emptyFiltered,
      notice: TENANTS_WITH_UNIT < TENANTS.length ? t.placeholderNotice : null,
      verifiedCount: t.verifiedCount(TENANTS_WITH_UNIT, TENANTS.length),
    },
  };
}
