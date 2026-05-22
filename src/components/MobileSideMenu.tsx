import React, { useRef } from 'react';
import { assetUrl } from '../utils/assetUrl';
import { useNavigate } from 'react-router-dom';
import './MobileSideMenu.css';

interface SideMenuLink {
  path: string;
  label: string;
  icon: string;
}

interface MobileSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSideMenu: React.FC<MobileSideMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Mismos links oficiales y premium que en la versión de PC (NavBar.tsx)
  const sideMenuLinks: SideMenuLink[] = [
    { path: '/', label: 'Inicio', icon: 'fa-house' },
    { path: '/nosotros', label: 'Nuestra Historia', icon: 'fa-star' },
    { path: '/proveedores', label: 'Proveedores', icon: 'fa-truck' },
    { path: '/franquicias', label: 'Franquicias', icon: 'fa-shop' },
    { path: '/venta-corporativa', label: 'Venta Corporativa', icon: 'fa-briefcase' },
    { path: '/trabaja-con-nosotros', label: 'Únete al equipo', icon: 'fa-users' },
    { path: '/productos', label: 'Nuestra Carta', icon: 'fa-utensils' },
    { path: '/sucursales', label: 'Sucursales', icon: 'fa-location-dot' },
    { path: '/legales', label: 'Legales', icon: 'fa-scale-balanced' },
    { path: '/defensa-consumidor', label: 'Defensa al Consumidor', icon: 'fa-shield-halved' },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`mobile-side-menu-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className={`side-menu-drawer ${isOpen ? 'open' : ''}`} ref={menuRef}>
        <div className="side-menu-header">
          <div className="side-menu-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={assetUrl("/assets/Logo Mi Gusto 2025.png")} alt="Mi Gusto" className="side-menu-logo" style={{ marginRight: 0 }} />
            {/* Tres estrellas del mundial debajo del logo */}
            <div className="navbar-stars" style={{ marginTop: '4px' }}>
              <i className="fa-solid fa-star navbar-star-icon"></i>
              <i className="fa-solid fa-star navbar-star-icon main-star"></i>
              <i className="fa-solid fa-star navbar-star-icon"></i>
            </div>
          </div>
          <button className="side-menu-close-btn" onClick={onClose} aria-label="Cerrar menú">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
          </button>
        </div>

        <div className="side-menu-scroll-area" style={{ padding: '1.5rem' }}>
            <div className="side-menu-section-label">Explorar</div>
            <ul className="side-menu-list">
              {sideMenuLinks.map((link, idx) => (
                <li 
                  key={link.path + '-' + isOpen} 
                  className="side-menu-item" 
                  style={{ 
                    '--idx': idx, 
                    opacity: isOpen ? 1 : 0, 
                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.04 + 0.15}s`
                  } as React.CSSProperties}
                >
                  <button 
                    onClick={() => handleLinkClick(link.path)} 
                    className="side-menu-link-premium"
                  >
                      <span className="side-menu-link-icon">
                          <i className={`fa-solid ${link.icon}`}></i>
                      </span>
                      <span className="side-menu-link-text">{link.label}</span>
                      <span className="side-menu-link-arrow">
                          <i className="fa-solid fa-chevron-right"></i>
                      </span>
                  </button>
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
  );
};

export default MobileSideMenu;
