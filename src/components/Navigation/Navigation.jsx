import { arrowDown } from "@/assets";
import logo from "@/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navigation.scss";

const navLinks = [
  { path: "/", label: "Početna" },
  { path: "/about-us", label: "O nama" },
  {
    label: "Ponuda kuća",
    subLinks: [
      { path: "/project1", label: "Projekat 1" },
      { path: "/project2", label: "Projekat 2" },
      { path: "/small-houses", label: "Kuće 80-100m²" },
    ],
  },
  { path: "/specifications", label: "Specifikacije" },
  { path: "/about-investor", label: "O investitoru" },
  { path: "/gallery", label: "Galerija" },
  { path: "/work-progress", label: "Napredak radova" },
  { path: "/contact", label: "Kontakt" },
];

export const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileMenuVisible(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
    setActiveDropdown(null);
  };

  const handleLinkClick = (hasSubLinks, label, e) => {
    if (window.innerWidth <= 768 && hasSubLinks) {
      e.preventDefault();
      toggleDropdown(label);
    } else {
      closeMobileMenu();
    }
  };

  const handleArrowClick = (e, label) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown(label);
  };

  return (
    <nav className="navigation" ref={navRef}>
      <div className="container safe-zone">
        <Link to="/" onClick={closeMobileMenu}>
          <img src={logo} className="logo" alt="Logo" />
        </Link>
        <button className="mobile-menu-icon" onClick={() => setMobileMenuVisible(!mobileMenuVisible)}>
          <img
            src={arrowDown}
            alt="Menu Icon"
            className={mobileMenuVisible ? "rotate" : ""}
          />
        </button>
        <ul className={`nav-links ${mobileMenuVisible ? "visible" : ""}`}>
          {navLinks.map((link) => (
            <li
              key={link.label}
              onMouseEnter={() => window.innerWidth > 768 && link.subLinks && setActiveDropdown(link.label)}
              onMouseLeave={() => window.innerWidth > 768 && link.subLinks && setActiveDropdown(null)}
            >
              <div className="nav-item-container">
                <Link 
                  to={link.path || "#"} 
                  onClick={(e) => handleLinkClick(!!link.subLinks, link.label, e)}
                >
                  {link.label}
                </Link>
                {link.subLinks && (
                  <button 
                    className="arrow-button"
                    onClick={(e) => handleArrowClick(e, link.label)}
                  >
                    <img
                      src={arrowDown}
                      className={`arrow-down ${activeDropdown === link.label ? "rotate" : ""}`}
                      alt="Arrow Down"
                    />
                  </button>
                )}
              </div>
              {link.subLinks && (
                <ul className={`dropdown ${activeDropdown === link.label ? "visible" : ""}`}>
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.label}>
                      <Link to={subLink.path} onClick={closeMobileMenu}>{subLink.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="cta-link" onClick={closeMobileMenu}>
          <button className="cta-button">
            Zatraži ponudu
            <FaQuestionCircle />
          </button>
        </Link>
      </div>
    </nav>
  );
};