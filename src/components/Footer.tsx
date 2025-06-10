import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>Mi<span>Gusto</span></h3>
        <p className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/carta">Carta</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/sucursales">Sucursales</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/franquicias">Franquicias</Link>
          <Link to="/venta-corporativa">Venta Corporativa</Link>
          <Link to="/proveedores">Proveedores</Link>
          <Link to="/trabaja-con-nosotros">Trabajá con nosotros</Link>
        </p>
        <p className="footer-company-name">Mi Gusto © 2024</p>
      </div>
      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>Av. Siempre Viva 742</span> Springfield, USA</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+1 555 123456</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@migusto.com.ar">support@migusto.com.ar</a></p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>Sobre la Compañía</span>
          Mi Gusto es tu destino para el sabor y la calidad en cada bocado. Nos dedicamos a crear experiencias deliciosas y momentos inolvidables.
        </p>
        <div className="footer-icons">
          <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-x-twitter"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
