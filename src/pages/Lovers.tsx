import App from '../lovers/App';
import { useEffect } from 'react';

const LOVERS_CSS_ID = 'lovers-css-dynamic';

const LoversWrapper = () => {
  useEffect(() => {
    document.body.classList.add('lovers-page');
    // Carga dinámica del CSS solo para lovers
    let link = document.getElementById(LOVERS_CSS_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = LOVERS_CSS_ID;
      link.rel = 'stylesheet';
      link.href = '/src/lovers/index.css'; // Ajusta la ruta si tu build la mueve
      document.head.appendChild(link);
    }
    return () => {
      document.body.classList.remove('lovers-page');
      // Elimina el CSS de lovers al salir
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);
  return <App />;
};

export default LoversWrapper; 