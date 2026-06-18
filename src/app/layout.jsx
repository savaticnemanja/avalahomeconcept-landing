import { Manrope, Noto_Serif } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider/ToastProvider';
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop';
import { RevealObserver } from '@/components/RevealObserver/RevealObserver';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { defaultLocale, SITE_URL } from '@/i18n/config';

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const manrope = Manrope({
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
    <html lang={defaultLocale} className={`${notoSerif.variable} ${manrope.variable}`}>
      <body>
        <ToastProvider>
          <SmoothScroll />
          {children}
          <ScrollToTop />
          <RevealObserver />
        </ToastProvider>
      </body>
    </html>
  );
}
