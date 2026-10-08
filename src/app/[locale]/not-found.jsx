import { headers } from 'next/headers';
import { NotFoundContent } from '@/components/NotFound/NotFoundContent';
import { getDictionary } from '@/i18n/getDictionary';
import { defaultLocale, isLocale } from '@/i18n/config';

export const metadata = { robots: { index: false } };

// not-found pages get no params; the middleware passes the URL locale along.
export default async function LocaleNotFound() {
  const requested = (await headers()).get('x-locale');
  const locale = isLocale(requested) ? requested : defaultLocale;
  return <NotFoundContent locale={locale} dict={await getDictionary(locale)} />;
}
