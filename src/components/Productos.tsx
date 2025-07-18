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
    "Big burguer",
    "Mexican Pibil pork",
    "Mexican pibil pork",
    "Mexican Veggie",
    "Mexican veggie",
    "Matambre a la pizza",
    "Cheese Burguer",
    "Cheese burguer",
    "American Chicken",
    "American chicken",
    "Vacio y provoleta",
];

export default function Productos() {
    const [filtro, setFiltro] = useState(categorias[1]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [tipoProducto, setTipoProducto] = useState<"Premium" | "Clasicas" | null>(null);
    const [esVegetariano, setEsVegetariano] = useState<boolean>(false);
    const [showPrecioModal, setShowPrecioModal] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                        productosFiltrados.map((prod) => {
                            const tiene3D = EMPANADAS_3D.includes(prod.titulo);
                            if (isMobile) {
                                return (
                                    <div className="producto-row-mobile" key={prod.titulo + '-' + prod.categoria} onClick={() => setProductoSeleccionado(prod)}>
                                        <img src={prod.imagen} alt={prod.titulo} className="producto-img-mobile" />
                                        <div className="producto-info-mobile">
                                            <h3>{prod.titulo}</h3>
                                            <p>{prod.descripcion}</p>
                                            {prod.ingredientes && prod.ingredientes.length > 0 && (
                                                <p className="ingredientes-mobile">{prod.ingredientes.join(', ')}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
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
                                                fontSize: '1.45rem', // Un poco más grande
                                                fontWeight: 600,
                                                margin: '-1.3rem 0 0.4rem 0', // Más arriba aún, margen negativo mayor
                                                letterSpacing: '0.03em',
                                                lineHeight: 1.18,
                                                textAlign: 'center',
                                                textShadow: 'rgb(255 215 0 / 65%) 0px 2px 8px, rgb(194 186 144) 0px 1px 0px',
                                                padding: '0.18em 0.1em',
                                                borderRadius: '12px',
                                                position: 'relative',
                                                overflow: 'visible',
                                                background: 'transparent',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundImage: 'linear-gradient(90deg, #FFD700 10%, #FFA500 60%, #fff 100%)',
                                                animation: 'brilloTituloCard 2.5s linear infinite',
                                                ...( [
                                                    'Jamón, Tomate, Huevo, Roquefort',
                                                    'Provolone, Jamón y Longaniza',
                                                    'Provolone, Jamón y Morrón',
                                                    'Jamón Crudo, Rúcula y Stracciatella INDI',
                                                    'Mortadela, Pistacho y Stracciatella INDI',
                                                    'Fitzza Mortadela, Pistacho y Stracciatella',
                                                    'Fitzza Jamón Crudo, Rúcula y Stracciatella',
                                                    'Franuí Chocolate Con Leche',
                                                    'Jamón, tomate, huevo y roquefort',
                                                    'Provolone, jamón y longaniza',
                                                    'Provolone, jamón y morrón',
                                                    'Jamón crudo, rúcula y stracciatella INDI',
                                                    'Mortadela, pistacho y stracciatella INDI',
                                                    'Fitzza mortadela, pistacho y stracciatella',
                                                    'Fitzza jamón crudo, rúcula y stracciatella',
                                                    'Fitzza Jamón crudo, rúcula y stracciatella'
                                                ].includes(prod.titulo)
                                                    ? {
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: 'block',
                                                    }
                                                    : {})
                                            }}
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
                                                        fontSize: '0.93rem', // Más pequeño para asegurar dos líneas
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
                                                        maxHeight: '2.7em', // Ajuste más preciso
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
                        tiene3D={EMPANADAS_3D.some(t => t.toLowerCase() === productoSeleccionado.titulo.toLowerCase())}
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