import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)',
            transition: 'all 0.3s ease',
            filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
          }}
        >
          <img
            src="https://www.migusto.com.ar/assets/images/logoMGBlanco.png"
            alt="Mi Gusto"
            height="40"
            className="me-2"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/' ? ' nav-link-active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/carta' ? ' nav-link-active' : ''}`}
                to="/carta"
              >
                Carta
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/productos' ? ' nav-link-active' : ''}`}
                to="/productos"
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/sucursales' ? ' nav-link-active' : ''}`}
                to="/sucursales"
              >
                Sucursales
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href="https://pedir.migusto.com.ar/"
                rel="noopener noreferrer"
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

export default Navbar;
