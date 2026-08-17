import { en } from './en';
import { ms } from './ms';
import { ta } from './ta';
import { DEFAULT_LOCALE, LOCALES, type Dict, type Locale } from './types';

export { LOCALES, DEFAULT_LOCALE, HTML_LANG, LOCALE_NAMES, LOCALE_SHORT } from './types';
export type { Locale, Dict } from './types';

const DICTS: Record<Locale, Dict> = { en, ms, ta };

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Root-relative path for a locale. The default locale lives at `/`; the others
 * live under `/{locale}/`. Always returns a trailing-slash-free path except `/`.
 */
export function localeHref(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
}

/** Absolute canonical URL for a locale, given the configured site origin. */
export function canonicalUrl(locale: Locale, origin: string): string {
  return new URL(localeHref(locale), origin).href;
}

/** In-page anchor, prefixed so links work from any locale's page. */
export function sectionHref(locale: Locale, id: string): string {
  return `${localeHref(locale)}#${id}`;
}
