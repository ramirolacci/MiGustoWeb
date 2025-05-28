import React, { useState, useMemo } from "react";
import './Productos.css';

interface Producto {
    imagen: string;
    titulo: string;
    descripcion: string;
}

import { pizzas } from '../data/PizzasData';
import { empanadas } from '../data/EmpanadasData';
import { fitzzas } from '../data/fitzzasData';
import { aderezos } from '../data/AderezosData';
import { pizzasIndi } from '../data/PizzasIndiData';

const categorias = ["Todos", "Empanadas", "Pizzas Individuales", "Fitzzas", "Pizzas", "Aderezos"];

export default function Productos() {
    const [filtro, setFiltro] = useState("Todos");

    const productosFiltrados = useMemo(() => {
        switch (filtro) {
            case "Empanadas":
                return empanadas;
            case "Pizzas Individuales":
                return pizzasIndi;
            case "Fitzzas":
                return fitzzas;
            case "Pizzas":
                return pizzas;
            case "Aderezos":
                return aderezos;
            case "Todos":
            default:
                return [
                    ...empanadas,
                    ...pizzasIndi,
                    ...fitzzas,
                    ...pizzas,
                    ...aderezos,
                ];
        }
    }, [filtro]);

    return (
        <div className="productos-container">
            <h2 className="productos-titulo">Productos</h2>
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