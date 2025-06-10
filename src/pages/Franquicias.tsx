import React, { useState } from 'react';
import '../pages/Contacto.css';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del formulario de franquicias:', formData);
    // Aquí se manejaría el envío de datos, por ejemplo, a una API
    alert('¡Formulario de franquicia enviado con éxito! Nos pondremos en contacto pronto.');
    // Reset form after submission
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
  };

  const progressBarWidth = ((currentStep - 1) / 2) * 100;

  return (
    <div className="contacto-container">
      <div className="contacto-header">
        <h1>Franquicias</h1>
        <p>Completa el siguiente formulario para postularte a una franquicia de Mi Gusto.</p>
      </div>
      <div className="contacto-content">
        <div className="contacto-form-container">
          <h2>Postulación de Franquicia</h2>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressBarWidth}%` }}></div>
            <div className="step-indicator" style={{ left: `${progressBarWidth}%` }}>Paso {currentStep} de 3</div>
          </div>
          <form className="contacto-form" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="form-step">
                <h3>Paso 1: Datos Personales</h3>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="nombre">Nombre completo <span className="required">*</span></label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento <span className="required">*</span></label>
                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="sexo">Sexo <span className="required">*</span></label>
                    <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required>
                      <option value="">Selecciona</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="estadoCivil">Estado Civil <span className="required">*</span></label>
                    <select id="estadoCivil" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} required>
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
                    <label htmlFor="tipoDocumento">Tipo de Documento <span className="required">*</span></label>
                    <select id="tipoDocumento" name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} required>
                      <option value="">Selecciona</option>
                      <option value="DNI">DNI</option>
                      <option value="LC">LC</option>
                      <option value="LE">LE</option>
                    </select>
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="numeroDocumento">Número de Documento <span className="required">*</span></label>
                    <input type="text" id="numeroDocumento" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-buttons">
                  <button type="button" className="btn-ver-mas" onClick={nextStep}>Continuar</button>
                  <button type="button" className="btn-ver-mas" onClick={() => alert('Cancelado')}>Cancelar</button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
                <h3>Paso 2: Datos de Contacto y Residencia</h3>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="paisResidencia">País de Residencia <span className="required">*</span></label>
                    <select id="paisResidencia" name="paisResidencia" value={formData.paisResidencia} onChange={handleChange} required>
                      <option value="">Selecciona</option>
                      <option value="argentina">Argentina</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="provinciaResidencia">Provincia de Residencia <span className="required">*</span></label>
                    <input type="text" id="provinciaResidencia" name="provinciaResidencia" value={formData.provinciaResidencia} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="localidadResidencia">Localidad de Residencia <span className="required">*</span></label>
                    <input type="text" id="localidadResidencia" name="localidadResidencia" value={formData.localidadResidencia} onChange={handleChange} required />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="domicilio">Domicilio <span className="required">*</span></label>
                    <input type="text" id="domicilio" name="domicilio" value={formData.domicilio} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="telefonoCelular">Teléfono Celular <span className="required">*</span></label>
                    <input type="tel" id="telefonoCelular" name="telefonoCelular" value={formData.telefonoCelular} onChange={handleChange} required />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="telefonoAlternativo">Teléfono Alternativo</label>
                    <input type="tel" id="telefonoAlternativo" name="telefonoAlternativo" value={formData.telefonoAlternativo} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="email">E-mail <span className="required">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="emailAlternativo">E-mail Alternativo</label>
                    <input type="email" id="emailAlternativo" name="emailAlternativo" value={formData.emailAlternativo} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-buttons">
                  <button type="button" className="btn-ver-mas" onClick={prevStep}>Volver</button>
                  <button type="button" className="btn-ver-mas" onClick={nextStep}>Continuar</button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-step">
                <h3>Paso 3: Preferencias de Franquicia</h3>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="paisPreferencia">País de Preferencia <span className="required">*</span></label>
                    <select id="paisPreferencia" name="paisPreferencia" value={formData.paisPreferencia} onChange={handleChange} required>
                      <option value="">Selecciona</option>
                      <option value="argentina">Argentina</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="provinciaPreferencia">Provincia de Preferencia <span className="required">*</span></label>
                    <input type="text" id="provinciaPreferencia" name="provinciaPreferencia" value={formData.provinciaPreferencia} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="localidadPreferencia">Localidad de Preferencia <span className="required">*</span></label>
                    <input type="text" id="localidadPreferencia" name="localidadPreferencia" value={formData.localidadPreferencia} onChange={handleChange} required />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="inmuebleGarantia">¿Dispone de Inmueble para Garantía? <span className="required">*</span></label>
                    <select id="inmuebleGarantia" name="inmuebleGarantia" value={formData.inmuebleGarantia} onChange={handleChange} required>
                      <option value="">Selecciona</option>
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                <div className="form-buttons">
                  <button type="button" className="btn-ver-mas" onClick={prevStep}>Volver</button>
                  <button type="submit" className="btn-ver-mas">Finalizar</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Franquicias; 