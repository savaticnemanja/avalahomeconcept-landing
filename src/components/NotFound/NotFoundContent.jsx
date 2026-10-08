import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import { withLocale } from '@/i18n/config';

// Shared 404 body: rendered inside the locale layout (with nav + footer) for
// unknown /<locale>/... paths, and standalone by the root not-found page.
export const NotFoundContent = ({ locale, dict }) => (
  <main className="pt-20 min-h-[70vh] flex items-center justify-center bg-bg">
    <div className="safe-zone py-16 text-center flex flex-col items-center gap-6">
      <span
        className="text-accent"
        style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(4rem,12vw,7rem)', fontWeight: 400, lineHeight: 1 }}
      >
        404
      </span>
      <h1
        className="text-text leading-tight"
        style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 400 }}
      >
        {dict.notFound.title}
      </h1>
      <p className="text-text-muted font-light max-w-md">{dict.notFound.text}</p>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        <Link href={withLocale(locale, '/offer')} className="btn-primary group">
          {dict.notFound.offer}
          <span className="btn-arrow flex items-center"><LuArrowRight className="w-4 h-4" /></span>
        </Link>
        <Link href={withLocale(locale, '/')} className="btn-ghost group">
          {dict.notFound.home}
        </Link>
        <Link href={withLocale(locale, '/contact')} className="btn-ghost group">
          {dict.notFound.contact}
        </Link>
      </div>
    </div>
  </main>
);
