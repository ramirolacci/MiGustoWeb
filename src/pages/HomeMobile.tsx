import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Buscador from '../components/Buscador';
import './HomeMobile.css';
import { promosDestacadasService, combosImperdiblesService, type MobilePromoSlide } from '../services/sliderService';
import OptimizedImage from '../components/OptimizedImage';

// Importar bases de datos para búsqueda inteligente en mobile
import { sucursales as sucursalesData } from '../data/sucursalesData';
import { pizzas as pizzasData } from '../data/pizzasData';
import { empanadas as empanadasData } from '../data/empanadasData';
import { fitzzas as fitzzasData } from '../data/fitzzasData';
import { pizzasIndi as pizzasIndiData } from '../data/pizzasIndiData';
import { salsas as salsasData } from '../data/salsasData';
import { postres as postresData } from '../data/postresData';
import { promociones as promocionesData } from '../data/promocionesData';

type Slide = MobilePromoSlide & { bg?: string };

const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < breakpoint);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
};

function PromoCarousel({ title, slides, isDestacadas = false }: { title: string; slides: Slide[]; isDestacadas?: boolean }) {
  // Eliminamos estado de lightbox
  return (
    <section className="hm-section">
      <h3 className="hm-section-title">{title}</h3>
      <div className="hm-carousel" aria-label={title}>
        {slides.map((s) => (
          <div key={s.id} className="hm-card-container">
            <a
              href="https://pedir.migusto.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className={isDestacadas ? "hm-card hm-card-destacadas" : "hm-card hm-card-other"}
              aria-label={s.title || 'Promo'}
            >
              {s.image && (
                <OptimizedImage
                  src={s.image}
                  alt={s.title || 'Promo'}
                  className="hm-card-img"
                  sizes="(max-width: 480px) 66vw, 420px"
                  srcSet={`
                    ${s.image} 800w
                  `}
                />
              )}
              {/* Ocultamos texto sobre las promos destacadas por pedido */}
            </a>
            {/* Información de producto y precio para cada card */}
            {s.productName && s.price && (
              <div className="hm-card-price-info">
                <span className="hm-card-product">{s.productName}</span>
                <span className="hm-card-price">{s.price}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Generar empanadas una sola vez para evitar que cambien de posición
const generateEmpanadas = () => {
  const imgs = [
    'https://i.postimg.cc/9FTt4mc3/burger.png',
    'https://i.postimg.cc/9Ftb8mKd/cheese-burger.png',
    'https://i.postimg.cc/sXTmjwPT/Matambre-a-la-pizza.png',
    'https://i.postimg.cc/hGWzWcVs/Mexican-Pibil-Pork.png'
  ];  
  
  return Array.from({ length: 22 }).map((_, i) => {
    const left = Math.random() * 100;
    const size = 42 + Math.random() * 46;
    const delay = -Math.random() * 10;
    const duration = 8 + Math.random() * 10;
    const img = imgs[Math.floor(Math.random() * imgs.length)];
    
    return {
      id: `rain-${i}`,
      src: img,
      left,
      size,
      delay,
      duration
    };
  });
};

const EMPANADAS_DATA = generateEmpanadas();

const HOME_VIDEOS = [
  '/videos/promotional/VideoFlash.mp4',
  '/videos/promotional/VideoFlash (1).mp4',
  '/videos/promotional/VideoFlash (2).mp4'
];

export default function HomeMobile() {
  const [selectedVideo] = useState(() => {
    const randomIndex = Math.floor(Math.random() * HOME_VIDEOS.length);
    return HOME_VIDEOS[randomIndex];
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [filtro, setFiltro] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [promoSlides, setPromoSlides] = useState<Slide[]>([]);
  const [moreSlides, setMoreSlides] = useState<Slide[]>([]);

  useEffect(() => {
    setPromoSlides(promosDestacadasService.getAll());
    setMoreSlides(combosImperdiblesService.getAll());
  }, []);

  const handleCategory = (key: string) => {
    navigate(`/productos#${key}`);
  };

  // Asegura que en desktop se redirija al Home clásico
  useEffect(() => {
    if (!isMobile) navigate('/', { replace: true });
  }, [isMobile]);

  // Controlar visibilidad del buscador al hacer scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateSearchVisibility = () => {
      const currentScrollY = window.scrollY;
      
      // Si el scroll es hacia abajo y hemos scrolleado más de 50px, ocultar
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsSearchVisible(false);
      } 
      // Si el scroll es hacia arriba, mostrar
      else if (currentScrollY < lastScrollY) {
        setIsSearchVisible(true);
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateSearchVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hm-root">
      <div className="hm-content">
        <div className={`hm-search ${!isSearchVisible ? 'hm-search-hidden' : ''}`}>
          <Buscador
            filtro={filtro}
            setFiltro={setFiltro}
            onSubmit={(q) => {
              if (!q) return;
              const normalize = (str: string) => str
                .toLowerCase()
                .normalize('NFD')
                .replace(/\p{Diacritic}+/gu, '');
              const qn = normalize(q);

              // 1. Calcular coincidencia en base de datos de productos
              const productDatasets = [
                empanadasData,
                pizzasData,
                pizzasIndiData,
                fitzzasData,
                salsasData,
                postresData,
                promocionesData,
              ];

              let productScore = 0;
              for (const dataset of productDatasets) {
                for (const item of dataset) {
                  const texto = [
                    item.titulo,
                    item.descripcion,
                    Array.isArray((item as any).ingredientes) ? (item as any).ingredientes.join(' ') : '',
                    (item as any).categoria,
                  ].filter(Boolean).join(' ');
                  if (normalize(String(texto)).includes(qn)) productScore++;
                }
              }

              // 2. Calcular coincidencia en base de datos de sucursales
              let branchScore = 0;
              for (const s of sucursalesData) {
                const texto = [s.nombre, s.localidad, s.provincia, s.direccion].filter(Boolean).join(' ');
                if (normalize(String(texto)).includes(qn)) branchScore += 3; // Peso extra por coincidencia de sucursal
              }

              // Boost si el usuario usa palabras clave referidas a sucursales
              const branchHints = ['sucursal', 'local', 'tienda', 'direccion', 'dirección', 'mapa', 'cerca', 'donde', 'dónde', 'ubicacion', 'ubicación'];
              if (branchHints.some(h => qn.includes(normalize(h)))) {
                branchScore += 5;
              }

              // 3. Redirigir según la mayor puntuación de coincidencia
              if (branchScore > productScore) {
                navigate(`/sucursales?q=${encodeURIComponent(q)}`);
              } else {
                navigate(`/productos?search=${encodeURIComponent(q)}`);
              }
            }}
          />
        </div>

        {/* Botones de categorías (Arriba) */}
        {true && (
        <section className="hm-categories">
          <div className="hm-cat hm-cat-premium" onClick={() => navigate('/productos?tab=Empanadas&type=Premium')}>
            <div className="hm-cat-img-wrap-premium">
              <img className="hm-cat-img-premium" src="https://i.postimg.cc/9FTt4mc3/burger.png" alt="Empanadas Premium" />
            </div>
            <span>Premium</span>
          </div>
          <div className="hm-cat hm-cat-clasicas" onClick={() => navigate('/productos?tab=Empanadas&type=Clasicas')}>
            <div className="hm-cat-img-wrap-clasicas">
              <img className="hm-cat-img-clasicas" src="https://i.postimg.cc/rmGWykxP/champi.png" alt="Empanadas Clásicas" />
            </div>
            <span>Clásicas</span>
          </div>
          <div className="hm-cat hm-cat-pizzas" onClick={() => navigate('/productos?tab=Pizzas')}>
            <div className="hm-cat-img-wrap-pizzas">
              <img className="hm-cat-img-pizzas" src="https://i.postimg.cc/MGwpT9Yq/Caprese-Photoroom.png" alt="Pizzas" />
            </div>
            <span>Pizzas</span>
          </div>
          <div className="hm-cat hm-cat-fitzzas" onClick={() => navigate('/productos?tab=Fitzzas')}>
            <div className="hm-cat-img-wrap-fitzzas">
              <img className="hm-cat-img-fitzzas" src="https://i.postimg.cc/sgW23vtF/890ba29d-3b08-4651-b10f-dc3f6462b940-Photoroom.png" alt="Fitzza" />
            </div>
            <span>Fitzza</span>
          </div>
          <div className="hm-cat hm-cat-postres" onClick={() => navigate('/productos?tab=Postres')}>
            <div className="hm-cat-img-wrap-postres">
              <img className="hm-cat-img-postres" src="https://i.postimg.cc/3wDKXLCG/Franu-Chocolate-Amargo.png" alt="Postres" />
            </div>
            <span>Postres</span>
          </div>
          <div className="hm-cat hm-cat-aderezos" onClick={() => navigate('/productos?tab=Salsas')}>
            <div className="hm-cat-img-wrap-aderezos">
              <img className="hm-cat-img-aderezos" src="https://i.postimg.cc/HL2fXvFj/BBQ.png" alt="Aderezos" />
            </div>
            <span>Aderezos</span>
          </div>
        </section>
        )}

        {/* Video hero section (Abajo) */}
        <section className="hm-video-hero">
          <video
            className="hm-video-bg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={selectedVideo}
            poster="/images/sliders/mainpain.png"
          />
          <div className="hm-video-overlay" />
          <div className="hm-video-content">
            <h1 className="hm-hero-title">
              <span className="hm-hero-highlight">Disfrutá</span> hoy tu
              <br />
              experiencia de verdad
            </h1>
          </div>
        </section>

        {/* Oculto temporalmente Promos destacadas por solicitud del usuario */}
        {/* <PromoCarousel title="Promos destacadas" slides={promoSlides} isDestacadas={true} /> */}

        {/** Oculto temporalmente el banner "Unite a Lovers Club" en mobile **/}
        {/**
         <section className="hm-banner">
           <div className="hm-banner-inner">
             <div className="hm-banner-title">Unite a Lovers Club</div>
             <div className="hm-banner-sub">Beneficios y promos exclusivas</div>
             <button className="hm-banner-btn" onClick={() => navigate('/lovers')}>Conocer más</button>
             <div className="hm-rain">
               {EMPANADAS_DATA.map((empanada) => (
                 <img
                   key={empanada.id}
                   src={empanada.src}
                   alt="empanada"
                   loading="lazy"
                   style={{
                     position: 'absolute',
                     left: `${empanada.left}%`,
                     width: empanada.size,
                     height: empanada.size,
                     objectFit: 'contain',
                     animation: `emp-fall ${empanada.duration}s linear infinite`,
                     animationDelay: `${empanada.delay}s`,
                     pointerEvents: 'none',
                     opacity: .6,
                     zIndex: -1,
                     filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                   }}
                 />
               ))}
             </div>
           </div>
         </section>
        **/}

        {/* Oculto temporalmente Promos imperdibles por solicitud del usuario */}
        {/* <PromoCarousel title="Promos imperdibles" slides={moreSlides} /> */}
        {/* Carrusel "Para compartir" oculto en móvil por solicitud del usuario */}
        {/* <PromoCarousel title="Para compartir" slides={moreSlides} /> */}
      </div>

    </div>
  );
}


