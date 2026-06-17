import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { I18nProvider } from '@/i18n/I18nProvider';
import { getDictionary } from '@/i18n/getDictionary';
import { locales, hreflang, buildAlternates } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: {
      default: dict.meta.home.title,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.home.description,
    alternates: buildAlternates(locale, '/'),
    openGraph: {
      siteName: dict.meta.siteName,
      locale: hreflang[locale],
      type: 'website',
      images: [{ url: '/web-app-manifest-512x512.png', width: 512, height: 512 }],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Avala Home Concept',
    url: 'https://avalahomeconcept.com',
    telephone: '+38163383393',
    email: 'avalahomeconcept@gmail.com',
    description: dict.meta.jsonLdDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Beograd',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      {children}
      <Footer />
    </I18nProvider>
  );
}
