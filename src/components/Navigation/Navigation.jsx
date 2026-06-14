'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LuArrowUpRight, LuChevronDown, LuPhone } from 'react-icons/lu';
import logo from '@/assets/logo2.png';

const navLinks = [
  { path: '/', label: 'Početna' },
  { path: '/about-us', label: 'O nama' },
  {
    label: 'Ponuda kuća',
    subLinks: [
      { path: '/project1', label: 'Projekat 1' },
      { path: '/project2', label: 'Projekat 2' },
      { path: '/small-houses', label: 'Kuće 80-100m²' },
    ],
  },
  { path: '/gallery', label: 'Galerija' },
  { path: '/contact', label: 'Kontakt' },
];

export const Navigation = () => {
  const pathname = usePathname();
  const [navHidden, setNavHidden] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

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
                          href={sub.path}
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
                    href={link.path}
                    onClick={closeMobileMenu}
                    className={[
                      'flex items-center gap-5 py-5 group transition-colors duration-150',
                      pathname === link.path ? 'text-accent' : 'text-text-light hover:text-accent',
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
          <a
            href="tel:+38163383393"
            className="flex items-center gap-3 text-text-light/45 hover:text-text-light transition-colors duration-150 text-sm font-light"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <LuPhone className="w-4 h-4 text-accent flex-shrink-0" />
            +381 63 383 393
          </a>
          <Link
            href="/contact"
            className="btn-primary justify-center"
            onClick={closeMobileMenu}
          >
            Zatraži ponudu
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
          <Link href="/" onClick={closeMobileMenu}>
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
            aria-label={mobileMenuVisible ? 'Zatvori meni' : 'Otvori meni'}
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
                    href={link.path || '#'}
                    className={[
                      'relative py-2 text-[0.85rem] tracking-[0.04em] text-text transition-colors duration-200',
                      'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0',
                      'after:bg-accent after:transition-[width] after:duration-200 hover:after:w-full',
                      link.path && pathname === link.path ? 'after:w-full' : '',
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
                          href={sub.path}
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

          {/* Desktop CTA */}
          <Link href="/contact" className="btn-primary hidden md:inline-flex group">
            Zatraži ponudu
            <LuArrowUpRight className="w-4 h-4" />
          </Link>

        </div>
      </nav>
    </>
  );
};
