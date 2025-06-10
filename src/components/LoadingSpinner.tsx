import React from 'react';
import './LoadingSpinner.css';
import empanadaSpinner from '/Matambre a la pizza.png'; // Importar la imagen desde la carpeta public

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner">
        {/* Usar la imagen de la empanada para el spinner */}
        <img src={empanadaSpinner} alt="Cargando..." className="spinner-image" />
      </div>
    </div>
  );
};

export default LoadingSpinner; 