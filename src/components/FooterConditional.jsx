'use client';
import { usePathname } from 'next/navigation';
import { Footer } from './Footer/Footer';

export function FooterConditional() {
  const pathname = usePathname();
  if (pathname && /\/offer/.test(pathname)) return null;
  return <Footer />;
}
