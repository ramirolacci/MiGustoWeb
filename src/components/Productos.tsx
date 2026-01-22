import React, { useState, useMemo, useEffect, useRef } from "react";
import gsap from 'gsap';
import './Productos.css';
import ProductModal3D from './ProductModal3D';
import MobileProductDetail from './MobileProductDetail';
import NavBar from './NavBar';
import IngredientExplodedView from './IngredientExplodedView';
import { explodedProductConfigs } from '../data/explodedViewConfig';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { flyToCart } from '../utils/flyToCart';

import { pizzas } from '../data/pizzasData';
import { empanadas } from '../data/empanadasData';
import { fitzzas } from '../data/fitzzasData';
import { pizzasIndi } from '../data/pizzasIndiData';
import { salsas } from '../data/salsasData';
import { postres } from '../data/postresData';
import { promociones } from '../data/promocionesData';

interface Producto {
    titulo: string;
    descripcion: string;
    imagen: string;
    imagenDetalle?: string;
    imagenCard?: string;
    ingredientes?: string[];
    tiempoPreparacion?: string;
    calorias?: string;
    precio?: string;
    esRecomendado?: boolean;
    esVegetariano?: boolean;
    esSinGluten?: boolean;
    esPremium?: boolean;
    categoria: string;
}

function formatearPrecio(precio: string | number) {
    const num = typeof precio === "string" ? parseInt(precio.replace(/\D/g, "")) : precio;
    if (isNaN(num)) return precio;
    return num.toLocaleString("es-AR");
}

const categorias = ["Promociones", "Empanadas", "Pizzas", "Pizzas INDI", "Fitzzas", "Salsas", "Postres"];

const EMPANADAS_3D = [
    "Mexican pibil pork",
    "Big burger",
    "Matambre a la pizza",
    "Cheese burger",
    "Vacio y provoleta",
    "American chicken"
];

// Copia local de rutas y orbits para Big Burger
const RUTA_3D_BIG_BURGER = "/models/big-burger-3D.glb";
const ORBIT_3D_BIG_BURGER = "45deg 65deg 1.7m";

