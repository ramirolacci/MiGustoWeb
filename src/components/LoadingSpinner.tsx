import React, { useMemo } from 'react';
import './LoadingSpinner.css';

const burgerLoading = '/burgerLoading.png';
const logoLoading = '/loadIcon.png';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  // Elegir aleatoriamente qué imagen mostrar al montar
  const showBurger = useMemo(() => Math.random() < 0.5, []);

  if (!isLoading) return null;

  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner">
        {showBurger ? (
          <img
            src={burgerLoading}
            alt="Cargando Big Burger..."
            className="spinner-image spinner-burger"
          />
        ) : (
          <img
            src={logoLoading}
            alt="Cargando..."
            className="spinner-image"
          />
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 