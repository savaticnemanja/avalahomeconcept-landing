import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight, LuBed, LuMaximize2, LuSunrise } from 'react-icons/lu';
import plan1 from '@/assets/plans/plan-1.webp';
import plan2 from '@/assets/plans/plan-2.webp';
import smallHousesMain from '@/assets/projects/small-houses/main.webp';

const projects = [
  {
    title: 'Projekat 1',
    subtitle: 'Prizemna kuća',
    area: '139',
    beds: 3,
    terrace: '11m²',
    highlights: ['Dnevni boravak 22m²', 'Kuhinja + trpezarija 27m²', 'Bazen i uređeno dvorište'],
    image: plan1,
    link: '/project1',
    badge: 'Dostupno',
  },
  {
    title: 'Projekat 2',
    subtitle: 'Porodična kuća',
    area: '147',
    beds: 3,
    terrace: '18m²',
    highlights: ['Garderober 8m²', 'Džakuzi (opciono)', 'Otvoreni trem 7m²'],
    image: plan2,
    link: '/project2',
    badge: 'Dostupno',
  },
  {
    title: 'Kuće 80–100m²',
    subtitle: 'Kompaktna kuća',
    area: '80–100',
    beds: 2,
    terrace: null,
    highlights: ['Mediteranski stil', 'Energetski efikasno', 'Povoljnija cena'],
    image: smallHousesMain,
    link: '/small-houses',
    badge: 'Upitajte',
  },
];

const ProjectCard = ({ project }) => (
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
          {project.beds} sobe
        </div>
        {project.terrace && (
          <div className="flex items-center gap-2 text-sm font-light text-text-muted">
            <LuSunrise className="w-4 h-4 text-accent" />
            Terasa {project.terrace}
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
        href={project.link}
        className="flex items-center justify-between text-sm font-medium text-accent group mt-1"
        style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}
      >
        Detaljne specifikacije
        <span className="btn-arrow flex items-center">
          <LuArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </div>
  </div>
);

export const ProjectShowcase = () => (
  <section className="py-12 md:py-24 bg-bg overflow-hidden">
    {/* Header */}
    <div className="safe-zone section-header mb-12" data-reveal>
      <span className="overline">Naša ponuda</span>
      <div className="overline-bar" />
      <h2
        className="text-text"
        style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
      >
        Izaberite vaš projekat
      </h2>
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
          <ProjectCard key={i} project={p} />
        ))}
        {/* Spacer so last card isn't flush to edge on large screens */}
        <div className="flex-shrink-0 w-1" aria-hidden="true" />
      </div>
    </div>
  </section>
);
