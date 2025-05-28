import React, { useState } from "react";

interface Producto {
    imagen: string;
    titulo: string;
    descripcion: string;
}

// Importar todos los productos
import { pizzas } from '../data/PizzasData';
import { empanadas } from '../data/EmpanadasData';
import { fitzzas } from '../data/fitzzasData';
import { aderezos } from '../data/AderezosData';
import { pizzasIndi } from '../data/PizzasIndiData';

const categorias = ["Todos", "Pizzas", "Pizzas Individuales", "Empanadas", "Fitzzas", "Aderezos"];

export default function Productos() {
    const [filtro, setFiltro] = useState("Todos");

    const productosFiltrados: Producto[] = React.useMemo(() => {
        switch (filtro) {
            case "Pizzas":
                return pizzas;
            case "Pizzas Individuales":
                return pizzasIndi;
            case "Empanadas":
                return empanadas;
            case "Fitzzas":
                return fitzzas;
            case "Aderezos":
                return aderezos;
            default:
                return [...pizzas, ...pizzasIndi, ...empanadas, ...fitzzas, ...aderezos];
        }
    }, [filtro]);

    return (
        <div style={{ padding: 20 }}>
            <h2>Productos</h2>
            <div style={{ marginBottom: 20 }}>
                {categorias.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFiltro(cat)}
                        style={{
                            marginRight: 10,
                            backgroundColor: filtro === cat ? "blue" : "gray",
                            color: "white",
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: 5,
                            cursor: "pointer",
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                {productosFiltrados.map((prod) => (
                    <div
                        key={prod.titulo}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: 10,
                            width: 250,
                            padding: 10,
                        }}
                    >
                        <img
                            src={prod.imagen}
                            alt={prod.titulo}
                            style={{ width: "100%", borderRadius: 10 }}
                        />
                        <h3>{prod.titulo}</h3>
                        <p>{prod.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
