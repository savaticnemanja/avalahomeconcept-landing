import Image from 'next/image';
import ciricGradnjaLogo from '@/assets/partners/ciric-gradnja-logo.webp';
import ciricHomeInvestLogo from '@/assets/partners/ciric-home-invest-logo.webp';

export const metadata = {
  title: 'O nama',
  description: 'Avala Home Concept i Porodica Ćirić — 30 godina iskustva u građevinarstvu. Luksuzne kuće modernog dizajna na Avalskoj planini, 20 minuta od Beograda.',
};

const investorData = [
  {
    logo: ciricHomeInvestLogo,
    alt: 'Ćirić Home Invest logo',
    email: 'info@cirichomeinvest.com',
    website: 'http://www.cirichomeinvest.com',
    name: 'Ćirić Home Invest',
  },
  {
    logo: ciricGradnjaLogo,
    alt: 'Ćirić Gradnja logo',
    email: 'info@ciricgradnja.com',
    website: 'http://www.ciricgradnja.com',
    name: 'Ćirić Gradnja',
  },
];

export default function AboutUsPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-12 md:py-24 bg-bg">
        <div className="safe-zone">
          <span className="overline">Ko smo mi</span>
          <h1
            className="text-text leading-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400 }}
          >
            O nama
          </h1>
          <div className="max-w-3xl flex flex-col gap-5 font-light leading-relaxed text-text-muted text-base">
            <p>
              Dobrodošli u Avala Home Concept — vašu destinaciju za udobniji, kvalitetniji i zdraviji
              način života na prelepom području Avalske planine, nadomak Beograda. Naša misija je pružiti
              vam luksuzne kuće modernog dizajna koje će ispuniti sve vaše potrebe i omogućiti vam da
              uživate u životu okruženi predivnom prirodom.
            </p>
            <p>
              Svaka kuća iz naše ponude pažljivo je osmišljena i izgrađena kako bi pružila maksimalan
              komfor i udobnost višečlanim porodicama. Naš tim stručnjaka radi sa strašću i posvećenošću
              kako bi svaka kuća bila izvanredno dizajnirana i opremljena najkvalitetnijim materijalima.
              Svaki detalj je pažljivo osmišljen kako bi stvorio harmoniju između enterijera i eksterijera,
              stvarajući prijatno okruženje za vas i vašu porodicu.
            </p>
            <p>
              Nalazimo se na prelepom delu sa pogledom na veličanstveni Avalski toranj, pružajući vam
              privilegiju da svakog dana uživate u predivnom pejzažu i osećate mir i spokoj koji dolazi
              sa životom u prirodi. Naše kuće su koncipirane tako da vam pruže privatnost i intimnost,
              dok istovremeno omogućavaju lako povezivanje sa lokalnom zajednicom i svim pogodnostima
              koje grad pruža.
            </p>
            <p>
              Verujemo u važnost zdravog načina života, stoga smo se pobrinuli da naše kuće budu
              energetski efikasne i održive. Koristimo napredne tehnologije i ekološki prihvatljive
              materijale kako bismo smanjili ekološki otisak i pružili vam prostor u kojem možete živeti
              sa svesti o važnosti očuvanja prirode.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-t border-border bg-bg-alt">
        <div className="safe-zone">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { value: '30+',    label: 'godina iskustva' },
              { value: '1000+',  label: 'projekata' },
              { value: '20 min', label: 'od Beograda' },
              { value: '100+',   label: 'zadovoljnih porodica' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-6 md:py-10 px-2 md:px-4 text-center">
                <span
                  className="text-accent"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, lineHeight: 1 }}
                >
                  {value}
                </span>
                <span
                  className="text-text-muted font-light mt-2 text-sm tracking-wide"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor section */}
      <section className="py-12 md:py-24 bg-bg-alt border-t border-border">
        <div className="safe-zone">
          <span className="overline">Investitor</span>
          <h2
            className="text-text leading-tight mb-8"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 400 }}
          >
            Porodica Ćirić
          </h2>
          <p className="max-w-2xl text-text-muted font-light leading-relaxed mb-12">
            Porodica Ćirić već 30 godina uspešno gradi i posluje na tržištu Srbije. Naše građevinske
            kompanije iza sebe imaju više hiljada uspešno realizovanih projekata i zadovoljnih klijenata.
            Naše dugogodišnje iskustvo čini nas pouzdanim partnerom od poverenja koji ima znanje,
            stručnost i kadrove za realizaciju svih vrsta građevinskih radova brzo, kvalitetno i po
            dogovoru.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {investorData.map((investor) => (
              <div key={investor.name} className="card p-6 flex flex-col gap-4">
                <Image
                  src={investor.logo}
                  alt={investor.alt}
                  width={160}
                  height={60}
                  className="object-contain"
                />
                <div className="flex flex-col gap-1 text-sm font-light text-text-muted">
                  <p>Email: <a href={`mailto:${investor.email}`} className="text-accent hover:text-accent-hover transition-colors">{investor.email}</a></p>
                  <a href={investor.website} target="_blank" rel="noopener noreferrer"
                     className="text-accent hover:text-accent-hover transition-colors">
                    Website →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
