import React, { useState, useEffect } from 'react';
import '../pages/Contacto.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    const [calendarOpenEvento, setCalendarOpenEvento] = useState(false);

    const [errors, setErrors] = useState({
        nombreApellido: '',
        mailCorporativo: '',
        telefono: '',
        fechaEvento: '',
        cantidadComensales: '',
        descripcionEvento: '',
        observaciones: '',
    });

    // ScrollReveal para animaciones
    useEffect(() => {
        import('scrollreveal').then((module) => {
            const sr = module.default ? module.default : module;
            sr().reveal('.venta-corporativa-img', {
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

    const autoResizeTextarea = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const textarea = event.currentTarget;
        textarea.style.height = 'auto';
        const newHeight = Math.max(48, textarea.scrollHeight);
        textarea.style.height = `${newHeight}px`;
    };

    useEffect(() => {
        const ids = ['descripcionEvento', 'observaciones'];
        ids.forEach((id) => {
            const el = document.getElementById(id) as HTMLTextAreaElement | null;
            if (el) {
                el.style.height = 'auto';
                el.style.height = Math.max(48, el.scrollHeight) + 'px';
            }
        });
    }, []);

    const handleFechaEventoChange = (date: Date | null) => {
        setFormData(prev => ({
            ...prev,
            fechaEvento: date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10) : ''
        }));
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

    // Antes del return, defino la fecha mínima para el input de fecha
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;

    return (
        <div className="sucursales-section" style={{ marginTop: '40px' }}>
            <div className="background-overlay"></div>
            <div className="sucursales-container">
                <div className="responsive-row" style={{ display: 'flex', flexDirection: 'row', width: '100vw', minHeight: '100vh', alignItems: 'stretch' }}>
                    {/* PARTE IZQUIERDA: Imagen de Venta Corporativa */}
                    <div className="venta-corporativa-img" style={{ 
                        width: '50vw', 
                        height: '100%', 
                        maxHeight: '100vh', 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: '0px', 
                        position: 'relative', 
                        zIndex: 2,
                        padding: '40px'
                    }}>
                        <style>{`
                            @media (max-width: 900px) {
                                .venta-corporativa-img {
                                    width: 100vw !important;
                                    padding: 16px !important;
                                    margin-top: 8px !important;
                                }
                                .venta-corporativa-img .corp-title-img {
                                    width: min(72vw, 340px) !important;
                                    margin-bottom: 16px !important;
                                }
                                .venta-corporativa-img .corp-hero-img {
                                    width: 92vw !important;
                                    max-width: 520px !important;
                                    margin-bottom: 16px !important;
                                }
                                .venta-corporativa-img .corp-text {
                                    padding: 0 8px !important;
                                }
                                .venta-corporativa-img .corp-text-title {
                                    font-size: 1.35rem !important;
                                    margin-bottom: 12px !important;
                                }
                                .venta-corporativa-img .corp-text-body {
                                    font-size: 1.12rem !important;
                                    line-height: 1.55 !important;
                                }
                                .venta-corporativa-img .corp-icon {
                                    width: 32px !important;
                                    height: 32px !important;
                                }
                            }
                        `}</style>
                        {/* Título Venta Corporativa */}
                        <img src="/corp/venta corporativa.png" alt="Venta Corporativa" className="corp-title-img" style={{ 
                            width: '420px', 
                            marginBottom: '40px', 
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                            zIndex: 3
                        }} />
                        
                        {/* Imagen de fondo */}
                        <img src="/corp/foto f-100.jpg" alt="Venta corporativa" className="corp-hero-img" style={{ 
                            width: '100%', 
                            maxWidth: '680px',
                            height: 'auto',
                            maxHeight: 'calc(100vh - 200px)',
                            objectFit: 'cover',
                            borderRadius: '12px', 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            zIndex: 2,
                            marginBottom: '32px'
                        }} />
                        
                        {/* Bloque de beneficios */}
                        <div className="corp-text" style={{ 
                            textAlign: 'left',
                            zIndex: 3,
                            padding: '20px'
                        }}>
                            <div className="corp-text-title" style={{ fontWeight: 700, fontSize: '2.4rem', marginBottom: '24px', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                                Beneficios Corporativos
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <img src="/corp/descuento.png" alt="Descuento" className="corp-icon" style={{ width: 44, height: 44, objectFit: 'contain' }} loading="lazy" />
                                    <span className="corp-text-body" style={{ fontSize: '1.6rem', color: '#ffffff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                                        Packs corporativos anticipados con hasta 25% OFF
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <img src="/corp/entrega.png" alt="Entrega" className="corp-icon" style={{ width: 44, height: 44, objectFit: 'contain' }} loading="lazy" />
                                    <span className="corp-text-body" style={{ fontSize: '1.6rem', color: '#ffffff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                                        Entregas en CABA y GBA
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <img src="/corp/servicio.png" alt="Servicio" className="corp-icon" style={{ width: 44, height: 44, objectFit: 'contain' }} loading="lazy" />
                                    <span className="corp-text-body" style={{ fontSize: '1.6rem', color: '#ffffff', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                                        Atención personalizada, adaptada a tus necesidades
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE DERECHA: Formulario */}
                    <div className="contacto-container" style={{ 
                        width: '50vw', 
                        minHeight: '100vh', 
                        display: 'flex', 
                        alignItems: 'stretch', 
                        justifyContent: 'center', 
                        marginTop: '100px' 
                    }}>
                        <div className="contacto-content" style={{ 
                            width: '100%', 
                            marginTop: (typeof window !== 'undefined' && window.innerWidth > 900) ? '-40px' : '0' 
                        }}>
                            <div className="contacto-form-container" style={{ 
                                background: 'rgba(30, 30, 30, 0.65)', 
                                backdropFilter: 'blur(5px)'
                            }}>
                                <p style={{ textAlign: 'center', fontSize: '1.4rem', marginBottom: '24px' }}>
                                    Eventos Corporativos: solicitá tu propuesta personalizada
                                </p>
                                
                                <form onSubmit={handleSubmit} className="contacto-form">
                                    <style>{`
										.react-datepicker {
											background: #181818 !important;
											border: 1px solid #333 !important;
											color: #fff !important;
											font-family: inherit !important;
											border-radius: 8px !important;
											box-shadow: 0 4px 24px rgba(0,0,0,0.25) !important;
											left: -100px !important;
											position: relative !important;
										}
										.react-datepicker__header {
											background: #222 !important;
											border-bottom: 1px solid #333 !important;
											color: #fff !important;
											border-radius: 8px 8px 0 0 !important;
										}
										.react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
											color: #ffc107 !important;
											font-weight: bold !important;
										}
										.react-datepicker__day, .react-datepicker__day-name {
											color: #fff !important;
											font-size: 1rem !important;
											border-radius: 4px !important;
										}
										.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
											background: #ffc107 !important;
											color: #222 !important;
										}
										.react-datepicker__day:hover {
											background: #333 !important;
											color: #ffc107 !important;
										}
										.react-datepicker__triangle { display: none !important; }
										.react-datepicker__navigation { top: 12px !important; }
										.react-datepicker__navigation-icon::before { border-color: #ffc107 !important; }
										.react-datepicker__month-dropdown, .react-datepicker__year-dropdown {
											background: #181818 !important;
											color: #fff !important;
										}
										.react-datepicker__month-option, .react-datepicker__year-option { color: #fff !important; }
										.react-datepicker__month-option--selected, .react-datepicker__year-option--selected {
											background: #ffc107 !important;
											color: #222 !important;
										}
									`}</style>
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
                                                type="text"
                                                id="fechaEvento"
                                                name="fechaEvento"
                                                value={formData.fechaEvento}
                                                onClick={() => setCalendarOpenEvento(true)}
                                                readOnly
                                                placeholder="dd/mm/aaaa"
                                                className="contacto-form input"
                                            />
                                            <DatePicker
                                                selected={formData.fechaEvento ? new Date(formData.fechaEvento) : null}
                                                onChange={(date) => { handleFechaEventoChange(date); setCalendarOpenEvento(false); }}
                                                dateFormat="yyyy-MM-dd"
                                                minDate={new Date(minDate)}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                onSelect={() => setCalendarOpenEvento(false)}
                                                onClickOutside={() => setCalendarOpenEvento(false)}
                                                shouldCloseOnSelect={true}
                                                open={calendarOpenEvento}
                                                customInput={<input style={{ display: 'none' }} />}
                                            />
                                            {errors.fechaEvento && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.fechaEvento}</div>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cantidadComensales">Cantidad de comensales: <span className="required">*</span></label>
                                        <input
                                            type="number"
                                            id="cantidadComensales"
                                            name="cantidadComensales"
                                            value={formData.cantidadComensales}
                                            onChange={handleChange}
                                            min="1"
                                            placeholder="Ingrese la cantidad de comensales"
                                        />
                                        {errors.cantidadComensales && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.cantidadComensales}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descripcionEvento">Breve descripción del evento: <span className="required">*</span></label>
                                        <textarea
                                            id="descripcionEvento"
                                            name="descripcionEvento"
                                            value={formData.descripcionEvento}
                                            onChange={handleChange}
                                            onInput={autoResizeTextarea}
                                            placeholder="Describa brevemente el evento"
                                            rows={1}
                                            style={{ width: '100%', height: 48, minHeight: 48, padding: '12px 16px', resize: 'none' }}
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
                                            onInput={autoResizeTextarea}
                                            placeholder="Detalle aquí cualquier requerimiento especial"
                                            rows={1}
                                            style={{ width: '100%', height: 48, minHeight: 48, padding: '12px 16px', resize: 'none' }}
                                        />
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px', gap: '8px' }}>
                                        <div className="contact-links" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '0' }}>
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
            </div>
        </div>
    );
};

export default VentaCorporativa;

// Solo para mobile: reducir el margen superior del contenido
if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 900px) {
            .sucursales-section {
                margin-top: 0px !important;
            }
            .contacto-container {
                margin-top: 32px !important;
            }
            .responsive-row img {
                margin-top: 8px !important;
                margin-bottom: 32px !important;
            }
        }
    `;
    document.head.appendChild(style);
} 
