'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { LuMapPin } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

// Same box as the map's container, so nothing shifts when the map mounts.
const MapPlaceholder = () => (
  <div
    className="w-full h-[520px] md:h-[600px] border border-border"
    style={{ borderRadius: '2px', backgroundColor: 'var(--color-bg)' }}
    aria-hidden="true"
  />
);

// MapLibre (JS + its CSS) lives in this lazy chunk, so neither ships with the
// initial page — they load only once the section nears the viewport.
const LocationMap = dynamic(() => import('./LocationMap').then((m) => m.LocationMap), {
  ssr: false,
  loading: MapPlaceholder,
});

export const Location = () => {
  const { t } = useI18n();
  const sentinelRef = useRef(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShowMap(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowMap(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-12 md:py-24 bg-bg-alt">
      <div className="safe-zone">

        <div className="section-header" data-reveal>
          <span className="overline"><LuMapPin />{t('location.eyebrow')}</span>
          <h2
            className="text-text"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
          >
            {t('location.title')}
          </h2>
          <p className="text-text-muted font-light mt-4 max-w-lg text-sm leading-relaxed">
            {t('location.text')}
          </p>
        </div>

        <div ref={sentinelRef}>
          {showMap ? <LocationMap /> : <MapPlaceholder />}
        </div>
      </div>
    </section>
  );
};
