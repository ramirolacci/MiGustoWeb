import React, { useState } from 'react';
import '../pages/Contacto.css';
import { sendFormEmail } from '../services/emailjs';
import Swal from 'sweetalert2';

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
    
    try {
      await sendFormEmail('proveedores', formData);
      
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: '¡Gracias por tu interés! Nos pondremos en contacto pronto.',
        confirmButtonColor: '#d4af37',
      });

      setFormData({
        nombreEmpresa: '',
        razonSocial: '',
        telefono: '',
        email: '',
        descripcion: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.',
        confirmButtonColor: '#d4af37',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sucursales-section">
      <div className="background-overlay"></div>
      <div className="sucursales-container">
        <div className="contacto-container">
          <div className="contacto-header">
            <h1>Formulario para Proveedores</h1>
            <p>Completa el siguiente formulario si estás interesado en ser proveedor de Mi Gusto.</p>
          </div>

          <div className="contacto-content">
            <div className="contacto-form-container">
              <h2>Información de Contacto</h2>
              <form className="contacto-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="nombreEmpresa">Nombre de la Empresa <span className="required">*</span></label>
                    <input
                      type="text"
                      id="nombreEmpresa"
                      name="nombreEmpresa"
                      value={formData.nombreEmpresa}
                      onChange={handleChange}
                      required
                      className="contacto-form input"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="email">E-mail <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contacto-form input"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="razonSocial">Razón Social <span className="required">*</span></label>
                    <input
                      type="text"
                      id="razonSocial"
                      name="razonSocial"
                      value={formData.razonSocial}
                      onChange={handleChange}
                      required
                      className="contacto-form input"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="telefono">Teléfono <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="contacto-form input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción de productos/servicios</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={5}
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="contacto-form textarea"
                  ></textarea>
                </div>
                <button type="submit" className="btn-ver-mas" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Postulación'}
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