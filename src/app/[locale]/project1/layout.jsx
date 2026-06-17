import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates, SITE_URL, withLocale } from '@/i18n/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.project1.title,
    description: dict.meta.project1.description,
    alternates: buildAlternates(locale, '/project1'),
    openGraph: {
      title: `${dict.meta.project1.title} | ${dict.meta.siteName}`,
      description: dict.meta.project1.description,
      url: `${SITE_URL}${withLocale(locale, '/project1')}/`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
