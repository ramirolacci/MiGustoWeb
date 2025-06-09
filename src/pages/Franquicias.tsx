import React, { useState } from 'react';
import './Contacto.css';

const Franquicias: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
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
    disponeInmueble: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario enviado!');
    console.log(formData);
    // Aquí puedes manejar el envío final del formulario
  };

  const handleCancel = () => {
    alert('Formulario cancelado.');
    // Aquí puedes resetear el formulario o redirigir
    setStep(1);
    setFormData({
      nombreCompleto: '',
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
      disponeInmueble: '',
    });
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="sucursales-section">
      <div className="background-overlay"></div>
      <div className="sucursales-container">
        <div className="contacto-container">
          <div className="contacto-header">
            <h1>Franquicias</h1>
            <p>Completá el formulario para obtener más información sobre nuestras oportunidades de franquicia.</p>
          </div>
          <div className="contacto-content">
            <div className="contacto-form-container">
              <h2>Solicitá Información</h2>

              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="step-indicator">
                Paso {step} de 3
              </div>

              <form className="contacto-form" onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="step-content">
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label htmlFor="nombreCompleto">Nombre completo:<span className="required">*</span></label>
                        <input
                          type="text"
                          id="nombreCompleto"
                          name="nombreCompleto"
                          placeholder="Ingresá tu nombre completo"
                          value={formData.nombreCompleto}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group half-width">
                        <label htmlFor="fechaNacimiento">Fecha de nacimiento:<span className="required">*</span></label>
                        <input
                          type="date"
                          id="fechaNacimiento"
                          name="fechaNacimiento"
                          value={formData.fechaNacimiento}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label htmlFor="sexo">Sexo:<span className="required">*</span></label>
                        <select
                          id="sexo"
                          name="sexo"
                          value={formData.sexo}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccioná</option>
                          <option value="masculino">Masculino</option>
                          <option value="femenino">Femenino</option>
                        </select>
                      </div>
                      <div className="form-group half-width">
                        <label htmlFor="estadoCivil">Estado civil:<span className="required">*</span></label>
                        <select
                          id="estadoCivil"
                          name="estadoCivil"
                          value={formData.estadoCivil}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccioná</option>
                          <option value="soltero">Soltero/a</option>
                          <option value="casado">Casado/a</option>
                          <option value="divorciado">Divorciado/a</option>
                          <option value="viudo">Viudo/a</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label htmlFor="tipoDocumento">Tipo de documento:<span className="required">*</span></label>
                        <select
                          id="tipoDocumento"
                          name="tipoDocumento"
                          value={formData.tipoDocumento}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccioná</option>
                          <option value="dni">DNI</option>
                          <option value="pasaporte">Pasaporte</option>
                          <option value="le">LE</option>
                          <option value="lc">LC</option>
                          <option value="cedula">Cédula</option>
                        </select>
                      </div>
                      <div className="form-group half-width">
                        <label htmlFor="numeroDocumento">Número de documento:<span className="required">*</span></label>
                        <input
                          type="text"
                          id="numeroDocumento"
                          name="numeroDocumento"
                          placeholder="Ingresá el número de documento"
                          value={formData.numeroDocumento}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-buttons">
                      <button type="button" className="btn-ver-mas" onClick={handleNext}>Continuar</button>
                      <button type="button" className="btn-ver-mas" onClick={handleCancel}>Cancelar</button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="step-content">
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label htmlFor="paisResidencia">País de residencia:<span className="required">*</span></label>
                        <select
                          id="paisResidencia"
                          name="paisResidencia"
                          value={formData.paisResidencia}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccioná</option>
                          <option value="argentina">Argentina</option>
                          <option value="chile">Chile</option>
                          <option value="paraguay">Paraguay</option>
                          <option value="uruguay">Uruguay</option>
                          <option value="bolivia">Bolivia</option>
                          <option value="otros">Otros</option>
                        </select>
                      </div>
                      <div className="form-group half-width">
                        <label htmlFor="provinciaResidencia">Provincia de residencia:<span className="required">*</span></label>
                        <input
                          type="text"
                          id="provinciaResidencia"
                          name="provinciaResidencia"
                          placeholder="Ingresá tu provincia de residencia"
                          value={formData.provinciaResidencia}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label htmlFor="localidadResidencia">Localidad de residencia:<span className="required">*</span></label>
                        <input
                          type="text"
                          id="localidadResidencia"
                          name="localidadResidencia"
                          placeholder="Ingresá tu localidad de residencia"
                          value={formData.localidadResidencia}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group half-width">
                        <label htmlFor="domicilio">Domicilio:<span className="required">*</span></label>
                        <input
                          type="text"
                          id="domicilio"
                          name="domicilio"
                          placeholder="Ingresá tu domicilio"
                          value={formData.domicilio}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label htmlFor="telefonoCelular">Teléfono celular:<span className="required">*</span></label>
                        <input
                          type="tel"
                          id="telefonoCelular"
                          name="telefonoCelular"
                          placeholder="Ingresá tu teléfono celular"
                          value={formData.telefonoCelular}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group half-width">
                        <label htmlFor="telefonoAlternativo">Teléfono alternativo:</label>
                        <input
                          type="tel"
                          id="telefonoAlternativo"
                          name="telefonoAlternativo"
                          placeholder="Ingresá un teléfono alternativo"
                          value={formData.telefonoAlternativo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label htmlFor="email">E-mail:<span className="required">*</span></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Ingresá tu e-mail"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group half-width">
                        <label htmlFor="emailAlternativo">E-mail alternativo:</label>
                        <input
                          type="email"
                          id="emailAlternativo"
                          name="emailAlternativo"
                          placeholder="Ingresá un e-mail alternativo"
                          value={formData.emailAlternativo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-buttons">
                      <button type="button" className="btn-ver-mas" onClick={handleNext}>Continuar</button>
                      <button type="button" className="btn-ver-mas" onClick={handleBack}>Volver</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="step-content">
                    <div className="form-group">
                      <label htmlFor="paisPreferencia">País de preferencia:<span className="required">*</span></label>
                      <select
                        id="paisPreferencia"
                        name="paisPreferencia"
                        value={formData.paisPreferencia}
                        onChange={handleChange}
                        required
                      >
                        {/* Aquí puedes mostrar las opciones de país de residencia */}
                        {formData.paisResidencia && (
                          <option value={formData.paisResidencia}>
                            {formData.paisResidencia.charAt(0).toUpperCase() + formData.paisResidencia.slice(1)}
                          </option>
                        )}
                        {!formData.paisResidencia && (
                          <option value="">Seleccioná un país</option>
                        )}
                        <option value="argentina">Argentina</option>
                        <option value="chile">Chile</option>
                        <option value="paraguay">Paraguay</option>
                        <option value="uruguay">Uruguay</option>
                        <option value="bolivia">Bolivia</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="provinciaPreferencia">Provincia de preferencia:<span className="required">*</span></label>
                      <input
                        type="text"
                        id="provinciaPreferencia"
                        name="provinciaPreferencia"
                        placeholder="Ingresá tu provincia de preferencia"
                        value={formData.provinciaPreferencia}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="localidadPreferencia">Localidad de preferencia:<span className="required">*</span></label>
                      <input
                        type="text"
                        id="localidadPreferencia"
                        name="localidadPreferencia"
                        placeholder="Ingresá tu localidad de preferencia"
                        value={formData.localidadPreferencia}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="disponeInmueble">¿Dispone de inmueble para garantía? Propia o de Terceros. (Libre de Gravámenes).<span className="required">*</span></label>
                      <select
                        id="disponeInmueble"
                        name="disponeInmueble"
                        value={formData.disponeInmueble}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccioná</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="form-buttons">
                      <button type="submit" className="btn-ver-mas">Finalizar</button>
                      <button type="button" className="btn-ver-mas" onClick={handleBack}>Volver</button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franquicias; 