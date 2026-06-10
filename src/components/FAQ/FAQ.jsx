'use client';
import { useState } from 'react';
import { LuPlus, LuMinus } from 'react-icons/lu';

const faqs = [
  {
    q: 'Kada je planiran završetak izgradnje?',
    a: 'Izgradnja kompleksa je u toku. Kontaktirajte nas za najnovije informacije o rokovima završetka i dostupnim jedinicama.',
  },
  {
    q: 'Da li je moguće finansiranje putem kredita?',
    a: 'Da, sarađujemo sa nekoliko banaka koje nude povoljne uslove stambenih kredita za kupovinu kuća u našem kompleksu. Naš tim vam može pomoći u odabiru najboljeg finansijskog rešenja.',
  },
  {
    q: 'Šta je uključeno u cenu kuće?',
    a: 'Cena uključuje kompletno izgrađenu i opremljenu kuću, uređeno dvorište sa travnjakom, parking mesto, bazen i sve instalacije. Detaljna lista je dostupna na zahtev.',
  },
  {
    q: 'Da li postoji mogućnost prilagođavanja enterijera?',
    a: 'Za kuće u određenim fazama izgradnje postoji mogućnost odabira završnih materijala — keramike, parketa i boje zidova. Kontaktirajte nas za detalje.',
  },
  {
    q: 'Kako izgleda proces kupovine?',
    a: 'Proces se odvija u nekoliko koraka: rezervacija uz 5.000€ avansa, overa kupoprodajnog ugovora i uplata 30%, a preostali iznos u 4 rate tokom gradnje.',
  },
  {
    q: 'Koje su mogućnosti plaćanja?',
    a: 'Nudimo fleksibilnu dinamiku: rezervacija 5.000€, 30% pri overi ugovora, 70% u 4 rate po završetku svake faze izgradnje.',
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-12 md:py-24 bg-bg-alt">
      <div className="safe-zone" style={{ maxWidth: '860px' }}>

        <div className="section-header" data-reveal>
          <span className="overline">Imate pitanja?</span>
          <div className="overline-bar" />
          <h2
            className="text-text"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
          >
            Često postavljana pitanja
          </h2>
        </div>

        <div>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="accordion-item">
                <button
                  className="accordion-trigger"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <span className="flex-shrink-0 ml-6 w-7 h-7 flex items-center justify-center border border-border rounded-full text-accent transition-all duration-200"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    {isOpen ? <LuMinus className="w-3.5 h-3.5" /> : <LuPlus className="w-3.5 h-3.5" />}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="accordion-content pr-14">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
