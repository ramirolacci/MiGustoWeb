import React, { useState } from 'react';
import '../pages/Contacto.css';

const sucursalesList = [
  'Sucursal Abasto',
  'Sucursal Belgrano',
  'Sucursal Caballito',
  'Sucursal Centro',
  'Sucursal Palermo',
  'Sucursal Recoleta',
  'Sucursal Flores',
  'Sucursal Colegiales',
  'Sucursal Villa Crespo',
  'Sucursal Almagro',
  'Sucursal Boedo',
  'Sucursal San Telmo',
  'Sucursal La Boca',
  'Sucursal Núñez',
  'Sucursal Saavedra',
  'Sucursal Coghlan',
  'Sucursal Devoto',
  'Sucursal Villa del Parque',
  'Sucursal Agronomía',
  'Sucursal Chacarita',
  'Sucursal Paternal',
  'Sucursal Parque Patricios',
  'Sucursal Barracas',
  'Sucursal Pompeya',
  'Sucursal Liniers',
  'Sucursal Mataderos',
  'Sucursal Lugano',
  'Sucursal Villa Soldati',
  'Sucursal Villa Riachuelo',
  'Sucursal Versalles',
  'Sucursal Monte Castro',
  'Sucursal Floresta',
  'Sucursal Parque Avellaneda',
  'Sucursal Vélez Sarsfield',
  'Sucursal Villa Luro',
  'Sucursal Parque Chacabuco',
  'Sucursal Villa Devoto',
  'Sucursal Villa General Mitre',
];

const TrabajaConNosotros: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    puesto: '',
    area: '',
    sucursal: '',
    cv: null as File | null,
  });

  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFormData(prevData => ({ ...prevData, cv: file }));
      } else {
        alert('Por favor, sube un archivo PDF, DOC o DOCX.');
        e.target.value = ''; // Clear the input
        setFormData(prevData => ({ ...prevData, cv: null }));
      }
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFormData(prevData => ({ ...prevData, cv: file }));
      } else {
        alert('Por favor, sube un archivo PDF, DOC o DOCX.');
        setFormData(prevData => ({ ...prevData, cv: null }));
      }
    }
  };

  const handleRemoveFile = () => {
    setFormData(prevData => ({ ...prevData, cv: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del formulario Trabajá con Nosotros:', formData);
    // Aquí se manejaría el envío de datos, por ejemplo, a una API
    alert('¡Postulación enviada con éxito! Gracias por tu interés.');
    setFormData({
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      puesto: '',
      area: '',
      sucursal: '',
      cv: null,
    });
  };

  return (
    <div className="contacto-container">
      <div className="contacto-header">
        <h1>Trabajá con nosotros</h1>
        <p>¿Querés formar parte de nuestro equipo? Completa el siguiente formulario y envíanos tu CV.</p>
      </div>
      <div className="contacto-content">
        <div className="contacto-form-container">
          <h2>Postulate Aquí</h2>
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group half-width">
                <label htmlFor="nombre">Nombre <span className="required">*</span></label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group half-width">
                <label htmlFor="apellido">Apellido <span className="required">*</span></label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half-width">
                <label htmlFor="telefono">Teléfono <span className="required">*</span></label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group half-width">
                <label htmlFor="email">E-mail <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half-width">
                <label htmlFor="puesto">Puesto al que aspiras <span className="required">*</span></label>
                <select
                  id="puesto"
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un puesto</option>
                  <option value="fabrica">Fábrica</option>
                  <option value="sucursales">Sucursales</option>
                </select>
              </div>
              {formData.puesto === 'fabrica' && (
                <div className="form-group half-width">
                  <label htmlFor="area">Área <span className="required">*</span></label>
                  <select
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un área</option>
                    <option value="administracion">Administración</option>
                    <option value="produccion">Producción</option>
                    <option value="logistica">Logística</option>
                  </select>
                </div>
              )}
              {formData.puesto === 'sucursales' && (
                <div className="form-group half-width">
                  <label htmlFor="sucursal">Sucursal <span className="required">*</span></label>
                  <select
                    id="sucursal"
                    name="sucursal"
                    value={formData.sucursal}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una sucursal</option>
                    {sucursalesList.map((sucursal, index) => (
                      <option key={index} value={sucursal}>
                        {sucursal}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cv">Subir CV <span className="required">*</span></label>
              <div
                className={`file-drop-zone ${dragActive ? 'dragging' : ''} ${formData.cv ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('cv-upload')?.click()}
              >
                <input
                  type="file"
                  id="cv-upload"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  required
                />
                {formData.cv ? (
                  <div className="file-drop-content">
                    <p>{formData.cv.name}</p>
                    <button type="button" className="remove-file" onClick={handleRemoveFile}>X</button>
                  </div>
                ) : (
                  <div className="file-drop-content">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Arrastra y suelta tu CV aquí o haz clic para seleccionar</p>
                    <p className="file-types">(PDF, DOC, DOCX)</p>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn-ver-mas">
              Enviar Postulación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrabajaConNosotros; 