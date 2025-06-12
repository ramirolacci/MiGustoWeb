import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen && menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  }, [isMenuOpen]);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/carta', label: 'Carta' },
    { path: '/productos', label: 'Productos' },
    { path: '/sucursales', label: 'Sucursales' }
  ];

  return (
    <nav
      ref={navRef}
      className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`}
      style={{
        backgroundColor: isHomePage && !isScrolled ? 'transparent' : 'rgba(0, 0, 0, 0.95)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      role="navigation"
      aria-label="Menú principal"
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: isHovered ? 1 : 0.9,
          }}
        >
          <img
            src="https://www.migusto.com.ar/assets/images/logoMGBlanco.png"
            alt="Mi Gusto"
            height="40"
            className="me-2"
            style={{
              transition: 'all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: 'translateZ(30px)',
              willChange: 'transform'
            }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú de navegación"
          aria-expanded={isMenuOpen}
          aria-controls="main-navbar-menu"
          ref={menuButtonRef}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="main-navbar-menu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link
                  className={`nav-link text-white${location.pathname === link.path ? ' nav-link-active' : ''}`}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  tabIndex={0}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <a
                className="nav-link text-white nav-link-pedir"
                href="https://pedir.migusto.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                tabIndex={0}
                aria-label="Pedir online (se abre en nueva pestaña)"
              >
                Pedir
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 