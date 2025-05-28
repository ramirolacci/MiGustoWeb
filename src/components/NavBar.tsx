import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="https://www.migusto.com.ar" rel="noopener noreferrer">
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
              <Link className="nav-link" to="/">
                Carta
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sucursales">
                Sucursales
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://pedir.migusto.com.ar/"
                target="_blank"
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
