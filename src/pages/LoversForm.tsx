import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import '../pages/Contacto.css';
import emailjs from '@emailjs/browser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const sucursales = [
  'Ballester', 'Balvanera', 'Barrancas', 'Belgrano', 'Bella Vista', 'Campana', 'Del Viso', 'Devoto', 'Don Torcuato', 'Escobar', 'Floresta', 'Florida', 'Gral. Pacheco', 'Hurlingham', 'Ituzaingo', 'Jose C. Paz', 'Los Polvorines', 'Martinez', 'Maschwitz', 'Mataderos', 'Merlo', 'Moreno', 'Muñiz', 'Munro', 'Palermo', 'Paternal', 'Pilar Centro', 'Pilar Derqui', 'Puerto Madero', 'San Fernando', 'San Martin', 'San Miguel', 'Tigre', 'Tortugas Norte', 'Villa Adelina', 'Villa Crespo', 'Villa Urquiza',
];
const sabores = [
  'Mexican Pibil Pork', 'Mexican Veggie', 'Big Burger', 'Vacio y provoleta', 'Matambre a la pizza', 'CheeseBurger', 'Jamon y queso', 'American Chicken', 'Jamon, queso y huevo', 'Carne Picante', 'Jamon, Tomate y albahaca', 'Carne al cuchillo', 'Queso y Cebolla', 'Carne Suave', 'Roquefort con jamon', 'Carne con aceituna', 'Pollo', 'Cuatro Quesos', 'Pollo al champignon', 'Choclo', 'Verdura', 'Calabaza', 'Pance y ciruela',
];

const initialFormData = {
  nombre: '',
  email: '',
  telefono: '',
  cumple: '',
  saboresFavoritos: [] as string[],
  esCliente: '',
  sucursal: '',
  aceptaBeneficios: false,
};

const initialErrors = {
  nombre: '',
  email: '',
  telefono: '',
  cumple: '',
  saboresFavoritos: '',
  esCliente: '',
  sucursal: '',
};

// Modal de privacidad
const PRIVACY_TEXT = `En Mi Gusto Lovers valoramos tu privacidad. Los datos que recolectamos (nombre, email, teléfono, cumpleaños, sabores favoritos, etc.) se utilizan únicamente para gestionar tu membresía, enviarte novedades y mejorar nuestros servicios.`;

