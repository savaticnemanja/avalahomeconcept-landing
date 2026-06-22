'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LuChevronRight, LuPhone, LuPause, LuPlay, LuX } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';
import sliderImage1 from '@/assets/slider/slide-1.mov';
import sliderImage2 from '@/assets/slider/slide-2.mov';
import sliderImage3 from '@/assets/slider/slide-3.mov';
import sliderImage4 from '@/assets/slider/slide-4.webp';
import sliderImage5 from '@/assets/slider/slide-5.webp';
import promoVideo from '@/assets/promo/promo.mp4';
import promoPoster from '@/assets/promo/promo-poster.webp';

const slides = [
  { id: 1, type: 'video', src: sliderImage1 },
  { id: 2, type: 'video', src: sliderImage2 },
  { id: 3, type: 'video', src: sliderImage3 },
  { id: 4, type: 'image', src: sliderImage4 },
  { id: 5, type: 'image', src: sliderImage5 },
];

const INTERVAL = 3900;

export const Slider = () => {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPaused(true);
    }
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

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent(p => (p + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);


  return (
    <div className="relative h-screen min-h-[640px] overflow-hidden bg-bg-dark">

{slides.map((slide, i) => (
  <div
    key={slide.id}
    className="absolute inset-0 transition-opacity duration-1000"
    style={{ opacity: i === current ? 1 : 0 }}
  >
    {slide.type === 'video' ? (
      <video
        src={slide.src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    ) : (
      <Image
        src={slide.src}
        alt={`Avala Home Concept — ${t('slider.subtitle')}`}
        fill
        className="object-cover"
        priority={i === 0}
      />
    )}
  </div>
))}

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

      <div className="absolute right-7 bottom-10 z-10 flex flex-col items-end gap-4">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? t('slider.play') : t('slider.pause')}
          className="w-9 h-9 flex items-center justify-center border border-text-light/40 text-text-light/80 hover:border-accent hover:text-text-light transition-colors duration-200"
        >
          {paused ? <LuPlay className="w-4 h-4" /> : <LuPause className="w-4 h-4" />}
        </button>
        <div className="flex items-baseline gap-1.5">
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              color: 'rgba(247,243,236,0.9)',
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            {String(current + 1).padStart(2, '0')}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'rgba(247,243,236,0.3)',
              fontWeight: 300,
            }}
          >
            / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`${t('slider.slideLabel')} ${i + 1}`}
            className="transition-all duration-300"
          >
            <span
              className="block transition-all duration-300"
              style={{
                height: '2px',
                width: i === current ? '28px' : '12px',
                backgroundColor: i === current ? '#C4975A' : 'rgba(247,243,236,0.3)',
              }}
            />
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-text-light/10">
        <div
          key={current}
          style={{
            height: '100%',
            backgroundColor: 'var(--color-accent)',
            width: '0%',
            animation: `slide-progress ${INTERVAL}ms linear forwards`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        />
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
