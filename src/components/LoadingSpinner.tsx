import React, { useMemo, useEffect, useState, useRef } from 'react';
import './LoadingSpinner.css';

const burgerLoading = '/burgerLoading.png';
const logoLoading = '/loadIcon.png';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  // Elegir aleatoriamente qué imagen mostrar al montar
  const showBurger = useMemo(() => Math.random() < 0.5, []);

  // Detectar mobile para usar video de carga
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Forzar velocidad del video en mobile
  useEffect(() => {
    if (!isMobile) return;
    const v = videoRef.current;
    if (!v) return;
    const setRate = () => { try { v.playbackRate = 0.7; } catch {} };
    if (v.readyState >= 1) setRate();
    v.addEventListener('loadedmetadata', setRate, { once: true });
    return () => v.removeEventListener('loadedmetadata', setRate);
  }, [isMobile, isLoading]);

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
        {isMobile ? (
          <video
            ref={videoRef}
            className="spinner-video"
            src="/loadVideo.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            loop
            onCanPlay={() => { if (videoRef.current) { try { videoRef.current.playbackRate = 0.7; } catch {} } }}
            onError={() => {
              const fallback = document.querySelector('.spinner-fallback') as HTMLImageElement | null;
              if (fallback) fallback.style.display = 'block';
            }}
          />
        ) : (
          <>
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
                className="spinner-image spinner-fallback"
                style={{ display: 'block' }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 