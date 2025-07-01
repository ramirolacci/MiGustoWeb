import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Agregar la clase lovers-page al body para estilos específicos
if (typeof document !== 'undefined') {
  document.body.classList.add('lovers-page');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
