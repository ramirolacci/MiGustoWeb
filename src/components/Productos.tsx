import { useState, useMemo, useEffect } from "react";
import './Productos.css';

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

    return (
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
                            key={prod.titulo}
                            onClick={() => setProductoSeleccionado(prod)}
                        >
                            <div className="producto-imagen-container">
                                <img
                                    src={prod.imagen}
                                    alt={prod.titulo}
                                    className="producto-img"
                                />
                                <div className="producto-badges">
                                    {prod.esRecomendado && (
                                        <span className="badge badge-recomendado">Recomendado</span>
                                    )}
                                    {prod.esVegetariano && (
                                        <span className="badge badge-vegetariano">Vegetariano</span>
                                    )}
                                    {prod.esSinGluten && (
                                        <span className="badge badge-sin-gluten">Sin Gluten</span>
                                    )}
                                </div>
                            </div>
                            <div className="producto-info">
                                <h3 className="producto-titulo">{prod.titulo}</h3>
                                {prod.precio && (
                                    <p className="producto-precio">{prod.precio}</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {productoSeleccionado && (
                <div className="modal-overlay" onClick={() => setProductoSeleccionado(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setProductoSeleccionado(null)}>×</button>
                        <div className="modal-header">
                            <img
                                src={productoSeleccionado.imagen}
                                alt={productoSeleccionado.titulo}
                                className="modal-img"
                            />
                            <div className="modal-badges">
                                {productoSeleccionado.esRecomendado && (
                                    <span className="badge badge-recomendado">Recomendado</span>
                                )}
                                {productoSeleccionado.esVegetariano && (
                                    <span className="badge badge-vegetariano">Vegetariano</span>
                                )}
                                {productoSeleccionado.esSinGluten && (
                                    <span className="badge badge-sin-gluten">Sin Gluten</span>
                                )}
                            </div>
                        </div>
                        <div className="modal-info">
                            <h2>{productoSeleccionado.titulo}</h2>
                            <p className="modal-descripcion">{productoSeleccionado.descripcion}</p>
                            
                            <div className="modal-detalles">
                                <div className="detalle-item">
                                    <h3>Ingredientes</h3>
                                    <ul className="ingredientes-lista">
                                        {extraerIngredientes(productoSeleccionado.descripcion).map((ingrediente, index) => (
                                            <li key={index}>{ingrediente}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {productoSeleccionado.tiempoPreparacion && (
                                    <div className="detalle-item">
                                        <h3>Tiempo de Preparación</h3>
                                        <p>{productoSeleccionado.tiempoPreparacion}</p>
                                    </div>
                                )}
                                
                                {productoSeleccionado.calorias && (
                                    <div className="detalle-item">
                                        <h3>Información Nutricional</h3>
                                        <p>{productoSeleccionado.calorias}</p>
                                    </div>
                                )}
                                
                                {productoSeleccionado.precio && (
                                    <div className="detalle-item precio">
                                        <h3>Precio</h3>
                                        <p className="precio-valor">{productoSeleccionado.precio}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}