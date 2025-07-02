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
import Switch from './components/Switch';
import './index.css';

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
    'Big Burger',
    'Vacio y provoleta',
    'Matambre a la pizza',
    'CheeseBurger',
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
        // Enviar correo usando EmailJS
        await emailjs.send(
          config.emailjs.serviceId,
          config.emailjs.templateId,
          templateParams,
          config.emailjs.publicKey
        );

        // Preparar datos para SheetDB
        const sheetData = {
          data: [{
            nombre: sanitizedData.nombre,
            email: sanitizedData.email,
            telefono: sanitizedData.telefono,
            sucursal: sanitizedData.sucursal,
            esCliente: sanitizedData.cliente === 'si' ? 'si' : 'no',
            aceptaBeneficios: sanitizedData.novedades ? 'Sí' : 'No',
            cumple: formatearFecha(sanitizedData.cumple),
            saboresFavoritos: sanitizedData.saboresFavoritos.join(', '),
            formToken: formToken
          }]
        };

        // Enviar datos a SheetDB con retry y timeout
        const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 5000) => {
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), timeout);
          try {
            const response = await fetch(url, {
              ...options,
              signal: controller.signal
            });
            clearTimeout(id);
            return response;
          } catch (error) {
            clearTimeout(id);
            throw error;
          }
        };

        const maxRetries = 3;
        let retryCount = 0;
        let response;
        let lastError: Error | null = null;
        while (retryCount < maxRetries) {
          try {
            response = await fetchWithTimeout(
              config.sheetdb.url,
              {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sheetData)
              },
              5000
            );
            if (response.ok) break;
            lastError = new Error(`HTTP error! status: ${response.status}`);
            retryCount++;
          } catch (error) {
            lastError = error as Error;
            if (retryCount === maxRetries - 1) throw error;
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }

        if (!response?.ok) {
          throw lastError || new Error('Failed to send data to SheetDB');
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
      <div className="app">
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
    <div className="app">
      <style>{modalStyles}</style>
      <header style={{
        background: 'rgba(24,24,24,0.85)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 100,
        margin: 0,
        padding: 0,
        minHeight: 0
      }}>
        {windowWidth > 900 ? (
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '1.2rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            flexDirection: 'row',
            width: '100%'
          }}>
            {/* IZQUIERDA: Switch, Corazón, MiGustoTitulo */}
            <div style={{display: 'flex', alignItems: 'center', gap: 18, minWidth: 180}}>
              {/* Corazón */}
              <div style={{width: 44, height: 44, background: 'linear-gradient(135deg, #e53935 0%, #f7c873 100%)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Heart className="heartbeat" style={{width: 28, height: 28, color: '#181818'}} />
              </div>
              {/* Switch Site a la derecha del corazón */}
              <Switch
                isOn={isSwitchOn}
                onClick={() => {
                  setIsSwitchOn(true);
                  setTimeout(() => {
                    window.location.href = '/';
                  }, 350);
                }}
              />
              {/* MiGustoTitulo eliminado de la izquierda */}
                </div>
            {/* CENTRO: Logo Mi Gusto con animaciones impresionantes */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto',
              pointerEvents: 'none',
              zIndex: 20
            }}>
              {/* Logo Mi Gusto con animaciones impresionantes, sin casillero ni fondo */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 180,
                height: 60,
                overflow: 'visible',
                background: 'none',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
              }}>
                {/* Partículas doradas animadas */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  pointerEvents: 'none',
                  overflow: 'visible',
                }}>
                  {Array.from({length: 16}).map((_, i) => (
                    <span key={i} style={{
                      position: 'absolute',
                      left: `${Math.random()*100}%`,
                      top: `${Math.random()*100}%`,
                      width: 8 + Math.random()*10,
                      height: 8 + Math.random()*10,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #FFD700 0%, #fffbe6 80%, transparent 100%)',
                      opacity: 0.7 + Math.random()*0.3,
                      filter: 'blur(2px)',
                      animation: `loversParticleFloat${i%3} 2.${i+2}s ease-in-out infinite`,
                      animationDelay: `${Math.random()*2}s`,
                    }} />
                  ))}
              </div>
                {/* Logo animado */}
                <img src={MiGustoTitulo} alt="Mi Gusto" style={{
                  height: 54,
                  maxWidth: 180,
                  display: 'block',
                  filter: 'drop-shadow(0 0 32px #FFD700cc) drop-shadow(0 0 12px #e53935) drop-shadow(0 0 8px #fffbe6)',
                  zIndex: 2,
                  animation: 'heartbeat 1.5s infinite',
                  userSelect: 'none',
                }} />
                <style>{`
                  @keyframes loversParticleFloat0 {
                    0% { transform: translateY(0); opacity: 0.7; }
                    50% { transform: translateY(-18px); opacity: 1; }
                    100% { transform: translateY(0); opacity: 0.7; }
                  }
                  @keyframes loversParticleFloat1 {
                    0% { transform: translateY(0); opacity: 0.8; }
                    50% { transform: translateY(12px); opacity: 1; }
                    100% { transform: translateY(0); opacity: 0.8; }
                  }
                  @keyframes loversParticleFloat2 {
                    0% { transform: translateY(0); opacity: 0.9; }
                    50% { transform: translateY(-10px); opacity: 1; }
                    100% { transform: translateY(0); opacity: 0.9; }
                  }
                `}</style>
            </div>
            </div>
            {/* DERECHA: Instagram */}
              <div style={{display: 'flex', alignItems: 'center', gap: 8, color: '#FFD700'}}>
                <a 
                  href="https://www.instagram.com/migustoar/?hl=es" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{display: 'flex', alignItems: 'center', gap: 8, color: '#FFD700', textDecoration: 'none'}}
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    style={{color: '#FFD700'}}
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                {windowWidth > 900 && (
                  <span style={{fontSize: '1rem', color: '#FFD700'}}>MiGustoAR</span>
                )}
                </a>
            </div>
          </div>
        ) : (
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.7rem 0.7rem 0.5rem 0.7rem',
            position: 'relative',
            background: 'transparent',
            minHeight: 60
          }}>
            {/* Switch a la izquierda */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', minWidth: 70}}>
              <Switch
                isOn={isSwitchOn}
                onClick={() => {
                  setIsSwitchOn(true);
                  setTimeout(() => {
                    window.location.href = '/';
                  }, 350);
                }}
              />
            </div>
            {/* MiGustoTitulo centrado con efectos */}
            <div style={{position: 'absolute', left: windowWidth <= 900 ? '56%' : '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2}}>
              {/* Partículas doradas animadas */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'visible',
              }}>
                {Array.from({length: 10}).map((_, i) => (
                  <span key={i} style={{
                    position: 'absolute',
                    left: `${Math.random()*100}%`,
                    top: `${Math.random()*100}%`,
                    width: 6 + Math.random()*8,
                    height: 6 + Math.random()*8,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #FFD700 0%, #fffbe6 80%, transparent 100%)',
                    opacity: 0.7 + Math.random()*0.3,
                    filter: 'blur(1.5px)',
                    animation: `loversParticleFloat${i%3} 3.${i+2}s ease-in-out infinite`,
                    animationDelay: `${Math.random()*2}s`,
                  }} />
                ))}
              </div>
              <img src={MiGustoTitulo} alt="Mi Gusto Lovers Club" className="logo-migusto-navbar" style={{height: 48, maxWidth: 140, display: 'block', filter: 'drop-shadow(0 0 18px #FFD700cc) drop-shadow(0 0 8px #e53935) drop-shadow(0 0 4px #fffbe6)', zIndex: 2, animation: 'heartbeat 1.5s infinite', userSelect: 'none'}} />
              <style>{`
                @keyframes loversParticleFloat0 {
                  0% { transform: translateY(0); opacity: 0.7; }
                  50% { transform: translateY(-12px); opacity: 1; }
                  100% { transform: translateY(0); opacity: 0.7; }
                }
                @keyframes loversParticleFloat1 {
                  0% { transform: translateY(0); opacity: 0.8; }
                  50% { transform: translateY(8px); opacity: 1; }
                  100% { transform: translateY(0); opacity: 0.8; }
                }
                @keyframes loversParticleFloat2 {
                  0% { transform: translateY(0); opacity: 0.9; }
                  50% { transform: translateY(-7px); opacity: 1; }
                  100% { transform: translateY(0); opacity: 0.9; }
                }
              `}</style>
            </div>
            {/* Instagram a la derecha */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 40}}>
              <a 
                href="https://www.instagram.com/migustoar/?hl=es" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{display: 'flex', alignItems: 'center', color: '#FFD700', textDecoration: 'none'}}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  style={{color: '#FFD700'}}
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        )}
      </header>
      <div
        style={{
          background: window.innerWidth > 900
            ? `linear-gradient(rgba(24,24,24,0.72), rgba(24,24,24,0.82)), url(${backgroundText}) center/cover no-repeat fixed`
            : `linear-gradient(rgba(24,24,24,0.72), rgba(24,24,24,0.82)), url(${backgroundText}) center/cover no-repeat`,
          width: '100vw',
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          boxSizing: 'border-box',
          willChange: 'transform',
          transform: 'translateZ(0)',
          // Quitar blur en mobile
          backdropFilter: window.innerWidth > 900 ? 'blur(8px)' : undefined,
        }}
      >
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="container-responsive"
            style={{
              width: '100%',
              minWidth: '0',
              maxWidth: '100%',
              boxSizing: 'border-box',
              overflowX: 'hidden',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: windowWidth > 900 ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: windowWidth > 900 ? 24 : 0,
              background: 'transparent',
              position: 'relative',
              willChange: 'transform', // aceleración por hardware
              transform: 'translateZ(0)', // aceleración por hardware
            }}
          >
            {/* Empanadas caen por encima del texto pero detrás de las cards y el form */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              pointerEvents: 'none',
            }}>
              <ParticlesBG />
                </div>
          {/* Columna izquierda: Hero y cards */}
            <div
              style={{
                flex: 1.1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                boxSizing: 'border-box',
                padding: 0,
                margin: 0,
                maxWidth: windowWidth > 900 ? 520 : '100%',
                marginBottom: windowWidth <= 900 ? 18 : 0,
                position: 'relative',
                marginTop: 32,
                zIndex: 3,
              }}
            >
              <div style={{
                textAlign: windowWidth <= 900 ? 'center' : 'left',
                marginBottom: 18,
                alignItems: windowWidth <= 900 ? 'center' : 'flex-start',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                position: 'relative',
                zIndex: 1,
              }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'none',
                    border: '1.5px solid #FFD700',
                    boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)',
                    borderRadius: 32,
                    padding: '0.5rem 1.2rem',
                    marginBottom: 14,
                    marginTop: 14,
                    justifyContent: 'center',
                    width: windowWidth <= 900 ? '100%' : 'auto',
                    transition: 'box-shadow 0.3s, border 0.3s',
                    position: 'relative',
                    overflow: 'visible',
                  }}
                >
                <Star style={{width: 15, height: 15, color: '#FFD700', marginRight: 6}} />
                  <span style={{
                    fontWeight: 900,
                    fontSize: '1.08rem',
                    letterSpacing: 0.5,
                    background: 'linear-gradient(90deg, #FFD700 0%, #fffbe6 25%, #e53935 50%, #f7c873 75%, #FFD700 100%)',
                    backgroundSize: '200% auto',
                    color: '#FFD700',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'metallicShine 2.8s linear infinite',
                    zIndex: 2,
                    userSelect: 'none',
                    position: 'relative',
                  }}>
                    Programa Exclusivo de Beneficios
                  </span>
                  <style>{`
                    @keyframes metallicShine {
                      0% { background-position: 0% 50%; }
                      100% { background-position: 200% 50%; }
                    }
                  `}</style>
            </div>
                <h1 className="title-druk text-outline-gold animated-title floating-title" style={{
                  fontSize: '2.1rem', 
                  fontWeight: 900, 
                  color: '#FFD700', 
                  marginBottom: 16, 
                  letterSpacing: 0.5, 
                  textAlign: windowWidth <= 900 ? 'center' : 'left', 
                  width: '100%', 
                  textShadow: '0 2px 18px #FFD700cc, 0 0px 2px #f8e434, 1px 1px 0 #181818',
                  position: 'relative',
                  fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  animation: 'textGlowPulse 3s ease-in-out infinite',
                }}>
                  <span style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'inline-block',
                    animation: 'textFloat 6s ease-in-out infinite',
                    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 900,
                    letterSpacing: 0.5,
                  }}>
                    Mi Gusto Lovers
                  </span>
                </h1>
                <p className="text-specter text-outline-gold animated-subtitle floating-subtitle" style={{
                  fontSize: '1.15rem', 
                  color: '#ffffff', 
                  marginBottom: 18, 
                  maxWidth: 420, 
                  lineHeight: 1.6, 
                  textAlign: windowWidth <= 900 ? 'center' : 'left', 
                  width: '100%', 
                  marginLeft: windowWidth <= 900 ? 'auto' : 0, 
                  marginRight: windowWidth <= 900 ? 'auto' : 0, 
                  fontWeight: 400,
                  letterSpacing: 0.1,
                  fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)',
                  animation: 'subtitleGlow 4s ease-in-out infinite',
                }}>
              Únete a nuestro programa exclusivo y disfruta de beneficios únicos, descuentos especiales 
              y experiencias gastronómicas irrepetibles en todas nuestras sucursales.
            </p>
                <style>{`
                  @keyframes gradientTextFlow {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                  }
                  @keyframes textGlowPulse {
                    0%, 100% { 
                      text-shadow: 0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.2);
                    }
                    50% { 
                      text-shadow: 0 0 30px rgba(255,215,0,1), 0 0 60px rgba(255,215,0,0.6), 0 0 90px rgba(255,215,0,0.3);
                    }
                  }
                  @keyframes textFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    25% { transform: translateY(-3px) rotate(0.5deg); }
                    50% { transform: translateY(2px) rotate(-0.3deg); }
                    75% { transform: translateY(-1px) rotate(0.2deg); }
                  }
                  @keyframes textShineMove {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                  }
                  @keyframes titleParticleFloat0 {
                    0% { transform: translateY(0) scale(1); opacity: 0.7; }
                    50% { transform: translateY(-10px) scale(1.3); opacity: 1; }
                    100% { transform: translateY(0) scale(1); opacity: 0.7; }
                  }
                  @keyframes titleParticleFloat1 {
                    0% { transform: translateY(0) scale(1); opacity: 0.8; }
                    50% { transform: translateY(8px) scale(0.7); opacity: 1; }
                    100% { transform: translateY(0) scale(1); opacity: 0.8; }
                  }
                  @keyframes titleParticleFloat2 {
                    0% { transform: translateY(0) scale(1); opacity: 0.9; }
                    50% { transform: translateY(-6px) scale(1.2); opacity: 1; }
                    100% { transform: translateY(0) scale(1); opacity: 0.9; }
                  }
                  @keyframes subtitleGlow {
                    0%, 100% { 
                      text-shadow: 0 0 15px rgba(255,215,0,0.6), 0 0 30px rgba(255,215,0,0.3);
                    }
                    50% { 
                      text-shadow: 0 0 25px rgba(255,215,0,0.8), 0 0 45px rgba(255,215,0,0.5);
                    }
                  }
                `}</style>
                <div className="benefits-cards-mobile" style={{
                  display: windowWidth > 900 ? 'flex' : 'grid',
                  flexWrap: windowWidth > 900 ? 'wrap' : undefined,
                  gridTemplateColumns: windowWidth <= 900 ? '1fr 1fr' : undefined,
                  gap: 16,
                  justifyItems: windowWidth <= 900 ? 'center' : undefined,
                  alignItems: windowWidth <= 900 ? 'stretch' : undefined,
                  width: '100%',
                  margin: windowWidth <= 900 ? '0 auto 18px auto' : '18px 0 0 0',
                  position: 'relative',
                  zIndex: 3,
                }}>
                  <div className="glass-card fade-in-up" style={{minWidth: 160, maxWidth: 180, textAlign: 'center', border: '1.5px solid #FFD700', boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)', padding: '1.1rem 0.7rem', background: 'rgba(24,24,24,0.82)'}}>
                  <div className="icon-anim" style={{width: 32, height: 32, background: 'rgba(255,215,0,0.13)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.7rem auto'}}>
                    <Gift style={{width: 18, height: 18, color: '#FFD700'}} />
                  </div>
                    <h3 className="text-bebas" style={{color: '#FFD700', fontWeight: 700, marginBottom: 7, fontSize: '1.05rem'}}>Descuentos</h3>
                    <p className="text-specter-light" style={{color: '#fff', fontSize: '0.92rem'}}>Hasta 25% de descuento y promos especiales.</p>
                </div>
                  <div className="glass-card fade-in-up" style={{minWidth: 160, maxWidth: 180, textAlign: 'center', border: '1.5px solid #FFD700', boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)', padding: '1.1rem 0.7rem', background: 'rgba(24,24,24,0.82)'}}>
                  <div className="icon-anim" style={{width: 32, height: 32, background: 'rgba(255,215,0,0.13)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.7rem auto'}}>
                    <Users style={{width: 18, height: 18, color: '#FFD700'}} />
                  </div>
                    <h3 className="text-bebas" style={{color: '#FFD700', fontWeight: 700, marginBottom: 7, fontSize: '1.05rem'}}>Eventos</h3>
                    <p className="text-specter-light" style={{color: '#fff', fontSize: '0.92rem'}}>Cenas, catas y eventos únicos.</p>
                </div>
                  <div className="glass-card fade-in-up" style={{minWidth: 160, maxWidth: 180, textAlign: 'center', border: '1.5px solid #FFD700', boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)', padding: '1.1rem 0.7rem', background: 'rgba(24,24,24,0.82)'}}>
                  <div className="icon-anim" style={{width: 32, height: 32, background: 'rgba(255,215,0,0.13)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.7rem auto'}}>
                    <Star style={{width: 18, height: 18, color: '#FFD700'}} />
              </div>
                    <h3 className="text-bebas" style={{color: '#FFD700', fontWeight: 700, marginBottom: 7, fontSize: '1.05rem'}}>VIP</h3>
                    <p className="text-specter-light" style={{color: '#fff', fontSize: '0.92rem'}}>Reservas y atención prioritaria.</p>
                </div>
                  <div className="glass-card fade-in-up" style={{minWidth: 160, maxWidth: 180, textAlign: 'center', border: '1.5px solid #FFD700', boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)', padding: '1.1rem 0.7rem', background: 'rgba(24,24,24,0.82)'}}>
                  <div className="icon-anim" style={{width: 32, height: 32, background: 'rgba(255,215,0,0.13)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.7rem auto'}}>
                    <Gift style={{width: 18, height: 18, color: '#FFD700'}} />
              </div>
                    <h3 className="text-bebas" style={{color: '#FFD700', fontWeight: 700, marginBottom: 7, fontSize: '1.05rem'}}>Sorteos y Premios</h3>
                    <p className="text-specter-light" style={{color: '#fff', fontSize: '0.92rem'}}>Participa por premios y experiencias exclusivas.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Columna derecha: Formulario */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%',
                boxSizing: 'border-box',
                padding: 0,
                margin: 0,
                maxWidth: windowWidth > 900 ? 600 : '100%',
                position: 'relative',
                zIndex: 3,
              }}
            >
              <div
                className="glass-card fade-in-right"
                style={{
                  border: '1.5px solid #FFD700',
                  boxShadow: '0 2px 12px 0 rgba(255,215,0,0.10)',
                  padding: windowWidth <= 900 ? '1.2rem 0.5rem' : '2.2rem 2.2rem 2.2rem 2.2rem',
                  width: '100%',
                  maxWidth: windowWidth <= 900 ? '100%' : 600,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: 'rgba(24,24,24,0.82)',
                  marginTop: 32
                }}
              >
              <div style={{textAlign: 'center', marginBottom: 18}}>
                  <h2 className="title-druk" style={{color: '#FFD700', fontWeight: 800, fontSize: '1.25rem', marginBottom: 8}}>
                  Únete a Mi Gusto Lovers
                </h2>
                  <p className="text-specter" style={{color: '#FFD700', fontSize: '0.98rem'}}>
                  Completa tus datos y comienza a disfrutar de beneficios exclusivos
                </p>
              </div>
                <form
                  onSubmit={handleSubmit}
                  style={{ width: '100%', boxSizing: 'border-box', overflowX: 'hidden', padding: 0, margin: 0 }}
                >
                {/* Primera fila: Nombre y Email */}
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 28, rowGap: 0, marginBottom: 12, width: '100%', boxSizing: 'border-box'}}>
                  <div style={{width: '100%'}}>
                    <label htmlFor="nombre">Nombre completo *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={`form-field-short${errors.nombre ? ' input-error' : ''}`}
                      placeholder="Tu nombre completo"
                    />
                    {errors.nombre && (
                      <p style={{color: '#ff4d4f', fontSize: '1rem', margin: 0}}>{errors.nombre}</p>
                    )}
                  </div>
                  <div style={{width: '100%'}}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-field-short${errors.email ? ' input-error' : ''}`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p style={{color: '#ff4d4f', fontSize: '1rem', margin: 0}}>{errors.email}</p>
                    )}
                  </div>
                </div>
                {/* Nueva fila: Cumpleaños y Sabores */}
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 28, rowGap: 0, marginBottom: 12, width: '100%', boxSizing: 'border-box'}}>
                  <div style={{width: '100%'}}>
                    <label>Fecha de cumpleaños *</label>
                    <div style={{position: 'relative', marginBottom: 8, width: '100%'}}>
                      <DatePicker
                        selected={formData.cumple ? new Date(formData.cumple + 'T00:00:00') : null}
                        onChange={(date: Date | null) => {
                          if (date) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const formattedDate = `${year}-${month}-${day}`;
                            setFormData(prev => ({
                              ...prev,
                              cumple: formattedDate
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              cumple: ''
                            }));
                          }
                          if (errors.cumple) {
                            setErrors(prev => ({ ...prev, cumple: undefined }));
                          }
                        }}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        placeholderText="Elegir mi cumpleaños"
                        className={`btn-select form-field-short${errors.cumple ? ' input-error' : ''}`}
                        wrapperClassName="datepicker-wrapper"
                        popperClassName="datepicker-popper"
                        popperPlacement="bottom-start"
                        showPopperArrow={false}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        locale="es"
                        customInput={
                          <button
                            type="button"
                            className={`btn-select form-field-short${errors.cumple ? ' input-error' : ''}`}
                            style={{
                              width: '100%',
                              height: '51px',
                              boxSizing: 'border-box',
                              justifyContent: 'space-between',
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '1.05rem',
                              padding: '0 1.2rem',
                              color: '#FFD700',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {formData.cumple
                              ? new Date(formData.cumple + 'T00:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })
                              : 'Elegir mi cumpleaños'}
                            <span style={{marginLeft: 8, flexShrink: 0}}>
                              📅
                            </span>
                          </button>
                        }
                      />
                    </div>
                    <small style={{color: '#FFD700', fontSize: '0.95rem'}}>Solo para saludarte en tu día :)</small>
                    {errors.cumple && (
                      <p style={{color: '#ff4d4f', fontSize: '1rem', margin: 0}}>{errors.cumple}</p>
                    )}
                  </div>
                  <div style={{width: '100%'}}>
                    <label>Tus 3 sabores favoritos *</label>
                    <div style={{position: 'relative', marginBottom: 8, width: '100%'}} ref={saboresDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setSaboresDropdownOpen(v => !v)}
                        aria-expanded={saboresDropdownOpen}
                        className={`btn-select form-field-short${errors.saboresFavoritos ? ' input-error' : ''}`}
                        style={{
                          width: '100%',
                          height: '51px',
                          boxSizing: 'border-box',
                          justifyContent: 'space-between',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '0.97rem',
                          fontWeight: 500,
                          padding: '0',
                          color: '#FFD700',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          border: 'none',
                          margin: 0
                        }}
                      >
                        {formData.saboresFavoritos.length === 0 ? 'Elegir mis 3 sabores favoritos' : 'Editar sabores favoritos'}
                        <span style={{marginLeft: 8, transition: 'transform 0.2s', transform: saboresDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0}}>
                          ▼
                        </span>
                      </button>
                      {saboresDropdownOpen && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '110%',
                            left: 0,
                            zIndex: 100,
                            background: 'rgba(24,24,24,0.97)',
                            border: '1.5px solid #FFD700',
                            borderRadius: 18,
                            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                            padding: '1.1rem 1.1rem 0.7rem 1.1rem',
                            width: '100%',
                            minHeight: 80,
                            maxHeight: 260,
                            overflowY: 'auto',
                            animation: 'fadeInDropdown 0.22s',
                          }}
                        >
                          <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 6, marginTop: 2}}>
                            {sabores.map(sabor => (
                              <button
                                type="button"
                                key={sabor}
                                onClick={() => handleSaborChipClick(sabor)}
                                className={formData.saboresFavoritos.includes(sabor) ? 'chip-sabor chip-sabor-selected' : 'chip-sabor'}
                                style={{
                                  border: '1.5px solid #FFD700',
                                  borderRadius: 18,
                                  padding: '0.45rem 1.1rem',
                                  background: formData.saboresFavoritos.includes(sabor) ? 'linear-gradient(90deg, #FFD700 0%, #f7c873 100%)' : 'rgba(24,24,24,0.55)',
                                  color: formData.saboresFavoritos.includes(sabor) ? '#181818' : '#FFD700',
                                  fontWeight: 600,
                                  fontSize: '1.01rem',
                                  cursor: 'pointer',
                                  boxShadow: formData.saboresFavoritos.includes(sabor) ? '0 2px 10px 0 rgba(255,215,0,0.13)' : 'none',
                                  transition: 'all 0.18s',
                                  outline: 'none',
                                  marginBottom: 4
                                }}
                                disabled={
                                  !formData.saboresFavoritos.includes(sabor) && formData.saboresFavoritos.length >= 3
                                }
                              >
                                {sabor}
                              </button>
                            ))}
                          </div>
                          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <button
                              type="button"
                              className="btn"
                              style={{fontSize: '1rem', padding: '0.4rem 1.2rem', borderRadius: 12, marginTop: 6}}
                              onClick={() => setSaboresDropdownOpen(false)}
                            >
                              Listo
                            </button>
                          </div>
                        </div>
                      )}
                      {/* Chips resumen */}
                      {formData.saboresFavoritos.length > 0 && !saboresDropdownOpen && (
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8}}>
                          {formData.saboresFavoritos.map(sabor => (
                            <span
                              key={sabor}
                              style={{
                                border: '1.5px solid #FFD700',
                                borderRadius: 14,
                                padding: '0.22rem 0.8rem',
                                background: 'rgba(255,215,0,0.13)',
                                color: '#FFD700',
                                fontWeight: 600,
                                fontSize: '0.98rem',
                                marginBottom: 2
                              }}
                            >
                              {sabor}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <small style={{color: '#FFD700', fontSize: '0.95rem'}}>Puedes elegir hasta 3 sabores</small>
                    {errors.saboresFavoritos && (
                      <p style={{color: '#ff4d4f', fontSize: '1rem', margin: 0}}>{errors.saboresFavoritos}</p>
                    )}
                  </div>
                </div>
                {/* Segunda fila: Teléfono y Sucursal */}
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 28, rowGap: 0, marginBottom: 12, width: '100%', boxSizing: 'border-box'}}>
                  <div style={{width: '100%'}}>
                    <label htmlFor="telefono">Teléfono *</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className={`form-field-short${errors.telefono ? ' input-error' : ''}`}
                      placeholder="+54 11 1234-5678"
                    />
                    {errors.telefono && (
                      <p style={{color: '#ff4d4f', fontSize: '1rem', margin: 0}}>{errors.telefono}</p>
                    )}
                  </div>
                  <div style={{width: '100%'}}>
                    <label htmlFor="sucursal">Sucursal habitual *</label>
                    <div style={{width: '100%', marginLeft: 0}}>
                      <select
                        id="sucursal"
                        name="sucursal"
                        value={formData.sucursal}
                        onChange={handleInputChange}
                        className={`form-field-short${errors.sucursal ? ' input-error' : ''}`}
                        style={{
                          width: '100%',
                          height: '51px',
                          boxSizing: 'border-box',
                          padding: '0',
                          border: 'none',
                          margin: 0
                        }}
                      >
                        <option value="" style={{color: '#FFD700'}}>Selecciona una sucursal</option>
                        {sucursales.map(suc => (
                          <option key={suc} value={suc}>{suc}</option>
                        ))}
                      </select>
                    </div>
                    {errors.sucursal && (
                      <p style={{color: '#ff4d4f', fontSize: '1rem', margin: 0}}>{errors.sucursal}</p>
                    )}
                  </div>
                </div>
                {/* Tercera fila: ¿Ya eres cliente? y botón */}
                <div style={{display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 12, flexWrap: 'wrap'}}>
                  <div style={{flex: 1, minWidth: 0}}>
                    <label>¿Ya eres cliente de Mi Gusto? *</label>
                    <div style={{display: 'flex', gap: 24, marginTop: 8}}>
                      <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <input
                        type="radio"
                        name="esCliente"
                        value="si"
                        checked={formData.esCliente === 'si'}
                        onChange={handleInputChange}
                            style={{accentColor: '#e53935'}}
                      />
                        <span style={{color: '#fff'}}>Sí</span>
                    </label>
                      <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <input
                        type="radio"
                        name="esCliente"
                        value="no"
                        checked={formData.esCliente === 'no'}
                        onChange={handleInputChange}
                            style={{accentColor: '#e53935'}}
                      />
                        <span style={{color: '#fff'}}>No</span>
                    </label>
                  </div>
                  {errors.esCliente && (
                      <p style={{color: '#ff4d4f', fontSize: '1rem', margin: 0}}>{errors.esCliente}</p>
                  )}
                </div>
                  <div style={{flex: 1, minWidth: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <button type="submit" className="btn btn-shine form-field-short" style={{marginTop: 0}} disabled={isSubmitting}>
                      {isSubmitting ? 'Enviando...' : 'Unirme ahora'}
                    </button>
                  </div>
                </div>
                {/* Beneficios */}
                <div style={{marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12}}>
                    <input
                      type="checkbox"
                      id="aceptaBeneficios"
                      name="aceptaBeneficios"
                      checked={formData.aceptaBeneficios}
                      onChange={handleInputChange}
                      style={{accentColor: '#e53935', width: 18, height: 18, margin: 0}}
                    />
                  <label htmlFor="aceptaBeneficios" style={{margin: 0, color: '#FFD700', fontWeight: 500, fontSize: '1rem', cursor: 'pointer'}}>
                    Quiero recibir novedades y beneficios exclusivos
                  </label>
                </div>
                <div>
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFD700',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      fontSize: '0.98rem',
                      marginTop: 4
                    }}
                    onClick={() => setShowPrivacidad(true)}
                  >
                    Ver políticas de privacidad
                  </button>
                </div>
                  <input type="hidden" name="cumple" value={formData.cumple} />
                  <input type="hidden" name="saboresFavoritos" value={formData.saboresFavoritos.join(', ')} />
                  <input type="hidden" name="formToken" value={securityService.generateFormToken()} />
                  <input type="hidden" name="_subject" value="Nuevo registro Mi Gusto Lovers" />
                  <input type="hidden" name="_template" value="table" />
              </form>
              </div>
          </div>
        </div>
      </section>
              </div>

      {/* Modal de Privacidad */}
      {showPrivacidad && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(12px)',
            animation: 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden'
          }}
          onClick={() => setShowPrivacidad(false)}
        >
          <div 
            className="modal-content"
            style={{
              background: 'linear-gradient(135deg, #181818 0%, #232526 50%, #181818 100%)',
              color: '#fff',
              borderRadius: 24,
              maxWidth: 580,
              width: '90%',
              padding: '3rem',
              boxShadow: 
                '0 20px 60px rgba(0,0,0,0.4), 0 8px 32px rgba(229, 57, 53, 0.2), 0 0 0 1px rgba(255, 255, 1, 0.1)',
              position: 'relative',
              margin: 'auto',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              maxHeight: '90vh',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#ffff01 #181818',
              zIndex: 1000000,
              animation: 'modalSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Borde animado gradiente */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 'inherit',
              padding: 2,
              background: 'linear-gradient(135deg, #ffff01, #e53935, #ffff01, #e53935)',
              backgroundSize: '300% 300%',
              animation: 'modalBorderGlow 4s ease-in-out infinite',
              zIndex: -1
            }} />
            
            {/* Botón de cerrar mejorado */}
            <button
              onClick={() => setShowPrivacidad(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'linear-gradient(135deg, rgba(255, 255, 1, 0.15) 0%, rgba(229, 57, 53, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 1, 0.3)',
                color: '#ffff01',
                fontSize: 28,
                cursor: 'pointer',
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 1,
                boxShadow: '0 4px 12px rgba(255, 255, 1, 0.2)',
                fontWeight: 600
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 1, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 1, 0.2)';
              }}
              aria-label="Cerrar"
            >
              ×
            </button>

            {/* Título con efectos */}
            <h2 style={{ 
              color: '#ffff01', 
              marginBottom: 32, 
              fontSize: '2rem', 
              paddingRight: 40,
              fontWeight: 800,
              textAlign: 'center',
              textShadow: 
                '0 0 20px rgba(255, 255, 1, 0.6), 0 0 40px rgba(255, 255, 1, 0.3), 0 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: 1,
              animation: 'titleGlow 3s ease-in-out infinite'
            }}>
              Política de Privacidad y Legales
            </h2>

            {/* Contenido con scroll mejorado */}
            <div style={{ 
              fontSize: '1.05rem', 
              lineHeight: 1.7, 
              maxHeight: 'calc(90vh - 180px)', 
              overflowY: 'auto',
              paddingRight: 16,
              scrollbarWidth: 'thin',
              scrollbarColor: '#ffff01 #181818'
            }}>
              <div style={{
                marginBottom: 28,
                paddingBottom: 28,
                borderBottom: '1px solid rgba(255, 255, 1, 0.2)',
                animation: 'fadeInUp 0.6s ease-out'
              }}>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: 0,
                  fontSize: '1.05rem',
                  fontWeight: 400
                }}>
                  En <span style={{color: '#ffff01', fontWeight: 700}}>Mi Gusto Lovers</span> valoramos tu privacidad. Los datos que recolectamos (nombre, email, teléfono, cumpleaños, sabores favoritos, etc.) se utilizan únicamente para gestionar tu membresía, enviarte novedades y mejorar nuestros servicios.
                </p>
              </div>

              <div style={{
                marginBottom: 28,
                paddingBottom: 28,
                borderBottom: '1px solid rgba(255, 255, 1, 0.2)',
                animation: 'fadeInUp 0.6s ease-out 0.1s both'
              }}>
                <h3 style={{
                  color: '#e53935',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: 16,
                  textShadow: '0 0 10px rgba(229, 57, 53, 0.4)'
                }}>
                  ¿Qué datos recolectamos?
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: 0,
                  fontSize: '1.05rem'
                }}>
                  Solo los que tú nos proporcionas voluntariamente en el formulario de registro.
                </p>
              </div>

              <div style={{
                marginBottom: 28,
                paddingBottom: 28,
                borderBottom: '1px solid rgba(255, 255, 1, 0.2)',
                animation: 'fadeInUp 0.6s ease-out 0.2s both'
              }}>
                <h3 style={{
                  color: '#e53935',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: 16,
                  textShadow: '0 0 10px rgba(229, 57, 53, 0.4)'
                }}>
                  ¿Para qué usamos tus datos?
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: 0,
                  fontSize: '1.05rem'
                }}>
                  Para enviarte novedades, promociones, beneficios exclusivos y mejorar tu experiencia como miembro.
                </p>
              </div>

              <div style={{
                marginBottom: 28,
                paddingBottom: 28,
                borderBottom: '1px solid rgba(255, 255, 1, 0.2)',
                animation: 'fadeInUp 0.6s ease-out 0.3s both'
              }}>
                <h3 style={{
                  color: '#e53935',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: 16,
                  textShadow: '0 0 10px rgba(229, 57, 53, 0.4)'
                }}>
                  ¿Con quién compartimos tus datos?
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: 0,
                  fontSize: '1.05rem'
                }}>
                  No compartimos tu información con terceros, salvo obligación legal.
                </p>
              </div>

              <div style={{
                marginBottom: 28,
                paddingBottom: 28,
                borderBottom: '1px solid rgba(255, 255, 1, 0.2)',
                animation: 'fadeInUp 0.6s ease-out 0.4s both'
              }}>
                <h3 style={{
                  color: '#e53935',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: 16,
                  textShadow: '0 0 10px rgba(229, 57, 53, 0.4)'
                }}>
                  ¿Cómo protegemos tus datos?
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: 0,
                  fontSize: '1.05rem'
                }}>
                  Aplicamos medidas de seguridad técnicas y organizativas para proteger tu información.
                </p>
              </div>

              <div style={{
                marginBottom: 28,
                paddingBottom: 28,
                borderBottom: '1px solid rgba(255, 255, 1, 0.2)',
                animation: 'fadeInUp 0.6s ease-out 0.5s both'
              }}>
                <h3 style={{
                  color: '#e53935',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: 16,
                  textShadow: '0 0 10px rgba(229, 57, 53, 0.4)'
                }}>
                  ¿Cuáles son tus derechos?
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: 0,
                  fontSize: '1.05rem'
                }}>
                  Puedes solicitar la modificación o eliminación de tus datos en cualquier momento escribiendo a{' '}
                  <a href="mailto:contacto@migusto.com.ar" style={{
                    color: '#ffff01',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    borderBottom: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottomColor = '#ffff01';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 255, 1, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottomColor = 'transparent';
                    e.currentTarget.style.textShadow = 'none';
                  }}>
                    contacto@migusto.com.ar
                  </a>
                </p>
              </div>

              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.6s both'
              }}>
                <p style={{ 
                  color: '#e53935', 
                  fontSize: '1rem', 
                  fontWeight: 600,
                  marginBottom: 0,
                  textAlign: 'center',
                  padding: '16px',
                  background: 'rgba(229, 57, 53, 0.1)',
                  borderRadius: 12,
                  border: '1px solid rgba(229, 57, 53, 0.3)',
                  textShadow: '0 0 8px rgba(229, 57, 53, 0.3)'
                }}>
                  Al registrarte, aceptas nuestra política de privacidad y el uso de tus datos según lo aquí expuesto.
                </p>
              </div>
            </div>

            {/* Estilos CSS para las animaciones */}
            <style>{`
              @keyframes modalSlideIn {
                from {
                  opacity: 0;
                  transform: translateY(30px) scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              
              @keyframes modalBorderGlow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
              
              @keyframes titleGlow {
                0%, 100% { 
                  text-shadow: 0 0 20px rgba(255, 255, 1, 0.6), 0 0 40px rgba(255, 255, 1, 0.3), 0 2px 4px rgba(0,0,0,0.5);
                }
                50% { 
                  text-shadow: 0 0 30px rgba(255, 255, 1, 0.8), 0 0 60px rgba(255, 255, 1, 0.5), 0 2px 4px rgba(0,0,0,0.5);
                }
              }
              
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              /* Scrollbar personalizado */
              ::-webkit-scrollbar {
                width: 8px;
              }
              ::-webkit-scrollbar-track {
                background: #181818;
                border-radius: 4px;
              }
              ::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #ffff01, #e53935);
                border-radius: 4px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, #ffff66, #ff6b6b);
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;