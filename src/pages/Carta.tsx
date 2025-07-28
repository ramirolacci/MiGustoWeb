import React, { useEffect } from 'react';
import Revista from '../components/Revista';
import '../components/Productos.css';
import backgroundText from '../assets/background-text.jpg';
import NavBar from '../components/NavBar';

const Carta: React.FC = () => {
  useEffect(() => {
    import('scrollreveal').then((module) => {
      const sr = module.default ? module.default : module;
      sr().reveal('.productos-titulo', {
        distance: '20px',
        duration: 1400,
        origin: 'top',
        opacity: 0,
        reset: true
      });
      sr().reveal('.revista-section', {
        distance: '30px',
        duration: 1600,
        origin: 'bottom',
        opacity: 0,
        reset: true
      });
    });
  }, []);
  return (
    <>
      <NavBar />
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: '#000',
          paddingTop: '104px',
        }}
      >
        <div className="background-overlay"></div>
        <div className="carta-container" style={{ marginTop: '0.1rem' }}>
          <h2 className="productos-titulo">Deslizá para explorar nuestra carta</h2>
          <Revista />
        </div>
      </div>
    </>
  );
};

export default Carta; 