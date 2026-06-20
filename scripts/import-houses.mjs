// One-off: refresh the three project rows from prisma/projects-content.js
// (the PDF-derived Kuća 1/2/3 data) without touching the gallery. Safe to
// re-run — it deletes the existing projects (cascading to their images,
// highlights and rooms) and recreates them from the shared content module.

import { PrismaClient } from '@prisma/client';
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HOUSES, createHouses } from '../prisma/projects-content.js';

const prisma = new PrismaClient();
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(ROOT, 'public', 'uploads');

const copyAsset = (srcRel, destName) => {
  const src = path.join(ROOT, srcRel);
  const dest = path.join(UPLOAD_DIR, destName);
  if (existsSync(src) && !existsSync(dest)) copyFileSync(src, dest);
  return destName;
};

async function main() {
  mkdirSync(UPLOAD_DIR, { recursive: true });

  const slugs = HOUSES.map((h) => h.slug);
  const deleted = await prisma.project.deleteMany({ where: { slug: { in: slugs } } });
  console.log(`Removed ${deleted.count} existing project(s): ${slugs.join(', ')}`);

  await createHouses(prisma, copyAsset);
  console.log(`Imported ${HOUSES.length} houses from PDF content.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
