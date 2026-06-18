import Image from 'next/image';
import { LuUsers, LuBriefcase } from 'react-icons/lu';
import ciricGradnjaLogo from '@/assets/partners/ciric-gradnja.webp';
import ciricHomeInvestLogo from '@/assets/partners/ciric-home-invest.webp';
import { getDictionary } from '@/i18n/getDictionary';
import { buildPageMetadata } from '@/i18n/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/about-us', metaKey: 'about' });
}

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

export default async function AboutUsPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const a = dict.about;

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-12 md:py-16 bg-bg">
        <div className="safe-zone">
          <div className="mb-6">
            <span className="overline"><LuUsers />{a.eyebrow}</span>
            <h1
              className="text-text leading-tight"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400 }}
            >
              {a.title}
            </h1>
          </div>
          <div className="max-w-3xl flex flex-col gap-5 font-light leading-relaxed text-text-muted text-base">
            {a.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-t border-border bg-bg-alt">
        <div className="safe-zone">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {a.stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-6 md:py-10 px-2 md:px-4 text-center">
                <span
                  className="text-accent-strong"
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
      <section className="py-12 md:py-16 bg-bg-alt border-t border-border">
        <div className="safe-zone">
          <div className="mb-8">
            <span className="overline"><LuBriefcase />{a.investorEyebrow}</span>
            <h2
              className="text-text leading-tight"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 400 }}
            >
              {a.investorTitle}
            </h2>
          </div>
          <p className="max-w-2xl text-text-muted font-light leading-relaxed mb-12">
            {a.investorText}
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
                  <p>{a.emailLabel} <a href={`mailto:${investor.email}`} className="text-accent-strong hover:text-accent-strong transition-colors">{investor.email}</a></p>
                  <a href={investor.website} target="_blank" rel="noopener noreferrer"
                     className="text-accent-strong hover:text-accent-strong transition-colors">
                    {a.website}
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
