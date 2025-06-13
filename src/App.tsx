import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

  return (
    <>
      {loading && <LoadingSpinner isLoading={loading} />}
      <div className="app">
        <header>
          <NavBar />
        </header>
        <main>
          <Suspense fallback={<LoadingSpinner isLoading={true} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carta" element={<Revista />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/sucursales" element={<Sucursales />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
              <Route path="/franquicias" element={<Franquicias />} />
              <Route path="/venta-corporativa" element={<VentaCorporativa />} />
            </Routes>
          </Suspense>
        </main>
        <footer>
          <Footer />
        </footer>
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
