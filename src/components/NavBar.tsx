import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';
import LoversButton from './LoversButton';
import { TimelineLite } from 'gsap';

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
  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
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
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

const NavBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 700);
  const [navRevealPlayed, setNavRevealPlayed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // setIsScrolled(window.scrollY > 50); // Eliminado
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
    { path: '/', label: 'Home' },
    { path: '/carta', label: 'Carta' },
    { path: '/productos', label: 'Productos' },
    { path: '/sucursales', label: 'Sucursales' }
  ];

  // 2. Agregar propiedad image a los links del menú colapsable
  const allSideMenuLinks = [
    { path: '/', label: 'Home', image: 'https://picsum.photos/600/400?random=1' },
    { path: '/carta', label: 'Carta', image: 'https://picsum.photos/600/400?random=2' },
    { path: '/productos', label: 'Productos', image: 'https://picsum.photos/600/400?random=3' },
    { path: '/sucursales', label: 'Sucursales', image: 'https://picsum.photos/600/400?random=4' },
    { path: '/nosotros', label: 'Nosotros', image: 'https://picsum.photos/600/400?random=5' },
    { path: '/proveedores', label: 'Proveedores', image: 'https://picsum.photos/600/400?random=6' },
    { path: '/trabaja-con-nosotros', label: 'Trabaja con nosotros', image: 'https://picsum.photos/600/400?random=7' },
    { path: '/franquicias', label: 'Franquicias', image: 'https://picsum.photos/600/400?random=8' },
    { path: '/venta-corporativa', label: 'Venta corporativa', image: 'https://picsum.photos/600/400?random=9' },
    { path: '/legales', label: 'Legales', image: 'https://picsum.photos/600/400?random=10' },
    { path: '/3d', label: 'Studio 3D', image: 'https://picsum.photos/600/400?random=11' },
  ];

  // En desktop oculto los links pedidos, en mobile muestro todos
  const sideMenuLinks = isDesktop
    ? allSideMenuLinks.filter(link => !['Home', 'Carta', 'Productos', 'Sucursales', 'Legales'].includes(link.label))
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
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
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
              autoConfetti={location.pathname === '/lovers'}
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
                  {navLinks.map((link, idx) => (
                    <li key={link.path} className="nav-item">
                      <Link
                        className={`nav-link text-white epic-reveal${navRevealPlayed ? ' animation-played' : ''}${location.pathname === link.path ? ' nav-link-active' : ''}`}
                        to={link.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;