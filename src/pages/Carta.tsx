import React from 'react';
import Revista from '../components/Revista';
import '../components/Productos.css';
import backgroundText from '../assets/background-text.jpg';
import NavBar from '../components/NavBar';

const Carta: React.FC = () => {
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
        <div className="carta-container">
          <Revista />
        </div>
      </div>
    </>
  );
};

export default Carta; 