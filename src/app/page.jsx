'use client';
import { useEffect } from 'react';
import { locales, defaultLocale } from '@/i18n/config';

const pickLocale = () => {
  try {
    const stored = localStorage.getItem('locale');
    if (stored && locales.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  const candidates =
    typeof navigator !== 'undefined'
      ? navigator.languages || [navigator.language]
      : [];
  for (const lang of candidates) {
    const code = (lang || '').slice(0, 2).toLowerCase();
    if (locales.includes(code)) return code;
  }
  return defaultLocale;
};

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`/${pickLocale()}/`);
  }, []);

  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      </noscript>
    </>
  );
}
