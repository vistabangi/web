import { activeCategories, sortedTenants, TENANTS, VERIFIED_TENANT_COUNT } from '../data/tenants';
import { CATEGORY_ICON } from '../components/icons';
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
  readonly iconPath: string;
  readonly logo: string | null;
  readonly logoAlt: string;
  readonly levelLabel: string | null;
  readonly unit: string | null;
  readonly phone: string | null;
  readonly hours: string | null;
  readonly url: string | null;
  readonly mapUrl: string | null;
  readonly unverified: boolean;
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
    readonly toBeConfirmed: string;
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
    outlets: sortedTenants().map(
      (tenant): OutletView => ({
        id: tenant.id,
        name: tenant.name,
        category: tenant.category,
        categoryLabel: t.categories[tenant.category],
        iconPath: CATEGORY_ICON[tenant.category],
        logo: shopLogos[tenant.id] ?? null,
        logoAlt: t.logoAlt(tenant.name),
        levelLabel: tenant.floor ? t.levelLabel(tenant.floor) : null,
        unit: tenant.unit ?? null,
        phone: tenant.phone ?? null,
        hours: tenant.hours ?? null,
        url: tenant.url ?? null,
        mapUrl: tenant.mapUrl ?? null,
        unverified: Boolean(tenant.placeholder),
      }),
    ),
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
      toBeConfirmed: t.toBeConfirmed,
      emptyFiltered: t.emptyFiltered,
      notice: VERIFIED_TENANT_COUNT < TENANTS.length ? t.placeholderNotice : null,
      verifiedCount: t.verifiedCount(VERIFIED_TENANT_COUNT, TENANTS.length),
    },
  };
}
