'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import * as LuIcons from 'react-icons/lu';
import { LuArrowRight, LuMap, LuList } from 'react-icons/lu';
import { ProjectDrawer } from '@/components';
import { useI18n } from '@/i18n/I18nProvider';
import { imageUrl } from '@/lib/imageUrl';
import { pick } from '@/lib/localize';
import sitePlanImage from '@/assets/offer/complex-aerial.webp';

const Hl = ({ name, className }) => {
  const Cmp = LuIcons[name] ?? LuIcons.LuDot;
  return <Cmp className={className} />;
};

const openOrNavigate = (onOpen) => (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
  e.preventDefault();
  onOpen();
};

const coverOf = (project) => {
  const cover = project.images.find((i) => i.filename === project.coverFilename);
  return (cover ?? project.images[0])?.filename ?? null;
};

// The next image after the cover, revealed on hover.
const secondOf = (project) => {
  const rest = project.images.filter((i) => i.filename !== project.coverFilename);
  return rest[0]?.filename ?? null;
};

const SitePlanPin = ({ project, title, to, onOpen, isActive }) => {
  if (!project.sitePlanTop || !project.sitePlanLeft) return null;
  return (
    <Link
      href={to}
      onClick={openOrNavigate(onOpen)}
      aria-label={title}
      className="absolute group/pin -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ top: project.sitePlanTop, left: project.sitePlanLeft }}
    >
      {isActive && (
        <span className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-accent/35 animate-ping" />
      )}
      <span
        className={`relative flex items-center justify-center rounded-full text-white border-2 border-white shadow-[0_3px_14px_rgba(26,25,21,0.5)] transition-all duration-300 ${
          isActive
            ? 'w-11 h-11 bg-accent ring-4 ring-accent/30'
            : 'w-8 h-8 bg-accent/65 group-hover/pin:bg-accent group-hover/pin:scale-110'
        }`}
      >
        <span className="text-[0.72rem] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
          {project.order + 1}
        </span>
      </span>
      <span
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap transition-all duration-200 ${
          isActive
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1 group-hover/pin:opacity-100 group-hover/pin:translate-y-0 group-focus-visible/pin:opacity-100'
        }`}
      >
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

const CatalogCard = ({ project, locale, t, isActive, onHover, to, onOpen }) => {
  const title = pick(project, 'title', locale);
  const subtitle = pick(project, 'subtitle', locale);
  const badge = pick(project, 'badge', locale);
  const cover = coverOf(project);
  const second = secondOf(project);

  return (
    <Link
      href={to}
      onClick={openOrNavigate(onOpen)}
      onMouseEnter={onHover}
      data-project-id={project.id}
      aria-label={title}
      className={`group block shrink-0 rounded-[6px] overflow-hidden border transition-all duration-200 ${
        isActive ? 'bg-bg-alt border-accent ring-1 ring-accent shadow-sm' : 'border-border hover:bg-bg-alt/60 hover:border-accent/40'
      }`}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl(cover)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-bg-alt" />
        )}
        {second && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl(second)}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            loading="lazy"
          />
        )}
        <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-semibold shadow">
          {project.order + 1}
        </span>
        {badge && (
          <span
            className="absolute top-3 right-3 px-2.5 py-0.5 text-[0.62rem] font-medium tracking-[0.15em] uppercase text-white"
            style={{ backgroundColor: 'rgba(196,151,90,0.92)', fontFamily: 'var(--font-body)' }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {subtitle && (
              <p className="text-text-muted text-[0.62rem] font-medium tracking-[0.15em] uppercase mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                {subtitle}
              </p>
            )}
            <h3 className="text-text leading-snug" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 400 }}>
              {title}
            </h3>
          </div>
          {project.totalAreaM2 != null && (
            <div className="text-right flex-shrink-0">
              <span className="text-accent" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 400, lineHeight: 1 }}>
                {project.totalAreaM2}
              </span>
              <span className="block text-text-muted text-xs">m²</span>
            </div>
          )}
        </div>

        {project.highlights.length > 0 && (
          <ul className="flex flex-wrap gap-x-3 gap-y-1 py-2 border-t border-border">
            {project.highlights.slice(0, 4).map((h) => (
              <li key={h.id} className="flex items-center gap-1 text-[0.7rem] text-text-muted">
                <Hl name={h.icon} className="w-3 h-3 text-accent flex-shrink-0" />
                {pick(h, 'label', locale)}{h.value ? ` ${h.value}` : ''}
              </li>
            ))}
          </ul>
        )}

        <span className="flex items-center gap-1 text-xs text-accent font-medium" style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}>
          {t('offer.viewDetails')}
          <LuArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
};

const MapPanel = ({ projects, locale, href, activeId, openProject }) => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-bg-alt">
    {/* The plan is stretched to fill the panel (object-fill). Because object-fill
        maps image content-% linearly onto the box, a pin placed at top/left-% in
        the admin (where the image is shown at its natural ratio) lands on the same
        spot here regardless of the panel's aspect ratio. Do NOT use object-contain:
        the letterbox gaps would shift the pins relative to the image. */}
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sitePlanImage.src}
        alt="Plan lokacije"
        className="block w-full h-full object-fill"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/25 via-transparent to-bg-dark/10 pointer-events-none" />
      {projects.map((p) => (
        <SitePlanPin
          key={p.id}
          project={p}
          title={pick(p, 'title', locale)}
          to={href(`/offer/${p.slug}`)}
          onOpen={() => openProject(p)}
          isActive={activeId === p.id}
        />
      ))}
    </div>
  </div>
);

const setupIO = (root, onActive) => {
  if (!root) return () => {};
  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) onActive(Number(visible[0].target.dataset.projectId));
    },
    { root, threshold: [0.3, 0.5, 0.7] },
  );
  root.querySelectorAll('[data-project-id]').forEach((el) => obs.observe(el));
  return () => obs.disconnect();
};

export default function OfferClient({ projects }) {
  const { t, locale, href } = useI18n();
  const [selected, setSelected] = useState(null);
  const [activeId, setActiveId] = useState(projects[0]?.id ?? null);
  const [mobileView, setMobileView] = useState('map');
  const [isDesktop, setIsDesktop] = useState(false);
  const catalogRef = useRef(null);
  const mobileCatalogRef = useRef(null);
  const basePath = href('/offer');

  // Desktop docks the detail panel inline (always open); mobile uses the modal
  // drawer. Gate which one mounts so their effects (body-lock etc.) don't clash.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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

  const openProject = useCallback((p) => {
    const url = `${basePath}/${p.slug}`;
    if (selected) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
    setSelected(p);
  }, [selected, basePath]);

  const closeProject = () => {
    if (window.location.pathname.replace(/\/$/, '') !== basePath) {
      window.history.back();
    } else {
      setSelected(null);
    }
  };

  // Keep the highlighted pin/card in sync with the open project (click, deep
  // link, back/forward), not just with scroll/hover.
  useEffect(() => {
    if (selected) setActiveId(selected.id);
  }, [selected]);

  useEffect(() => setupIO(catalogRef.current, setActiveId), [projects]);

  useEffect(() => {
    if (mobileView !== 'list') return;
    return setupIO(mobileCatalogRef.current, setActiveId);
  }, [projects, mobileView]);

  const catalogCards = projects.map((p) => (
    <CatalogCard
      key={p.id}
      project={p}
      locale={locale}
      t={t}
      isActive={activeId === p.id}
      onHover={() => setActiveId(p.id)}
      to={href(`/offer/${p.slug}`)}
      onOpen={() => openProject(p)}
    />
  ));

  const mapPanel = (
    <MapPanel
      projects={projects}
      locale={locale}
      href={href}
      activeId={activeId}
      openProject={openProject}
    />
  );

  return (
    <>
      <div
        className="lg:hidden flex flex-col"
        style={{ marginTop: '5rem', height: 'calc(100vh - 5rem)' }}
      >
        <div className="flex-1 relative overflow-hidden">
          {mobileView === 'map' ? (
            <div className="absolute inset-0">{mapPanel}</div>
          ) : (
            <div ref={mobileCatalogRef} className="absolute inset-0 overflow-y-auto bg-bg p-3 pb-24 flex flex-col gap-3">
              {catalogCards}
            </div>
          )}

          {/* Floating view toggle — icons only, no bar, right side. */}
          <div className="absolute right-4 bottom-4 z-20 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setMobileView('map')}
              aria-label={t('offer.mapView')}
              aria-pressed={mobileView === 'map'}
              className={`w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-sm shadow-[0_2px_12px_rgba(26,25,21,0.3)] transition-colors duration-150 ${
                mobileView === 'map' ? 'bg-accent text-white' : 'bg-bg-dark/45 text-white'
              }`}
            >
              <LuMap className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileView('list')}
              aria-label={t('offer.listView')}
              aria-pressed={mobileView === 'list'}
              className={`w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-sm shadow-[0_2px_12px_rgba(26,25,21,0.3)] transition-colors duration-150 ${
                mobileView === 'list' ? 'bg-accent text-white' : 'bg-bg-dark/45 text-white'
              }`}
            >
              <LuList className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isDesktop && <ProjectDrawer project={selected} onClose={closeProject} />}
      </div>

      <div className="hidden lg:flex" style={{ marginTop: '5rem', height: 'calc(100vh - 5rem)' }}>
        <div
          ref={catalogRef}
          data-lenis-prevent
          className="w-[380px] xl:w-[440px] flex-shrink-0 overflow-y-auto border-r border-border bg-bg p-4 flex flex-col gap-4"
        >
          {catalogCards}
        </div>
        <div className="flex-1 relative min-w-0">
          {mapPanel}
        </div>
        <div className="w-[480px] xl:w-[600px] flex-shrink-0 border-l border-border bg-bg">
          {isDesktop && <ProjectDrawer project={selected ?? projects[0] ?? null} inline />}
        </div>
      </div>
    </>
  );
}
