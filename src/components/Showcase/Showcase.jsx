'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import priroda from '@/assets/showcase/nature.webp';
import {
  LuMapPin,
  LuBuilding2,
  LuBrickWall,
  LuGrid3X3,
  LuWaves,
  LuSquareParking,
  LuAppWindow,
  LuSprout,
  LuLock,
  LuWifi,
  LuRows3,
  LuThermometerSun,
  LuHousePlus,
  LuSparkles,
} from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

// Icons only — order matches dict.showcase.benefits
const benefitIcons = [
  LuMapPin,
  LuBuilding2,
  LuBrickWall,
  LuGrid3X3,
  LuWaves,
  LuSquareParking,
  LuAppWindow,
  LuSprout,
  LuLock,
  LuWifi,
  LuRows3,
  LuThermometerSun,
  LuHousePlus,
];

export const Showcase = () => {
  const { t, href } = useI18n();
  const benefits = benefitIcons.map((icon, i) => ({ icon, title: t(`showcase.benefits.${i}`) }));

  const listRef = useRef(null);
  const [activeCount, setActiveCount] = useState(0);

  // Scroll-driven cascade: as the benefits list travels through the viewport,
  // highlight each item one after another in order.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveCount(benefits.length);
      return;
    }

    let raf = null;
    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the list top reaches 60% down the viewport, 1 once it has scrolled up past it.
      const progress = Math.min(Math.max((vh * 0.6 - rect.top) / rect.height, 0), 1);
      setActiveCount(Math.round(progress * benefits.length));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [benefits.length]);

  return (
  <section
    className="relative py-20 md:py-32 overflow-hidden bg-bg-dark"
    style={{
      backgroundImage: `url(${priroda.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}
  >
    {/* Tamni overlay radi čitljivosti */}
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(180deg, rgba(20,28,22,0.82) 0%, rgba(20,28,22,0.72) 50%, rgba(20,28,22,0.86) 100%)' }}
      aria-hidden="true"
    />

    <div className="relative safe-zone flex flex-col items-center">

      {/* Naslov */}
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16" data-reveal>
        <span className="overline"><LuSparkles />{t('showcase.eyebrow')}</span>
        <h2
          className="text-text-light"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 400, lineHeight: 1.1 }}
        >
          {t('showcase.titleA')}{' '}
          <em>{t('showcase.titleEm')}</em>
        </h2>
      </div>

      {/* Lista pogodnosti */}
      <ul
        ref={listRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 w-full max-w-5xl"
        data-reveal
      >
        {benefits.map(({ title, icon: Icon }, i) => {
          const active = i < activeCount;
          return (
          <li
            key={i}
            className={`flex items-center gap-4 group p-4 rounded-[2px] border backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-white/[0.1] hover:-translate-y-0.5 ${active ? 'border-accent bg-white/[0.1] -translate-y-0.5' : 'border-white/15 bg-white/[0.06]'}`}
          >
            <span className={`flex-shrink-0 w-11 h-11 flex items-center justify-center border rounded-[2px] transition-all duration-300 group-hover:border-accent group-hover:bg-accent-strong group-hover:text-white ${active ? 'border-accent bg-accent-strong text-white' : 'border-white/25 text-accent-strong'}`}>
              <Icon className="w-5 h-5" />
            </span>
            <span
              className="text-text-light leading-snug"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 300 }}
            >
              {title}
            </span>
          </li>
          );
        })}
      </ul>

      <Link
        href={href('/contact')}
        className={`btn-primary group mt-12 md:mt-16 transition-transform duration-500 ${activeCount >= benefits.length ? 'cta-pulse' : ''}`}
      >
        {t('showcase.requestOffer')}
        <span className="btn-arrow"><svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg></span>
      </Link>

    </div>
    </section>
  );
};
