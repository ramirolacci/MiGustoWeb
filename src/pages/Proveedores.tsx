import React, { useState } from 'react';
import '../pages/Contacto.css';

const Proveedores: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    razonSocial: '',
    telefono: '',
    email: '',
    descripcion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del formulario de proveedores:', formData);
    // Aquí se manejaría el envío de datos, por ejemplo, a una API
    alert('¡Gracias por tu interés! Nos pondremos en contacto pronto.');
    setFormData({
      nombreEmpresa: '',
      razonSocial: '',
      telefono: '',
      email: '',
      descripcion: '',
    });
  };

  return (
    <div className="sucursales-section">
      <div className="background-overlay"></div>
      <div className="sucursales-container">
        <div className="contacto-container">
          <div className="contacto-content">
            <div className="contacto-form-container">
              <h2>Proveedores</h2>
              <p style={{ textAlign: 'center' }}>Completa el siguiente formulario si estás interesado en ser proveedor de Mi Gusto.</p>
              <form className="contacto-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="nombreEmpresa">Nombre de la Empresa: <span className="required">*</span></label>
                    <input
                      type="text"
                      id="nombreEmpresa"
                      name="nombreEmpresa"
                      value={formData.nombreEmpresa}
                      onChange={handleChange}
                      required
                      placeholder="Ingrese el nombre de su empresa"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="email">E-mail: <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ejemplo@empresa.com"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="razonSocial">Razón Social: <span className="required">*</span></label>
                    <input
                      type="text"
                      id="razonSocial"
                      name="razonSocial"
                      value={formData.razonSocial}
                      onChange={handleChange}
                      required
                      placeholder="Ingrese la razón social"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="telefono">Teléfono: <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="+54 9 11 1234-5678"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción de productos/servicios:</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={5}
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Describa los productos o servicios que ofrece su empresa"
                  ></textarea>
                </div>
                <button type="submit" className="btn-ver-mas">
                  Enviar
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