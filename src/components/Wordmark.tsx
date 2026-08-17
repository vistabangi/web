import { BUILDING } from '../data/site';

interface WordmarkProps {
  /** Crest URL, or null when the file has not been supplied yet. */
  logo: string | null;
  alt: string;
  /** Rendered height of the crest in pixels. */
  height?: number;
  /** `dark` for the gold-on-dark header, `light` for gold-on-white. */
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * The brand lockup. Uses the supplied crest when present; otherwise falls back
 * to a typographic wordmark with the same gold gradient, so the site never shows
 * a broken image while the asset is outstanding.
 */
export function Wordmark({ logo, alt, height = 44, tone = 'dark', className = '' }: WordmarkProps) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={alt}
        height={height}
        style={{ height: `${height}px` }}
        className={`w-auto ${className}`}
        // Above the fold in the header — never lazy-load it.
        loading="eager"
        decoding="async"
      />
    );
  }

  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="display text-gold-gradient text-xl tracking-wide sm:text-2xl">
        {BUILDING.shortName}
      </span>
      <span
        className={`mt-0.5 text-[0.5625rem] font-semibold tracking-[0.22em] uppercase ${
          tone === 'dark' ? 'text-ink-300' : 'text-ink-500'
        }`}
      >
        Service Apartment
      </span>
    </span>
  );
}
