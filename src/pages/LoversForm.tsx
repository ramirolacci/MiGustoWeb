import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import '../pages/Contacto.css';
import emailjs from '@emailjs/browser';
import Empanada1 from '../lovers/assets/Empanadas/Mexican-Veggie-demo.png';
import Empanada2 from '../lovers/assets/Empanadas/Mexican-Pibil-Pork-demo.png';
import Empanada3 from '../lovers/assets/Empanadas/Matambre a la pizza.png';
import Empanada4 from '../lovers/assets/Empanadas/burger.png';
import '../lovers/index.css';
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

const LoversForm: React.FC = () => {
  const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);
  const [errors, setErrors] = useState<typeof initialErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saboresDropdownOpen, setSaboresDropdownOpen] = useState(false);
  const [sucursalDropdownOpen, setSucursalDropdownOpen] = useState(false);

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: '' }));
      return;
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

  function ParticlesBG() {
    const empanadas = [Empanada1, Empanada2, Empanada3, Empanada4];
    const particleCount = 28;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
    const particlesData = React.useMemo(() =>
      Array.from({length: particleCount}).map(() => {
        const left = Math.random() * 100;
        const size = 54 + Math.random() * 64;
        const delay = -Math.random() * 12;
        const duration = 10 + Math.random() * 10;
        const img = empanadas[Math.floor(Math.random() * empanadas.length)];
        const clockwise = Math.random() > 0.5;
        const rotEnd = clockwise ? 360 : -360;
        return { left, size, delay, duration, img, rotEnd };
      }),
      []
    );
    return (
      <>
        <style>{particlesAnimations + `
          .particles-bg {
            z-index: 2 !important;
          }
          .empanada-particle {
            z-index: 2 !important;
          }
        `}</style>
        <div className="particles-bg" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 2 }}>
          {particlesData.map((p, i) => (
            <img
              key={i}
              src={p.img}
              className="empanada-particle"
              alt="empanada"
              loading="lazy"
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                animation: `empanada-fall-optimized ${p.duration}s linear infinite`,
                animationDelay: `${p.delay}s`,
                willChange: 'transform, opacity',
                zIndex: 2, // Ahora las empanadas pasan por delante del fondo pero detrás del formulario
                pointerEvents: 'none',
                opacity: isMobile ? 0.45 : 1,
                '--rotEnd': `${p.rotEnd}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar loversActive={true} />
      <div className="sucursales-section" style={{ height: '100vh', overflow: 'hidden', width: '100vw', display: 'flex', flexDirection: 'column' }}>
        <div className="background-overlay"></div>
        <ParticlesBG />
        <div className="sucursales-container" style={{ flex: 1, display: 'flex', flexDirection: 'row', width: '100vw', height: '100%' }}>
          <div className="responsive-row" style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100%', alignItems: 'stretch', flex: 1 }}>
            <div className="contacto-container" style={{ width: '50vw', height: '100%', display: 'flex', alignItems: 'stretch', justifyContent: 'center', position: 'relative', zIndex: 3 }}>
              <div className="contacto-content" style={{ width: '100%', marginTop: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="contacto-form-container">
                  <h2>Lovers</h2>
                  <p style={{ textAlign: 'center' }}>Completa el siguiente formulario para ponerte en contacto con Mi Gusto Lovers.</p>
                  <form className="contacto-form" onSubmit={handleSubmit} noValidate>
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
                        <label>Tus 3 sabores favoritos: <span className="required">*</span></label>
                        <div style={{position: 'relative', marginBottom: 8, width: '100%'}}>
                          <div
                            tabIndex={0}
                            role="button"
                            aria-expanded={saboresDropdownOpen}
                            onClick={() => setSaboresDropdownOpen(v => !v)}
                            onBlur={() => setSaboresDropdownOpen(false)}
                            className={`contacto-form input ${errors.saboresFavoritos ? 'input-error' : ''}`}
                            style={{width: '100%', textAlign: 'left', padding: '15px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 5, fontSize: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', color: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}}>
                            <span
                              style={formData.saboresFavoritos.length === 0 ? { color: 'rgba(248, 249, 250, 0.6)' } : {}}
                            >
                              {formData.saboresFavoritos.length === 0 ? 'Elegir mis 3 sabores favoritos' : formData.saboresFavoritos.join(', ')}
                            </span>
                            <span style={{marginLeft: 8, transition: 'transform 0.2s', transform: saboresDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, color: '#f8f9fa'}}>▼</span>
                          </div>
                          {saboresDropdownOpen && (
                            <div style={{position: 'absolute', top: '110%', left: 0, zIndex: 100, width: '100%', background: 'rgba(24,24,24,0.97)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 5, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)', maxHeight: 260, overflowY: 'auto'}}>
                              {sabores.map(sabor => (
                                <div
                                  key={sabor}
                                  onClick={() => {
                                    handleSaborChipClick(sabor);
                                    if (formData.saboresFavoritos.includes(sabor) || formData.saboresFavoritos.length === 2) setSaboresDropdownOpen(false);
                                  }}
                                  style={{padding: '12px 18px', cursor: formData.saboresFavoritos.includes(sabor) ? 'not-allowed' : 'pointer', background: formData.saboresFavoritos.includes(sabor) ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#f8f9fa', fontWeight: formData.saboresFavoritos.includes(sabor) ? 700 : 400, borderBottom: '1px solid rgba(255,255,255,0.07)'}}
                                >
                                  {sabor}
                                  {formData.saboresFavoritos.includes(sabor) && <span style={{float: 'right', color: '#f8f9fa'}}>✓</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
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
                        <div style={{position: 'relative', marginBottom: 8, width: '100%'}}>
                          <div
                            tabIndex={0}
                            role="button"
                            aria-expanded={sucursalDropdownOpen}
                            onClick={() => setSucursalDropdownOpen(v => !v)}
                            onBlur={() => setSucursalDropdownOpen(false)}
                            className={`contacto-form input ${errors.sucursal ? 'input-error' : ''}`}
                            style={{width: '100%', textAlign: 'left', padding: '15px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 5, fontSize: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', color: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}}>
                            <span
                              style={formData.sucursal === '' ? { color: 'rgba(248, 249, 250, 0.6)' } : {}}
                            >
                              {formData.sucursal === '' ? 'Selecciona una sucursal' : formData.sucursal}
                            </span>
                            <span style={{marginLeft: 8, transition: 'transform 0.2s', transform: sucursalDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, color: '#f8f9fa'}}>▼</span>
                          </div>
                          {sucursalDropdownOpen && (
                            <div style={{position: 'absolute', top: '110%', left: 0, zIndex: 100, width: '100%', background: 'rgba(24,24,24,0.97)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 5, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)', maxHeight: 260, overflowY: 'auto'}}>
                              {sucursales.map(suc => (
                                <div
                                  key={suc}
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, sucursal: suc }));
                                    setSucursalDropdownOpen(false);
                                  }}
                                  style={{padding: '12px 18px', cursor: 'pointer', background: formData.sucursal === suc ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#f8f9fa', fontWeight: formData.sucursal === suc ? 700 : 400, borderBottom: '1px solid rgba(255,255,255,0.07)'}}
                                >
                                  {suc}
                                  {formData.sucursal === suc && <span style={{float: 'right', color: '#f8f9fa'}}>✓</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoversForm; 