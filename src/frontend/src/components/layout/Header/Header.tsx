/**
 * Header Component - Grupo Naser CMS
 * Header pixel perfect siguiendo exactamente el diseño original
 */

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Detectar scroll para header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { path: "/", label: "Inicio" },
    { path: "/nosotros", label: "Nosotros" },
    { path: "/historia", label: "Historia" },
    {
      path: "/servicios",
      label: "Servicios",
      submenu: [
        { path: "/necesidad-inmediata", label: "Necesidad Inmediata" },
        { path: "/prevision", label: "Previsión" },
      ],
    },
    { path: "/cobertura", label: "Cobertura" },
    { path: "/obituario", label: "Obituario" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
        className || ""
      }`}
    >
      {/* Sub-header con información de contacto */}
      <div className={styles.subHeader}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <span className={styles.phone}>
              <i className="fas fa-phone" aria-hidden="true"></i>
              55 5688 7866
            </span>
            <span className={styles.email}>
              <i className="fas fa-envelope" aria-hidden="true"></i>
              info@naser.com.mx
            </span>
          </div>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/funerariasnaser" aria-label="Facebook" className={styles.socialLink}>
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img
              src="/assets/images/logo_naser.png"
              alt="Grupo Naser - Servicios Funerarios"
              className={styles.logoImage}
              width="95"
            />
          </Link>

          {/* Navegación desktop */}
          <nav className={styles.navigation} role="navigation">
            <ul className={styles.navList}>
              {navigationItems.map((item) => (
                <li key={item.path} className={styles.navItem}>
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${
                      location.pathname === item.path ? styles.active : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <ul className={styles.submenu}>
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={styles.submenuLink}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Botón menú móvil */}
          <button
            className={`${styles.mobileMenuButton} ${
              isMenuOpen ? styles.open : ""
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú de navegación"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        <nav className={styles.mobileNavigation}>
          <ul className={styles.mobileNavList}>
            {navigationItems.map((item) => (
              <li key={item.path} className={styles.mobileNavItem}>
                <Link
                  to={item.path}
                  className={`${styles.mobileNavLink} ${
                    location.pathname === item.path ? styles.active : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <ul className={styles.mobileSubmenu}>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={subItem.path}
                          className={styles.mobileSubmenuLink}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay para cerrar menú móvil */}
      {isMenuOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Header;