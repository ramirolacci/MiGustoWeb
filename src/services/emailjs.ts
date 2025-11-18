import emailjs from '@emailjs/browser';

// Configuración de EmailJS - Estas variables deben estar en tu archivo .env
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Configuración de Cloudinary (opcional, para subir CVs)
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

// Tipos de formularios
export type FormType = 'proveedores' | 'franquicias' | 'trabaja-con-nosotros' | 'venta-corporativa';

// Interfaz para los datos normalizados del formulario
export interface FormDataNormalized {
  tipoFormulario: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  mensaje: string;
  [key: string]: string | number; // Para campos adicionales específicos de cada formulario
}

/**
 * Normaliza los datos de cualquier formulario a un formato común
 */
export const normalizeFormData = (
  formType: FormType,
  formData: Record<string, any>
): FormDataNormalized => {
  const normalized: FormDataNormalized = {
    tipoFormulario: getFormTypeLabel(formType),
    nombreCompleto: '',
    email: '',
    telefono: '',
    mensaje: '',
  };

  switch (formType) {
    case 'proveedores':
      normalized.nombreCompleto = formData.nombreEmpresa || '';
      normalized.email = formData.email || '';
      normalized.telefono = formData.telefono || '';
      normalized.mensaje = 'Solicitud de proveedor recibida. Ver detalles en la sección de información adicional.';
      normalized.razonSocial = formData.razonSocial || '';
      normalized.descripcion = formData.descripcion || '';
      break;

    case 'franquicias':
      normalized.nombreCompleto = formData.nombre || '';
      normalized.email = formData.email || '';
      normalized.telefono = formData.telefonoCelular || formData.telefonoAlternativo || '';
      normalized.mensaje = buildFranquiciasMessage(formData);
      // Agregar todos los campos adicionales
      Object.keys(formData).forEach(key => {
        if (!['nombre', 'email', 'telefonoCelular', 'telefonoAlternativo'].includes(key)) {
          normalized[key] = formData[key] || '';
        }
      });
      break;

    case 'trabaja-con-nosotros':
      normalized.nombreCompleto = `${formData.nombre || ''} ${formData.apellido || ''}`.trim();
      normalized.email = formData.email || '';
      normalized.telefono = formData.telefono || '';
      normalized.mensaje = buildTrabajaConNosotrosMessage(formData);
      normalized.puesto = formData.puesto || '';
      normalized.area = formData.area || '';
      normalized.sucursal = formData.sucursal || '';
      normalized.edad = formData.edad || '';
      normalized.localidad = formData.localidad || '';
      normalized.cvFileName = formData.cv?.name || 'No adjuntado';
      // Guardar referencia al archivo para subirlo después
      if (formData.cv) {
        (normalized as any)._cvFile = formData.cv;
      }
      break;

    case 'venta-corporativa':
      normalized.nombreCompleto = formData.nombreApellido || '';
      normalized.email = formData.mailCorporativo || '';
      normalized.telefono = formData.telefono || '';
      normalized.mensaje = buildVentaCorporativaMessage(formData);
      normalized.fechaEvento = formData.fechaEvento || '';
      normalized.cantidadComensales = formData.cantidadComensales || '';
      normalized.descripcionEvento = formData.descripcionEvento || '';
      normalized.observaciones = formData.observaciones || '';
      break;
  }

  return normalized;
};

/**
 * Construye el mensaje para el formulario de franquicias
 * Este mensaje solo debe contener información general, no los campos específicos
 * que ya se mostrarán en la sección de información adicional
 */
const buildFranquiciasMessage = (formData: Record<string, any>): string => {
  // Para "Franquicias", el mensaje puede estar vacío o contener observaciones generales
  // Los campos específicos se mostrarán en la sección de información adicional
  return 'Solicitud de franquicia recibida. Ver detalles en la sección de información adicional.';
};

/**
 * Sube un archivo a Cloudinary y retorna la URL
 * Si falla, retorna string vacío en lugar de lanzar error
 */
const uploadFileToCloudinary = async (file: File): Promise<string> => {
  // Si no hay configuración de Cloudinary, retornar vacío
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    console.warn('Cloudinary no configurado. El CV no se subirá.');
    return '';
  }

  // Validar tamaño del archivo (máximo 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB en bytes
  if (file.size > maxSize) {
    console.warn(`El archivo es demasiado grande (${(file.size / 1024 / 1024).toFixed(2)}MB). Máximo permitido: 10MB`);
    return '';
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'migusto-cvs'); // Carpeta donde se guardarán los CVs

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Cloudinary:', response.status, errorText);
      return ''; // Retornar vacío en lugar de lanzar error
    }

    const data = await response.json();
    return data.secure_url; // URL pública del archivo
  } catch (error) {
    console.error('Error al subir CV a Cloudinary:', error);
    // Retornar vacío en lugar de lanzar error para que el formulario pueda continuar
    return '';
  }
};

