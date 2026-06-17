import { locales, hreflang, routes, SITE_URL, withLocale } from '@/i18n/config';

export const dynamic = 'force-static';

// One entry per route × locale, each with hreflang alternates → richer sitemap.
// /thank-you is excluded (noindex).
export default function sitemap() {
  const indexable = routes.filter((r) => r !== '/thank-you');
  const entries = [];

  for (const route of indexable) {
    const languages = {};
    for (const l of locales) {
      languages[hreflang[l]] = `${SITE_URL}${withLocale(l, route)}/`;
    }
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}${withLocale(locale, route)}/`,
        lastModified: new Date(),
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
        priority: route === '/' ? 1 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
