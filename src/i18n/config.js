export const locales = ['sr', 'en', 'ru', 'de'];
export const defaultLocale = 'sr';

export const hreflang = {
  sr: 'sr-RS',
  en: 'en',
  ru: 'ru',
  de: 'de',
};

export const localeNames = {
  sr: 'Srpski',
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch',
};
// TODO: Change this to your production URL when deploying
export const SITE_URL = 'https://demo.nemanjas.dev';

export const isLocale = (value) => locales.includes(value);

export const withLocale = (locale, path = '/') => {
  const clean = path === '/' ? '' : path;
  return `/${locale}${clean}`;
};

export const routes = [
  '/',
  '/about-us',
  '/gallery',
  '/offer',
  '/contact',
  '/thank-you',
];

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
