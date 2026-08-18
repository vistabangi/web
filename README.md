# vistabangi.com

Official website for **Vista Bangi Service Apartment**, Jalan Reko, Kajang.

**React 19 + TypeScript**, rendered by **Astro 7** as static HTML, styled with
**Tailwind CSS 4**, deployed to GitHub Pages at `vistabangi.com` by GitHub Actions.

Four locales, in switcher order: **EN** (`/`), **BM** (`/ms/`), **中文** (`/zh/`),
**தமிழ்** (`/ta/`).

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

## Images

Both brand images are in place and live on the site:

| File | Size | Used as |
| --- | --- | --- |
| `public/images/logo.png` | 2048×1588, 305 KB | Header and footer crest |
| `public/images/background.jpg` | 1280×960, 230 KB | Hero background |

Detection is at build time in [`src/lib/assets.ts`](src/lib/assets.ts) — it
accepts `.png`, `.jpg`, `.jpeg`, `.svg` or `.webp`, and falls back to a
typographic gold wordmark and a gradient hero if a file is ever missing, so
neither can render as a broken image.

### ⚠️ The hero photo needs replacing before launch

Three problems with the current `background.jpg`, in order of seriousness:

1. **It is watermarked.** A listing-site watermark runs diagonally across the
   podium. Publishing a watermarked third-party photo on the official site is a
   licensing problem, not just a cosmetic one.
2. **The bus is still there**, parked across several shopfronts.
3. **1280×960 is low** for a full-width hero — it will look soft on desktop and
   on any high-DPI screen. Aim for 2400 px wide.

