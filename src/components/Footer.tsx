import React, { useState, useEffect } from "react";
import SocialBlock from './SocialBlock';
import { Link } from 'react-router-dom';
import './Footer.css';

declare global {
  interface Window {
    fcn_goAPP: (type: number) => void;
    fcn_open_contact: (type: string) => void;
  }
}

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // set initial value
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Ocultar el botón si el body tiene la clase 'ocultar-navbar' (modal 3D abierto)
  const isModal3DOpen = typeof document !== 'undefined' && document.body.classList.contains('ocultar-navbar');

  return (
    <footer className="main-footer" role="contentinfo" aria-label="Pie de página">
      <div className="footer-container">
        <div className="footer-row">
          {/* Logo y marca */}
          <div className="footer-col-md-3">
            <div className="footer-logo-divider-vertical" aria-hidden="true"></div>
            <a href="#top" className="footer-logo-link" onClick={handleLinkClick} aria-label="Ir al inicio de la página">
              <img
                src="https://www.migusto.com.ar/assets/images/logoMGBlanco.png"
                alt="Mi Gusto Empanadas de Verdad"
                className="footer-logo-img"
              />
            </a>
            <div className="footer-logo-divider-vertical-bottom" aria-hidden="true"></div>
            {/* Línea y punto: desktop a la derecha, mobile debajo */}
            {isMobile ? (
              <>
                <div className="footer-logo-divider" aria-hidden="true"></div>
                <div className="footer-logo-dot" aria-hidden="true"></div>
              </>
            ) : (
              <div className="footer-logo-divider" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <div style={{ height: '2px', background: 'rgba(255,255,255,0.4)', width: '100%' }}></div>
                  <span className="footer-divider-point subfiltro-icon" role="img" aria-label="clasica" style={{ position: 'absolute', right: -20, top: '-48%', transform: 'translateY(-50%)', fontSize: '1.4em' }}>●</span>
                </div>
              </div>
            )}
          </div>

          {/* Links: mobile juntos, desktop en columnas de 4 links */}
          {isMobile ? (
            <div className="footer-col-md-3" style={{ width: '100%' }}>
              <ul className="footer-links-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2rem' }}>
                {/* Columna 1 */}
                <li className="footer-link-item"><Link to="/" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Home">Home</Link></li>
                <li className="footer-link-item"><Link to="/carta" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Carta">Carta</Link></li>
                <li className="footer-link-item"><Link to="/productos" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Productos">Productos</Link></li>
                <li className="footer-link-item"><Link to="/sucursales" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Sucursales">Sucursales</Link></li>
                {/* Columna 2 */}
                <li className="footer-link-item"><Link to="/3d" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Studio 3D">Studio 3D</Link></li>
                <li className="footer-link-item"><Link to="/nosotros" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Nosotros">Nosotros</Link></li>
                <li className="footer-link-item"><Link to="/proveedores" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Proveedores">Proveedores</Link></li>
                <li className="footer-link-item"><Link to="/trabaja-con-nosotros" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Trabajá con nosotros">Trabajá con nosotros</Link></li>
                {/* Columna 3 */}
                <li className="footer-link-item"><Link to="/franquicias" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Franquicias">Franquicias</Link></li>
                <li className="footer-link-item"><Link to="/venta-corporativa" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Venta Corporativa">Venta Corporativa</Link></li>
                <li className="footer-link-item"><Link to="/legales" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Legales">Legales</Link></li>
                <li className="footer-link-item"><a href="https://www.argentina.gob.ar/defensadelconsumidor" className="footer-link" target="_blank" rel="noopener noreferrer" tabIndex={0} aria-label="Ir a Defensa al consumidor">Defensa al consumidor</a></li>
              </ul>
            </div>
          ) : (
            <>
              {/* Columna 1 */}
              <div className="footer-col-md-3">
                <ul className="footer-links-list">
                  <li className="footer-link-item"><Link to="/" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Home">Home</Link></li>
                  <li className="footer-link-item"><Link to="/carta" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Carta">Carta</Link></li>
                  <li className="footer-link-item"><Link to="/productos" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Productos">Productos</Link></li>
                  <li className="footer-link-item"><Link to="/sucursales" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Sucursales">Sucursales</Link></li>
                </ul>
              </div>
              {/* Columna 2 */}
              <div className="footer-col-md-3">
                <ul className="footer-links-list">
                  <li className="footer-link-item"><Link to="/3d" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Studio 3D">Studio 3D</Link></li>
                  <li className="footer-link-item"><Link to="/nosotros" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Nosotros">Nosotros</Link></li>
                  <li className="footer-link-item"><Link to="/proveedores" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Proveedores">Proveedores</Link></li>
                  <li className="footer-link-item"><Link to="/trabaja-con-nosotros" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Trabajá con nosotros">Trabajá con nosotros</Link></li>
                </ul>
              </div>
              {/* Columna 3 */}
              <div className="footer-col-md-3">
                <ul className="footer-links-list">
                  <li className="footer-link-item"><Link to="/franquicias" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Franquicias">Franquicias</Link></li>
                  <li className="footer-link-item"><Link to="/venta-corporativa" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Venta Corporativa">Venta Corporativa</Link></li>
                  <li className="footer-link-item"><Link to="/legales" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={0} aria-label="Ir a Legales">Legales</Link></li>
                  <li className="footer-link-item"><a href="https://www.argentina.gob.ar/defensadelconsumidor" className="footer-link" target="_blank" rel="noopener noreferrer" tabIndex={0} aria-label="Ir a Defensa al consumidor">Defensa al consumidor</a></li>
                </ul>
              </div>
            </>
          )}

          {/* Redes sociales y apps */}
              {/* SocialBlock como última columna */}
              <div className="footer-social-block">
                <SocialBlock />
              </div>
        </div>

        <div className="footer-row">
          <div className="footer-col-12">
            <p className="footer-final-text">
              © 2025 Mi Gusto. Todos los derechos reservados | <strong>La Honoria Alimentos S.A.</strong> – Argentina CUIT: 30-71558654-8<br />
              <span style={{ display: 'block', marginTop: '0.5rem' }}>Desarrollado por el equipo de Sistemas y Desarrollo de <strong>Mi Gusto.</strong></span>
            </p>
          </div>
        </div>
      </div>

      {showScrollTop && !isModal3DOpen && (
        <button
          className="scroll-top-button boton-scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver arriba"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      )}
    </footer>
  );
};

export default Footer;