import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';
import { withLocale } from '@/i18n/config';
import { buildPageMetadata } from '@/i18n/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/thank-you', metaKey: 'thankYou', robots: { index: false } });
}

export default async function ThankYouPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="pt-20 min-h-[70vh] flex items-center justify-center bg-bg">
      <div className="safe-zone text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1
          className="text-text leading-tight"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 400 }}
        >
          {dict.thankYou.title}
        </h1>
        <p className="text-text-muted font-light max-w-md">
          {dict.thankYou.text}
        </p>
        <Link href={withLocale(locale, '/')} className="btn-primary mt-2">
          {dict.thankYou.backHome}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l6-6M3 12l6 6" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