/**
 * Construye el mensaje para el formulario de trabaja con nosotros
 * Este mensaje solo debe contener información general, no los campos específicos
 * que ya se mostrarán en la sección de información adicional
 */
const buildTrabajaConNosotrosMessage = (formData: Record<string, any>): string => {
  // Para "Trabaja con Nosotros", el mensaje puede estar vacío o contener observaciones generales
  // Los campos específicos se mostrarán en la sección de información adicional
  return 'Postulación recibida. Ver detalles en la sección de información adicional.';
};

/**
 * Construye el mensaje para el formulario de venta corporativa
 * Este mensaje solo debe contener información general, no los campos específicos
 * que ya se mostrarán en la sección de información adicional
 */
const buildVentaCorporativaMessage = (formData: Record<string, any>): string => {
  // Para "Venta Corporativa", el mensaje puede estar vacío o contener observaciones generales
  // Los campos específicos se mostrarán en la sección de información adicional
  return 'Solicitud de venta corporativa recibida. Ver detalles en la sección de información adicional.';
};

/**
 * Obtiene la etiqueta legible del tipo de formulario
 */
const getFormTypeLabel = (formType: FormType): string => {
  const labels: Record<FormType, string> = {
    'proveedores': 'Proveedores',
    'franquicias': 'Franquicias',
    'trabaja-con-nosotros': 'Trabaja con Nosotros',
    'venta-corporativa': 'Venta Corporativa',
  };
  return labels[formType];
};

/**
 * Envía el formulario usando EmailJS
 */
