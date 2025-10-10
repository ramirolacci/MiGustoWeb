import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileSideMenu from './MobileSideMenu';
// import { getToken } from '../services/auth';
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
          <img src="/icons/navigation/tab-home.svg" alt="Inicio" />
          <span>Inicio</span>
        </button>
        
        {/**
         * Botón original de Canje (comentado a pedido, sin eliminar código ni archivos)
         *
         * <button 
         *   className="hm-tab" 
         *   onClick={() => navigate('/canje')} 
         *   aria-label="Canje" 
         *   aria-current={location.pathname.startsWith('/canje') ? 'page' : undefined}
         * >
         *   <img src="/icons/tab-canje.svg" alt="Canje" />
         *   <span>Canje</span>
         * </button>
         */}

        {/* Botón reemplazo: Productos */}
        <button 
          className="hm-tab" 
          onClick={() => navigate('/productos')} 
          aria-label="Productos" 
          aria-current={location.pathname.startsWith('/productos') ? 'page' : undefined}
        >
          <img src="/icons/products/empanadas-clasicas.svg" alt="Productos" />
          <span>Productos</span>
        </button>

        <button 
          className="hm-fab" 
          onClick={() => window.open('https://pedir.migusto.com.ar/', '_blank')} 
          aria-label="Pedir"
        >
          <img src="/icons/navigation/tab-pedir.svg" alt="Pedir" />
          <span>Pedir</span>
        </button>

        {/**
         * Botón original de Cuenta (comentado a pedido, sin eliminar código ni archivos)
         *
         * <button 
         *   className="hm-tab" 
         *   onClick={() => {
         *     const token = getToken();
         *     if (token) navigate('/mi-cuenta');
         *     else navigate('/login');
         *   }} 
         *   aria-label="Cuenta" 
         *   aria-current={(location.pathname.startsWith('/mi-cuenta') || location.pathname.startsWith('/perfil')) ? 'page' : undefined}
         * >
         *   <img src="/icons/tab-cuenta.svg" alt="Cuenta" />
         *   <span>Cuenta</span>
         * </button>
         */}

        {/* Botón reemplazo: Sucursales */}
        <button 
          className="hm-tab" 
          onClick={() => navigate('/sucursales')} 
          aria-label="Sucursales" 
          aria-current={location.pathname.startsWith('/sucursales') ? 'page' : undefined}
        >
          <img src="/icons/navigation/tab-sucursales.svg" alt="Sucursales" />
          <span>Sucursales</span>
        </button>
        
        <button 
          className="hm-tab" 
          onClick={() => setMenuOpen(true)} 
          aria-label="Menú" 
          aria-current={menuOpen ? 'page' : undefined}
        >
          <img src="/icons/navigation/tab-menu.svg" alt="Menú" />
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
