import React from 'react';
import './Contacto.css';

const Contacto: React.FC = () => {
  return (
    <div className="contacto-container">
      <div className="contacto-header">
        <h1>Contáctanos</h1>
        <p>Estamos aquí para responder tus preguntas y comentarios.</p>
      </div>
      <div className="contacto-content">
        <div className="contacto-info">
          <h2>Información de Contacto</h2>
          <p><strong>Email:</strong> info@migusto.com.ar</p>
          <p><strong>Teléfono:</strong> +54 11 1234 5678</p>
          <p><strong>Dirección:</strong> Av. Principal 123, Ciudad, Provincia</p>
        </div>
        <div className="contacto-form-container">
          <h2>Envíanos un Mensaje</h2>
          <form className="contacto-form">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje:</label>
              <textarea id="message" name="message" rows={6} required></textarea>
            </div>
            <button type="submit" className="submit-button">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 