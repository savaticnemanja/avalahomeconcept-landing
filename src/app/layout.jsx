import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider/ToastProvider';
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop';
import { RevealObserver } from '@/components/RevealObserver/RevealObserver';
import { defaultLocale, SITE_URL } from '@/i18n/config';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Avala Home Concept',
    template: '%s | Avala Home Concept',
  },
};

export const viewport = {
  themeColor: 'transparent',
};

export default function RootLayout({ children }) {
  return (
    <html lang={defaultLocale} className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ToastProvider>
          {children}
          <ScrollToTop />
          <RevealObserver />
        </ToastProvider>
      </body>
    </html>
  );
}
