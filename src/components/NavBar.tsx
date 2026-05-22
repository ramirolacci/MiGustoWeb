import { assetUrl } from '../utils/assetUrl';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { TimelineLite } from 'gsap';
import { getToken, logout } from '../services/auth';
import { getMe } from '../services/user';
import { useCart } from '../context/CartContext';
import { trackEvent } from '../services/analytics';
import { pizzas } from '../data/pizzasData';
import { empanadas } from '../data/empanadasData';
import { fitzzas } from '../data/fitzzasData';
import { pizzasIndi } from '../data/pizzasIndiData';
import { salsas } from '../data/salsasData';
import { postres } from '../data/postresData';
import { promociones } from '../data/promocionesData';
import { sucursales as sucursalesData } from '../data/sucursalesData';

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
  onNavigate?: () => void;
}

function SideMenuFlowingLink({ link, text, image, onNavigate }: SideMenuFlowingLinkProps) {
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
  const handleMouseEnter = (ev: React.MouseEvent) => {
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
  const handleMouseLeave = (ev: React.MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);
    const tl = new TimelineLite();
    tl.to(marqueeRef.current, animationDefaults.duration, { y: edge === 'top' ? '-101%' : '101%', ease: animationDefaults.ease })
      .to(marqueeInnerRef.current, animationDefaults.duration, { y: edge === 'top' ? '101%' : '-101%', ease: animationDefaults.ease });
  };
  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // Siempre mostrar texto repetido en lugar de imágenes
  const groupContent = Array.from({ length: 20 }).map((_, idx) => (
    <span key={idx}>{text}</span>
  ));
  return (
    <div className="menu__item" ref={itemRef}>
      <Link
        className="menu__item-link"
        to={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {text}
      </Link>
      <div className="marquee" ref={marqueeRef} data-images-only="false">
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

function FullPizzaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#f5c16c" stroke="#b87333" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="7.6" fill="#ffd35c" />
      <circle cx="9" cy="8.8" r="1.1" fill="#d94c48" />
      <circle cx="15.3" cy="9.6" r="1.1" fill="#d94c48" />
      <circle cx="12.6" cy="14.2" r="1.1" fill="#d94c48" />
      <line x1="12" y1="12" x2="20" y2="12" stroke="#b87333" strokeWidth="0.9" />
      <line x1="12" y1="12" x2="16.8" y2="5.5" stroke="#b87333" strokeWidth="0.9" />
      <line x1="12" y1="12" x2="6.8" y2="17.8" stroke="#b87333" strokeWidth="0.9" />
    </svg>
  );
}

const NavBar: React.FC = () => {
  const { totalItems } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 700);
  const [navRevealPlayed, setNavRevealPlayed] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productosDropdownOpen, setProductosDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [logoLeftPx, setLogoLeftPx] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<Array<{ id: string; type: 'producto' | 'sucursal'; label: string; meta?: string; query: string; score: number }>>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsCloseTimer = useRef<number | null>(null);

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

  // Enfocar input al abrir búsqueda
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Recalcular posición del logo para que quede a la izquierda del buscador
  useEffect(() => {
    const recalcLogo = () => {
      try {
        if (!isSearchOpen) {
          setLogoLeftPx(null);
          return;
        }
        const container = containerRef.current;
        const searchForm = searchFormRef.current;
        const logo = logoRef.current;
        if (!container || !searchForm || !logo) return;
        const containerRect = container.getBoundingClientRect();
        const searchRect = searchForm.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();
        const gap = 32;
        const desiredLeftViewport = Math.max(8, searchRect.left - gap - logoRect.width);
        const desiredLeft = desiredLeftViewport - containerRect.left;
        setLogoLeftPx(desiredLeft);
      } catch {}
    };
    const timer = setTimeout(recalcLogo, 140);
    window.addEventListener('resize', recalcLogo);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', recalcLogo);
    };
  }, [isSearchOpen]);

  // Cerrar búsqueda al cambiar de ruta
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSuggestions([]);
    setActiveIndex(-1);
  }, [location.pathname]);

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

  // Calcular sugerencias con debounce cuando cambia el query
  useEffect(() => {
    if (!isSearchOpen) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }
    const q = searchQuery.trim();
    if (q.length === 0) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const handle = window.setTimeout(() => {
      const normalize = (str: string) => str
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}+/gu, '');
      const qn = normalize(q);

      const mkProductSuggestion = (item: any, categoria: string) => {
        const label = String(item.titulo || '').trim() || String(item.nombre || '').trim() || categoria;
        const meta = categoria;
        const texto = [
          item.titulo,
          item.descripcion,
          Array.isArray(item.ingredientes) ? item.ingredientes.join(' ') : '',
          categoria,
        ].filter(Boolean).join(' ');
        const t = normalize(String(texto));
        let score = 0;
        if (t.includes(qn)) score += 2;
        if (normalize(String(item.titulo || '')).startsWith(qn)) score += 2;
        if (normalize(String(categoria)).includes(qn)) score += 1;
        return { id: `p-${label}-${categoria}`, type: 'producto' as const, label, meta, query: label, score };
      };

      const productSuggestions: Array<{ id: string; type: 'producto'; label: string; meta?: string; query: string; score: number }> = [];
      const datasets: Array<{ data: any[]; categoria: string }> = [
        { data: empanadas as any[], categoria: 'Empanadas' },
        { data: pizzas as any[], categoria: 'Pizzas' },
        { data: pizzasIndi as any[], categoria: 'Pizzas INDI' },
        { data: fitzzas as any[], categoria: 'Fitzzas' },
        { data: salsas as any[], categoria: 'Salsas' },
        { data: postres as any[], categoria: 'Postres' },
        { data: promociones as any[], categoria: 'Promos y Packs' },
      ];
      for (const { data, categoria } of datasets) {
        for (const it of data) {
          const s = mkProductSuggestion(it, categoria);
          if (s.score > 0) productSuggestions.push(s);
        }
      }

      const branchSuggestions = sucursalesData.map(s => {
        const texto = [s.nombre, s.localidad, s.provincia, s.direccion].filter(Boolean).join(' ');
        const t = normalize(String(texto));
        let score = 0;
        if (t.includes(qn)) score += 2;
        if (normalize(String(s.nombre)).startsWith(qn)) score += 2;
        const hints = ['sucursal', 'local', 'tienda', 'direccion', 'dirección', 'mapa'];
        if (hints.some(h => qn.includes(normalize(h)))) score += 1;
        return { id: `s-${s.nombre}-${s.localidad}`, type: 'sucursal' as const, label: s.nombre, meta: [s.localidad, s.provincia].filter(Boolean).join(', '), query: s.nombre, score };
      }).filter(s => s.score > 0);

      const combined = [...productSuggestions, ...branchSuggestions]
        .sort((a, b) => b.score - a.score || a.label.length - b.label.length)
        .slice(0, 8);

      setSuggestions(combined);
      try {
        if (combined.length > 0) {
          trackEvent('view_search_results', {
            search_term: q,
            results: combined.length,
          });
        }
      } catch {}
      setActiveIndex(combined.length > 0 ? 0 : -1);
    }, 180);

    return () => window.clearTimeout(handle);
  }, [searchQuery, isSearchOpen]);

  // Cerrar dropdown de sugerencias al hacer click fuera del formulario de búsqueda
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!searchFormRef.current) return;
      if (!searchFormRef.current.contains(target)) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!navRevealPlayed) {
      const timer = setTimeout(() => setNavRevealPlayed(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [navRevealPlayed]);

  // Eliminar las siguientes líneas:
  // const isHomePage = location.pathname === '/';
  
  const navLinks = [
    { path: '/productos', label: 'Productos' },
    { path: '/sucursales', label: 'Sucursales' }
  ];


  // 2. Agregar propiedad image a los links del menú colapsable
  const allSideMenuLinks = [
    { path: '/', label: 'Inicio', icon: 'fa-house' },
    { path: '/productos', label: 'Productos 1', icon: 'fa-utensils' },
    { path: '/productos2', label: 'Productos 2', icon: 'fa-cube' },
    { path: '/sucursales', label: 'Sucursales', icon: 'fa-location-dot' },
    { path: '/nosotros', label: 'Nuestra Historia', icon: 'fa-star' },
    { path: '/proveedores', label: 'Proveedores', icon: 'fa-truck' },
    { path: '/franquicias', label: 'Franquicias', icon: 'fa-shop' },
    { path: '/venta-corporativa', label: 'Venta Corporativa', icon: 'fa-briefcase' },
    { path: '/trabaja-con-nosotros', label: 'Únete al equipo', icon: 'fa-users' },
    { path: '/legales', label: 'Legales', icon: 'fa-scale-balanced' },
    { path: '/defensa-consumidor', label: 'Defensa al Consumidor', icon: 'fa-shield-halved' },
  ];

  // En desktop oculto los links pedidos, en mobile muestro todos
  const sideMenuLinks = isDesktop
    ? allSideMenuLinks.filter(link => !['Home', 'Carta', 'Productos', 'Productos 1', 'Productos 2', 'Nuestra Carta', 'Sucursales', 'Legales', 'Defensa al consumidor'].includes(link.label))
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
        @keyframes cartBadgePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes cartIconHover {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-2px) rotate(-2deg); }
          50% { transform: translateY(-3px) rotate(0deg); }
          75% { transform: translateY(-2px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .btn-cart {
          background: linear-gradient(135deg, 
            rgba(255,255,255,0.98) 0%, 
            rgba(255,255,255,0.95) 50%, 
            rgba(255,255,255,0.92) 100%);
          border: 1.5px solid rgba(255,255,255,0.5);
          color: #2c3e50;
          border-radius: 16px;
          padding: 12px 16px;
          transition: all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(20px) saturate(1.3) brightness(1.1);
          box-shadow: 
            0 6px 25px rgba(0,0,0,0.08),
            0 2px 8px rgba(0,0,0,0.04),
            0 1px 3px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.8),
            inset 0 -1px 0 rgba(0,0,0,0.02);
          position: relative;
          overflow: visible;
        }
        .btn-cart:hover {
          background: linear-gradient(135deg, 
            rgba(255,255,255,1) 0%, 
            rgba(255,255,255,0.98) 50%, 
            rgba(255,255,255,0.96) 100%);
          border-color: rgba(255,255,255,0.8);
          transform: translateY(-4px) scale(1.03);
          box-shadow: 
            0 15px 40px rgba(0,0,0,0.12),
            0 6px 16px rgba(0,0,0,0.08),
            0 2px 8px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(0,0,0,0.03);
          color: #1a252f;
        }
        .btn-cart:hover .cart-icon {
          animation: cartIconHover 0.7s ease-in-out;
          color: #e74c3c;
        }
        .btn-cart:active {
          transform: translateY(-1px) scale(0.98);
          transition: all 0.15s ease;
          box-shadow: 
            0 6px 20px rgba(0,0,0,0.1),
            0 2px 6px rgba(0,0,0,0.06);
        }
        .cart-icon {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .productos-dropdown-container {
          position: relative;
        }
        .productos-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10, 10, 10, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          min-width: 220px;
          padding: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(212, 175, 55, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: dropdownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes dropdownFadeIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(8px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .productos-dropdown-item {
          display: flex;
          flex-direction: column;
          padding: 10px 16px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          text-align: left;
        }
        .productos-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }
        .productos-dropdown-item.active {
          background: rgba(212, 175, 55, 0.1);
          color: #D4AF37;
          border-left: 2px solid #D4AF37;
          padding-left: 14px;
        }
        .productos-dropdown-item .item-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
        }
        .productos-dropdown-item .item-subtitle {
          font-size: 0.75rem;
          opacity: 0.6;
          margin-top: 2px;
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
        <div className="container-fluid" ref={containerRef}>
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
              <svg
                className="hamburger-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                aria-hidden="true"
              >
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="visually-hidden">Abrir menú</span>
              <span className="hamburger-fallback">
                <i className="fa-solid fa-bars hamburger-fa" aria-hidden="true" />
              </span>
            </button>
            {/* Orden izquierda: ocultar Cuenta y Canje cuando el menú está abierto/colapsado */}
            {!isMenuOpen && (
              <div className="d-flex align-items-center" style={{ gap: 8 }}>
                {/** Oculto temporalmente el icono/menú de perfil (Mi cuenta) **/}
                {/** <ProfileButton /> **/}
                {/** Oculto temporalmente el botón Canje **/}
                {/**
                <button
                  className={`btn btn-sm btn-canje${location.pathname === '/canje' ? ' btn-canje-active' : ''}`}
                  onClick={() => navigate('/canje')}
                >
                  Canje
                </button>
                **/}
                {/* Botón de carrito movido al lado derecho del navbar */}
              </div>
            )}
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
                <img src={assetUrl("/images/promotions/BOTON DE HACE TU PEDIDO.png")} alt="Haz tu pedido" className="btn-hacer-pedido-img" />
              </a>
            </div>
          </div>

          {/* Logo centrado (solo desktop) */}
          <div
            className="navbar-center-logo"
            ref={logoRef}
            style={{
              left: logoLeftPx !== null ? logoLeftPx : undefined,
              transform: logoLeftPx !== null ? 'translate(0, -50%)' : undefined,
              transition: 'left 0.28s ease, transform 0.28s ease'
            }}
          >
            <Link
              className="navbar-brand d-flex flex-column align-items-center navbar-brand-desktop"
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
                src={assetUrl("/assets/Logo Mi Gusto 2025.png")}
                alt="Mi Gusto"
                height="40"
                className={`me-2 navbar-logo-img${isHovered ? ' navbar-logo-img-hover' : ''}`}
                style={{
                  transition: 'all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: 'translateZ(30px)',
                  willChange: 'transform',
                  marginRight: '0 !important' /* Reset margin to center with the stars */
                }}
              />
              {/* Tres estrellas mundialistas debajo del logo */}
              <div className="navbar-stars">
                <i className="fa-solid fa-star navbar-star-icon"></i>
                <i className="fa-solid fa-star navbar-star-icon main-star"></i>
                <i className="fa-solid fa-star navbar-star-icon"></i>
              </div>
            </Link>
          </div>

            {/* Renderizo el menú colapsable solo en desktop/web */}
            {isDesktop && (
              <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="main-navbar-menu">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {/* Buscador de navbar: ícono de lupa + input expansible hacia la izquierda */}
                  <li className="nav-item navbar-search-item">
                    <form
                      className={`navbar-search ${isSearchOpen ? 'open' : ''}`}
                      role="search"
                      ref={searchFormRef}
                      onSubmit={(e) => {
                        e.preventDefault();
                        const q = searchQuery.trim();
                        if (!q) return setIsSearchOpen(false);
                        // Búsqueda global: decidir destino según matching con productos vs sucursales
                        const normalize = (str: string) => str
                          .toLowerCase()
                          .normalize('NFD')
                          .replace(/\p{Diacritic}+/gu, '');
                        const qn = normalize(q);

                        const productDatasets: Array<any[]> = [
                          empanadas as any[],
                          pizzas as any[],
                          pizzasIndi as any[],
                          fitzzas as any[],
                          salsas as any[],
                          postres as any[],
                          promociones as any[],
                        ];

                        const productScore = (() => {
                          let score = 0;
                          for (const dataset of productDatasets) {
                            for (const item of dataset) {
                              const texto = [
                                item.titulo,
                                item.descripcion,
                                Array.isArray(item.ingredientes) ? item.ingredientes.join(' ') : '',
                                item.categoria,
                              ].filter(Boolean).join(' ');
                              if (normalize(String(texto)).includes(qn)) score++;
                            }
                          }
                          return score;
                        })();

                        const branchScore = (() => {
                          let score = 0;
                          for (const s of sucursalesData) {
                            const texto = [s.nombre, s.localidad, s.provincia, s.direccion].filter(Boolean).join(' ');
                            if (normalize(String(texto)).includes(qn)) score++;
                          }
                          // boost si el usuario menciona palabras clave de sucursales
                          const branchHints = ['sucursal', 'local', 'tienda', 'direccion', 'dirección', 'mapa'];
                          if (branchHints.some(h => qn.includes(normalize(h)))) score += 2;
                          return score;
                        })();

                        const destination = branchScore > productScore ? 'sucursales' : 'productos';
                        try {
                          trackEvent('search', {
                            search_term: q,
                            destination
                          });
                        } catch {}
                        if (destination === 'sucursales') {
                          navigate(`/sucursales?q=${encodeURIComponent(q)}`);
                        } else {
                          navigate(`/productos?search=${encodeURIComponent(q)}`);
                        }
                        setIsSearchOpen(false);
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-link p-0 navbar-search-toggle"
                        aria-label={isSearchOpen ? 'Cerrar búsqueda' : 'Buscar'}
                        title={isSearchOpen ? 'Cerrar búsqueda' : 'Buscar'}
                        aria-expanded={isSearchOpen}
                        onClick={() => {
                          const hasQuery = searchQuery.trim().length > 0;
                          if (isSearchOpen && hasQuery) {
                            try { searchFormRef.current?.requestSubmit(); } catch { /* fallback abajo */ }
                            return;
                          }
                          setIsSearchOpen((prev) => {
                            const next = !prev;
                            if (!next) setSearchQuery('');
                            return next;
                          });
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                      <input
                        ref={searchInputRef}
                        type="search"
                        className="navbar-search-input"
                        placeholder={'Buscar productos o sucursales...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (!isSearchOpen) return;
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            if (suggestions.length === 0) return;
                            setActiveIndex((idx) => (idx + 1) % suggestions.length);
                          } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            if (suggestions.length === 0) return;
                            setActiveIndex((idx) => (idx - 1 + suggestions.length) % suggestions.length);
                          } else if (e.key === 'Enter') {
                            // Si hay sugerencia activa, seleccionar; si no, dejar que onSubmit maneje
                            if (activeIndex >= 0 && activeIndex < suggestions.length) {
                              e.preventDefault();
                              const s = suggestions[activeIndex];
                              if (s.type === 'sucursal') {
                                navigate(`/sucursales?q=${encodeURIComponent(s.query)}`);
                              } else {
                                navigate(`/productos?search=${encodeURIComponent(s.query)}`);
                              }
                              setIsSearchOpen(false);
                              setSuggestions([]);
                              setActiveIndex(-1);
                            }
                          } else if (e.key === 'Escape') {
                            if (suggestions.length > 0) {
                              setSuggestions([]);
                              setActiveIndex(-1);
                            } else {
                              setIsSearchOpen(false);
                            }
                          }
                        }}
                        aria-label="Campo de búsqueda"
                      />
                      {isSearchOpen && suggestions.length > 0 && (
                        <div
                          role="listbox"
                          aria-label="Sugerencias de búsqueda"
                          className="navbar-search-suggestions"
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: '#111',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 8,
                            marginTop: 8,
                            padding: 6,
                            zIndex: 1200,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
                          }}
                        >
                          {suggestions.map((s, idx) => (
                            <div
                              key={s.id}
                              role="option"
                              aria-selected={idx === activeIndex}
                              onMouseEnter={() => setActiveIndex(idx)}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                              if (s.type === 'sucursal') {
                                  navigate(`/sucursales?q=${encodeURIComponent(s.query)}`);
                                } else {
                                  navigate(`/productos?search=${encodeURIComponent(s.query)}`);
                                }
                              try {
                                trackEvent('select_item', {
                                  item_list_name: 'navbar_search_suggestions',
                                  content_type: s.type,
                                  item_name: s.label,
                                  search_term: searchQuery.trim(),
                                });
                              } catch {}
                                setIsSearchOpen(false);
                                setSuggestions([]);
                                setActiveIndex(-1);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 12,
                                padding: '10px 12px',
                                cursor: 'pointer',
                                borderRadius: 6,
                                background: idx === activeIndex ? 'rgba(255,255,255,0.08)' : 'transparent',
                                color: '#fff'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                                <span style={{ opacity: 0.9, display: 'inline-flex', alignItems: 'center' }}>
                                  {s.type === 'sucursal' ? (
                                    '📍'
                                  ) : String(s.meta || '').toLowerCase().includes('empanada') ? (
                                    '🥟'
                                  ) : String(s.meta || '').toLowerCase().includes('salsa') ? (
                                    '🫕'
                                  ) : String(s.meta || '').toLowerCase().includes('indi') ? (
                                    '🍕'
                                  ) : (
                                    <FullPizzaIcon size={16} />
                                  )}
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                  <span style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</span>
                                  {s.meta && (
                                    <span style={{ fontSize: 12, opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.meta}</span>
                                  )}
                                </div>
                              </div>
                              <span style={{ fontSize: 12, opacity: 0.7 }}>{s.type === 'sucursal' ? 'Sucursales' : 'Productos'}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Botón de cerrar removido: la lupa ahora abre/cierra */}
                    </form>
                  </li>
                  {navLinks.map((link, idx) => {
                    if (link.label === 'Productos') {
                      return (
                        <li 
                          key={link.path} 
                          className="nav-item position-relative productos-dropdown-container"
                          onMouseEnter={() => setProductosDropdownOpen(true)}
                          onMouseLeave={() => setProductosDropdownOpen(false)}
                        >
                          <button
                            className={`nav-link text-white epic-reveal border-0 bg-transparent${navRevealPlayed ? ' animation-played' : ''}${location.pathname.startsWith('/productos') ? ' nav-link-active' : ''}`}
                            onClick={() => setProductosDropdownOpen(!productosDropdownOpen)}
                            aria-expanded={productosDropdownOpen}
                            style={{ 
                              '--nav-index': idx, 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '6px',
                              outline: 'none',
                              cursor: 'pointer',
                              padding: '10px 15px'
                            } as React.CSSProperties}
                          >
                            Productos
                            <svg 
                              width="12" 
                              height="12" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2.5" 
                              style={{ 
                                transform: productosDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', 
                                transition: 'transform 0.3s ease' 
                              }}
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </button>
                          
                          {productosDropdownOpen && (
                            <div className="productos-dropdown-menu">
                              <Link 
                                to="/productos" 
                                className={`productos-dropdown-item ${location.pathname === '/productos' ? 'active' : ''}`}
                                onClick={() => {
                                  setProductosDropdownOpen(false);
                                  setIsMenuOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                              >
                                <span className="item-title">Productos 1</span>
                                <span className="item-subtitle">Vista Tradicional</span>
                              </Link>
                              <Link 
                                to="/productos2" 
                                className={`productos-dropdown-item ${location.pathname === '/productos2' ? 'active' : ''}`}
                                onClick={() => {
                                  setProductosDropdownOpen(false);
                                  setIsMenuOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                              >
                                <span className="item-title">Productos 2</span>
                                <span className="item-subtitle">Vista Moderna</span>
                              </Link>
                            </div>
                          )}
                        </li>
                      );
                    }
                    
                    return (
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
                    );
                  })}
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
                      <img src={assetUrl("/images/promotions/BOTON DE HACE TU PEDIDO.png")} alt="Haz tu pedido" className="btn-hacer-pedido-img" />
                    </a>
                  </li>
                  
                  {/* Botón de carrito: al lado del botón de "Hacé tu pedido" (oculto temporalmente) */}
                  {/**
                  <li className="nav-item d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-cart position-relative ms-2"
                      onClick={() => setIsCartOpen(true)}
                      aria-label="Abrir carrito"
                      id="nav-cart-button"
                    >
                      ... (SVG y badge)
                    </button>
                  </li>
                  **/}
                </ul>
              </div>
            )}

          <div 
            ref={menuRef}
            className={`side-menu ${isMenuOpen ? 'open' : ''}`}
            id="side-menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="side-menu-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="side-menu-header">
                <div className="side-menu-brand">
                  <img src={assetUrl("/assets/Logo Mi Gusto 2025.png")} alt="Mi Gusto" className="side-menu-logo" />
                </div>
                <button className="side-menu-close-btn" onClick={() => setIsMenuOpen(false)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
              </div>

              <div className="side-menu-scroll-area">
                  <div className="side-menu-section-label">Explorar</div>
                  <ul className="side-menu-list">
                    {sideMenuLinks.map((link, idx) => (
                      <li key={link.path + '-' + isMenuOpen} className="side-menu-item" style={{ '--idx': idx } as React.CSSProperties}>
                        <Link to={link.path} className="side-menu-link-premium" onClick={() => setIsMenuOpen(false)}>
                            <span className="side-menu-link-icon">
                                <i className={`fa-solid ${link.icon}`}></i>
                            </span>
                            <span className="side-menu-link-text">{link.label}</span>
                            <span className="side-menu-link-arrow">
                                <i className="fa-solid fa-chevron-right"></i>
                            </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
              </div>

              <div className="side-menu-footer">
                <div className="side-menu-footer-top">
                    <div className="side-menu-socials">
                      <a href="https://instagram.com/migustoar" target="_blank" rel="noreferrer" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
                      <a href="https://facebook.com/migustoar" target="_blank" rel="noreferrer" title="Facebook"><i className="fa-brands fa-facebook"></i></a>
                      <a href="https://tiktok.com/@migustoar" target="_blank" rel="noreferrer" title="TikTok"><i className="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>
                <div className="side-menu-info">
                  <p className="side-menu-copyright">© 2026 Mi Gusto. <br/><span className="side-menu-tagline">Experiencias de verdad</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Buscador móvil persistente solo para Sucursales */}
      {!isDesktop && location.pathname.startsWith('/sucursales') && (
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const q = mobileSearchQuery.trim();
            if (!q) return;
            navigate(`/sucursales?q=${encodeURIComponent(q)}`);
          }}
          className="mobile-sticky-search"
        >
          <input
            type="search"
            placeholder="Buscar sucursales..."
            value={mobileSearchQuery}
            onChange={(e) => setMobileSearchQuery(e.target.value)}
            aria-label="Buscar"
          />
        </form>
      )}
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