import { localeHref, LOCALES, LOCALE_NAMES, LOCALE_SHORT, type Dict, type Locale } from '../i18n';

interface Props {
  locale: Locale;
  dict: Dict;
  tone?: 'dark' | 'light';
}

export function LangSwitcher({ locale, dict, tone = 'dark' }: Props) {
  return (
    <nav
      aria-label={dict.nav.language}
      className={`flex items-center gap-0.5 rounded-full p-0.5 ${
        tone === 'dark' ? 'bg-ink-800' : 'bg-ink-100'
      }`}
    >
      {LOCALES.map((l) => {
        const active = l === locale;
        const idle =
          tone === 'dark' ? 'text-ink-300 hover:text-gold-300' : 'text-ink-500 hover:text-gold-700';
        return (
          <a
            key={l}
            href={localeHref(l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? 'true' : undefined}
            title={LOCALE_NAMES[l]}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors ${
              active ? 'bg-gold-400 text-ink-900' : idle
            }`}
          >
            <span aria-hidden="true">{LOCALE_SHORT[l]}</span>
            <span className="sr-only">{LOCALE_NAMES[l]}</span>
          </a>
        );
      })}
    </nav>
  );
}
