import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { TENANTS } from '../data/tenants';

/**
 * Build-time detection of image files in `public/`.
 *
 * ⚠️ SERVER ONLY. This imports `node:fs`, so it must never reach a client
 * bundle. Import it from `.astro` files only (which always run on the server)
 * and pass the results to React components as plain strings — never import it
 * from a `.tsx` component that carries a `client:*` directive.
 *
 * Detection rather than hardcoded paths means a missing file degrades to a
 * designed fallback instead of a broken image, and dropping a file in needs no
 * code change.
 *
 *   public/images/logo.png         the Vista Bangi crest
 *   public/images/background.jpg   the façade photo (.png also accepted)
 *   public/images/shops/<id>.png   per-outlet logo, name matching the tenant id
 */

/**
 * Resolved from the working directory, NOT from `import.meta.url`: Vite bundles
 * this module into a temporary SSR chunk during `astro build`, so
 * `import.meta.url` points at the chunk rather than at `src/lib/`, and every
 * lookup silently returns null. `astro dev` / `astro build` and the CI workflow
 * all run from the project root, so cwd is the reliable anchor.
 */
const PUBLIC_DIR = resolve(process.cwd(), 'public');

/** Returns the root-relative URL if the file exists, else null. */
function publicAsset(relativePath: string): string | null {
  return existsSync(resolve(PUBLIC_DIR, relativePath)) ? `/${relativePath}` : null;
}

/** First candidate that exists, so a .png/.jpg mix-up is not a broken image. */
function firstPresent(candidates: readonly string[]): string | null {
  for (const candidate of candidates) {
    const found = publicAsset(candidate);
    if (found) return found;
  }
  return null;
}

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'webp'] as const;

export interface BrandAssets {
  readonly logo: string | null;
  readonly background: string | null;
}

export function resolveBrandAssets(): BrandAssets {
  return {
    logo: firstPresent(IMAGE_EXTENSIONS.map((e) => `images/logo.${e}`)),
    // `background` is the documented name; `building` is accepted as an alias
    // so an older file name keeps working.
    background: firstPresent([
      ...IMAGE_EXTENSIONS.map((e) => `images/background.${e}`),
      ...IMAGE_EXTENSIONS.map((e) => `images/building.${e}`),
    ]),
  };
}

/**
 * Maps tenant id → logo URL for every outlet that has a file in
 * `public/images/shops/`. Ids with no file are simply absent from the map, and
 * the directory renders an empty circle for them.
 */
export function resolveShopLogos(): Record<string, string> {
  const logos: Record<string, string> = {};
  for (const tenant of TENANTS) {
    const found = firstPresent(IMAGE_EXTENSIONS.map((e) => `images/shops/${tenant.id}.${e}`));
    if (found) logos[tenant.id] = found;
  }
  return logos;
}
