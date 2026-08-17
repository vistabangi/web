// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Custom domain on GitHub Pages: `site` is the apex domain and `base` stays unset.
// The domain itself is asserted by `public/CNAME`.
export default defineConfig({
  site: 'https://vistabangi.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-MY', ms: 'ms-MY', ta: 'ta-MY' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
