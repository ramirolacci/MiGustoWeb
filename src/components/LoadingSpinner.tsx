import React, { useMemo, useEffect } from 'react';
import './LoadingSpinner.css';

const burgerLoading = '/burgerLoading.png';
const logoLoading = '/loadIcon.png';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  // Elegir aleatoriamente qué imagen mostrar al montar
  const showBurger = useMemo(() => Math.random() < 0.5, []);

  // Prevenir scroll cuando el spinner está activo
  useEffect(() => {
    if (isLoading) {
      // Bloquear scroll
      document.body.style.overflow = 'hidden';
      document.body.classList.add('loading-active');
      
      // Cerrar el menú hamburguesa de forma más agresiva
      const closeMenu = () => {
        // Buscar el botón de cerrar del menú
        const closeButton = document.querySelector('.side-menu-close') as HTMLButtonElement;
        if (closeButton) {
          closeButton.click();
        }
        
        // También intentar cerrar el menú directamente
        const sideMenu = document.querySelector('.side-menu') as HTMLElement;
        if (sideMenu) {
          sideMenu.classList.remove('open');
        }
        
        // Remover la clase del body que indica que el menú está abierto
        document.body.classList.remove('side-menu-open');
      };
      
      // Ejecutar inmediatamente
      closeMenu();
      
      // También ejecutar después de un pequeño delay para asegurar
      setTimeout(closeMenu, 50);
      
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('loading-active');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('loading-active');
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner">
        {showBurger ? (
          <img
            src={burgerLoading}
            alt="Cargando Big Burger..."
            className="spinner-image spinner-burger"
          />
        ) : (
          <img
            src={logoLoading}
            alt="Cargando..."
            className="spinner-image"
          />
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 