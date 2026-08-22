import { LangSwitcher } from './LangSwitcher';
import { Wordmark } from './Wordmark';
import { localeHref, type Dict, type Locale } from '../i18n';

interface Props {
  locale: Locale;
  dict: Dict;
  logo: string | null;
}

export function Header({ locale, dict, logo }: Props) {
  const links = [
    { id: 'outlets', label: dict.nav.outlets },
    { id: 'residences', label: dict.nav.units },
    { id: 'facilities', label: dict.nav.facilities },
    { id: 'security', label: dict.nav.security },
    { id: 'location', label: dict.nav.location },
    { id: 'stay', label: dict.nav.stay },
    { id: 'contact', label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-ink-900/95 backdrop-blur supports-[backdrop-filter]:bg-ink-900/85">
      <div className="shell flex h-20 items-center justify-between gap-4">
        <a href={localeHref(locale)} className="flex items-center">
          {/* The crest is portrait-ish (2048×1588) and carries the wordmark, so
              it needs more height than a typical logotype to stay legible. */}
          <Wordmark logo={logo} alt={dict.hero.logoAlt} height={68} tone="dark" />
        </a>

        <nav aria-label={dict.nav.menu} className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-md px-2.5 py-2 text-sm text-ink-200 transition-colors hover:text-gold-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop only — see the note in LangSwitcher on why. */}
          <div className="hidden xl:block">
            <LangSwitcher locale={locale} dict={dict} variant="pills" tone="dark" />
          </div>

          {/* Checkbox toggle: the mobile menu needs no JavaScript at all. */}
          <input id="nav-toggle" type="checkbox" className="peer sr-only" />
          <label
            htmlFor="nav-toggle"
            className="-mr-2 cursor-pointer rounded-md p-2 text-ink-200 transition-colors hover:text-gold-300 xl:hidden"
            aria-label={dict.nav.menu}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </label>

          <div
            className="absolute inset-x-0 top-20 hidden max-h-[calc(100dvh-5rem)] overflow-y-auto bg-ink-900 peer-checked:block xl:hidden!"
          >
            <div className="shell py-5">
              {/* Language first: with four locales it is the thing a visitor is
                  most likely to be hunting for on a narrow screen. */}
              <p className="px-3 text-[0.6875rem] font-semibold tracking-[0.18em] text-gold-400 uppercase">
                {dict.nav.language}
              </p>
              <div className="mt-2">
                <LangSwitcher locale={locale} dict={dict} variant="list" tone="dark" />
              </div>

              <div className="my-5 h-px bg-ink-800" />

              <p className="px-3 text-[0.6875rem] font-semibold tracking-[0.18em] text-gold-400 uppercase">
                {dict.footer.sections}
              </p>
              <nav aria-label={dict.nav.menu} className="mt-2 grid gap-1">
                {links.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    className="rounded-md px-3 py-2.5 text-base text-ink-200 transition-colors hover:bg-ink-800 hover:text-gold-300"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="rule-gold" />
    </header>
  );
}
