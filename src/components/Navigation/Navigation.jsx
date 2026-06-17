'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LuArrowUpRight, LuChevronDown, LuPhone, LuGlobe } from 'react-icons/lu';
import logo from '@/assets/brand/logo.png';
import { useI18n } from '@/i18n/I18nProvider';
import { locales, localeNames } from '@/i18n/config';

const stripSlash = (p) => p.replace(/\/+$/, '') || '/';

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t, href, locale } = useI18n();
  const [navHidden, setNavHidden] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about-us', label: t('nav.about') },
    {
      label: t('nav.offer'),
      subLinks: [
        { path: '/project1', label: t('nav.project1') },
        { path: '/project2', label: t('nav.project2') },
        { path: '/small-houses', label: t('nav.smallHouses') },
      ],
    },
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
      if (window.innerWidth >= 768) {
        setNavHidden(false);
      } else if (y < 100) {
        setNavHidden(false);
      } else if (y > lastScrollY.current + 6) {
        setNavHidden(true);
      } else if (y < lastScrollY.current - 6) {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onResize = () => {
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
        <nav className="flex-1 safe-zone pt-6">
          <ul>
            {navLinks.map((link, idx) => (
              <li key={link.label} className="border-b border-border-dark">
                {link.subLinks ? (
                  <div>
                    {/* Parent label — not a link */}
                    <div className="flex items-center gap-5 py-5">
                      <span
                        className="text-text-light/20 text-[0.68rem] font-medium tracking-[0.2em] flex-shrink-0"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-text-light/35"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1.7rem, 7vw, 2.6rem)',
                          fontWeight: 400,
                          lineHeight: 1.1,
                        }}
                      >
                        {link.label}
                      </span>
                    </div>
                    {/* Sub-links */}
                    <div className="pl-9 pb-5 flex flex-col gap-1">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          href={href(sub.path)}
                          onClick={closeMobileMenu}
                          className="block py-2 text-sm font-light text-text-light/50 hover:text-accent transition-colors duration-150"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          — {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom bar */}
        <div className="safe-zone py-6 border-t border-border-dark flex flex-col gap-4 flex-shrink-0">
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
          <a
            href="tel:+38163383393"
            className="flex items-center gap-3 text-text-light/45 hover:text-text-light transition-colors duration-150 text-sm font-light"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <LuPhone className="w-4 h-4 text-accent flex-shrink-0" />
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
        className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-md shadow-[0_1px_0_#E3DBCE]"
        style={{
          transform: (navHidden && !mobileMenuVisible) ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.35s ease',
        }}
      >
        <div className="safe-zone flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href={href('/')} onClick={closeMobileMenu}>
            <Image
              src={logo}
              className="h-20 w-auto"
              alt="Avala Home Concept logo"
              width={150}
              height={50}
            />
          </Link>

          {/* Hamburger → X (mobile only) */}
          <button
            className="flex flex-col justify-center gap-1.5 p-2 w-10 h-10 md:hidden"
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            aria-label={mobileMenuVisible ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={mobileMenuVisible}
          >
            <span className={['block h-0.5 w-6 bg-text transition-all duration-250 origin-center', mobileMenuVisible ? 'rotate-45 translate-y-[7px]' : ''].join(' ')} />
            <span className={['block h-0.5 w-6 bg-text transition-all duration-250',               mobileMenuVisible ? 'opacity-0 scale-x-0' : ''].join(' ')} />
            <span className={['block h-0.5 w-6 bg-text transition-all duration-250 origin-center', mobileMenuVisible ? '-rotate-45 -translate-y-[7px]' : ''].join(' ')} />
          </button>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.subLinks && setActiveDropdown(link.label)}
                onMouseLeave={() => link.subLinks && setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1">
                  <Link
                    href={link.path ? href(link.path) : '#'}
                    className={[
                      'relative py-2 text-[0.85rem] tracking-[0.04em] text-text transition-colors duration-200',
                      'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0',
                      'after:bg-accent after:transition-[width] after:duration-200 hover:after:w-full',
                      link.path && isActive(link.path) ? 'after:w-full' : '',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                  {link.subLinks && (
                    <LuChevronDown
                      className={['w-3.5 h-3.5 text-text transition-transform duration-200', activeDropdown === link.label ? 'rotate-180' : ''].join(' ')}
                    />
                  )}
                </div>

                {link.subLinks && (
                  <ul
                    className={[
                      'absolute top-full left-0 min-w-[180px]',
                      'bg-bg border border-border shadow-[0_4px_20px_rgba(26,25,21,0.08)]',
                      'py-2 mt-1',
                      activeDropdown === link.label ? 'block' : 'hidden',
                    ].join(' ')}
                  >
                    {link.subLinks.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={href(sub.path)}
                          className="block px-4 py-2 text-[0.85rem] text-text hover:text-accent transition-colors duration-150"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop right side: language switcher + CTA */}
          <div className="hidden md:flex items-center gap-4">
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

            {/* Desktop CTA */}
            <Link href={href('/contact')} className="btn-primary inline-flex group">
              {t('nav.requestOffer')}
              <LuArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </nav>
    </>
  );
};
