import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { mkdir, writeFile, unlink, readFile, mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

export const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(process.cwd(), 'public', 'uploads');

export const ALLOWED_TYPES = ['image/webp', 'image/jpeg', 'image/png', 'image/avif'];
export const MAX_BYTES = 12 * 1024 * 1024; // 12 MB (raw upload limit)

export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska'];
export const MAX_VIDEO_BYTES = 300 * 1024 * 1024; // 300 MB (raw upload limit)

export const isVideoType = (type) => ALLOWED_VIDEO_TYPES.includes(type);

const MAX_EDGE = 2560;
const WEBP_QUALITY = 88;
const WEBP_EFFORT = 6;

// Web-delivery target for transcoded video.
const VIDEO_MAX_W = 1920;
const VIDEO_MAX_H = 1080;
const VIDEO_CRF = 26; // visually lossless-ish, good compression
const VIDEO_PRESET = 'fast';
const VIDEO_MAX_FPS = 30;
const POSTER_QUALITY = 80;

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
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
      .toBuffer({ resolveWithObject: true }));

    // Re-encoding an already-optimised WebP can inflate it; keep the original bytes if no processing was needed.
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

// Resolve the ffmpeg binary: prefer the bundled static build (works in Docker
// without an apt install), fall back to whatever is on PATH for local dev.
let ffmpegPathPromise;
const resolveFfmpeg = () => {
  if (!ffmpegPathPromise) {
    ffmpegPathPromise = import('ffmpeg-static')
      .then(async (m) => {
        const bin = m.default;
        // If bundling mangled the path, the file won't exist — fall back to PATH.
        if (bin && existsSync(bin)) return bin;
        return 'ffmpeg';
      })
      .catch(() => 'ffmpeg');
  }
  return ffmpegPathPromise;
};

const runFfmpeg = (bin, args) =>
  new Promise((resolve, reject) => {
    const proc = spawn(bin, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', (d) => {
      stderr += d.toString();
      if (stderr.length > 16_000) stderr = stderr.slice(-16_000);
    });
    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}: ${stderr.slice(-500)}`));
    });
  });

export const saveVideoUpload = async (file) => {
  if (!file || typeof file.arrayBuffer !== 'function') {
    throw new Error('No file provided.');
  }
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    throw new Error('Unsupported video type. Use MP4, MOV, WebM or MKV.');
  }
  if (file.size > MAX_VIDEO_BYTES) {
    throw new Error('Video too large (max 300 MB).');
  }

  const ffmpeg = await resolveFfmpeg();
  const input = Buffer.from(await file.arrayBuffer());

  const tmp = await mkdtemp(path.join(os.tmpdir(), 'ahc-vid-'));
  const inPath = path.join(tmp, 'in');
  const outPath = path.join(tmp, 'out.mp4');
  const posterPath = path.join(tmp, 'poster.png');

  const filename = `${Date.now()}-${randomBytes(6).toString('hex')}.mp4`;
  const posterName = `${path.basename(filename, '.mp4')}-poster.webp`;

  try {
    await writeFile(inPath, input);

    // Downscale into a VIDEO_MAX_W x VIDEO_MAX_H box without ever upscaling,
    // keeping dimensions even (required by yuv420p / H.264).
    const scale =
      `scale='min(iw,${VIDEO_MAX_W})':'min(ih,${VIDEO_MAX_H})':` +
      `force_original_aspect_ratio=decrease:force_divisible_by=2`;

    await runFfmpeg(ffmpeg, [
      '-y',
      '-i', inPath,
      '-map_metadata', '-1',
      '-vf', scale,
      '-r', String(VIDEO_MAX_FPS),
      '-c:v', 'libx264',
      '-preset', VIDEO_PRESET,
      '-crf', String(VIDEO_CRF),
      '-pix_fmt', 'yuv420p',
      '-profile:v', 'high',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-ac', '2',
      '-movflags', '+faststart',
      outPath,
    ]);

    // Poster frame from the transcoded output so its dimensions match the video.
    await runFfmpeg(ffmpeg, [
      '-y',
      '-ss', '1',
      '-i', outPath,
      '-frames:v', '1',
      '-q:v', '2',
      posterPath,
    ]);

    const [videoData, posterRaw] = await Promise.all([readFile(outPath), readFile(posterPath)]);
    const { data: posterData, info } = await sharp(posterRaw)
      .webp({ quality: POSTER_QUALITY })
      .toBuffer({ resolveWithObject: true });

    await mkdir(UPLOAD_DIR, { recursive: true });
    await Promise.all([
      writeFile(path.join(UPLOAD_DIR, filename), videoData),
      writeFile(path.join(UPLOAD_DIR, posterName), posterData),
    ]);

    return {
      kind: 'video',
      filename,
      poster: posterName,
      width: info.width,
      height: info.height,
    };
  } catch (err) {
    throw new Error(
      `Could not process video. ${err?.message || 'The file may be corrupt or unsupported.'}`,
    );
  } finally {
    await rm(tmp, { recursive: true, force: true }).catch(() => {});
  }
};

export const deleteUpload = async (filename) => {
  if (!filename) return;
  const safe = path.basename(filename);
  try {
    await unlink(path.join(UPLOAD_DIR, safe));
  } catch {
    // already gone — ignore
  }
};
