import React from 'react';
import './Contacto.css';

const Proveedores = () => {
  return (
    <div className="sucursales-section">
      <div className="background-overlay"></div>
      <div className="sucursales-container">
        <div className="contacto-container">
          <div className="contacto-header">
            <h1>Proveedores</h1>
            <p>¿Querés ser proveedor de Mi Gusto? Completá el formulario y nos pondremos en contacto con vos.</p>
          </div>

          <div className="contacto-content">
            <div className="contacto-form-container">
              <h2>Envíanos tu Propuesta</h2>
              <form className="contacto-form">
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="nombre">Nombre de la empresa:<span className="required">*</span></label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Ingresá el nombre de tu empresa"
                      required
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="email">E-mail:<span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ingresá tu e-mail"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="telefono">Teléfono:<span className="required">*</span></label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      placeholder="Ingresá tu teléfono"
                      required
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="razonSocial">Razón Social:<span className="required">*</span></label>
                    <input
                      type="text"
                      id="razonSocial"
                      name="razonSocial"
                      placeholder="Ingresá la razón social de tu empresa"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="mensaje">Descripción de productos/servicios:</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={6}
                    placeholder="Contanos sobre tus productos o servicios"
                  ></textarea>
                </div>
                <button type="submit" className="btn-ver-mas">
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedores; 