import { useState, useMemo, useEffect } from "react";
import './Productos.css';
import ProductModal3D from './ProductModal3D';

import { pizzas } from '../data/pizzasData';
import { empanadas } from '../data/empanadasData';
import { fitzzas } from '../data/fitzzasData';
import { aderezos } from '../data/aderezosData';
import { pizzasIndi } from '../data/pizzasIndiData';
import { salsas } from '../data/salsasData';
import { postres } from '../data/postresData';
import { promociones } from '../data/promocionesData';

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
    esPremium?: boolean;
}

const categorias = ["Promociones", "Empanadas", "Pizzas INDI", "Fitzzas", "Salsas", "Postres"];

export default function Productos() {
    const [filtro, setFiltro] = useState(categorias[1]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [tipoProducto, setTipoProducto] = useState<"Premium" | "Clasicas" | null>(null);
    const [displayedPrice, setDisplayedPrice] = useState<string>("");

    useEffect(() => {
        if (filtro === "Empanadas") {
            if (tipoProducto === "Clasicas") {
                setDisplayedPrice("$3.700");
            } else if (tipoProducto === "Premium") {
                setDisplayedPrice("$4.000");
            } else {
                setDisplayedPrice("");
            }
        } else {
            setDisplayedPrice("");
        }
    }, [filtro, tipoProducto]);

    const productosFiltrados = useMemo(() => {
        let productos: Producto[] = [];
        
        // Si hay una búsqueda, buscar en todas las categorías
        if (busqueda) {
            productos = [
                ...empanadas,
                ...pizzasIndi,
                ...fitzzas,
                ...salsas,
                ...postres,
                ...promociones
            ];
        } else {
            // Si no hay búsqueda, mostrar solo la categoría seleccionada
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
                case "Salsas":
                    productos = salsas;
                    break;
                case "Postres":
                    productos = postres;
                    break;
                case "Promociones":
                    productos = promociones;
                    break;
                default:
                    productos = [];
            }
        }

        return productos.filter(producto => {
            const coincideBusqueda = producto.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                                    (producto.descripcion && producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()));
            
            let coincideTipoEmpanada = true;
            if (filtro === "Empanadas" && !busqueda) {
                if (tipoProducto === "Premium") {
                    coincideTipoEmpanada = !!producto.esPremium;
                } else if (tipoProducto === "Clasicas") {
                    coincideTipoEmpanada = !producto.esPremium;
                }
            }

            return coincideBusqueda && coincideTipoEmpanada;
        });
    }, [filtro, busqueda, tipoProducto]);

    const extraerIngredientes = (descripcion: string): string[] => {
        return descripcion
            .replace(/elaborada con|y|,/g, ',')
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
    };

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

                <div className="productos-categorias">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setFiltro(cat);
                                setTipoProducto(null);
                            }}
                            className={`productos-btn ${filtro === cat ? "active" : ""}`}
                            type="button"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filtro === "Empanadas" && (
                    <div className="productos-subfiltros">
                        <button
                            onClick={() => setTipoProducto("Premium")}
                            className={`subfiltro-btn ${tipoProducto === "Premium" ? "active" : ""}`}
                        >
                            PREMIUM
                        </button>
                        <span className="subfiltro-separator">|</span>
                        <button
                            onClick={() => setTipoProducto("Clasicas")}
                            className={`subfiltro-btn ${tipoProducto === "Clasicas" ? "active" : ""}`}
                        >
                            CLÁSICAS
                        </button>
                    </div>
                )}

                {filtro === "Empanadas" && tipoProducto && (
                    <div className="productos-precio-display">
                        <button className="precio-display-btn">
                            PRECIO {displayedPrice}
                        </button>
                    </div>
                )}

                <div className="productos-lista">
                    {productosFiltrados.length === 0 ? (
                        <div className="productos-no-resultados">
                            No se encontraron productos que coincidan con tu búsqueda
                        </div>
                    ) : (
                        productosFiltrados.map((prod) => (
                            <div className="producto-card" key={prod.titulo} onClick={() => setProductoSeleccionado(prod)}>
                                {filtro === "Empanadas" && !tipoProducto && (
                                    <div className="producto-tipo">
                                        {prod.esPremium ? "Premium" : "Clásica"}
                                    </div>
                                )}
                                <img src={prod.imagen} alt={prod.titulo} />
                                <div className="producto-info">
                                    <h3>{prod.titulo}</h3>
                                    <p>{prod.descripcion}</p>
                                    {prod.precio && <div className="producto-precio">{prod.precio}</div>}
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