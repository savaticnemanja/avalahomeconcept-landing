'use client';
import { useId } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

const GOLD = 'linear-gradient(180deg, #F8E7AE 0%, #E2BC6A 38%, #B8862F 55%, #E9CB7C 78%, #F6E2A2 100%)';

// "Special price" stamp on the hero: gold type in a gold frame over a dark
// green brush stroke. The ragged edges come from an SVG turbulence filter, so
// there is no image to download. Callers set the position (absolute/relative).
export const PriceBadge = ({ className = '' }) => {
  const { t } = useI18n();
  const filterId = `brush-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={`w-[132px] md:w-[220px] aspect-[1.25] flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ animation: 'fade-up 0.9s 0.3s ease both' }}
    >
      <svg
        viewBox="0 0 220 176"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute -inset-x-[12%] -inset-y-[6%] w-[124%] h-[112%] drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
      >
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035 0.22" numOctaves="3" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="16" />
          </filter>
          <linearGradient id={`${filterId}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1C5A3D" />
            <stop offset="0.55" stopColor="#123F2B" />
            <stop offset="1" stopColor="#0A2A1C" />
          </linearGradient>
        </defs>
        <g filter={`url(#${filterId})`} fill={`url(#${filterId}-g)`} transform="rotate(-4 110 88)">
          <rect x="18" y="26" width="186" height="128" rx="10" />
          <rect x="6" y="40" width="200" height="30" rx="14" />
          <rect x="12" y="108" width="196" height="34" rx="16" />
          <rect x="30" y="18" width="150" height="16" rx="8" opacity="0.85" />
          <rect x="40" y="148" width="160" height="12" rx="6" opacity="0.8" />
        </g>
      </svg>

      <div
        className="relative w-[86%] h-[82%] flex flex-col items-center justify-center text-center"
        style={{ border: '1.5px solid transparent', borderImage: `${GOLD} 1` }}
      >
        <p
          className="text-[0.5rem] md:text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-[#F4EBD6] leading-none"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {t('slider.priceLabel')}
        </p>
        <span className="block w-[78%] h-px my-1.5 md:my-2.5" style={{ background: GOLD }} />
        <p
          className="text-[2rem] md:text-[3.5rem] font-bold leading-[0.95] tracking-tight"
          style={{
            fontFamily: 'var(--font-body)',
            background: GOLD,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.35))',
          }}
        >
          {t('slider.price')}
        </p>
        <p
          className="text-[0.8rem] md:text-[1.25rem] font-semibold text-[#F4EBD6] leading-tight mt-0.5"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {t('slider.priceUnit')}
        </p>
      </div>
    </div>
  );
};
