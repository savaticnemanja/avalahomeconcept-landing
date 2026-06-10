# Avala Home Concept — Zadaci za implementaciju

Izvor: `specifikacija-avalahomeconcept.pdf` (Verzija 1.0, 2026)

**Tech stack:** Next.js 15 (App Router, static export) + Tailwind CSS v4
**Ukupno izmena:** 12 stavki iz specifikacije + 1 tehnološka migracija.
Navigaciona struktura ide sa 7 na 4 strane.

---

## Prioritet: VISOK

### 4.1 — CTA dugme ispod sekcije Dinamika placanja

**Fajl:** `src/app/page.jsx` (Homepage)

Trenutno stanje: CTA dugme postoji samo u navigaciji.

Sta uraditi:
- Dodati novo CTA dugme neposredno ispod `<PaymentDynamic />` komponente
- Dugme vodi na `/contact`
- Dugme u navigaciji se NE menja
- Koristiti klasu `btn-primary` iz design systema

---

### 4.2 — Hero sekcija sa benefitima — Redizajn

**Fajl:** `src/components/Showcase/Showcase.jsx`

Ova sekcija prikazuje vizual kompleksa sa listom benefita sa desne strane. Zahteva vizuelno unapredjenje.

Sta uraditi:
- Promeniti layout u dva stupca (slika levo 3/4 portrait, benefiti desno)
- Dodati ikonice uz svaki benefit — koristiti SVG iz `src/assets/icons/`
- Dodati `overline` label i H2 naslov sa italic akcentom iznad liste
- Unaprediti tipografiju benefita (font-heading za nazive)
- Dugme voditi ka `/contact` (Specifikacije vise nisu zasebna stranica)

---

### 4.5 — Ivory paleta boja i fontovi — Kompletan redizajn

**Fajl:** `src/app/globals.css` (jedini CSS fajl)

Sve konkretne specifikacije su u sekciji **"Dizajn smernice"** na dnu dokumenta.

Sta uraditi:
1. Kreirati `src/app/globals.css` sa `@import "tailwindcss"` i kompletnim `@theme {}` blokom
2. Ucitati fontove kroz `next/font/google` u `src/app/layout.jsx`
3. Kreirati `@layer base` i `@layer components` sa svim UI klasama
4. **Napomena:** Pre implementacije pripremiti vizuelni preview i dobiti odobrenje klijenta

---

### 4.8 — Spajanje stranica: O nama + O investitoru

**Fajlovi:**
- `src/app/about-us/page.jsx` (zadrzati kao osnova)
- `src/app/layout.jsx` (navigacija — ukloniti link O investitoru)

Sta uraditi:
- Sadrzaj O investitoru dodati kao drugu sekciju unutar `about-us/page.jsx`
- Naziv stranice ostaje "O nama" (ruta `/about-us`)
- Link "O investitoru" se uklanja iz navigacije
- Stranica `/about-investor` se ne kreira u novoj strukturi

---

### 4.9 — Spajanje stranica: Galerija + Napredak radova

**Fajlovi:**
- `src/app/gallery/page.jsx` (zadrzati kao osnova)
- `src/app/layout.jsx` (navigacija — ukloniti link Napredak radova)

Sta uraditi:
- Dodati tab sistem unutar `gallery/page.jsx` ("Galerija" | "Napredak radova")
- Sadrzaj YouTube videa iz WorkProgress integrisati kao drugi tab
- Ruta `/work-progress` se ne kreira u novoj strukturi
- Tabovi moraju raditi na mobilnim uredjajima

---

### 4.12 — Zamena slika na pocetnoj stranici

**Fajl:** `src/app/page.jsx`, `src/assets/`

Sta uraditi:
- Zameniti sve slike na pocetnoj novim materijalima koje dostavlja klijent
- Priprema: kompresija u `.webp`, max 200KB po slici
- Koristiti `<Image priority />` za hero, `<Image />` (lazy, default) za sve ostalo
- **Napomena:** Klijent dostavlja slike u visokoj rezoluciji

---

## Prioritet: SREDNJI

### 4.3 — CTA ispod WSL videa (prvog videa)

**Fajl:** `src/app/page.jsx`

WSL video je prvi video element na pocetnoj strani, odmah posle Slider-a.

Sta uraditi:
- Dodati CTA blok odmah ispod prvog video elementa
- Sadrzaj: kratak tekst + `btn-ghost` dugme ka `/contact`
- Tekst: "Zainteresovani za kompleks? Zatrazite ponudu danas."

---

### 4.4 — Tabela projekata — Redizajn u slajder

**Fajl:** `src/components/ProjectShowcase/ProjectShowcase.jsx`

Trenutno stanje: dve tabele sa prostorij ama, bez naslova.

Sta uraditi:
1. Zameniti tabele sa horizontalnim slajderom kartica (CSS scroll snap, bez biblioteke)
2. Dodati naslov sekcije sa `overline` labelom iznad
3. Svaka kartica: naziv projekta, ukupna povrsina, kljucne sobe, CTA dugme
4. Detalji prostorija ostaju dostupni na `/project1` i `/project2` stranicama
5. Mobile: swipe podrska, scrollbar stilizovan u accent boji

---

### 4.6 — Dinamika placanja — Izmena teksta i unapredjenje dizajna

**Fajl:** `src/components/PaymentDynamic/PaymentDynamic.jsx`

