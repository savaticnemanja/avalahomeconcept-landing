'use client';
import { useEffect, useState } from 'react';
import { LuChevronRight, LuPhone, LuPlay, LuX } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';
import heroVideo from '@/assets/slider/avala16_9.mp4';
import promoVideo from '@/assets/promo/promo.mp4';
import promoPoster from '@/assets/promo/promo-poster.webp';

export const Slider = () => {
  const { t } = useI18n();
  const [videoOpen, setVideoOpen] = useState(false);
  // On mobile the 16:9 hero leaves big letterbox bars, so use the portrait
  // promo clip (the one behind "Pogledaj video") which fills a 9:16 screen.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setVideoOpen(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [videoOpen]);

  return (
    <div className="relative h-screen min-h-[640px] overflow-hidden bg-bg-dark">
      <video
        key={isMobile ? 'mobile' : 'desktop'}
        src={isMobile ? promoVideo : heroVideo}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/85 via-bg-dark/20 to-transparent" />
      <div className="absolute inset-0 bg-bg-dark/15" />

      <div
        className="absolute inset-x-0 bottom-0 z-10 safe-zone pb-24 md:pb-32"
        style={{ animation: 'fade-up 0.8s ease both' }}
      >
        <p
          className="text-accent text-[0.7rem] font-medium tracking-[0.25em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {t('slider.eyebrow')}
        </p>
        <h1
          className="text-text-light mb-6 max-w-2xl"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
            fontWeight: 400,
            lineHeight: 1.04,
          }}
        >
          {t('slider.titleA')}{' '}
          <em>{t('slider.titleEm')}</em>
        </h1>
        <p
          className="text-text-light/65 mb-10 font-light"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}
        >
          {t('slider.subtitle')}
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="tel:+38163383393" className="btn-primary group">
            <LuPhone className="w-4 h-4" />
            {t('slider.callUs')}
            <span className="btn-arrow"><LuChevronRight className="w-4 h-4" /></span>
          </a>
          <button type="button" onClick={() => setVideoOpen(true)} className="btn-outline-light group">
            <LuPlay className="w-4 h-4" />
            {t('slider.watchVideo')}
            <span className="btn-arrow"><LuChevronRight className="w-4 h-4" /></span>
          </button>
        </div>
      </div>

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark/95 p-4 md:p-8"
          style={{ animation: 'fade-up 0.3s ease both' }}
          onClick={() => setVideoOpen(false)}
        >
          <button
            type="button"
            onClick={() => setVideoOpen(false)}
            aria-label={t('slider.closeVideo')}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-text-light/40 text-text-light/80 transition-colors duration-200 hover:border-accent hover:text-text-light"
          >
            <LuX className="h-5 w-5" />
          </button>
          <video
            src={promoVideo}
            poster={promoPoster}
            className="max-h-full max-w-full object-contain shadow-2xl"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
