import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';
import LoversButton from './LoversButton';

const NavBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 700);

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

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    { path: '/legales', label: 'Legales' },
    { path: '/3d', label: 'Studio 3D' },
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
            height: 30px !important;
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

            {/* Logo solo visible en desktop */}
            <Link
              className="navbar-brand d-flex align-items-center navbar-brand-desktop"
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
            {/* Botón Lovers al lado del logo */}
            <LoversButton
              isOn={isSwitchOn}
              onClick={() => {
                setIsSwitchOn(true);
                setTimeout(() => {
                  navigate('/lovers');
                }, 350);
              }}
            />
            {/* Switch al lado del logo */}
            {/* Eliminar o comentar la línea:
            <Switch
              isOn={isSwitchOn}
              onClick={() => {
                setIsSwitchOn(true);
                setTimeout(() => {
                  navigate('/lovers');
                }, 350);
              }}
            />
            */}

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

            {/* Renderizo el menú colapsable solo en desktop/web */}
            {isDesktop && (
              <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="main-navbar-menu">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {navLinks.map((link) => (
                    <li key={link.path} className="nav-item">
                      <Link
                        className={`nav-link text-white${location.pathname === link.path ? ' nav-link-active' : ''}`}
                        to={link.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        tabIndex={0}
                        aria-current={location.pathname === link.path ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
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
            )}

          <div 
            ref={menuRef}
            className={`side-menu ${isMenuOpen ? 'open' : ''}`}
            id="side-menu"
          >
            {/* Botón cerrar menú hamburguesa */}
            <button
              className="side-menu-close"
              style={{
                position: 'absolute',
                top: 18,
                left: 18,
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 32,
                zIndex: 10001,
                cursor: 'pointer',
                display: 'block',
              }}
              aria-label="Cerrar menú"
              onClick={() => setIsMenuOpen(false)}
            >
              &times;
            </button>
            {/* Logo solo visible en mobile, arriba a la derecha */}
            <div className="side-menu-logo-mobile">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img
                  src="https://www.migusto.com.ar/assets/images/logoMGBlanco.png"
                  alt="Mi Gusto"
                  className="side-menu-logo-img"
                />
              </Link>
            </div>
            <ul className="side-menu-list">
              {sideMenuLinks.map((link) => (
                <li key={link.path} className="side-menu-item">
                  <Link
                    className={`side-menu-link ${location.pathname === link.path ? 'active' : ''}`}
                    to={link.path}
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
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