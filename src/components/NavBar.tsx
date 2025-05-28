import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm" 
    style={{ backgroundColor: '#ED813C' }}>
      <div className="container-fluid">
        <a 
          className="navbar-brand d-flex align-items-center" 
          href="https://www.migusto.com.ar" 
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)',
            transition: 'all 0.3s ease',
            filter: isHovered ? 'brightness(1.2)' : 'brightness(1)'
          }}
        >
          <img
            src="https://www.migusto.com.ar/assets/images/logoMGBlanco.png"
            alt="Mi Gusto"
            height="40"
            className="me-2"
          />
        </a>
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
              <Link className="nav-link text-white" to="/">
                Carta
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/sucursales">
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
