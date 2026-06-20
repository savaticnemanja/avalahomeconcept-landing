'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as LuIcons from 'react-icons/lu';
import { LuArrowRight, LuMousePointerClick, LuMap, LuHouse } from 'react-icons/lu';
import { ProjectDrawer } from '@/components';
import { useI18n } from '@/i18n/I18nProvider';
import { imageUrl } from '@/lib/imageUrl';
import { pick } from '@/lib/localize';
import sitePlanImage from '@/assets/gallery/gallery-23.webp';

const Hl = ({ name, className }) => {
  const Cmp = LuIcons[name] ?? LuIcons.LuDot;
  return <Cmp className={className} />;
};

// Cards/pins are real links to the project page (crawlable, OG-shareable),
// but a plain click opens the drawer instead of navigating. Modifier- or
// middle-clicks fall through so "open in new tab" still works.
const openOrNavigate = (onOpen) => (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
  e.preventDefault();
  onOpen();
};

const coverOf = (project) => {
  const cover = project.images.find((i) => i.filename === project.coverFilename);
  return (cover ?? project.images[0])?.filename ?? null;
};

const SitePlanPin = ({ project, title, to, onOpen }) => {
  if (!project.sitePlanTop || !project.sitePlanLeft) return null;
  return (
    <Link
      href={to}
      onClick={openOrNavigate(onOpen)}
      aria-label={title}
      className="absolute group/pin -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ top: project.sitePlanTop, left: project.sitePlanLeft }}
    >
      <span className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-accent/50 animate-ping" />
      <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white border-2 border-white shadow-[0_3px_10px_rgba(26,25,21,0.45)] transition-transform duration-200 group-hover/pin:scale-110">
        <span className="text-[0.72rem] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
          {project.order + 1}
        </span>
      </span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap opacity-0 translate-y-1 group-hover/pin:opacity-100 group-hover/pin:translate-y-0 group-focus-visible/pin:opacity-100 transition-all duration-200">
        <span className="block bg-bg-dark text-text-light px-3.5 py-2 rounded-[4px] shadow-[0_8px_24px_rgba(26,25,21,0.35)]">
          <span className="block text-sm leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {title}
          </span>
          {project.totalAreaM2 != null && (
            <span className="block text-accent text-[0.72rem] font-medium tracking-[0.05em]" style={{ fontFamily: 'var(--font-body)' }}>
              {project.totalAreaM2} m²
            </span>
          )}
        </span>
        <span className="block w-2.5 h-2.5 bg-bg-dark rotate-45 mx-auto -mt-1.5" />
      </span>
    </Link>
  );
};

const OfferCard = ({ project, locale, t, to, onOpen }) => {
  const title = pick(project, 'title', locale);
  const subtitle = pick(project, 'subtitle', locale);
  const badge = pick(project, 'badge', locale);
  const cover = coverOf(project);

  return (
    <Link href={to} onClick={openOrNavigate(onOpen)} className="card group flex flex-col text-left w-full" aria-label={title}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl(cover)}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}
        {badge && (
          <span
            className="absolute top-4 left-4 px-3 py-1 text-[0.68rem] font-medium tracking-[0.15em] uppercase text-white"
            style={{ backgroundColor: 'rgba(196,151,90,0.92)', fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)' }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="p-5 md:p-7 flex flex-col gap-4 md:gap-5 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            {subtitle && (
              <p className="text-text-muted text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                {subtitle}
              </p>
            )}
            <h3 className="text-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 400 }}>
              {title}
            </h3>
          </div>
          {project.totalAreaM2 != null && (
            <div className="text-right flex-shrink-0">
              <span className="text-accent" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 400, lineHeight: 1 }}>
                {project.totalAreaM2}
              </span>
              <span className="text-text-muted text-sm block">m²</span>
            </div>
          )}
        </div>

        {project.highlights.length > 0 && (
          <ul className="flex flex-col gap-2 flex-1 py-4 border-y border-border">
            {project.highlights.map((h) => (
              <li key={h.id} className="flex items-center gap-2.5 text-sm font-light text-text-muted">
                <Hl name={h.icon} className="w-4 h-4 text-accent flex-shrink-0" />
                {pick(h, 'label', locale)}{h.value ? ` ${h.value}` : ''}
              </li>
            ))}
          </ul>
        )}

        <span className="flex items-center justify-between text-sm font-medium text-accent mt-1" style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}>
          {t('offer.viewDetails')}
          <span className="btn-arrow flex items-center">
            <LuArrowRight className="w-4 h-4" />
          </span>
        </span>
      </div>
    </Link>
  );
};

