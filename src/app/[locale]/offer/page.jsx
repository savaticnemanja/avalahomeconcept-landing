'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight, LuBed, LuMaximize2, LuSunrise, LuMousePointerClick, LuMap, LuHouse } from 'react-icons/lu';
import { ProjectDrawer } from '@/components';
import { projects } from '@/lib/projects';
import sitePlanImage from '@/assets/gallery/gallery-23.webp';
import { useI18n } from '@/i18n/I18nProvider';

const SitePlanPin = ({ project, title, t, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={title}
    className="absolute group/pin -translate-x-1/2 -translate-y-1/2 z-10"
    style={{ top: project.pin.top, left: project.pin.left }}
  >
    <span className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-accent/50 animate-ping" />
    <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-accent-strong text-white border-2 border-white shadow-[0_3px_10px_rgba(26,25,21,0.45)] transition-transform duration-200 group-hover/pin:scale-110">
      <span className="text-[0.72rem] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
        {project.cardIndex + 1}
      </span>
    </span>
    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap opacity-0 translate-y-1 group-hover/pin:opacity-100 group-hover/pin:translate-y-0 group-focus-visible/pin:opacity-100 transition-all duration-200">
      <span className="block bg-bg-dark text-text-light px-3.5 py-2 rounded-[4px] shadow-[0_8px_24px_rgba(26,25,21,0.35)]">
        <span className="block text-sm leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {title}
        </span>
        <span className="block text-accent-strong text-[0.72rem] font-medium tracking-[0.05em]" style={{ fontFamily: 'var(--font-body)' }}>
          {project.area} m²
        </span>
      </span>
      <span className="block w-2.5 h-2.5 bg-bg-dark rotate-45 mx-auto -mt-1.5" />
    </span>
  </button>
);

const OfferCard = ({ project, title, t, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    className="card group flex flex-col text-left w-full"
    aria-label={title}
  >
    <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
      <Image
        src={project.cardImage}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <span
        className="absolute top-4 left-4 px-3 py-1 text-[0.68rem] font-medium tracking-[0.15em] uppercase text-white"
        style={{ backgroundColor: 'rgba(138,101,38,0.95)', fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)' }}
      >
        {t(`offer.cards.${project.cardIndex}.badge`)}
      </span>
    </div>

    <div className="p-5 md:p-7 flex flex-col gap-4 md:gap-5 flex-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-text-muted text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t(`offer.cards.${project.cardIndex}.subtitle`)}
          </p>
          <h3 className="text-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 400 }}>
            {title}
          </h3>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-accent-strong" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 400, lineHeight: 1 }}>
            {project.area}
          </span>
          <span className="text-text-muted text-sm block">m²</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 py-4 border-y border-border">
        <span className="flex items-center gap-2 text-sm font-light text-text-muted">
          <LuBed className="w-4 h-4 text-accent-strong" />
          {project.beds} {t('offer.rooms')}
        </span>
        {project.terrace && (
          <span className="flex items-center gap-2 text-sm font-light text-text-muted">
            <LuSunrise className="w-4 h-4 text-accent-strong" />
            {t('offer.terrace')} {project.terrace}
          </span>
        )}
        <span className="flex items-center gap-2 text-sm font-light text-text-muted">
          <LuMaximize2 className="w-4 h-4 text-accent-strong" />
          {project.area} m²
        </span>
      </div>

      <ul className="flex flex-col gap-2 flex-1">
        {[0, 1, 2].map((h) => (
          <li key={h} className="flex items-center gap-2.5 text-sm font-light text-text-muted">
            <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
            {t(`offer.cards.${project.cardIndex}.highlights.${h}`)}
          </li>
        ))}
      </ul>

      <span
        className="flex items-center justify-between text-sm font-medium text-accent-strong mt-1"
        style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}
      >
        {t('offer.viewDetails')}
        <span className="btn-arrow flex items-center">
          <LuArrowRight className="w-4 h-4" />
        </span>
      </span>
    </div>
  </button>
);

export default function OfferPage() {
  const { t, dict, href } = useI18n();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const openFromHash = () => {
      const key = window.location.hash.replace('#', '');
      const match = projects.find((p) => p.key === key);
      if (match) setSelected(match);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const openProject = (p) => {
    setSelected(p);
    window.history.replaceState(null, '', `#${p.key}`);
  };

  const closeProject = () => {
    setSelected(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  return (
    <main className="pt-20">
      <section className="py-12 md:py-16 bg-bg">
        <div className="safe-zone">
          <div className="mb-8 md:mb-12">
            <span className="overline"><LuHouse />{t('offer.eyebrow')}</span>
            <h1
              className="text-text leading-tight"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400 }}
            >
              {t('nav.offer')}
            </h1>
          </div>

          <div>
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <span className="overline"><LuMap />{t('offer.sitePlan.eyebrow')}</span>
                <h2
                  className="text-text"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem,2.6vw,2.1rem)', fontWeight: 400 }}
                >
                  {t('offer.sitePlan.title')}
                </h2>
              </div>
              <span className="hidden sm:flex items-center gap-2 text-sm font-light text-text-muted">
                <LuMousePointerClick className="w-4 h-4 text-accent-strong" />
                {t('offer.sitePlan.hint')}
              </span>
            </div>

            <div className="relative rounded-[6px] overflow-hidden border border-border shadow-[0_12px_40px_rgba(26,25,21,0.12)] ring-1 ring-accent/10">
              <Image
                src={sitePlanImage}
                alt={t('offer.sitePlan.title')}
                className="w-full h-auto select-none"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/30 via-transparent to-bg-dark/10 pointer-events-none" />

              {projects.map((p) => (
                <SitePlanPin
                  key={p.key}
                  project={p}
                  title={dict.projects[p.dictKey].title}
                  t={t}
                  onOpen={() => openProject(p)}
                />
              ))}

              <span className="sm:hidden absolute bottom-3 left-3 flex items-center gap-2 bg-bg-dark/80 backdrop-blur-sm text-text-light text-[0.72rem] font-light px-3 py-1.5 rounded-full">
                <LuMousePointerClick className="w-3.5 h-3.5 text-accent-strong" />
                {t('offer.sitePlan.hint')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-12">
            {projects.map((p) => (
              <OfferCard
                key={p.key}
                project={p}
                title={dict.projects[p.dictKey].title}
                t={t}
                onOpen={() => openProject(p)}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="py-8 md:py-16 bg-bg border-t border-border">
        <div className="safe-zone flex flex-col sm:flex-row items-center justify-between gap-6">
          <p
            className="text-text italic"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', fontWeight: 400 }}
          >
            {t('midCta.text')}
          </p>
          <Link href={href('/contact')} className="btn-primary group flex-shrink-0">
            {t('midCta.requestOffer')}
            <span className="btn-arrow flex items-center"><LuArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>

      <ProjectDrawer project={selected} onClose={closeProject} />
    </main>
  );
}
