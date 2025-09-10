import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Registrar Service Worker para PWA (solo en producción y si el navegador lo soporta)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = '/service-worker.js';
    navigator.serviceWorker.register(swUrl).catch(() => {
      // Ignorar errores de registro silenciosamente
    });
  });
}