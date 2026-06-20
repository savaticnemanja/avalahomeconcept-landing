'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/auth';
import { deleteUpload } from '@/lib/uploads';
import { LOCALES } from '@/lib/admin/constants';

// --- helpers ---------------------------------------------------------------

const refresh = () => {
  revalidatePath('/admin');
  revalidatePath('/admin/gallery');
  revalidatePath('/admin/projects', 'layout');
  // Public pages are force-dynamic, but revalidate anyway for safety.
  revalidatePath('/', 'layout');
};

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Pull per-locale columns from FormData for a field base, e.g. "name" -> { nameSr, nameEn, ... }
const localeFields = (formData, base) => {
  const out = {};
  for (const loc of LOCALES) {
    out[`${base}${cap(loc)}`] = (formData.get(`${base}_${loc}`) ?? '').toString().trim();
  }
  return out;
};

const nextOrder = async (model, where) => {
  const last = await prisma[model].findFirst({
    where,
    orderBy: { order: 'desc' },
    select: { order: true },
  });
  return (last?.order ?? -1) + 1;
};

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || `item-${Date.now()}`;

// --- gallery categories ----------------------------------------------------

export async function createGalleryCategory(formData) {
  await requireSession();
  const names = localeFields(formData, 'name');
  if (!names.nameSr) throw new Error('Naziv (SR) je obavezan.');
  const slug = slugify(formData.get('slug')?.toString() || names.nameSr);
  await prisma.galleryCategory.create({
    data: { slug, order: await nextOrder('galleryCategory', {}), ...names },
  });
  refresh();
}

export async function updateGalleryCategory(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  await prisma.galleryCategory.update({ where: { id }, data: localeFields(formData, 'name') });
  refresh();
}

export async function deleteGalleryCategory(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  const images = await prisma.galleryImage.findMany({ where: { categoryId: id }, select: { filename: true } });
  await prisma.galleryCategory.delete({ where: { id } });
  await Promise.all(images.map((i) => deleteUpload(i.filename)));
  refresh();
}

export async function reorderGalleryCategories(ids) {
  await requireSession();
  await prisma.$transaction(
    ids.map((id, order) => prisma.galleryCategory.update({ where: { id }, data: { order } })),
  );
  refresh();
}

// --- gallery images --------------------------------------------------------

export async function createGalleryImage({ categoryId, filename, width, height }) {
  await requireSession();
  await prisma.galleryImage.create({
    data: {
      categoryId,
      filename,
      width: width ?? 0,
      height: height ?? 0,
      order: await nextOrder('galleryImage', { categoryId }),
    },
  });
  refresh();
}

export async function updateGalleryImage(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  await prisma.galleryImage.update({ where: { id }, data: localeFields(formData, 'caption') });
  refresh();
}

export async function deleteGalleryImage(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  const img = await prisma.galleryImage.delete({ where: { id } });
  await deleteUpload(img.filename);
  refresh();
}

export async function reorderGalleryImages(ids) {
  await requireSession();
  await prisma.$transaction(
    ids.map((id, order) => prisma.galleryImage.update({ where: { id }, data: { order } })),
  );
  refresh();
}

// --- projects --------------------------------------------------------------

export async function createProject(formData) {
  await requireSession();
  const titles = localeFields(formData, 'title');
  if (!titles.titleSr) throw new Error('Naslov (SR) je obavezan.');
  const slug = slugify(formData.get('slug')?.toString() || titles.titleSr);
  const project = await prisma.project.create({
    data: { slug, order: await nextOrder('project', {}), ...titles },
  });
  redirect(`/admin/projects/${project.id}`);
}

export async function updateProject(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  const titles = localeFields(formData, 'title');
  await prisma.project.update({
    where: { id },
    data: {
      slug: slugify(titles.titleSr),
      ...titles,
      ...localeFields(formData, 'subtitle'),
      ...localeFields(formData, 'badge'),
      ...localeFields(formData, 'description'),
      totalAreaM2: formData.get('totalAreaM2') ? Number(formData.get('totalAreaM2')) : null,
      sitePlanTop: (formData.get('sitePlanTop') ?? '').toString().trim() || null,
      sitePlanLeft: (formData.get('sitePlanLeft') ?? '').toString().trim() || null,
    },
  });
  refresh();
}

