import React, { useState, useMemo, useEffect, useRef } from "react";
import './Productos.css';
import ProductModal3D from './ProductModal3D';
import NavBar from './NavBar';
import Buscador from './Buscador';
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
    "Big burger",
    "Mexican Pibil pork",
    "Mexican pibil pork",
    "Mexican Veggie",
    "Mexican veggie",
    "Matambre a la pizza",
    "Cheese burger",
    "American Chicken",
    "American chicken",
    "Vacio y provoleta",
    // Agregado para Franuí chocolate amargo y con leche
    "Franuí chocolate amargo",
    "Franuí chocolate con leche",
];

// Copia local de rutas y orbits para Big Burger
const RUTA_3D_BIG_BURGER = "/3D/big-burger-3D.glb";
const ORBIT_3D_BIG_BURGER = "45deg 65deg 1.7m";

export default function Productos() {
    const location = useLocation();
    const { addItem } = useCart();
    const [filtro, setFiltro] = useState(categorias[1]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [tipoProducto, setTipoProducto] = useState<"Premium" | "Clasicas" | null>(null);
    const [esVegetariano, setEsVegetariano] = useState<boolean>(false);
    const [showPrecioModal, setShowPrecioModal] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [hoveredBigBurger, setHoveredBigBurger] = useState(false);
    const scrollRevealRef = useRef<any>(null);

    useEffect(() => {
        // Sincronizar desde query params si llegan desde HomeMobile
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        const type = params.get('type');
        const search = params.get('search');
        if (tab && categorias.includes(tab)) setFiltro(tab);
        if (type === 'Premium' || type === 'Clasicas') setTipoProducto(type);
        if (typeof search === 'string' && search.length > 0) setBusqueda(search);
    }, [location.search]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

            scrollRevealRef.current.reveal('.productos-subfiltros', {
                distance: '20px',
                duration: 1000,
                origin: 'bottom',
                delay: 800,
                reset: false,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

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

    return (
        <div className="productos-section">
            <div className="background-overlay"></div>
            <div className="productos-container">
                <h2 className="productos-titulo">Conocé nuestros productos</h2>

                <div className="productos-busqueda">
                    <Buscador filtro={busqueda} setFiltro={setBusqueda} />
                </div>

                {/* Categorías estilo Mercado Libre para mobile */}
                {isMobile ? (
                    <div className="ml-categories-wrapper">
                        <div className="ml-categories" role="tablist" aria-label="Categorías de productos">
                            {[
                                'Promociones',
                                'Premium',
                                'Clasicas',
                                'Pizzas',
                                'Pizzas INDI',
                                'Fitzzas',
                                'Salsas',
                                'Postres',
                            ].map((cat) => {
                                const iconSrc = (() => {
                                    switch (cat) {
                                        case 'Premium': {
                                            return '/burgerLoading.png';
                                        }
                                        case 'Clasicas': {
                                            const clasicaImg = empanadas.find(e => !e.esPremium)?.imagen;
                                            return clasicaImg || '/icons/empanadas-clasicas.svg';
                                        }
                                        case 'Pizzas': {
                                            const caprese = pizzas.find(p => p.titulo === 'Caprese')?.imagen;
                                            return caprese || '/icons/pizza.svg';
                                        }
                                        case 'Pizzas INDI': {
                                            const indiImg = pizzasIndi.find(p => p.titulo === 'Mortadela, pistacho y stracciatella INDI')?.imagen;
                                            return indiImg || '/icons/pizza.svg';
                                        }
                                        case 'Fitzzas': {
                                            const fitzzaImg = fitzzas.find(f => f.titulo.toLowerCase().includes('jamón crudo') || f.titulo.toLowerCase().includes('jamon crudo'))?.imagen;
                                            return fitzzaImg || '/icons/fitzza.svg';
                                        }
                                        case 'Salsas': {
                                            const bbq = salsas.find(s => s.titulo.toLowerCase() === 'bbq')?.imagen;
                                            return bbq || '/icons/aderezos.svg';
                                        }
                                        case 'Postres': {
                                            const amargo = postres.find(p => p.titulo.toLowerCase().includes('franuí chocolate amargo') || p.titulo.toLowerCase().includes('franu') && p.titulo.toLowerCase().includes('amargo'))?.imagen;
                                            return amargo || '/icons/postres.svg';
                                        }
                                        case 'Promociones': {
                                            const img = promociones.find(p => p.titulo === 'Pack 12 Empanadas')?.imagen;
                                            return img || '/icons/tab-pedir.svg';
                                        }
                                        default: return undefined;
                                    }
                                })();
                                const isActive = (() => {
                                    if (cat === 'Premium') return filtro === 'Empanadas' && tipoProducto === 'Premium';
                                    if (cat === 'Clasicas') return filtro === 'Empanadas' && tipoProducto === 'Clasicas';
                                    return filtro === cat;
                                })();
                                const label = cat === 'Clasicas' ? 'Clásicas' : cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        className={`ml-cat-item${isActive ? ' active' : ''}`}
                                        onClick={() => {
                                            if (cat === 'Premium') {
                                                setFiltro('Empanadas');
                                                setTipoProducto('Premium');
                                            } else if (cat === 'Clasicas') {
                                                setFiltro('Empanadas');
                                                setTipoProducto('Clasicas');
                                            } else {
                                                setFiltro(cat);
                                                setTipoProducto(null);
                                            }
                                            try { window.scrollTo({ top: (document.querySelector('.productos-busqueda')?.getBoundingClientRect().top || 0) + window.scrollY - 12, behavior: 'smooth' }); } catch {}
                                        }}
                                    >
                                        <div className="ml-cat-circle">
                                            {iconSrc ? (
                                                <img src={iconSrc} alt={label} />
                                            ) : (
                                                <i className="fa fa-tag" aria-hidden="true" />
                                            )}
                                        </div>
                                        <span className="ml-cat-label">{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="productos-categorias">
                        {categorias.map((cat, idx) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setFiltro(cat);
                                    setTipoProducto(null);
                                }}
                                className={`productos-btn ${filtro === cat ? "active" : ""}`}
                                type="button"
                                style={{ '--cat-index': idx } as React.CSSProperties }
                            >
                                <span>{cat}</span>
                            </button>
                        ))}
                    </div>
                )}

                {!isMobile && filtro === "Empanadas" && (
                    <div className="productos-subfiltros">
                        <button
                            onClick={() => setTipoProducto("Premium")}
                            className={`subfiltro-btn ${tipoProducto === "Premium" ? "active" : ""}`}
                            style={{ '--subfiltro-index': 0 } as React.CSSProperties }
                        >
                            <span>PREMIUM</span>
                        </button>
                        <span className="subfiltro-separator">|</span>
                        <button
                            onClick={() => setTipoProducto("Clasicas")}
                            className={`subfiltro-btn ${tipoProducto === "Clasicas" ? "active" : ""}`}
                            style={{ '--subfiltro-index': 1 } as React.CSSProperties }
                        >
                            <span>CLÁSICAS</span>
                        </button>
                    </div>
                )}

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
                                        <img src={prod.imagen} alt={prod.titulo} className="producto-img-mobile" />
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
                                    style={{ position: 'relative', '--card-index': idx } as React.CSSProperties }
                                >
                                    {/* Ícono 3D eliminado por requerimiento */}
                                    {/* Renderizado estándar para todas las cards, incluyendo Big burger */}
                                        <>
                                            <img src={prod.imagen} alt={prod.titulo} />
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
                                                {/* Botón sutil con ícono (overlay) */}
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
                                            </div>
                                        </>
                                </div>
                            );
                        })
                    )}
                </div>

                {productoSeleccionado && (
                    <ProductModal3D
                        producto={productoSeleccionado}
                        onClose={() => setProductoSeleccionado(null)}
                        tiene3D={EMPANADAS_3D.some(t => t.toLowerCase() === productoSeleccionado.titulo.toLowerCase()) || productoSeleccionado.titulo === "Franuí chocolate amargo" || productoSeleccionado.titulo === "Franuí chocolate con leche"}
                    />
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