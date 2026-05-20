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
      // Fondo del body completamente negro
      const prevBg = document.body.style.backgroundColor;
      document.body.setAttribute('data-prev-bg', prevBg || '');
      document.body.style.backgroundColor = '#000';
      
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
      const prevBg = document.body.getAttribute('data-prev-bg') || '';
      document.body.style.backgroundColor = prevBg;
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('loading-active');
      const prevBg = document.body.getAttribute('data-prev-bg') || '';
      document.body.style.backgroundColor = prevBg;
    };
  }, [isLoading]);

  // Activar modo mundial
  const IS_MUNDIAL_SEASON = true;

  // Generar partículas de confeti de alta fidelidad para el mundial (celeste, blanco, oro)
  // Reducido a 32 para optimización táctil / CPU en mobile (buttery smooth 60fps)
  const confettiParticles = React.useMemo(() => {
    if (!isLoading) return [];
    return Array.from({ length: 32 }).map((_, i) => {
      const xStart = Math.random() * 100;
      const xEnd = xStart + (-15 + Math.random() * 30);
      const xDrift = xEnd - xStart;
      
      const colors = [
        '#75AADB', // Celeste patrio
        '#ffffff', // Blanco
        '#FFD700', // Amarillo Sol brillante
        '#3a8fd9', // Celeste bandera
        '#FFFEEF', // Blanco seda brillante
        '#FFC700', // Amarillo Sol profundo
      ];
      const color = colors[i % colors.length];

      // Delay structure: negative delays let particles start mid-screen, positive delays stagger new ones
      const delay = i % 2 === 0 ? `-${Math.random() * 6}s` : `${Math.random() * 4}s`;
      const duration = 4 + Math.random() * 4; // 4s to 8s for a gentle, elegant fall
      const scale = 0.4 + Math.random() * 0.7; // 0.4x to 1.1x

      const shapes = ['circle', 'rect', 'square', 'ribbon', 'triangle'];
      const shape = shapes[i % shapes.length];

      const rotateX = Math.random() * 360;
      const rotateY = Math.random() * 360;
      const rotateZ = Math.random() * 360;

      const flutterSpeed = 1.5 + Math.random() * 2.5; // 1.5s to 4s for realistic flutter

      return {
        id: i,
        shape,
        style: {
          '--x-start': `${xStart}%`,
          '--x-drift': `${xDrift}vw`,
          '--delay': delay,
          '--duration': `${duration}s`,
          '--scale': scale,
          '--color': color,
          '--rotate-x': `${rotateX}deg`,
          '--rotate-y': `${rotateY}deg`,
          '--rotate-z': `${rotateZ}deg`,
          '--flutter-speed': `${flutterSpeed}s`,
        } as React.CSSProperties
      };
    });
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner">
        {IS_MUNDIAL_SEASON ? (
          <div className="mundial-loader-container">
            <div className="mundial-bg-glow"></div>
            <div className="mundial-sky-glow"></div>
            <div className="mundial-sun-rays"></div>
            <div className="mundial-flash-overlay"></div>
            
            {/* Confetti Particles */}
            <div className="confetti-container">
              {confettiParticles.map((p) => (
                <div 
                  key={p.id} 
                  className={`confetti-particle shape-${p.shape}`} 
                  style={p.style}
                />
              ))}
            </div>

            <div className="mundial-lens-flare"></div>
            
            <div className="ball-wrapper">
              <img 
                src="/images/mundial/ball.png" 
                alt="Mundial" 
                className="soccer-ball" 
              />
              <div className="ball-trail"></div>
              <div className="ball-shadow"></div>
            </div>

            <div className="mundial-content">
              <img 
                src="/assets/Logo Mi Gusto 2025.png" 
                alt="Mi Gusto" 
                className="mundial-logo" 
              />
              <div className="mundial-text-container">
                <span className="mundial-text-highlight">es MUNDIAL</span>
              </div>
            </div>

            <div className="mundial-stars-v2">
              <i className="fa-solid fa-star star-xl"></i>
              <div className="stars-row">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
            
            <div className="mundial-stadium-lights">
                <div className="light-beam lb-left"></div>
                <div className="light-beam lb-right"></div>
            </div>
          </div>
        ) : isVideoActive ? (
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