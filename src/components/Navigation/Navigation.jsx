'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LuArrowUpRight, LuChevronDown, LuPhone, LuGlobe, LuMenu, LuX } from 'react-icons/lu';
import logo from '@/assets/brand/logo-old.webp';
import { useI18n } from '@/i18n/I18nProvider';
import { locales, localeNames } from '@/i18n/config';

const stripSlash = (p) => p.replace(/\/+$/, '') || '/';

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t, href, locale } = useI18n();
  const [navHidden, setNavHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about-us', label: t('nav.about') },
    { path: '/offer', label: t('nav.offer') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => stripSlash(pathname) === stripSlash(href(path));

  const switchLocale = (next) => {
    try {
      localStorage.setItem('locale', next);
    } catch {
      /* ignore */
    }
    const segments = pathname.split('/');
    segments[1] = next; // replace locale segment
    router.push(segments.join('/') || `/${next}`);
    setLangOpen(false);
    setMobileMenuVisible(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 100) {
        setNavHidden(false);
      } else if (y > lastScrollY.current + 6) {
        setNavHidden(true);
      } else if (y < lastScrollY.current - 6) {
        setNavHidden(false);
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(1, y / max) : 0);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    const onResize = () => {
      apply();
      if (window.innerWidth >= 768) {
        setNavHidden(false);
        setMobileMenuVisible(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuVisible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuVisible]);

  const closeMobileMenu = () => setMobileMenuVisible(false);

  return (
    <>
      {/* ── Top gradient shadow ──────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '20px',
          zIndex: 49,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)',
        }}
      />

      {/* ── Full-screen mobile menu ──────────────────────────── */}
      <div
        className="fixed left-0 right-0 bottom-0 md:hidden flex flex-col overflow-y-auto"
        style={{
          top: '64px',
          zIndex: 45,
          backgroundColor: 'var(--color-bg-dark)',
          opacity: mobileMenuVisible ? 1 : 0,
          pointerEvents: mobileMenuVisible ? 'auto' : 'none',
          transform: mobileMenuVisible ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
        aria-hidden={!mobileMenuVisible}
      >
        {/* Links */}
        <nav className="flex-1 safe-zone mx-0 pt-6">
          <ul>
            {navLinks.map((link, idx) => (
              <li key={link.label} className="border-b border-border-dark">
                <Link
                  href={href(link.path)}
                  onClick={closeMobileMenu}
                  className={[
                    'flex items-center gap-5 py-5 group transition-colors duration-150',
                    isActive(link.path) ? 'text-accent' : 'text-text-light hover:text-accent',
                  ].join(' ')}
                >
                  <span
                    className="text-text-light/20 text-[0.68rem] font-medium tracking-[0.2em] flex-shrink-0 group-hover:text-accent/40 transition-colors duration-150"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.7rem, 7vw, 2.6rem)',
                      fontWeight: 400,
                      lineHeight: 1.1,
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom bar */}
        <div className="safe-zone mx-0 py-6 border-t border-border-dark flex flex-col gap-4 flex-shrink-0">
          {/* Language switcher */}
          <div className="flex flex-wrap gap-2" aria-label={t('nav.language')}>
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={[
                  'px-3 py-1.5 text-sm border transition-colors duration-150',
                  l === locale
                    ? 'border-accent text-accent'
                    : 'border-border-dark text-text-light/50 hover:text-text-light',
                ].join(' ')}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {localeNames[l]}
              </button>
            ))}
          </div>
          <a href="tel:+38163383393" className="btn-ghost justify-center">
            <LuPhone className="w-4 h-4 flex-shrink-0" />
            +381 63 383 393
          </a>
          <Link
            href={href('/contact')}
            className="btn-primary justify-center"
            onClick={closeMobileMenu}
          >
            {t('nav.requestOffer')}
            <LuArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Nav bar ─────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-bg shadow-[0_1px_0_#E3DBCE]"
        style={{
          transform: (navHidden && !mobileMenuVisible) ? 'translateY(calc(-100% - 4px))' : 'translateY(0)',
          transition: 'transform 0.35s ease',
        }}
      >
        <div className="safe-zone flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href={href('/')} onClick={closeMobileMenu}>
            <Image
              src={logo}
              className="h-12 md:h-14 w-auto"
              alt="Avala Home Concept logo"
              width={150}
              height={50}
            />
          </Link>

          {/* Mobile actions: CTA icon + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Phone CTA (pulsing) */}
            <a
              href="tel:+38163383393"
              aria-label="+381 63 383 393"
              className="group relative inline-flex items-center justify-center w-10 h-10"
            >
              <span className="absolute inset-0 m-auto w-8 h-8 bg-accent/50 animate-ping [animation-duration:2.5s] pointer-events-none" />
              <span className="relative inline-flex items-center justify-center w-10 h-10 bg-bg border border-accent text-accent transition-all duration-250 active:bg-accent active:text-white">
                <LuPhone className="w-4 h-4" />
              </span>
            </a>

            {/* Menu ↔ Close */}
            <button
              className="relative w-10 h-10 flex items-center justify-center text-text hover:text-accent transition-colors duration-200"
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
              aria-label={mobileMenuVisible ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={mobileMenuVisible}
            >
              <LuMenu
                className={['absolute w-6 h-6 transition-all duration-300', mobileMenuVisible ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'].join(' ')}
              />
              <LuX
                className={['absolute w-6 h-6 transition-all duration-300', mobileMenuVisible ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'].join(' ')}
              />
            </button>
          </div>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label} className="relative flex">
                <Link
                  href={href(link.path)}
                  className={[
                    'relative flex items-end pb-[18px] h-16 md:h-20 text-[0.85rem] tracking-[0.04em] text-text transition-colors duration-200',
                    'after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-0',
                    'after:bg-accent after:transition-[width] after:duration-200 hover:after:w-full',
                    isActive(link.path) ? 'after:w-full' : '',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right side: phone + CTA + language switcher */}
          <div className="hidden md:flex items-center gap-4">
            {/* Phone CTA (icon only, pulsing) */}
            <a
              href="tel:+38163383393"
              aria-label="+381 63 383 393"
              title="+381 63 383 393"
              className="group relative inline-flex items-center justify-center w-11 h-11"
            >
              <span className="absolute inset-0 m-auto w-8 h-8 bg-accent/50 animate-ping [animation-duration:2.5s] pointer-events-none" />
              <span className="relative inline-flex items-center justify-center w-11 h-11 bg-bg border border-accent text-accent transition-all duration-250 group-hover:bg-accent group-hover:text-white">
                <LuPhone className="w-4 h-4" />
              </span>
            </a>

            {/* Desktop CTA */}
            <Link href={href('/contact')} className="btn-primary inline-flex group">
              {t('nav.requestOffer')}
              <LuArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1.5 py-2 text-[0.85rem] text-text hover:text-accent transition-colors duration-200"
                aria-label={t('nav.language')}
                aria-expanded={langOpen}
              >
                <LuGlobe className="w-4 h-4" />
                {locale.toUpperCase()}
                <LuChevronDown className={['w-3.5 h-3.5 transition-transform duration-200', langOpen ? 'rotate-180' : ''].join(' ')} />
              </button>
              <ul
                className={[
                  'absolute top-full right-0 min-w-[150px]',
                  'bg-bg border border-border shadow-[0_4px_20px_rgba(26,25,21,0.08)]',
                  'py-2 mt-1',
                  langOpen ? 'block' : 'hidden',
                ].join(' ')}
              >
                {locales.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => switchLocale(l)}
                      className={[
                        'block w-full text-left px-4 py-2 text-[0.85rem] transition-colors duration-150',
                        l === locale ? 'text-accent' : 'text-text hover:text-accent',
                      ].join(' ')}
                    >
                      {localeNames[l]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </nav>

      {/* ── Scroll progress ──────────────────────────────────── */}
      {/* Rendered last (above the nav) so iOS Safari's backdrop-filter on the */}
      {/* nav doesn't composite over it. Desktop: shows when nav collapsed. */}
      {/* Mobile: shows whenever scrolled, independent of nav visibility. */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[55] pointer-events-none"
        style={{
          opacity:
            !mobileMenuVisible && (isMobile ? scrollProgress > 0.001 : navHidden)
              ? 1
              : 0,
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden="true"
      >
        <div
          className="h-full bg-accent origin-left"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </>
  );
};
