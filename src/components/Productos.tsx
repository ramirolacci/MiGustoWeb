import { useState, useMemo, useEffect } from "react";
import './Productos.css';
import ProductCard3D from './ProductCard3D';
import ProductModal3D from './ProductModal3D';

import { pizzas } from '../data/pizzasData';
import { empanadas } from '../data/empanadasData';
import { fitzzas } from '../data/fitzzasData';
import { aderezos } from '../data/aderezosData';
import { pizzasIndi } from '../data/pizzasIndiData';

interface Producto {
    titulo: string;
    descripcion: string;
    imagen: string;
    ingredientes?: string[];
    tiempoPreparacion?: string;
    calorias?: string;
    precio?: string;
    esRecomendado?: boolean;
    esVegetariano?: boolean;
    esSinGluten?: boolean;
}

const categorias = ["Empanadas", "Pizzas INDI", "Fitzzas", "Pizzas", "Aderezos"];

export default function Productos() {
    const [filtro, setFiltro] = useState(categorias[0]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [filtrosActivos, setFiltrosActivos] = useState({
        recomendados: false,
        vegetarianos: false,
        sinGluten: false
    });

    const productosFiltrados = useMemo(() => {
        let productos: Producto[] = [];
        switch (filtro) {
            case "Empanadas":
                productos = empanadas;
                break;
            case "Pizzas INDI":
                productos = pizzasIndi;
                break;
            case "Fitzzas":
                productos = fitzzas;
                break;
            case "Pizzas":
                productos = pizzas;
                break;
            case "Aderezos":
                productos = aderezos;
                break;
            default:
                productos = [];
        }

        return productos.filter(producto => {
            const coincideBusqueda = producto.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                                    producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
            
            const coincideFiltros = (!filtrosActivos.recomendados || producto.esRecomendado) &&
                                  (!filtrosActivos.vegetarianos || producto.esVegetariano) &&
                                  (!filtrosActivos.sinGluten || producto.esSinGluten);

            return coincideBusqueda && coincideFiltros;
        });
    }, [filtro, busqueda, filtrosActivos]);

    const extraerIngredientes = (descripcion: string): string[] => {
        return descripcion
            .replace(/elaborada con|y|,/g, ',')
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
    };

    // Cerrar modal con Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setProductoSeleccionado(null);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;
        const startTransform = img.style.transform || 'translate(0px, 0px)';
        let currentX = 0;
        let currentY = 0;

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            currentX = deltaX;
            currentY = deltaY;
            
            img.style.transform = `translate(${currentX}px, ${currentY}px)`;
        };

        const handleTouchEnd = () => {
            img.style.transform = startTransform;
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    };

    return (
        <div className="productos-section">
            <div className="background-overlay"></div>
            <div className="productos-container">
                <h2 className="productos-titulo">Conocé nuestros productos</h2>
                
                <div className="productos-busqueda">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="productos-input-busqueda"
                    />
                    <i className="fas fa-search buscador-icon"></i>
                </div>

                <div className="productos-filtros">
                    <div className="filtros-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={filtrosActivos.recomendados}
                                onChange={(e) => setFiltrosActivos(prev => ({
                                    ...prev,
                                    recomendados: e.target.checked
                                }))}
                            />
                            <span className="badge badge-recomendado">Recomendados</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filtrosActivos.vegetarianos}
                                onChange={(e) => setFiltrosActivos(prev => ({
                                    ...prev,
                                    vegetarianos: e.target.checked
                                }))}
                            />
                            <span className="badge badge-vegetariano">Vegetarianos</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filtrosActivos.sinGluten}
                                onChange={(e) => setFiltrosActivos(prev => ({
                                    ...prev,
                                    sinGluten: e.target.checked
                                }))}
                            />
                            <span className="badge badge-sin-gluten">Sin Gluten</span>
                        </label>
                    </div>
                </div>

                <div className="productos-categorias">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFiltro(cat)}
                            className={`productos-btn ${filtro === cat ? "active" : ""}`}
                            type="button"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="productos-lista">
                    {productosFiltrados.length === 0 ? (
                        <div className="productos-no-resultados">
                            No se encontraron productos que coincidan con tu búsqueda
                        </div>
                    ) : (
                        productosFiltrados.map((prod) => (
                            <div 
                                className="producto-card"
                                onClick={() => setProductoSeleccionado(prod)}
                                key={prod.titulo}
                            >
                                <img src={prod.imagen} alt={prod.titulo} />
                                <div className="producto-info">
                                    <h3>{prod.titulo}</h3>
                                    <p>{prod.descripcion}</p>
                                    <div className="producto-etiquetas">
                                        {prod.esRecomendado && <span className="etiqueta recomendado">Recomendado</span>}
                                        {prod.esVegetariano && <span className="etiqueta vegetariano">Vegetariano</span>}
                                        {prod.esSinGluten && <span className="etiqueta sin-gluten">Sin Gluten</span>}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {productoSeleccionado && (
                    <ProductModal3D
                        producto={productoSeleccionado}
                        onClose={() => setProductoSeleccionado(null)}
                    />
                )}
            </div>
        </div>
    );
}