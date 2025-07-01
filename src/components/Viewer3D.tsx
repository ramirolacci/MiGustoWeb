// Declarar el elemento personalizado para TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
        alt?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        ar?: boolean;
        style?: React.CSSProperties;
        'shadow-intensity'?: string;
        exposure?: string;
        'camera-orbit'?: string;
        'interaction-prompt'?: string;
      };
    }
  }
}

import React, { useEffect, useRef } from 'react';

const Viewer3D: React.FC = () => {
  const scriptLoaded = useRef(false);
  useEffect(() => {
    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.body.appendChild(script);
      scriptLoaded.current = true;
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#181818', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {React.createElement('model-viewer' as any, {
        src: '/3D/big-burger-3D.glb',
        alt: 'Big Burger 3D',
        'camera-controls': true,
        'auto-rotate': true,
        ar: true,
        style: { width: '100%', height: '100%', maxWidth: 600, maxHeight: 600, background: 'transparent' },
        'shadow-intensity': '1',
        exposure: '1.1',
        'camera-orbit': '0deg 75deg 2.5m',
        'interaction-prompt': 'none',
      })}
    </div>
  );
};

export default Viewer3D; 