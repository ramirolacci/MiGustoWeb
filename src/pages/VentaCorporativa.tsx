import React, { useState, useEffect } from 'react';
import './VentaCorporativa.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const VentaCorporativa: React.FC = () => {
    const [formData, setFormData] = useState({
        nombreApellido: '',
        mailCorporativo: '',
        telefono: '',
        fechaEvento: '',
        cantidadComensales: '',
        descripcionEvento: '',
        observaciones: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({
        nombreApellido: '',
        mailCorporativo: '',
        telefono: '',
        fechaEvento: '',
        cantidadComensales: '',
        descripcionEvento: '',
        observaciones: '',
    });

    const validate = () => {
        const newErrors: any = {};
        if (!formData.nombreApellido.trim()) newErrors.nombreApellido = 'El nombre y apellido es obligatorio.';
        if (!formData.mailCorporativo.trim()) newErrors.mailCorporativo = 'El mail corporativo es obligatorio.';
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.mailCorporativo)) newErrors.mailCorporativo = 'El formato del mail no es válido.';
        if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio.';
        if (!formData.fechaEvento.trim()) newErrors.fechaEvento = 'La fecha del evento es obligatoria.';
        if (!formData.cantidadComensales.trim()) newErrors.cantidadComensales = 'La cantidad de comensales es obligatoria.';
        if (!formData.descripcionEvento.trim()) newErrors.descripcionEvento = 'La descripción del evento es obligatoria.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'fechaEvento') {
            console.log('Valor seleccionado en fechaEvento:', value);
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            await axios.post('/api/mail/corporativa', formData);
            Swal.fire({
                icon: 'success',
                title: '<span style="color:#fff;font-family:inherit;font-size:1.5rem;font-weight:600;">¡Éxito!</span>',
                html: '<span style="color:#fff;font-family:inherit;font-size:1.08rem;">Tu solicitud de venta corporativa ha sido enviada correctamente.</span>',
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#d4af37',
                customClass: {
                  popup: 'swal2-corporativa-popup',
                  confirmButton: 'swal2-corporativa-btn',
                },
                buttonsStyling: false,
                showClass: {
                  popup: 'swal2-show'
                },
                hideClass: {
                  popup: 'swal2-hide'
                }
            });
            setFormData({
                nombreApellido: '',
                mailCorporativo: '',
                telefono: '',
                fechaEvento: '',
                cantidadComensales: '',
                descripcionEvento: '',
                observaciones: ''
            });
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonColor: '#d4af37',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 600);
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 600);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Antes del return, defino la fecha mínima para el input de fecha
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;

    return (
        <>
            <nav className="navbar-corporativa">
                <a href="https://www.migusto.com.ar/?gad_source=1&gad_campaignid=21522046218&gclid=CjwKCAjw1dLDBhBoEiwAQNRiQZmhl6UsJh3HcV3WRq5ip6gpuIfDQCJPpZUsT1RWBzVYdqpsi8vXWBoCb9EQAvD_BwE" target="_blank" rel="noopener noreferrer">
                    <img src="/corp/icono.png" alt="Mi Gusto Icono" className="logo-navbar-corporativa" loading="lazy" />
                </a>
            </nav>
            <div className="venta-corporativa-section">
                <div className="corporativa-layout">
                    {/* Imagen "Venta corporativa" arriba de todo SOLO en mobile */}
                    {isMobile && (
                      <div className="venta-corporativa-header-mobile">
                        <img src="/corp/venta corporativa.png" alt="Venta Corporativa" style={{ width: '100%', maxWidth: 420, margin: '16px auto 12px', display: 'block' }} loading="lazy" />
                      </div>
                    )}
                    {/* Columna izquierda: Imagen y beneficios */}
                    <div className="corporativa-col corporativa-col-img">
                        {/* Imagen de título SOLO en escritorio, arriba de la imagen principal */}
                        {!isMobile && (
                          <img src="/corp/venta corporativa.png" alt="Venta Corporativa" className="venta-corporativa-header-desktop" loading="lazy" />
                        )}
                        <img src="/corp/foto f-100.jpg" alt="Venta corporativa" className="img-corporativa" loading="lazy" />
                        <div className="beneficios-corporativa">
                            <div className="beneficio-item">
                                <img src="/corp/descuento.png" alt="Descuento" className="icono-beneficio" loading="lazy" />
                                <span>Packs corporativos anticipados con hasta 25% OFF</span>
                            </div>
                            <div className="beneficio-item">
                                <img src="/corp/entrega.png" alt="Entrega" className="icono-beneficio" loading="lazy" />
                                <span>Entregas en <b>CABA</b> y <b>GBA</b></span>
                            </div>
                            <div className="beneficio-item">
                                <img src="/corp/servicio.png" alt="Servicio" className="icono-beneficio" loading="lazy" />
                                <span>Atención personalizada, adaptada a tus necesidades</span>
                            </div>
                        </div>
                    </div>
                    {/* Columna derecha: Formulario */}
                    <div className="corporativa-col corporativa-col-form">
                        <div className="glass-form-container">
                            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: 28, letterSpacing: 1 }}>
                                Eventos Corporativos: solicitá tu propuesta personalizada
                            </h2>
                            {/* Formulario original */}
                            <form onSubmit={handleSubmit} className="contacto-form">
                                <div className="form-row">
                                    <div className="form-group half-width">
                                        <label htmlFor="nombreApellido">Nombre y apellido: <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            id="nombreApellido"
                                            name="nombreApellido"
                                            value={formData.nombreApellido}
                                            onChange={handleChange}
                                            placeholder="Ingrese su nombre y apellido"
                                        />
                                        {errors.nombreApellido && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.nombreApellido}</div>}
                                    </div>
                                    <div className="form-group half-width">
                                        <label htmlFor="mailCorporativo">Mail corporativo: <span className="required">*</span></label>
                                        <input
                                            type="email"
                                            id="mailCorporativo"
                                            name="mailCorporativo"
                                            value={formData.mailCorporativo}
                                            onChange={handleChange}
                                            placeholder="Ingrese su mail corporativo"
                                        />
                                        {errors.mailCorporativo && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.mailCorporativo}</div>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group half-width">
                                        <label htmlFor="telefono">Teléfono: <span className="required">*</span></label>
                                        <input
                                            type="tel"
                                            id="telefono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            placeholder="Ingrese su teléfono"
                                        />
                                        {errors.telefono && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.telefono}</div>}
                                    </div>
                                    <div className="form-group half-width">
                                        <label htmlFor="fechaEvento">Fecha del evento: <span className="required">*</span></label>
                                        <input
                                            type="date"
                                            id="fechaEvento"
                                            name="fechaEvento"
                                            value={formData.fechaEvento}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            min={minDate}
                                        />
                                        {errors.fechaEvento && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.fechaEvento}</div>}
                                    </div>
                                </div>
                                <div className="form-row" style={{ maxWidth: 556, width: '100%' }}>
                                    <div className="form-group" style={{ width: '100%' }}>
                                        <label htmlFor="cantidadComensales">Cantidad de comensales: <span className="required">*</span></label>
                                        <input
                                            type="number"
                                            id="cantidadComensales"
                                            name="cantidadComensales"
                                            value={formData.cantidadComensales}
                                            onChange={handleChange}
                                            min="1"
                                            style={{ width: '100%' }}
                                        />
                                        {errors.cantidadComensales && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.cantidadComensales}</div>}
                                    </div>
                                </div>
                                <div className="form-row" style={{ maxWidth: 556, width: '100%' }}>
                                    <div className="form-group" style={{ width: '100%' }}>
                                        <label htmlFor="descripcionEvento">Breve descripción del evento: <span className="required">*</span></label>
                                        <textarea
                                            id="descripcionEvento"
                                            name="descripcionEvento"
                                            value={formData.descripcionEvento}
                                            onChange={handleChange}
                                            placeholder="Describa brevemente el evento"
                                            rows={2}
                                            style={{ width: '100%' }}
                                        />
                                        {errors.descripcionEvento && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.descripcionEvento}</div>}
                                    </div>
                                </div>
                                <div className="form-row" style={{ maxWidth: 556, width: '100%' }}>
                                    <div className="form-group" style={{ width: '100%' }}>
                                        <label htmlFor="observaciones">Observaciones especiales:</label>
                                        <textarea
                                            id="observaciones"
                                            name="observaciones"
                                            value={formData.observaciones}
                                            onChange={handleChange}
                                            placeholder="Detalle aquí cualquier requerimiento especial"
                                            rows={2}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px', gap: '8px' }}>
                                    <div className="contact-links" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '0', whiteSpace: 'nowrap' }}>
                                        <a href="mailto:eventos@migusto.com.ar" style={{ color: '#D4AF37', textDecoration: 'underline', fontWeight: 500, fontSize: '0.98rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.8, marginBottom: 0, whiteSpace: 'nowrap' }}>
                                        Email: eventos@migusto.com.ar
                                        </a>
                                        <a href="https://wa.me/541163704522" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'underline', fontWeight: 500, fontSize: '0.98rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.8, marginBottom: 0, whiteSpace: 'nowrap' }}>
                                        Contactanos por Whatsapp
                                        </a>
                                    </div>
                                    <button type="submit" className="btn-ver-mas" disabled={isSubmitting}>
                                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VentaCorporativa; 