Sta uraditi:
- Dodati veliku numeraciju (01, 02, 03) u accent boji uz svaki korak
- Dodati SVG ikonicu uz svaki korak (iz `src/assets/icons/`)
- Vizuelno razdvojiti korake — vertikalni connector na desktopu
- Azurirati tekst cim klijent dostavi novi sadrzaj

---

### 4.7 — FAQ sekcija — Dodavanje pri dnu pocetne strane

**Fajl:** `src/app/page.jsx` + novi `src/components/FAQ/FAQ.jsx`

Sta uraditi:
- Kreirati accordion komponentu sa `'use client'` direktivom
- Pozicionirati je pri dnu pocetne strane, iznad Contact sekcije
- Format: klik otvara/zatvara odgovor (+ postaje x pri otvaranju)
- 6-10 pitanja; klijent dostavlja finalni sadrzaj

Placeholder sadrzaj:
1. Kada je planiran zavrsetak izgradnje?
2. Da li je moguce finansiranje putem kredita?
3. Sta je ukljuceno u cenu kuce?
4. Da li postoji mogucnost prilagodjavanja enterijera?
5. Kako izgleda proces kupovine?
6. Koje su mogucnosti placanja?

---

### 4.10 — Specifikacije — Premestanje iz navigacije u pocetnu stranu

**Fajlovi:**
- `src/app/layout.jsx` (ukloniti link iz navigacije)
- `src/app/page.jsx` (dodati sekciju)

Sta uraditi:
- Integrisati 12 feature kartica iz Specifications kao sekciju na pocetnoj
- Pozicionirati posle ProjectShowcase, pre PaymentDynamic
- Preporucena pozadina: `bg-bg-dark` (tamna impact sekcija)
- Stranica `/specifications` se ne kreira u novoj Next.js strukturi

---

### 4.11 — Unos novih slika u Galeriju

**Fajl:** `src/app/gallery/page.jsx`, `src/assets/gallery/`

Sta uraditi:
- Primiti do 30 novih slika od klijenta
- Konvertovati u `.webp` (max 200KB): `cwebp -q 82 slika.jpg -o slika.webp`
- Dodati u `src/assets/gallery/` sa imenima `gallery-30.webp`, `gallery-31.webp`...
- Dodati u constants/data fajl koji galerija koristi
- **Napomena:** Raditi nakon sto se Galerija i Napredak radova spoje (stavka 4.9)

---

## Finalna navigaciona struktura (cilj)

```
Pre (Vite):                   Posle (Next.js):
- Pocetna          ok         - / (Pocetna)
- O nama           ok         - /about-us (O nama + O investitoru unutar)
- Ponuda kuca      ok         - Ponuda kuca (dropdown — ostaje)
- Specifikacije    uklanja    => Integrisano u pocetnu stranicu
- O investitoru    uklanja    => Integrisano u /about-us
- Galerija         ok         - /gallery (+ Napredak radova tab unutar)
- Napredak radova  uklanja    => Integrisano u /gallery
- Kontakt          ok         - /contact
```

Broj stranica: 7 → 4 **(Pocetna, O nama, Galerija, Kontakt)**

---

## Redosled implementacije

0. **Migracija** — Next.js 15 + Tailwind v4 (pre bilo cega drugog)
1. **4.5** — Tailwind @theme i design system (`globals.css`, `layout.jsx`)
2. **4.8 + 4.9 + 4.10** — Strukturalne izmene navigacije i spajanje stranica
3. **4.2** — Showcase redizajn sa benefitima
4. **4.4** — ProjectShowcase slider
5. **4.6** — PaymentDynamic ikone i numeracija
6. **4.1** — CTA ispod PaymentDynamic
7. **4.3** — CTA ispod WSL videa
8. **4.7** — FAQ accordion
9. **4.12** — Zamena slika (ceka klijenta)
10. **4.11** — Nove slike u galeriji (ceka klijenta)

---

## Napomene

- Paleta boja i fontovi moraju biti odobreni od klijenta pre implementacije
- Stavke 4.11 i 4.12 cekaju materijal od klijenta
- Klijent dostavlja tekst za FAQ i PaymentDynamic
- Svaka stavka treba preview/mockup pre finalne implementacije

---

## Plan implementacije

Detaljna, korak-po-korak procedura. Pratiti redosled — svaka faza zavisi od prethodne.

---

### FAZA 0 — Next.js 15 + Tailwind CSS v4 Migracija

**Cilj:** Prebaciti ceo projekat na novi stack pre nego sto se bilo sta drugo dira.
Stack koji dolazi: **Next.js 15 App Router** + **Tailwind CSS v4** + **static export**.

---

#### Korak 0.1 — Napraviti novi Next.js projekat

```bash
# U RODITELJSKOM direktorijumu (ne unutar projekta)
npx create-next-app@latest avala-home-concept-landing-v2 \
  --js --src-dir --app --no-turbopack --import-alias "@/*"
```

Odabrati "No" za Tailwind tokom setup-a — instaliramo v4 rucno.

Prekopirati assets:
```bash
cp -r avala-home-concept-landing/src/assets avala-home-concept-landing-v2/src/
```

#### Korak 0.2 — Instalirati Tailwind CSS v4

```bash
cd avala-home-concept-landing-v2
npm install tailwindcss @tailwindcss/postcss
```

Kreirati `postcss.config.mjs`:
```js
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

U `src/app/globals.css` — samo ovo na vrhu (bez stare Vite konfiguracije):
```css
@import "tailwindcss";
```

#### Korak 0.3 — Konfigurisati next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // static HTML u out/ direktorijum
  images: {
    unoptimized: true,     // jer koristimo static export (bez Next.js servera)
  },
  trailingSlash: true,     // generise index.html za svaku rutu
};

export default nextConfig;
```

