# vistabangi.com

Official website for **Vista Bangi Service Apartment**, Jalan Reko, Selangor.

Astro 7 + Tailwind CSS 4, TypeScript throughout, built to a static site and served
from GitHub Pages at `vistabangi.com`.

Three locales: **English** (`/`), **Bahasa Melayu** (`/ms/`), **Tamil** (`/ta/`).

---

## Quick start

Requires **Node 22.12.0 or newer** (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-checks, then builds to dist/
npm run preview    # serve the built dist/ locally
```

`npm run build` runs `astro check` first, so a type error or a missing
translation key fails the build rather than shipping a broken page.

> **Note on this machine:** Node 18.17.0 is on your `PATH`, which is too old for
> Astro 7. Node 22.12.0 has been placed at `C:\ProgramData\nvm\v22.12.0`. Either
> run `nvm use 22.12.0` from an **Administrator** terminal (nvm-windows needs
> elevation to repoint the `C:\Program Files\nodejs` symlink), or prefix commands
> for a single session:
>
> ```powershell
> $env:Path = "C:\ProgramData\nvm\v22.12.0;$env:Path"
> ```

---

## Project layout

```
src/
  data/
    site.ts          building facts, address, security flags, contact details
    tenants.ts       ← the Level 1 / Level 2 shop directory
    facilities.ts    facility list + unit layouts
  i18n/
    types.ts         the Dict interface — every locale must satisfy it
    en.ts ms.ts ta.ts
    index.ts
  lib/maps.ts        map deep links (Google, Waze) + embed URL
  components/        one component per page section
  layouts/Base.astro
  pages/
    index.astro      English
    ms/index.astro   Bahasa Melayu
    ta/index.astro   Tamil
    404.astro
public/
  CNAME              vistabangi.com  ← do not delete, this claims the domain
  favicon.svg  robots.txt  .nojekyll
```

All copy lives in `src/i18n/`, all facts in `src/data/`. You should not need to
touch a component to update the site's content.

---

## Editing the shop directory (Levels 1 & 2)

Open **`src/data/tenants.ts`**. Every entry is currently a placeholder — it
renders with a dashed border and a "name to be confirmed" badge, so the site
never claims a business exists under a name nobody has verified.

For each real shop:

1. Set `name` to the trading name on the shopfront.
2. Set `category` — drives the filter chips and the icon.
3. Set `floor` (`1` or `2`) and `unit` (lot number, optional).
4. Add `phone` / `hours` if you have them (both optional).
5. **Delete `placeholder: true`** — that is what promotes it to a live entry.

Delete any surplus placeholders and copy an entry to add more. Once every
placeholder is gone, the "directory is being compiled" notice disappears on its
own. Category labels are translated in `src/i18n/{en,ms,ta}.ts` under
`floors.categories`.

---

## Adding a language

1. Add the code to `LOCALES` in `src/i18n/types.ts`, plus entries in `HTML_LANG`,
   `LOCALE_NAMES` and `LOCALE_SHORT`.
2. Create `src/i18n/<code>.ts` satisfying `Dict` and register it in
   `src/i18n/index.ts`.
3. Create `src/pages/<code>/index.astro` (copy `src/pages/ms/index.astro`).
4. Add the locale to the `sitemap()` config in `astro.config.mjs`.

`astro check` will list every key you still owe. Chinese (`zh`) would slot in
this way if you want it later.

---

## ⚠️ Facts to confirm before launch

The building details were compiled from public property listings, **not** from
management records. Each one is marked `CONFIRM` in `src/data/site.ts`. Please
verify with the management office:

| Item | Currently says | Note |
| --- | --- | --- |
| Storeys per block | **38** | Public listings say **39**. You specified 38 — confirm which is right. |
| Units per block | *not shown* | Listings say 526 (A) and 492 (B), total 1,018. Left blank until verified; set `units` in `BUILDING.blocks`. |
| Street address | Jalan Reko, Bandar Baru Bangi | Listings variously say "18, Jalan Reko, Taman Sri Reko" and "Seksyen 2, Bandar Baru Bangi". |
| Postcode | **43650** | 43650 is Bandar Baru Bangi; 43000 is Kajang. Confirm which applies. |
| Distances | 500 m to UKM Komuter, etc. | From listings — see `TRANSPORT`. |
| Facilities | full list | See `FACILITIES` — remove anything the building does not actually have. |
| Unit layouts | studio / 2-bed / 3-bed, 501–1,000 sq ft | See `UNIT_TYPES`. |
| Security features | guarded, CCTV, card access, visitor registration | See `SECURITY`. Setting a flag to `false` removes that claim from the page entirely. |

### Still to fill in

- [ ] **Real shop names** for Levels 1 and 2 — `src/data/tenants.ts`
- [ ] **Contact details** — `CONTACT` in `src/data/site.ts` (all `null`; unset
      channels render as "to be published" rather than as dead links)
- [ ] **Map pin coordinates** — `COORDINATES` in `src/data/site.ts`. Deliberately
      `null`: while unset, the map and all Google/Waze links resolve the building
      *by name* instead of dropping an invented pin. To set an exact pin,
      right-click the building in Google Maps, click the lat/lng to copy it, then:
      ```ts
      export const COORDINATES: GeoPoint | null = { lat: 2.9xxx, lng: 101.7xxx };
      ```
      The embed, the directions links, the Waze link and the JSON-LD `geo` block
      all upgrade automatically, and the "pin being surveyed" notice disappears.
- [ ] **Social share image** — add a 1200×630 PNG at `public/og.png` and set
      `OG_IMAGE = '/og.png'` in `src/data/site.ts`. Until then the `og:image`
      tags are omitted rather than pointing at a missing file.
- [ ] **Airbnb listing URL** — `SOCIAL.airbnbSearch` in `src/data/site.ts`
- [ ] **Tamil proofread** by a native speaker — `src/i18n/ta.ts`
- [ ] **Building photos** — there are currently none; the hero uses a CSS/SVG
      treatment. Drop images in `src/assets/` and use Astro's `<Image>` component.

---

## Deployment

`.github/workflows/deploy.yml` builds on every push to `master` (and `main`) and
publishes to GitHub Pages. No secrets or tokens are needed.

### One-time GitHub setup

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Pages → Custom domain:** enter `vistabangi.com` and save.
3. Tick **Enforce HTTPS** once the certificate is issued (can take up to an hour).

`public/CNAME` already contains `vistabangi.com`, so the domain survives every
redeploy — GitHub Pages otherwise clears it.

### DNS records at your registrar

For the apex domain `vistabangi.com`, four **A** records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

And optionally four **AAAA** records for IPv6:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

For `www`, one **CNAME** record pointing to:

```
vistabangi.github.io
```

Propagation is usually minutes but can take up to 24 hours. Verify with:

```bash
dig vistabangi.com +short
```

---

## Notes on how this is built

- **Almost no JavaScript.** Two small inline scripts only: the shop-category
  filter and the copy-address button. Both are progressive enhancements — with
  JS disabled, every shop stays visible and the address stays selectable. The
  mobile menu is pure CSS (a checkbox peer), so it ships no JS at all.
- **Type-enforced translations.** `Dict` in `src/i18n/types.ts` uses
  `Record<TenantCategory, string>` and `Record<FacilityKey, string>`, so adding a
  shop category or facility is a compile error until all three languages have a
  label. No silent English fallbacks.
- **Claims are data-driven.** Security features, contact channels, the Airbnb
  link and the map pin are all gated on their values in `src/data/site.ts`. Unset
  or `false` means the claim is *removed from the page and from the structured
  data*, never rendered as an empty field or a broken link.
- **Fonts are system fonts.** The stack includes Tamil fallbacks
  (`Noto Sans Tamil`, `Nirmala UI`, `Latha`), so all three languages render with
  no webfont download.
- **SEO.** Per-locale canonical + full `hreflang` set with `x-default`,
  `ApartmentComplex` JSON-LD with `PostalAddress`, and a locale-aware sitemap.
