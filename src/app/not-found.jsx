import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import logoDark from '@/assets/brand/logo-dark.webp';
import { NotFoundContent } from '@/components/NotFound/NotFoundContent';
import { getDictionary } from '@/i18n/getDictionary';
import { defaultLocale, isLocale, withLocale } from '@/i18n/config';

export const metadata = { title: '404', robots: { index: false } };

// Paths outside any locale (e.g. /xyz) land here, outside the locale layout, so
// render a minimal header with the logo in place of the site navigation.
export default async function RootNotFound() {
  const requested = (await headers()).get('x-locale');
  const locale = isLocale(requested) ? requested : defaultLocale;
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-bg shadow-[0_1px_0_#E3DBCE]">
        <div className="safe-zone h-20 flex items-center">
          <Link href={withLocale(locale, '/')} aria-label="Avala Home Concept">
            <Image src={logoDark} alt="Avala Home Concept" className="h-10 w-auto" priority />
          </Link>
        </div>
      </header>
      <NotFoundContent locale={locale} dict={await getDictionary(locale)} />
    </>
  );
}
