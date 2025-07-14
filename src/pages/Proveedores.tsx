import React, { useState } from 'react';
import '../pages/Contacto.css';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import Swal from 'sweetalert2';

const Proveedores: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    razonSocial: '',
    telefono: '',
    email: '',
    descripcion: '',
  });

  const [errors, setErrors] = useState({
    nombreEmpresa: '',
    razonSocial: '',
    telefono: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.nombreEmpresa.trim()) {
      newErrors.nombreEmpresa = 'El nombre de la empresa es obligatorio.';
    }
    if (!formData.razonSocial.trim()) {
      newErrors.razonSocial = 'La razón social es obligatoria.';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio.';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.telefono)) {
      newErrors.telefono = 'El formato del teléfono no es válido.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await axios.post('/api/mail/proveedor', formData);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Tu solicitud de proveedor ha sido enviada correctamente.',
        confirmButtonColor: '#d4af37',
      });
      setFormData({
        nombreEmpresa: '',
        razonSocial: '',
        telefono: '',
        email: '',
        descripcion: '',
      });
      setErrors({
        nombreEmpresa: '',
        razonSocial: '',
        telefono: '',
        email: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sucursales-section" style={{ marginTop: '40px' }}>
      <div className="background-overlay"></div>
      <div className="sucursales-container">
        <div className="responsive-row" style={{ display: 'flex', flexDirection: 'row', width: '100vw', minHeight: '100vh', alignItems: 'stretch' }}>
          <img src="/proveedor.png" alt="Imagen proveedor" style={{ width: '50vw', height: '100%', maxHeight: '100vh', objectFit: 'cover', display: 'block', marginTop: '40px', opacity: 1, backgroundColor: '#fff', position: 'relative', zIndex: 2 }} />
          <div className="contacto-container" style={{ width: '50vw', minHeight: '100vh', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
            <div className="contacto-content" style={{ width: '100%', marginTop: (typeof window !== 'undefined' && window.innerWidth > 900) ? '-40px' : '0' }}>
              <div className="contacto-form-container">
                <h2>Proveedores</h2>
                <p style={{ textAlign: 'center' }}>Completa el siguiente formulario si estás interesado en ser proveedor de Mi Gusto.</p>
                <form className="contacto-form" onSubmit={handleSubmit} noValidate>
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
                      {errors.nombreEmpresa && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.nombreEmpresa}</div>}
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
                      {errors.email && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.email}</div>}
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
                      {errors.razonSocial && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.razonSocial}</div>}
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
                      {errors.telefono && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.telefono}</div>}
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
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedores; 