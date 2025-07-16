// Declarar el elemento personalizado para TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
        alt?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'auto-rotate-delay'?: string;
        ar?: boolean;
        style?: React.CSSProperties;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        exposure?: string;
        'camera-orbit'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'interaction-prompt'?: string;
      };
    }
  }
}

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componente de humo animado
const SmokeEffect: React.FC = () => {
  // Nubes de humo con diferentes tamaños, opacidades y animaciones
  const smokes = Array.from({ length: 12 }).map((_, i) => {
    // Mezcla de nubes grandes y pequeñas
    const isBig = i % 3 === 0;
    const left = 36 + Math.random() * 18 + (isBig ? -4 : 4); // centrado, pero con leve variación
    const size = isBig ? 140 + Math.random() * 40 : 60 + Math.random() * 40;
    const blur = isBig ? 18 : 10;
    const opacity = isBig ? 0.22 + Math.random() * 0.18 : 0.13 + Math.random() * 0.12;
    const delay = Math.random() * 2;
    const duration = 7 + Math.random() * 3.5; // más lento y suave
    const drift = (Math.random() - 0.5) * (isBig ? 40 : 80); // más dispersión en nubes chicas
    const rot = (Math.random() - 0.5) * 16; // leve rotación
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${left}%`,
          bottom: 0,
          width: size,
          height: size,
          background: 'radial-gradient(circle, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.13) 60%, transparent 100%)',
          filter: `blur(${blur}px)`,
          opacity,
          borderRadius: '50%',
          pointerEvents: 'none',
          animation: `smokeUpVolumetric ${duration}s cubic-bezier(.4,0,.6,1) ${delay}s infinite`,
          '--drift': `${drift}px`,
          '--rot': `${rot}deg`,
        } as React.CSSProperties}
      />
    );
  });
  return (
    <div style={{
      position: 'absolute',
      left: '2vw', // un poco a la izquierda para centrar
      right: 0,
      bottom: '48%',
      width: '100%',
      height: '32%',
      zIndex: 2,
      pointerEvents: 'none',
      overflow: 'visible',
    }}>
      <style>{`
        @keyframes smokeUpVolumetric {
          0% {
            transform: translateY(0) scale(1) translateX(0) rotate(var(--rot,0deg));
            opacity: 0.01;
          }
          18% {
            opacity: 0.32;
          }
          40% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.22;
          }
          100% {
            transform: translateY(-170px) scale(1.5) translateX(var(--drift,0px)) rotate(var(--rot,0deg));
            opacity: 0;
          }
        }
      `}</style>
      {smokes}
    </div>
  );
};

const Viewer3D: React.FC = () => {
  const scriptLoaded = useRef(false);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [smokeScale, setSmokeScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.body.appendChild(script);
      scriptLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adaptar el humo al zoom del usuario
  useEffect(() => {
    const mv = document.querySelector('model-viewer');
    if (!mv) return;
    const handler = () => {
      // Leer el valor de camera-orbit (ej: "0deg 75deg 2.5m")
      const orbit = mv.getAttribute('camera-orbit');
      if (orbit) {
        const match = orbit.match(/([\d.]+)m/);
        if (match) {
          const dist = parseFloat(match[1]);
          // Ajustar el scale del humo: más cerca = humo más grande
          // 2.5m (default) => scale 1, 4.5m (zoom out) => scale 0.7, 1.7m (zoom in) => scale 1.3
          const scale = Math.max(0.6, Math.min(1.4, 2.5 / dist));
          setSmokeScale(scale);
        }
      }
    };
    mv.addEventListener('camera-change', handler);
    return () => mv.removeEventListener('camera-change', handler);
  }, []);

  // Fullscreen handler
  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!fullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
        setFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        setFullscreen(false);
      }
    }
  };

  // Animación de entrada
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
      setTimeout(() => {
        if (containerRef.current) containerRef.current.style.opacity = '1';
      }, 100);
    }
  }, []);

  // Indicador de carga
  useEffect(() => {
    const handler = () => setLoading(false);
    const mv = document.querySelector('model-viewer');
    if (mv) {
      mv.addEventListener('load', handler);
      return () => mv.removeEventListener('load', handler);
    }
  }, [loading]);

  // Deshabilitar scroll al montar y restaurar al desmontar
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100vw', 
        height: '100vh', 
        background: `url('/EstudioFondo.png') center center / cover no-repeat, #181818`,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        transition: 'opacity 0.7s cubic-bezier(.4,1.3,.6,1)',
        opacity: 1
      }}
    >
      {/* Efecto de humo detrás del modelo */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          transform: `scale(${smokeScale})`,
          transition: 'transform 0.3s',
          position: 'relative',
        }}>
          <SmokeEffect />
        </div>
      </div>
      {/* Botón de volver */}
      {fullscreen && (
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            zIndex: 20,
            background: 'rgba(24,24,24,0.85)',
            color: '#FFD700',
            border: 'none',
            borderRadius: 8,
            padding: '10px 18px',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          ← Volver
        </button>
      )}
      {/* Botón de fullscreen */}
      {!isMobile && (
        <button
          onClick={handleFullscreen}
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            zIndex: 20,
            background: 'rgba(24,24,24,0.85)',
            color: '#FFD700',
            border: 'none',
            borderRadius: 8,
            padding: '10px 18px',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {fullscreen ? 'Salir Fullscreen' : 'Fullscreen'}
        </button>
      )}
      {/* Indicador de carga */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 30,
          background: 'rgba(24,24,24,0.85)',
          color: '#FFD700',
          padding: '24px 36px',
          borderRadius: 16,
          fontWeight: 700,
          fontSize: 22,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}>
          <span className="fa fa-spinner fa-spin" style={{fontSize: 32}}></span>
          Cargando modelo 3D...
        </div>
      )}
      {/* Instrucciones */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          background: 'rgba(24,24,24,0.85)',
          color: '#FFD700',
          borderRadius: 12,
          padding: '12px 28px',
          fontWeight: 600,
          fontSize: 18,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
          textAlign: 'center',
          userSelect: 'none',
          letterSpacing: 0.2
        }}>
          🖱️ Arrastra para rotar &nbsp; | &nbsp; Rueda para zoom &nbsp; | &nbsp; Pincha para mover
        </div>
      )}
      {/* Model Viewer */}
      {React.createElement('model-viewer' as any, {
        src: '/3D/Doritos-3D.glb',
        alt: 'Doritos 3D',
        'camera-controls': true,
        'auto-rotate': true,
        'auto-rotate-delay': '0',
        ar: false,
        style: {
          width: '100%',
          height: '100%',
          maxWidth: '98vw',
          maxHeight: '92vh',
          background: 'transparent',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
          borderRadius: 24,
          transition: 'box-shadow 0.3s',
        },
        'shadow-intensity': '1',
        'shadow-softness': '1',
        exposure: '1.2',
        'camera-orbit': '0deg 75deg 2.5m',
        'min-camera-orbit': 'auto auto 3m',
        'max-camera-orbit': 'auto auto 3m',
        'interaction-prompt': 'none',
        'disable-pan': true,
        onLoad: () => setLoading(false),
      })}
    </div>
  );
};

export default Viewer3D; 