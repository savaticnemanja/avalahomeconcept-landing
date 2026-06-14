import Image from 'next/image';
import Link from 'next/link';
import { LuPhone, LuMessageSquare, LuMessageCircle, LuMail, LuMapPin } from 'react-icons/lu';
import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import logoWhite from '@/assets/logo2-dark.png';

const pagesLinks = [
  { path: '/', label: 'Početna' },
  { path: '/about-us', label: 'O nama' },
  { path: '/gallery', label: 'Galerija' },
  { path: '/contact', label: 'Kontakt' },
];

const offerLinks = [
  { path: '/project1', label: 'Projekat 1 — 139m²' },
  { path: '/project2', label: 'Projekat 2 — 147m²' },
  { path: '/small-houses', label: 'Kuće 80–100m²' },
];

const socials = [
  { href: 'https://www.facebook.com/avalahomeconcept/',                 Icon: FaFacebook,    label: 'Facebook' },
  { href: 'https://www.instagram.com/avala_homeconcept/',               Icon: FaInstagram,   label: 'Instagram' },
  { href: 'https://rs.linkedin.com/in/avala-home-concept-718984276',    Icon: FaLinkedinIn,  label: 'LinkedIn' },
];

const contacts = [
  { href: 'tel:+38163383393',                       Icon: LuPhone,         label: '+381 63 383393' },
  { href: 'viber://contact/?number=+38163383393',   Icon: LuMessageSquare, label: 'Viber' },
  { href: 'https://wa.me/38163383393',              Icon: LuMessageCircle, label: 'WhatsApp', external: true },
  { href: 'mailto:avalahomeconcept@gmail.com',      Icon: LuMail,          label: 'avalahomeconcept@gmail.com' },
];

export const Footer = () => (
  <footer className="bg-bg-mid text-text-light">
    <div className="safe-zone py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Link href="/">
            <Image src={logoWhite} alt="Avala Home Concept logo" width={225} height={40} />
          </Link>
          <p className="text-sm text-text-light/55 font-light leading-relaxed max-w-xs">
            Zatvoren kompleks porodičnih kuća na Avalskoj planini — 20 minuta od Beograda.
          </p>
          <div className="flex gap-3 mt-1">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center border border-border-dark text-text-light/40 hover:border-accent hover:text-accent transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent mb-5">
              Stranice
            </p>
            <ul className="flex flex-col gap-2.5">
              {pagesLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-sm text-text-light/55 hover:text-text-light transition-colors duration-150 font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent mb-5">
              Ponuda kuća
            </p>
            <ul className="flex flex-col gap-2.5">
              {offerLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-sm text-text-light/55 hover:text-text-light transition-colors duration-150 font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent mb-5">
            Kontakt
          </p>
          <ul className="flex flex-col gap-2.5">
            {contacts.map(({ href, Icon, label, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-3 text-sm font-light text-text-light/55 hover:text-text-light transition-colors duration-150 group"
                >
                  <span className="w-7 h-7 flex items-center justify-center border border-border-dark text-text-light/30 group-hover:border-accent/50 group-hover:text-accent transition-all duration-200 flex-shrink-0">
                    <Icon className="w-3 h-3" />
                  </span>
                  {label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3 text-sm font-light text-text-light/55 mt-1">
              <span className="w-7 h-7 flex items-center justify-center border border-border-dark text-text-light/30 flex-shrink-0">
                <LuMapPin className="w-3 h-3" />
              </span>
              Avala, Beograd, Srbija
            </li>
          </ul>
        </div>

      </div>
    </div>

    <div className="border-t border-border-dark">
      <div className="safe-zone py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[0.75rem] text-text-light/35">
        <p>© {new Date().getFullYear()} Avala Home Concept. Sva prava zadržana.</p>
        <p>
          Developed by{' '}
          <a
            href="https://nemanjas.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors duration-150"
          >
            nemanjas.dev
          </a>
        </p>
      </div>
    </div>
  </footer>
);
