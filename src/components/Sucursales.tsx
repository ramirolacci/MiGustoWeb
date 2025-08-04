import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const scrollRevealRef = useRef<any>(null);

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

    useEffect(() => {
        import('scrollreveal').then((module) => {
            const sr = module.default ? module.default : module;
            scrollRevealRef.current = sr();
            
            // Configurar scroll reveal solo una vez
            scrollRevealRef.current.reveal('.productos-titulo', {
                distance: '20px',
                duration: 1400,
                origin: 'top',
                opacity: 0,
                reset: false // Cambiado a false para evitar que desaparezcan
            });
            
            scrollRevealRef.current.reveal('.row', {
                distance: '30px',
                duration: 1600,
                origin: 'bottom',
                opacity: 0,
                reset: false // Cambiado a false para evitar que desaparezcan
            });
        });

        // Cleanup function
        return () => {
            if (scrollRevealRef.current) {
                scrollRevealRef.current.destroy();
            }
        };
    }, []);

    // Efecto para manejar nuevas cards cuando se cargan más sucursales
    useEffect(() => {
        if (scrollRevealRef.current && sucursalesMostradas > 6) {
            // Pequeño delay para asegurar que las nuevas cards estén renderizadas
            setTimeout(() => {
                scrollRevealRef.current.sync();
            }, 100);
        }
    }, [sucursalesMostradas]);

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
                            <div className="col-md-6" key={`${sucursal.nombre}-${index}`} style={{ '--card-index': index } as React.CSSProperties}>
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