export default function Productos() {
    const location = useLocation();
    const { addItem } = useCart();
    const [filtro, setFiltro] = useState<'Empanadas' | typeof categorias[number]>('Empanadas');
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [tipoProducto, setTipoProducto] = useState<"Premium" | "Clasicas" | null>(null);
    const [esVegetariano, setEsVegetariano] = useState<boolean>(false);
    const [showPrecioModal, setShowPrecioModal] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [hoveredBigBurger, setHoveredBigBurger] = useState(false);
    const scrollRevealRef = useRef<any>(null);
    const [sectionVisible, setSectionVisible] = useState(false);

    useEffect(() => {
        // Sincronizar desde query params si llegan desde HomeMobile
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        const type = params.get('type');
        const search = params.get('search');
        if (tab && categorias.includes(tab)) {
            setFiltro(tab as any);
        } else {
            // Default: Empanadas sin subfiltro (mostrar todas)
            setFiltro('Empanadas');
            setTipoProducto(null);
        }
        if (type === 'Premium' || type === 'Clasicas') setTipoProducto(type);
        if (typeof search === 'string' && search.length > 0) {
            setBusqueda(search);
        } else {
            // Al no venir ?search, aseguramos limpiar la búsqueda previa
            setBusqueda('');
        }
    }, [location.search]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        requestAnimationFrame(() => setSectionVisible(true));
    }, []);

    useEffect(() => {
        // Cargar model-viewer solo si hay hover en Big Burger
        if (hoveredBigBurger && !document.querySelector('script[src*="model-viewer"]')) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
            document.body.appendChild(script);
        }
    }, [hoveredBigBurger]);

    const productosFiltrados = useMemo(() => {
        let productos: Producto[] = [];

        if (busqueda) {
            const productosBusqueda = [
                ...empanadas.map(e => ({ ...e, precio: e.precio?.toString(), categoria: 'Empanada' })),
                ...pizzas.map(p => ({ ...p, categoria: 'Pizza' })),
                ...pizzasIndi.map(p => ({ ...p, categoria: 'Pizzas INDI' })),
                ...fitzzas.map(f => ({ ...f, categoria: 'Fitzzas' })),
                ...salsas.map(s => ({ ...s, categoria: 'Salsas' })),
                ...postres.map(p => ({ ...p, categoria: 'Postres' })),
                ...promociones.map(p => ({ ...p, categoria: 'Promociones' }))
            ];
            productos = productosBusqueda.filter(producto =>
                producto.titulo.toLowerCase().includes(busqueda.toLowerCase())
            );
            const unique = new Map();
            productos.forEach(prod => {
                unique.set(prod.titulo + '-' + prod.categoria, prod);
            });
            productos = Array.from(unique.values());
        } else {
            switch (filtro) {
                case "Empanadas":
                    productos = empanadas.map(e => ({ ...e, precio: e.precio?.toString(), categoria: 'Empanada' }));
                    break;
                case "Pizzas":
                    productos = pizzas.map(p => ({ ...p, categoria: 'Pizza' }));
                    break;
                case "Pizzas INDI":
                    productos = pizzasIndi.map(p => ({ ...p, categoria: 'Pizzas INDI' }));
                    break;
                case "Fitzzas":
                    productos = fitzzas.map(f => ({ ...f, categoria: 'Fitzzas' }));
                    break;
                case "Salsas":
                    productos = salsas.map(s => ({ ...s, categoria: 'Salsas' }));
                    break;
                case "Postres":
                    productos = postres.map(p => ({ ...p, categoria: 'Postres' }));
                    break;
                case "Promociones":
                    productos = promociones.map(p => ({ ...p, categoria: 'Promociones' }));
                    break;
                default:
                    productos = [];
            }
        }

        return productos.filter(producto => {
            let coincideBusqueda = true;
            if (busqueda) {
                coincideBusqueda = producto.titulo.toLowerCase().includes(busqueda.toLowerCase());
            }

            let coincideTipoEmpanada = true;
            if (filtro === "Empanadas" && !busqueda) {
                if (tipoProducto === "Premium") {
                    coincideTipoEmpanada = Boolean(producto.esPremium);
                } else if (tipoProducto === "Clasicas") {
                    coincideTipoEmpanada = !Boolean(producto.esPremium);
                }
            }

            let coincideVegetariano = true;
            if ((filtro === "Pizzas" || filtro === "Pizzas INDI") && !busqueda) {
                if (esVegetariano) {
                    coincideVegetariano = !!producto.esVegetariano;
                }
            }

            return coincideBusqueda && coincideTipoEmpanada && coincideVegetariano;
        });
    }, [filtro, busqueda, tipoProducto, esVegetariano]);

    // Limpiar producto seleccionado si se borra la búsqueda o cambia la categoría
    useEffect(() => {
        setProductoSeleccionado(null);
    }, [busqueda, filtro]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setProductoSeleccionado(null);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Efecto para inicializar ScrollReveal
    useEffect(() => {
        const initScrollReveal = async () => {
            const ScrollReveal = (await import('scrollreveal')).default;

            scrollRevealRef.current = ScrollReveal({
                distance: '20px',
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                origin: 'bottom',
                reset: false,
                scale: 0.95,
                opacity: 0,
                cleanup: true,
                container: document.documentElement
            });

            // Configurar elementos específicos con efectos sutiles
            scrollRevealRef.current.reveal('.productos-titulo', {
                distance: '15px',
                duration: 1000,
                origin: 'top',
                delay: 200,
                reset: false,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

            scrollRevealRef.current.reveal('.productos-busqueda', {
                distance: '20px',
                duration: 1200,
                origin: 'bottom',
                delay: 400,
                reset: false,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

            scrollRevealRef.current.reveal('.productos-categorias', {
                distance: '25px',
                duration: 1000,
                origin: 'bottom',
                delay: 600,
                reset: false,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

            // Nuevo: reveal impresionante para las categorías (Mercado Libre style)
            scrollRevealRef.current.reveal('.ml-categories', {
                distance: '22px',
                duration: 900,
                origin: 'bottom',
                delay: 200,
                reset: false,
                scale: 0.92,
                opacity: 0,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
            });

            scrollRevealRef.current.reveal('.ml-cat-item', {
                distance: '18px',
                duration: 800,
                origin: 'bottom',
                interval: 80,
                reset: false,
                scale: 0.9,
                opacity: 0,
                rotate: { x: 8, y: 0, z: 0 },
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
            });

            scrollRevealRef.current.reveal('.productos-subfiltros', {
                distance: '20px',
                duration: 1000,
                origin: 'bottom',
                delay: 800,
                reset: false,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

            // --- OLD ScrollReveal for Products (Removed in favor of GSAP) ---
            /*
            scrollRevealRef.current.reveal('.producto-card', {
                distance: '25px',
                duration: 800,
                origin: 'bottom',
                interval: 150,
                reset: false,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

            scrollRevealRef.current.reveal('.producto-row-mobile', {
                distance: '20px',
                duration: 800,
                origin: 'bottom',
                interval: 100,
                reset: false,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            */
        };

        initScrollReveal();

        // Cleanup function
        return () => {
            if (scrollRevealRef.current) {
                scrollRevealRef.current.destroy();
            }
        };
    }, []);

    // Efecto para sincronizar ScrollReveal cuando cambian los productos filtrados
    useEffect(() => {
        if (scrollRevealRef.current) {
            setTimeout(() => {
                scrollRevealRef.current.sync();
            }, 100);
        }
    }, [productosFiltrados]);

    // --- GSAP ANIMATION FOR PRODUCTS ---
    useEffect(() => {
        // Kill previous animations to prevent conflicts
        gsap.killTweensOf('.producto-card');
        gsap.killTweensOf('.producto-row-mobile');

        if (productosFiltrados.length === 0) return;

        const ctx = gsap.context(() => {
            if (isMobile) {
                // Mobile Animation: Slide up + Fade in
                gsap.fromTo('.producto-row-mobile',
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: "power2.out",
                        clearProps: "all" // Ensure interactivity remains after
                    }
                );
            } else {
                // Desktop Animation: Elastic Pop-in with 3D Rotation
                gsap.fromTo('.producto-card',
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.8,
                        rotationX: 15,
                        transformPerspective: 1000
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        duration: 0.7,
                        stagger: 0.04, // Faster stagger for impressiveness
                        ease: "back.out(1.2)", // Bouncy effect
                        clearProps: "transform" // Keep only transform clear to avoid layout issues, keep opacity
                    }
                );
            }
        });

        return () => ctx.revert();
    }, [productosFiltrados, isMobile]); // Run whenever products change

    const explodedConfig = useMemo(() => {
        if (!productoSeleccionado) return null;

        const { titulo, categoria } = productoSeleccionado;

        if (categoria === 'Pizza') return explodedProductConfigs[titulo + '_PIZZA'];
        if (categoria === 'Pizzas INDI') return explodedProductConfigs[titulo + '_INDI'];
        if (categoria === 'Fitzzas') return explodedProductConfigs[titulo + '_FITZZA'];
        if (categoria === 'Salsas') return explodedProductConfigs[titulo + '_ADEREZO'];
        if (categoria === 'Postres') return explodedProductConfigs[titulo + '_POSTRE'];
        if (categoria === 'Promociones') return explodedProductConfigs[titulo + '_PROMO'];

        // Empanadas or fallback
        return explodedProductConfigs[titulo];
    }, [productoSeleccionado]);

    // Navigation Logic
    const handleNextProduct = () => {
        if (!productoSeleccionado || productosFiltrados.length <= 1) return;

        const currentIndex = productosFiltrados.findIndex(p =>
            p.titulo === productoSeleccionado.titulo && p.categoria === productoSeleccionado.categoria
        );

        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % productosFiltrados.length;
            setProductoSeleccionado(productosFiltrados[nextIndex]);
        }
    };

    const handlePrevProduct = () => {
        if (!productoSeleccionado || productosFiltrados.length <= 1) return;

        const currentIndex = productosFiltrados.findIndex(p =>
            p.titulo === productoSeleccionado.titulo && p.categoria === productoSeleccionado.categoria
        );

        if (currentIndex !== -1) {
            const prevIndex = (currentIndex - 1 + productosFiltrados.length) % productosFiltrados.length;
            setProductoSeleccionado(productosFiltrados[prevIndex]);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!productoSeleccionado) return;

            if (e.key === 'ArrowRight') {
                handleNextProduct();
            } else if (e.key === 'ArrowLeft') {
                handlePrevProduct();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [productoSeleccionado, productosFiltrados]); // Re-bind when selection or list changes

    return (
        <div className={`productos-section ${sectionVisible ? 'section-visible' : ''}`}>
            <div className="background-overlay"></div>
            <div className="productos-container">
                {/* Título removido a pedido: "Conocé nuestros productos" */}

                {/* Buscador removido: ahora se usa el buscador global del navbar */}

                {/* Botón sutil "Carta" removido a pedido */}

                {/* Nueva implementación de categorías - Simple y funcional */}
                <div className="categories-section">
                    {/* Barra de búsqueda móvil integrada */}
                    {isMobile && (
                        <div className="mobile-search-bar">
                            <div className="search-input-container">
                                <div className="search-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.35-4.35"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="mobile-search-input"
                                />
                                {busqueda && (
                                    <button
                                        className="clear-search-btn"
                                        onClick={() => setBusqueda('')}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Contenedor de categorías con scroll horizontal */}
                    <div className="categories-container">
                        <div className="categories-scroll">
                            {[
                                { key: 'Premium', label: 'Premium', icon: '/images/burgerLoading.png' },
                                { key: 'Clasicas', label: 'Clásicas', icon: empanadas.find(e => !e.esPremium)?.imagen || '/icons/products/empanadas-clasicas.svg' },
                                { key: 'Pizzas', label: 'Pizzas', icon: pizzas.find(p => p.titulo === 'Caprese')?.imagen || '/icons/products/pizza.svg' },
                                { key: 'Pizzas INDI', label: 'Pizzas INDI', icon: pizzasIndi[0]?.imagen || '/icons/products/pizza.svg' },
                                { key: 'Fitzzas', label: 'Fitzzas', icon: fitzzas[0]?.imagen || '/icons/products/fitzza.svg' },
                                { key: 'Salsas', label: 'Aderezos', icon: salsas.find(s => s.titulo.toLowerCase() === 'bbq')?.imagen || '/icons/products/aderezos.svg' },
                                { key: 'Postres', label: 'Postres', icon: postres[0]?.imagen || '/icons/products/postres.svg' },
                                { key: 'Carta', label: 'Carta', icon: '/images/carta.svg' },
                                { key: 'Promociones', label: 'Promociones', icon: '/images/promotions/promoIcon.png' },
                            ].map((category) => {
                                const isActive = (() => {
                                    if (category.key === 'Carta') return false;
                                    if (category.key === 'Premium') return filtro === 'Empanadas' && tipoProducto === 'Premium';
                                    if (category.key === 'Clasicas') return filtro === 'Empanadas' && tipoProducto === 'Clasicas';
                                    return filtro === category.key;
                                })();

                                return (
                                    <button
                                        key={category.key}
                                        className={`category-chip ${isActive ? 'active' : ''} ${category.key === 'Promociones' ? 'promociones-chip' : ''} ${category.key === 'Carta' ? 'carta-chip' : ''} ${category.key === 'Premium' ? 'premium-chip' : ''} ${category.key === 'Clasicas' ? 'clasicas-chip' : ''} ${category.key === 'Pizzas' ? 'pizzas-chip' : ''} ${category.key === 'Pizzas INDI' ? 'pizzas-indi-chip' : ''} ${category.key === 'Fitzzas' ? 'fitzzas-chip' : ''}`}
                                        onClick={() => {
                                            if (category.key === 'Carta') {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                window.history.pushState({}, '', '/carta');
                                                (window as any).dispatchEvent(new Event('popstate'));
                                            } else if (category.key === 'Premium') {
                                                setFiltro('Empanadas');
                                                setTipoProducto('Premium');
                                                setBusqueda('');
                                                window.history.replaceState({}, '', '/productos?tab=Empanadas&type=Premium');
                                            } else if (category.key === 'Clasicas') {
                                                setFiltro('Empanadas');
                                                setTipoProducto('Clasicas');
                                                setBusqueda('');
                                                window.history.replaceState({}, '', '/productos?tab=Empanadas&type=Clasicas');
                                            } else {
                                                setFiltro(category.key);
                                                setTipoProducto(null);
                                                setBusqueda('');
                                                window.history.replaceState({}, '', `/productos?tab=${encodeURIComponent(category.key)}`);
                                            }
                                        }}
                                    >
                                        <div className="category-icon">
                                            <img src={category.icon} alt={category.label} />
                                        </div>
                                        <span className="category-label">{category.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Subfiltros antiguos (Premium | CLÁSICAS) eliminados en desktop */}

                <div className="productos-lista">
                    {productosFiltrados.length === 0 ? (
                        <div className="productos-no-resultados">
                            No se encontraron productos que coincidan con tu búsqueda
                        </div>
                    ) : (
                        productosFiltrados.map((prod, idx) => {
                            const tiene3D = EMPANADAS_3D.includes(prod.titulo);
                            // Eliminar el formato especial de Big burger
                            // const isBigBurger = prod.titulo.toLowerCase().includes("big burg");
                            if (isMobile) {
                                // Cards que deben mostrar solo una vez la descripción
                                const soloDescripcion = [
                                    'Carne con aceituna',
                                    'Pollo',
                                    'Cuatro quesos',
                                    'Cuatro Quesos',
                                    'Pollo al champignon',
                                    'Choclo',
                                    'Verdura',
                                    'Calabaza',
                                    'Panceta y ciruela',
                                    'Panceta y Ciruela'
                                ];
                                return (
                                    <div className="producto-row-mobile" key={prod.titulo + '-' + prod.categoria} onClick={() => setProductoSeleccionado(prod)} style={{ '--card-index': idx } as React.CSSProperties}>
                                        <img src={prod.imagenCard || prod.imagen} alt={prod.titulo} className="producto-img-mobile" />
                                        <div className="producto-info-mobile">
                                            <h3>{prod.titulo}</h3>
                                            <p>{prod.descripcion}</p>
                                            {prod.ingredientes && prod.ingredientes.length > 0 && !soloDescripcion.includes(prod.titulo) && (
                                                <p className="ingredientes-mobile">{prod.ingredientes.join(', ')}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                            // --- CARD DESKTOP ---
                            return (
                                <div
                                    className="producto-card"
                                    key={prod.titulo + '-' + prod.categoria}
                                    onClick={() => setProductoSeleccionado(prod)}
                                    data-categoria={filtro}
                                    style={{ position: 'relative', '--card-index': idx } as React.CSSProperties}
                                >
                                    {/* Ícono 3D eliminado por requerimiento */}
                                    {/* Renderizado estándar para todas las cards, incluyendo Big burger */}
                                    <>
                                        <img src={prod.imagenCard || prod.imagen} alt={prod.titulo} />
                                        <div className="producto-info">
                                            <h3
                                                className="titulo-card-desktop"
                                                style={{
                                                    fontSize: ([
                                                        'Jamón, Tomate, Huevo, Roquefort',
                                                        'Jamón, tomate, huevo y roquefort',
                                                        'Jamón crudo, rúcula y stracciatella INDI',
                                                        'Mortadela, pistacho y stracciatella INDI',
                                                        'Fitzza mortadela, pistacho y stracciatella',
                                                        'Fitzza jamón crudo, rúcula y stracciatella',
                                                        'Fitzza Jamón crudo, rúcula y stracciatella'
                                                    ].includes(prod.titulo)
                                                        ? '1.45rem'
                                                        : (prod.titulo.length > 28 ? (prod.titulo.length > 38 ? '1.05rem' : '1.18rem') : '1.45rem')),
                                                    fontWeight: 600,
                                                    margin: '-1.3rem 0 0.4rem 0',
                                                    letterSpacing: '0.03em',
                                                    lineHeight: 1.18,
                                                    textAlign: 'center',
                                                    textShadow: 'rgb(255 215 0 / 65%) 0px 2px 8px, rgb(194 186 144) 0px 1px 0px',
                                                    padding: '0.18em 0.1em',
                                                    borderRadius: '12px',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    background: 'transparent',
                                                    backgroundClip: 'text',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundImage: 'linear-gradient(90deg, #FFD700 10%, #FFA500 60%, #fff 100%)',
                                                    animation: 'brilloTituloCard 2.5s linear infinite',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    display: 'block',
                                                    maxWidth: '100%',
                                                }}
                                                title={prod.titulo}
                                            >
                                                {prod.titulo}
                                            </h3>
                                            {/* Descripción e ingredientes debajo del título */}
                                            {prod.descripcion && (() => {
                                                // Cards especiales a corregir
                                                const especiales = [
                                                    'Carne con aceituna',
                                                    'Pollo',
                                                    'Verdura'
                                                ];
                                                // Cards que necesitan mostrar bien el segundo renglón
                                                const mostrarDosRenglones = [
                                                    'Jamón, Tomate, Huevo, Roquefort',
                                                    'Provolone, Jamón y Longaniza',
                                                    'Provolone, Jamón y Morrón'
                                                ];
                                                if (especiales.includes(prod.titulo)) {
                                                    return (
                                                        <p style={{
                                                            color: '#fff',
                                                            fontSize: '1rem',
                                                            margin: '0 0 0.3rem 0',
                                                            textAlign: 'left',
                                                            opacity: 0.85,
                                                            lineHeight: 1.4,
                                                            fontWeight: 400,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxHeight: '2.8em',
                                                        }}>{prod.descripcion}</p>
                                                    );
                                                }
                                                if (mostrarDosRenglones.includes(prod.titulo)) {
                                                    return (
                                                        <p style={{
                                                            color: '#fff',
                                                            fontSize: '0.93rem',
                                                            margin: '0 0 0.3rem 0',
                                                            textAlign: 'left',
                                                            opacity: 0.85,
                                                            lineHeight: 1.35,
                                                            fontWeight: 400,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxHeight: '2.7em',
                                                        }}>{prod.descripcion}</p>
                                                    );
                                                }
                                                // Resto de las cards
                                                return (
                                                    <>
                                                        <p style={{
                                                            color: '#fff',
                                                            fontSize: '1rem',
                                                            margin: '0 0 0.3rem 0',
                                                            textAlign: 'left',
                                                            opacity: 0.85,
                                                            lineHeight: 1.4,
                                                            fontWeight: 400,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxHeight: '2.8em',
                                                        }}>{prod.descripcion}</p>
                                                        {prod.ingredientes && prod.ingredientes.length > 0 && ![
                                                            'Cuatro Quesos',
                                                            'Cuatro quesos',
                                                            'Pollo al champignon',
                                                            'Choclo',
                                                            'Calabaza',
                                                            'Panceta y Ciruela',
                                                            'Panceta y ciruela'
                                                        ].includes(prod.titulo) && (
                                                                <p style={{
                                                                    color: '#FFD700',
                                                                    fontSize: '0.98rem',
                                                                    margin: '0 0 0.5rem 0',
                                                                    textAlign: 'center',
                                                                    opacity: 0.85,
                                                                    lineHeight: 1.3,
                                                                    fontWeight: 400,
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    maxHeight: '2.8em',
                                                                }}>
                                                                    {prod.ingredientes.join(', ')}
                                                                </p>
                                                            )}
                                                    </>
                                                );
                                            })()}
                                            <div style={{
                                                width: '80%',
                                                height: '0.7em',
                                                margin: '-0.3em auto 0 auto',
                                                background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.01) 100%)',
                                                opacity: 0.7,
                                                borderRadius: '50%',
                                                filter: 'blur(2.5px)',
                                            }}></div>
                                            {/* Botón sutil con ícono (overlay) - oculto temporalmente */}
                                            {/**
                                                <button
                                                    aria-label="Agregar al carrito"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const numericPrice = (() => {
                                                          if (prod.categoria === 'Empanada' && prod.precio) {
                                                            const n = parseInt(String(prod.precio).replace(/\D/g, ''));
                                                            return isNaN(n) ? 0 : n;
                                                          }
                                                          return 0;
                                                        })();
                                                        addItem({
                                                          title: prod.titulo,
                                                          image: prod.imagen,
                                                          price: numericPrice,
                                                          category: prod.categoria,
                                                        });
                                                    // Animación hacia el botón del carrito en el navbar
                                                    try {
                                                      const card = (e.currentTarget as HTMLElement).closest('.producto-card');
                                                      const imgEl = card?.querySelector('img');
                                                      const cartBtn = document.getElementById('nav-cart-button');
                                                      if (imgEl instanceof HTMLElement && cartBtn instanceof HTMLElement) {
                                                        flyToCart(imgEl, cartBtn);
                                                      } else {
                                                        // Fallback: volar hacia esquina superior derecha
                                                        const phantom = document.createElement('img');
                                                        phantom.src = prod.imagen;
                                                        phantom.style.position = 'fixed';
                                                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                                        phantom.style.left = rect.left + 'px';
                                                        phantom.style.top = rect.top + 'px';
                                                        phantom.style.width = '96px';
                                                        phantom.style.height = '96px';
                                                        phantom.style.objectFit = 'cover';
                                                        phantom.style.borderRadius = '12px';
                                                        phantom.style.zIndex = '99999';
                                                        document.body.appendChild(phantom);
                                                        const endLeft = window.innerWidth - 24;
                                                        const endTop = 16;
                                                        const dx = endLeft - rect.left;
                                                        const dy = endTop - rect.top;
                                                        phantom.animate([
                                                          { transform: 'translate(0,0) scale(1)', opacity: 1 },
                                                          { offset: 0.6, transform: `translate(${dx * .7}px, ${dy * .7}px) scale(.8)`, opacity: .9 },
                                                          { transform: `translate(${dx}px, ${dy}px) scale(.2)`, opacity: 0 }
                                                        ], { duration: 700, easing: 'cubic-bezier(.22,1,.36,1)' }).onfinish = () => phantom.remove();
                                                      }
                                                    } catch {}
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        right: 12,
                                                        bottom: 12,
                                                        width: 44,
                                                        height: 44,
                                                        borderRadius: 22,
                                                        background: '#ffbf1f',
                                                        color: '#111',
                                                        border: 'none',
                                                        boxShadow: '0 8px 18px rgba(0,0,0,.35)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                        transition: 'transform .15s ease, box-shadow .15s ease',
                                                    }}
                                                    onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
                                                    onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                                >
                                                    <span className="fa fa-cart-plus" style={{ fontSize: 18 }} />
                                                </button>
                                                **/}
                                        </div>
                                    </>
                                </div>
                            );
                        })
                    )}
                </div>

                {explodedConfig ? (
                    <IngredientExplodedView
                        config={explodedConfig}
                        onClose={() => setProductoSeleccionado(null)}
                        enable3D={EMPANADAS_3D.some(t => t.toLowerCase() === productoSeleccionado!.titulo.toLowerCase())}
                        onNext={handleNextProduct}
                        onPrev={handlePrevProduct}
                    />
                ) : (
                    <>
                        {productoSeleccionado && !isMobile && (
                            <ProductModal3D
                                producto={productoSeleccionado}
                                onClose={() => setProductoSeleccionado(null)}
                                tiene3D={EMPANADAS_3D.some(t => t.toLowerCase() === productoSeleccionado.titulo.toLowerCase())}
                            />
                        )}
                        {productoSeleccionado && isMobile && (
                            <MobileProductDetail
                                producto={productoSeleccionado}
                                onClose={() => setProductoSeleccionado(null)}
                            />
                        )}
                    </>
                )}

                {showPrecioModal && (
                    <div className="precio-modal">
                        <div className="precio-modal-content">
                            <span className="close" onClick={() => setShowPrecioModal(false)}>&times;</span>
                            <h2>Precio</h2>
                            {filtro === "Empanadas" && tipoProducto && (
                                <>
                                    {tipoProducto === "Premium" && (
                                        <button
                                            className="precio-display-btn"
                                            onClick={() => setShowPrecioModal(false)}
                                        >
                                            $4000
                                        </button>
                                    )}
                                    {tipoProducto === "Clasicas" && (
                                        <button
                                            className="precio-display-btn"
                                            onClick={() => setShowPrecioModal(false)}
                                        >
                                            $3700
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}