import React from 'react';
import Revista from '../components/Revista';
import './Carta.css';
import backgroundText from '../assets/background-text.jpg';

const Carta: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(rgba(24,24,24,0.72), rgba(24,24,24,0.82)), url(${backgroundText}) center/cover no-repeat fixed`,
      }}
    >
      <div className="carta-container">
        <Revista />
      </div>
    </div>
  );
};

export default Carta; 