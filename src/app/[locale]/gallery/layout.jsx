import { getDictionary } from '@/i18n/getDictionary';
import { buildPageMetadata } from '@/i18n/seo';
import { SITE_URL, withLocale } from '@/i18n/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/gallery', metaKey: 'gallery' });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const imageGallery = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: dict.meta.gallery.title,
    description: dict.meta.gallery.description,
    url: `${SITE_URL}${withLocale(locale, '/gallery')}`,
    image: `${SITE_URL}/og/gallery.jpg`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallery) }}
      />
      {children}
    </>
  );
}
