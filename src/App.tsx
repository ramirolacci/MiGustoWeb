import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Revista from './components/Revista';
import Footer from './components/Footer';
import Sucursales from './components/Sucursales';
import Productos from './components/Productos';
import Home from './components/Home';
import Nosotros from './pages/Nosotros';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading && <LoadingSpinner />}
      <div className="app">
        <header>
          <NavBar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carta" element={<Revista />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nosotros" element={<Nosotros />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
