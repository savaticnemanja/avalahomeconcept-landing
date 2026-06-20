import { getDictionary } from './getDictionary';
import { buildAlternates, SITE_URL, withLocale, hreflang, locales } from './config';
import { pick } from '@/lib/localize';

const OG_IMAGE = {
  '/': '/og/home.jpg',
  '/offer': '/og/offer.jpg',
  '/gallery': '/og/gallery.jpg',
  '/about-us': '/og/about.jpg',
  '/contact': '/og/contact.jpg',
  '/thank-you': '/og/home.jpg',
};

const OG_TITLE_MAX = 60;
const OG_DESC_MAX = 120;
const META_DESC_MAX = 160;

function clamp(str, max) {
  if (str.length <= max) return str;
  const cut = str.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return (space > max * 0.5 ? cut.slice(0, space) : cut).replace(/[\s.,;:—–-]+$/, '') + '…';
}

export async function buildPageMetadata({ locale, path, metaKey, robots }) {
  const dict = await getDictionary(locale);
  const m = dict.meta[metaKey];
  const url = `${SITE_URL}${withLocale(locale, path)}/`;
  const image = `${SITE_URL}${OG_IMAGE[path] ?? OG_IMAGE['/']}`;
  const fullTitle = path === '/' ? m.title : `${m.title} | ${dict.meta.siteName}`;
  const ogTitle = clamp(fullTitle, OG_TITLE_MAX);
  const ogDescription = clamp(m.description, OG_DESC_MAX);

  return {
    title: m.title,
    description: m.description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      siteName: dict.meta.siteName,
      locale: hreflang[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => hreflang[l]),
      type: 'website',
      url,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    ...(robots ? { robots } : {}),
  };
}

// Per-project metadata. The og:image / twitter:image are supplied by the
// generated card in opengraph-image.jsx (the file-based convention), so we
// deliberately omit `images` here to avoid overriding it.
export async function buildProjectMetadata({ locale, project }) {
  const dict = await getDictionary(locale);
  const path = `/offer/${project.slug}`;
  const url = `${SITE_URL}${withLocale(locale, path)}/`;

  const title = pick(project, 'title', locale);
  const subtitle = pick(project, 'subtitle', locale);
  const rawDesc =
    pick(project, 'description', locale) || subtitle || dict.meta.offer.description;

  const fullTitle = `${title} | ${dict.meta.siteName}`;
  const ogTitle = clamp(fullTitle, OG_TITLE_MAX);
  const ogDescription = clamp(rawDesc, OG_DESC_MAX);

  return {
    title,
    description: clamp(rawDesc, META_DESC_MAX),
    alternates: buildAlternates(locale, path),
    openGraph: {
      siteName: dict.meta.siteName,
      locale: hreflang[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => hreflang[l]),
      type: 'article',
      url,
      title: ogTitle,
      description: ogDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
    },
  };
}
