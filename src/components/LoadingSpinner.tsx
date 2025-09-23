import React, { useEffect, useState, useRef } from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {

  // Detectar mobile para usar video de carga
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Forzar uso de video siempre; quitamos imagen de empanada
  const isVideoActive = true;
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Forzar velocidad del video cuando se usa video (mobile o desktop)
  useEffect(() => {
    if (!isVideoActive) return;
    const v = videoRef.current;
    if (!v) return;
    const setRate = () => { try { v.playbackRate = 0.7; } catch {} };
    if (v.readyState >= 1) setRate();
    v.addEventListener('loadedmetadata', setRate, { once: true });
    return () => v.removeEventListener('loadedmetadata', setRate);
  }, [isVideoActive, isLoading]);

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
        {isVideoActive ? (
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
          />
        ) : null}
      </div>
    </div>
  );
};

export default LoadingSpinner; 