export default function OfferClient({ projects }) {
  const { t, locale, href } = useI18n();
  const [selected, setSelected] = useState(null);
  const basePath = href('/offer'); // e.g. "/sr/offer"

  // Keep the drawer in sync with the address bar so the back/forward buttons
  // work and the URL is the real, shareable project path (not a #hash).
  useEffect(() => {
    const syncFromPath = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      const slug = path.startsWith(`${basePath}/`) ? path.slice(basePath.length + 1) : '';
      setSelected(projects.find((p) => p.slug === slug) ?? null);
    };
    syncFromPath();
    window.addEventListener('popstate', syncFromPath);
    return () => window.removeEventListener('popstate', syncFromPath);
  }, [projects, basePath]);

  const openProject = (p) => {
    const url = `${basePath}/${p.slug}`;
    // Switching between projects shouldn't stack history entries.
    if (selected) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
    setSelected(p);
  };

  const closeProject = () => {
    // Pop the entry we pushed so Back behaves naturally; popstate closes the drawer.
    if (window.location.pathname.replace(/\/$/, '') !== basePath) {
      window.history.back();
    } else {
      setSelected(null);
    }
  };

  return (
    <main className="pt-20">
      <section className="py-12 md:py-16 bg-bg">
        <div className="safe-zone">
          <div className="mb-8 md:mb-12">
            <span className="overline"><LuHouse />{t('offer.eyebrow')}</span>
            <h1 className="text-text leading-tight" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400 }}>
              {t('nav.offer')}
            </h1>
          </div>

          <div>
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <span className="overline"><LuMap />{t('offer.sitePlan.eyebrow')}</span>
                <h2 className="text-text" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem,2.6vw,2.1rem)', fontWeight: 400 }}>
                  {t('offer.sitePlan.title')}
                </h2>
              </div>
              <span className="hidden sm:flex items-center gap-2 text-sm font-light text-text-muted">
                <LuMousePointerClick className="w-4 h-4 text-accent" />
                {t('offer.sitePlan.hint')}
              </span>
            </div>

            <div className="relative rounded-[6px] overflow-hidden border border-border shadow-[0_12px_40px_rgba(26,25,21,0.12)] ring-1 ring-accent/10">
              <Image src={sitePlanImage} alt={t('offer.sitePlan.title')} className="w-full h-auto select-none" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/30 via-transparent to-bg-dark/10 pointer-events-none" />

              {projects.map((p) => (
                <SitePlanPin key={p.id} project={p} title={pick(p, 'title', locale)} to={href(`/offer/${p.slug}`)} onOpen={() => openProject(p)} />
              ))}

              <span className="sm:hidden absolute bottom-3 left-3 flex items-center gap-2 bg-bg-dark/80 backdrop-blur-sm text-text-light text-[0.72rem] font-light px-3 py-1.5 rounded-full">
                <LuMousePointerClick className="w-3.5 h-3.5 text-accent" />
                {t('offer.sitePlan.hint')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-12">
            {projects.map((p) => (
              <OfferCard key={p.id} project={p} locale={locale} t={t} to={href(`/offer/${p.slug}`)} onOpen={() => openProject(p)} />
            ))}
          </div>
        </div>
      </section>

      <div className="py-8 md:py-16 bg-bg border-t border-border">
        <div className="safe-zone flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-text italic" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', fontWeight: 400 }}>
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
