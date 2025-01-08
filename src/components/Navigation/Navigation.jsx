import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="container safe-zone">
        <img src={logo} className="logo" />
        <ul className="nav-links">
          <li>
            <Link to="/">Početna</Link>
          </li>
          <li>
            <Link to="/about-us">O nama</Link>
          </li>
          <li>
            <Link to="/projects">Ponuda kuća</Link>
          </li>
          <li>
            <Link to="/specifications">Specifikacije</Link>
          </li>
          <li>
            <Link to="/about-investor">O investitoru</Link>
          </li>
          <li>
            <Link to="/gallery">Galerija</Link>
          </li>
          <li>
            <Link to="/work-progress">Napredak radova</Link>
          </li>
          <li>
            <Link to="/contact">Kontakt</Link>
          </li>
        </ul>
        <Link to="/contact">
          <button className="cta-button">Zatraži ponudu</button>
        </Link>
      </div>
    </nav>
  );
};
