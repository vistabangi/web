import { localeHref, LOCALES, LOCALE_NAMES, LOCALE_SHORT, type Dict, type Locale } from '../i18n';

interface Props {
  locale: Locale;
  dict: Dict;
  /**
   * `pills` — the compact inline row for the desktop header.
   * `list`  — full-width rows with native names, for the mobile menu panel.
   *
   * Four locales including 中文 and தமிழ் cannot fit beside the crest and the
   * menu button on a ~360 px viewport; squeezed flex items made 中文 break
   * across two lines. So `pills` is desktop-only and mobile uses `list`.
   */
  variant?: 'pills' | 'list';
  tone?: 'dark' | 'light';
}

export function LangSwitcher({ locale, dict, variant = 'pills', tone = 'dark' }: Props) {
  if (variant === 'list') {
    return (
      <nav aria-label={dict.nav.language}>
        <ul className="grid gap-1">
          {LOCALES.map((l) => {
            const active = l === locale;
            return (
              <li key={l}>
                <a
                  href={localeHref(l)}
                  hrefLang={l}
                  lang={l}
                  aria-current={active ? 'true' : undefined}
                  className={`flex items-center justify-between rounded-md px-3 py-2.5 text-base transition-colors ${
                    active ? 'bg-ink-800 text-gold-300' : 'text-ink-200 hover:bg-ink-800 hover:text-gold-300'
                  }`}
                >
                  <span>{LOCALE_NAMES[l]}</span>
                  {active && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

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
            // nowrap so a squeezed row can never split 中文 down the middle.
            className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
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