export async function deleteProject(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  const imgs = await prisma.projectImage.findMany({ where: { projectId: id }, select: { filename: true } });
  const project = await prisma.project.delete({ where: { id } });
  await Promise.all(imgs.map((i) => deleteUpload(i.filename)));
  if (project.coverFilename) await deleteUpload(project.coverFilename);
  refresh();
  redirect('/admin/projects');
}

export async function reorderProjects(ids) {
  await requireSession();
  await prisma.$transaction(
    ids.map((id, order) => prisma.project.update({ where: { id }, data: { order } })),
  );
  refresh();
}

// --- project images --------------------------------------------------------

export async function createProjectImage({ projectId, filename, width, height, isCover }) {
  await requireSession();
  await prisma.projectImage.create({
    data: {
      projectId,
      filename,
      width: width ?? 0,
      height: height ?? 0,
      order: await nextOrder('projectImage', { projectId }),
    },
  });
  if (isCover) {
    await prisma.project.update({ where: { id: projectId }, data: { coverFilename: filename } });
  }
  refresh();
}

export async function updateProjectImage(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  await prisma.projectImage.update({ where: { id }, data: localeFields(formData, 'caption') });
  refresh();
}

export async function setProjectCover(formData) {
  await requireSession();
  const projectId = Number(formData.get('projectId'));
  const filename = formData.get('filename')?.toString();
  await prisma.project.update({ where: { id: projectId }, data: { coverFilename: filename } });
  refresh();
}

export async function deleteProjectImage(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  const img = await prisma.projectImage.delete({ where: { id } });
  // Clear cover if it pointed at this file.
  await prisma.project.updateMany({
    where: { id: img.projectId, coverFilename: img.filename },
    data: { coverFilename: null },
  });
  await deleteUpload(img.filename);
  refresh();
}

export async function reorderProjectImages(ids) {
  await requireSession();
  await prisma.$transaction(
    ids.map((id, order) => prisma.projectImage.update({ where: { id }, data: { order } })),
  );
  refresh();
}

// --- project highlights ----------------------------------------------------

export async function createHighlight(formData) {
  await requireSession();
  const projectId = Number(formData.get('projectId'));
  await prisma.projectHighlight.create({
    data: { projectId, labelSr: 'Nova stavka', order: await nextOrder('projectHighlight', { projectId }) },
  });
  refresh();
}

export async function updateHighlight(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  await prisma.projectHighlight.update({
    where: { id },
    data: {
      icon: (formData.get('icon') ?? 'LuDot').toString().trim() || 'LuDot',
      value: (formData.get('value') ?? '').toString().trim(),
      ...localeFields(formData, 'label'),
    },
  });
  refresh();
}

export async function deleteHighlight(formData) {
  await requireSession();
  await prisma.projectHighlight.delete({ where: { id: Number(formData.get('id')) } });
  refresh();
}

export async function reorderHighlights(ids) {
  await requireSession();
  await prisma.$transaction(
    ids.map((id, order) => prisma.projectHighlight.update({ where: { id }, data: { order } })),
  );
  refresh();
}

// --- project rooms ---------------------------------------------------------

export async function createRoom(formData) {
  await requireSession();
  const projectId = Number(formData.get('projectId'));
  await prisma.projectRoom.create({
    data: { projectId, nameSr: 'Nova prostorija', order: await nextOrder('projectRoom', { projectId }) },
  });
  refresh();
}

export async function updateRoom(formData) {
  await requireSession();
  const id = Number(formData.get('id'));
  await prisma.projectRoom.update({
    where: { id },
    data: { area: (formData.get('area') ?? '').toString().trim(), ...localeFields(formData, 'name') },
  });
  refresh();
}

export async function deleteRoom(formData) {
  await requireSession();
  await prisma.projectRoom.delete({ where: { id: Number(formData.get('id')) } });
  refresh();
}

export async function reorderRooms(ids) {
  await requireSession();
  await prisma.$transaction(
    ids.map((id, order) => prisma.projectRoom.update({ where: { id }, data: { order } })),
  );
  refresh();
}
