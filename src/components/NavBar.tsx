import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`}
      style={{
        backgroundColor: isHomePage && !isScrolled ? 'transparent' : 'rgba(0, 0, 0, 0.95)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
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
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/' ? ' nav-link-active' : ''}`}
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/carta' ? ' nav-link-active' : ''}`}
                to="/carta"
                onClick={() => setIsMenuOpen(false)}
              >
                Carta
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/productos' ? ' nav-link-active' : ''}`}
                to="/productos"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/sucursales' ? ' nav-link-active' : ''}`}
                to="/sucursales"
                onClick={() => setIsMenuOpen(false)}
              >
                Sucursales
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/nosotros' ? ' nav-link-active' : ''}`}
                to="/nosotros"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white nav-link-venta-corporativa"
                to="/venta-corporativa"
                onClick={() => setIsMenuOpen(false)}
              >
                Venta Corporativa
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white nav-link-pedir"
                href="https://pedir.migusto.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
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
