import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates, SITE_URL, withLocale } from '@/i18n/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.project2.title,
    description: dict.meta.project2.description,
    alternates: buildAlternates(locale, '/project2'),
    openGraph: {
      title: `${dict.meta.project2.title} | ${dict.meta.siteName}`,
      description: dict.meta.project2.description,
      url: `${SITE_URL}${withLocale(locale, '/project2')}/`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
