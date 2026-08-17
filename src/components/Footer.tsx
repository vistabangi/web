import { ADDRESS_LINE, CONTACT } from '../data/site';
import { Wordmark } from './Wordmark';
import { localeHref, LOCALES, LOCALE_NAMES, type Dict, type Locale } from '../i18n';

interface Props {
  locale: Locale;
  dict: Dict;
  logo: string | null;
  /** Build year, passed in so the value is baked at build time. */
  year: number;
}

export function Footer({ locale, dict, logo, year }: Props) {
  const links = [
    { id: 'shops', label: dict.nav.shops },
    { id: 'residences', label: dict.nav.units },
    { id: 'facilities', label: dict.nav.facilities },
    { id: 'security', label: dict.nav.security },
    { id: 'location', label: dict.nav.location },
    { id: 'stay', label: dict.nav.stay },
    { id: 'contact', label: dict.nav.contact },
  ];

  return (
    <footer className="bg-ink-900">
      <div className="rule-gold" />
      <div className="shell grid gap-12 py-16 md:grid-cols-3">
        <div>
          <Wordmark logo={logo} alt={dict.hero.logoAlt} height={64} tone="dark" />
          <p className="mt-4 text-sm text-ink-400">{dict.footer.tagline}</p>
          <address className="mt-4 text-sm leading-relaxed text-ink-200 not-italic">
            {ADDRESS_LINE}
          </address>
          {CONTACT.managementPhone && (
            <p className="mt-3.5 text-sm">
              <a
                className="text-ink-100 underline decoration-gold-600 underline-offset-4 hover:text-gold-300"
                href={`tel:${CONTACT.managementPhone.replace(/\s/g, '')}`}
              >
                {CONTACT.managementPhone}
              </a>
            </p>
          )}
          {CONTACT.managementEmail && (
            <p className="text-sm">
              <a
                className="text-ink-100 underline decoration-gold-600 underline-offset-4 hover:text-gold-300"
                href={`mailto:${CONTACT.managementEmail}`}
              >
                {CONTACT.managementEmail}
              </a>
            </p>
          )}
        </div>

        <nav aria-labelledby="footer-sections">
          <p
            id="footer-sections"
            className="text-[0.6875rem] font-semibold tracking-[0.18em] text-gold-400 uppercase"
          >
            {dict.footer.sections}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-ink-200 transition-colors hover:text-gold-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-lang">
          <p
            id="footer-lang"
            className="text-[0.6875rem] font-semibold tracking-[0.18em] text-gold-400 uppercase"
          >
            {dict.nav.language}
          </p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {LOCALES.map((l) => (
              <li key={l}>
                <a
                  href={localeHref(l)}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? 'true' : undefined}
                  className={
                    l === locale ? 'text-gold-300' : 'text-ink-200 transition-colors hover:text-gold-300'
                  }
                >
                  {LOCALE_NAMES[l]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-ink-800">
        <div className="shell flex flex-col gap-3 py-7 text-xs text-ink-400">
          <p>{dict.footer.rights(year)}</p>
          <p className="max-w-3xl leading-relaxed">{dict.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
