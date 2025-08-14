import React, { useState, useRef, useEffect } from 'react';
import '../pages/Contacto.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Custom input para el datepicker que abre el calendario al hacer clic o foco
const CalendarInput = React.forwardRef<HTMLInputElement, any>(({ value, onClick, onChange, placeholder }, ref) => (
  <div style={{ position: 'relative', width: '100%' }}>
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      onFocus={onClick}
      onChange={onChange}
      onInput={e => {
        // Filtra letras en tiempo real y autocompleta las barras para dd/mm/aaaa
        const input = e.target as HTMLInputElement;
        let val = input.value.replace(/[^0-9]/g, '');
        if (val.length > 2 && val[2] !== '/') val = val.slice(0,2) + '/' + val.slice(2);
        if (val.length > 5 && val[5] !== '/') val = val.slice(0,5) + '/' + val.slice(5);
        input.value = val.slice(0,10);
      }}
      inputMode="numeric"
      pattern="[0-9/]*"
      placeholder={placeholder}
      className="contacto-form input datepicker-match"
      style={{ paddingRight: '48px', width: '100%', boxSizing: 'border-box' }}
      autoComplete="off"
    />
  </div>
));

const Franquicias: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    sexo: '',
    estadoCivil: '',
    tipoDocumento: '',
    numeroDocumento: '',
    paisResidencia: '',
    provinciaResidencia: '',
    localidadResidencia: '',
    domicilio: '',
    telefonoCelular: '',
    telefonoAlternativo: '',
    email: '',
    emailAlternativo: '',
    paisPreferencia: '',
    provinciaPreferencia: '',
    localidadPreferencia: '',
    inmuebleGarantia: '',
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const datePickerRef = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    nombre: '',
    fechaNacimiento: '',
    sexo: '',
    estadoCivil: '',
    tipoDocumento: '',
    numeroDocumento: '',
    paisResidencia: '',
    provinciaResidencia: '',
    localidadResidencia: '',
    domicilio: '',
    telefonoCelular: '',
    email: '',
    paisPreferencia: '',
    provinciaPreferencia: '',
    localidadPreferencia: '',
    inmuebleGarantia: '',
  });

  // ScrollReveal para animaciones
  useEffect(() => {
    import('scrollreveal').then((module) => {
      const sr = module.default ? module.default : module;
      sr().reveal('.franquicias-img', {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Nueva función para manejar la fecha con react-datepicker
  const handleDateChange = (date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => {
    setFormData(prevData => ({
      ...prevData,
      fechaNacimiento: date ? date.toLocaleDateString('es-AR') : (event && 'target' in event && (event.target as HTMLInputElement).value) || ''
    }));
    setCalendarOpen(false);
  };
  // Permitir escribir manualmente la fecha
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Solo permite números y barras, máximo 8 caracteres
    if (/^[0-9/]*$/.test(value) && value.length <= 8) {
      // Formato progresivo: dd, dd/, dd/mm, dd/mm/, dd/mm/aa
      const regex = /^(\d{0,2})(\/)?(\d{0,2})(\/)?(\d{0,2})$/;
      if (value === '' || regex.test(value)) {
        setFormData(prevData => ({ ...prevData, fechaNacimiento: value }));
      }
    }
  };

  const validateStep = () => {
    const newErrors: any = {};
    if (currentStep === 1) {
      if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
      if (!formData.fechaNacimiento.trim()) newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
      if (!formData.sexo.trim()) newErrors.sexo = 'El sexo es obligatorio.';
      if (!formData.estadoCivil.trim()) newErrors.estadoCivil = 'El estado civil es obligatorio.';
      if (!formData.tipoDocumento.trim()) newErrors.tipoDocumento = 'El tipo de documento es obligatorio.';
      if (!formData.numeroDocumento.trim()) newErrors.numeroDocumento = 'El número de documento es obligatorio.';
    }
    if (currentStep === 2) {
      if (!formData.paisResidencia.trim()) newErrors.paisResidencia = 'El país de residencia es obligatorio.';
      if (!formData.provinciaResidencia.trim()) newErrors.provinciaResidencia = 'La provincia de residencia es obligatoria.';
      if (!formData.localidadResidencia.trim()) newErrors.localidadResidencia = 'La localidad de residencia es obligatoria.';
      if (!formData.domicilio.trim()) newErrors.domicilio = 'El domicilio es obligatorio.';
      if (!formData.telefonoCelular.trim()) newErrors.telefonoCelular = 'El teléfono celular es obligatorio.';
      if (!formData.email.trim()) newErrors.email = 'El email es obligatorio.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'El formato del email no es válido.';
    }
    if (currentStep === 3) {
      if (!formData.paisPreferencia.trim()) newErrors.paisPreferencia = 'El país de preferencia es obligatorio.';
      if (!formData.provinciaPreferencia.trim()) newErrors.provinciaPreferencia = 'La provincia de preferencia es obligatoria.';
      if (!formData.localidadPreferencia.trim()) newErrors.localidadPreferencia = 'La localidad de preferencia es obligatoria.';
      if (!formData.inmuebleGarantia.trim()) newErrors.inmuebleGarantia = 'Este campo es obligatorio.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/mail/franquicia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('¡Formulario de franquicia enviado con éxito! Nos pondremos en contacto pronto.');
        setFormData({
          nombre: '',
          fechaNacimiento: '',
          sexo: '',
          estadoCivil: '',
          tipoDocumento: '',
          numeroDocumento: '',
          paisResidencia: '',
          provinciaResidencia: '',
          localidadResidencia: '',
          domicilio: '',
          telefonoCelular: '',
          telefonoAlternativo: '',
          email: '',
          emailAlternativo: '',
          paisPreferencia: '',
          provinciaPreferencia: '',
          localidadPreferencia: '',
          inmuebleGarantia: '',
        });
        setCurrentStep(1);
      } else {
        const data = await response.json();
        alert(data.message || 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressBarWidth = ((currentStep - 1) / 2) * 100;

  return (
    <div className="sucursales-section" style={{ marginTop: '40px' }}>
      <div className="background-overlay"></div>
      <div className="sucursales-container">
        <div className="responsive-row" style={{ display: 'flex', flexDirection: 'row', width: '100vw', minHeight: '100vh', alignItems: 'stretch' }}>
          {/* PARTE IZQUIERDA: Imagen de Franquicias */}
          <div className="franquicias-img" style={{ 
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
            {/* Título Franquicias */}
            <img src="/franq/Franquicias.png" alt="Franquicias" style={{ 
              width: '280px', 
              marginBottom: '40px', 
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
              zIndex: 3
            }} />
            
            {/* Imagen de fondo */}
            <img src="/franq/sucursal.png" alt="Sucursal Mi Gusto" style={{ 
              width: '100%', 
              height: 'auto',
              maxHeight: 'calc(100vh - 200px)',
              objectFit: 'cover',
              borderRadius: '12px', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              zIndex: 2,
              marginBottom: '32px'
            }} />
            
                        {/* Bloque de texto explicativo */}
            <div style={{
              textAlign: 'left',
              zIndex: 3,
              padding: '20px'
            }}>
              <div style={{ fontWeight: 700, fontSize: '1.8rem', marginBottom: '24px', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                ¿Por qué elegir Mi Gusto?
              </div>
              <div style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#ffffff', whiteSpace: 'pre-line', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
Porque llevamos más de 25 años en el mercado y sabemos cómo
hacer que un negocio funcione. Tenemos un modelo probado,
pensado para vender en volumen y con procesos simples de 
operar.

Invertimos en tecnología, tenemos app propia y presencia en 
todas las plataformas de delivery.

Ofrecemos una amplia variedad de productos y un sistema de
atención 360 que acompaña cada punto de venta.

Si buscás una marca con experiencia real, respaldo y potencial de
crecimiento, este es el momento de sumarte.
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
            marginTop: '150px' 
          }}>
            <div className="contacto-content" style={{ 
              width: '100%', 
              marginTop: (typeof window !== 'undefined' && window.innerWidth > 900) ? '-40px' : '0' 
            }}>
              <div className="contacto-form-container" style={{ 
                background: 'rgba(30, 30, 30, 0.65)', 
                backdropFilter: 'blur(5px)'
              }}>
                <p style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '24px' }}>Completa el siguiente formulario si estás interesado en abrir una franquicia de Mi Gusto.</p>
                <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '1.1rem', color: '#ffc107' }}>
                  Paso {currentStep} de 3
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${progressBarWidth}%` }}></div>
                </div>
                
                <form className="contacto-form" onSubmit={handleSubmit}>
                  {/* Estilos personalizados para react-datepicker */}
                  <style>{`
                    .datepicker-match {
                      width: 100% !important;
                      min-width: 100% !important;
                      max-width: 100% !important;
                      box-sizing: border-box !important;
                      height: auto !important;
                      padding: 15px !important;
                      border: 1px solid rgba(255, 255, 255, 0.2) !important;
                      border-radius: 5px !important;
                      font-size: 1rem !important;
                      background-color: rgba(255, 255, 255, 0.1) !important;
                      color: #f8f9fa !important;
                      transition: all 0.3s ease !important;
                      display: block !important;
                    }
                    
                    .form-group.half-width .datepicker-match {
                      width: 100% !important;
                      min-width: 100% !important;
                      max-width: 100% !important;
                      display: block !important;
                    }
                    
                    .datepicker-match:focus {
                      outline: none !important;
                      border-color: #ffc107 !important;
                      box-shadow: 0 0 12px rgba(255, 193, 7, 0.6) !important;
                      background-color: rgba(255, 255, 255, 0.2) !important;
                    }
                    
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
                    .react-datepicker__triangle {
                      display: none !important;
                    }
                    .react-datepicker__navigation {
                      top: 12px !important;
                    }
                    .react-datepicker__navigation-icon::before {
                      border-color: #ffc107 !important;
                    }
                    .react-datepicker__month-dropdown, .react-datepicker__year-dropdown {
                      background: #181818 !important;
                      color: #fff !important;
                    }
                    .react-datepicker__month-option, .react-datepicker__year-option {
                      color: #fff !important;
                    }
                    .react-datepicker__month-option--selected, .react-datepicker__year-option--selected {
                      background: #ffc107 !important;
                      color: #222 !important;
                    }
                    .datepicker-match::placeholder {
                      color: #bbb !important;
                      opacity: 1 !important;
                      font-style: normal !important;
                    }
                  `}</style>

                  {currentStep === 1 && (
                    <div className="form-step">
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label htmlFor="nombre">Nombre completo: <span className="required">*</span></label>
                          {errors.nombre && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.nombre}</div>}
                          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ingrese su nombre completo" />
                        </div>
                        <div className="form-group half-width">
                          <label htmlFor="fechaNacimiento">Fecha de Nacimiento: <span className="required">*</span></label>
                          {errors.fechaNacimiento && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.fechaNacimiento}</div>}
                          <input
                            type="text"
                            id="fechaNacimiento"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleInputChange}
                            onClick={() => setCalendarOpen(true)}
                            required
                            placeholder="dd/mm/aaaa"
                            className="contacto-form input"
                            readOnly
                          />
                          <DatePicker
                            selected={formData.fechaNacimiento ? new Date(formData.fechaNacimiento.split('/').reverse().join('-')) : null}
                            onChange={(date, event) => {
                              handleDateChange(date, event);
                              setCalendarOpen(false);
                            }}
                            dateFormat="dd/MM/yy"
                            placeholderText="dd/mm/aaaa"
                            customInput={<input style={{ display: 'none' }} />}
                            id="fechaNacimiento-hidden"
                            name="fechaNacimiento-hidden"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            maxDate={new Date()}
                            onClickOutside={() => setCalendarOpen(false)}
                            shouldCloseOnSelect={true}
                            open={calendarOpen}
                            ref={datePickerRef}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label htmlFor="sexo">Sexo: <span className="required">*</span></label>
                          {errors.sexo && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.sexo}</div>}
                          <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required className="contacto-form select select-match-input">
                            <option value="">Selecciona</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                          </select>
                        </div>
                        <div className="form-group half-width">
                          <label htmlFor="estadoCivil">Estado Civil: <span className="required">*</span></label>
                          {errors.estadoCivil && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.estadoCivil}</div>}
                          <select id="estadoCivil" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} required className="contacto-form select select-match-input">
                            <option value="">Selecciona</option>
                            <option value="soltero">Soltero/a</option>
                            <option value="casado">Casado/a</option>
                            <option value="divorciado">Divorciado/a</option>
                            <option value="viudo">Viudo/a</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label htmlFor="tipoDocumento">Tipo de Documento: <span className="required">*</span></label>
                          {errors.tipoDocumento && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.tipoDocumento}</div>}
                          <select id="tipoDocumento" name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} required className="contacto-form select select-match-input">
                            <option value="">Selecciona</option>
                            <option value="DNI">DNI</option>
                            <option value="LC">LC</option>
                            <option value="LE">LE</option>
                          </select>
                        </div>
                        <div className="form-group half-width">
                          <label htmlFor="numeroDocumento">Número de Documento: <span className="required">*</span></label>
                          {errors.numeroDocumento && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.numeroDocumento}</div>}
                          <input type="text" id="numeroDocumento" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} required placeholder="Ingrese su número de documento" />
                        </div>
                      </div>
                      <div className="form-buttons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                        <button type="button" className="btn-ver-mas" onClick={nextStep} style={{ margin: '0 5px' }} disabled={isSubmitting}>Siguiente</button>
                        <button type="button" className="btn-ver-mas" onClick={() => alert('Cancelado')} style={{ margin: '0 5px' }} disabled={isSubmitting}>Cancelar</button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="form-step">
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label htmlFor="paisResidencia">País de Residencia: <span className="required">*</span></label>
                          {errors.paisResidencia && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.paisResidencia}</div>}
                          <select id="paisResidencia" name="paisResidencia" value={formData.paisResidencia} onChange={handleChange} required className="contacto-form select select-match-input">
                            <option value="">Selecciona</option>
                            <option value="argentina">Argentina</option>
                            <option value="otros">Otros</option>
                          </select>
                        </div>
                        <div className="form-group half-width">
                          <label htmlFor="provinciaResidencia">Provincia de Residencia: <span className="required">*</span></label>
                          {errors.provinciaResidencia && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.provinciaResidencia}</div>}
                          <input type="text" id="provinciaResidencia" name="provinciaResidencia" value={formData.provinciaResidencia} onChange={handleChange} required placeholder="Ingrese su provincia" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label htmlFor="localidadResidencia">Localidad de Residencia: <span className="required">*</span></label>
                          {errors.localidadResidencia && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.localidadResidencia}</div>}
                          <input type="text" id="localidadResidencia" name="localidadResidencia" value={formData.localidadResidencia} onChange={handleChange} required placeholder="Ingrese su localidad" />
                        </div>
                        <div className="form-group half-width">
                          <label htmlFor="domicilio">Domicilio: <span className="required">*</span></label>
                          {errors.domicilio && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.domicilio}</div>}
                          <input type="text" id="domicilio" name="domicilio" value={formData.domicilio} onChange={handleChange} required placeholder="Ingrese su domicilio completo" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label htmlFor="telefonoCelular">Teléfono Celular: <span className="required">*</span></label>
                          {errors.telefonoCelular && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.telefonoCelular}</div>}
                          <input type="tel" id="telefonoCelular" name="telefonoCelular" value={formData.telefonoCelular} onChange={handleChange} required placeholder="+54 9 11 1234-5678" />
                        </div>
                        <div className="form-group half-width">
                          <label htmlFor="telefonoAlternativo">Teléfono Alternativo:</label>
                          <input type="tel" id="telefonoAlternativo" name="telefonoAlternativo" value={formData.telefonoAlternativo} onChange={handleChange} placeholder="+54 9 11 1234-5678" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label htmlFor="email">E-mail: <span className="required">*</span></label>
                          {errors.email && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.email}</div>}
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="ejemplo@email.com" />
                        </div>
                        <div className="form-group half-width">
                          <label htmlFor="emailAlternativo">E-mail Alternativo:</label>
                          <input type="email" id="emailAlternativo" name="emailAlternativo" value={formData.emailAlternativo} onChange={handleChange} placeholder="ejemplo@email.com" />
                        </div>
                      </div>
                      <div className="form-buttons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                        <button type="button" className="btn-ver-mas" onClick={nextStep} style={{ margin: '0 5px' }} disabled={isSubmitting}>Siguiente</button>
                        <button type="button" className="btn-ver-mas" onClick={prevStep} style={{ margin: '0 5px' }} disabled={isSubmitting}>Volver</button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="form-step">
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label htmlFor="paisPreferencia">País de Preferencia: <span className="required">*</span></label>
                          {errors.paisPreferencia && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.paisPreferencia}</div>}
                          <select id="paisPreferencia" name="paisPreferencia" value={formData.paisPreferencia} onChange={handleChange} required className="contacto-form select select-match-input">
                            <option value="">Selecciona</option>
                            <option value="argentina">Argentina</option>
                            <option value="otros">Otros</option>
                          </select>
                        </div>
                        <div className="form-group half-width">
                          <label htmlFor="provinciaPreferencia">Provincia de Preferencia: <span className="required">*</span></label>
                          {errors.provinciaPreferencia && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.provinciaPreferencia}</div>}
                          <input type="text" id="provinciaPreferencia" name="provinciaPreferencia" value={formData.provinciaPreferencia} onChange={handleChange} required placeholder="Ingrese la provincia de preferencia" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label htmlFor="localidadPreferencia">Localidad de Preferencia: <span className="required">*</span></label>
                          {errors.localidadPreferencia && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.localidadPreferencia}</div>}
                          <input type="text" id="localidadPreferencia" name="localidadPreferencia" value={formData.localidadPreferencia} onChange={handleChange} required placeholder="Ingrese la localidad de preferencia" />
                        </div>
                        <div className="form-group half-width">
                          <label htmlFor="inmuebleGarantia">¿Dispone de Inmueble para Garantía?: <span className="required">*</span></label>
                          {errors.inmuebleGarantia && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.inmuebleGarantia}</div>}
                          <select id="inmuebleGarantia" name="inmuebleGarantia" value={formData.inmuebleGarantia} onChange={handleChange} required className="contacto-form select select-match-input">
                            <option value="">Selecciona</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-buttons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                        <button type="submit" className="btn-ver-mas" style={{ margin: '0 5px' }} disabled={isSubmitting}>Finalizar</button>
                        <button type="button" className="btn-ver-mas" onClick={prevStep} style={{ margin: '0 5px' }} disabled={isSubmitting}>Volver</button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franquicias;

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