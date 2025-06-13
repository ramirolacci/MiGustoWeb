import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Productos from './components/Productos';
import Sucursales from './components/Sucursales';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Proveedores from './pages/Proveedores';
import TrabajaConNosotros from './pages/TrabajaConNosotros';
import Franquicias from './pages/Franquicias';
import LoadingSpinner from './components/LoadingSpinner';
import VentaCorporativa from './pages/VentaCorporativa';
import Revista from './components/Revista';

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
