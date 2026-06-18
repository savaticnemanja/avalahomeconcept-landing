import Link from 'next/link';
import Image from 'next/image';
import { LuMail } from 'react-icons/lu';
import ctaBg from '@/assets/cta/complex-sunset.jpeg';
import {
  Contact,
  Location,
  Partners,
  PaymentDynamic,
  ProjectShowcase,
  Showcase,
  Slider,
  Specifications,
} from '@/components';
import { getDictionary } from '@/i18n/getDictionary';
import { withLocale } from '@/i18n/config';

const ArrowIcon = () => (
  <span className="btn-arrow"><svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg></span>
);

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* 1. Hero slider */}
      <Slider />
          
      {/* ProjectShowcase slider */}
      <ProjectShowcase />

      {/* Showcase sa benefitima */}
      <Showcase />

      {/* Lokacija */}
      <Location />

      {/* Specifikacije */}
      <Specifications />

      {/* Dinamika plaćanja */}
      <PaymentDynamic />

      {/* CTA */}
      <div className="relative py-16 md:py-28 overflow-hidden">
        {/* Background image */}
        <Image
          src={ctaBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay for contrast (AA-safe over the bright rooftops/sky) */}
        <div className="absolute inset-0 bg-bg-dark/80" />

        <div className="safe-zone relative flex flex-col items-center gap-5 text-center">
          <span className="overline"><LuMail />{dict.homeCta.eyebrow}</span>
          <h3
            className="text-text-light italic max-w-lg"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400 }}
          >
            {dict.homeCta.title}
          </h3>
          <p className="text-text-light/85 text-sm font-light max-w-sm">
            {dict.homeCta.text}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link href={withLocale(locale, '/contact')} className="btn-primary group">
              {dict.homeCta.requestOffer}
              <ArrowIcon />
            </Link>
            <a href="tel:+38163383393" className="btn-outline-light group">
              {dict.homeCta.callNow}
            </a>
          </div>
        </div>
      </div>

      {/* Kontakt */}
      <Contact />

      {/* Partneri */}
      <Partners />
    </>
  );
}
