import React, { useState, useRef } from 'react';
import '../pages/Contacto.css';
import emailjs from '@emailjs/browser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Custom input para el datepicker que NO abre el calendario al hacer clic o foco
const CalendarInput = React.forwardRef<HTMLInputElement, any>(({ value, onClick, onChange, placeholder }, ref) => (
  <div style={{ position: 'relative', width: '100%' }}>
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      onChange={onChange}
      placeholder={placeholder}
      className="contacto-form input datepicker-match"
      style={{ paddingRight: '160px' }}
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
    setFormData(prevData => ({ ...prevData, fechaNacimiento: e.target.value }));
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

    const serviceID = 'service_vroveb8'; 
    const templateID = 'template_rx2wmet'; 
    const publicKey = '2muZYDfZaoXaOzlBc'; 

    const templateParams = {
      name: formData.nombre,
      email: formData.email,
      message: `
        Fecha de Nacimiento: ${formData.fechaNacimiento}
        Sexo: ${formData.sexo}
        Estado Civil: ${formData.estadoCivil}
        Tipo de Documento: ${formData.tipoDocumento}
        Número de Documento: ${formData.numeroDocumento}
        País de Residencia: ${formData.paisResidencia}
        Provincia de Residencia: ${formData.provinciaResidencia}
        Localidad de Residencia: ${formData.localidadResidencia}
        Domicilio: ${formData.domicilio}
        Teléfono Celular: ${formData.telefonoCelular}
        Teléfono Alternativo: ${formData.telefonoAlternativo}
        E-mail Alternativo: ${formData.emailAlternativo}
        País de Preferencia: ${formData.paisPreferencia}
        Provincia de Preferencia: ${formData.provinciaPreferencia}
        Localidad de Preferencia: ${formData.localidadPreferencia}
        ¿Dispone de Inmueble para Garantía?: ${formData.inmuebleGarantia}
      `,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
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
          <img src="/franquicia.png" alt="Imagen franquicia" style={{ width: '50vw', height: '100%', maxHeight: '100vh', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 2 }} />
          <div className="contacto-container" style={{ width: '50vw', minHeight: '100vh', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
            <div className="contacto-content" style={{ width: '100%', marginTop: (typeof window !== 'undefined' && window.innerWidth > 900) ? '-40px' : '0' }}>
              <div className="contacto-form-container">
                <h2>Franquicias</h2>
                <p style={{ textAlign: 'center' }}>Completa el siguiente formulario si estás interesado en abrir una franquicia de Mi Gusto.</p>
                <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '1.1rem', color: '#ffc107' }}>
                  Paso {currentStep} de 3
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${progressBarWidth}%` }}></div>
                </div>
                <form className="contacto-form" onSubmit={handleSubmit}>
                  <style>{`
                    .contacto-form .select-match-input {
                      padding: 15px !important;
                      border: 1px solid rgba(255, 255, 255, 0.2) !important;
                      border-radius: 5px !important;
                      font-size: 1rem !important;
                      background-color: rgba(255, 255, 255, 0.1) !important;
                      color: #f8f9fa !important;
                      transition: all 0.3s ease !important;
                      appearance: none !important;
                      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e") !important;
                      background-repeat: no-repeat !important;
                      background-position: right 1.5rem center !important;
                      background-size: 1.5rem !important;
                      cursor: pointer !important;
                      width: 100% !important;
                      min-width: 120px !important;
                      box-sizing: border-box !important;
                    }
                    .contacto-form .select-match-input:focus {
                      outline: none !important;
                      border-color: #ffc107 !important;
                      box-shadow: 0 0 12px rgba(255, 193, 7, 0.6) !important;
                      background-color: rgba(255, 255, 255, 0.2) !important;
                    }
                    .contacto-form .select-match-input option[value=''] {
                      color: rgba(248, 249, 250, 0.6) !important;
                    }
                    .contacto-form .select-match-input option,
                    .contacto-form .select-match-input option:checked,
                    .contacto-form .select-match-input option:focus,
                    .contacto-form .select-match-input option:hover {
                      color: #f8f9fa !important;
                      background-color: #1a1a1a !important;
                    }
                    .form-group.half-width .contacto-form.input {
                      width: 100% !important;
                      min-width: 0 !important;
                      max-width: 100% !important;
                      display: block;
                    }
                    .form-group.half-width .datepicker-match {
                      width: 100% !important;
                      min-width: 0 !important;
                      max-width: 100% !important;
                      display: block !important;
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
                          <div style={{ position: 'relative', width: '100%' }}>
                            <DatePicker
                              selected={formData.fechaNacimiento ? new Date(formData.fechaNacimiento.split('/').reverse().join('-')) : null}
                              onChange={handleDateChange}
                              dateFormat="dd/MM/yy"
                              placeholderText="dd/mm/aa"
                              customInput={<CalendarInput onChange={handleInputChange} />}
                              id="fechaNacimiento"
                              name="fechaNacimiento"
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              maxDate={new Date()}
                              onClickOutside={() => setCalendarOpen(false)}
                              shouldCloseOnSelect={true}
                              ref={datePickerRef}
                            />
                            <span
                              style={{
                                position: 'absolute',
                                right: '15px',
                                top: '35%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                color: 'rgba(248, 249, 250, 0.6)',
                                fontSize: '1.3em',
                                zIndex: 2
                              }}
                              onClick={() => setCalendarOpen(true)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" stroke="rgba(248, 249, 250, 0.6)" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="rgba(248, 249, 250, 0.6)" strokeWidth="2" strokeLinecap="round"/><path d="M3 9h18" stroke="rgba(248, 249, 250, 0.6)" strokeWidth="2"/></svg>
                            </span>
                          </div>
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