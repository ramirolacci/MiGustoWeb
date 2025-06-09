import React, { useState, useCallback } from 'react';
import './Contacto.css';
import { sucursales } from '../data/sucursalesData';

const TrabajaConNosotros: React.FC = () => {
  const [puestoSeleccionado, setPuestoSeleccionado] = useState('');
  const [areaSeleccionada, setAreaSeleccionada] = useState('');
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const areasFabrica = [
    { id: 'administracion', nombre: 'Administración' },
    { id: 'produccion', nombre: 'Producción' },
    { id: 'logistica', nombre: 'Logística' }
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setArchivoSeleccionado(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoSeleccionado(file);
    }
  }, []);

  return (
    <div className="sucursales-section">
      <div className="background-overlay"></div>
      <div className="sucursales-container">
        <div className="contacto-container">
          <div className="contacto-header">
            <h1>Trabajá con nosotros</h1>
            <p>Completá el formulario y forma parte de nuestro equipo.</p>
          </div>
          <div className="contacto-content">
            <div className="contacto-form-container">
              <h2>Envianos tu CV</h2>
              <form className="contacto-form">
                <div className="step-content">
                  <div className="form-row">
                    <div className="form-group half-width">
                      <label htmlFor="nombreCompleto">Nombre:<span className="required">*</span></label>
                      <input
                        type="text"
                        id="nombreCompleto"
                        name="nombreCompleto"
                        placeholder="Ingresá tu nombre completo"
                        required
                      />
                    </div>
                    <div className="form-group half-width">
                      <label htmlFor="apellido">Apellido:<span className="required">*</span></label>
                      <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        placeholder="Ingresá tu apellido"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group half-width">
                      <label htmlFor="telefono">Teléfono:<span className="required">*</span></label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        placeholder="Ingresá tu teléfono"
                        required
                      />
                    </div>
                    <div className="form-group half-width">
                      <label htmlFor="email">E-mail:<span className="required">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresá tu e-mail"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group half-width">
                      <label htmlFor="puesto">Puesto:<span className="required">*</span></label>
                      <select
                        id="puesto"
                        name="puesto"
                        value={puestoSeleccionado}
                        onChange={(e) => {
                          setPuestoSeleccionado(e.target.value);
                          setAreaSeleccionada('');
                          setSucursalSeleccionada('');
                        }}
                        required
                      >
                        <option value="">Seleccioná un puesto</option>
                        <option value="fabrica">Fábrica</option>
                        <option value="sucursales">Sucursales</option>
                      </select>
                    </div>
                    <div className="form-group half-width">
                      {puestoSeleccionado === 'fabrica' && (
                        <>
                          <label htmlFor="area">Área:<span className="required">*</span></label>
                          <select
                            id="area"
                            name="area"
                            value={areaSeleccionada}
                            onChange={(e) => setAreaSeleccionada(e.target.value)}
                            required
                          >
                            <option value="">Seleccioná un área</option>
                            {areasFabrica.map((area) => (
                              <option key={area.id} value={area.id}>
                                {area.nombre}
                              </option>
                            ))}
                          </select>
                        </>
                      )}

                      {puestoSeleccionado === 'sucursales' && (
                        <>
                          <label htmlFor="sucursal">Sucursal:<span className="required">*</span></label>
                          <select
                            id="sucursal"
                            name="sucursal"
                            value={sucursalSeleccionada}
                            onChange={(e) => setSucursalSeleccionada(e.target.value)}
                            required
                          >
                            <option value="">Seleccioná una sucursal</option>
                            {sucursales.map((sucursal) => (
                              <option key={sucursal.nombre} value={sucursal.nombre}>
                                {sucursal.nombre}
                              </option>
                            ))}
                          </select>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cv">CV:<span className="required">*</span></label>
                    <div 
                      className={`file-drop-zone ${isDragging ? 'dragging' : ''} ${archivoSeleccionado ? 'has-file' : ''}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        id="cv"
                        name="cv"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="file-input"
                        required
                      />
                      <div className="file-drop-content">
                        {archivoSeleccionado ? (
                          <>
                            <i className="fas fa-file-alt"></i>
                            <p>{archivoSeleccionado.name}</p>
                            <button 
                              type="button" 
                              className="remove-file"
                              onClick={() => setArchivoSeleccionado(null)}
                            >
                              Eliminar
                            </button>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-cloud-upload-alt"></i>
                            <p>Arrastrá tu CV aquí o hacé clic para seleccionar</p>
                            <p className="file-types">Formatos aceptados: PDF, DOC, DOCX</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn-ver-mas">
                    Postularse
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrabajaConNosotros; 