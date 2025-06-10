import React, { useState } from 'react';
import { sucursales } from '../data/sucursalesData';
import SucursalCard from '../components/SucursalCard';
import './SucursalCard.css';
import './Sucursales.css';

const Sucursales: React.FC = () => {
    const [filtro, setFiltro] = useState('');
    const [sucursalesMostradas, setSucursalesMostradas] = useState(10);

    const sucursalesFiltradas = sucursales.filter((sucursal) => {
        const coincideTexto = `${sucursal.nombre} ${sucursal.localidad} ${sucursal.provincia}`
            .toLowerCase()
            .includes(filtro.toLowerCase());
        return coincideTexto;
    });

    const sucursalesVisibles = sucursalesFiltradas.slice(0, sucursalesMostradas);
    const hayMasSucursales = sucursalesFiltradas.length > sucursalesMostradas;

    const cargarMasSucursales = () => {
        setSucursalesMostradas(prev => prev + 10);
    };

    return (
        <div className="sucursales-section">
            <div className="background-overlay"></div>
            <div className="sucursales-container">
                <div className="container">
                    <h2 className="productos-titulo">Encontrá tu sucursal más cercana</h2>
                    <div className="productos-busqueda">
                        <input
                            type="text"
                            placeholder="Buscar sucursales..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            className="productos-input-busqueda"
                        />
                        <i className="fas fa-search buscador-icon"></i>
                    </div>

                    <div className="row">
                        {sucursalesVisibles.map((sucursal, index) => (
                            <div className="col-md-6" key={index}>
                                <SucursalCard sucursal={sucursal} />
                            </div>
                        ))}
                    </div>

                    {hayMasSucursales && (
                        <div className="text-center mt-4">
                            <button 
                                className="btn-ver-mas"
                                onClick={cargarMasSucursales}
                            >
                                Ver Más Sucursales
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sucursales;