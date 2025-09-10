import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileSideMenu from './MobileSideMenu';
import './MobileTabbar.css';

const MobileTabbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  

  return (
    <>
      <nav className="hm-tabbar" aria-label="Barra de navegación">
        <button 
          className="hm-tab" 
          onClick={() => navigate('/')} 
          aria-label="Inicio" 
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          <img src="/icons/tab-home.svg" alt="Inicio" />
          <span>Inicio</span>
        </button>
        
        <button 
          className="hm-tab" 
          onClick={() => navigate('/canje')} 
          aria-label="Canje" 
          aria-current={location.pathname.startsWith('/canje') ? 'page' : undefined}
        >
          <img src="/icons/tab-canje.svg" alt="Canje" />
          <span>Canje</span>
        </button>

        <button 
          className="hm-fab" 
          onClick={() => window.open('https://pedir.migusto.com.ar/', '_blank')} 
          aria-label="Pedir"
        >
          <img src="/icons/tab-pedir.svg" alt="Pedir" />
          <span>Pedir</span>
        </button>

        <button 
          className="hm-tab" 
          onClick={() => navigate('/sucursales')} 
          aria-label="Sucursales" 
          aria-current={location.pathname.startsWith('/sucursales') ? 'page' : undefined}
        >
          <img src="/icons/tab-sucursales.svg" alt="Sucursales" />
          <span>Sucursales</span>
        </button>
        
        <button 
          className="hm-tab" 
          onClick={() => setMenuOpen(true)} 
          aria-label="Menú" 
          aria-current={menuOpen ? 'page' : undefined}
        >
          <img src="/icons/tab-menu.svg" alt="Menú" />
          <span>Menú</span>
        </button>
      </nav>

      {/* Mobile Side Menu */}
      <MobileSideMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />
    </>
  );
};

export default MobileTabbar;
