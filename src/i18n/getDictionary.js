import { defaultLocale, isLocale } from './config';

const dictionaries = {
  sr: () => import('./dictionaries/sr.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ru: () => import('./dictionaries/ru.json').then((m) => m.default),
  de: () => import('./dictionaries/de.json').then((m) => m.default),
};

export const getDictionary = async (locale) => {
  const key = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[key]();
};
