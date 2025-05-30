import { useState, useMemo } from "react";
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

    const productosFiltrados = useMemo(() => {
        switch (filtro) {
            case "Empanadas":
                return empanadas;
            case "Pizzas INDI":
                return pizzasIndi;
            case "Fitzzas":
                return fitzzas;
            case "Pizzas":
                return pizzas;
            case "Aderezos":
                return aderezos;
            default:
                return [];
        }
    }, [filtro]);

    const extraerIngredientes = (descripcion: string): string[] => {
        return descripcion
            .replace(/elaborada con|y|,/g, ',')
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
    };

    return (
        <div className="productos-container">
            <h2 className="productos-titulo" style={{ textAlign: "center" }}>Conocé nuestros productos</h2>
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
                {productosFiltrados.map((prod) => (
                    <div 
                        className="producto-card" 
                        key={prod.titulo}
                        onClick={() => setProductoSeleccionado(prod)}
                    >
                        <img
                            src={prod.imagen}
                            alt={prod.titulo}
                            className="producto-img"
                        />
                        <h3 className="producto-titulo">{prod.titulo}</h3>
                    </div>
                ))}
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