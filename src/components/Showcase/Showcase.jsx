import Image from 'next/image';
import Link from 'next/link';
import {
  LuLock,
  LuPalette,
  LuZap,
  LuAward,
  LuGem,
  LuSquareParking,
  LuShieldCheck,
  LuMountain,
} from 'react-icons/lu';
import showcase1 from '@/assets/showcase/showcase-1.webp';

const benefits = [
  { title: 'Zatvoren kompleks',              icon: LuLock },
  { title: 'Moderna i mediteranska arhitektura', icon: LuPalette },
  { title: 'Brza konekcija na autoput',      icon: LuZap },
  { title: 'Čvrsta gradnja',                 icon: LuAward },
  { title: 'Visok nivo završnih materijala', icon: LuGem },
  { title: 'Parking mesto',                  icon: LuSquareParking },
  { title: 'Rampa i sigurnosni ulaz',        icon: LuShieldCheck },
  { title: 'Najlepša lokacija sa pogledom',  icon: LuMountain },
];

export const Showcase = () => (
  <section className="py-12 md:py-24 bg-bg-alt overflow-hidden">
    <div className="safe-zone">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 items-center">

        {/* Portrait slika sa dekorativnim okvirom */}
        <div className="relative">
          {/* Dekorativni okvir */}
          <div
            className="absolute -bottom-4 -right-4 border border-accent/30 rounded-[2px] pointer-events-none"
            style={{ inset: '16px -16px -16px 0', border: '1px solid rgba(196,151,90,0.25)' }}
            aria-hidden="true"
          />
          <div
            className="relative overflow-hidden rounded-[2px] bg-bg-dark"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src={showcase1}
              alt="Avala Home Concept — stambeni kompleks na Avali"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Sadržaj */}
        <div className="flex flex-col gap-10">
          <div data-reveal>
            <span className="overline">Zašto Avala Home Concept</span>
            <div className="overline-bar" />
            <h2
              className="text-text"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.6rem)', fontWeight: 400 }}
            >
              Vaš dom.{' '}
              <em>Vaša priroda.</em>
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4" data-reveal>
            {benefits.map(({ title, icon: Icon }, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-border rounded-[2px] text-accent group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </span>
                <span
                  className="text-text pt-1.5 leading-snug"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300 }}
                >
                  {title}
                </span>
              </li>
            ))}
          </ul>

          <Link href="/contact" className="btn-primary group self-start">
            Zatraži ponudu
            <span className="btn-arrow"><svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg></span>
          </Link>
        </div>

      </div>
    </div>
  </section>
);
