import React, { useState } from 'react';
import '../pages/Contacto.css';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import Swal from 'sweetalert2';

const VentaCorporativa: React.FC = () => {
    const [formData, setFormData] = useState({
        nombreEmpresa: '',
        telefono: '',
        fechaEvento: '',
        cantidadDocenas: '',
        cantidadComensales: '',
        descripcionEvento: '',
        observaciones: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({
        nombreEmpresa: '',
        telefono: '',
        fechaEvento: '',
        cantidadDocenas: '',
        cantidadComensales: '',
        descripcionEvento: '',
        observaciones: '',
    });

    const validate = () => {
        const newErrors: any = {};
        if (!formData.nombreEmpresa.trim()) newErrors.nombreEmpresa = 'El nombre de la empresa es obligatorio.';
        if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio.';
        else if (!/^[\d\s\-\+\(\)]+$/.test(formData.telefono)) newErrors.telefono = 'El formato del teléfono no es válido.';
        if (!formData.fechaEvento.trim()) newErrors.fechaEvento = 'La fecha del evento es obligatoria.';
        if (!formData.cantidadDocenas.trim()) newErrors.cantidadDocenas = 'La cantidad estimada de docenas es obligatoria.';
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
                title: '¡Éxito!',
                text: 'Tu solicitud de venta corporativa ha sido enviada correctamente.',
                confirmButtonColor: '#d4af37',
            });
            setFormData({
                nombreEmpresa: '',
                telefono: '',
                fechaEvento: '',
                cantidadDocenas: '',
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

    return (
        <div className="venta-corporativa-section" style={{ 
            background: '#111', 
            minHeight: '100vh', 
            width: '100vw', 
            overflowX: 'hidden',
            backgroundImage: `linear-gradient(rgba(17,17,17,0.5), rgba(17,17,17,0.5)), url('/assets/background-text.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            paddingTop: '6vh', // Aumenta el espacio superior para centrar mejor
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', minHeight: '100vh', alignItems: 'stretch', justifyContent: 'center' }}>
                {/* Columna izquierda: Imagen y beneficios */}
                <div style={{ width: '48vw', minWidth: 340, maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '64px 0 0 0' }}>
                    <img src="/corp/foto f-100.jpg" alt="Venta corporativa" className="img-corporativa" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '90%', maxWidth: 520 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                            <img src="/corp/descuento.png" alt="Descuento" style={{ width: 54, height: 54 }} />
                            <span style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 500 }}>Packs corporativos anticipados con hasta 25% OFF</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                            <img src="/corp/entrega.png" alt="Entrega" style={{ width: 54, height: 54 }} />
                            <span style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 500 }}>Entregas en <b>CABA</b> y <b>GBA</b></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                            <img src="/corp/servicio.png" alt="Servicio" style={{ width: 54, height: 54 }} />
                            <span style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 500 }}>Atención personalizada, adaptada a las necesidades de cada empresa</span>
                        </div>
                    </div>
                </div>
                {/* Columna derecha: Formulario */}
                <div style={{ width: '52vw', minWidth: 340, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'none', borderRadius: 18, paddingTop: '64px' }}>
                    <div className="glass-form-container">
                        {/* <h1 style={{ color: '#fff', fontWeight: 700, fontSize: '2.2rem', textAlign: 'left', marginBottom: 12, letterSpacing: 0 }}>VENTA CORPORATIVA</h1> */}
                        <img src="/corp/venta corporativa.png" alt="Venta Corporativa" style={{ width: '100%', maxWidth: 420, marginBottom: 12, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                        <p style={{ color: '#fff', textAlign: 'center', marginBottom: 24, fontSize: '1.08rem', opacity: 0.92 }}>
                            Completa el siguiente formulario para solicitar una venta corporativa.
                        </p>
                        {/* Formulario original */}
                        <form onSubmit={handleSubmit} className="contacto-form">
                                    <div className="form-row">
                                        <div className="form-group half-width">
                                            <label htmlFor="nombreEmpresa">Nombre de Empresa: <span className="required">*</span></label>
                                            <input
                                                type="text"
                                                id="nombreEmpresa"
                                                name="nombreEmpresa"
                                                value={formData.nombreEmpresa}
                                                onChange={handleChange}
                                                placeholder="Ingrese el nombre de la empresa"
                                            />
                                            {errors.nombreEmpresa && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.nombreEmpresa}</div>}
                                        </div>
                                        <div className="form-group half-width">
                                            <label htmlFor="telefono">Teléfono: <span className="required">*</span></label>
                                            <input
                                                type="tel"
                                                id="telefono"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                                placeholder="+54 9 11 1234-5678"
                                            />
                                            {errors.telefono && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.telefono}</div>}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group half-width">
                                            <label htmlFor="fechaEvento">Fecha del evento: <span className="required">*</span></label>
                                            <input
                                                type="date"
                                                id="fechaEvento"
                                                name="fechaEvento"
                                                value={formData.fechaEvento}
                                                onChange={handleChange}
                                                style={{ minWidth: '180px', maxWidth: '250px', width: '100%', background: 'rgba(255,255,255,0.1)', zIndex: 2, position: 'relative', fontWeight: 600, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px', padding: '15px', boxSizing: 'border-box' }}
                                                autoComplete="off"
                                            />
                                            {errors.fechaEvento && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.fechaEvento}</div>}
                                        </div>
                                        <div className="form-group half-width">
                                            <label htmlFor="cantidadDocenas">Cantidad estimada de docenas:</label>
                                            <input
                                                type="number"
                                                id="cantidadDocenas"
                                                name="cantidadDocenas"
                                                value={formData.cantidadDocenas}
                                                onChange={handleChange}
                                                min="1"
                                            />
                                            {errors.cantidadDocenas && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.cantidadDocenas}</div>}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group half-width">
                                            <label htmlFor="cantidadComensales">Cantidad de comensales: <span className="required">*</span></label>
                                            <input
                                                type="number"
                                                id="cantidadComensales"
                                                name="cantidadComensales"
                                                value={formData.cantidadComensales}
                                                onChange={handleChange}
                                                min="1"
                                            />
                                            {errors.cantidadComensales && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.cantidadComensales}</div>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descripcionEvento">Breve descripción del evento: <span className="required">*</span></label>
                                        <textarea
                                            id="descripcionEvento"
                                            name="descripcionEvento"
                                            value={formData.descripcionEvento}
                                            onChange={handleChange}
                                            placeholder="Describa brevemente el evento"
                                            rows={2}
                                        />
                                        {errors.descripcionEvento && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.descripcionEvento}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="observaciones">Observaciones especiales:</label>
                                        <textarea
                                            id="observaciones"
                                            name="observaciones"
                                            value={formData.observaciones}
                                            onChange={handleChange}
                                            placeholder="Detalle aquí cualquier requerimiento especial"
                                            rows={2}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px', gap: '8px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '0', whiteSpace: 'nowrap' }}>
                                            <a href="mailto:eventos@migusto.com.ar" style={{ color: '#D4AF37', textDecoration: 'underline', fontWeight: 500, fontSize: '0.98rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.8, marginBottom: 0, whiteSpace: 'nowrap' }}>
                                                MÁS INFO EN eventos@migusto.com.ar
                                            </a>
                                            <a href="https://wa.me/541163704522" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'underline', fontWeight: 500, fontSize: '0.98rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.8, marginBottom: 0, whiteSpace: 'nowrap' }}>
                                                Organizar evento por Whatsapp!
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
    );
};

export default VentaCorporativa; 
