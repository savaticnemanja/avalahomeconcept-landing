import { prisma } from '@/lib/db';
import GalleryClient from './GalleryClient';

export const dynamic = 'force-dynamic';

export default async function GalleryPage({ searchParams }) {
  const { tab } = await searchParams;
  const categories = await prisma.galleryCategory.findMany({
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' } } },
  });

  return <GalleryClient categories={categories} initialTab={tab} />;
}
