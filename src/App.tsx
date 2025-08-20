import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import '@fortawesome/fontawesome-free/css/all.min.css';
import BotmakerChat from './components/BotmakerChat';
import Viewer3D from './components/Viewer3D';
import CookieConsent from './components/CookieConsent';
import GoogleAnalytics from './components/GoogleAnalytics';
import LoversForm from './pages/LoversForm';
import Carta from './pages/Carta';

const Home = lazy(() => import('./components/Home'));
const Productos = lazy(() => import('./components/Productos'));
const Sucursales = lazy(() => import('./components/Sucursales'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Proveedores = lazy(() => import('./pages/Proveedores'));
const TrabajaConNosotros = lazy(() => import('./pages/TrabajaConNosotros'));
const Franquicias = lazy(() => import('./pages/Franquicias'));
const VentaCorporativa = lazy(() => import('./pages/VentaCorporativa'));
const Revista = lazy(() => import('./components/Revista'));
const Lovers = lazy(() => import('./pages/Lovers.tsx'));
const Legales = lazy(() => import('./pages/Legales'));
const DefensaConsumidor = lazy(() => import('./pages/DefensaConsumidor'));

import './App.css';

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setLoading(true);
    };
  }, [location.pathname]);

  const isLovers = location.pathname.startsWith('/lovers');
  const isViewer3D = location.pathname === '/3d';

  return (
    <>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!isLovers && !isViewer3D && <BotmakerChat />}
      <div className="app">
        <GoogleAnalytics />
        {!isLovers && <header><NavBar /></header>}
        <main className='main'>
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
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
              <Route path="/defensa-consumidor" element={<DefensaConsumidor />} />
            </Routes>
          </Suspense>
        </main>
        {!isLovers && !isViewer3D && <footer><Footer /></footer>}
        {!isLovers && !isViewer3D && <CookieConsent />}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
