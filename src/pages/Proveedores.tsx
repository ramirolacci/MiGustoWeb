import React, { useState } from 'react';
import '../pages/Contacto.css';
import emailjs from '@emailjs/browser';

const Proveedores: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    razonSocial: '',
    telefono: '',
    email: '',
    descripcion: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = 'service_vroveb8'; 
    const templateID = 'template_rx2wmet'; 
    const publicKey = '2muZYDfZaoXaOzlBc'; 

    const templateParams = {
      name: formData.nombreEmpresa,
      email: formData.email,
      message: `
        Razón Social: ${formData.razonSocial}
        Teléfono: ${formData.telefono}
        Descripción: ${formData.descripcion}
      `,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      alert('¡Gracias por tu interés! Nos pondremos en contacto pronto.');
      setFormData({
        nombreEmpresa: '',
        razonSocial: '',
        telefono: '',
        email: '',
        descripcion: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
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
                <button type="submit" className="btn-ver-mas" disabled={isSubmitting}>
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