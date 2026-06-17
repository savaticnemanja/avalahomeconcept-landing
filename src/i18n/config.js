export const locales = ['sr', 'en', 'ru', 'de'];
export const defaultLocale = 'sr';

// hreflang codes per locale (used for SEO alternates)
export const hreflang = {
  sr: 'sr-RS',
  en: 'en',
  ru: 'ru',
  de: 'de',
};

// Native names for the language switcher
export const localeNames = {
  sr: 'Srpski',
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch',
};

export const SITE_URL = 'https://avalahomeconcept.com';

export const isLocale = (value) => locales.includes(value);

// Build a locale-prefixed path: withLocale('en', '/about-us') -> '/en/about-us'
export const withLocale = (locale, path = '/') => {
  const clean = path === '/' ? '' : path;
  return `/${locale}${clean}`;
};

// All routes (locale-agnostic) used for sitemap + hreflang generation
export const routes = [
  '/',
  '/about-us',
  '/gallery',
  '/project1',
  '/project2',
  '/small-houses',
  '/contact',
  '/thank-you',
];

// Build canonical + hreflang alternates for a given route and locale
export const buildAlternates = (locale, path = '/') => {
  const languages = {};
  for (const l of locales) {
    languages[hreflang[l]] = `${SITE_URL}${withLocale(l, path)}/`;
  }
  languages['x-default'] = `${SITE_URL}${withLocale(defaultLocale, path)}/`;
  return {
    canonical: `${SITE_URL}${withLocale(locale, path)}/`,
    languages,
  };
};
