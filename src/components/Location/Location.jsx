import Image from 'next/image';
import { LuMapPin, LuClock } from 'react-icons/lu';
import mapImage from '@/assets/location/map.webp';

const locations = [
  { name: 'Autoput',        time: '10 min', category: 'transport' },
  { name: 'Ikea',           time: '10 min', category: 'shopping' },
  { name: 'Marketi',        time: '2 min',  category: 'shopping' },
  { name: 'TC Ava',         time: '10 min', category: 'shopping' },
  { name: 'Škola',          time: '5 min',  category: 'education' },
  { name: 'Autokomanda',    time: '20 min', category: 'transport' },
  { name: 'Vračar',         time: '20 min', category: 'city' },
  { name: 'Ambulanta',      time: '5 min',  category: 'health' },
  { name: 'Gradski prevoz', time: '2 min',  category: 'transport' },
];

export const Location = () => (
  <section className="py-12 md:py-24 bg-bg-alt">
    <div className="safe-zone">

      {/* Header */}
      <div className="section-header" data-reveal>
        <span className="overline">Lokacija</span>
        <div className="overline-bar" />
        <h2
          className="text-text"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
        >
          Na 20 minuta od Beograda
        </h2>
        <p className="text-text-muted font-light mt-4 max-w-lg text-sm leading-relaxed">
          Uživajte u tišini Avalske planine uz sve gradske pogodnosti na dohvat ruke.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-10 items-start">

        {/* Mapa — 3/5 */}
        <div className="lg:col-span-3 overflow-hidden border border-border" style={{ borderRadius: '2px' }}>
          <Image
            src={mapImage}
            alt="Mapa lokacije — Avala Home Concept"
            width={800}
            height={560}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Distance list — 2/5 */}
        <div className="lg:col-span-2 flex flex-col gap-0">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3.5 border-b border-border group hover:pl-2 transition-all duration-150"
              style={{ borderBottom: i === locations.length - 1 ? '1px solid var(--color-border)' : undefined }}
            >
              <div className="flex items-center gap-3">
                <LuMapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span
                  className="text-text font-light"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
                >
                  {loc.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-accent">
                <LuClock className="w-3 h-3 opacity-60" />
                <span
                  className="font-medium"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}
                >
                  {loc.time}
                </span>
              </div>
            </div>
          ))}

          {/* Bottom note */}
          <p className="mt-6 text-xs text-text-muted font-light leading-relaxed">
            * Procenjeno vreme vožnje u normalnom saobraćaju
          </p>
        </div>

      </div>
    </div>
  </section>
);
