'use client';
import Link from 'next/link';
import * as LuIcons from 'react-icons/lu';
import { LuArrowRight, LuHouse, LuChevronsRight } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';
import { imageUrl } from '@/lib/imageUrl';
import { pick } from '@/lib/localize';

const Hl = ({ name, className }) => {
  const Cmp = LuIcons[name] ?? LuIcons.LuDot;
  return <Cmp className={className} />;
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

const ProjectCard = ({ project, locale, t, href }) => {
  const title = pick(project, 'title', locale);
  const subtitle = pick(project, 'subtitle', locale);
  const badge = pick(project, 'badge', locale);
  const cover = coverOf(project);
  const second = secondOf(project);

  return (
    <div className="card group flex-shrink-0 flex flex-col cursor-pointer" style={{ width: '380px', scrollSnapAlign: 'start' }}>
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
        {badge && (
          <span
            className="absolute top-4 left-4 px-3 py-1 text-[0.68rem] font-medium tracking-[0.15em] uppercase"
            style={{
              backgroundColor: 'rgba(196,151,90,0.92)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="p-4 md:p-7 flex flex-col gap-4 md:gap-5 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            {subtitle && (
              <p
                className="text-text-muted text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {subtitle}
              </p>
            )}
            <h3
              className="text-text"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 400 }}
            >
              {title}
            </h3>
          </div>
          {project.totalAreaM2 != null && (
            <div className="text-right flex-shrink-0">
              <span
                className="text-accent"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 400, lineHeight: 1 }}
              >
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

        <Link
          href={href(`/offer/${project.slug}`)}
          className="flex items-center justify-between text-sm font-medium text-accent group mt-1"
          style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}
        >
          {t('projectShowcase.detailSpecs')}
          <span className="btn-arrow flex items-center">
            <LuArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export const ProjectShowcase = ({ projects = [] }) => {
  const { t, locale, href } = useI18n();

  return (
  <section className="py-12 md:py-24 bg-bg overflow-hidden">
    <div className="safe-zone section-header mb-8 md:mb-12" data-reveal>
      <span className="overline"><LuHouse />{t('projectShowcase.eyebrow')}</span>
      <h2
        className="text-text"
        style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
      >
        {t('projectShowcase.title')}
      </h2>

      <div className="flex items-center gap-2 mt-4 text-text-muted lg:hidden">
        <span
          className="text-[0.7rem] font-medium tracking-[0.18em] uppercase"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {t('projectShowcase.scrollHint')}
        </span>
        <LuChevronsRight className="w-5 h-5 text-accent scroll-hint-x" />
      </div>
    </div>

    <div className="px-2 md:px-6" style={{ maxWidth: '1290px', margin: '0 auto' }}>
      <div
        className="flex gap-6 overflow-x-auto pb-6"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'thin',
          scrollbarColor: '#C4975A #E3DBCE',
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} locale={locale} t={t} href={href} />
        ))}

        <div
          className="md:hidden flex-shrink-0 flex items-center justify-center px-4"
          style={{ width: '240px', scrollSnapAlign: 'start' }}
        >
          <Link href={href('/offer')} className="btn-primary inline-flex group">
            {t('projectShowcase.viewAll')}
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex-shrink-0 w-1" aria-hidden="true" />
      </div>

      <div className="hidden md:flex justify-center mt-8 md:mt-12" data-reveal>
        <Link href={href('/offer')} className="btn-primary inline-flex group">
          {t('projectShowcase.viewAll')}
          <LuArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
  );
};
