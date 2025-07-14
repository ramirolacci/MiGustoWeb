import React from 'react';
import Revista from '../components/Revista';
import './Carta.css';
import backgroundText from '../assets/background-text.jpg';

const Carta: React.FC = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          background: `linear-gradient(rgba(24,24,24,0.72), rgba(24,24,24,0.82)), url(${backgroundText}) center/cover no-repeat fixed`,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      <div className="carta-container" style={{ position: 'relative', zIndex: 2, paddingTop: 110 }}>
        <Revista />
      </div>
    </div>
  );
};

export default Carta; 