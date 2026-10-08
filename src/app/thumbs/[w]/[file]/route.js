import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';
import { UPLOAD_DIR, thumbPath } from '@/lib/uploads';
import { THUMB_WIDTHS } from '@/lib/imageUrl';

export const runtime = 'nodejs';

const THUMB_QUALITY = 78;
const IMAGE_FILE = /^[\w-]+\.(webp|jpe?g|png|avif)$/i;

const respond = (data) =>
  new Response(data, {
    headers: {
      'Content-Type': 'image/webp',
      // Upload filenames are unique and never rewritten, so thumbs are immutable.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });

export async function GET(_request, { params }) {
  const { w, file } = await params;
  const width = Number(w);
  if (!THUMB_WIDTHS.includes(width) || !IMAGE_FILE.test(file)) {
    return new Response('Not found', { status: 404 });
  }

  const cached = thumbPath(file, width);
  try {
    return respond(await readFile(cached));
  } catch {
    // not generated yet
  }

  let original;
  try {
    original = await readFile(path.join(UPLOAD_DIR, file));
  } catch {
    return new Response('Not found', { status: 404 });
  }

  let data;
  try {
    data = await sharp(original)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toBuffer();
  } catch {
    return new Response('Could not process image', { status: 500 });
  }

  // Write via a temp file + rename so concurrent first requests never serve a
  // half-written thumb. A failed cache write still returns the image.
  try {
    await mkdir(path.dirname(cached), { recursive: true });
    const tmp = `${cached}.${randomBytes(4).toString('hex')}.tmp`;
    await writeFile(tmp, data);
    await rename(tmp, cached);
  } catch {
    // ignore
  }

  return respond(data);
}
