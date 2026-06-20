import { buildPageMetadata } from '@/i18n/seo';
import { SITE_URL, withLocale } from '@/i18n/config';
import { prisma } from '@/lib/db';
import { pick } from '@/lib/localize';

// Queries the DB for JSON-LD, so render on demand (DB may not exist at build).
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/offer', metaKey: 'offer' });
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  const baseUrl = `${SITE_URL}${withLocale(locale, '/offer')}/`;

  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: { highlights: true },
  });

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((p, i) => {
      const beds = p.highlights.find((h) => h.icon === 'LuBed')?.value;
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'House',
          name: pick(p, 'title', locale),
          description: pick(p, 'description', locale),
          ...(beds ? { numberOfRooms: Number(beds) || beds } : {}),
          url: `${baseUrl}${p.slug}/`,
          ...(p.totalAreaM2
            ? { floorSize: { '@type': 'QuantitativeValue', value: p.totalAreaM2, unitCode: 'MTK' } }
            : {}),
        },
      };
    }),
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
