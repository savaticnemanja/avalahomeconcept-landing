'use client';
import { useCallback, useEffect } from 'react';

export const Lightbox = ({ images, activeIndex, onClose, onSetIndex }) => {
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

  if (activeIndex === null) return null;

  const { src, alt } = images[activeIndex];
  const imgSrc = typeof src === 'string' ? src : src.src;

  return (
    <div
      className="fixed inset-0 z-50 bg-bg-dark/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-text-light text-3xl leading-none hover:text-accent transition-colors"
        onClick={onClose}
        aria-label="Zatvori"
      >
        &#x2715;
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Sledeća"
      >
        &#8250;
      </button>
    </div>
  );
};
