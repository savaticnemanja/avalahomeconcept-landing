import Link from 'next/link';
import {
  Contact,
  Location,
  Partners,
  PaymentDynamic,
  ProjectShowcase,
  Showcase,
  Slider,
} from '@/components';
import { specificationIcons } from '@/lib/specifications';
import { getDictionary } from '@/i18n/getDictionary';
import { withLocale } from '@/i18n/config';

const ArrowIcon = () => (
  <span className="btn-arrow"><svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg></span>
);

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const specs = specificationIcons.map((icon, i) => ({
    icon,
    title: dict.specifications.items[i].title,
    description: dict.specifications.items[i].description,
  }));

  return (
    <>
      {/* 1. Hero slider */}
      <Slider />

      {/* CTA */}
      <div className="py-10 md:py-20 bg-bg border-t border-border">
        <div className="safe-zone flex flex-col items-center gap-5 text-center">
          <h3
            className="text-text italic max-w-lg"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400 }}
          >
            {dict.homeCta.title}
          </h3>
          <span className="overline">{dict.homeCta.eyebrow}</span>
          <p className="text-text-muted text-sm font-light max-w-sm">
            {dict.homeCta.text}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link href={withLocale(locale, '/contact')} className="btn-primary group">
              {dict.homeCta.requestOffer}
              <ArrowIcon />
            </Link>
            <a href="tel:+38163383393" className="btn-ghost group">
              {dict.homeCta.callNow}
            </a>
          </div>
        </div>
      </div>

      {/* Showcase sa benefitima */}
      <Showcase />

      {/* ProjectShowcase slider */}
      <ProjectShowcase />

      {/* Specifikacije */}
      <section className="py-12 md:py-24 bg-bg-dark">
        <div className="safe-zone">
          <div className="section-header-centered">
            <h2
              className="text-text-light leading-tight"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
            >
              {dict.specifications.title}
            </h2>
            <span className="overline">{dict.specifications.eyebrow}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border-dark">
            {specs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-bg-dark flex flex-col gap-3 md:gap-4 p-4 md:p-7 group hover:bg-bg-mid transition-colors duration-200"
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-border-dark rounded-full text-text-light/30 group-hover:border-accent/50 group-hover:text-accent transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </span>
                  <h4
                    className="text-text-light"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 400 }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-text-light/40 text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lokacija */}
      <Location />

      {/* Dinamika plaćanja */}
      <PaymentDynamic />

      {/* CTA ispod PaymentDynamic */}
      <div className="py-8 md:py-16 bg-bg border-t border-border">
        <div className="safe-zone flex flex-col sm:flex-row items-center justify-between gap-6">
          <p
            className="text-text italic"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', fontWeight: 400 }}
          >
            {dict.midCta.text}
          </p>
          <Link href={withLocale(locale, '/contact')} className="btn-primary group flex-shrink-0">
            {dict.midCta.requestOffer}
            <ArrowIcon />
          </Link>
        </div>
      </div>

      {/* Kontakt */}
      <Contact />

      {/* Partneri */}
      <Partners />
    </>
  );
}
