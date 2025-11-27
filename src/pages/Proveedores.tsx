import React, { useState, useEffect, useRef } from 'react';
import '../pages/Contacto.css';
import { sendFormEmail } from '../services/emailjs';
import Swal from 'sweetalert2';
import { useIsMobile } from '../hooks/useIsMobile';

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
  const [isVideoFading, setIsVideoFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);

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
      await sendFormEmail('proveedores', formData);
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

  useEffect(() => {
    import('scrollreveal').then((module) => {
      const sr = module.default ? module.default : module;
      sr().reveal('.proveedores-titulo-img', {
        distance: '30px',
        duration: 1600,
        origin: 'top',
        opacity: 0,
        reset: true
      });
      sr().reveal('.proveedor-img', {
        distance: '30px',
        duration: 1600,
        origin: 'left',
        opacity: 0,
        reset: true
      });
      sr().reveal('.contacto-form-container', {
        distance: '30px',
        duration: 1600,
        origin: 'right',
        opacity: 0,
        reset: true
      });
    });
  }, []);
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  const handleVideoEnded = () => {
    setIsVideoFading(true);
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
    }
    fadeTimeoutRef.current = setTimeout(() => {
      setIsVideoFading(false);
    }, 900);
  };

  const isMobile = useIsMobile();
  return (
    <div className="sucursales-section" style={{ marginTop: '0px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <video
          ref={videoRef}
          className="proveedor-bg-video"
          src="/images/proveedores/ProveedoresVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          onEnded={handleVideoEnded}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', opacity: isVideoFading ? 1 : 0, transition: 'opacity 1.6s ease' }} />
      </div>
      <div className="sucursales-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="responsive-row" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100vw', minHeight: '100vh', alignItems: isMobile ? 'center' : 'flex-start', justifyContent: 'flex-start', padding: '20px 20px 40px', boxSizing: 'border-box' }}>
          <div
            className="contacto-container no-pattern-bg"
            style={{
              width: isMobile ? '100%' : '50vw',
              maxWidth: '640px',
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: isMobile ? '8px' : '16px',
              marginLeft: isMobile ? 0 : '5vw',
              padding: 0,
              background: 'transparent',
              boxShadow: 'none'
            }}
          >
            <div className="contacto-content" style={{ width: '100%', marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>
              <div className="contacto-form-container" style={{ background: 'rgba(30, 30, 30, 0.75)', backdropFilter: 'blur(6px)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign: 'center' }}>
                  <img src="/images/proveedores/Proveedores-titulo.png" alt="Título Proveedores" className="proveedores-titulo-img" style={{ width: isMobile ? '80%' : '60%', maxWidth: '400px', marginTop: isMobile ? '0px' : '10px', marginBottom: '20px', opacity: 1, position: 'relative', zIndex: 2 }} />
                </div>
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

// Solo para mobile: reducir el margen superior del contenido
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @media (max-width: 768px) {
      .sucursales-section {
        margin-top: 0px !important;
      }
      .contacto-container {
        margin-top: 32px !important;
      }
      .responsive-row {
        flex-direction: column !important;
      }
      .responsive-row > div:first-child {
        width: 100vw !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 20px !important;
      }
      .proveedores-titulo-img {
        margin-top: 0px !important;
        margin-bottom: 24px !important;
        width: 100% !important;
        max-width: 350px !important;
      }
    }
  `;
  document.head.appendChild(style);
} 