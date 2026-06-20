import { Navigation } from '@/components/Navigation/Navigation';
import { FooterConditional } from '@/components/FooterConditional';
import { PageTracker } from '@/components/Analytics/PageTracker';
import { ClickTracker } from '@/components/Analytics/ClickTracker';
import { I18nProvider } from '@/i18n/I18nProvider';
import { getDictionary } from '@/i18n/getDictionary';
import { locales, SITE_URL } from '@/i18n/config';
import { buildPageMetadata } from '@/i18n/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const meta = await buildPageMetadata({ locale, path: '/', metaKey: 'home' });
  return {
    ...meta,
    title: {
      default: dict.meta.home.title,
      template: `%s | ${dict.meta.siteName}`,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#business`,
    name: 'Avala Home Concept',
    url: SITE_URL,
    logo: `${SITE_URL}/web-app-manifest-512x512.png`,
    image: `${SITE_URL}/og/home.jpg`,
    telephone: '+38163383393',
    email: 'avalahomeconcept@gmail.com',
    priceRange: '€€€',
    areaServed: ['Beograd', 'Avala', 'Srbija'],
    description: dict.meta.jsonLdDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Beograd',
      addressRegion: 'Beograd',
      addressCountry: 'RS',
    },
    sameAs: [
      'https://www.facebook.com/avalahomeconcept/',
      'https://www.instagram.com/avala_homeconcept/',
      'https://rs.linkedin.com/in/avala-home-concept-718984276',
    ],
  };

  return (
    <I18nProvider locale={locale} dictionary={dict}>
      <PageTracker />
      <ClickTracker />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-3 focus:left-3 focus:bg-bg focus:text-text focus:px-4 focus:py-2 focus:border focus:border-accent focus:rounded-[2px]"
      >
        {dict.nav.skipToContent}
      </a>
      <Navigation />
      <div className="min-h-screen flex flex-col">
        <div id="main" tabIndex={-1} className="flex-1">
          {children}
        </div>
        <FooterConditional />
      </div>
    </I18nProvider>
  );
}
