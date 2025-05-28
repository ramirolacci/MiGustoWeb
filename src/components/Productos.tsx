import { useState, useMemo } from "react";
import './Productos.css';

import { pizzas } from '../data/pizzasData';
import { empanadas } from '../data/empanadasData';
import { fitzzas } from '../data/fitzzasData';
import { aderezos } from '../data/aderezosData';
import { pizzasIndi } from '../data/pizzasIndiData';

const categorias = ["Empanadas", "Pizzas INDI", "Fitzzas", "Pizzas", "Aderezos"];

export default function Productos() {
    const [filtro, setFiltro] = useState(categorias[0]);

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
                    <div className="producto-card" key={prod.titulo}>
                        <img
                            src={prod.imagen}
                            alt={prod.titulo}
                            className="producto-img"
                        />
                        <div className="producto-info">
                            <h3>{prod.titulo}</h3>
                            <p>{prod.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}