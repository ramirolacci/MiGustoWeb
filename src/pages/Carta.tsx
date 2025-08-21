import React, { useEffect } from 'react';
import Revista from '../components/Revista';
import '../components/Productos.css';
import backgroundText from '../assets/background-text.jpg';
// NavBar se renderiza globalmente en App; no es necesario aquí

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
      // Elimino el reveal sobre .revista-section para evitar doble animación
      // sr().reveal('.revista-section', {
      //   distance: '30px',
      //   duration: 1600,
      //   origin: 'bottom',
      //   opacity: 0,
      //   reset: true
      // });
    });
  }, []);
  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: '#000',
          paddingTop: '104px',
        }}
      >
        <div className="background-overlay"></div>
        <div className="carta-container">
          {/* <h2 className="productos-titulo">Deslizá para explorar nuestra carta</h2> */}
          <Revista />
        </div>
      </div>
    </>
  );
};

export default Carta; 