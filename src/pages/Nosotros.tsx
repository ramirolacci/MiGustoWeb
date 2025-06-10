import React from 'react';
import './Nosotros.css';

const Nosotros: React.FC = () => {
  return (
    <div className="nosotros-section">
      <div className="background-overlay"></div>
      <div className="nosotros-container">
        <div className="nosotros-header">
          <h1 className="nosotros-titulo">Nuestra Historia</h1>
          <div className="nosotros-subtitulo">
            <span>Experiencias de Verdad</span>
          </div>
        </div>

        <div className="nosotros-content">
          <div className="nosotros-mision">
            <h2>Nuestra Misión</h2>
            <p>
              Ser una empresa gastronómica de nivel internacional en continua expansión, 
              reconocida por ser la N° 1 en nuestros productos PREMIUM de calidad indiscutida.
            </p>
          </div>

          <div className="nosotros-vision">
            <h2>Nuestra Visión</h2>
            <p>
              Brindar experiencias gastronómicas sensorialmente memorables inéditas en el mercado 
              mediante la innovación constante en recetas que potencian los sentidos, la selección 
              y uso de materias primas de los más altos estándares de calidad, la mejora continua 
              de nuestros procesos, maquinarias, tecnología productiva, la confianza y el compromiso 
              mutuo con nuestros colaboradores para alcanzar la excelencia y garantizar la satisfacción 
              requerida por nuestros clientes y el cumplimiento de los compromisos asumidos con ellos.
            </p>
          </div>

          <div className="nosotros-valores">
            <h2>Nuestros Valores</h2>
            <div className="valores-grid">
              <div className="valor-card">
                <h3>Calidad</h3>
                <p>Compromiso con la excelencia en cada producto</p>
              </div>
              <div className="valor-card">
                <h3>Innovación</h3>
                <p>Búsqueda constante de nuevas experiencias</p>
              </div>
              <div className="valor-card">
                <h3>Integridad</h3>
                <p>Honestidad y transparencia en cada acción</p>
              </div>
              <div className="valor-card">
                <h3>Pasión</h3>
                <p>Amor por la gastronomía y el servicio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros; 