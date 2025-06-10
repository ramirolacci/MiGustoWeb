import React from 'react';
import './LoadingSpinner.css';
import empanadaSpinner from '/loadIcon.png';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner">
        <img src={empanadaSpinner} alt="Cargando..." className="spinner-image" />
      </div>
    </div>
  );
};

export default LoadingSpinner; 