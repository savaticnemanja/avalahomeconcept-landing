import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { ToastProvider } from '@/components/ToastProvider/ToastProvider';
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop';
import { RevealObserver } from '@/components/RevealObserver/RevealObserver';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://avalahomeconcept.com'),
  title: {
    default: 'Avala Home Concept — Kuće na Avali, 20 min od Beograda',
    template: '%s | Avala Home Concept',
  },
  description: 'Plac, kuća, bazen, uređeno dvorište — 20 minuta od Beograda, 10 minuta od Ikee. Zatvoren kompleks porodičnih kuća na Avalskoj planini. Pozovite: 063/383-393',
  keywords: ['kuće na Avali', 'nekretnine Beograd', 'kuća sa bazenom', 'stambeni kompleks Avala', 'Avala Home Concept'],
  openGraph: {
    siteName: 'Avala Home Concept',
    locale: 'sr_RS',
    type: 'website',
    images: [{ url: '/web-app-manifest-512x512.png', width: 512, height: 512 }],
  },
  alternates: {
    canonical: 'https://avalahomeconcept.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Avala Home Concept',
  url: 'https://avalahomeconcept.com',
  telephone: '+38163383393',
  email: 'avalahomeconcept@gmail.com',
  description: 'Zatvoren kompleks porodičnih kuća na Avalskoj planini, 20 minuta od Beograda.',
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

export default function RootLayout({ children }) {
  return (
    <html lang="sr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ToastProvider>
          <Navigation />
          {children}
          <Footer />
          <ScrollToTop />
          <RevealObserver />
        </ToastProvider>
      </body>
    </html>
  );
}
