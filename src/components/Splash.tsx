import { BUILDING } from '../data/site';

interface Props {
  /** Crest URL, or null when the file is absent. */
  logo: string | null;
  sponsoredBy: string;
  sponsorName: string;
}

/**
 * Opening splash: the crest, with the sponsor credit beneath it.
 *
 * Deliberately ships **no JavaScript**. A CSS animation with
 * `animation-fill-mode: forwards` fades it out and sets `visibility: hidden`,
 * so it clears itself even with scripting disabled — a JS-driven splash would
 * stay on screen forever if the bundle failed to load.
 *
 * `aria-hidden` throughout: every word here is repeated in the header and
 * footer, so screen readers should land straight on the real content. The
 * `prefers-reduced-motion` rule in global.css removes it outright.
 */
export function Splash({ logo, sponsoredBy, sponsorName }: Props) {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-inner">
        {logo ? (
          <img src={logo} alt="" className="splash-logo" loading="eager" decoding="async" />
        ) : (
          <span className="display text-gold-gradient text-4xl">{BUILDING.shortName}</span>
        )}
        <p className="splash-note">
          {sponsoredBy} <span>{sponsorName}</span>
        </p>
      </div>
    </div>
  );
}
