import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Heart, Mail, Phone, MapPin, Check, Star, Users, Gift, ChevronDown } from 'lucide-react';
import emailjs from '@emailjs/browser';
import DatePicker from 'react-datepicker';
import { config } from './config';
import { securityService } from './services/security';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import MiGustoTitulo from './assets/MiGustoTitulo.png';
import Empanada1 from './assets/Empanadas/Mexican-Veggie-demo.png';
import Empanada2 from './assets/Empanadas/Mexican-Pibil-Pork-demo.png';
import Empanada3 from './assets/Empanadas/Matambre a la pizza.png';
import Empanada4 from './assets/Empanadas/burger.png';
import { FaInstagram } from 'react-icons/fa';
import backgroundText from './assets/background-text.jpg';
import LoversButton from './components/LoversButton';
// import './index.css';
import emailCardHtml from './emailCard.html?raw';
import NavBar from '../components/NavBar';

// Registrar el locale español
registerLocale('es', es);
setDefaultLocale('es');

// Estilos globales para el modal
const modalStyles = `
  @keyframes fadeIn {
    from { 
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to { 
      opacity: 1;
      backdrop-filter: blur(8px);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Estilos para la barra de scroll */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #181818;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #e53935;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #f7c873;
  }

  .modal-content {
    animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .modal-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  }

  .modal-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .modal-section-title {
    color: #e53935;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  .modal-text {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .modal-link {
    color: #e53935;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .modal-link:hover {
    color: #f7c873;
    text-decoration: underline;
  }
`;

interface FormDataInterface {
  nombre: string;
  email: string;
  telefono: string;
  esCliente: string;
  sucursal: string;
  aceptaBeneficios: boolean;
  cumple: string;
  saboresFavoritos: string[];
}

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  esCliente?: string;
  sucursal?: string;
  cumple?: string;
  saboresFavoritos?: string;
  aceptaBeneficios?: string;
}

