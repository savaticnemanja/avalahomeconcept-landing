'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import * as LuIcons from 'react-icons/lu';
import { LuMail, LuArrowLeft, LuArrowRight, LuZoomIn, LuPhone } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';
import { imageUrl } from '@/lib/imageUrl';
import { pick } from '@/lib/localize';

const Hl = ({ name, className }) => {
  const Cmp = LuIcons[name] ?? LuIcons.LuDot;
  return <Cmp className={className} />;
};

const ZoomViewer = ({ images, index, onClose, onSetIndex }) => {
  const prev = useCallback(
    () => onSetIndex((i) => (i - 1 + images.length) % images.length),
    [images.length, onSetIndex]
  );
  const next = useCallback(
    () => onSetIndex((i) => (i + 1) % images.length),
    [images.length, onSetIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  if (index === null) return null;
  const { src, alt } = images[index];

  return (
    <div className="fixed inset-0 z-[80] bg-bg-dark/95 flex items-center justify-center" onClick={onClose}>
      <button className="absolute top-4 right-4 text-text-light text-3xl leading-none hover:text-accent transition-colors" onClick={onClose} aria-label="Zatvori">
        &#x2715;
      </button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Prethodna">
        &#8249;
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="max-h-[90vh] max-w-[90vw] object-contain rounded-[4px]" onClick={(e) => e.stopPropagation()} />
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Sledeća">
        &#8250;
      </button>
    </div>
  );
};

export default function ProjectDetail({ project }) {
  const { t, locale, href } = useI18n();
  const [zoom, setZoom] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  const title = pick(project, 'title', locale);
  const subtitle = pick(project, 'subtitle', locale);
  const badge = pick(project, 'badge', locale);
  const description = pick(project, 'description', locale);
  const highlights = project.highlights ?? [];
  const rooms = project.rooms ?? [];

  const orderedImages = [...project.images].sort((a, b) => {
    if (a.filename === project.coverFilename) return -1;
    if (b.filename === project.coverFilename) return 1;
    return a.order - b.order;
  });

  const images = orderedImages.map((im, i) => ({
    src: imageUrl(im.filename),
    alt: pick(im, 'caption', locale) || `${title} ${i + 1}`,
  }));

  return (
    <main className="pt-16 md:pt-20">
      <section className="pt-0 pb-28 md:pt-14 bg-bg">
        <div className="safe-zone">
          <Link
            href={href('/offer')}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-accent transition-colors mb-6"
            style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}
          >
            <LuArrowLeft className="w-4 h-4" />
            {t('nav.offer')}
          </Link>

          <header className="flex flex-row items-end justify-between gap-4 mb-6">
            <div className="min-w-0">
              {subtitle && (
                <p className="text-text-muted text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  {subtitle}
                </p>
              )}
              <h1 className="text-text leading-tight" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 400 }}>
                {title}
              </h1>
            </div>
            {project.totalAreaM2 != null && (
              <div className="flex-shrink-0 text-right">
                <span className="text-accent" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 400, lineHeight: 1 }}>
                  {project.totalAreaM2}
                </span>
                <span className="text-text-muted text-sm"> m²</span>
              </div>
            )}
          </header>

          {images.length > 0 && (
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={() => setZoom(activeImg)}
                className="relative w-full h-72 md:h-[460px] rounded-[6px] overflow-hidden border border-border group"
                aria-label={images[activeImg]?.alt}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={images[activeImg].src} alt={images[activeImg].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-[0.68rem] font-medium tracking-[0.15em] uppercase text-white" style={{ backgroundColor: 'rgba(196,151,90,0.92)', fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)' }}>
                    {badge}
                  </span>
                )}
                <span className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-bg-dark/55 text-white backdrop-blur-sm transition-colors duration-200 group-hover:bg-accent">
                  <LuZoomIn className="w-4 h-4" />
                </span>
              </button>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto" style={{ scrollSnapType: 'x mandatory' }}>
                  {images.map((im, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative flex-shrink-0 h-16 w-24 md:h-20 md:w-28 rounded-[3px] overflow-hidden border-2 transition-all duration-200 ${i === activeImg ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      style={{ scrollSnapAlign: 'start' }}
                      aria-label={im.alt}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={im.src} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {highlights.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 border-y border-border mb-8">
              {highlights.map((h) => (
                <span key={h.id} className="flex items-center gap-2 text-sm font-light text-text-muted">
                  <Hl name={h.icon} className="w-4 h-4 text-accent" />
                  {pick(h, 'label', locale)}{h.value ? ` ${h.value}` : ''}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-8">
            {description && (
              <p className="text-text-muted font-light leading-relaxed whitespace-pre-line max-w-[68ch]">{description}</p>
            )}

            {rooms.length > 0 && (
              <div className="flex flex-col gap-3 max-w-[520px]">
                <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent">
                  {t('projectPage.netSurfaceLabel')}
                </p>
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {rooms.map((row) => (
                      <tr key={row.id} className="border-b border-border/50 last:border-0">
                        <td className="py-2 font-light text-text">{pick(row, 'name', locale)}</td>
                        <td className="py-2 text-right text-text-muted font-light">{row.area}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {project.totalAreaM2 != null && (
                  <div className="pt-3 border-t border-border flex justify-between items-center">
                    <span className="text-sm font-medium text-text">{t('projectPage.total')}</span>
                    <span className="text-accent font-medium">{project.totalAreaM2} m²</span>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </section>

      <div className="py-8 md:py-16 bg-bg border-t border-border">
        <div className="safe-zone flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-text italic" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', fontWeight: 400 }}>
            {t('midCta.text')}
          </p>
          <Link href={href('/contact')} className="btn-primary group flex-shrink-0">
            {t('midCta.requestOffer')}
            <span className="btn-arrow flex items-center"><LuArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-40 flex flex-row gap-3">
        <a href="tel:+38163383393" aria-label="+381 63 383 393" className="group relative inline-flex items-stretch flex-shrink-0 shadow-[0_6px_20px_rgba(26,25,21,0.28)]">
          <span className="absolute inset-0 m-auto w-8 h-8 bg-accent/50 animate-ping [animation-duration:2.5s] pointer-events-none" />
          <span className="relative inline-flex items-center justify-center px-4 bg-bg border border-accent text-accent transition-all duration-250 group-hover:bg-accent group-hover:text-white">
            <LuPhone className="w-4 h-4" />
          </span>
        </a>
        <Link
          href={href('/contact')}
          aria-label={t('offer.drawer.requestOffer')}
          className="btn-primary justify-center shadow-[0_6px_20px_rgba(26,25,21,0.28)]"
        >
          <LuMail className="w-4 h-4" />
        </Link>
      </div>

      <ZoomViewer images={images} index={zoom} onClose={() => setZoom(null)} onSetIndex={setZoom} />
    </main>
  );
}
