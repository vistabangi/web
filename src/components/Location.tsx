import { ADDRESS_LINE, HIGHWAYS, TRANSPORT } from '../data/site';
import {
  HAS_EXACT_PIN,
  MAP_DIRECTIONS_URL,
  MAP_EMBED_URL,
  MAP_PLACE_URL,
  WAZE_URL,
} from '../lib/maps';
import { Icon, PIN_PATH } from './icons';
import type { Dict } from '../i18n';
import type { ReactNode } from 'react';

interface Props {
  dict: Dict;
  /** The copy-address island, passed in from Astro so this stays unhydrated. */
  copyButton?: ReactNode;
}

export function Location({ dict, copyButton }: Props) {
  return (
    <section id="location" className="scroll-mt-24 bg-ink-50 py-24" aria-labelledby="location-title">
      <div className="shell">
        <h2 id="location-title" className="section-title">
          {dict.location.title}
        </h2>
        <p className="prose-lead mt-4">{dict.location.intro}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
              {dict.location.addressLabel}
            </h3>
            <address className="display mt-3 text-2xl leading-snug text-ink-900 not-italic">
              {ADDRESS_LINE}
            </address>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-6 py-3 text-sm font-semibold text-ink-900 transition-opacity hover:opacity-90"
              >
                <Icon d={[PIN_PATH, 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z']} size={16} strokeWidth={2} />
                {dict.location.directions}
              </a>

              <a
                href={MAP_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink-200 px-6 py-3 text-sm font-semibold text-ink-600 transition-colors hover:border-gold-400 hover:text-gold-700"
              >
                {dict.location.openInMaps}
              </a>

              <a
                href={WAZE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink-200 px-6 py-3 text-sm font-semibold text-ink-600 transition-colors hover:border-gold-400 hover:text-gold-700"
              >
                Waze
              </a>

              {copyButton}
            </div>

            {!HAS_EXACT_PIN && (
              <p className="mt-5 max-w-md text-xs leading-relaxed text-ink-400">
                {dict.location.pinNotice}
              </p>
            )}

            <div className="mt-11 grid gap-9 sm:grid-cols-2">
              <div>
                <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
                  {dict.location.nearbyTitle}
                </h3>
                <ul className="mt-3.5 grid gap-2 text-sm">
                  {TRANSPORT.map((t) => (
                    <li key={t.name} className="flex justify-between gap-4 border-b border-ink-200 pb-2">
                      <span className="text-ink-600">{t.name}</span>
                      <span className="shrink-0 font-semibold text-gold-700">
                        {dict.location.km(t.distanceKm)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
                  {dict.location.highwaysTitle}
                </h3>
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {HIGHWAYS.map((h) => (
                    <li
                      key={h}
                      className="rounded border border-gold-200 bg-gold-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-gold-700"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-card border border-ink-200 bg-white">
            <iframe
              src={MAP_EMBED_URL}
              title={dict.location.mapTitle}
              className="block h-88 w-full border-0 lg:h-full lg:min-h-120"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
