import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { prisma } from '@/lib/db';
import { getDictionary } from '@/i18n/getDictionary';
import { pick } from '@/lib/localize';
import { UPLOAD_DIR } from '@/lib/uploads';

// sharp (native) + fs require the Node runtime; DB content means render on demand.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Avala Home Concept';

const ACCENT = '#C4975A';
const DARK = '#1A1915';
const MUTED = '#6B645A';

const trunc = (s = '', n) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

// Satori can't decode WebP, so transcode/resize every embedded image to PNG.
async function pngDataUri(absPath, resize) {
  try {
    const buf = await readFile(absPath);
    let img = sharp(buf);
    if (resize) img = img.resize(resize);
    const out = await img.png().toBuffer();
    return `data:image/png;base64,${out.toString('base64')}`;
  } catch {
    return null;
  }
}

export default async function Image({ params }) {
  const { locale, slug } = await params;
  const [dict, project] = await Promise.all([
    getDictionary(locale),
    prisma.project.findUnique({
      where: { slug },
      include: { images: { orderBy: { order: 'asc' } }, highlights: { orderBy: { order: 'asc' } } },
    }),
  ]);

  const title = project ? pick(project, 'title', locale) : dict.meta.siteName;
  const description = project ? pick(project, 'description', locale) : '';
  const badge = project ? pick(project, 'badge', locale) : '';
  const cta = dict.offer.drawer.requestOffer;
  const eyebrow = dict.offer.eyebrow;

  // Bullet points from highlights (skip the area one — it gets its own chip).
  const bullets = (project?.highlights ?? [])
    .filter((h) => h.icon !== 'LuMaximize2')
    .slice(0, 4)
    .map((h) => `${pick(h, 'label', locale)}${h.value ? ` · ${h.value}` : ''}`);

  const cover =
    project?.images?.find((i) => i.filename === project.coverFilename) ?? project?.images?.[0];

  const [logo, coverImg] = await Promise.all([
    pngDataUri(path.join(process.cwd(), 'public', 'web-app-manifest-512x512.png'), { width: 88, height: 88 }),
    cover
      ? pngDataUri(path.join(UPLOAD_DIR, cover.filename), { width: 520, height: 540, fit: 'cover' })
      : Promise.resolve(null),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          background: 'linear-gradient(115deg, #FFFFFF 52%, #F1EBE0 100%)',
          color: DARK,
        }}
      >
        {/* LEFT: content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 690,
            padding: '54px 56px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {logo && <img src={logo} width={52} height={52} style={{ borderRadius: 10 }} />}
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: 0.3 }}>
              {dict.meta.siteName}
            </span>
          </div>

          {/* Middle block */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Badge / eyebrow pill */}
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#A87C3E',
                  background: 'rgba(196,151,90,0.14)',
                  border: '1px solid rgba(196,151,90,0.35)',
                  borderRadius: 999,
                  padding: '7px 16px',
                  marginBottom: 22,
                }}
              >
                {(badge || eyebrow).toUpperCase()}
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                display: 'flex',
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1.07,
                letterSpacing: -0.5,
                marginBottom: 18,
              }}
            >
              {trunc(title, 56)}
            </div>

            {/* Description */}
            {description && (
              <div style={{ display: 'flex', fontSize: 22, lineHeight: 1.4, color: MUTED, marginBottom: 22 }}>
                {trunc(description, 150)}
              </div>
            )}

            {/* Area chip + bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {project?.totalAreaM2 != null && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: ACCENT }}>
                    {project.totalAreaM2}
                  </span>
                  <span style={{ fontSize: 22, color: MUTED }}>m²</span>
                </div>
              )}
              {bullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 21, color: DARK }}>
                  <div style={{ display: 'flex', width: 8, height: 8, borderRadius: 999, background: ACCENT }} />
                  {trunc(b, 48)}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: ACCENT,
                color: '#FFFFFF',
                fontSize: 22,
                fontWeight: 700,
                borderRadius: 12,
                padding: '16px 30px',
              }}
            >
              {cta}
              <span style={{ display: 'flex', fontSize: 24 }}>→</span>
            </div>
          </div>
        </div>

        {/* RIGHT: cover photo with decorative ring */}
        <div
          style={{
            display: 'flex',
            position: 'relative',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 70,
              right: 64,
              width: 470,
              height: 470,
              borderRadius: 999,
              background: 'rgba(196,151,90,0.18)',
            }}
          />
          {coverImg && (
            <img
              src={coverImg}
              width={430}
              height={470}
              style={{
                position: 'relative',
                objectFit: 'cover',
                borderRadius: 28,
                boxShadow: '0 24px 60px rgba(26,25,21,0.35)',
              }}
            />
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