The fix is one original photograph of the façade, taken when the bay is clear.
Failing that, remove the bus with content-aware inpainting (Photoshop Generative
Fill, the Google/Samsung Photos object eraser, or
[cleanup.pictures](https://cleanup.pictures)) — but that does not solve the
watermark or the resolution.

`logo.png` is also 305 KB for something displayed 58 px tall. Running it through
[squoosh.app](https://squoosh.app) would cut it by roughly 90% with no visible
difference.

### Outlet logos

Drop a square image at **`public/images/shops/<id>.png`**, where `<id>` matches
the outlet's `id` in [`src/data/tenants.ts`](src/data/tenants.ts) — for example
`public/images/shops/zus-coffee.png`. It appears on the next build with no code
change. Outlets with no logo file render an empty circle, so rows stay aligned
either way. `.png`, `.jpg`, `.jpeg`, `.svg` and `.webp` all work.

---

## Project layout

```
src/
  data/
    site.ts          building facts, address, security flags, contact, socials
    tenants.ts       ← the commercial outlet directory
    facilities.ts    facility list + unit layouts
  i18n/
    types.ts         the Dict interface — every locale must satisfy it
    en.ts ms.ts zh.ts ta.ts
    index.ts
  lib/
    assets.ts        build-time image detection (server only — uses node:fs)
    maps.ts          map deep links (Google, Waze) + embed URL
    shopView.ts      serializable view model for the outlet directory island
  components/        React (.tsx), one per page section
  layouts/Base.astro
  pages/
    index.astro      EN        ms/index.astro   BM
    zh/index.astro   中文       ta/index.astro   தமிழ்
    404.astro
public/
  CNAME              vistabangi.com  ← do not delete, this claims the domain
  images/            logo.png, background.jpg, shops/<id>.png
  favicon.svg  robots.txt  .nojekyll
```

All copy lives in `src/i18n/`, all facts in `src/data/`. You should not need to
touch a component to change the site's content.

### How React is used here

Every component is a real React component in TypeScript. Astro renders them to
static HTML at build time, and only two are hydrated in the browser:

| Component | Directive | Why |
| --- | --- | --- |
| `OutletDirectory.tsx` | `client:visible` | `useState` for the category filter |
| `CopyAddressButton.tsx` | `client:visible` | needs the Clipboard API |

Everything else ships **zero JavaScript**. The mobile menu is pure CSS (a
checkbox peer), so the header needs no JS either.

Both islands load only when scrolled into view, but they do pull in React
(~190 KB of JS, roughly 60 KB gzipped over the wire). If you would rather the
site ship no JavaScript at all, both interactions can be rebuilt with a CSS-only
radio filter and a ~30-line inline script — ask and it's a small change.

> **Two gotchas if you add a `client:*` directive:**
> 1. Astro serializes island props to JSON, so a hydrated component **cannot**
>    receive the `Dict` object — it holds functions like `levelLabel(n)` and
>    `km(n)`. Resolve strings server-side first, as
>    [`src/lib/shopView.ts`](src/lib/shopView.ts) does.
> 2. Never import [`src/lib/assets.ts`](src/lib/assets.ts) from a hydrated
>    component: it uses `node:fs`. It also resolves paths from `process.cwd()`
>    rather than `import.meta.url`, because Vite bundles it into a temporary SSR
>    chunk at build time and `import.meta.url` would point at the chunk — which
>    made every lookup silently return null.

### Contact masking

The phone, WhatsApp and e-mail sit behind a click and never appear as plain text
in the served HTML. `MASK_CONTACT` in [`src/data/site.ts`](src/data/site.ts)
turns the whole thing off in one place.

It had to cover **three** places, because leaving any one of them in plain text
would make the other two pointless:

| Place | Before | Now |
| --- | --- | --- |
| Contact section | `tel:` / `mailto:` / `wa.me` links | masked payload, revealed on click |
| Footer | printed the number and address | links to `#contact` instead |
| JSON-LD | `telephone` and `email` fields | omitted while `MASK_CONTACT` is on |

**What this stops:** bulk harvesters that fetch raw HTML and run a regex for
`mailto:` links, `name@host.tld` patterns or phone-shaped digit runs. That is
the large majority of address scraping.

**What it does not stop:** anything driving a headless browser. It executes the
same JavaScript a visitor does and reads the revealed value. This lowers spam
volume; it is not a security control, so treat the details as public anyway.

**Two costs, both deliberate:**

1. **Search engines lose the contact fields.** `telephone` and `email` are gone
   from the structured data, so they cannot appear in a rich result. The address
   and everything else still do. Flip `MASK_CONTACT` to `false` to restore them.
2. **The phone is unavailable without JavaScript.** The `<noscript>` block gives
   the e-mail in `[at]`/`[dot]` form — readable by a person, invisible to a
   regex — but *not* the number, because `noscript` markup sits in the served
   HTML like anything else and a scraper reads it whether or not it runs
   scripts. Any human-readable phone number is digit-matchable, so there is no
   way to print it there safely.

Encoding is in [`src/lib/contactMask.ts`](src/lib/contactMask.ts) — reversed hex
character codes, deliberately dependency-free and pure JavaScript so the same
module masks on the server and unmasks in the browser.

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

Gold sampled from the crest's gradient, on white. Tokens live in
[`src/styles/global.css`](src/styles/global.css) under `@theme`:
`--color-gold-50` → `--color-gold-800`, plus warm neutrals (`--color-ink-*`)
chosen so the greys don't fight the gold.

Only `gold-600` and `gold-700` clear the 4.5:1 contrast threshold on white, so
those carry body-size gold text. Lighter shades are reserved for large display
type, borders, fills and gold-on-dark.

---

## The outlet directory

Levels 1 and 2 are presented as a single **Commercial outlets** section, filtered
by category rather than split by floor — which also avoids inventing a level for
outlets whose floor isn't known. `floor` in
[`src/data/tenants.ts`](src/data/tenants.ts) is optional: set it and a level
badge appears, omit it and nothing is claimed.

**13 of 15 outlets confirmed.**

Names confirmed by management (each carries its Google listing link):

| Outlet | Category |
| --- | --- |
| RBS 1 Bistro | Food & drink |
| Restoran Madame | Food & drink |
| Klinik Iman Medic | Clinics |
| Klinik Khalifah | Clinics |
| Bangi Dental Cottage | Dental |
| Klinik Pergigian Dentacity | Dental |
| Tadika Nimblebee | Childcare & education |
| Al Kauthar Eduqids Playschool | Childcare & education |
| The ChildTime Preschool | Childcare & education |
| IZZY Solutions | IT & electronics |

Lot numbers confirmed from the chains' own published addresses:

| Outlet | Lot |
| --- | --- |
| ZUS Coffee | 1-06 |
| 7-Eleven | 1-07 |
| eco-shop | 1-08 – 1-11, 2-08 – 2-11 |

Still flagged **to be confirmed**: 99 Speedmart and KK Mart — both known to trade
here, neither with a lot number yet.

**Richiamo Coffee has been removed**, not listed as closed: its lot (1-02) was
taken over by RBS 1 Bistro, and a directory shouldn't carry shut businesses.

To finish the directory, walk the two levels and note the lot number beside each
name, then fill in `unit` and `floor` and delete any `placeholder: true`. The
"13 of 15" counter and the explanatory notice both update themselves.

> Note on level naming: chain store locators call these levels "Ground" and
> "1st" floor, while the building's own lot numbers (`1-xx`, `2-xx`) call them
> Level 1 and Level 2. The lot numbers are the reliable key.

---

## Adding a language

1. Add the code to `LOCALES` in `src/i18n/types.ts` (the array order *is* the
   switcher order), plus entries in `HTML_LANG`, `LOCALE_NAMES` and `LOCALE_SHORT`.
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
| Storeys per block | **39** | ✅ Confirmed by management, and matches public listings. The earlier 38 was a typo. |
| Rooftop | **Level 40** | ✅ Open rooftop venue space above the residential storeys — tracked as `BUILDING.rooftopLevel`, separate from `floors`, and listed as a facility. |
| Units per block | *not shown* | Listings say 526 (A) and 492 (B), total 1,018. Blank until verified. |
| Address | 18, Jalan Reko, Taman Sri Reko, **43000** Kajang | ✅ Corroborated by EdgeProp, Ziba Property and the registered addresses of the podium outlets. |
| Distances | 500 m to UKM Komuter, etc. | From listings — see `TRANSPORT`. |
| Facilities | full list | See `FACILITIES` — remove anything the building lacks. |
| Unit layouts | studio / 2-bed / 3-bed, 501–1,000 sq ft | See `UNIT_TYPES`. |
| Security features | guarded, CCTV, card access, visitor registration | See `SECURITY`. Setting a flag to `false` removes the claim from the page *and* the structured data. |

### Still to do

- [ ] **Replace the hero photo** — unwatermarked, bus-free, ~2400 px wide (above)
- [ ] **Compress `logo.png`** — 305 KB is ~10× larger than needed
- [ ] **Lot numbers** for the 10 management-confirmed outlets, plus 99 Speedmart
      and KK Mart — `src/data/tenants.ts`
- [ ] **Outlet logos** in `public/images/shops/` (optional; empty circles until then)
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
- [ ] **Proofread** `src/i18n/zh.ts` (Chinese) and `src/i18n/ta.ts` (Tamil) with
      native speakers
- [ ] **Describe the rooftop properly** — Level 40 is currently described only as
      "an open rooftop venue space". If it has a name, a booking process or any
      fit-out, that is worth a sentence; if it is not open to residents at all,
      remove `rooftopVenue` from `FACILITIES` so the page stops implying it is.

Done: ✅ Airbnb search link (`SOCIAL.airbnbSearch`) — trimmed to the stable
`/s/Vista-Bangi-Service-Apartment--Kajang--Selangor/homes` form, dropping the
`place_id`, `location_bb` and `acp_id` session parameters from the original.

---

## Deployment

`.github/workflows/deploy.yml` builds on every push to `master` (and `main`) and
publishes to GitHub Pages. No secrets or tokens needed.

Pages is already configured — Source: **GitHub Actions**, custom domain
`vistabangi.com`, and the DNS A record plus the `www` CNAME are live. Two things
remain:

1. **Tick "Enforce HTTPS"** in Settings → Pages once the certificate is issued.
   The site is currently reachable over plain `http://`.
2. **Consider the three remaining A records.** Only `185.199.108.153` is set; the
   others give redundancy if one of GitHub's edge nodes is unavailable:
   ```
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   Optionally the AAAA records for IPv6:
   ```
   2606:50c0:8000::153   2606:50c0:8002::153
   2606:50c0:8001::153   2606:50c0:8003::153
   ```

`public/CNAME` contains `vistabangi.com`, so the domain survives every redeploy —
GitHub Pages otherwise clears it.

> Note: the wildcard `*.vistabangi.com` CNAME to `se.llyf.in` is proxied through
> Cloudflare and unrelated to Pages. Leave it if something else depends on it,
> but be aware it will catch any subdomain you have not explicitly defined.

---

## Design and correctness notes

- **Claims are data-driven.** Security features, contact channels, the Airbnb
  link, the map pin and the brand images are all gated on their values in
  `src/data/`. Unset or `false` means the claim is *removed from the page and the
  structured data* — never rendered as an empty field or a broken link.
- **Type-enforced translations.** `Dict` uses `Record<TenantCategory, string>`
  and `Record<FacilityKey, string>`, so adding an outlet category or facility is
  a compile error until all four languages have a label. No silent fallbacks.
- **Per-script typography.** Cormorant and Inter carry no Tamil or CJK glyphs, so
  `:lang(ta)` and `:lang(zh)` rules in `global.css` swap in matching families
  rather than letting the browser choose.
- **SEO.** Per-locale canonical plus a full `hreflang` set with `x-default`,
  `ApartmentComplex` JSON-LD with `PostalAddress`, and a locale-aware sitemap.
