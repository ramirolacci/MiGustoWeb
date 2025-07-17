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
    edad: '',
    localidad: '',
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
  const [errors, setErrors] = useState({
    nombre: '',
    edad: '',
    localidad: '',
    apellido: '',
    telefono: '',
    email: '',
    puesto: '',
    cv: '',
    area: '',
    sucursal: '',
  });

  const localidadesBuenosAires = [
    'Adrogué', 'Almirante Brown', 'Avellaneda', 'Bahía Blanca', 'Balcarce', 'Baradero', 'Berazategui', 'Berisso', 'Bolívar', 'Bragado', 'Campana', 'Cañuelas', 'Capitán Sarmiento', 'Carlos Casares', 'Carlos Tejedor', 'Carmen de Areco', 'Castelli', 'Chacabuco', 'Chascomús', 'Chivilcoy', 'Colón', 'Coronel Dorrego', 'Coronel Pringles', 'Coronel Suárez', 'Daireaux', 'Dolores', 'Ensenada', 'Escobar', 'Esteban Echeverría', 'Exaltación de la Cruz', 'Ezeiza', 'Florencio Varela', 'Florentino Ameghino', 'General Alvarado', 'General Alvear', 'General Arenales', 'General Belgrano', 'General Guido', 'General Juan Madariaga', 'General La Madrid', 'General Las Heras', 'General Lavalle', 'General Paz', 'General Pinto', 'General Pueyrredón', 'General Rodríguez', 'General San Martín', 'General Viamonte', 'General Villegas', 'Guaminí', 'Hipólito Yrigoyen', 'Hurlingham', 'Ituzaingó', 'José C. Paz', 'Junín', 'La Matanza', 'La Plata', 'Lanús', 'Laprida', 'Las Flores', 'Leandro N. Alem', 'Lincoln', 'Lobería', 'Lobos', 'Lomas de Zamora', 'Luján', 'Magdalena', 'Maipú', 'Malvinas Argentinas', 'Mar Chiquita', 'Marcos Paz', 'Mercedes', 'Merlo', 'Monte', 'Monte Hermoso', 'Moreno', 'Morón', 'Navarro', 'Necochea', 'Olavarría', 'Patagones', 'Pehuajó', 'Pellegrini', 'Pergamino', 'Pila', 'Pilar', 'Pinamar', 'Presidente Perón', 'Puán', 'Punta Indio', 'Quilmes', 'Ramallo', 'Rauch', 'Rivadavia', 'Rojas', 'Roque Pérez', 'Saavedra', 'Saladillo', 'Salliqueló', 'Salto', 'San Andrés de Giles', 'San Antonio de Areco', 'San Cayetano', 'San Fernando', 'San Isidro', 'San Miguel', 'San Nicolás', 'San Pedro', 'San Vicente', 'Suipacha', 'Tandil', 'Tapalqué', 'Tigre', 'Tordillo', 'Tornquist', 'Trenque Lauquen', 'Tres Arroyos', 'Tres de Febrero', 'Tres Lomas', 'Vicente López', 'Villa Gesell', 'Villarino', 'Zárate'
  ];

  const validate = () => {
    const newErrors: any = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.edad.trim()) newErrors.edad = 'La edad es obligatoria.';
    else if (!/^\d+$/.test(formData.edad) || parseInt(formData.edad) < 16 || parseInt(formData.edad) > 99) newErrors.edad = 'Ingrese una edad válida (16-99).';
    if (!formData.localidad.trim()) newErrors.localidad = 'La localidad es obligatoria.';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio.';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio.';
    else if (!/^[\d\s\-\+\(\)]+$/.test(formData.telefono)) newErrors.telefono = 'El formato del teléfono no es válido.';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'El formato del email no es válido.';
    if (!formData.puesto.trim()) newErrors.puesto = 'El puesto es obligatorio.';
    if (!formData.cv) newErrors.cv = 'El CV es obligatorio.';
    if (formData.puesto === 'fabrica' && !formData.area.trim()) newErrors.area = 'El área es obligatoria.';
    if (formData.puesto === 'sucursales' && !formData.sucursal.trim()) newErrors.sucursal = 'La sucursal es obligatoria.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
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
    if (!validate()) return;
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
      return;
    }

    try {
      const data = new FormData();
      data.append('nombre', formData.nombre);
      data.append('edad', formData.edad);
      data.append('localidad', formData.localidad);
      data.append('apellido', formData.apellido);
      data.append('telefono', formData.telefono);
      data.append('email', formData.email);
      data.append('puesto', formData.puesto);
      if (formData.area) data.append('area', formData.area);
      if (formData.cv) data.append('cv', formData.cv);

      // Si tienes campos extra como area o sucursal, puedes agregarlos aquí si el backend los acepta
      // data.append('area', formData.area);
      // data.append('sucursal', formData.sucursal);

      await axios.post('/api/mail/trabaja', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Tu postulación ha sido enviada correctamente.',
        confirmButtonColor: '#d4af37',
      });
      setFormData({
        nombre: '',
        edad: '',
        localidad: '',
        apellido: '',
        telefono: '',
        email: '',
        puesto: '',
        area: '',
        sucursal: '',
        cv: null,
      });
      setErrors({
        nombre: '',
        edad: '',
        localidad: '',
        apellido: '',
        telefono: '',
        email: '',
        puesto: '',
        cv: '',
        area: '',
        sucursal: '',
      });
    } catch (err: any) {
      setError('Hubo un error al enviar la postulación. Intenta nuevamente.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al enviar la postulación. Intenta nuevamente.',
        confirmButtonColor: '#d4af37',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sucursales-section" style={{ marginTop: '40px' }}>
      <div className="background-overlay"></div>
      <div className="sucursales-container">
        <div className="responsive-row" style={{ display: 'flex', flexDirection: 'row', width: '100vw', minHeight: '100vh', alignItems: 'stretch' }}>
          <img src="/staff.png" alt="Imagen staff" style={{ width: '50vw', height: '100%', maxHeight: '100vh', objectFit: 'cover', display: 'block', marginTop: '80px', position: 'relative', zIndex: 2 }} />
          <div className="contacto-container" style={{ width: '50vw', minHeight: '100vh', display: 'flex', alignItems: 'stretch', justifyContent: 'center', marginTop: '100px' }}>
            <div className="contacto-content" style={{ width: '100%', marginTop: (typeof window !== 'undefined' && window.innerWidth > 900) ? '-40px' : '0' }}>
              <div className="contacto-form-container" style={{ background: 'rgba(30, 30, 30, 0.65)', backdropFilter: 'blur(5px)' }}>
                <h2>Trabajá con nosotros</h2>
                <p style={{ textAlign: 'center' }}>Completa el siguiente formulario si estás interesado en formar parte de nuestro equipo.</p>
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
                      min-width: 300px !important;
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
                    .contacto-form .select-match-input option {
                      white-space: nowrap !important;
                      overflow: hidden !important;
                      text-overflow: ellipsis !important;
                      max-width: 100%;
                    }
                    .contacto-form .select-match-input option:hover {
                      white-space: normal !important;
                      overflow: visible !important;
                    }
                    .contacto-form .select-match-input option,
                    .contacto-form .select-match-input option:checked,
                    .contacto-form .select-match-input option:focus,
                    .contacto-form .select-match-input option:hover {
                      color: #f8f9fa !important;
                      background-color: #1a1a1a !important;
                    }
                  `}</style>
                  <div className="form-row">
                    <div className="form-group half-width">
                      <label htmlFor="nombre">Nombre: <span className="required">*</span></label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre"
                      />
                      {errors.nombre && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.nombre}</div>}
                    </div>
                    <div className="form-group half-width">
                      <label htmlFor="apellido">Apellido: <span className="required">*</span></label>
                      <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        placeholder="Ingrese su apellido"
                      />
                      {errors.apellido && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.apellido}</div>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group half-width">
                      <label htmlFor="edad">Edad: <span className="required">*</span></label>
                      <input
                        type="number"
                        id="edad"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        placeholder="Ingrese su edad"
                        min="16"
                        max="99"
                      />
                      {errors.edad && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.edad}</div>}
                    </div>
                    <div className="form-group half-width">
                      <label htmlFor="localidad">Localidad: <span className="required">*</span></label>
                      <select
                        id="localidad"
                        name="localidad"
                        value={formData.localidad}
                        onChange={handleChange}
                        className="contacto-form select select-match-input"
                      >
                        <option value="">Selecciona una localidad</option>
                        {localidadesBuenosAires.map((loc, idx) => (
                          <option key={idx} value={loc}>{loc}</option>
                        ))}
                      </select>
                      {errors.localidad && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.localidad}</div>}
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
                        placeholder="+54 9 11 1234-5678"
                      />
                      {errors.telefono && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.telefono}</div>}
                    </div>
                    <div className="form-group half-width">
                      <label htmlFor="email">E-mail: <span className="required">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                      />
                      {errors.email && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.email}</div>}
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
                        className="contacto-form select select-match-input"
                      >
                        <option value="">Selecciona un puesto</option>
                        <option value="fabrica">Fábrica</option>
                        <option value="sucursales">Sucursales</option>
                      </select>
                      {errors.puesto && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.puesto}</div>}
                    </div>
                    {formData.puesto === 'fabrica' && (
                      <div className="form-group half-width">
                        <label htmlFor="area">Área: <span className="required">*</span></label>
                        <select
                          id="area"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          className="contacto-form select select-match-input"
                        >
                          <option value="">Selecciona un área</option>
                          <option value="administracion">Administración</option>
                          <option value="produccion">Producción</option>
                          <option value="logistica">Logística</option>
                        </select>
                        {errors.area && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.area}</div>}
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
                          className="contacto-form select select-match-input"
                        >
                          <option value="">Selecciona una sucursal</option>
                          {sucursalesList.map((sucursal, index) => (
                            <option key={index} value={sucursal}>
                              {sucursal}
                            </option>
                          ))}
                        </select>
                        {errors.sucursal && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.sucursal}</div>}
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
                        {errors.cv && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.cv}</div>}
                        {formData.cv ? (
                          <div className="file-drop-content has-file">
                              <p>{formData.cv.name}</p>
                              <button type="button" className="remove-file" onClick={handleRemoveFile}>&times;</button>
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
    </div>
  );
};

export default TrabajaConNosotros;

// Solo para mobile: subir imagen y formulario y mantener separación
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