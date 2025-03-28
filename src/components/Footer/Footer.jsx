import { facebookIcon, instagramIcon, linkedInIcon, logoWhite } from "@/assets";
import { Link } from "react-router-dom";
import "./Footer.scss";

const navLinks = [
  { path: "/", label: "Početna" },
  { path: "/about-us", label: "O nama" },
  { path: "/project1", label: "Projekat 1" },
  { path: "/project2", label: "Projekat 2" },
  { path: "/specifications", label: "Specifikacije" },
  { path: "/about-investor", label: "O investitoru" },
  { path: "/gallery", label: "Galerija" },
  { path: "/work-progress", label: "Napredak radova" },
  { path: "/contact", label: "Kontakt" },
];

export const Footer = () => {
  return (
    <div className="footer">
      <Link to="/">
        <img className="footer__logo" src={logoWhite} alt="Logo" />
      </Link>
      <p className="footer__contact">
        Telefon: <a href="tel:+381 63 383393">+381 63 383393</a>
      </p>
      <p className="footer__contact">
        Email:{" "}
        <a href="mailto:avalahomeconcept@gmail.com">
          avalahomeconcept@gmail.com
        </a>
      </p>
      <div className="footer__social-icons">
        <a
          href="https://www.facebook.com/avalahomeconcept/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="footer__social-icon"
            src={facebookIcon}
            alt="Facebook"
            width="16px"
            height="16px"
          />
        </a>
        <a
          href="https://www.instagram.com/avala_homeconcept/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="footer__social-icon"
            src={instagramIcon}
            alt="Instagram"
            width="16px"
            height="16px"
          />
        </a>
        <a
          href="https://rs.linkedin.com/in/avala-home-concept-718984276"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="footer__social-icon"
            src={linkedInIcon}
            alt="LinkedIn"
            width="16px"
            height="16px"
          />
        </a>
      </div>
      <div className="footer__sitemap">
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.label}
          </Link>
        ))}
      </div>
      <p className="footer__copyright">Copyright &#169; Avala Home Concept. Developed by <a href="https://nemanjas.dev" className="footer__signature">nemanjas.dev</a></p>
    </div>
  );
};
