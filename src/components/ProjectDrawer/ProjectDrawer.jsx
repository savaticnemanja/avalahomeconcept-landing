'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowUpRight, LuBed, LuMaximize2, LuSunrise, LuX, LuZoomIn, LuPhone } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

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
  const imgSrc = typeof src === 'string' ? src : src.src;

  return (
    <div
      className="fixed inset-0 z-[80] bg-bg-dark/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-text-light text-3xl leading-none hover:text-accent-strong transition-colors"
        onClick={onClose}
        aria-label="Zatvori"
      >
        &#x2715;
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent-strong transition-colors p-2"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Prethodna"
      >
        &#8249;
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-[4px]"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent-strong transition-colors p-2"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Sledeća"
      >
        &#8250;
      </button>
    </div>
  );
};

export const ProjectDrawer = ({ project, onClose }) => {
  const { t, dict, href } = useI18n();
  const [active, setActive] = useState(project);
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (project) {
      setActive(project);
      setActiveImg(0);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    setZoom(null);
  }, [project]);

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && zoom === null) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, zoom]);

  const detail = active ? dict.projects[active.dictKey] : null;
  const title = detail?.title ?? '';
  const rooms = active?.netAreas
    ? detail.rooms.map((name, i) => ({ name, area: active.netAreas[i] }))
    : null;

  const zoomImages = active
    ? [
        { src: active.heroImage, alt: title },
        { src: active.planImage, alt: `${title} — ${t('offer.drawer.plan')}` },
        ...active.renderImages.map((src, i) => ({ src, alt: `${title} ${i + 1}` })),
      ]
    : [];

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-bg-dark/50 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0, pointerEvents: project ? 'auto' : 'none' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="fixed top-0 right-0 bottom-0 z-[60] w-full max-w-[820px] bg-bg flex flex-col shadow-[-8px_0_40px_rgba(26,25,21,0.18)]"
        style={{
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!project}
      >
        {active && (
          <>
            <div className="flex items-center justify-between gap-4 px-2 md:px-6 h-16 md:h-20 border-b border-border flex-shrink-0 bg-bg/95 backdrop-blur-md">
              <div className="min-w-0">
                <h2
                  className="text-text truncate"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem,2.5vw,1.7rem)', fontWeight: 400, lineHeight: 1.1 }}
                >
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label={t('offer.drawer.close')}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-border rounded-full text-text-muted hover:text-accent-strong hover:border-accent transition-colors duration-200"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 min-h-0 flex flex-col">

              <div className="flex flex-col gap-3 px-2 md:px-6 py-4 flex-shrink-0">
                <button
                  onClick={() => setZoom(activeImg)}
                  className="relative w-full h-64 md:h-80 rounded-[4px] overflow-hidden border border-border group"
                  aria-label={zoomImages[activeImg]?.alt}
                >
                  <Image
                    src={zoomImages[activeImg].src}
                    alt={zoomImages[activeImg].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <span
                    className="absolute top-3 right-3 px-3 py-1 text-[0.68rem] font-medium tracking-[0.15em] uppercase text-white"
                    style={{ backgroundColor: 'rgba(138,101,38,0.95)', fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)' }}
                  >
                    {t(`offer.cards.${active.cardIndex}.badge`)}
                  </span>
                  <span className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-bg-dark/55 text-white backdrop-blur-sm transition-colors duration-200 group-hover:bg-accent-strong">
                    <LuZoomIn className="w-4 h-4" />
                  </span>
                </button>

                <div
                  className="flex gap-2 overflow-x-auto"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {zoomImages.map((im, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative flex-shrink-0 h-14 w-20 md:h-16 md:w-24 rounded-[3px] overflow-hidden border-2 transition-all duration-200 ${i === activeImg ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      style={{ scrollSnapAlign: 'start' }}
                      aria-label={im.alt}
                    >
                      <Image src={im.src} alt="" fill className="object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-5 px-2 md:px-6 py-4 border-y border-border overflow-x-auto flex-shrink-0">
                <p
                  className="text-text-muted text-[0.7rem] font-medium tracking-[0.15em] uppercase whitespace-nowrap flex-shrink-0"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t(`offer.cards.${active.cardIndex}.subtitle`)}
                </p>
                <span className="flex items-center gap-2 text-sm font-light text-text-muted whitespace-nowrap flex-shrink-0">
                  <LuBed className="w-4 h-4 text-accent-strong" />
                  {active.beds} {t('offer.rooms')}
                </span>
                {active.terrace && (
                  <span className="flex items-center gap-2 text-sm font-light text-text-muted whitespace-nowrap flex-shrink-0">
                    <LuSunrise className="w-4 h-4 text-accent-strong" />
                    {t('offer.terrace')} {active.terrace}
                  </span>
                )}
                <span className="flex items-center gap-2 text-sm font-light text-text-muted whitespace-nowrap flex-shrink-0">
                  <LuMaximize2 className="w-4 h-4 text-accent-strong" />
                  {active.area} m²
                </span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto px-2 md:px-6 py-4 flex flex-col gap-6">
                {detail?.description && (
                  <p className="text-text-muted font-light leading-relaxed">{detail.description}</p>
                )}

                {rooms && (
                  <div className="flex flex-col gap-3">
                    <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent-strong">
                      {t('projectPage.netSurfaceLabel')}
                    </p>
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        {rooms.map((row, i) => (
                          <tr key={i} className="border-b border-border/50 last:border-0">
                            <td className="py-2 font-light text-text">{row.name}</td>
                            <td className="py-2 text-right text-text-muted font-light">{row.area}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pt-3 border-t border-border flex justify-between items-center">
                      <span className="text-sm font-medium text-text">{t('projectPage.total')}</span>
                      <span className="text-accent-strong font-medium">{active.surfaceArea} m²</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 border-t border-border px-2 md:px-6 py-4 bg-bg flex flex-row gap-3">
                <a
                  href="tel:+38163383393"
                  aria-label="+381 63 383 393"
                  className="group relative inline-flex items-stretch flex-shrink-0"
                >
                  <span className="absolute inset-0 m-auto w-8 h-8 bg-accent/50 animate-ping [animation-duration:2.5s] pointer-events-none" />
                  <span className="relative inline-flex items-center justify-center px-4 bg-bg border border-accent text-accent-strong transition-all duration-250 group-hover:bg-accent-strong group-hover:text-white">
                    <LuPhone className="w-4 h-4" />
                  </span>
                </a>
                <Link href={href('/contact')} className="btn-primary justify-center flex-1" onClick={onClose}>
                  {t('offer.drawer.requestOffer')}
                  <LuArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </>
        )}
      </aside>

      <ZoomViewer images={zoomImages} index={zoom} onClose={() => setZoom(null)} onSetIndex={setZoom} />
    </>
  );
};
