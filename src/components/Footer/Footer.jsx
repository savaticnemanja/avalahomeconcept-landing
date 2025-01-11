import { facebookIcon, instagramIcon, linkedInIcon, logoWhite } from "@/assets";
import { Link } from "react-router-dom";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <img className="footer__logo" src={logoWhite} alt="Logo" />
      <p className="footer__contact">Telefon: +381 63 383393</p>
      <p className="footer__contact">Email: avalahomeconcept@gmail.com</p>
      <div className="footer__social-icons">
        <img
          className="footer__social-icon"
          src={facebookIcon}
          alt="Facebook"
          width="16px"
          height="16px"
        />
        <img
          className="footer__social-icon"
          src={instagramIcon}
          alt="Instagram"
          width="16px"
          height="16px"
        />
        <img
          className="footer__social-icon"
          src={linkedInIcon}
          alt="LinkedIn"
          width="16px"
          height="16px"
        />
      </div>
      <div className="footer__sitemap">
        <Link to="/">Početna</Link>
        <Link to="/about-us">O nama</Link>
        <Link to="/projects">Ponuda kuća</Link>
        <Link to="/specifications">Specifikacije</Link>
        <Link to="/about-investor">O investitoru</Link>
        <Link to="/gallery">Galerija</Link>
        <Link to="/work-progress">Napredak radova</Link>
        <Link to="/contact">Kontakt</Link>
      </div>
      <p className="footer__copyright">Copyright &#169; Avala Home Concept</p>
    </div>
  );
};
