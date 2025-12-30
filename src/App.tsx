import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MobileTabbar from './components/MobileTabbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import BotmakerChat from './components/BotmakerChat';
import Viewer3D from './components/Viewer3D';
import CookieConsent from './components/CookieConsent';
import GoogleAnalytics from './components/GoogleAnalytics';
import LoversForm from './pages/LoversForm';
import Carta from './pages/Carta';
import { trackPageView } from './services/analytics';
import { LoyaltyProvider } from './context/LoyaltyContext';
// Carrito provisto desde main.tsx
import { useIsMobile } from './hooks/useIsMobile';

const ResponsiveHome = lazy(() => import('./components/ResponsiveHome'));
const HomeMobile = lazy(() => import('./pages/HomeMobile'));
const Productos = lazy(() => import('./components/Productos'));
const Sucursales = lazy(() => import('./components/Sucursales'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Proveedores = lazy(() => import('./pages/Proveedores'));
const TrabajaConNosotros = lazy(() => import('./pages/TrabajaConNosotros'));
const Franquicias = lazy(() => import('./pages/Franquicias'));
const VentaCorporativa = lazy(() => import('./pages/VentaCorporativa'));
const Revista = lazy(() => import('./components/Revista'));
const Lovers = lazy(() => import('./pages/Lovers.tsx'));
const Legales = lazy(() => import('./pages/Legales'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const Account = lazy(() => import('./pages/Account'));
const Canje = lazy(() => import('./pages/Canje'));
const IngredientExplodedView = lazy(() => import('./components/IngredientExplodedView'));
import ProtectedRoute from './components/ProtectedRoute';
const DefensaConsumidor = lazy(() => import('./pages/DefensaConsumidor'));

import './App.css';
import './styles/mobile-layout.css';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Registrar pageview al cambiar de ruta
  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);

  const isLovers = location.pathname.startsWith('/lovers');
  const isViewer3D = location.pathname === '/3d';
  const isHomeMobile = location.pathname === '/m';

  // Determinar si mostrar el tabbar móvil - no excluir lovers
  const showMobileTabbar = isMobile; // mostrar tabbar (y sidebar) también en /3d


  return (
    <>
      {!isLovers && !isViewer3D && <BotmakerChat />}
      <div className="app">
        <GoogleAnalytics />
        {!isLovers && !isMobile && <header><NavBar /></header>}
        <main className='main'>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<ResponsiveHome />} />
                {/* Home mobile dedicado */}
                <Route path="/m" element={<HomeMobile />} />
                <Route path="/carta" element={<Carta />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/sucursales" element={<Sucursales />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/proveedores" element={<Proveedores />} />
                <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
                <Route path="/franquicias" element={<Franquicias />} />
                <Route path="/venta-corporativa" element={<VentaCorporativa />} />
                <Route path="/lovers/*" element={<Lovers />} />
                <Route path="/3d" element={<Viewer3D />} />
                <Route path="/legales" element={<Legales />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/mi-cuenta" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path="/canje" element={<Canje />} />
                {/* Ejemplo de ruta protegida: */}
                <Route path="/admin" element={<ProtectedRoute><div style={{ color: '#fff', padding: '2rem' }}>Área Privada</div></ProtectedRoute>} />
                <Route path="/defensa-consumidor" element={<DefensaConsumidor />} />
                <Route path="/exploded-test" element={
                  <>
                    <Productos />
                    <IngredientExplodedView onClose={() => { }} />
                  </>
                } />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        {!isLovers && !isViewer3D && !isMobile && <footer><Footer /></footer>}
        {showMobileTabbar && <MobileTabbar />}
        {!isLovers && !isViewer3D && <CookieConsent />}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <LoyaltyProvider>
        <AppContent />
      </LoyaltyProvider>
    </Router>
  );
};

export default App;
