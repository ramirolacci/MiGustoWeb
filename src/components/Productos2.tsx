import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Productos2.css';
import ProductModal3D from './ProductModal3D';
import MobileProductDetail from './MobileProductDetail';
import IngredientExplodedView from './IngredientExplodedView';
import { explodedProductConfigs } from '../data/explodedViewConfig';
import { getProductData } from '../utils/productDataLoader';

const EMPANADAS_3D = [
    "Mexican pibil pork",
    "Big burger",
    "Matambre a la pizza",
    "Cheese burger",
    "Vacio y provoleta",
    "American chicken"
];

const categorias = ["Empanadas", "Pizzas", "Pizzas INDI", "Fitzzas", "Salsas", "Postres"];

interface Product {
    titulo: string;
    descripcion: string;
    imagen: string;
    imagenCard?: string;
    precio?: string | number;
    categoria: string;
    ingredientes?: string[];
    esPremium?: boolean;
    esVegetariano?: boolean;
    esRecomendado?: boolean;
}

function formatearPrecio(precio: string | number) {
    const num = typeof precio === "string" ? parseInt(precio.replace(/\D/g, "")) : precio;
    if (isNaN(num)) return precio;
    return num.toLocaleString("es-AR");
}

export default function Productos2() {
    const [activeCategory, setActiveCategory] = useState<string>("Empanadas");
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Product | null>(null);
    const dragStartX = useRef<number | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset active index when category changes
    useEffect(() => {
        setActiveIndex(0);
    }, [activeCategory]);

    // Fetch dynamic product data mapped to existing categories
    const productData = getProductData();

    const itemsByCategory = useMemo(() => {
        // Reorder Empanadas safely:
        let orderedEmpanadas = [...(productData.empanadas || [])];
        const pibil = orderedEmpanadas.find(e => e.titulo.toLowerCase() === "mexican pibil pork");
        const bigBurger = orderedEmpanadas.find(e => e.titulo.toLowerCase() === "big burger");
        const matambre = orderedEmpanadas.find(e => e.titulo.toLowerCase() === "matambre a la pizza");
        
        if (pibil && bigBurger && matambre) {
            const rest = orderedEmpanadas.filter(e => 
                e.titulo.toLowerCase() !== "mexican pibil pork" &&
                e.titulo.toLowerCase() !== "big burger" &&
                e.titulo.toLowerCase() !== "matambre a la pizza"
            );
            orderedEmpanadas = [pibil, matambre, ...rest, bigBurger];
        }

        // Reorder Pizzas safely:
        let orderedPizzas = [...(productData.pizzas || [])];
        const muzza = orderedPizzas.find(p => p.titulo.toLowerCase() === "muzzarella");
        const caprese = orderedPizzas.find(p => p.titulo.toLowerCase() === "caprese");
        const provoloneJamonMorron = orderedPizzas.find(p => p.titulo.toLowerCase() === "provolone, jamón y morrón");
        
        if (muzza && caprese && provoloneJamonMorron) {
            const rest = orderedPizzas.filter(p => 
                p.titulo.toLowerCase() !== "muzzarella" &&
                p.titulo.toLowerCase() !== "caprese" &&
                p.titulo.toLowerCase() !== "provolone, jamón y morrón"
            );
            orderedPizzas = [muzza, caprese, ...rest, provoloneJamonMorron];
        }

        // Reorder Pizzas INDI safely:
        let orderedPizzasIndi = [...(productData.pizzasIndi || [])];
        const napoIndi = orderedPizzasIndi.find(p => p.titulo.toLowerCase() === "napolitana indi");
        if (napoIndi) {
            const rest = orderedPizzasIndi.filter(p => p.titulo.toLowerCase() !== "napolitana indi");
            orderedPizzasIndi = [...rest, napoIndi];
        }

        // Reorder Salsas safely:
        let orderedSalsas = [...(productData.salsas || [])];
        const cheddar = orderedSalsas.find(s => s.titulo.toLowerCase() === "cheddar");
        const criolla = orderedSalsas.find(s => s.titulo.toLowerCase() === "criolla");
        const ketchup = orderedSalsas.find(s => s.titulo.toLowerCase() === "american ketchup");
        
        if (cheddar && criolla && ketchup) {
            const rest = orderedSalsas.filter(s => 
                s.titulo.toLowerCase() !== "cheddar" &&
                s.titulo.toLowerCase() !== "criolla" &&
                s.titulo.toLowerCase() !== "american ketchup"
            );
            orderedSalsas = [cheddar, criolla, ...rest, ketchup];
        }

        return {
            "Empanadas": orderedEmpanadas,
            "Pizzas": orderedPizzas,
            "Pizzas INDI": orderedPizzasIndi,
            "Fitzzas": productData.fitzzas || [],
            "Salsas": orderedSalsas,
            "Postres": productData.postres || []
        } as Record<string, Product[]>;
    }, [productData]);

    const currentProducts = useMemo(() => {
        return itemsByCategory[activeCategory] || [];
    }, [itemsByCategory, activeCategory]);

    const totalItems = currentProducts.length;

    const explodedConfig = useMemo(() => {
        if (!productoSeleccionado) return null;

        const { titulo, categoria } = productoSeleccionado;

        if (categoria === 'Pizza' || activeCategory === 'Pizzas') return explodedProductConfigs[titulo + '_PIZZA'];
        if (categoria === 'Pizzas INDI' || activeCategory === 'Pizzas INDI') return explodedProductConfigs[titulo + '_INDI'];
        if (categoria === 'Fitzzas' || activeCategory === 'Fitzzas') return explodedProductConfigs[titulo + '_FITZZA'];
        if (categoria === 'Salsas' || activeCategory === 'Salsas') return explodedProductConfigs[titulo + '_ADEREZO'];
        if (categoria === 'Postres' || activeCategory === 'Postres') return explodedProductConfigs[titulo + '_POSTRE'];

        return explodedProductConfigs[titulo];
    }, [productoSeleccionado, activeCategory]);

    const handleNextProduct = () => {
        if (totalItems <= 1) return;
        const nextIdx = (activeIndex + 1) % totalItems;
        setActiveIndex(nextIdx);
        setProductoSeleccionado(currentProducts[nextIdx] as any);
    };

    const handlePrevProduct = () => {
        if (totalItems <= 1) return;
        const prevIdx = (activeIndex - 1 + totalItems) % totalItems;
        setActiveIndex(prevIdx);
        setProductoSeleccionado(currentProducts[prevIdx] as any);
    };

    // Navigation functions with wrap-around
    const handleNext = () => {
        if (totalItems <= 1) return;
        setActiveIndex((prev) => (prev + 1) % totalItems);
    };

    const handlePrev = () => {
        if (totalItems <= 1) return;
        setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [totalItems]);

    // Drag / Touch gestures for carousel swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        dragStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (dragStartX.current === null) return;
        const diff = dragStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrev();
        }
        dragStartX.current = null;
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        dragStartX.current = e.clientX;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (dragStartX.current === null) return;
        const diff = dragStartX.current - e.clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrev();
        }
        dragStartX.current = null;
    };

    // Helper math to calculate slider offsets and positioning classes
    const getCardClass = (idx: number) => {
        if (totalItems === 0) return "hidden-right";
        if (idx === activeIndex) return "active";

        // Previous and next mapping
        const prevIdx = (activeIndex - 1 + totalItems) % totalItems;
        const nextIdx = (activeIndex + 1) % totalItems;

        if (idx === prevIdx && totalItems > 1) return "prev";
        if (idx === nextIdx && totalItems > 1) return "next";

        // Determine if left or right based on relative difference
        let diff = idx - activeIndex;
        // Adjust for wrap around relative display
        if (diff < -totalItems / 2) diff += totalItems;
        if (diff > totalItems / 2) diff -= totalItems;

        return diff < 0 ? "hidden-left" : "hidden-right";
    };

    const activeProduct = currentProducts[activeIndex];

    return (
        <div 
            className="productos2-section"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {/* Header section with heavy Vicio style typography */}
            <div className="productos2-header">
                <div className="productos2-title-block">
                    <h1 className="productos2-main-title">
                        MÁXIMA DEFINICIÓN DE <br />
                        <span className="productos2-category-span">Empanadas.</span>
                    </h1>
                    <Link to="/productos" className="productos2-collection-link">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="19" x2="19" y2="5"></line>
                            <polyline points="12 5 19 5 19 12"></polyline>
                        </svg>
                        Ver Menú Tradicional
                    </Link>
                </div>
                <div className="productos2-top-right">
                    EL MEJOR SABOR DE HOY, <br />
                    HECHO A TU GUSTO.
                </div>
            </div>

            {/* 3D Carousel slider core */}
            <div 
                className="productos2-carousel-container"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                {totalItems === 0 ? (
                    <div className="productos2-empty-slider">
                        No hay productos disponibles en esta categoría.
                    </div>
                ) : (
                    <>
                        {/* Mobile side arrows */}
                        {totalItems > 1 && (
                            <>
                                <button className="productos2-mobile-side-arrow left" onClick={(e) => { e.stopPropagation(); handlePrev(); }} aria-label="Anterior">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <button className="productos2-mobile-side-arrow right" onClick={(e) => { e.stopPropagation(); handleNext(); }} aria-label="Siguiente">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </>
                        )}
                        <div className="productos2-slider-track" key={activeCategory}>
                        {currentProducts.map((prod, idx) => {
                            const cardClass = getCardClass(idx);
                            const isActive = cardClass === "active";

                            return (
                                <div
                                    key={prod.titulo + '-' + idx}
                                    className={`productos2-slider-card ${cardClass}`}
                                    onClick={() => {
                                        if (isActive) {
                                            setProductoSeleccionado(prod);
                                        } else {
                                            setActiveIndex(idx);
                                        }
                                    }}
                                >
                                    {/* Floating cutout product image */}
                                    <div className="productos2-card-image-wrapper">
                                        <img 
                                            src={prod.imagenDetalle || prod.imagen} 
                                            alt={prod.titulo} 
                                            className="productos2-card-img" 
                                        />
                                    </div>

                                    {/* Product description and pricing box */}
                                    <div className="productos2-product-info-box">
                                        <h3 className="productos2-product-title">
                                            {prod.titulo}
                                        </h3>
                                        <p className="productos2-product-desc">
                                            {prod.descripcion}
                                        </p>
                                        {prod.precio && (
                                            <span className="productos2-product-price">
                                                ${formatearPrecio(prod.precio)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    </>
                )}
            </div>

            {/* Center navigation controls */}
            {totalItems > 0 && (
                <div className="productos2-controls-row">
                    <div className="productos2-arrow-capsule">
                        <button className="productos2-nav-btn" onClick={handlePrev} type="button">
                            ←
                        </button>
                        <span className="productos2-counter">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
                        </span>
                        <button className="productos2-nav-btn" onClick={handleNext} type="button">
                            →
                        </button>
                    </div>

                    {activeProduct && (
                        <button 
                            className="productos2-action-btn" 
                            onClick={() => setProductoSeleccionado(activeProduct)}
                            type="button"
                        >
                            Ver Detalles
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </button>
                    )}
                </div>
            )}

            {/* Premium list footer with slider categories */}
            <div className="productos2-footer">
                <span className="productos2-slogan">
                    EXPERTOS EN DARTE LO TUYO.
                </span>
                
                <ul className="productos2-categories-bar">
                    {categorias.map((cat) => (
                        <li
                            key={cat}
                            className={`productos2-cat-item ${activeCategory === cat ? "active" : ""}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>

                <div className="productos2-footer-links">
                    <a href="#" className="productos2-footer-link">Legal</a>
                    <a href="#" className="productos2-footer-link">Instagram</a>
                    <a href="#" className="productos2-footer-link">TikTok</a>
                </div>
            </div>

            {/* Product detail Modal matching Productos1 */}
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
                            producto={productoSeleccionado as any}
                            onClose={() => setProductoSeleccionado(null)}
                            tiene3D={EMPANADAS_3D.some(t => t.toLowerCase() === productoSeleccionado.titulo.toLowerCase())}
                        />
                    )}
                    {productoSeleccionado && isMobile && (
                        <MobileProductDetail
                            producto={productoSeleccionado as any}
                            onClose={() => setProductoSeleccionado(null)}
                        />
                    )}
                </>
            )}
        </div>
    );
}