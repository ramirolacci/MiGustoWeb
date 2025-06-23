import { useState, useMemo, useEffect } from "react";
import './Productos.css';
import ProductView from './ProductView';

const categorias = ["Promociones", "Empanadas", "Pizzas", "Pizzas INDI", "Fitzzas", "Salsas", "Postres"];

export default function Productos2() {
    const [filtro, setFiltro] = useState(categorias[1]);
    const [busqueda, setBusqueda] = useState("");
    const [tipoProducto, setTipoProducto] = useState<"Premium" | "Clasicas" | null>(null);

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
                {/* Primera fila: 4 productos */}
                <div style={{ position: 'absolute', top: '5%', left: '2%', width: '23%', height: '25%' }}>
                    <ProductView image="/01.png" alt="01" width={window.innerWidth * 0.23} height={window.innerHeight * 0.225} />
                </div>
                <div style={{ position: 'absolute', top: '5%', left: '26%', width: '23%', height: '25%' }}>
                    <ProductView image="/02.png" alt="02" width={window.innerWidth * 0.23} height={window.innerHeight * 0.225} />
                </div>
                <div style={{ position: 'absolute', top: '5%', left: '50%', width: '23%', height: '25%' }}>
                    <ProductView image="/03.png" alt="03" width={window.innerWidth * 0.23} height={window.innerHeight * 0.225} />
                </div>
                <div style={{ position: 'absolute', top: '5%', left: '74%', width: '23%', height: '25%' }}>
                    <ProductView image="/04.png" alt="04" width={window.innerWidth * 0.23} height={window.innerHeight * 0.225} />
                </div>
                {/* Segunda fila: 3 productos */}
                <div style={{ position: 'absolute', top: '37%', left: '14%', width: '23%', height: '25%' }}>
                    <ProductView image="/05.png" alt="05" width={window.innerWidth * 0.23} height={window.innerHeight * 0.225} />
                </div>
                <div style={{ position: 'absolute', top: '37%', left: '39%', width: '23%', height: '25%' }}>
                    <ProductView image="/06.png" alt="06" width={window.innerWidth * 0.23} height={window.innerHeight * 0.225} />
                </div>
                <div style={{ position: 'absolute', top: '37%', left: '64%', width: '23%', height: '25%' }}>
                    <ProductView image="/07.png" alt="07" width={window.innerWidth * 0.23} height={window.innerHeight * 0.225} />
                </div>
                {/* Tercera fila: 2 productos */}
                <div style={{ position: 'absolute', top: '69%', left: '26%', width: '23%', height: '25%' }}>
                    <ProductView image="/08.png" alt="08" width={window.innerWidth * 0.23} height={window.innerHeight * 0.225} />
                </div>
                <div style={{ position: 'absolute', top: '69%', left: '50%', width: '23%', height: '25%' }}>
                    <ProductView image="/09.png" alt="09" width={window.innerWidth * 0.23} height={window.innerHeight * 0.225} />
                </div>
            </div>
        </div>
    );
} 