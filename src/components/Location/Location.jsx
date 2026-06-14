import { LocationMap } from './LocationMap';

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

      <LocationMap />
    </div>
  </section>
);