> **Napomena o slikama:** `unoptimized: true` je potreban za static export.
> `next/image` i dalje pruza lazy loading i layout podrsku — samo automatska WebP konverzija ne radi u static modu. Slike treba vec biti u `.webp` formatu.

#### Korak 0.4 — Kreirati App Router strukturu

```
src/app/
  layout.jsx          ← root layout (Navigation, Footer, Toasts)
  page.jsx            ← Homepage
  about-us/
    page.jsx          ← AboutUs + AboutInvestor
  project1/
    page.jsx
  project2/
    page.jsx
  small-houses/
    page.jsx
  gallery/
    page.jsx          ← Gallery + WorkProgress tabs
  contact/
    page.jsx
  thank-you/
    page.jsx
  globals.css         ← jedini CSS fajl (Tailwind @theme)
```

**Stranice koje se NE kreiraju** (sadrzaj integrisan drugde):
- `/specifications` → sekcija na pocetnoj
- `/about-investor` → sekcija unutar `/about-us`
- `/work-progress` → tab unutar `/gallery`

#### Korak 0.5 — Migrirati komponente

Redosled migracije komponenti:

**1. Konvertovati data/constants fajlove** (ne menjaju JSX, cist JS):
- `src/pages/Specifications/constants.js` → `src/lib/specifications.js`
- `src/pages/Gallery/constants.js` → `src/lib/gallery.js`
- `src/components/Slider/constants.js` → `src/lib/slider.js`
- `src/projects.js` → `src/lib/projects.js`

**2. Konvertovati svaku komponentu** — principi:
- Dodati `'use client'` samo ako koristi `useState`, `useEffect`, event handlere
- Zameniti `<Link to="...">` sa `<Link href="...">` (next/link)
- Zameniti `<img src={importedAsset}>` sa `<Image src={importedAsset} alt="..." width={} height={} />`
- Ukloniti `react-router-dom` importove
- Ukloniti `react-helmet-async` importove (zamena: Metadata API u page.jsx)
- SCSS importove ukloniti — klase ce biti Tailwind

**Server vs Client komponente:**

| Komponenta          | Direktiva     | Razlog                           |
|---------------------|---------------|----------------------------------|
| Navigation          | `'use client'`| scroll state, mobile menu state  |
| Slider              | `'use client'`| slideshow interval, useState     |
| VideoThumbnail      | `'use client'`| onClick handler                  |
| VideoLightbox       | `'use client'`| video ref, keydown listener      |
| Lightbox            | `'use client'`| activeIndex state                |
| FAQ                 | `'use client'`| open/close accordion state       |
| Gallery (tabs)      | `'use client'`| activeTab state                  |
| Contact forma       | `'use client'`| form state, emailjs              |
| Showcase            | Server        | staticni sadrzaj                 |
| PaymentDynamic      | Server        | staticni sadrzaj                 |
| ProjectShowcase     | Server        | staticni sadrzaj (slider je CSS) |
| Partners            | Server        | staticni sadrzaj                 |
| Footer              | Server        | staticni sadrzaj                 |
| Location            | Server        | staticni sadrzaj                 |

**3. Root layout.jsx** — navigacija, footer, fontovi, toasts:

```jsx
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { ToastProvider } from '@/components/ToastProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="sr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ToastProvider>
          <Navigation />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
```

`ToastProvider` mora biti `'use client'` wrapper oko `<ToastContainer />`.

**4. Metadata API** umesto react-helmet (u svakom `page.jsx`):

```jsx
// src/app/page.jsx
export const metadata = {
  title: 'Avala Home Concept',
  description: 'Plac, kuca, bazen, uredjeno dvoriste — 20 minuta od Beograda...',
  openGraph: {
    title: 'Avala Home Concept',
    description: '...',
    url: 'https://avalahomeconcept.com',
    images: [{ url: '/og-image.jpg' }],
  },
};

export default function HomePage() { ... }
```

**5. Slike — migracija na next/image:**

```jsx
import Image from 'next/image';
import showcaseImg from '@/assets/showcase/showcase-1.webp';

// Staticne dimenzije
<Image src={showcaseImg} alt="..." width={640} height={480} className="object-cover" />

// Fill kontejner (za fluid layout)
<div className="relative aspect-[4/3]">
  <Image src={img} alt="..." fill className="object-cover rounded-[4px]" />
</div>

// Hero (above the fold — eager load)
<Image src={heroImg} alt="..." fill className="object-cover" priority />
```

#### Korak 0.6 — Instalirati potrebne pakete

```bash
npm install react-icons react-toastify @emailjs/browser
```

`react-helmet-async` i `react-router-dom` se NE instaliraju.

#### Korak 0.7 — Proveriti build

```bash
npm run build
```

Mora proci bez gresaka. `out/` direktorijum sadrzi staticki sajt.
Proveriti lokalno:
```bash
npx serve out/
```

---

### FAZA 1 — Design system: Tailwind @theme i globals.css (stavka 4.5)

**Cilj:** Uspostaviti vizuelni jezik pre bilo kojih komponentnih izmena.

#### Korak 1.1 — Kompletni globals.css

Zameniti `src/app/globals.css` kompletnim sadrzajem:

