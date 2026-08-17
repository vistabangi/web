import { BUILDING } from '../data/site';
import type { Dict } from '../i18n';

interface Props {
  dict: Dict;
  /** Façade photo URL, or null when the file has not been supplied yet. */
  photo: string | null;
}

export function Hero({ dict, photo }: Props) {
  const stats = [
    { value: String(BUILDING.floors), label: dict.hero.statFloors },
    { value: BUILDING.blocks.map((b) => b.name.replace('Block ', '')).join(' · '), label: dict.hero.statBlocks },
    { value: BUILDING.retailLevels.join(' & '), label: dict.hero.statRetail },
    { value: BUILDING.tenure, label: dict.hero.statTenure },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-ink-900">
      {photo ? (
        <>
          <img
            src={photo}
            alt={dict.hero.photoAlt}
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_35%]"
            // The LCP element — load it eagerly and at high priority.
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          {/* Left-weighted scrim so the headline keeps contrast over the towers. */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/45"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink-900 to-transparent"
            aria-hidden="true"
          />
        </>
      ) : (
        /* No photo supplied yet: a gold-on-dark treatment rather than a gap. */
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,var(--color-ink-800),var(--color-ink-900)_55%)]" />
          <div className="absolute inset-0 opacity-25">
            <svg width="100%" height="100%" preserveAspectRatio="xMidYMax slice" viewBox="0 0 800 400">
              <defs>
                <pattern id="hero-windows" width="16" height="22" patternUnits="userSpaceOnUse">
                  <rect x="3" y="4" width="9" height="12" className="fill-gold-400" />
                </pattern>
              </defs>
              <rect x="450" y="60" width="150" height="340" fill="url(#hero-windows)" />
              <rect x="620" y="115" width="150" height="285" fill="url(#hero-windows)" />
            </svg>
          </div>
        </div>
      )}

      <div className="shell relative py-24 md:py-32">
        <p className="text-[0.6875rem] font-semibold tracking-[0.22em] text-gold-300 uppercase">
          {dict.hero.eyebrow}
        </p>

        <h1 className="display mt-6 max-w-3xl text-[2.75rem] text-white sm:text-6xl md:text-7xl">
          {dict.hero.title}
        </h1>

        <div className="mt-7 h-px w-28 bg-gradient-to-r from-gold-300 to-gold-600" aria-hidden="true" />

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-100">{dict.hero.subtitle}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#location"
            className="rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 transition-opacity hover:opacity-90"
          >
            {dict.hero.ctaPrimary}
          </a>
          <a
            href="#outlets"
            className="rounded-full border border-gold-400/50 px-7 py-3.5 text-sm font-semibold text-gold-200 transition-colors hover:border-gold-300 hover:text-gold-100"
          >
            {dict.hero.ctaSecondary}
          </a>
        </div>

        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-gold-600/40 pt-3.5">
              <dd className="display text-3xl text-gold-200">{s.value}</dd>
              <dt className="mt-1.5 text-[0.6875rem] leading-snug tracking-[0.14em] text-ink-300 uppercase">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