const LoversForm: React.FC = () => {
  const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);
  const [errors, setErrors] = useState<typeof initialErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacidad, setShowPrivacidad] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <link rel="stylesheet" href="/src/pages/Contacto.css" />
              <link rel="stylesheet" href="https://unpkg.com/react-datepicker/dist/react-datepicker.css" />
              <style>body, html { height: 100vh; overflow: hidden; margin: 0; padding: 0; }</style>
            </head>
            <body style="height:100vh;overflow:hidden;margin:0;padding:0;display:flex;align-items:center;justify-content:center;">
              <div id="form-root"></div>
            </body>
          </html>
        `);
        doc.close();
        // Renderizar el formulario React dentro del iframe
        // @ts-ignore
        window.React = React;
        // @ts-ignore
        window.ReactDOM = require('react-dom');
        // @ts-ignore
        window.ReactDOM.render(
          <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {/* Formulario Lovers original aquí */}
            <div className="contacto-container">
              <div className="contacto-header">
                <h1>Mi Gusto Lovers</h1>
                <p>¡Unite a nuestro programa exclusivo y disfrutá de beneficios únicos!</p>
              </div>
              <div className="contacto-content">
                <div className="contacto-form-container">
                  <h2>Formulario de inscripción</h2>
                  <form className="contacto-form lovers-contacto-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label htmlFor="nombre">Nombre completo: <span className="required">*</span></label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Ingrese su nombre"
                          className={errors.nombre ? 'input-error' : ''}
                        />
                        {errors.nombre && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.nombre}</div>}
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
                          placeholder="ejemplo@email.com"
                          className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.email}</div>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label>Fecha de cumpleaños: <span className="required">*</span></label>
                        <DatePicker
                          selected={formData.cumple ? new Date(formData.cumple + 'T00:00:00') : null}
                          onChange={(date: Date | null) => {
                            if (date) {
                              const year = date.getFullYear();
                              const month = String(date.getMonth() + 1).padStart(2, '0');
                              const day = String(date.getDate()).padStart(2, '0');
                              const formattedDate = `${year}-${month}-${day}`;
                              setFormData(prev => ({ ...prev, cumple: formattedDate }));
                            } else {
                              setFormData(prev => ({ ...prev, cumple: '' }));
                            }
                            setErrors(prev => ({ ...prev, cumple: '' }));
                          }}
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date()}
                          placeholderText="Elegir mi cumpleaños"
                          className={errors.cumple ? 'input-error' : ''}
                          wrapperClassName="datepicker-wrapper"
                          popperClassName="datepicker-popper"
                          popperPlacement="bottom-start"
                          showPopperArrow={false}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          locale="es"
                        />
                        <small style={{color: '#FFD700', fontSize: '0.95rem'}}>Solo para saludarte en tu día :)</small>
                        {errors.cumple && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.cumple}</div>}
                      </div>
                      <div className="form-group half-width">
                        <label htmlFor="saboresFavoritos">Tus 3 sabores favoritos: <span className="required">*</span></label>
                        <select
                          id="saboresFavoritos"
                          name="saboresFavoritos"
                          multiple
                          value={formData.saboresFavoritos}
                          onChange={e => {
                            const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
                            setFormData(prev => ({ ...prev, saboresFavoritos: options.slice(0, 3) }));
                            setErrors(prev => ({ ...prev, saboresFavoritos: '' }));
                          }}
                          className={errors.saboresFavoritos ? 'input-error' : ''}
                          style={{ minHeight: 80 }}
                          required
                        >
                          {sabores.map(sabor => (
                            <option key={sabor} value={sabor}>{sabor}</option>
                          ))}
                        </select>
                        <small style={{color: '#FFD700', fontSize: '0.95rem'}}>Puedes elegir hasta 3 sabores</small>
                        {errors.saboresFavoritos && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.saboresFavoritos}</div>}
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
                          required
                          placeholder="+54 9 11 1234-5678"
                          className={errors.telefono ? 'input-error' : ''}
                        />
                        {errors.telefono && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.telefono}</div>}
                      </div>
                      <div className="form-group half-width">
                        <label htmlFor="sucursal">Sucursal habitual: <span className="required">*</span></label>
                        <select
                          id="sucursal"
                          name="sucursal"
                          value={formData.sucursal}
                          onChange={handleChange}
                          className={errors.sucursal ? 'input-error' : ''}
                          required
                        >
                          <option value="">Selecciona una sucursal</option>
                          {sucursales.map(suc => (
                            <option key={suc} value={suc}>{suc}</option>
                          ))}
                        </select>
                        {errors.sucursal && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.sucursal}</div>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label>¿Ya eres cliente de Mi Gusto? <span className="required">*</span></label>
                        <div style={{display: 'flex', gap: 24, marginTop: 8}}>
                          <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
                            <input
                              type="radio"
                              name="esCliente"
                              value="si"
                              checked={formData.esCliente === 'si'}
                              onChange={handleChange}
                              style={{accentColor: '#e53935'}}
                            />
                            <span style={{color: '#fff'}}>Sí</span>
                          </label>
                          <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
                            <input
                              type="radio"
                              name="esCliente"
                              value="no"
                              checked={formData.esCliente === 'no'}
                              onChange={handleChange}
                              style={{accentColor: '#e53935'}}
                            />
                            <span style={{color: '#fff'}}>No</span>
                          </label>
                        </div>
                        {errors.esCliente && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.esCliente}</div>}
                      </div>
                      <div className="form-group half-width" style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <button type="submit" className="btn-ver-mas" disabled={isSubmitting} style={{marginTop: 0}}>
                          {isSubmitting ? 'Enviando...' : 'Unirme ahora'}
                        </button>
                      </div>
                    </div>
                    <div className="form-row" style={{ marginTop: 12, marginBottom: 0 }}>
                      <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <input
                          type="checkbox"
                          id="aceptaBeneficios"
                          name="aceptaBeneficios"
                          checked={formData.aceptaBeneficios}
                          onChange={handleChange}
                          style={{ accentColor: '#e53935', width: 18, height: 18, margin: 0 }}
                        />
                        <label htmlFor="aceptaBeneficios" style={{ margin: 0, color: '#fff', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}>
                          Quiero recibir novedades y beneficios exclusivos
                        </label>
                      </div>
                    </div>
                    <div className="form-row" style={{ marginTop: 0, marginBottom: 8 }}>
                      <button
                        type="button"
                        style={{ background: 'none', border: 'none', color: '#FFD700', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.98rem', marginTop: 4 }}
                        onClick={() => setShowPrivacidad(true)}
                      >
                        Ver políticas de privacidad
                      </button>
                    </div>
                  </form>
                  {/* Modal de privacidad */}
                  {showPrivacidad && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }} onClick={() => setShowPrivacidad(false)}>
                      <div style={{ background: '#181818', color: '#fff', borderRadius: 18, maxWidth: 480, width: '90%', padding: '2.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', position: 'relative', margin: 'auto', border: '2px solid #FFD700', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowPrivacidad(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#FFD700', fontSize: 28, cursor: 'pointer', fontWeight: 700 }} aria-label="Cerrar">×</button>
                        <h2 style={{ color: '#FFD700', marginBottom: 18, fontSize: '1.3rem', fontWeight: 800 }}>Política de Privacidad y Legales</h2>
                        <div style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 18 }}>{PRIVACY_TEXT}</div>
                        <button onClick={() => setShowPrivacidad(false)} style={{ background: '#FFD700', color: '#181818', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: 8 }}>Cerrar</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          doc.getElementById('form-root')
        );
      }
    }
  }, []);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'El formato del email no es válido.';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio.';
    else if (!/^[\d\s\-\+\(\)]+$/.test(formData.telefono)) newErrors.telefono = 'El formato del teléfono no es válido.';
    if (!formData.cumple) newErrors.cumple = 'La fecha de cumpleaños es obligatoria';
    if (!formData.saboresFavoritos.length) newErrors.saboresFavoritos = 'Selecciona al menos un sabor favorito';
    else if (formData.saboresFavoritos.length > 3) newErrors.saboresFavoritos = 'Solo puedes seleccionar hasta 3 sabores';
    if (!formData.sucursal) newErrors.sucursal = 'Debe seleccionar una sucursal';
    if (!formData.esCliente) newErrors.esCliente = 'Debe indicar si ya es cliente';
    if (!formData.aceptaBeneficios) newErrors.aceptaBeneficios = 'Debes aceptar las políticas de privacidad para continuar.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: '' }));
      return;
    }
    if (type === 'checkbox') {
      if (target instanceof HTMLInputElement) {
        setFormData(prev => ({ ...prev, [name]: target.checked }));
        setErrors(prev => ({ ...prev, [name]: '' }));
        return;
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSaborChipClick = (sabor: string) => {
    let nuevosSabores = [...formData.saboresFavoritos];
    if (nuevosSabores.includes(sabor)) {
      nuevosSabores = nuevosSabores.filter(s => s !== sabor);
    } else {
      if (nuevosSabores.length < 3) {
        nuevosSabores.push(sabor);
      }
    }
    setFormData(prev => ({ ...prev, saboresFavoritos: nuevosSabores }));
    if (nuevosSabores.length > 3) {
      setErrors(prev => ({ ...prev, saboresFavoritos: 'Solo puedes seleccionar hasta 3 sabores' }));
    } else {
      setErrors(prev => ({ ...prev, saboresFavoritos: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const serviceID = 'service_vroveb8'; 
    const templateID = 'template_rx2wmet'; 
    const publicKey = '2muZYDfZaoXaOzlBc'; 

    const templateParams = {
      name: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      cumple: formData.cumple,
      saboresFavoritos: formData.saboresFavoritos.join(', '),
      esCliente: formData.esCliente,
      sucursal: formData.sucursal,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      alert('¡Gracias por tu interés! Nos pondremos en contacto pronto.');
      setFormData(initialFormData);
      setErrors(initialErrors);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animación de partículas de empanadas (lluvia)
  const particlesAnimations = `
    @keyframes empanada-fall-optimized {
      0% {
        opacity: 0;
        transform: translateY(-80px) rotate(0deg);
      }
      5% {
        opacity: 1;
      }
      95% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateY(110vh) rotate(var(--rotEnd, 360deg));
      }
    }
  `;

  return (
    <>
      <NavBar />
      <iframe
        ref={iframeRef}
        title="Lovers Form"
        style={{ width: '100vw', height: '100vh', border: 'none', overflow: 'hidden', display: 'block' }}
      />
    </>
  );
};

export default LoversForm; 