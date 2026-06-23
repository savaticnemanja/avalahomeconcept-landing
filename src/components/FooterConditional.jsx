'use client';
import { usePathname } from 'next/navigation';
import { Footer } from './Footer/Footer';

export function FooterConditional() {
  const pathname = usePathname();
  // Hide the footer only on the full-screen catalog (/offer), not on the
  // individual project pages (/offer/<slug>).
  if (pathname && /\/offer\/?$/.test(pathname)) return null;
  return <Footer />;
}
