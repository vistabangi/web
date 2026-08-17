# vistabangi.com

Official website for **Vista Bangi Service Apartment**, Jalan Reko, Kajang.

**React 19 + TypeScript**, rendered by **Astro 7** as static HTML, styled with
**Tailwind CSS 4**, deployed to GitHub Pages at `vistabangi.com` by GitHub Actions.

Four locales: **English** (`/`), **Bahasa Melayu** (`/ms/`), **Tamil** (`/ta/`),
**简体中文** (`/zh/`).

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

## ⚠️ Two image files are still needed

Save these two files, then rebuild — no code change required. Until they exist
the site renders a typographic gold wordmark and a gold gradient hero instead,
so nothing is ever broken.

| Save as | What | Notes |
| --- | --- | --- |
| `public/images/logo.png` | The Vista Bangi crest | Transparent PNG, at least 400 px tall |
| `public/images/building.jpg` | The façade photo | **Bus removed.** JPEG, 1920–2400 px wide, compressed to ≲400 KB |

Detection happens at build time in [`src/lib/assets.ts`](src/lib/assets.ts).

**About the bus:** removing it needs content-aware inpainting over the shopfronts
it covers, which cannot be done from code — a crop would lose the shopfront row,
which is exactly the content worth showing. Run the photo through Photoshop
Generative Fill, the Google/Samsung Photos object eraser, or
[cleanup.pictures](https://cleanup.pictures), then save the result to the path
above.

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
    en.ts ms.ts ta.ts zh.ts
    index.ts
  lib/
    assets.ts        build-time detection of logo.png / building.jpg (server only)
    maps.ts          map deep links (Google, Waze) + embed URL
    shopView.ts      serializable view model for the shop directory island
  components/        React (.tsx), one per page section
  layouts/Base.astro
  pages/
    index.astro      English      ms/index.astro   Bahasa Melayu
    ta/index.astro   Tamil        zh/index.astro   简体中文
    404.astro
public/
  CNAME              vistabangi.com  ← do not delete, this claims the domain
  images/            ← the two files above go here
  favicon.svg  robots.txt  .nojekyll
```

All copy lives in `src/i18n/`, all facts in `src/data/`. You should not need to
touch a component to change the site's content.

### How React is used here

Every component is a real React component in TypeScript. Astro renders them to
static HTML at build time, and only two are hydrated in the browser:

| Component | Directive | Why |
| --- | --- | --- |
| `ShopDirectory.tsx` | `client:visible` | `useState` for the category filter |
| `CopyAddressButton.tsx` | `client:visible` | needs the Clipboard API |

Everything else ships **zero JavaScript**. The mobile menu is pure CSS (a
checkbox peer), so the header needs no JS either.

Both islands load only when scrolled into view, but they do pull in React
(~190 KB of JS total, gzipped to roughly 60 KB over the wire). If you would
rather the site ship no JavaScript at all, both interactions can be rebuilt with
a CSS-only radio filter and a ~30-line inline script — ask and it's a small change.

> **Gotcha if you add a `client:*` directive:** Astro serializes island props to
> JSON, so a hydrated component **cannot** receive the `Dict` object — it holds
> functions like `level(n)` and `km(n)`. Resolve the strings server-side first,
> the way [`src/lib/shopView.ts`](src/lib/shopView.ts) does. For the same reason,
> never import `src/lib/assets.ts` from a hydrated component: it uses `node:fs`.

### Fonts

Self-hosted via Fontsource — no Google Fonts request, so no third-party call:

- **Cormorant Garamond** (variable) — display/headings
- **Inter** (variable) — body text
- **Noto Sans Tamil** (variable) — the `/ta/` pages

Chinese uses the system CJK stack (`PingFang SC`, `Microsoft YaHei`,
`Noto Sans SC`); a Simplified Chinese webfont would add several megabytes for a
handful of headings. Every `@font-face` carries a `unicode-range`, so a visitor
only downloads the subsets their page actually uses.

### Theme

Gold sampled from the crest's gradient, on white. Tokens are in
[`src/styles/global.css`](src/styles/global.css) under `@theme`:
`--color-gold-50` → `--color-gold-800`, plus a set of warm neutrals
(`--color-ink-*`) chosen so the greys don't fight the gold.

Only `gold-600` and `gold-700` clear the 4.5:1 contrast threshold on white, so
those are the shades used for body-size gold text. Lighter shades are reserved
for large display type, borders, fills and gold-on-dark.

---

## Editing the shop directory (Levels 1 & 2)

Open **[`src/data/tenants.ts`](src/data/tenants.ts)**. Currently **5 of 16
entries are verified** against public sources; the rest are marked
`placeholder: true`, which renders a dashed border and a "to be confirmed" badge.

Verified, with unit numbers from the outlets' own published addresses:

| Tenant | Unit | Source |
| --- | --- | --- |
| Richiamo Coffee | 1-02 | richiamocoffee.com outlet page |
| ZUS Coffee | 1-06 | zuscoffee.com outlet page |
| 7-Eleven | 1-07 | listed as "SEL 1-07, Vista Bangi, Jln Reko" |
| eco-shop | 1-08 – 1-11 | eco-shop.com.my store locator |
| eco-shop | 2-08 – 2-11 | same store, upper level |

Known to trade here but **lot number not yet confirmed**: 99 Speedmart, KK Mart,
a clinic, a restoran/mamak. Level 2 is largely unsurveyed — a walk-around with a
notepad will finish it fastest.

To promote an entry: correct `name`, set `unit` and `category`, optionally add
`phone` / `hours` / `url`, then **delete `placeholder: true`**. The "5 of 16
confirmed" counter and the explanatory notice both update themselves.

> Note on level naming: those sources call the podium levels "Ground" and "1st"
> floor, while the building's own lot numbers (`1-xx`, `2-xx`) call them Level 1
> and Level 2. The lot numbers are the reliable key, so they drive `floor`.

---

## Adding a language

1. Add the code to `LOCALES` in `src/i18n/types.ts`, plus entries in `HTML_LANG`,
   `LOCALE_NAMES` and `LOCALE_SHORT`.
2. Create `src/i18n/<code>.ts` satisfying `Dict`, register it in
   `src/i18n/index.ts`.
3. Create `src/pages/<code>/index.astro` (copy `src/pages/ms/index.astro`).
4. Add the locale to the `sitemap()` config in `astro.config.mjs`.

`astro check` will list every key you still owe.

---

## ⚠️ Facts to confirm before launch

Building details were compiled from public property listings, **not** from
management records. Each is marked `CONFIRM` in
[`src/data/site.ts`](src/data/site.ts).

| Item | Currently says | Note |
| --- | --- | --- |
| Storeys per block | **38** | Public listings say **39**. You specified 38 — please confirm. |
| Units per block | *not shown* | Listings say 526 (A) and 492 (B), total 1,018. Blank until verified. |
| Address | 18, Jalan Reko, Taman Sri Reko, **43000** Kajang | ✅ Now corroborated by EdgeProp, Ziba Property, and the registered addresses of the Richiamo/ZUS/7-Eleven outlets. Supersedes the earlier 43650 guess. |
| Distances | 500 m to UKM Komuter, etc. | From listings — see `TRANSPORT`. |
| Facilities | full list | See `FACILITIES` — remove anything the building lacks. |
| Unit layouts | studio / 2-bed / 3-bed, 501–1,000 sq ft | See `UNIT_TYPES`. |
| Security features | guarded, CCTV, card access, visitor registration | See `SECURITY`. Setting a flag to `false` removes that claim from the page *and* the structured data. |

### Still to fill in

- [ ] **`public/images/logo.png`** and **`public/images/building.jpg`** (see above)
- [ ] **Remaining shop names / lot numbers** — `src/data/tenants.ts`
- [ ] **Contact details** — `CONTACT` in `src/data/site.ts` (all `null`; unset
      channels render as "to be published" rather than as dead links)
- [ ] **Map pin coordinates** — `COORDINATES` in `src/data/site.ts`. Deliberately
      `null`: while unset, the map and every Google/Waze link resolve the building
      *by name* instead of dropping an invented pin. To set an exact pin,
      right-click the building in Google Maps, click the lat/lng to copy, then:
      ```ts
      export const COORDINATES: GeoPoint | null = { lat: 2.9xxx, lng: 101.7xxx };
      ```
      The embed, all nav links and the JSON-LD `geo` block upgrade automatically.
- [ ] **Social share image** — a 1200×630 PNG at `public/og.png`, then set
      `OG_IMAGE = '/og.png'`. Until then `og:image` is omitted rather than broken.
- [ ] **Airbnb listing URL** — `SOCIAL.airbnbSearch`
- [ ] **Proofread** `src/i18n/ta.ts` (Tamil) and `src/i18n/zh.ts` (Chinese) with
      native speakers

---

## Deployment

`.github/workflows/deploy.yml` builds on every push to `master` (and `main`) and
publishes to GitHub Pages. No secrets or tokens needed.

### One-time GitHub setup

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Pages → Custom domain:** enter `vistabangi.com`, save.
3. Tick **Enforce HTTPS** once the certificate is issued (up to an hour).

`public/CNAME` already contains `vistabangi.com`, so the domain survives every
redeploy — GitHub Pages otherwise clears it.

### DNS records at your registrar

Apex domain `vistabangi.com` — four **A** records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optionally four **AAAA** records for IPv6:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

For `www` — one **CNAME** record to:

```
vistabangi.github.io
```

Propagation is usually minutes, up to 24 hours. Verify with `dig vistabangi.com +short`.

---

## Design and correctness notes

- **Claims are data-driven.** Security features, contact channels, the Airbnb
  link, the map pin and the brand images are all gated on their values in
  `src/data/`. Unset or `false` means the claim is *removed from the page and the
  structured data* — never rendered as an empty field or a broken link.
- **Type-enforced translations.** `Dict` uses `Record<TenantCategory, string>`
  and `Record<FacilityKey, string>`, so adding a shop category or facility is a
  compile error until all four languages have a label. No silent English fallbacks.
- **Per-script typography.** Cormorant and Inter carry no Tamil or CJK glyphs, so
  `:lang(ta)` and `:lang(zh)` rules in `global.css` swap in matching families
  rather than letting the browser choose.
- **SEO.** Per-locale canonical plus a full `hreflang` set with `x-default`,
  `ApartmentComplex` JSON-LD with `PostalAddress`, and a locale-aware sitemap.
