import { useState, useMemo, useEffect } from "react";
import './Productos.css';
import ProductModal3D from './ProductModal3D';

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

export default function Productos() {
    const [filtro, setFiltro] = useState(categorias[1]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [tipoProducto, setTipoProducto] = useState<"Premium" | "Clasicas" | null>(null);
    const [esVegetariano, setEsVegetariano] = useState<boolean>(false);
    const [showPrecioModal, setShowPrecioModal] = useState<boolean>(false);

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

                <div className="productos-lista">
                    {productosFiltrados.length === 0 ? (
                        <div className="productos-no-resultados">
                            No se encontraron productos que coincidan con tu búsqueda
                        </div>
                    ) : (
                        productosFiltrados.map((prod) => (
                            <div 
                                className="producto-card" 
                                key={prod.titulo + '-' + prod.categoria} 
                                onClick={() => setProductoSeleccionado(prod)}
                                data-categoria={filtro}
                            >
                                {prod.precio && (
                                    <div className="producto-tipo">
                                        ${formatearPrecio(prod.precio)}
                                    </div>
                                )}
                                <img src={prod.imagen} alt={prod.titulo} />
                                <div className="producto-info">
                                    <h3>{prod.titulo}</h3>
                                    <p>{prod.descripcion}</p>
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