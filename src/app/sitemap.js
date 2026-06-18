import { locales, hreflang, routes, SITE_URL, withLocale } from '@/i18n/config';

export const dynamic = 'force-static';

const ROUTE_IMAGE = {
  '/': '/og/home.jpg',
  '/about-us': '/og/about.jpg',
  '/gallery': '/og/gallery.jpg',
  '/offer': '/og/offer.jpg',
  '/contact': '/og/contact.jpg',
};

export default function sitemap() {
  const indexable = routes.filter((r) => r !== '/thank-you');
  const entries = [];

  for (const route of indexable) {
    const languages = {};
    for (const l of locales) {
      languages[hreflang[l]] = `${SITE_URL}${withLocale(l, route)}/`;
    }
    const image = ROUTE_IMAGE[route];
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}${withLocale(locale, route)}/`,
        lastModified: new Date(),
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
        priority: route === '/' ? 1 : 0.8,
        alternates: { languages },
        ...(image ? { images: [`${SITE_URL}${image}`] } : {}),
      });
    }
  }

  return entries;
}
