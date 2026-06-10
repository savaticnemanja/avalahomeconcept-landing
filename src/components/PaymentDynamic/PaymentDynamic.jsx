import { LuKeyRound, LuFilePen, LuHouse } from 'react-icons/lu';

const steps = [
  {
    number: '01',
    amount: '5.000€',
    label: 'Rezervacija',
    detail: 'Rezervišite željenu kuću uz simboličan avans koji garantuje vašu poziciju u kompleksu.',
    icon: LuKeyRound,
  },
  {
    number: '02',
    amount: '30%',
    label: 'Overa ugovora',
    detail: 'Potpisivanjem kupoprodajnog ugovora ulažete 30% ukupne vrednosti nekretnine.',
    icon: LuFilePen,
  },
  {
    number: '03',
    amount: '70%',
    label: '4 rate tokom gradnje',
    detail: 'Preostali iznos plaćate u 4 jednake rate — po završetku svake faze izgradnje.',
    icon: LuHouse,
  },
];

export const PaymentDynamic = () => (
  <section className="py-12 md:py-24 bg-bg">
    <div className="safe-zone">

      {/* Header */}
      <div className="section-header" data-reveal>
        <span className="overline">Kako kupiti</span>
        <div className="overline-bar" />
        <h2
          className="text-text"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
        >
          Dinamika plaćanja
        </h2>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border" data-reveal>
        {steps.map(({ number, amount, label, detail, icon: Icon }, i) => (
          <div
            key={i}
            className="bg-bg p-4 md:p-8 xl:p-12 flex flex-col gap-5 md:gap-6 group hover:bg-bg-alt transition-colors duration-200"
          >
            {/* Number + icon row */}
            <div className="flex items-center justify-between">
              <span
                className="text-border"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 400, lineHeight: 1 }}
                aria-hidden="true"
              >
                {number}
              </span>
              <span className="w-12 h-12 flex items-center justify-center border border-border rounded-full text-text-muted group-hover:border-accent group-hover:text-accent transition-all duration-200">
                <Icon className="w-5 h-5" />
              </span>
            </div>

            {/* Amount */}
            <div>
              <p
                className="text-accent"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 400, lineHeight: 1 }}
              >
                {amount}
              </p>
              <p
                className="text-text mt-1"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 400 }}
              >
                {label}
              </p>
            </div>

            {/* Detail */}
            <p className="text-text-muted text-sm font-light leading-relaxed border-t border-border pt-5">
              {detail}
            </p>
          </div>
        ))}
      </div>

    </div>
  </section>
);
