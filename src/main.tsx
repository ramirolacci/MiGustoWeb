import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.tsx'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)

// Registrar Service Worker solo en producción; en desarrollo, desregistrar para evitar caché
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {
        // Ignorar errores de registro silenciosamente
      });
    });
  } else {
    // En desarrollo: desregistrar cualquier SW previo y limpiar cachés
    navigator.serviceWorker.getRegistrations?.()
      .then((regs) => {
        for (const reg of regs) reg.unregister();
      })
      .catch(() => {});
    // Borrar caches si están disponibles
    try {
      // @ts-ignore: caches está disponible en navegadores modernos
      caches?.keys?.().then((keys: string[]) => Promise.all(keys.map((k) => caches.delete(k)))).catch(() => {});
    } catch {}
  }
}