import { getDictionary } from '@/i18n/getDictionary';
import { buildPageMetadata } from '@/i18n/seo';
import { SITE_URL, withLocale } from '@/i18n/config';
import { projects } from '@/lib/projects';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/offer', metaKey: 'offer' });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const baseUrl = `${SITE_URL}${withLocale(locale, '/offer')}/`;

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'House',
        name: dict.projects[p.dictKey].title,
        description: dict.projects[p.dictKey].description,
        numberOfRooms: p.beds,
        url: `${baseUrl}#${p.key}`,
        ...(p.surfaceArea
          ? { floorSize: { '@type': 'QuantitativeValue', value: p.surfaceArea, unitCode: 'MTK' } }
          : {}),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      {children}
    </>
  );
}
