import React, { useState, useEffect, useCallback } from 'react';
import { sucursales } from '../data/sucursalesData';
import SucursalCard from '../components/SucursalCard';
import './SucursalCard.css';
import './Sucursales.css';

const Sucursales: React.FC = () => {
    const [filtro, setFiltro] = useState('');
    const [sucursalesMostradas, setSucursalesMostradas] = useState(6); // Reducido de 10 a 6
    const [aparecer, setAparecer] = useState(false);
    const [bordeLuz, setBordeLuz] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setAparecer(true);
        setTimeout(() => setBordeLuz(true), 100);
        setTimeout(() => setBordeLuz(false), 1800);
    }, []);

    const sucursalesFiltradas = sucursales.filter((sucursal) => {
        const coincideTexto = `${sucursal.nombre} ${sucursal.localidad} ${sucursal.provincia}`
            .toLowerCase()
            .includes(filtro.toLowerCase());
        return coincideTexto;
    });

    const sucursalesVisibles = sucursalesFiltradas.slice(0, sucursalesMostradas);
    const hayMasSucursales = sucursalesFiltradas.length > sucursalesMostradas;

    const cargarMasSucursales = useCallback(async () => {
        setIsLoading(true);
        // Simular un pequeño delay para mejor UX
        await new Promise(resolve => setTimeout(resolve, 300));
        setSucursalesMostradas(prev => prev + 6); // Cargar 6 en lugar de 10
        setIsLoading(false);
    }, []);

    // Resetear contador cuando cambia el filtro
    useEffect(() => {
        setSucursalesMostradas(6);
    }, [filtro]);

    return (
        <div className="sucursales-section">
            <div className="background-overlay"></div>
            <div className="sucursales-container">
                <div className="container">
                    <h2 className="productos-titulo">Encontrá tu sucursal más cercana</h2>
                    <div className={`productos-busqueda${aparecer ? ' animate' : ''}`}>
                        <input
                            type="text"
                            placeholder="Buscar sucursales..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            className={`productos-input-busqueda${bordeLuz ? ' borde-luz' : ''}`}
                        />
                        <i className="fas fa-search buscador-icon"></i>
                    </div>

                    <div className="row">
                        {sucursalesVisibles.map((sucursal, index) => (
                            <div className="col-md-6" key={index} style={{ '--card-index': index } as React.CSSProperties}>
                                <SucursalCard sucursal={sucursal} />
                            </div>
                        ))}
                    </div>

                    {hayMasSucursales && (
                        <div className="text-center mt-4">
                            <button 
                                className={`btn-ver-mas${isLoading ? ' loading' : ''}`}
                                onClick={cargarMasSucursales}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Cargando...
                                    </>
                                ) : (
                                    'Ver Más Sucursales'
                                )}
                            </button>
                        </div>
                    )}

                    {sucursalesFiltradas.length === 0 && (
                        <div className="text-center mt-4">
                            <p className="no-results">
                                <i className="fas fa-search"></i>
                                No se encontraron sucursales con ese criterio de búsqueda.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sucursales;