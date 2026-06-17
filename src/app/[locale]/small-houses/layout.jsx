import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates, SITE_URL, withLocale } from '@/i18n/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.smallHouses.title,
    description: dict.meta.smallHouses.description,
    alternates: buildAlternates(locale, '/small-houses'),
    openGraph: {
      title: `${dict.meta.smallHouses.title} | ${dict.meta.siteName}`,
      description: dict.meta.smallHouses.description,
      url: `${SITE_URL}${withLocale(locale, '/small-houses')}/`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
