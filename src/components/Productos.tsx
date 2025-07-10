import { useState, useMemo, useEffect } from "react";
import './Productos.css';
import ProductModal3D from './ProductModal3D';
import NavBar from './NavBar';

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
    "Big Burguer",
    "Mexican Pibil pork",
    "Mexican Veggie",
    "Matambre a la pizza",
    "Cheese Burguer",
    "American Chicken",
    "Vacio y provoleta",
];

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

    useEffect(() => {
        const isMobile = window.innerWidth < 900;
        if (productoSeleccionado && isMobile) {
            document.body.classList.add('ocultar-navbar');
        } else {
            document.body.classList.remove('ocultar-navbar');
        }
        return () => {
            document.body.classList.remove('ocultar-navbar');
        };
    }, [productoSeleccionado]);

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
                    <span className="flecha-deslizable">→</span>
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
                        productosFiltrados.map((prod) => {
                            const tiene3D = EMPANADAS_3D.includes(prod.titulo);
                            return (
                                <div 
                                    className="producto-card" 
                                    key={prod.titulo + '-' + prod.categoria} 
                                    onClick={() => setProductoSeleccionado(prod)}
                                    data-categoria={filtro}
                                    style={{ position: 'relative' }}
                                >
                                    {tiene3D && (
                                        <span className="icono-3d" title="Vista 3D disponible" style={{position:'absolute',top:10,right:10,zIndex:2}}>
                                            <span className="icono-3d-minimal">3D</span>
                                        </span>
                                    )}
                                    <img src={prod.imagen} alt={prod.titulo} />
                                    <div className="producto-info">
                                        <h3
                                            style={{
                                                fontSize: '2.3rem',
                                                fontWeight: 900,
                                                margin: '0.7rem 0 0.7rem 0',
                                                letterSpacing: '0.05em',
                                                lineHeight: 1.12,
                                                textAlign: 'center',
                                                textShadow: '0 2px 8px #FFD70077, 0 1px 0 #fff',
                                                padding: '0.45em 0.2em',
                                                borderRadius: '22px',
                                                border: '2.5px solid #FFD700',
                                                boxShadow: '0 4px 24px 0 #FFD70033, 0 2px 8px 0 #0008',
                                                position: 'relative',
                                                overflow: 'visible',
                                                background: 'transparent',
                                            }}
                                        >
                                            <span style={{
                                                display: 'inline',
                                                background: 'linear-gradient(90deg, #FFD700 10%, #FFA500 60%, #fff 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                color: 'transparent',
                                                backgroundSize: '300% 300%',
                                                backgroundPosition: '0% 50%',
                                                animation: 'brilloTituloCard 2.5s linear infinite',
                                            }}>{prod.titulo}</span>
                                        </h3>
                                        <div style={{
                                            width: '80%',
                                            height: '0.7em',
                                            margin: '-0.3em auto 0 auto',
                                            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.01) 100%)',
                                            opacity: 0.7,
                                            borderRadius: '50%',
                                            filter: 'blur(2.5px)',
                                        }}></div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {productoSeleccionado && (
                    <ProductModal3D
                        producto={productoSeleccionado}
                        onClose={() => setProductoSeleccionado(null)}
                        tiene3D={EMPANADAS_3D.includes(productoSeleccionado.titulo)}
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