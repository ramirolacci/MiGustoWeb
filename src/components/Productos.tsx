import { assetUrl } from '../utils/assetUrl';
import React, { useState, useMemo, useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
import './Productos.css';
import ProductModal3D from './ProductModal3D';
import MobileProductDetail from './MobileProductDetail';
import NavBar from './NavBar';
import IngredientExplodedView from './IngredientExplodedView';
import { explodedProductConfigs } from '../data/explodedViewConfig';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { flyToCart } from '../utils/flyToCart';

import { pizzas as originalPizzas } from '../data/pizzasData';
import { empanadas as originalEmpanadas } from '../data/empanadasData';
import { fitzzas as originalFitzzas } from '../data/fitzzasData';
import { pizzasIndi as originalPizzasIndi } from '../data/pizzasIndiData';
import { salsas as originalSalsas } from '../data/salsasData';
import { postres as originalPostres } from '../data/postresData';
import { promociones as originalPromociones } from '../data/promocionesData';
import { getProductData } from '../utils/productDataLoader';

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
const RUTA_3D_BIG_BURGER = assetUrl("/models/big-burger-3D.glb");
const ORBIT_3D_BIG_BURGER = "45deg 65deg 1.7m";

export default function Productos() {
    const containerRef = useRef<HTMLDivElement>(null);
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

    // Cargar datos (combina originales con ediciones del admin)
    const productData = getProductData();
    const empanadas = productData.empanadas;
    const pizzas = productData.pizzas;
    const pizzasIndi = productData.pizzasIndi;
    const fitzzas = productData.fitzzas;
    const salsas = productData.salsas;
    const postres = productData.postres;
    const promociones = productData.promociones;

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
    useGSAP(() => {
        if (productosFiltrados.length === 0) return;

        // Entry animation for cards
        const cards = isMobile ? '.producto-row-mobile' : '.producto-card';
        
        gsap.fromTo(cards, 
            { 
                opacity: 0, 
                y: 100, 
                rotateX: -15, 
                scale: 0.9,
                transformPerspective: 1000 
            },
            { 
                opacity: 1, 
                y: 0, 
                rotateX: 0, 
                scale: 1, 
                duration: 0.8, 
                stagger: {
                    each: 0.05,
                    from: "start",
                    grid: "auto"
                },
                ease: "back.out(1.4)",
                scrollTrigger: {
                    trigger: ".productos-lista",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );

        // Magnetic effect for category chips (Desktop only)
        if (!isMobile) {
            const chips = gsap.utils.toArray('.category-chip');
            const listeners: { el: HTMLElement, move: any, leave: any }[] = [];

            chips.forEach((chip: any) => {
                const handleMouseMove = (e: MouseEvent) => {
                    const rect = chip.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    gsap.to(chip, {
                        x: x * 0.3,
                        y: y * 0.3,
                        scale: 1.05,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(chip, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: "elastic.out(1, 0.3)"
                    });
                };

                chip.addEventListener('mousemove', handleMouseMove);
                chip.addEventListener('mouseleave', handleMouseLeave);
                listeners.push({ el: chip, move: handleMouseMove, leave: handleMouseLeave });
            });

            // Managing cleanup for chips
            return () => {
                listeners.forEach(({ el, move, leave }) => {
                    el.removeEventListener('mousemove', move);
                    el.removeEventListener('mouseleave', leave);
                });
            };
        }
    }, { scope: containerRef, dependencies: [productosFiltrados, isMobile] });

    useGSAP(() => {
        // 3D Tilt for Product Cards (Desktop only)
        if (!isMobile && productosFiltrados.length > 0) {
            const productCards = gsap.utils.toArray('.producto-card');
            const cardListeners: { el: HTMLElement, move: any, leave: any }[] = [];

            productCards.forEach((card: any) => {
                const handleMouseMove = (e: MouseEvent) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (centerY - y) / 10;
                    const rotateY = (x - centerX) / 10;

                    gsap.to(card, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        scale: 1.02,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.3)"
                    });
                };

                card.addEventListener('mousemove', handleMouseMove);
                card.addEventListener('mouseleave', handleMouseLeave);
                cardListeners.push({ el: card, move: handleMouseMove, leave: handleMouseLeave });
            });

            return () => {
                cardListeners.forEach(({ el, move, leave }) => {
                    el.removeEventListener('mousemove', move);
                    el.removeEventListener('mouseleave', leave);
                });
            };
        }
    }, { scope: containerRef, dependencies: [productosFiltrados, isMobile] });

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
        <div ref={containerRef} className={`productos-section ${sectionVisible ? 'section-visible' : ''}`}>
            <div className="background-overlay"></div>
            <div className="glow-spot-1"></div>
            <div className="glow-spot-2"></div>
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
                                { key: 'Premium', label: 'Premium', icon: assetUrl('/images/burgerLoading.png') },
                                { key: 'Clasicas', label: 'Clásicas', icon: empanadas.find(e => !e.esPremium)?.imagen || assetUrl('/icons/products/empanadas-clasicas.svg') },
                                { key: 'Pizzas', label: 'Pizzas', icon: pizzas.find(p => p.titulo === 'Caprese')?.imagen || assetUrl('/icons/products/pizza.svg') },
                                { key: 'Pizzas INDI', label: 'Pizzas INDI', icon: pizzasIndi[0]?.imagen || assetUrl('/icons/products/pizza.svg') },
                                { key: 'Fitzzas', label: 'Fitzzas', icon: fitzzas[0]?.imagen || assetUrl('/icons/products/fitzza.svg') },
                                { key: 'Salsas', label: 'Aderezos', icon: salsas.find(s => s.titulo.toLowerCase() === 'bbq')?.imagen || assetUrl('/icons/products/aderezos.svg') },
                                { key: 'Postres', label: 'Postres', icon: postres[0]?.imagen || assetUrl('/icons/products/postres.svg') },
                                { key: 'Carta', label: 'Carta', icon: assetUrl('/images/carta.svg') },
                                { key: 'Promociones', label: 'Promos y Packs', icon: assetUrl('/images/promotions/promoIcon.png') },
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

                <div className="productos-lista">
                    {productosFiltrados.length === 0 ? (
                        <div className="productos-no-resultados">
                            <div className="empty-state-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                            <h3>Sin resultados</h3>
                            <p>No encontramos coincidencias para "{busqueda}".</p>
                            {busqueda && (
                                <button className="btn-limpiar-busqueda" onClick={() => setBusqueda("")}>
                                    Limpiar búsqueda
                                </button>
                            )}
                        </div>
                    ) : (
                        productosFiltrados.map((prod, idx) => {
                            if (isMobile) {
                                return (
                                    <div 
                                        className="producto-card-mobile" 
                                        key={prod.titulo + '-' + prod.categoria} 
                                        onClick={() => setProductoSeleccionado(prod)} 
                                        style={{ '--card-index': idx } as React.CSSProperties}
                                    >
                                        <div className="producto-img-mobile-container">
                                            <img src={prod.imagenCard || prod.imagen} alt={prod.titulo} className="producto-img-mobile" />
                                            {prod.esPremium && <span className="mobile-badge-premium">✨</span>}
                                        </div>
                                        <div className="producto-info-mobile">
                                            <div className="mobile-card-header">
                                                <h3>{prod.titulo}</h3>
                                                {prod.precio && <span className="mobile-card-precio">${formatearPrecio(prod.precio)}</span>}
                                            </div>
                                            <p className="mobile-card-desc">{prod.descripcion}</p>
                                            {prod.ingredientes && prod.ingredientes.length > 0 && (
                                                <div className="mobile-card-ingredients-container">
                                                    {prod.ingredientes.slice(0, 2).map((ing, i) => (
                                                        <span key={i} className="mobile-ingrediente-tag">{ing}</span>
                                                    ))}
                                                    {prod.ingredientes.length > 2 && <span className="mobile-ingrediente-tag-more">+{prod.ingredientes.length - 2}</span>}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mobile-card-arrow">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <polyline points="9 18 15 12 9 6"></polyline>
                                            </svg>
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
                                    style={{ '--card-index': idx } as React.CSSProperties}
                                >
                                    <div className="producto-card-shine"></div>

                                    <div className="producto-badges">
                                        {prod.esPremium && <span className="badge-premium">✨ Premium</span>}
                                        {prod.esVegetariano && <span className="badge-veggie">🍃 Veggie</span>}
                                        {prod.esRecomendado && <span className="badge-recommended">🔥 Recomendado</span>}
                                    </div>

                                    <div className="producto-image-container">
                                        <img src={prod.imagenCard || prod.imagen} alt={prod.titulo} className="producto-img" />
                                        <div className="producto-image-overlay"></div>
                                    </div>

                                    <div className="producto-info">
                                        <h3 className="producto-card-titulo" title={prod.titulo}>
                                            {prod.titulo}
                                        </h3>
                                        <p className="producto-card-desc">{prod.descripcion}</p>
                                        {prod.ingredientes && prod.ingredientes.length > 0 && (
                                            <div className="producto-card-ingredientes-container">
                                                {prod.ingredientes.slice(0, 3).map((ing, i) => (
                                                    <span key={i} className="producto-ingrediente-tag">{ing}</span>
                                                ))}
                                                {prod.ingredientes.length > 3 && <span className="producto-ingrediente-tag-more">+{prod.ingredientes.length - 3}</span>}
                                            </div>
                                        )}
                                        <div className="producto-card-footer">
                                            {prod.precio && (
                                                <span className="producto-card-precio">
                                                    ${formatearPrecio(prod.precio)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
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