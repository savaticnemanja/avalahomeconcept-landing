import { randomBytes } from 'node:crypto';
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Where uploaded files live on disk. Served statically from /uploads/<file>.
export const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(process.cwd(), 'public', 'uploads');

export const ALLOWED_TYPES = ['image/webp', 'image/jpeg', 'image/png', 'image/avif'];
export const MAX_BYTES = 12 * 1024 * 1024; // 12 MB (raw upload limit)

// Every upload is normalised to an optimised WebP: best size/quality ratio
// with universal modern-browser support. Tune these three knobs as needed.
const MAX_EDGE = 2560; // px — longest side; bigger images are scaled down
const WEBP_QUALITY = 88; // visually lossless for photos at a fraction of the size
const WEBP_EFFORT = 6; // 0–6; higher = smaller file, slower encode

// Save a File/Blob to the upload dir, re-encoded to an optimised WebP.
// Returns { filename, width, height } of the stored (processed) image.
export const saveUpload = async (file) => {
  if (!file || typeof file.arrayBuffer !== 'function') {
    throw new Error('No file provided.');
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Unsupported file type. Use WebP, JPEG, PNG or AVIF.');
  }
  if (file.size > MAX_BYTES) {
    throw new Error('File too large (max 12 MB).');
  }

  const input = Buffer.from(await file.arrayBuffer());

  let data;
  let info;
  try {
    const meta = await sharp(input).metadata();
    const oversized = meta.width > MAX_EDGE || meta.height > MAX_EDGE;

    ({ data, info } = await sharp(input)
      .rotate() // bake in EXIF orientation, then metadata is dropped on output
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
      .toBuffer({ resolveWithObject: true }));

    // Re-encoding an already-optimised WebP can inflate it (and adds a
    // generation of lossy loss). If it didn't need resizing or re-orienting,
    // keep the smaller original bytes instead.
    if (
      file.type === 'image/webp' &&
      !oversized &&
      (!meta.orientation || meta.orientation === 1) &&
      data.length >= input.length
    ) {
      data = input;
      info = { width: meta.width, height: meta.height };
    }
  } catch {
    throw new Error('Could not process image. The file may be corrupt or unsupported.');
  }

  const filename = `${Date.now()}-${randomBytes(6).toString('hex')}.webp`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, filename), data);

  return { filename, width: info.width, height: info.height };
};

// Remove an uploaded file by its stored filename (best effort).
export const deleteUpload = async (filename) => {
  if (!filename) return;
  const safe = path.basename(filename);
  try {
    await unlink(path.join(UPLOAD_DIR, safe));
  } catch {
    // already gone — ignore
  }
};
