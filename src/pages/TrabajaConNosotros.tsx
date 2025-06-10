import React, { useState } from 'react';
import '../pages/Contacto.css';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import axios from 'axios';

const sucursalesList = [
  'Ballester',
  'Balvanera',
  'Barrancas de Belgrano',
  'Belgrano',
  'Bella Vista',
  'Campana',
  'Del Viso',
  'Devoto',
  'Don Torcuato',
  'Escobar',
  'Floresta',
  'Florida',
  'Gral. Pacheco',
  'Hurlingham',
  'Ituzaingó',
  'José C. Paz',
  'Los Polvorines',
  'Martínez',
  'Maschwitz',
  'Mataderos',
  'Merlo',
  'Moreno',
  'Muñiz',
  'Munro',
  'Palermo',
  'Paternal',
  'Pilar Centro',
  'Pilar Cruce Derqui',
  'Puerto Madero',
  'San Fernando',
  'San Martín',
  'San Miguel',
  'Tigre',
  'Tortugas Norte',
  'Villa Adelina',
  'Villa Crespo',
  'Villa Urquiza'
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, cv: file });
    } else {
      setFormData({ ...formData, cv: null });
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
      setFormData({ ...formData, cv: file });
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, cv: null });
    const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.cv) {
      setError('Por favor, adjunta tu CV.');
      Swal.fire({
        icon: 'warning',
        title: 'CV Requerido',
        text: 'Por favor, adjunta tu CV para completar la postulación.',
        confirmButtonColor: '#d4af37',
      });
      setIsSubmitting(false);
      return; // Detener el envío si no hay CV
    }

    try {
      let cvUrl = '';
      if (formData.cv) {
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append('file', formData.cv);
        cloudinaryFormData.append('upload_preset', 'mi_gusto_cv_upload');
        cloudinaryFormData.append('cloud_name', 'dgg3bmvoi');

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dgg3bmvoi/raw/upload`,
          cloudinaryFormData
        );
        cvUrl = res.data.secure_url;
      }

      await emailjs.send(
        'service_vroveb8',
        'template_rx2wmet',
        {
          name: `${formData.nombre} ${formData.apellido}`,
          email: formData.email,
          message: `
            Nueva postulación recibida:

            Nombre completo: ${formData.nombre} ${formData.apellido}
            Teléfono: ${formData.telefono}
            Email: ${formData.email}
            Puesto: ${formData.puesto}
            ${formData.area ? `Área: ${formData.area}` : ''}
            ${formData.sucursal ? `Sucursal: ${formData.sucursal}` : ''}
            CV adjunto: ${cvUrl || 'No se adjuntó CV'}
          `,
        },
        '2muZYDfZaoXaOzlBc'
      );

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Tu postulación ha sido enviada correctamente.',
        confirmButtonColor: '#d4af37',
      });
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
      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
      if (axios.isAxiosError(err) && err.response) {
        console.error('Respuesta de Cloudinary/EmailJS:', err.response.data.error);
      }
      setError('Hubo un error al enviar tu postulación. Por favor, inténtalo de nuevo.');
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Hubo un error al enviar tu postulación. Por favor, inténtalo de nuevo.',
        confirmButtonColor: '#d4af37',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sucursales-section">
      <div className="background-overlay"></div>
      <div className="sucursales-container">
        <div className="contacto-container">
          <div className="contacto-content">
            <div className="contacto-form-container">
              <h2>Trabajá con nosotros</h2>
              <p style={{ textAlign: 'center' }}>Completa el siguiente formulario si estás interesado en formar parte de nuestro equipo.</p>
              <form className="contacto-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="nombre">Nombre: <span className="required">*</span></label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Ingrese su nombre"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="apellido">Apellido: <span className="required">*</span></label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                      placeholder="Ingrese su apellido"
                    />
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
                    />
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
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="puesto">Puesto: <span className="required">*</span></label>
                    <select
                      id="puesto"
                      name="puesto"
                      value={formData.puesto}
                      onChange={handleChange}
                      required
                      className="contacto-form select"
                    >
                      <option value="">Selecciona un puesto</option>
                      <option value="fabrica">Fábrica</option>
                      <option value="sucursales">Sucursales</option>
                    </select>
                  </div>
                  {formData.puesto === 'fabrica' && (
                    <div className="form-group half-width">
                      <label htmlFor="area">Área: <span className="required">*</span></label>
                      <select
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        className="contacto-form select"
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
                      <label htmlFor="sucursal">Sucursal: <span className="required">*</span></label>
                      <select
                        id="sucursal"
                        name="sucursal"
                        value={formData.sucursal}
                        onChange={handleChange}
                        required
                        className="contacto-form select"
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
                  <label htmlFor="cv-upload">Adjuntar CV: <span className="required">*</span></label>
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

                <button type="submit" className="btn-ver-mas" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Postularse'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrabajaConNosotros; 