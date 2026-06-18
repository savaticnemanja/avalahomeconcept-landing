'use client';
import Image from 'next/image';
import Link from 'next/link';
import { LuPhone, LuMessageSquare, LuMessageCircle, LuMail, LuMapPin } from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import logoWhite from '@/assets/brand/logo-old.webp';
import { useI18n } from '@/i18n/I18nProvider';

const socials = [
  { href: 'https://www.facebook.com/avalahomeconcept/',                 Icon: FaFacebook,    label: 'Facebook' },
  { href: 'https://www.instagram.com/avala_homeconcept/',               Icon: FaInstagram,   label: 'Instagram' },
  { href: 'https://rs.linkedin.com/in/avala-home-concept-718984276',    Icon: FaLinkedinIn,  label: 'LinkedIn' },
];

const contacts = [
  { href: 'tel:+38163383393',                       Icon: LuPhone,         label: '+381 63 383393' },
  { href: 'viber://chat?number=%2B38163383393',      Icon: LuMessageSquare, label: 'Viber' },
  { href: 'https://wa.me/38163383393',              Icon: LuMessageCircle, label: 'WhatsApp', external: true },
  { href: 'mailto:avalahomeconcept@gmail.com',      Icon: LuMail,          label: 'avalahomeconcept@gmail.com' },
];

export const Footer = () => {
  const { t, href } = useI18n();

  const pagesLinks = [
    { path: '/', label: t('footer.pages.home') },
    { path: '/about-us', label: t('footer.pages.about') },
    { path: '/offer', label: t('nav.offer') },
    { path: '/gallery', label: t('footer.pages.gallery') },
    { path: '/contact', label: t('footer.pages.contact') },
  ];

  return (
  <footer className="bg-bg-dark text-text-light">
    <div className="safe-zone py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

        <div className="flex flex-col gap-5 items-center text-center md:items-start md:text-left">
          <Link href={href('/')}>
            <Image src={logoWhite} alt="Avala Home Concept logo" width={225} height={40} />
          </Link>
          <p className="text-sm text-text-light/55 font-light leading-relaxed max-w-xs mx-auto md:mx-0">
            {t('footer.tagline')}
          </p>
          <div className="flex gap-3 mt-1 justify-center md:justify-start">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center border border-border-dark text-text-light/40 hover:border-accent hover:text-accent-strong transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border-dark md:pt-0 md:border-t-0">
          <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent-strong mb-5">
            {t('footer.pagesHeading')}
          </p>
          <ul className="flex flex-col gap-2.5">
            {pagesLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  href={href(path)}
                  className="text-sm text-text-light/55 hover:text-text-light transition-colors duration-150 font-light"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 border-t border-border-dark md:pt-0 md:border-t-0">
          <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent-strong mb-5">
            {t('footer.contactHeading')}
          </p>
          <ul className="flex flex-col gap-2.5">
            {contacts.map(({ href, Icon, label, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-3 text-sm font-light text-text-light/55 hover:text-accent-strong transition-colors duration-150 group"
                >
                  <span className="w-7 h-7 flex items-center justify-center border border-border-dark text-text-light/30 group-hover:border-accent/50 group-hover:text-accent-strong transition-all duration-200 flex-shrink-0">
                    <Icon className="w-3 h-3" />
                  </span>
                  <span className="underline decoration-1 underline-offset-4 decoration-text-light/25 group-hover:decoration-accent transition-colors duration-150">
                    {label}
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3 text-sm font-light text-text-light/55 mt-1">
              <span className="w-7 h-7 flex items-center justify-center border border-border-dark text-text-light/30 flex-shrink-0">
                <LuMapPin className="w-3 h-3" />
              </span>
              {t('footer.location')}
            </li>
          </ul>
        </div>

      </div>
    </div>

    <div className="border-t border-border-dark">
      <div className="safe-zone py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[0.75rem] text-text-light/35">
        <p>© {new Date().getFullYear()} Avala Home Concept. {t('footer.rights')}</p>
        <p>
          {t('footer.developedBy')}{' '}
          <a
            href="https://nemanjas.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-strong hover:text-accent-strong transition-colors duration-150"
          >
            nemanjas.dev
          </a>
        </p>
      </div>
    </div>
  </footer>
  );
};