```css
@import "tailwindcss";

/* ─── Design tokens ─────────────────────────────────────────── */
@theme {
  /* Pozadine */
  --color-bg:           #F7F3EC;
  --color-bg-alt:       #FFFFFF;
  --color-bg-dark:      #1A1915;
  --color-bg-mid:       #2C2B27;

  /* Tekst */
  --color-text:         #1A1915;
  --color-text-muted:   #6B645A;
  --color-text-light:   #F7F3EC;

  /* Akcent */
  --color-accent:       #C4975A;
  --color-accent-hover: #A87C3E;

  /* Borderi */
  --color-border:       #E3DBCE;
  --color-border-dark:  #3A3831;

  /* Fontovi — CSS varijable iz next/font/google */
  --font-heading: var(--font-heading);
  --font-body:    var(--font-body);
}

/* ─── Base stilovi ──────────────────────────────────────────── */
@layer base {
  body {
    @apply bg-bg text-text font-body font-light antialiased leading-relaxed;
  }

  h1, h2, h3, h4 {
    @apply font-heading font-normal leading-tight text-text;
  }

  em {
    font-style: italic;
    font-weight: 400;
  }
}

/* ─── UI komponente ─────────────────────────────────────────── */
@layer components {

  /* Container */
  .safe-zone {
    @apply max-w-[1290px] mx-auto px-6;
  }

  /* Overline label */
  .overline {
    @apply block font-body text-[0.72rem] font-medium
           tracking-[0.18em] uppercase text-accent mb-2.5;
  }

  /* Dekorativna zlatna linija */
  .overline-bar {
    @apply block w-9 h-px bg-accent mb-4;
  }

  /* Logika smenjivanja sekcija pocetne strane:
     Slider/Hero      bg-bg-dark   (tamna)
     Video + CTA      bg-bg        (ivory)
     Showcase         bg-bg-alt    (belo)
     ProjectShowcase  bg-bg        (ivory)
     Specifikacije    bg-bg-dark   (tamna — impact)
     PaymentDynamic   bg-bg        (ivory)
     FAQ              bg-bg-alt    (belo)
     Contact          bg-bg-dark   (tamna)
     Partners         bg-bg        (ivory)
     Footer           bg-bg-mid    (tamna srednja)
  */

  /* ─── Buttons ────────────────────────────────────────────── */

  /* Primarno — zlatna pozadina, belo slovo */
  .btn-primary {
    @apply inline-flex items-center gap-2.5 rounded-sm bg-accent text-white
           font-body text-[0.82rem] font-medium tracking-[0.12em] uppercase
           px-[34px] py-[13px] no-underline cursor-pointer border-none
           transition-all duration-200
           hover:bg-accent-hover hover:-translate-y-px;
  }

  /* Ghost — providan sa zlatnim borderom */
  .btn-ghost {
    @apply inline-flex items-center gap-2.5 rounded-sm bg-transparent text-accent
           border border-accent font-body text-[0.82rem] font-medium
           tracking-[0.12em] uppercase px-[34px] py-3 no-underline cursor-pointer
           transition-all duration-200
           hover:bg-accent hover:text-white;
  }

  /* Outline light — za tamne sekcije */
  .btn-outline-light {
    @apply inline-flex items-center gap-2.5 rounded-sm bg-transparent text-text-light
           border border-text-light/45 font-body text-[0.82rem] font-medium
           tracking-[0.12em] uppercase px-[34px] py-3 no-underline cursor-pointer
           transition-all duration-200
           hover:border-text-light hover:bg-text-light/10;
  }

  /* Arrow unutar dugmeta — pomera se desno na hover */
  .btn-arrow {
    @apply inline-block transition-transform duration-200;
  }

  /* Dodati group na roditelju i group-hover ce pokrenuti arrow */
  .group:hover .btn-arrow {
    @apply translate-x-1;
  }

  /* ─── Kartice ────────────────────────────────────────────── */
  .card {
    @apply bg-bg-alt border border-border rounded-[4px] overflow-hidden
           shadow-[0_2px_20px_rgba(26,25,21,0.05)]
           transition-all duration-300
           hover:shadow-[0_8px_40px_rgba(26,25,21,0.11)]
           hover:-translate-y-[3px];
  }

  /* ─── Tabs (Gallery) ─────────────────────────────────────── */
  .tab {
    @apply font-body text-sm font-medium tracking-[0.1em] uppercase
           pb-3 px-1 border-b-2 border-transparent text-text-muted
           cursor-pointer transition-colors duration-200
           hover:text-text hover:border-accent/50;
  }

  .tab-active {
    @apply tab text-text border-accent;
  }

  /* ─── Accordion / FAQ ────────────────────────────────────── */
  .accordion-item {
    @apply border-b border-border first:border-t;
  }

  .accordion-trigger {
    @apply flex justify-between items-center w-full py-[22px]
           font-heading text-[1.15rem] font-normal text-left
           bg-transparent border-none cursor-pointer text-text;
  }

  .accordion-icon {
    @apply text-accent text-[1.4rem] font-light flex-shrink-0
           transition-transform duration-200;
  }

  .accordion-icon-open {
    @apply accordion-icon rotate-45;
  }

  .accordion-content {
    @apply font-body text-[0.95rem] leading-[1.75] text-text-muted
           pb-[22px] font-light;
  }

  /* ─── Section separator ──────────────────────────────────── */
  .section-divider {
    @apply w-full h-px bg-border border-none;
  }

}
```

#### Korak 1.2 — Vizuelna provera