// Agrego estilos globales para animaciones de partículas
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
  // Detectar si es mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
  // Generar propiedades únicas para cada partícula solo al montar
  const particlesData = useMemo(() =>
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
      <style>{particlesAnimations}</style>
      <div className="particles-bg">
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
              objectFit: 'contain',
              aspectRatio: '1/1',
              animation: `empanada-fall-optimized ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              willChange: 'transform, opacity',
              zIndex: 1,
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

function Confetti() {
  // 24 piezas de confeti con posiciones y rotaciones aleatorias
  const confetti = Array.from({length: 24}).map((_, i) => {
    const left = 40 + Math.random() * 20;
    const top = Math.random() * 20;
    const rotate = Math.random() * 360;
    const delay = Math.random() * 0.5;
    return (
      <div
        key={i}
        className="confetti-piece"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          transform: `rotate(${rotate}deg)`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  return <div className="confetti">{confetti}</div>;
}

function App() {
  const [formData, setFormData] = useState<FormDataInterface>(() => {
    // Intentar recuperar datos del localStorage al iniciar
    const savedData = localStorage.getItem('migustoFormData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error('Error al cargar datos guardados:', e);
      }
    }
    return {
      nombre: '',
      email: '',
      telefono: '',
      cumple: '',
      saboresFavoritos: [],
      esCliente: '',
      sucursal: '',
      aceptaBeneficios: false
    };
  });

  // Guardar datos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('migustoFormData', JSON.stringify(formData));
  }, [formData]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [saboresDropdownOpen, setSaboresDropdownOpen] = useState(false);
  const saboresDropdownRef = useRef<HTMLDivElement>(null);
  const [cumpleDropdownOpen, setCumpleDropdownOpen] = useState(false);
  const cumpleDropdownRef = useRef<HTMLDivElement>(null);
  const cumpleInputRef = useRef<HTMLInputElement>(null);
  const [showPrivacidad, setShowPrivacidad] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const sucursales = [
    'Ballester',
    'Balvanera',
    'Barrancas',
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
    'Ituzaingo',
    'Jose C. Paz',
    'Los Polvorines',
    'Martinez',
    'Maschwitz',
    'Mataderos',
    'Merlo',
    'Moreno',
    'Muñiz',
    'Munro',
    'Palermo',
    'Paternal',
    'Pilar Centro',
    'Pilar Derqui',
    'Puerto Madero',
    'San Fernando',
    'San Martin',
    'San Miguel',
    'Tigre',
    'Tortugas Norte',
    'Villa Adelina',
    'Villa Crespo',
    'Villa Urquiza',
  ];

  const sabores = [
    'Mexican Pibil Pork',
    'Mexican Veggie',
    'Big burger',
    'Vacio y provoleta',
    'Matambre a la pizza',
    'Cheese burger',
    'Jamon y queso',
    'American Chicken',
    'Jamon, queso y huevo',
    'Carne Picante',
    'Jamon, Tomate y albahaca',
    'Carne al cuchillo',
    'Queso y Cebolla',
    'Carne Suave',
    'Roquefort con jamon',
    'Carne con aceituna',
    'Pollo',
    'Cuatro Quesos',
    'Pollo al champignon',
    'Choclo',
    'Verdura',
    'Calabaza',
    'Pance y ciruela',
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.telefono)) {
      newErrors.telefono = 'El formato del teléfono no es válido';
    }

    if (!formData.esCliente) {
      newErrors.esCliente = 'Debe indicar si ya es cliente';
    }

    if (!formData.sucursal) {
      newErrors.sucursal = 'Debe seleccionar una sucursal';
    }

    if (!formData.cumple) {
      newErrors.cumple = 'La fecha de cumpleaños es obligatoria';
    }

    if (!formData.saboresFavoritos.length) {
      newErrors.saboresFavoritos = 'Selecciona al menos un sabor favorito';
    } else if (formData.saboresFavoritos.length > 3) {
      newErrors.saboresFavoritos = 'Solo puedes seleccionar hasta 3 sabores';
    }

    if (!formData.aceptaBeneficios) {
      newErrors.aceptaBeneficios = 'Debes aceptar los beneficios';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name === 'saboresFavoritos') {
      const options = (e.target as HTMLSelectElement).options;
      const selected: string[] = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) selected.push(options[i].value);
      }
      setFormData(prev => ({
        ...prev,
        saboresFavoritos: selected
      }));
      if (selected.length > 3) {
        setErrors(prev => ({ ...prev, saboresFavoritos: 'Solo puedes seleccionar hasta 3 sabores' }));
      } else {
        setErrors(prev => ({ ...prev, saboresFavoritos: undefined }));
      }
      return;
    }
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handler especial para chips de sabores
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
      setErrors(prev => ({ ...prev, saboresFavoritos: undefined }));
    }
  };

  // Función para formatear la fecha a dd-mm-aaaa
  function formatearFecha(fechaISO: string) {
    if (!fechaISO) return '';
    const [a, m, d] = fechaISO.split('-');
    return `${d}-${m}-${a}`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!securityService.checkRateLimit()) {
      alert('Has excedido el límite de intentos. Por favor, intenta más tarde.');
      return;
    }
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        // Sanitizar datos
        const sanitizedData = {
          nombre: securityService.sanitizeInput(formData.nombre),
          email: formData.email.toLowerCase().trim(),
          telefono: securityService.sanitizeInput(formData.telefono),
          cumple: formData.cumple,
          saboresFavoritos: formData.saboresFavoritos.map(s => securityService.sanitizeInput(s)),
          cliente: formData.esCliente,
          sucursal: securityService.sanitizeInput(formData.sucursal),
          novedades: formData.aceptaBeneficios
        };
        // Validaciones adicionales de seguridad
        if (!securityService.validateEmail(sanitizedData.email)) {
          throw new Error('Formato de email inválido');
        }
        if (!securityService.validatePhone(sanitizedData.telefono)) {
          throw new Error('Formato de teléfono inválido');
        }
        // Generar token de formulario
        const formToken = securityService.generateFormToken();
        // Preparar los datos para el correo
        const templateParams = {
          nombre: sanitizedData.nombre,
          email: sanitizedData.email,
          telefono: sanitizedData.telefono,
          cumple: formatearFecha(sanitizedData.cumple),
          saboresFavoritos: sanitizedData.saboresFavoritos.join(', '),
          cliente: sanitizedData.cliente === 'si' ? 'Sí' : 'No',
          sucursal: sanitizedData.sucursal,
          novedades: sanitizedData.novedades ? 'Sí' : 'No',
          formToken: formToken
        };
        // Reemplazar los placeholders en el HTML
        let htmlBody = emailCardHtml;
        Object.entries(templateParams).forEach(([key, value]) => {
          htmlBody = htmlBody.replace(new RegExp(`{{${key}}}`, 'g'), value);
        });
        // Preparar datos para SheetDB (solo una vez)
        const sheetData = {
          nombre: sanitizedData.nombre,
          email: sanitizedData.email,
          telefono: sanitizedData.telefono,
          sucursal: sanitizedData.sucursal,
          esCliente: sanitizedData.cliente === 'si' ? 'si' : 'no',
          aceptaBeneficios: sanitizedData.novedades ? 'Sí' : 'No',
          cumple: formatearFecha(sanitizedData.cumple),
          saboresFavoritos: sanitizedData.saboresFavoritos.join(', '),
          formToken: formToken
        };
        // Enviar correo usando el backend propio
        const mailResponse = await fetch('http://localhost:3000/mail/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: sanitizedData.email,
            subject: '¡Bienvenido a Mi Gusto Lovers!',
            text: `¡Bienvenido a Mi Gusto Lovers!\n\nNombre: ${templateParams.nombre}\nEmail: ${templateParams.email}\nTeléfono: ${templateParams.telefono}\nCumpleaños: ${templateParams.cumple}\nSabores favoritos: ${templateParams.saboresFavoritos}\n¿Es cliente?: ${templateParams.cliente}\nSucursal: ${templateParams.sucursal}\n¿Recibe novedades?: ${templateParams.novedades}`,
            html: htmlBody,
            sheetData: sheetData
          })
        });
        if (!mailResponse.ok) {
          throw new Error('No se pudo enviar el correo');
        }

        setIsSubmitted(true);
        setTimeout(() => {
          setFormData({
            nombre: '',
            email: '',
            telefono: '',
            esCliente: '',
            sucursal: '',
            aceptaBeneficios: false,
            cumple: '',
            saboresFavoritos: []
          });
          setIsSubmitted(false);
        }, 5000);
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Cerrar el dropdown si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (saboresDropdownRef.current && !saboresDropdownRef.current.contains(event.target as Node)) {
        setSaboresDropdownOpen(false);
        // Aquí se "guardan" automáticamente las empanadas seleccionadas al cerrar
        // (ya se actualizan en tiempo real, pero esto fuerza el cierre y el guardado visual)
      }
    }
    if (saboresDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [saboresDropdownOpen]);

  // Cerrar el dropdown de cumpleaños si se hace clic fuera
  useEffect(() => {
    function handleClickOutsideCumple(event: MouseEvent) {
      if (cumpleDropdownRef.current && !cumpleDropdownRef.current.contains(event.target as Node)) {
        setCumpleDropdownOpen(false);
      }
    }
    if (cumpleDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutsideCumple);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideCumple);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCumple);
    };
  }, [cumpleDropdownOpen]);

  // Protección contra inspección y clic derecho
  useEffect(() => {
    // Deshabilitar teclas de inspección
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, F12
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    // Agregar event listeners
    document.addEventListener('keydown', handleKeyDown);

    // Limpiar event listeners al desmontar
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isSubmitted) {
    return (
      <div className="app lovers-app">
        <NavBar />
        <style>{modalStyles}</style>
        <ParticlesBG />
        <Confetti />
        <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #181818 0%, #232526 100%)'}}>
          <div className="glass-card" style={{maxWidth: 480, width: '100%', textAlign: 'center'}}>
            <div style={{width: 80, height: 80, background: 'rgba(255,215,0,0.13)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto'}}>
              <Check style={{width: 40, height: 40, color: '#e53935'}} />
          </div>
            <h2 style={{color: '#e53935', fontWeight: 800, fontSize: '2rem', marginBottom: 16}}>¡Bienvenido a Mi Gusto Lovers!</h2>
            <p style={{color: '#fff', marginBottom: 24}}>
            Tu registro ha sido procesado exitosamente. Pronto recibirás un email con todos los detalles 
            de tu membresía y beneficios exclusivos.
          </p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#e53935'}}>
              <Heart style={{width: 20, height: 20, color: '#e53935'}} />
              <span style={{fontWeight: 600}}>¡Gracias por unirte a nuestra comunidad!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app lovers-app" style={{ overflow: 'hidden', height: '100vh', background: "url('/assets/background-text.jpg') center center / cover no-repeat" }}>
      <NavBar />
      <style>{modalStyles}</style>
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 48, minHeight: 0, height: 'auto', overflow: 'visible' }}>
        {/* Bloque principal original aquí: */}
        <ParticlesBG />
        <section
          style={{
            width: '100vw',
            minWidth: '0',
            maxWidth: '100vw',
            boxSizing: 'border-box',
            overflowX: 'hidden',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 48,
              position: 'relative',
            zIndex: 2,
            minHeight: '60vh',
            }}
          >
          {/* Columna izquierda: Beneficios */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            alignItems: 'flex-end',
                justifyContent: 'center',
            maxWidth: 420,
            minWidth: 280,
                marginBottom: 18,
            marginTop: 0,
                position: 'relative',
                    zIndex: 2,
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 700,
                  color: '#FFD700', 
                  marginBottom: 16, 
                  letterSpacing: 0.5, 
              textAlign: 'center',
                  width: '100%', 
                  position: 'relative',
              fontFamily: 'Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
              lineHeight: 1.2,
              marginTop: 0,
            }}>
              Programa exclusivo de beneficios!
                </h1>
            <p style={{
                  fontSize: '1.15rem', 
                  color: '#ffffff', 
                  marginBottom: 18, 
                  maxWidth: 420, 
                  lineHeight: 1.6, 
              textAlign: 'center',
                  width: '100%', 
                  fontWeight: 400,
                  letterSpacing: 0.1,
              fontFamily: 'Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
              textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)'
            }}>
              Únete a nuestro programa exclusivo y disfruta de beneficios únicos, descuentos especiales y experiencias gastronómicas irrepetibles en todas nuestras sucursales.
            </p>
            {/* Tarjetas de beneficios */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
                  gap: 16,
                  width: '100%',
              margin: '18px 0 0 0',
                  position: 'relative',
                  zIndex: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* Card 1 */}
              <div style={{ width: 180, minWidth: 180, maxWidth: 180, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', border: '1.5px solid #FFD700', boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)', padding: '1.1rem 0.7rem', background: 'rgba(24,24,24,0.82)', borderRadius: 12 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(255,215,0,0.13)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.7rem auto' }}><Star color="#FFD700" size={22} /></div>
                <h3 style={{ color: '#FFD700', fontWeight: 700, marginBottom: 7, fontSize: '1.05rem' }}>Descuentos</h3>
                <p style={{ color: '#fff', fontSize: '0.92rem' }}>Hasta 25% de descuento y promos especiales.</p>
                  </div>
              {/* Card 2 */}
              <div style={{ width: 180, minWidth: 180, maxWidth: 180, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', border: '1.5px solid #FFD700', boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)', padding: '1.1rem 0.7rem', background: 'rgba(24,24,24,0.82)', borderRadius: 12 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(255,215,0,0.13)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.7rem auto' }}><Users color="#FFD700" size={22} /></div>
                <h3 style={{ color: '#FFD700', fontWeight: 700, marginBottom: 7, fontSize: '1.05rem' }}>Eventos</h3>
                <p style={{ color: '#fff', fontSize: '0.92rem' }}>Cenas, catas y eventos únicos.</p>
                </div>
              {/* Card 3 */}
              <div style={{ width: 180, minWidth: 180, maxWidth: 180, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', border: '1.5px solid #FFD700', boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)', padding: '1.1rem 0.7rem', background: 'rgba(24,24,24,0.82)', borderRadius: 12 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(255,215,0,0.13)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.7rem auto' }}><Gift color="#FFD700" size={22} /></div>
                <h3 style={{ color: '#FFD700', fontWeight: 700, marginBottom: 7, fontSize: '1.05rem' }}>VIP</h3>
                <p style={{ color: '#fff', fontSize: '0.92rem' }}>Reservas y atención prioritaria.</p>
                  </div>
              {/* Card 4 */}
              <div style={{ width: 180, minWidth: 180, maxWidth: 180, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', border: '1.5px solid #FFD700', boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)', padding: '1.1rem 0.7rem', background: 'rgba(24,24,24,0.82)', borderRadius: 12 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(255,215,0,0.13)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.7rem auto' }}><ChevronDown color="#FFD700" size={22} /></div>
                <h3 style={{ color: '#FFD700', fontWeight: 700, marginBottom: 7, fontSize: '1.05rem' }}>Sorteos y Premios</h3>
                <p style={{ color: '#fff', fontSize: '0.92rem' }}>Participa por premios y experiencias exclusivas.</p>
                </div>
            </div>
          </div>
          {/* Columna derecha: Formulario */}
          <div style={{
            width: 420,
            maxWidth: 520,
            minWidth: 320,
                margin: 0,
                zIndex: 3,
            position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
            alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(24,24,24,0.82)',
                            borderRadius: 18,
            boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)',
            padding: '2.2rem 2.2rem 2.2rem 2.2rem',
                                  border: '1.5px solid #FFD700',
          }}>
            <form ref={formRef} onSubmit={handleSubmit} className="contacto-form" style={{ width: '100%' }}>
              <h2 style={{ color: '#FFD700', fontWeight: 800, fontSize: '1.3rem', marginBottom: 8, textAlign: 'center' }}>Mi Gusto Lovers</h2>
              <p style={{ textAlign: 'center', color: '#fff', marginBottom: 18, fontSize: '1.05rem' }}>Completa el siguiente formulario para ponerte en contacto con Mi Gusto Lovers.</p>
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="nombre">Nombre completo: <span className="required">*</span></label>
                  <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required placeholder="Ingrese su nombre" className={errors.nombre ? 'input-error' : ''} />
                  {errors.nombre && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.nombre}</div>}
                          </div>
                <div className="form-group half-width">
                  <label htmlFor="email">E-mail: <span className="required">*</span></label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="ejemplo@email.com" className={errors.email ? 'input-error' : ''} />
                  {errors.email && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.email}</div>}
                          </div>
                        </div>
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="telefono">Teléfono: <span className="required">*</span></label>
                  <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} required placeholder="+54 9 11 1234-5678" className={errors.telefono ? 'input-error' : ''} />
                  {errors.telefono && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.telefono}</div>}
                        </div>
                <div className="form-group half-width">
                  <label>Fecha de cumpleaños: <span className="required">*</span></label>
                  <input type="date" name="cumple" value={formData.cumple} onChange={handleInputChange} required className={errors.cumple ? 'input-error' : ''} />
                  <small style={{color: '#FFD700', fontSize: '0.95rem'}}>Solo para saludarte en tu día :)</small>
                  {errors.cumple && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.cumple}</div>}
                    </div>
              </div>
              <div className="form-row">
                <div className="form-group half-width">
                  <label>Tus 3 sabores favoritos: <span className="required">*</span></label>
                  <select name="saboresFavoritos" multiple value={formData.saboresFavoritos} onChange={handleInputChange} className={errors.saboresFavoritos ? 'input-error' : ''} style={{ height: 80 }}>
                    {sabores.map(sabor => <option key={sabor} value={sabor}>{sabor}</option>)}
                  </select>
                    <small style={{color: '#FFD700', fontSize: '0.95rem'}}>Puedes elegir hasta 3 sabores</small>
                  {errors.saboresFavoritos && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.saboresFavoritos}</div>}
                  </div>
                <div className="form-group half-width">
                  <label htmlFor="sucursal">Sucursal habitual: <span className="required">*</span></label>
                  <select name="sucursal" value={formData.sucursal} onChange={handleInputChange} required className={errors.sucursal ? 'input-error' : ''}>
                    <option value="">Selecciona una sucursal</option>
                    {sucursales.map(suc => <option key={suc} value={suc}>{suc}</option>)}
                      </select>
                  {errors.sucursal && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 4 }}>{errors.sucursal}</div>}
                    </div>
                  </div>
              <div className="form-row">
                <div className="form-group half-width">
                  <label>¿Ya eres cliente de Mi Gusto? <span className="required">*</span></label>
                    <div style={{display: 'flex', gap: 24, marginTop: 8}}>
                      <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <input type="radio" name="esCliente" value="si" checked={formData.esCliente === 'si'} onChange={handleInputChange} />
                        <span style={{color: '#fff'}}>Sí</span>
                    </label>
                      <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <input type="radio" name="esCliente" value="no" checked={formData.esCliente === 'no'} onChange={handleInputChange} />
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
              <div className="form-row" style={{ marginTop: 12, marginBottom: 0 }}>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" id="aceptaBeneficios" name="aceptaBeneficios" checked={formData.aceptaBeneficios} onChange={handleInputChange} style={{ accentColor: '#e53935', width: 18, height: 18, margin: 0 }} />
                  <label htmlFor="aceptaBeneficios" style={{ margin: 0, color: '#fff', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}>
                    Quiero recibir novedades y beneficios exclusivos
                  </label>
                </div>
                {errors.aceptaBeneficios && <div style={{ color: 'red', fontSize: '0.95rem', marginTop: 2 }}>{errors.aceptaBeneficios}</div>}
                </div>
              </form>
        </div>
      </section>
              </div>
      {/* El resto de los overlays/modales globales quedan fuera */}
    </div>
  );
}

export default App;