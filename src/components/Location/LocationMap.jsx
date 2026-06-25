import { LuMapPin, LuClock } from 'react-icons/lu';
import mapImage from '@/assets/location/map.webp';

// Nearby points of interest with estimated drive times. Informational only —
// the list does not interact with the map (the map is now a static image).
const locations = [
  { name: 'Autoput',        time: '10 min' },
  { name: 'Ikea',           time: '10 min' },
  { name: 'Marketi',        time: '2 min'  },
  { name: 'TC Ava',         time: '10 min' },
  { name: 'Škola',          time: '5 min'  },
  { name: 'Autokomanda',    time: '20 min' },
  { name: 'Vračar',         time: '20 min' },
  { name: 'Ambulanta',      time: '5 min'  },
  { name: 'Gradski prevoz', time: '2 min'  },
];

export const LocationMap = () => (
  <div className="relative w-full overflow-hidden border border-border" style={{ borderRadius: '2px' }}>

    <img
      src={mapImage.src}
      alt="Mapa lokacije Avala Home Concept"
      className="w-full h-[440px] md:h-[600px] object-cover"
    />

    <div
      className="absolute z-10 flex flex-col inset-x-3 bottom-3 max-h-[42%] md:inset-x-auto md:right-4 md:top-4 md:bottom-4 md:w-[340px] md:max-h-none rounded-[4px] border border-white/70 shadow-[0_8px_30px_rgba(26,25,21,0.18)] overflow-hidden"
      style={{
        backgroundColor: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex-1 overflow-y-auto px-4">
        <p className="pt-3 pb-1 text-[0.7rem] uppercase tracking-[0.08em] text-text-muted font-medium">
          U okolini
        </p>
        {locations.map((loc, i) => (
          <div
            key={i}
            className={[
              'w-full flex items-center justify-between py-3 border-b border-[rgba(26,25,21,0.08)]',
              i === locations.length - 1 ? 'border-b-0' : '',
            ].join(' ')}
          >
            <div className="flex items-center gap-3">
              <LuMapPin className="w-3.5 h-3.5 flex-shrink-0 text-accent/70" />
              <span className="text-text" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300 }}>
                {loc.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-accent">
              <LuClock className="w-3 h-3 opacity-60" />
              <span className="font-medium" style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>
                {loc.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="px-4 py-3 border-t border-white/70"
        style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
      >
        <p className="text-[0.7rem] text-text-muted font-light leading-snug">
          * Procenjeno vreme vožnje u normalnom saobraćaju
        </p>
      </div>
    </div>

  </div>
);
