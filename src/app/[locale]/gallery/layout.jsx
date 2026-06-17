import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates, SITE_URL, withLocale } from '@/i18n/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.gallery.title,
    description: dict.meta.gallery.description,
    alternates: buildAlternates(locale, '/gallery'),
    openGraph: {
      title: `${dict.meta.gallery.title} | ${dict.meta.siteName}`,
      description: dict.meta.gallery.description,
      url: `${SITE_URL}${withLocale(locale, '/gallery')}/`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
