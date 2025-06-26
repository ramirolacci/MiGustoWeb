import { useState, useMemo, useEffect } from "react";
import './Productos.css';
import ProductView from './ProductView';
import ProductModal3D from './ProductModal3D';
import { empanadas } from '../data/empanadasData';

const categorias = ["Promociones", "Empanadas", "Pizzas", "Pizzas INDI", "Fitzzas", "Salsas", "Postres"];

// Defino el tipo para los productos, incluyendo noHover opcional
interface ProductData {
    id: string;
    top: string;
    left: string;
    width: string;
    height: string;
    noHover?: boolean;
}

const productsData: ProductData[] = [
    { id: '01', top: '5%', left: '2%', width: '23%', height: '25%' },
    { id: '02', top: '5%', left: '26%', width: '23%', height: '25%' },
    { id: '03', top: '5%', left: '50%', width: '23%', height: '25%' },
    { id: '04', top: '5%', left: '74%', width: '23%', height: '25%' },
    { id: '05', top: '37%', left: '14%', width: '23%', height: '25%' },
    { id: '06', top: '37%', left: '39%', width: '23%', height: '25%', noHover: true },
    { id: '07', top: '37%', left: '64%', width: '23%', height: '25%' },
    { id: '08', top: '69%', left: '26%', width: '23%', height: '25%' },
    { id: '09', top: '69%', left: '50%', width: '23%', height: '25%' },
];

export default function Productos2() {
    const [filtro, setFiltro] = useState(categorias[1]);
    const [busqueda, setBusqueda] = useState("");
    const [tipoProducto, setTipoProducto] = useState<"Premium" | "Clasicas" | null>(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);

    // Mapeo de id a producto de empanadas
    const idToProducto: Record<string, any> = {
        '01': empanadas.find(e => e.titulo.toLowerCase().includes('vacio')),
        '02': empanadas.find(e => e.titulo.toLowerCase().includes('big')),
        '03': empanadas.find(e => e.titulo.toLowerCase().includes('matambre')),
        '04': empanadas.find(e => e.titulo.toLowerCase().includes('cheese')),
        '05': empanadas.find(e => e.titulo.toLowerCase().includes('american')),
        '08': empanadas.find(e => e.titulo.toLowerCase().includes('pibil')),
        '09': empanadas.find(e => e.titulo.toLowerCase().includes('veggie')),
    };

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
            </div>
            {/* Distribución con posiciones absolutas */}
            <div style={{
                position: 'relative',
                width: '100vw',
                height: '90vh',
                maxWidth: '100vw',
                margin: '32px 0 0 0',
                background: 'transparent',
                overflow: 'hidden'
            }}>
                {productsData.map(product => (
                    <div key={product.id} style={{ position: 'absolute', top: product.top, left: product.left, width: product.width, height: product.height }}>
                        <ProductView 
                            image={`/${product.id}.png`} 
                            alt={`Producto ${product.id}`} 
                            width={dimensions.width * 0.23} 
                            height={dimensions.height * 0.23} 
                            noHover={!!product.noHover}
                            onClick={() => {
                                if (product.id === '07') return;
                                const prod = idToProducto[product.id];
                                if (prod) setProductoSeleccionado(prod);
                            }}
                            style={{ cursor: product.id !== '07' ? 'pointer' : 'default' }}
                        />
                    </div>
                ))}
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