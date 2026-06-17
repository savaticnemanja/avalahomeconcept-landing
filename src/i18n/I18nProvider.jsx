'use client';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { withLocale } from './config';

const I18nContext = createContext(null);

// Resolve a dotted path like 'faq.items.0.q' against the dictionary object.
const resolve = (obj, path) => {
  const value = path
    .split('.')
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
  return value;
};

export const I18nProvider = ({ locale, dictionary, children }) => {
  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem('locale', locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const value = useMemo(() => {
    const t = (path, fallback) => {
      const v = resolve(dictionary, path);
      if (v === undefined) return fallback !== undefined ? fallback : path;
      return v;
    };
    return {
      locale,
      dict: dictionary,
      t,
      // locale-aware href helper
      href: (path) => withLocale(locale, path),
    };
  }, [locale, dictionary]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
};