Pokrenuti `npm run dev` i proveriti da:
- Pozadina je ivory (#F7F3EC) — ne bela i ne siva
- Fontovi su ucitani (Cormorant + DM Sans vidljivi u DevTools Network tab)
- Nema gresaka u konzoli

Ovo je checkpoint — sve mora biti okej pre nastavka na Fazu 2.

---

### FAZA 2 — Strukturalne izmene navigacije (stavke 4.8, 4.9, 4.10)

**Cilj:** Smanjiti broj stranica. Uraditi SVE tri stavke zajedno — sve diraju navigaciju.

#### Korak 2.1 — Ažurirati Navigation komponentu

Navigacija u Next.js App Router mora biti `'use client'` (scroll state, mobile menu).
Koristiti `usePathname()` iz `next/navigation` za aktivni link.

```jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
```

`navLinks` niz — finalna verzija (bez Specifikacija, O investitoru, Napredak radova):

```js
const navLinks = [
  { path: '/', label: 'Pocetna' },
  { path: '/about-us', label: 'O nama' },
  {
    label: 'Ponuda kuca',
    subLinks: [
      { path: '/project1', label: 'Projekat 1' },
      { path: '/project2', label: 'Projekat 2' },
      { path: '/small-houses', label: 'Kuce 80-100m2' },
    ],
  },
  { path: '/gallery', label: 'Galerija' },
  { path: '/contact', label: 'Kontakt' },
];
```

Scroll transparentnost (dodati u Navigation):
```jsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const fn = () => setScrolled(window.scrollY > 60);
  window.addEventListener('scroll', fn, { passive: true });
  return () => window.removeEventListener('scroll', fn);
}, []);

// Na <nav> elementu:
className={[
  'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
  scrolled
    ? 'bg-bg/95 backdrop-blur-md shadow-[0_1px_0_theme(colors.border)]'
    : 'bg-transparent'
].join(' ')}
```

Nav linkovi — Tailwind klase:
- Svetli tekst na transparent: `text-text-light`
- Tamni tekst na scrolled: `text-text` (dodati scrolled prop ili uslovnu klasu)
- Hover underline animacija:
  ```
  relative
  after:absolute after:bottom-[-3px] after:left-0
  after:h-px after:w-0 after:bg-accent after:content-['']
  after:transition-[width] after:duration-200
  hover:after:w-full
  ```

CTA dugme u navigaciji: `btn-primary` klasa.

#### Korak 2.2 — Spajanje O nama + O investitoru

`src/app/about-us/page.jsx` struktura:

```jsx
export const metadata = {
  title: 'O nama — Avala Home Concept',
  description: '...',
};

export default function AboutUsPage() {
  return (
    <main>

      {/* Sekcija 1: O nama */}
      <section className="py-24 bg-bg">
        <div className="safe-zone max-w-3xl">
          <span className="overline">Ko smo mi</span>
          <h1 className="font-heading text-[clamp(2rem,4vw,3.5rem)] mb-8">
            O nama
          </h1>
          {/* postojeci paragrafi */}
        </div>
      </section>

      <hr className="section-divider" />

      {/* Sekcija 2: O investitoru */}
      <section className="py-24 bg-bg-alt">
        <div className="safe-zone">
          <span className="overline">Iza projekta</span>
          <h2 className="font-heading text-[clamp(1.8rem,3vw,3rem)] mb-6">
            O investitoru
          </h2>
          <p className="text-text-muted mb-12 max-w-2xl">
            {/* tekst o porodici Ciric */}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* InvestorCard kartice */}
          </div>
        </div>
      </section>

    </main>
  );
}
```

#### Korak 2.3 — Spajanje Galerija + Napredak radova

`src/app/gallery/page.jsx` (stranica je Server Component, tab logika u Client komponenti):

```jsx
// Kreirati src/components/Gallery/GalleryView.jsx ('use client')
'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';

const videoUrls = [
  'https://www.youtube.com/embed/APZNvEz0K1U?si=_huoHPFO_dfWY0o1',
  // ... ostali
];

export const GalleryView = ({ images }) => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div>
      {/* Tab navigacija */}
      <div className="flex gap-8 mb-12">
        <button
          onClick={() => setActiveTab('gallery')}
          className={activeTab === 'gallery' ? 'tab-active' : 'tab'}
        >
          Galerija
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={activeTab === 'progress' ? 'tab-active' : 'tab'}
        >
          Napredak radova
        </button>
      </div>

      {/* Galerija grid */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-[4px]"
              onClick={() => setActiveIndex(i)}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      )}

      {/* YouTube grid */}
      {activeTab === 'progress' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoUrls.map((url, i) => (
            <div key={i} className="relative aspect-video">
              <iframe src={url} className="w-full h-full rounded-[4px]"
                allowFullScreen title={`Napredak radova ${i + 1}`} />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {/* ... */}
    </div>
  );
};
```

#### Korak 2.4 — Integrisati Specifikacije u pocetnu stranu

U `src/app/page.jsx`, uvesti `specifications` niz iz `src/lib/specifications.js` i dodati sekciju:

```jsx
import { specifications } from '@/lib/specifications';

// U JSX, posle <ProjectShowcase /> a pre <PaymentDynamic />:
<section className="py-24 bg-bg-dark">
  <div className="safe-zone">
    <span className="overline">Kvalitet gradnje</span>
    <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] text-text-light mb-16">
      Specifikacije gradnje
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {specifications.map((item, i) => (
        <div key={i} className="flex flex-col items-start gap-3">
          <Image src={item.icon} alt="" width={32} height={32}
                 className="opacity-80 invert" />
          <h4 className="font-heading text-xl text-text-light">{item.title}</h4>
          <p className="font-body text-sm text-text-light/60 font-light">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

`invert` Tailwind klasa cini SVG ikonice belim na tamnoj pozadini.

#### Korak 2.5 — Checkpoint

- [ ] `/about-us` prikazuje obe sekcije
- [ ] `/gallery` ima funkcionalne tabove, oba sadrzaja vidljiva
- [ ] `/specifications`, `/about-investor`, `/work-progress` — Next.js vraca 404 (nema stranica)
- [ ] Navigacija — 5 stavki + CTA dugme
- [ ] Pocetna sadrzi Specifikacije sekciju

---

### FAZA 3 — Homepage komponente

#### 3A — PaymentDynamic redizajn (stavka 4.6)

```jsx
// src/components/PaymentDynamic/PaymentDynamic.jsx
// Server component — nema interakcije

const steps = [
  { number: '01', amount: '5000EUR', description: 'Rezervacija', icon: keyIcon },
  { number: '02', amount: '30%',     description: 'Prilikom overe ugovora', icon: constructionIcon },
  { number: '03', amount: '70%',     description: '4 rate po zavrseku svake faze', icon: openDoorIcon },
];

export const PaymentDynamic = () => (
  <section className="py-24 bg-bg">
    <div className="safe-zone">
      <span className="overline">Kako kupiti</span>
      <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] mb-16">
        Dinamika placanja
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-4">
            <span className="font-heading text-6xl text-accent/30 font-normal leading-none">
              {step.number}
            </span>
            <Image src={step.icon} alt="" width={28} height={28} />
            <h3 className="font-heading text-3xl">{step.amount}</h3>
            <p className="text-text-muted text-sm font-light">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
```

#### 3B — CTA ispod PaymentDynamic (stavka 4.1)

Odmah posle `<PaymentDynamic />` u `page.jsx`:
```jsx
<div className="py-8 bg-bg flex justify-center">
  <Link href="/contact" className="btn-primary group">
    Zatrazi ponudu <span className="btn-arrow">→</span>
  </Link>
</div>
```

#### 3C — CTA ispod WSL videa (stavka 4.3)

Odmah posle prvog video elementa u `page.jsx`:
```jsx
<div className="py-16 bg-bg flex flex-col items-center gap-6 text-center">
  <p className="font-heading text-2xl text-text-muted italic">
    Zainteresovani za kompleks?
  </p>
  <Link href="/contact" className="btn-ghost group">
    Zatrazi ponudu <span className="btn-arrow">→</span>
  </Link>
</div>
```

#### 3D — Showcase redizajn sa benefitima (stavka 4.2)

```jsx
// src/components/Showcase/Showcase.jsx
// Server component

import Image from 'next/image';
import Link from 'next/link';
import { showcase1 } from '@/assets';
import * as Icons from '@/assets/icons';

const benefits = [
  { title: 'Zatvoren kompleks',             icon: Icons.key },
  { title: 'Moderna i Mediteranska arhitektura', icon: Icons.bricks },
  { title: 'Brza konekcija na autoput',     icon: Icons.construction },
  { title: 'Cvrsta gradnja',                icon: Icons.brickwall },
  { title: 'Visok nivo zavrsnih materijala', icon: Icons.wall },
  { title: 'Parking mesto',                 icon: Icons.cube },
  { title: 'Rampa na ulasku/izlasku',       icon: Icons.openDoor },
  { title: 'Najlepsa lokacija sa pogledom', icon: Icons.lawnMower },
];

export const Showcase = () => (
  <section className="py-24 bg-bg-alt">
    <div className="safe-zone">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Slika */}
        <div className="relative aspect-[3/4] rounded-[4px] overflow-hidden">
          <Image
            src={showcase1}
            alt="Avala Home Concept — stambeni kompleks"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Sadrzaj */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="overline">Zasto Avala Home Concept</span>
            <div className="overline-bar" />
            <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)]">
              Vas dom. <em>Vasa priroda.</em>
            </h2>
          </div>

          <ul className="flex flex-col gap-5">
            {benefits.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <Image src={item.icon} alt="" width={22} height={22}
                       className="opacity-70 flex-shrink-0" />
                <span className="font-heading text-xl">{item.title}</span>
              </li>
            ))}
          </ul>

          <Link href="/contact" className="btn-primary group self-start">
            Zatrazi ponudu <span className="btn-arrow">→</span>
          </Link>
        </div>

      </div>
    </div>
  </section>
);
```

#### 3E — ProjectShowcase slider (stavka 4.4)

```jsx
// Server component — slider je cisti CSS scroll snap

