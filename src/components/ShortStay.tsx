import { SOCIAL } from '../data/site';
import { CheckIcon } from './icons';
import type { Dict } from '../i18n';

interface Props {
  dict: Dict;
}

export function ShortStay({ dict }: Props) {
  return (
    <section id="stay" className="shell scroll-mt-24 py-24" aria-labelledby="stay-title">
      <div className="rounded-card bg-ink-900 p-8 md:p-14">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-[0.22em] text-gold-300 uppercase">
              Airbnb
            </p>
            <h2 id="stay-title" className="display mt-4 text-4xl text-white md:text-5xl">
              {dict.stay.title}
            </h2>
            <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold-300 to-gold-600" aria-hidden="true" />
            <p className="mt-6 text-sm leading-relaxed text-ink-200">{dict.stay.intro}</p>

            {SOCIAL.airbnbSearch ? (
              <>
                <a
                  href={SOCIAL.airbnbSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-block rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 transition-opacity hover:opacity-90"
                >
                  {dict.stay.cta}
                </a>
                <p className="mt-3.5 text-xs text-ink-400">{dict.stay.ctaNote}</p>
              </>
            ) : (
              /* No listing URL configured yet — the note without a dead link. */
              <p className="mt-9 text-xs text-ink-400">{dict.stay.ctaNote}</p>
            )}
          </div>

          <ul className="grid content-start gap-3.5">
            {dict.stay.points.map((p) => (
              <li
                key={p}
                className="flex gap-3.5 border-b border-gold-600/25 pb-3.5 text-sm text-ink-100"
              >
                <CheckIcon className="mt-1 shrink-0 text-gold-300" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
