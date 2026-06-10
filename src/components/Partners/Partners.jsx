import Image from 'next/image';
import astralLogo from '@/assets/partners/astral-logo.webp';
import bekamentLogo from '@/assets/partners/bekament-logo.webp';
import bracaMaricLogo from '@/assets/partners/braca-maric-logo.webp';
import ciricHomeInvestLogo from '@/assets/partners/ciric-home-invest-logo.webp';
import fluidraLogo from '@/assets/partners/fluidra-logo.webp';
import geberitLogo from '@/assets/partners/geberit-logo.webp';
import wienerbergerLogo from '@/assets/partners/wienerberger-logo.webp';

const logos = [
  { src: astralLogo, alt: 'Astral' },
  { src: bekamentLogo, alt: 'Bekament' },
  { src: bracaMaricLogo, alt: 'Braća Marić' },
  { src: ciricHomeInvestLogo, alt: 'Ćirić Home Invest' },
  { src: fluidraLogo, alt: 'Fluidra' },
  { src: geberitLogo, alt: 'Geberit' },
  { src: wienerbergerLogo, alt: 'Wienerberger' },
];

const doubled = [...logos, ...logos];

export const Partners = () => (
  <section className="overflow-hidden py-6 md:py-12 border-y border-border" aria-label="Naši partneri">
    <div className="flex animate-[marquee_30s_linear_infinite]">
      {doubled.map((logo, i) => (
        <div
          key={i}
          className="flex-none px-10 flex items-center justify-center"
          style={{ minWidth: '160px' }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={50}
            className="object-contain opacity-50 hover:opacity-80 transition-opacity duration-200 grayscale hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  </section>
);
