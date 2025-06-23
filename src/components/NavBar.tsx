import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/carta', label: 'Carta' },
    { path: '/productos', label: 'Productos' },
    { path: '/productos2', label: 'Productos2' },
    { path: '/sucursales', label: 'Sucursales' }
  ];

  const sideMenuLinks = [
    { path: '/', label: 'Home' },
    { path: '/carta', label: 'Carta' },
    { path: '/productos', label: 'Productos' },
    { path: '/sucursales', label: 'Sucursales' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/proveedores', label: 'Proveedores' },
    { path: '/trabaja-con-nosotros', label: 'Trabaja con nosotros' },
    { path: '/franquicias', label: 'Franquicias' },
    { path: '/venta-corporativa', label: 'Venta corporativa' },
    { path: '/legales', label: 'Legales' }
  ];

  return (
    <>
      <style>{`
        @keyframes goldBorderDash {
          0% { mask-position: 0% 0%; -webkit-mask-position: 0% 0%; }
          100% { mask-position: 200% 0%; -webkit-mask-position: 200% 0%; }
        }
        @keyframes switchBorderGradientMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }
        @media (max-width: 600px) {
          .switch-lovers {
            width: 64px !important;
            min-width: 64px !important;
            height: 28px !important;
            padding: 0 6px 0 0 !important;
          }
          .switch-lovers-btn {
            width: 20px !important;
            height: 20px !important;
            left: 2px !important;
            top: 50% !important;
          }
        }
      `}</style>
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
          <div className="d-flex align-items-center navbar-flex-responsive">
            <button
              className="hamburger-menu"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMenuOpen}
              aria-controls="main-navbar-menu"
              ref={menuButtonRef}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="hamburger-icon">
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
              </svg>
            </button>

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
            {/* Switch al lado del logo */}
            <label
              style={{display: 'flex', alignItems: 'center', marginLeft: 12, cursor: 'pointer'}}
              onClick={() => {
                setIsSwitchOn(true);
                setTimeout(() => {
                  window.location.href = 'https://migustodev.github.io/MiGustoLovers/';
                }, 350);
              }}
            >
              <input type="checkbox" style={{display: 'none'}} checked={isSwitchOn} readOnly />
              <span
                className="switch-lovers"
                style={{
                  height: 40,
                  border: 'none',
                  background: 'transparent',
                  borderRadius: 999,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.3s',
                  boxShadow: '0 4px 24px 0 #800000cc',
                  padding: '0 12px 0 0',
                  overflow: 'hidden',
                  width: 90,
                  minWidth: 120,
                  cursor: 'pointer',
                  opacity: 1,
                  transitionProperty: 'background, opacity',
                  transitionDuration: '0.3s, 0.4s',
                  transitionTimingFunction: 'ease, ease'
                }}
              >
                {/* Borde animado gradiente */}
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 'inherit',
                    padding: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(270deg, #c21818, #800000, #c21818)',
                    backgroundSize: '200% 100%',
                    animation: 'switchBorderGradientMove 3s linear infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    border: '2px solid transparent',
                    boxSizing: 'border-box'
                  }}
                />
                {/* Botón circular del switch y texto Lovers siempre a la derecha */}
                <span
                  className="switch-lovers-btn"
                  style={{
                    position: 'absolute',
                    left: 4,
                    top: '50%',
                    transform: isSwitchOn ? 'translateY(-50%) translateX(80px)' : 'translateY(-50%) translateX(0)',
                    width: 28,
                    height: 28,
                    background: '#c21818',
                    borderRadius: '50%',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    border: '2px solid #800000',
                    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                    zIndex: 1
                  }}
                ></span>
                <span
                  style={{
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: 14,
                    userSelect: 'none',
                    fontFamily: 'inherit',
                    letterSpacing: 1,
                    zIndex: 1,
                    marginLeft: isSwitchOn ? 10 : 55,
                    marginRight: 10,
                    transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)'
                  }}
                >
                  Lovers
                </span>
              </span>
            </label>

            <div className="mobile-pedir-button">
              <a
                className="nav-link text-white"
                href="https://pedir.migusto.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                aria-label="Pedir online (se abre en nueva pestaña)"
              >
                <img src="/BOTON DE HACE TU PEDIDO.png" alt="Haz tu pedido" className="btn-hacer-pedido-img" />
              </a>
            </div>
          </div>

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
              <li className="nav-item desktop-pedir-button">
                <a
                  className="nav-link text-white nav-link-pedir"
                  href="https://pedir.migusto.com.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  tabIndex={0}
                  aria-label="Pedir online (se abre en nueva pestaña)"
                >
                  <img src="/BOTON DE HACE TU PEDIDO.png" alt="Haz tu pedido" className="btn-hacer-pedido-img" />
                </a>
              </li>
            </ul>
          </div>

          <div 
            ref={menuRef}
            className={`side-menu ${isMenuOpen ? 'open' : ''}`}
            id="side-menu"
          >
            <ul className="side-menu-list">
              {sideMenuLinks.map((link) => (
                <li key={link.path} className="side-menu-item">
                  <Link
                    className={`side-menu-link ${location.pathname === link.path ? 'active' : ''}`}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    tabIndex={0}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;