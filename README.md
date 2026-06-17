# Avala Home Concept

Marketing site for **Avala Home Concept** — a gated complex of family houses on Mount Avala, 20 minutes from Belgrade.

## Stack

- **Next.js 15** (App Router) — statically exported (`output: 'export'`)
- **React 18**, **Tailwind CSS**
- **react-icons**, **MapLibre GL** (location map), **EmailJS** (contact form)
- Multilingual: **sr** (default), **en**, **ru**, **de**

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /sr
npm run build    # static export to ./out
npm run start    # serve the production build
```

## Project structure

```
src/
  app/
    [locale]/        # all localized routes (home, about-us, gallery, project1/2, small-houses, contact, thank-you)
    layout.jsx       # root <html>/<body>, fonts, global providers
    page.jsx         # "/" → client redirect by browser language (fallback: sr)
    sitemap.js       # generated sitemap.xml (routes × locales + hreflang)
    robots.js        # generated robots.txt
  components/        # UI components (Navigation, Slider, Showcase, …)
  i18n/
    config.js        # locales, helpers, hreflang alternates
    getDictionary.js # server-side dictionary loader
    I18nProvider.jsx # client context: useI18n() → { t, dict, locale, href }
    dictionaries/    # sr.json, en.json, ru.json, de.json (all UI copy)
  lib/               # data modules (projects, gallery, specifications) — images/values only
  assets/            # all images, organized by area (brand, gallery, partners, projects, slider, showcase)
public/              # favicons, manifest, _headers, brochure
```

## Internationalization

All user-facing copy lives in `src/i18n/dictionaries/*.json`. When adding or
changing text, update **all four** locale files and keep keys in parity.
Use `useI18n()` in client components and `getDictionary(locale)` in server
components/metadata. Build internal links with the `href()` / `withLocale()`
helpers so they stay locale-prefixed.

## Deployment

Static export — `npm run build` emits `./out`, deployable to any static host
(Netlify, Cloudflare Pages, S3, …). Caching/headers are configured in
`public/_headers`.
