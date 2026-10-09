'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LuChevronRight, LuPhone, LuPlay, LuDownload, LuX, LuHardHat } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';
import hero1 from '@/assets/slider/hero-1.webp';
import hero1Mobile from '@/assets/slider/hero-1-mobile.webp';
import hero2 from '@/assets/slider/hero-2.webp';
import hero2Mobile from '@/assets/slider/hero-2-mobile.webp';
import hero3 from '@/assets/slider/hero-3.webp';
import hero3Mobile from '@/assets/slider/hero-3-mobile.webp';
import hero4 from '@/assets/slider/hero-4.webp';
import hero4Mobile from '@/assets/slider/hero-4-mobile.webp';
import hero5 from '@/assets/slider/hero-5.webp';
import hero5Mobile from '@/assets/slider/hero-5-mobile.webp';
import promoVideo from '@/assets/promo/promo.mp4';
import promoPoster from '@/assets/promo/promo-poster.webp';

const MOBILE_MQ = '(max-width: 767px)';

// Mobile files are portrait crops around each render's focal point, so a phone
// screen isn't just the middle third of a landscape image. `kb` picks the Ken
// Burns move (see .hero-kb-* in globals.css), alternating zoom in / zoom out.
const SLIDES = [
  { desktop: hero1, mobile: hero1Mobile, kb: 'hero-kb-1' },
  { desktop: hero2, mobile: hero2Mobile, kb: 'hero-kb-2' },
  { desktop: hero3, mobile: hero3Mobile, kb: 'hero-kb-3' },
  { desktop: hero4, mobile: hero4Mobile, kb: 'hero-kb-4' },
  { desktop: hero5, mobile: hero5Mobile, kb: 'hero-kb-2' },
];
const SLIDE_MS = 6500; // keep in sync with --hero-slide-ms in globals.css

const mobileCta =
  'flex items-center justify-start gap-2.5 min-h-[52px] px-4 py-3 bg-bg-dark text-text-light text-[0.68rem] font-medium tracking-[0.1em] uppercase text-left leading-tight';

export const Slider = () => {
  const { t, href } = useI18n();
  const [videoOpen, setVideoOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(null);
  // Only the first slide is in the server HTML (it is the LCP image); the rest
  // mount after the page's load event so they never compete with it.
  const [showAll, setShowAll] = useState(false);
  const loaded = useRef(new Set([0]));

  useEffect(() => {
    const go = () => setShowAll(true);
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => window.removeEventListener('load', go);
  }, []);

  const goTo = (i) => {
    if (i === active) return;
    setLeaving(active);
    setActive(i);
  };

  useEffect(() => {
    if (!showAll) return;
    let timer;
    const tick = () => {
      const next = (active + 1) % SLIDES.length;
      // Hold the current slide while the tab is hidden or the next image is
      // still downloading, rather than fading to an empty frame.
      if (document.hidden || !loaded.current.has(next)) timer = setTimeout(tick, 500);
      else goTo(next);
    };
    timer = setTimeout(tick, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, showAll]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <div className="relative h-[100svh] md:h-screen min-h-[640px] flex flex-col bg-bg-dark">
      <div className="relative flex-1 overflow-hidden">
      {/* `isolate` keeps the slides' crossfade z-indexes below the overlays. */}
      <div className="absolute inset-0 isolate">
      {SLIDES.map((slide, i) => (i === 0 || showAll) && (
        <picture
          key={i}
          className={`hero-slide ${slide.kb}${i === active ? ' is-active' : ''}${i === leaving ? ' is-leaving' : ''}`}
        >
          <source srcSet={slide.mobile.src} media={MOBILE_MQ} />
          <img
            src={slide.desktop.src}
            alt=""
            aria-hidden="true"
            fetchPriority={i === 0 ? 'high' : 'low'}
            decoding="async"
            onLoad={() => loaded.current.add(i)}
          />
        </picture>
      ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/85 via-bg-dark/20 to-transparent" />
      <div className="absolute inset-0 bg-bg-dark/15" />

      <div
        className="absolute inset-x-0 bottom-0 z-10 safe-zone pb-12 md:pb-32"
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
          className="text-text-light/65 md:mb-10 font-light"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}
        >
          {t('slider.subtitle')}
        </p>
        <div className="hidden md:flex flex-wrap gap-4">
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
          <a href="/brosura.pdf" download className="btn-outline-light group">
            <LuDownload className="w-4 h-4" />
            {t('slider.brochure')}
            <span className="btn-arrow"><LuChevronRight className="w-4 h-4" /></span>
          </a>
          <Link href={href('/gallery?tab=progress')} className="btn-outline-light group">
            <LuHardHat className="w-4 h-4" />
            {t('gallery.tabs.progress')}
            <span className="btn-arrow"><LuChevronRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-2 md:bottom-12 z-10 safe-zone flex gap-1 md:gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => showAll && goTo(i)}
            aria-label={`${t('slider.showSlide')} ${i + 1}`}
            aria-current={i === active}
            className="group py-3 px-0.5"
          >
            <span className="block relative h-[2px] w-8 md:w-12 overflow-hidden bg-text-light/30 transition-colors group-hover:bg-text-light/50">
              {i === active && showAll && <span key={active} className="hero-progress absolute inset-0 bg-accent" />}
              {i < active && <span className="absolute inset-0 bg-text-light/70" />}
            </span>
          </button>
        ))}
      </div>

      </div>

      {/* Mobile: actions sit in a bar under the slideshow instead of covering it. */}
      <div className="md:hidden grid grid-cols-2 gap-px bg-text-light/10 border-t border-text-light/10">
        <a href="tel:+38163383393" className={mobileCta}>
          <LuPhone className="w-4 h-4 flex-shrink-0 text-accent" />
          {t('slider.callUs')}
        </a>
        <button type="button" onClick={() => setVideoOpen(true)} className={mobileCta}>
          <LuPlay className="w-4 h-4 flex-shrink-0 text-accent" />
          {t('slider.watchVideo')}
        </button>
        <a href="/brosura.pdf" download className={mobileCta}>
          <LuDownload className="w-4 h-4 flex-shrink-0 text-accent" />
          {t('slider.brochure')}
        </a>
        <Link href={href('/gallery?tab=progress')} className={mobileCta}>
          <LuHardHat className="w-4 h-4 flex-shrink-0 text-accent" />
          {t('gallery.tabs.progress')}
        </Link>
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
            poster={promoPoster.src}
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
