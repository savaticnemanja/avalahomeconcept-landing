import phase1Img from '@/assets/location/phase1.webp';
import phase2Img from '@/assets/location/phase2.webp';
import phase3Img from '@/assets/location/phase3.webp';

// Project phases shown as three image-backed rectangles beneath the map.
// Phase 1 = houses below the red line, Phase 2 = houses above it,
// Phase 3 = the land (2nd aerial screenshot). `available` is highlighted.
const PHASES = [
  { id: 'faza1', num: '01', name: 'Faza 1', status: 'sold',      img: phase1Img },
  { id: 'faza2', num: '02', name: 'Faza 2', status: 'sold',      img: phase2Img },
  { id: 'faza3', num: '03', name: 'Faza 3', status: 'available', img: phase3Img },
];

const STATUS_LABEL = { sold: 'Prodato', available: 'U prodaji' };

export const LocationPhases = () => (
  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
    {PHASES.map((p) => {
      const available = p.status === 'available';
      return (
        <div
          key={p.id}
          className={[
            'group relative flex flex-col justify-between min-h-[190px] md:min-h-[220px] p-5 overflow-hidden border',
            available ? 'border-accent' : 'border-border',
          ].join(' ')}
          style={{ borderRadius: '2px' }}
        >
          {/* Aerial background */}
          <img
            src={p.img.src}
            alt={`${p.name} — vazdušni snimak`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark scrim for legibility (slightly warmer/stronger on sold phases) */}
          <div
            className="absolute inset-0"
            style={{
              background: available
                ? 'linear-gradient(to top, rgba(26,25,21,0.78) 0%, rgba(26,25,21,0.30) 55%, rgba(26,25,21,0.18) 100%)'
                : 'linear-gradient(to top, rgba(26,25,21,0.82) 0%, rgba(26,25,21,0.45) 55%, rgba(26,25,21,0.35) 100%)',
            }}
          />
          {available && (
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 2px var(--color-accent)' }} />
          )}

          {/* Content */}
          <div className="relative flex items-start justify-between">
            <span
              className="text-text-light"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', fontWeight: 400, lineHeight: 1, opacity: available ? 1 : 0.85 }}
            >
              {p.num}
            </span>
            <span
              className={[
                'text-[0.62rem] uppercase tracking-[0.1em] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm',
                available
                  ? 'text-bg-dark bg-accent'
                  : 'text-text-light bg-white/15',
              ].join(' ')}
            >
              {STATUS_LABEL[p.status]}
            </span>
          </div>

          <div className="relative">
            <h3
              className="text-text-light"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 400 }}
            >
              {p.name}
            </h3>
            <div
              className="mt-2 h-px w-full"
              style={{ background: available ? 'var(--color-accent)' : 'rgba(247,243,236,0.35)' }}
            />
          </div>
        </div>
      );
    })}
  </div>
);
