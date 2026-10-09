import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { buildProjectMetadata } from '@/i18n/seo';
import { SITE_URL, withLocale } from '@/i18n/config';
import { pick } from '@/lib/localize';
import { imageUrl } from '@/lib/imageUrl';
import ProjectDetail from './ProjectDetail';

export const dynamic = 'force-dynamic';

function getProject(slug) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: 'asc' } },
      highlights: { orderBy: { order: 'asc' } },
      rooms: { orderBy: { order: 'asc' } },
    },
  });
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = await getProject(slug);
  if (!project) return { robots: { index: false, follow: false } };
  return buildProjectMetadata({ locale, project });
}

export default async function ProjectPage({ params }) {
  const { locale, slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const url = `${SITE_URL}${withLocale(locale, `/offer/${slug}`)}`;
  const cover =
    project.images.find((i) => i.filename === project.coverFilename) ?? project.images[0];
  const beds = project.highlights.find((h) => h.icon === 'LuBed')?.value;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name: pick(project, 'title', locale),
    description: pick(project, 'description', locale),
    url,
    ...(cover ? { image: `${SITE_URL}${imageUrl(cover.filename)}` } : {}),
    ...(beds ? { numberOfRooms: Number(beds) || beds } : {}),
    ...(project.totalAreaM2
      ? { floorSize: { '@type': 'QuantitativeValue', value: project.totalAreaM2, unitCode: 'MTK' } }
      : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Beograd',
      addressRegion: 'Avala',
      addressCountry: 'RS',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={project} />
    </>
  );
}
