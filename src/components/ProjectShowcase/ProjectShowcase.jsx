'use client';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight, LuBed, LuMaximize2, LuSunrise } from 'react-icons/lu';
import plan1 from '@/assets/projects/project-1/plan-card.webp';
import plan2 from '@/assets/projects/project-2/plan-card.webp';
import smallHousesMain from '@/assets/projects/small-houses/main.webp';
import { useI18n } from '@/i18n/I18nProvider';

// Language-neutral card data; text comes from dict.projectShowcase.cards[i]
const cardData = [
  { area: '139', beds: 3, terrace: '11m²', image: plan1, link: '/project1' },
  { area: '147', beds: 3, terrace: '18m²', image: plan2, link: '/project2' },
  { area: '80–100', beds: 2, terrace: null, image: smallHousesMain, link: '/small-houses' },
];

const ProjectCard = ({ project, t, href }) => (
  <div
    className="card flex-shrink-0 flex flex-col"
    style={{ width: '380px', scrollSnapAlign: 'start' }}
  >
    {/* Slika */}
    <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      {/* Overlay badge */}
      <span
        className="absolute top-4 left-4 px-3 py-1 text-[0.68rem] font-medium tracking-[0.15em] uppercase"
        style={{
          backgroundColor: 'rgba(196,151,90,0.92)',
          color: '#fff',
          fontFamily: 'var(--font-body)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {project.badge}
      </span>
    </div>

    {/* Body */}
    <div className="p-4 md:p-7 flex flex-col gap-4 md:gap-5 flex-1">
      {/* Title + area */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-text-muted text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {project.subtitle}
          </p>
          <h3
            className="text-text"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 400 }}
          >
            {project.title}
          </h3>
        </div>
        <div className="text-right flex-shrink-0">
          <span
            className="text-accent"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 400, lineHeight: 1 }}
          >
            {project.area}
          </span>
          <span className="text-text-muted text-sm block">m²</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-5 py-4 border-y border-border">
        <div className="flex items-center gap-2 text-sm font-light text-text-muted">
          <LuBed className="w-4 h-4 text-accent" />
          {project.beds} {t('projectShowcase.rooms')}
        </div>
        {project.terrace && (
          <div className="flex items-center gap-2 text-sm font-light text-text-muted">
            <LuSunrise className="w-4 h-4 text-accent" />
            {t('projectShowcase.terrace')} {project.terrace}
          </div>
        )}
        <div className="flex items-center gap-2 text-sm font-light text-text-muted">
          <LuMaximize2 className="w-4 h-4 text-accent" />
          {project.area} m²
        </div>
      </div>

      {/* Highlights */}
      <ul className="flex flex-col gap-2 flex-1">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm font-light text-text-muted">
            <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={href(project.link)}
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

export const ProjectShowcase = () => {
  const { t, href } = useI18n();
  const projects = cardData.map((c, i) => ({
    ...c,
    title: t(`projectShowcase.cards.${i}.title`),
    subtitle: t(`projectShowcase.cards.${i}.subtitle`),
    badge: t(`projectShowcase.cards.${i}.badge`),
    highlights: [0, 1, 2].map((h) => t(`projectShowcase.cards.${i}.highlights.${h}`)),
  }));

  return (
  <section className="py-12 md:py-24 bg-bg overflow-hidden">
    {/* Header */}
    <div className="safe-zone section-header mb-12" data-reveal>
      <h2
        className="text-text"
        style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
      >
        {t('projectShowcase.title')}
      </h2>
      <span className="overline">{t('projectShowcase.eyebrow')}</span>
    </div>

    {/* Horizontal scroll strip */}
    <div className="px-2 md:px-6" style={{ maxWidth: '1290px', margin: '0 auto' }}>
      <div
        className="flex gap-6 overflow-x-auto pb-6"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'thin',
          scrollbarColor: '#C4975A #E3DBCE',
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} t={t} href={href} />
        ))}
        {/* Spacer so last card isn't flush to edge on large screens */}
        <div className="flex-shrink-0 w-1" aria-hidden="true" />
      </div>
    </div>
  </section>
  );
};
