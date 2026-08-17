import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Build-time detection of the brand image files.
 *
 * ⚠️ SERVER ONLY. This imports `node:fs`, so it must never be pulled into a
 * client bundle. Import it from `.astro` files only (which always run on the
 * server) and pass the results down to React components as props — do not
 * import it from a `.tsx` component that uses a `client:*` directive.
 *
 * Why detection rather than a hardcoded path: the logo and façade photo are
 * supplied by the client, so until the files land the site renders a typographic
 * wordmark and a gold gradient instead of two broken images. Drop the files in
 * and they are picked up on the next build with no code change.
 *
 *   public/images/logo.png       — the Vista Bangi crest, transparent PNG
 *   public/images/building.jpg   — the façade photo, bus removed
 */

const PUBLIC_DIR = new URL('../../public/', import.meta.url);

function publicAsset(relativePath: string): string | null {
  const absolute = fileURLToPath(new URL(relativePath, PUBLIC_DIR));
  return existsSync(absolute) ? `/${relativePath}` : null;
}

export interface BrandAssets {
  /** Root-relative URL of the crest, or null when the file is absent. */
  readonly logo: string | null;
  /** Root-relative URL of the façade photo, or null when the file is absent. */
  readonly building: string | null;
}

export function resolveBrandAssets(): BrandAssets {
  return {
    logo: publicAsset('images/logo.png'),
    building: publicAsset('images/building.jpg'),
  };
}
