import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navigation.scss";

const navLinks = [
  { path: "/", label: "Početna" },
  { path: "/about-us", label: "O nama" },
  { path: "/projects", label: "Ponuda kuća" },
  { path: "/specifications", label: "Specifikacije" },
  { path: "/about-investor", label: "O investitoru" },
  { path: "/gallery", label: "Galerija" },
  { path: "/work-progress", label: "Napredak radova" },
  { path: "/contact", label: "Kontakt" },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="container safe-zone">
        <Link to="/">
          <img src={logo} className="logo" alt="Logo" />
        </Link>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li
              key={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <Link to="/contact">
          <button className="cta-button">Zatraži ponudu</button>
        </Link>
      </div>
    </nav>
  );
};
