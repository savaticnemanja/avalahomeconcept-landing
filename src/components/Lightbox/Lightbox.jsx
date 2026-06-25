'use client';
import { useCallback, useEffect, useRef } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

export const Lightbox = ({ images, activeIndex, onClose, onSetIndex }) => {
  const { t } = useI18n();
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);

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

  useEffect(() => {
    if (activeIndex === null) return;
    restoreFocusRef.current = document.activeElement;
    closeRef.current?.focus();
    return () => {
      if (restoreFocusRef.current instanceof HTMLElement) restoreFocusRef.current.focus();
    };
  }, [activeIndex]);

  if (activeIndex === null) return null;

  const { src, alt, kind, poster } = images[activeIndex];
  const imgSrc = typeof src === 'string' ? src : src.src;
  const isVideo = kind === 'video';

  return (
    <div
      className="fixed inset-0 z-50 bg-bg-dark/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        ref={closeRef}
        className="absolute top-4 right-4 text-text-light text-3xl leading-none hover:text-accent transition-colors"
        onClick={onClose}
        aria-label={t('offer.drawer.close', 'Close')}
      >
        &#x2715;
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label={t('gallery.prev', 'Previous')}
      >
        &#8249;
      </button>
      {kind === 'youtube' ? (
        <div
          className="relative w-[90vw] max-w-5xl aspect-video"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`${imgSrc}${imgSrc.includes('?') ? '&' : '?'}autoplay=1`}
            title={alt}
            className="absolute inset-0 w-full h-full rounded-[4px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : isVideo ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={imgSrc}
          poster={poster || undefined}
          controls
          autoPlay
          playsInline
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-[4px]"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-[4px]"
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label={t('gallery.next', 'Next')}
      >
        &#8250;
      </button>
    </div>
  );
};
