// Seed the database from the project's original hardcoded content so the public
// site keeps working after the static -> dynamic migration. Idempotent: skips if
// content already exists. Copies source assets into the uploads directory.

import { PrismaClient } from '@prisma/client';
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHouses } from './projects-content.js';

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(ROOT, 'public', 'uploads');

const LOCALES = ['sr', 'en', 'ru', 'de'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Build { fieldSr, fieldEn, fieldRu, fieldDe } from a (locale)=>value fn.
const loc = (base, fn) => {
  const out = {};
  for (const l of LOCALES) out[`${base}${cap(l)}`] = fn(l) ?? '';
  return out;
};

// Copy a source asset into uploads under `destName`; returns destName.
const copyAsset = (srcRel, destName) => {
  const src = path.join(ROOT, srcRel);
  const dest = path.join(UPLOAD_DIR, destName);
  if (existsSync(src) && !existsSync(dest)) copyFileSync(src, dest);
  return destName;
};

// --- gallery categories text -------------------------------------------------
const GALLERY_CATEGORIES = [
  { slug: 'photos', name: { sr: 'Fotografije', en: 'Photos', ru: 'Фотографии', de: 'Fotos' }, count: 26 },
  { slug: '3d-renders', name: { sr: '3D renderi', en: '3D Renders', ru: '3D-рендеры', de: '3D-Renderings' }, count: 0 },
  { slug: 'interior', name: { sr: 'Enterijer', en: 'Interior', ru: 'Интерьер', de: 'Innenraum' }, count: 0 },
  { slug: 'progress', name: { sr: 'Napredak radova', en: 'Work Progress', ru: 'Ход работ', de: 'Baufortschritt' }, count: 0 },
];

async function main() {
  mkdirSync(UPLOAD_DIR, { recursive: true });

  const existingCats = await prisma.galleryCategory.count();
  const existingProjects = await prisma.project.count();
  if (existingCats > 0 || existingProjects > 0) {
    console.log('Seed skipped: content already exists.');
    return;
  }

  // Gallery
  let catOrder = 0;
  for (const cat of GALLERY_CATEGORIES) {
    const created = await prisma.galleryCategory.create({
      data: { slug: cat.slug, order: catOrder++, ...loc('name', (l) => cat.name[l]) },
    });
    for (let i = 1; i <= cat.count; i += 1) {
      const num = String(i).padStart(2, '0');
      const filename = copyAsset(`src/assets/gallery/gallery-${num}.webp`, `seed-gallery-${num}.webp`);
      await prisma.galleryImage.create({
        data: { categoryId: created.id, filename, order: i - 1 },
      });
    }
  }
  console.log(`Seeded ${GALLERY_CATEGORIES.length} gallery categories.`);

  // Projects (Kuća 1/2/3) — content lives in ./projects-content.js
  await createHouses(prisma, copyAsset);
  console.log('Seeded 3 projects.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
