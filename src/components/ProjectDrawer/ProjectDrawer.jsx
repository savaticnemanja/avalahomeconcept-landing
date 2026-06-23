'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import * as LuIcons from 'react-icons/lu';
import { LuMail, LuX, LuZoomIn, LuPhone } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';
import { imageUrl } from '@/lib/imageUrl';
import { pick } from '@/lib/localize';

const Hl = ({ name, className }) => {
  const Cmp = LuIcons[name] ?? LuIcons.LuDot;
  return <Cmp className={className} />;
};

const ZoomViewer = ({ images, index, onClose, onSetIndex }) => {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const startX = useRef(0);
  const widthRef = useRef(1);
  const movedRef = useRef(false);
  const trackRef = useRef(null);

  const clamp = useCallback((i) => Math.max(0, Math.min(images.length - 1, i)), [images.length]);
  const prev = useCallback(() => onSetIndex((i) => clamp(i - 1)), [onSetIndex, clamp]);
  const next = useCallback(() => onSetIndex((i) => clamp(i + 1)), [onSetIndex, clamp]);

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

  const onDown = (e) => {
    draggingRef.current = true;
    setDragging(true);
    movedRef.current = false;
    startX.current = e.clientX;
    widthRef.current = trackRef.current?.offsetWidth || window.innerWidth;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) movedRef.current = true;
    setDragX(dx);
  };
  const onUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    const dx = dragX;
    setDragX(0);
    if (Math.abs(dx) > widthRef.current * 0.15) {
      if (dx < 0) next(); else prev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] bg-bg-dark/95 overflow-hidden"
      onClick={() => { if (movedRef.current) { movedRef.current = false; return; } onClose(); }}
    >
      <div
        ref={trackRef}
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
          transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          touchAction: 'pan-y',
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {images.map((im, i) => (
          <div key={i} className="w-full flex-shrink-0 flex items-center justify-center px-4 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={im.src}
              alt={im.alt}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-[4px] pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <button
        className="absolute top-4 right-4 z-10 text-text-light text-3xl leading-none hover:text-accent transition-colors"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Zatvori"
      >
        &#x2715;
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2 disabled:opacity-30"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        disabled={index === 0}
        aria-label="Prethodna"
      >
        &#8249;
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2 disabled:opacity-30"
        onClick={(e) => { e.stopPropagation(); next(); }}
        disabled={index === images.length - 1}
        aria-label="Sledeća"
      >
        &#8250;
      </button>
    </div>
  );
};

// `inline` renders the panel docked into the page layout (always open, no
// backdrop/slide/close) for the desktop 3-column /offer view. Otherwise it is a
// modal drawer that slides in from the right (mobile).
export const ProjectDrawer = ({ project, onClose, inline = false }) => {
  const { t, locale, href } = useI18n();
  const [active, setActive] = useState(project);
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const swipeStartX = useRef(null);
  const swiped = useRef(false);

  useEffect(() => {
    if (project) {
      setActive(project);
      // Open on the 2nd image when available (matches the card hover preview).
      setActiveImg(project.images.length > 1 ? 1 : 0);
      if (inline) return undefined;
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    setZoom(null);
    return undefined;
  }, [project, inline]);

  useEffect(() => {
    if (inline) return undefined;
    document.body.style.overflow = project ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [project, inline]);

  useEffect(() => {
    if (inline) return undefined;
    const onKey = (e) => { if (e.key === 'Escape' && zoom === null) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, zoom, inline]);

  const title = active ? pick(active, 'title', locale) : '';
  const subtitle = active ? pick(active, 'subtitle', locale) : '';
  const badge = active ? pick(active, 'badge', locale) : '';
  const description = active ? pick(active, 'description', locale) : '';
  const highlights = active?.highlights ?? [];
  const rooms = active?.rooms ?? [];

  const orderedImages = active
    ? [...active.images].sort((a, b) => {
        if (a.filename === active.coverFilename) return -1;
        if (b.filename === active.coverFilename) return 1;
        return a.order - b.order;
      })
    : [];

  const zoomImages = orderedImages.map((im, i) => ({
    src: imageUrl(im.filename),
    alt: pick(im, 'caption', locale) || `${title} ${i + 1}`,
  }));

  // Swipe/drag the main image to change slides (works outside fullscreen too).
  const stepImg = (dir) =>
    setActiveImg((i) => (i + dir + zoomImages.length) % zoomImages.length);
  const onSwipeStart = (e) => { swipeStartX.current = e.clientX; swiped.current = false; };
  const onSwipeEnd = (e) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) > 40 && zoomImages.length > 1) {
      swiped.current = true;
      stepImg(dx < 0 ? 1 : -1);
    }
  };

  const panel = active && (
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
              <div className="flex items-center gap-4 flex-shrink-0">
                {active.totalAreaM2 != null && (
                  <span
                    className="text-accent whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 400, lineHeight: 1 }}
                  >
                    {active.totalAreaM2}
                    <span className="text-text-muted text-sm"> m²</span>
                  </span>
                )}
                {!inline && (
                  <button
                    onClick={onClose}
                    aria-label={t('offer.drawer.close')}
                    className="w-10 h-10 flex items-center justify-center border border-border rounded-full text-text-muted hover:text-accent hover:border-accent transition-colors duration-200"
                  >
                    <LuX className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col">

              {zoomImages.length > 0 && (
                <div className="flex flex-col gap-3 px-2 md:px-6 py-4 flex-shrink-0">
                  <button
                    onClick={() => {
                      if (swiped.current) { swiped.current = false; return; }
                      setZoom(activeImg);
                    }}
                    onPointerDown={onSwipeStart}
                    onPointerUp={onSwipeEnd}
                    style={{ touchAction: 'pan-y' }}
                    className="relative w-full h-64 md:h-80 rounded-[4px] overflow-hidden border border-border group select-none"
                    aria-label={zoomImages[activeImg]?.alt}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={zoomImages[activeImg].src}
                      alt={zoomImages[activeImg].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {badge && (
                      <span
                        className="absolute top-3 right-3 px-3 py-1 text-[0.68rem] font-medium tracking-[0.15em] uppercase text-white"
                        style={{ backgroundColor: 'rgba(196,151,90,0.92)', fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)' }}
                      >
                        {badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-bg-dark/55 text-white backdrop-blur-sm transition-colors duration-200 group-hover:bg-accent">
                      <LuZoomIn className="w-4 h-4" />
                    </span>
                  </button>

                  <div className="flex gap-2 overflow-x-auto" style={{ scrollSnapType: 'x mandatory' }}>
                    {zoomImages.map((im, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`relative flex-shrink-0 h-14 w-20 md:h-16 md:w-24 rounded-[3px] overflow-hidden border-2 transition-all duration-200 ${i === activeImg ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        style={{ scrollSnapAlign: 'start' }}
                        aria-label={im.alt}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={im.src} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1 min-h-0 overflow-y-auto px-2 md:px-6 py-4 pb-24 flex flex-col gap-6">
                {description && (
                  <p className="text-text-muted font-light leading-relaxed whitespace-pre-line">{description}</p>
                )}

                {(subtitle || highlights.length > 0) && (
                  <div className="flex flex-col gap-3">
                    {subtitle && (
                      <p
                        className="text-text-muted text-[0.7rem] font-medium tracking-[0.15em] uppercase"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {subtitle}
                      </p>
                    )}
                    {highlights.length > 0 && (
                      <div className="grid grid-cols-2 gap-x-5 gap-y-2 auto-rows-fr">
                        {highlights.map((h) => (
                          <span key={h.id} className="flex items-center gap-2 text-sm font-light text-text-muted h-full">
                            <Hl name={h.icon} className="w-4 h-4 text-accent flex-shrink-0" />
                            {pick(h, 'label', locale)}{h.value ? ` ${h.value}` : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {rooms.length > 0 && (
                  <div className="flex flex-col gap-3">
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
                    {active.totalAreaM2 != null && (
                      <div className="pt-3 border-t border-border flex justify-between items-center">
                        <span className="text-sm font-medium text-text">{t('projectPage.total')}</span>
                        <span className="text-accent font-medium">{active.totalAreaM2} m²</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 px-2 md:px-6 py-4 flex flex-row justify-end gap-3 pointer-events-none">
                <a
                  href="tel:+38163383393"
                  aria-label="+381 63 383 393"
                  className="group relative inline-flex items-stretch flex-shrink-0 pointer-events-auto shadow-[0_6px_20px_rgba(26,25,21,0.28)]"
                >
                  <span className="absolute inset-0 m-auto w-8 h-8 bg-accent/50 animate-ping [animation-duration:2.5s] pointer-events-none" />
                  <span className="relative inline-flex items-center justify-center px-4 bg-bg border border-accent text-accent transition-all duration-250 group-hover:bg-accent group-hover:text-white">
                    <LuPhone className="w-4 h-4" />
                  </span>
                </a>
                <Link
                  href={href('/contact')}
                  aria-label={t('offer.drawer.requestOffer')}
                  className="btn-primary justify-center pointer-events-auto shadow-[0_6px_20px_rgba(26,25,21,0.28)]"
                  onClick={onClose}
                >
                  <LuMail className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </>
        );

  if (inline) {
    return (
      <div data-lenis-prevent className="relative h-full flex flex-col bg-bg overflow-hidden">
        {panel}
        <ZoomViewer images={zoomImages} index={zoom} onClose={() => setZoom(null)} onSetIndex={setZoom} />
      </div>
    );
  }

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
        {panel}
      </aside>

      <ZoomViewer images={zoomImages} index={zoom} onClose={() => setZoom(null)} onSetIndex={setZoom} />
    </>
  );
};
