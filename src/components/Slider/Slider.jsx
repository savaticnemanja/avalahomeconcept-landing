'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LuChevronRight, LuPhone, LuPlay, LuDownload, LuX, LuHardHat } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';
import heroVideo from '@/assets/slider/avala16_9.mp4';
import promoVideo from '@/assets/promo/promo.mp4';
import promoPoster from '@/assets/promo/promo-poster.webp';

const MOBILE_MQ = '(max-width: 767px)';
const GESTURES = ['touchstart', 'touchend', 'click', 'scroll'];

const mobileCta =
  'flex items-center justify-start gap-2.5 min-h-[52px] px-4 py-3 bg-bg-dark text-text-light text-[0.68rem] font-medium tracking-[0.1em] uppercase text-left leading-tight';

export const Slider = () => {
  const { t, href } = useI18n();
  const [videoOpen, setVideoOpen] = useState(false);
  const heroRef = useRef(null);

  // The <video> is server-rendered once (no client-side swap — iOS Safari won't
  // autoplay a video React recreates after hydration). If autoplay is still
  // refused (Low Power Mode, data saver), retry on the first user gesture or
  // when the tab becomes visible.
  useEffect(() => {
    const v = heroRef.current;
    if (!v) return;
    if (window.matchMedia(MOBILE_MQ).matches) v.poster = promoPoster.src;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    const play = () => { if (v.paused) v.play().catch(() => {}); };
    const onVisible = () => { if (document.visibilityState === 'visible') play(); };
    play();
    v.addEventListener('canplay', play);
    v.addEventListener('loadeddata', play);
    for (const e of GESTURES) window.addEventListener(e, play, { passive: true });
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      v.removeEventListener('canplay', play);
      v.removeEventListener('loadeddata', play);
      for (const e of GESTURES) window.removeEventListener(e, play);
      document.removeEventListener('visibilitychange', onVisible);
    };
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
    <div className="relative h-[100svh] md:h-screen min-h-[640px] flex flex-col bg-bg-dark">
      <div className="relative flex-1 overflow-hidden">
      <video
        ref={heroRef}
        className="hero-video absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        {/* On mobile the 16:9 hero leaves big letterbox bars, so use the portrait
            promo clip (the one behind "Pogledaj video") which fills a 9:16 screen. */}
        <source src={promoVideo} type="video/mp4" media={MOBILE_MQ} />
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/85 via-bg-dark/20 to-transparent" />
      <div className="absolute inset-0 bg-bg-dark/15" />

      <div
        className="absolute inset-x-0 bottom-0 z-10 safe-zone pb-8 md:pb-32"
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

      </div>

      {/* Mobile: actions sit in a bar under the video instead of covering it. */}
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
