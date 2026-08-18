import { ADDRESS_LINE, SPONSOR } from '../data/site';
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
    { id: 'outlets', label: dict.nav.outlets },
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
          {/*
            The number and address deliberately do NOT appear here. Masking them
            in the contact section while printing them in the footer would leave
            them in the served HTML anyway, defeating the point — so the footer
            links through to the reveal instead.
          */}
          <p className="mt-4 text-sm">
            <a
              href="#contact"
              className="text-ink-100 underline decoration-gold-600 underline-offset-4 hover:text-gold-300"
            >
              {dict.nav.contact}
            </a>
          </p>
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
        <div className="shell flex flex-col gap-4 py-7 text-xs text-ink-400 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <p>{dict.footer.rights(year)}</p>
            <p className="max-w-3xl leading-relaxed">{dict.footer.disclaimer}</p>
          </div>
          <p className="shrink-0 md:text-right">
            {dict.footer.sponsoredBy}{' '}
            <a
              href={SPONSOR.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-400 underline decoration-gold-700 underline-offset-4 transition-colors hover:text-gold-300"
            >
              {SPONSOR.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
