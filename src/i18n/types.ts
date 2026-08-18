import type { TenantCategory } from '../data/tenants';
import type { FacilityKey } from '../data/facilities';

/** Display order of the language switcher: EN, BM, 中文, தமிழ். */
export const LOCALES = ['en', 'ms', 'zh', 'ta'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** BCP-47 tags for <html lang>, hreflang and JSON-LD. */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en-MY',
  ms: 'ms-MY',
  zh: 'zh-Hans-MY',
  ta: 'ta-MY',
};

/** Names shown in the language switcher, each in its own language. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ms: 'Bahasa Melayu',
  zh: '简体中文',
  ta: 'தமிழ்',
};

/** Short codes for the compact switcher. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: 'EN',
  ms: 'BM',
  zh: '中文',
  ta: 'தமிழ்',
};

/**
 * Every locale must supply this exact shape. Adding a field here is a
 * compile-time obligation across en.ts, ms.ts, zh.ts and ta.ts.
 */
export interface Dict {
  readonly meta: {
    readonly title: string;
    readonly description: string;
    readonly ogAlt: string;
  };
  readonly nav: {
    readonly home: string;
    readonly outlets: string;
    readonly units: string;
    readonly facilities: string;
    readonly security: string;
    readonly location: string;
    readonly stay: string;
    readonly contact: string;
    readonly menu: string;
    readonly closeMenu: string;
    readonly language: string;
    readonly skipToContent: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
    readonly statFloors: string;
    readonly statBlocks: string;
    readonly statRetail: string;
    readonly statTenure: string;
    readonly logoAlt: string;
    readonly photoAlt: string;
  };
  readonly highlights: {
    readonly title: string;
    readonly intro: string;
    readonly items: readonly { readonly title: string; readonly body: string }[];
  };
  /** The Level 1 + Level 2 commercial outlets, presented as one directory. */
  readonly outlets: {
    readonly title: string;
    readonly intro: string;
    readonly levelsCaption: string;
    readonly filterAll: string;
    readonly filterLabel: string;
    readonly unitLabel: string;
    readonly levelLabel: (n: number) => string;
    readonly hoursLabel: string;
    readonly callLabel: string;
    readonly websiteLabel: string;
    readonly mapLabel: string;
    readonly logoAlt: (name: string) => string;
    /** Progress on lot numbers, e.g. "8 of 15 lot numbers confirmed". */
    readonly verifiedCount: (withLot: number, total: number) => string;
    /** Shown while any outlet is still missing its lot number. */
    readonly placeholderNotice: string;
    readonly emptyFiltered: string;
    readonly categories: Record<TenantCategory, string>;
  };
  readonly units: {
    readonly title: string;
    readonly intro: string;
    readonly studio: string;
    readonly bedrooms: (n: number) => string;
    readonly bathrooms: (n: number) => string;
    readonly sqft: (min: number, max: number) => string;
    readonly blockTitle: string;
    readonly blockBody: string;
    /** Describes the rooftop level sitting above the residential storeys. */
    readonly rooftop: (level: number) => string;
    readonly floorsLabel: string;
    readonly unitsLabel: string;
    readonly unitsTbc: string;
  };
  readonly facilities: {
    readonly title: string;
    readonly intro: string;
    readonly labels: Record<FacilityKey, string>;
  };
  readonly security: {
    readonly title: string;
    readonly intro: string;
    readonly guarded: { readonly title: string; readonly body: string };
    readonly cctv: { readonly title: string; readonly body: string };
    readonly access: { readonly title: string; readonly body: string };
    readonly visitor: { readonly title: string; readonly body: string };
  };
  readonly location: {
    readonly title: string;
    readonly intro: string;
    readonly addressLabel: string;
    readonly directions: string;
    readonly openInMaps: string;
    readonly copyAddress: string;
    readonly copied: string;
    readonly mapTitle: string;
    readonly nearbyTitle: string;
    readonly highwaysTitle: string;
    readonly km: (n: number) => string;
    readonly pinNotice: string;
  };
  readonly stay: {
    readonly title: string;
    readonly intro: string;
    readonly points: readonly string[];
    readonly cta: string;
    readonly ctaNote: string;
  };
  readonly contact: {
    readonly title: string;
    readonly intro: string;
    readonly phone: string;
    readonly email: string;
    readonly whatsapp: string;
    readonly hours: string;
    readonly tbc: string;
    /** Label on the click-to-reveal button. */
    readonly reveal: string;
    /** Accessible name for that button, e.g. "Show phone number". */
    readonly revealAria: (channel: string) => string;
    /** Explains why the details start hidden. */
    readonly spamNote: string;
    /** Shown only when JavaScript is unavailable, so reveal cannot work. */
    readonly noscriptNote: string;
  };
  readonly footer: {
    readonly tagline: string;
    readonly rights: (year: number) => string;
    readonly sections: string;
    readonly disclaimer: string;
    /** Precedes the sponsor name in the footer and on the splash screen. */
    readonly sponsoredBy: string;
  };
}