const projects = [
  {
    title: 'Projekat 1',
    area: '139 m2',
    highlights: ['3 spavace sobe', 'Terasa 11m2', 'Tehnicka prostorija'],
    image: plan1,
    link: '/project1',
  },
  {
    title: 'Projekat 2',
    area: '147 m2',
    highlights: ['3 spavace sobe', 'Garderober 8m2', 'Terasa 18m2'],
    image: plan2,
    link: '/project2',
  },
  {
    title: 'Kuce 80-100m2',
    area: '80–100 m2',
    highlights: ['Kompaktno resenje', 'Mediteranski stil', 'Povoljnija cena'],
    image: smallHouseMain,
    link: '/small-houses',
  },
];

export const ProjectShowcase = () => (
  <section className="py-24 bg-bg overflow-hidden">
    <div className="safe-zone mb-12">
      <span className="overline">Ponuda kuca</span>
      <div className="overline-bar" />
      <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)]">
        Nasi projekti
      </h2>
    </div>

    {/* Scroll container — horizontalni slider */}
    <div className="px-6 max-w-[1290px] mx-auto">
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4
                      [scrollbar-width:thin]
                      [scrollbar-color:theme(colors.accent)_theme(colors.border)]">
        {projects.map((project, i) => (
          <div key={i}
               className="card snap-start flex-shrink-0 w-[320px] md:w-[360px]">
            <div className="relative aspect-[4/3]">
              <Image src={project.image} alt={project.title}
                     fill className="object-cover" />
            </div>
            <div className="p-6 flex flex-col gap-4">
              <span className="overline">{project.title}</span>
              <p className="font-heading text-4xl">{project.area}</p>
              <ul className="flex flex-col gap-1">
                {project.highlights.map((h, j) => (
                  <li key={j} className="text-sm text-text-muted font-light">— {h}</li>
                ))}
              </ul>
              <Link href={project.link} className="btn-ghost group mt-2 self-start">
                Detaljne specifikacije <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
```

#### 3F — FAQ sekcija (stavka 4.7)

```jsx
// src/components/FAQ/FAQ.jsx
'use client';
import { useState } from 'react';

const faqs = [
  { q: 'Kada je planiran zavrsetak izgradnje?', a: '// klijent dostavlja' },
  { q: 'Da li je moguce finansiranje putem kredita?', a: '// klijent dostavlja' },
  { q: 'Sta je ukljuceno u cenu kuce?', a: '// klijent dostavlja' },
  { q: 'Da li postoji mogucnost prilagodjavanja enterijera?', a: '// klijent dostavlja' },
  { q: 'Kako izgleda proces kupovine?', a: '// klijent dostavlja' },
  { q: 'Koje su mogucnosti placanja?', a: '// klijent dostavlja' },
];

export const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 bg-bg-alt">
      <div className="safe-zone max-w-3xl">
        <span className="overline">Imate pitanja?</span>
        <div className="overline-bar" />
        <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] mb-12">
          Cesto postavljana pitanja
        </h2>

        <div>
          {faqs.map((item, i) => (
            <div key={i} className="accordion-item">
              <button
                className="accordion-trigger"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {item.q}
                <span className={open === i ? 'accordion-icon-open' : 'accordion-icon'}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="accordion-content">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

Dodati `<FAQ />` u `src/app/page.jsx` pre `<Contact />`.

---

### FAZA 4 — Sadrzaj od klijenta (stavke 4.11, 4.12)

**4.12 — Nove slike za pocetnu:**
1. Kompresovati u `.webp`: `cwebp -q 82 slika.jpg -o slika.webp`
2. Zameniti fajlove u `src/assets/showcase/`, `src/assets/slider/`, `src/assets/plans/`
3. `alt` tekstovi ostaju isti ako je sadrzaj slican

**4.11 — Nove slike u galeriji:**
1. Max 200KB po slici u `.webp`
2. Dodati u `src/assets/gallery/` — naziv: `gallery-30.webp`, `gallery-31.webp`...
3. Dodati u `src/lib/gallery.js` niz

---

### FAZA 5 — QA i testiranje

**Desktop (svaka stranica):**
- [ ] Pocetna — scroll kroz sve sekcije, svi CTA linkovi rade
- [ ] O nama — obe sekcije vidljive, investor kartice ispravne
- [ ] Galerija — oba taba rade, Lightbox se otvara/zatvara
- [ ] Kontakt — forma se salje
- [ ] `/specifications`, `/about-investor`, `/work-progress` — 404 ili redirect
- [ ] Navigacija — transparentna iznad hero-a, ivory posle skrola

**Mobilna (375px i 768px):**
- [ ] Hamburger meni radi, zatvara se
- [ ] Slider projekata je swipeable
- [ ] FAQ accordion radi na touchu
- [ ] Showcase — vertikalni layout (slika gore, benefiti dole)

**Tipografija:**
- [ ] Cormorant Garamond ucitan (Network tab u DevTools)
- [ ] DM Sans ucitan
- [ ] Italic akcentovani naslovi korektno prikazani

**Boje:**
- [ ] Ivory pozadina globalno (ne bela, ne siva)
- [ ] Tamne sekcije imaju svetli tekst
- [ ] Nema starih boja (#f05a28 narandzasta, #186367 teal) nigde na sajtu:
  ```bash
  grep -r "f05a28\|186367\|ff6b45\|29454e" src/ --include="*.jsx" --include="*.css"
  ```

**Build:**
```bash
npm run build
# Proveriti velicinu bundle-a u terminalu
# Svaki page.js treba biti manji od 100KB
```

---

### Redosled commitova

```
chore: init next.js 15 + tailwind css v4
chore: migrate all components and pages to next.js
feat: design system — tailwind @theme, globals.css, component classes (4.5)
feat: transparent/scrolled navigation
feat: merge about-us + about-investor pages (4.8)
feat: merge gallery + work-progress with tabs (4.9)
feat: move specifications to homepage (4.10)
feat: payment-dynamic redesign with icons and numbering (4.6)
feat: cta below payment-dynamic (4.1)
feat: cta below wsl video (4.3)
feat: showcase redesign with benefits and icons (4.2)
feat: project-showcase slider with cards (4.4)
feat: faq accordion section (4.7)
content: new homepage images (4.12)
content: new gallery images (4.11)
```

---

## Dizajn smernice

> **Styling:** Tailwind CSS v4. Sve vrednosti ispod se definisu u `@theme {}` bloku u `globals.css`.

**Inspiracija:** urbanplaza.rs — premium restrained aesthetic, prestige bez kica.
**Adaptacija za Avala:** urbanplaza koristi tamnu/urbanu paletu. Mi koristimo inverziju — ivory kao primarna osnova, tamne sekcije kao akcent. Karakter: topla priroda, planina, mir — ne urbana hladnoca.

---

### Paleta boja (@theme tokeni)

| Token              | Hex       | Upotreba                              |
|--------------------|-----------|---------------------------------------|
| `--color-bg`       | `#F7F3EC` | Primarna ivory pozadina               |
| `--color-bg-alt`   | `#FFFFFF` | Bele sekcije i kartice               |
| `--color-bg-dark`  | `#1A1915` | Tamne impact sekcije, footer          |
| `--color-bg-mid`   | `#2C2B27` | Footer bg                             |
| `--color-text`     | `#1A1915` | Glavni tekst na svetlim sekcijama     |
| `--color-text-muted`| `#6B645A`| Sekundarni tekst, opisi, labele       |
| `--color-text-light`| `#F7F3EC`| Tekst na tamnim sekcijama             |
| `--color-accent`   | `#C4975A` | Zlatna — CTA, ikonice, dekoracije     |
| `--color-accent-hover`| `#A87C3E`| Hover stanje accent elementa        |
| `--color-border`   | `#E3DBCE` | Borderi na svetloj pozadini           |
| `--color-border-dark`| `#3A3831`| Borderi na tamnoj pozadini           |

Tailwind utilities koje se automatski generisu: `bg-bg`, `bg-bg-dark`, `bg-accent`,
`text-text`, `text-text-muted`, `text-accent`, `border-border`, itd.

---

### Tipografija

| Element       | Tailwind klase                                                      |
|---------------|---------------------------------------------------------------------|
| H1 (hero)     | `font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[1.05]` |
| H2 (sekcija)  | `font-heading text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight`    |
| H3            | `font-heading text-[clamp(1.4rem,2.5vw,2rem)] font-normal`                |
| Body          | `font-body text-base font-light leading-relaxed`                          |
| Muted tekst   | `font-body text-base font-light text-text-muted`                          |
| Overline label| klasa `.overline` (definisana u @layer components)                        |

**Kljucni stilski detalj — italic akcentovani naslovi:**
```jsx
<h1 className="font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[1.05]">
  Vas dom — <em>priroda kao komsija</em>
</h1>
<h2 className="font-heading ...">
  Zatvoren kompleks. <em>Otvoreni prostor.</em>
</h2>
```
`<em>` je globalno stilizovan u `@layer base` kao `font-style: italic; font-weight: 400`.

---

### Dugmad (tri varijante)

| Klasa               | Primena                                      |
|---------------------|----------------------------------------------|
| `.btn-primary`      | Zlatna pozadina — na ivory/belim sekcijama   |
| `.btn-ghost`        | Providan sa zlatnim borderom — ivory/belo    |
| `.btn-outline-light`| Providan sa svetlim borderom — tamne sekcije |

Arrow indicator: `<span className="btn-arrow">→</span>` unutar dugmeta.
Roditelj mora imati klasu `group` da hover arrow animacija radi.

---

### Slider projekata

CSS scroll snap bez JS biblioteke:
```jsx
// Kontejner
className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4
           [scrollbar-width:thin]
           [scrollbar-color:theme(colors.accent)_theme(colors.border)]"

// Svaka kartica
className="snap-start flex-shrink-0 w-[340px]"
```

---

### Slike — next/image

```jsx
// Fiksne dimenzije (kartice)
<Image src={img} alt="..." width={640} height={480} className="object-cover" />

// Fill (fluid kontejner)
<div className="relative aspect-[4/3]">
  <Image src={img} alt="..." fill className="object-cover" />
</div>

// Hero — eager load (jedino mesto sa priority)
<Image src={heroImg} alt="..." fill className="object-cover" priority />
```

---

### Navigacija

- Transparentna na vrhu stranice (iznad hero hero-a sa tamnom pozadinom)
- Prelazi u `bg-bg/95 backdrop-blur-md` posle 60px scroll-a
- Linkovi: `text-text-light` → `text-text` posle scroll-a
- Hover: underline animacija sa `after:` pseudo-elementom u accent boji

---

### Logika smenjivanja sekcija pocetne strane

```
Slider/Hero         bg-bg-dark    (tamna)
Video #1 + CTA      bg-bg         (ivory)
Showcase (benefiti) bg-bg-alt     (belo)
ProjectShowcase     bg-bg         (ivory)
Specifikacije       bg-bg-dark    (tamna — impact)
PaymentDynamic      bg-bg         (ivory)
FAQ                 bg-bg-alt     (belo)
Contact             bg-bg-dark    (tamna)
Partners            bg-bg         (ivory)
Footer              bg-bg-mid     (tamna srednja)
```

---

### Sta NE raditi (razlike od urbanplaza.rs)

- **Ne kopirati tamnu paletu** — Avala je ivory osnova, tamno je akcent ne default
- **Ne koristiti identican grid stanovi** — Avala prodaje kuce, ne stanove
- **Ne praviti gradijentne pozadine** — cisti blokovi boja
- **Ne dodavati previse animacija** — jedan suptilni hover per element
- **Ne koristiti Tailwind @apply za sve** — kompleksni one-off stilovi u `@layer components`, jednostavni direktno u JSX className
