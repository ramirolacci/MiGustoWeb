import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';
import LoversButton from './LoversButton';
import { TimelineLite } from 'gsap';
import { getToken, logout } from '../services/auth';
import { getMe } from '../services/user';
import { useCart } from '../context/CartContext';

function ProfileButton() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const token = getToken();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target);
      const clickedOutsideProfile = profileRef.current && !profileRef.current.contains(target);
      if (clickedOutsideDropdown && clickedOutsideProfile) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    (async () => {
      if (!token) {
        setUserName('');
        return;
      }
      try {
        const me = await getMe();
        setUserName(me?.name || '');
      } catch {
        // ignore fetch errors silently
      }
    })();
  }, [token]);

  // Escuchar actualizaciones del perfil para refrescar el nombre mostrado
  useEffect(() => {
    const handler = (e: any) => {
      if (e?.detail?.name) setUserName(e.detail.name);
    };
    window.addEventListener('mg_profile_updated', handler as EventListener);
    return () => window.removeEventListener('mg_profile_updated', handler as EventListener);
  }, []);

  const avatar = (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ cursor: 'pointer' }}
      onClick={() => setShowProfile((v) => !v)}
      aria-haspopup="dialog"
      aria-expanded={showProfile}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          border: '1.5px solid #fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.1)'
        }}
      >
        {/* ícono usuario genérico blanco */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="#fff">
          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
        </svg>
      </div>
      <small className="text-white" style={{ opacity: 0.9, fontSize: '0.72rem', lineHeight: 1 }}>
        {token ? (userName ? userName.split(' ')[0] : 'Mi cuenta') : 'Iniciar sesión'}
      </small>
    </div>
  );

  return (
    <div className="position-relative navbar-profile" ref={dropdownRef}>
      {avatar}
      {showProfile && (
        <div
          ref={profileRef}
          className="card profile-panel"
          style={{ position: 'absolute', left: 0, top: 60, width: 320, zIndex: 11000, overflow: 'hidden' }}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-3 d-flex align-items-center justify-content-between" style={{ borderBottom: '1px solid #eee' }}>
            <h5 className="mb-0" style={{ fontWeight: 700 }}>Mi Cuenta</h5>
            <button
              aria-label="Cerrar"
              className="btn btn-link p-0"
              onClick={() => setShowProfile(false)}
              style={{ color: '#333', textDecoration: 'none' }}
            >
              {/* X icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className="p-2" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.03) 100%)' }} />
          {token && (
            <div className="px-3 pb-2 d-flex align-items-center" style={{ color: '#555' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="me-2 coin-icon"
              >
                {/* Empanada estilizada */}
                <path d="M3 13c0-5 3.5-8 9-8s9 3 9 8c0 0-3.8 3-9 3S3 13 3 13z" fill="#f2c078" stroke="#a77f00" strokeWidth="1.6" />
                {/* Borde repulgue */}
                <path d="M5 12.2c1 .6 2.2 1 3.5 1.2M8.8 13.7c1.1.2 2.3.3 3.2.3M13.7 14c1.4-.1 2.7-.4 3.8-.9M18.1 12.7c.6-.3 1.1-.6 1.6-1" stroke="#a77f00" strokeWidth="1" fill="none" strokeLinecap="round"/>
                {/* Brillo */}
                <path d="M8 8.5c1-.6 2.1-.9 3.2-1" stroke="#ffe9bf" strokeWidth="1" fill="none" strokeLinecap="round"/>
              </svg>
              <strong>MiGusto Coins: 888</strong>
            </div>
          )}
          {token ? (
            <div className="list-group list-group-flush">
              <button className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => { setShowProfile(false); navigate('/mi-cuenta'); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-3"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Datos personales
              </button>
              <button className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => {}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-3"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Direcciones guardadas
              </button>
              <button className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => {}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Historial de pedidos
              </button>
              <button className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => {}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Inicio de sesión y seguridad
              </button>
              <button className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => { logout(); setShowProfile(false); navigate('/'); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="p-3">
              <button className="btn btn-dark w-100 mb-2" onClick={() => { setShowProfile(false); navigate('/login'); }}>Iniciar sesión</button>
              <button className="btn btn-outline-dark w-100" onClick={() => { setShowProfile(false); navigate('/register'); }}>Registrarse</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 1. Tipado para SideMenuFlowingLink
interface SideMenuFlowingLinkProps {
  link: string;
  text: string;
  image?: string;
}

function SideMenuFlowingLink({ link, text, image }: SideMenuFlowingLinkProps) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };
  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };
  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);
    const tl = new TimelineLite();
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to(marqueeRef.current, animationDefaults.duration, { y: '0%', ease: animationDefaults.ease })
      .to(marqueeInnerRef.current, animationDefaults.duration, { y: '0%', ease: animationDefaults.ease });
  };
  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);
    const tl = new TimelineLite();
    tl.to(marqueeRef.current, animationDefaults.duration, { y: edge === 'top' ? '-101%' : '101%', ease: animationDefaults.ease })
      .to(marqueeInnerRef.current, animationDefaults.duration, { y: edge === 'top' ? '101%' : '-101%', ease: animationDefaults.ease });
  };
  const groupContent = Array.from({ length: 10 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      {image && (
        <div
          className="marquee__img"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
    </React.Fragment>
  ));
  return (
    <div className="menu__item" ref={itemRef}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner">
            <div className="marquee__group">
              {groupContent}
            </div>
            <div className="marquee__group" aria-hidden="true">
              {groupContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const NavBar: React.FC = () => {
  const { totalItems } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 700);
  const [navRevealPlayed, setNavRevealPlayed] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
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

  useEffect(() => {
    // Solo en mobile y solo en la ruta '/3d'
    const isMobile = window.innerWidth <= 768;
    if (isMobile && location.pathname === '/3d') {
      document.body.classList.add('ruta-3d');
    } else {
      document.body.classList.remove('ruta-3d');
    }
    // Limpiar al desmontar
    return () => {
      document.body.classList.remove('ruta-3d');
    };
  }, [location.pathname]);

  // Ocultar botmaker cuando el side menu está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('side-menu-open');
    } else {
      document.body.classList.remove('side-menu-open');
    }
    return () => {
      document.body.classList.remove('side-menu-open');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!navRevealPlayed) {
      const timer = setTimeout(() => setNavRevealPlayed(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [navRevealPlayed]);

  // Eliminar las siguientes líneas:
  // const isHomePage = location.pathname === '/';
  
  const navLinks = [
    { path: '/carta', label: 'Carta' },
    { path: '/productos', label: 'Productos' },
    { path: '/sucursales', label: 'Sucursales' }
  ];

  // Flag para habilitar el botón Lovers: por defecto activado salvo que se ponga explícitamente 'false'
  const loversEnabled = (import.meta.env.VITE_LOVERS_ENABLED ?? 'true') === 'true';

  // 2. Agregar propiedad image a los links del menú colapsable
  const allSideMenuLinks = [
    { path: '/', label: 'Home', image: '' },
    { path: '/carta', label: 'Carta', image: '' },
    { path: '/productos', label: 'Productos', image: '' },
    { path: '/sucursales', label: 'Sucursales', image: '' },
    { path: '/nosotros', label: 'Nosotros', image: '/side-menu/localMiGusto.webp' },
    { path: '/proveedores', label: 'Proveedores', image: '/side-menu/proveedor.png' },
    { path: '/trabaja-con-nosotros', label: 'Trabaja con nosotros', image: '/side-menu/staff.png' },
    { path: '/franquicias', label: 'Franquicias', image: '/side-menu/franquicia.png' },
    { path: '/venta-corporativa', label: 'Venta corporativa', image: '/side-menu/corporativa.png' },
    { path: '/legales', label: 'Legales', image: '' },
    { path: '/defensa-consumidor', label: 'Defensa al consumidor', image: '' },
    { path: '/3d', label: 'Studio 3D', image: '/side-menu/EstudioFondo.png' },
  ];

  // En desktop oculto los links pedidos, en mobile muestro todos
  const sideMenuLinks = isDesktop
    ? allSideMenuLinks.filter(link => !['Home', 'Carta', 'Productos', 'Sucursales', 'Legales', 'Defensa al consumidor'].includes(link.label))
    : allSideMenuLinks;

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
        @keyframes coinPulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(212,162,0,0.0)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 8px rgba(212,162,0,0.6)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(212,162,0,0.0)); }
        }
        .coin-icon {
          filter: drop-shadow(0 0 4px rgba(212,162,0,0.45));
          animation: coinPulse 2.4s ease-in-out infinite;
          border-radius: 50%;
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
        className={`navbar navbar-expand-lg`}
        style={{
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.76)' : 'rgba(0, 0, 0, 0.92)',
          backdropFilter: isScrolled ? 'blur(6px)' : undefined,
          WebkitBackdropFilter: isScrolled ? 'blur(6px)' : undefined,
          transition: 'background-color 0.25s ease, backdrop-filter 0.25s ease',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000
        }}
        role="navigation"
        aria-label="Menú principal"
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center navbar-flex-responsive navbar-left-group">
            <button
              className="hamburger-menu"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMenuOpen}
              aria-controls="main-navbar-menu"
              ref={menuButtonRef}
            >
              <i className="fa-solid fa-bars hamburger-fa" aria-hidden="true" />
              <span className="visually-hidden">Abrir menú</span>
            </button>
            {/* Orden izquierda: Cuenta, Lovers, Canje */}
            <div className="d-flex align-items-center" style={{ gap: 8 }}>
              <ProfileButton />
              {loversEnabled && (
                <LoversButton
                  isOn={isSwitchOn}
                  autoConfetti={location.pathname === '/lovers'}
                  onClick={() => {
                    setIsSwitchOn(true);
                    setTimeout(() => {
                      navigate('/lovers');
                    }, 350);
                  }}
                />
              )}
              <button
                className={`btn btn-sm btn-canje${location.pathname === '/canje' ? ' btn-canje-active' : ''}`}
                onClick={() => navigate('/canje')}
              >
                Canje
              </button>
              {/* Botón de carrito movido al lado derecho del navbar */}
            </div>
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
                className="mobile-pedir-link"
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

          {/* Logo centrado (solo desktop) */}
          <div className="navbar-center-logo">
            <Link
              className="navbar-brand d-flex align-items-center navbar-brand-desktop"
              to="/"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isHovered ? 1 : 0.9,
              }}
            >
              <img
                src="/assets/Logo Mi Gusto 2025.png"
                alt="Mi Gusto"
                height="40"
                className={`me-2 navbar-logo-img${isHovered ? ' navbar-logo-img-hover' : ''}`}
                style={{
                  transition: 'all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: 'translateZ(30px)',
                  willChange: 'transform'
                }}
              />
            </Link>
          </div>

            {/* Renderizo el menú colapsable solo en desktop/web */}
            {isDesktop && (
              <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="main-navbar-menu">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {navLinks.map((link, idx) => (
                    <li key={link.path} className="nav-item">
                      <Link
                        className={`nav-link text-white epic-reveal${navRevealPlayed ? ' animation-played' : ''}${location.pathname === link.path ? ' nav-link-active' : ''}`}
                        to={link.path}
                        onClick={e => {
                          setIsMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          // Efecto de click animado
                          const target = e.currentTarget;
                          target.classList.add('nav-link-clicked');
                          setTimeout(() => target.classList.remove('nav-link-clicked'), 350);
                        }}
                        tabIndex={0}
                        aria-current={location.pathname === link.path ? 'page' : undefined}
                        style={{ '--nav-index': idx } as React.CSSProperties }
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
                      onClick={e => {
                        setIsMenuOpen(false);
                        // Efecto de click animado
                        const target = e.currentTarget;
                        target.classList.add('nav-link-clicked');
                        setTimeout(() => target.classList.remove('nav-link-clicked'), 350);
                      }}
                      tabIndex={0}
                      aria-label="Pedir online (se abre en nueva pestaña)"
                    >
                      <img src="/BOTON DE HACE TU PEDIDO.png" alt="Haz tu pedido" className="btn-hacer-pedido-img" />
                    </a>
                  </li>
                  
                  {/* Botón de carrito: al lado del botón de "Hacé tu pedido" */}
                  <li className="nav-item d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-light position-relative ms-2"
                      onClick={() => setIsCartOpen(true)}
                      aria-label="Abrir carrito"
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      {totalItems > 0 && (
                        <span
                          style={{
                            position: 'absolute',
                            top: -6,
                            right: -6,
                            background: '#dc3545',
                            color: '#fff',
                            borderRadius: 12,
                            fontSize: 10,
                            padding: '2px 6px',
                            lineHeight: 1,
                            minWidth: 18,
                            textAlign: 'center'
                          }}
                        >
                          {totalItems}
                        </span>
                      )}
                    </button>
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
              aria-label="Cerrar menú"
              onClick={() => {
                setIsMenuOpen(false);
                // setHoveredMenu(null); // Eliminado
              }}
            >
              &times;
            </button>
            <div className="side-menu-left side-menu-centered">
              <ul className="side-menu-list flowing-menu-list">
                {sideMenuLinks.map((link) => (
                  <li key={link.path + '-' + isMenuOpen} className="side-menu-item flowing-menu-item">
                    <SideMenuFlowingLink
                      link={link.path}
                      text={link.label}
                      image={link.image || undefined}
                    />
                  </li>
                ))}
              </ul>
              {/* Ícono de cuenta removido del menú mobile */}
            </div>
          </div>
        </div>
      </nav>
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsCartOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 11000,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: 'min(420px, 95vw)',
              height: '100%',
              background: '#111',
              color: '#fff',
              padding: 16,
              boxShadow: '-8px 0 24px rgba(0,0,0,0.35)',
              overflowY: 'auto'
            }}
          >
            <CartPanel onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;

function CartPanel({ onClose }: { onClose: () => void }) {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="mb-0">Tu carrito</h5>
        <button className="btn btn-sm btn-outline-light" onClick={onClose} aria-label="Cerrar">×</button>
      </div>
      {items.length === 0 ? (
        <p style={{ opacity: 0.8 }}>Aún no agregaste productos.</p>
      ) : (
        <div>
          {items.map(it => (
            <div key={it.id} className="d-flex align-items-center mb-3" style={{ gap: 12 }}>
              <img src={it.image} alt={it.title} width={56} height={56} style={{ objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{it.title}</div>
                <div style={{ opacity: 0.85 }}>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(it.price)}</div>
                <div className="d-flex align-items-center mt-1" style={{ gap: 8 }}>
                  <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(it.id, it.quantity - 1)} aria-label="Disminuir">-</button>
                  <span>{it.quantity}</span>
                  <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(it.id, it.quantity + 1)} aria-label="Aumentar">+</button>
                </div>
              </div>
              <div className="text-end">
                <div style={{ fontWeight: 600 }}>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(it.price * it.quantity)}</div>
                <button className="btn btn-sm btn-outline-danger mt-1" onClick={() => removeItem(it.id)}>Quitar</button>
              </div>
            </div>
          ))}
          <hr style={{ borderColor: '#333' }} />
          <div className="d-flex align-items-center justify-content-between">
            <strong>Subtotal</strong>
            <strong>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(subtotal)}</strong>
          </div>
          <button
            className="btn btn-warning w-100 mt-3"
            onClick={() => { onClose(); navigate('/checkout'); }}
          >
            Continuar a pagar
          </button>
        </div>
      )}
    </div>
  );
}