import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileSideMenu.css';

interface SideMenuLink {
  path: string;
  label: string;
  image?: string;
}

interface MobileSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSideMenu: React.FC<MobileSideMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const sideMenuLinks: SideMenuLink[] = [
    { path: '/nosotros', label: 'Nosotros', image: '/side-menu/localMiGusto.webp' },
    { path: '/trabaja-con-nosotros', label: 'Trabaja con nosotros', image: '/side-menu/staff.png' },
    { path: '/proveedores', label: 'Proveedores', image: '/side-menu/proveedor.png' },
    { path: '/franquicias', label: 'Franquicias', image: '/side-menu/franquicia.png' },
    { path: '/venta-corporativa', label: 'Venta corporativa', image: '/side-menu/corporativa.png' },
    { path: '/3d', label: 'MG EXPERIENCE', image: '/side-menu/EstudioFondo.png' },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`mobile-side-menu-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="mobile-side-menu" ref={menuRef}>
        <button 
          className="mobile-side-menu-close" 
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          ✕
        </button>
        
        <div className="mobile-side-menu-content">
          <ul className="mobile-side-menu-list">
            {sideMenuLinks.map((link, index) => (
              <li 
                key={link.path} 
                className="mobile-side-menu-item"
                style={{ '--nav-index': index } as React.CSSProperties}
              >
                <button
                  className="mobile-side-menu-link"
                  onClick={() => handleLinkClick(link.path)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileSideMenu;
