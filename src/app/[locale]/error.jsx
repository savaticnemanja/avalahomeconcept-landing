'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { LuRotateCw } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

export default function LocaleError({ error, reset }) {
  const { t, href } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="pt-20 min-h-[70vh] flex items-center justify-center bg-bg">
      <div className="safe-zone py-16 text-center flex flex-col items-center gap-6">
        <h1
          className="text-text leading-tight"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 400 }}
        >
          {t('error.title')}
        </h1>
        <p className="text-text-muted font-light max-w-md">{t('error.text')}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <button type="button" onClick={() => reset()} className="btn-primary group">
            <LuRotateCw className="w-4 h-4" />
            {t('error.retry')}
          </button>
          <Link href={href('/')} className="btn-ghost group">
            {t('error.home')}
          </Link>
        </div>
      </div>
    </main>
  );
}
