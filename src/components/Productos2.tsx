import { useState, useMemo, useEffect } from "react";
import './Productos.css';

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
            {/* Grilla de imágenes por filas */}
            <div style={{ width: '100%', maxWidth: 1200, margin: '32px auto 0 auto' }}>
                {/* Primera fila: 01-04 */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
                    <img src="/01.png" alt="01" style={{ width: 305.8, height: 275, objectFit: 'contain', borderRadius: 12 }} />
                    <img src="/02.png" alt="02" style={{ width: 305.8, height: 275, objectFit: 'contain', borderRadius: 12 }} />
                    <img src="/03.png" alt="03" style={{ width: 305.8, height: 275, objectFit: 'contain', borderRadius: 12 }} />
                    <img src="/04.png" alt="04" style={{ width: 305.8, height: 275, objectFit: 'contain', borderRadius: 12 }} />
                </div>
                {/* Segunda fila: 05-07 */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
                    <img src="/05.png" alt="05" style={{ width: 305.8, height: 275, objectFit: 'contain', borderRadius: 12 }} />
                    <img src="/06.png" alt="06" style={{ width: 305.8, height: 275, objectFit: 'contain', borderRadius: 12 }} />
                    <img src="/07.png" alt="07" style={{ width: 305.8, height: 275, objectFit: 'contain', borderRadius: 12 }} />
                </div>
                {/* Tercera fila: 08-09 */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
                    <img src="/08.png" alt="08" style={{ width: 305.8, height: 275, objectFit: 'contain', borderRadius: 12 }} />
                    <img src="/09.png" alt="09" style={{ width: 305.8, height: 275, objectFit: 'contain', borderRadius: 12 }} />
                </div>
            </div>
        </div>
    );
} 