export const sendFormEmail = async (
  formType: FormType,
  formData: Record<string, any>
): Promise<void> => {
  // Validar configuración
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error(
      'Configuración de EmailJS incompleta. Por favor, verifica las variables de entorno: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY'
    );
  }

  // Normalizar los datos
  const normalizedData = normalizeFormData(formType, formData);

  // Si es el formulario de "Trabaja con Nosotros" y tiene CV, intentar subirlo a Cloudinary
  let cvUrl = '';
  if (formType === 'trabaja-con-nosotros' && (normalizedData as any)._cvFile) {
    // Intentar subir el CV (no lanza error si falla, solo retorna string vacío)
    cvUrl = await uploadFileToCloudinary((normalizedData as any)._cvFile);
    // Eliminar la referencia al archivo de los datos normalizados
    delete (normalizedData as any)._cvFile;
  }

  // Inicializar EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  /**
   * Función para sanitizar valores para EmailJS
   * Limpia y formatea el texto para evitar errores en la plantilla
   */
  const sanitizeValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    let str = String(value);
    // Normalizar saltos de línea
    str = str.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    // Escapar solo los caracteres que pueden romper el HTML en atributos/variables
    // Pero mantener el HTML válido si ya está formateado
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    // Reemplazar saltos de línea por <br> para que se muestren correctamente en HTML
    str = str.replace(/\n/g, '<br>');
    // Limpiar espacios múltiples pero mantener uno
    str = str.replace(/[ \t]+/g, ' ');
    return str.trim();
  };

  // Preparar los parámetros para la plantilla
  // La plantilla debe tener estos campos:
  // - tipo_formulario: Tipo de formulario
  // - nombre_completo: Nombre completo del usuario
  // - email: Email del usuario
  // - telefono: Teléfono del usuario
  // - mensaje: Mensaje principal con todos los detalles
  // - cv_url: URL del CV (solo para "Trabaja con Nosotros")
  // - cv_file_name: Nombre del archivo CV
  // - campos_adicionales: JSON stringificado con todos los campos adicionales (opcional)
  
  const templateParams: Record<string, string> = {
    tipo_formulario: sanitizeValue(normalizedData.tipoFormulario),
    nombre_completo: sanitizeValue(normalizedData.nombreCompleto),
    email: sanitizeValue(normalizedData.email),
    telefono: sanitizeValue(normalizedData.telefono),
    mensaje: sanitizeValue(normalizedData.mensaje),
  };

  // Generar HTML de campos adicionales (solo los que tienen valores)
  const camposAdicionales: Array<{label: string, value: string}> = [];
  
  // Mapeo de campos a etiquetas legibles
  const camposLabels: Record<string, string> = {
    // Trabaja con Nosotros
    puesto: 'Puesto',
    area: 'Área',
    sucursal: 'Sucursal',
    edad: 'Edad',
    localidad: 'Localidad',
    // Proveedores
    razonSocial: 'Razón Social',
    descripcion: 'Descripción de productos/servicios',
    // Venta Corporativa
    fechaEvento: 'Fecha del Evento',
    cantidadComensales: 'Cantidad de Comensales',
    descripcionEvento: 'Descripción del Evento',
    observaciones: 'Observaciones',
    // Franquicias
    fechaNacimiento: 'Fecha de Nacimiento',
    sexo: 'Sexo',
    estadoCivil: 'Estado Civil',
    tipoDocumento: 'Tipo de Documento',
    numeroDocumento: 'Número de Documento',
    paisResidencia: 'País de Residencia',
    provinciaResidencia: 'Provincia de Residencia',
    localidadResidencia: 'Localidad de Residencia',
    domicilio: 'Domicilio',
    telefonoAlternativo: 'Teléfono Alternativo',
    emailAlternativo: 'Email Alternativo',
    paisPreferencia: 'País de Preferencia',
    provinciaPreferencia: 'Provincia de Preferencia',
    localidadPreferencia: 'Localidad de Preferencia',
    inmuebleGarantia: '¿Posee inmueble en garantía?',
  };

  // Agregar campos adicionales que tienen valores
  Object.keys(normalizedData).forEach(key => {
    if (!['tipoFormulario', 'nombreCompleto', 'email', 'telefono', 'mensaje', '_cvFile', 'cvFileName'].includes(key)) {
      const value = normalizedData[key];
      // Solo agregar si el valor no está vacío
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        const label = camposLabels[key] || key;
        camposAdicionales.push({
          label: sanitizeValue(label),
          value: sanitizeValue(value)
        });
      }
    }
  });

  // Generar HTML de la sección de información adicional (sin saltos de línea para evitar problemas)
  let infoAdicionalHTML = '';
  if (camposAdicionales.length > 0) {
    const camposHTML = camposAdicionales.map(campo => 
      `<p style="margin: 0 0 8px; font-size: 14px;"><strong style="color: #6b7280;">${campo.label}:</strong> <span style="color: #111827;">${campo.value}</span></p>`
    ).join('');
    
    infoAdicionalHTML = `<div style="padding: 20px 24px; background-color: #f8fafc; border-top: 1px solid #e5e7eb;"><p style="margin: 0 0 12px; font-weight: 600; color: #111827;">Información adicional</p><div style="background-color: #ffffff; border-radius: 6px; padding: 16px; border: 1px solid #e5e7eb;">${camposHTML}</div></div>`;
  }

  // Agregar información del CV (solo para Trabaja con Nosotros)
  // Siempre enviar estas variables para evitar errores en la plantilla
  templateParams.cv_url = '';
  templateParams.cvFileName = '';
  templateParams.cv_seccion_html = ''; // HTML completo de la sección CV
  templateParams.info_adicional_html = infoAdicionalHTML; // HTML completo de información adicional
  
  if (formType === 'trabaja-con-nosotros') {
    templateParams.cvFileName = sanitizeValue(normalizedData.cvFileName || 'No adjuntado');
    
    if (cvUrl) {
      // CV disponible - generar HTML de la sección
      templateParams.cv_url = sanitizeValue(cvUrl);
      const cvFileNameSafe = sanitizeValue(normalizedData.cvFileName || 'No adjuntado');
      templateParams.cv_seccion_html = `<div style="padding: 20px 24px; background-color: #fef3c7; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;"><p style="margin: 0 0 12px; font-weight: 600; color: #92400e; display: flex; align-items: center; gap: 8px;"><span style="font-size: 18px;">📄</span><span>Curriculum Vitae</span></p><p style="margin: 0 0 12px; color: #78350f; font-size: 13px;"><strong>Archivo:</strong> ${cvFileNameSafe}</p><a href="${sanitizeValue(cvUrl)}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: #8B5CF6; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 8px;">📥 Descargar CV</a></div>`;
    } else if (normalizedData.cvFileName && normalizedData.cvFileName !== 'No adjuntado') {
      // CV no disponible - generar HTML de advertencia
      const cvFileNameSafe = sanitizeValue(normalizedData.cvFileName);
      templateParams.cv_seccion_html = `<div style="padding: 20px 24px; background-color: #fee2e2; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;"><p style="margin: 0 0 8px; font-weight: 600; color: #991b1b;">⚠️ CV no disponible</p><p style="margin: 0; color: #7f1d1d; font-size: 13px;">El CV no pudo ser subido automáticamente. Por favor, contactar al candidato para solicitarlo.</p><p style="margin: 8px 0 0; color: #7f1d1d; font-size: 13px;"><strong>Nombre del archivo:</strong> ${cvFileNameSafe}</p></div>`;
    }
    // Si no hay CV, cv_seccion_html queda vacío y no se mostrará nada
  }

  // Log para debug (solo en desarrollo)
  if (import.meta.env.DEV) {
    console.log('📧 Enviando email con EmailJS:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      params: templateParams
    });
  }

  // Enviar el email
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error(`Error al enviar el email: ${response.status}`);
    }
  } catch (error) {
    console.error('Error al enviar el email con EmailJS:', error);
    console.error('Parámetros enviados:', templateParams);
    throw error;
  }
};

