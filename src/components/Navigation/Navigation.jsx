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
            <Link to="/projects">Projekti</Link>
          </li>
          <li>
            <Link to="/specifications">Specifikacije</Link>
          </li>
          <li>
            <Link to="/contact">Kontakt</Link>
          </li>
        </ul>
        <Link to="/contact">
          <button className="cta-button">ZAKAŽI POSETU</button>
        </Link>
      </div>
    </nav>
  );
};
