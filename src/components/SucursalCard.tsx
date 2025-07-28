import React, { useState, useRef, useEffect } from 'react';
import type { Sucursal } from '../data/sucursalesData';
import './SucursalCard.css';

interface Props {
    sucursal: Sucursal;
}

const SucursalCard: React.FC<Props> = ({ sucursal }) => {
    const [mapaVisible, setMapaVisible] = useState(false);
    const [mapaCargado, setMapaCargado] = useState(false);
    const [mostrarPlaceholder, setMostrarPlaceholder] = useState(true);
    const mapaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !mapaVisible) {
                    setMapaVisible(true);
                    // Mostrar placeholder por 1 segundo para mejor UX
                    setTimeout(() => {
                        setMostrarPlaceholder(false);
                    }, 1000);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px 0px'
            }
        );

        if (mapaRef.current) {
            observer.observe(mapaRef.current);
        }

        return () => observer.disconnect();
    }, [mapaVisible]);

    const handleWhatsAppClick = () => {
        const phoneNumber = '5491165822644'; // Número fijo de WhatsApp
        const message = `Hola, me gustaría obtener información sobre la sucursal ${sucursal.nombre}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleMapaLoad = () => {
        setMapaCargado(true);
    };

    return (
        <div className="sucursal-card">
            <div className="sucursal-card-body">
                <div className="sucursal-header">
                    <h5 className="sucursal-title">
                        <img
                            src="logo.jpg"
                            alt="Logo"
                            className="sucursal-logo"
                        />
                        {sucursal.nombre}
                    </h5>
                    <button 
                        className="whatsapp-button"
                        onClick={handleWhatsAppClick}
                        title="Contactar por WhatsApp"
                    >
                        <i className="fab fa-whatsapp"></i>
                    </button>
                </div>
                <p className="sucursal-info">
                    <i className="fas fa-map-marker-alt"></i> {sucursal.direccion}, {sucursal.localidad}, {sucursal.provincia}
                </p>
                {sucursal.telefono && (
                    <p className="sucursal-info">
                        <i className="fas fa-phone"></i> {sucursal.telefono}
                    </p>
                )}
                {sucursal.horario && (
                    <p className="sucursal-info">
                        <i className="fas fa-clock"></i> {sucursal.horario}
                    </p>
                )}
                {sucursal.mapaEmbedUrl && (
                    <div className="sucursal-map-container" ref={mapaRef}>
                        {/* Placeholder mientras carga */}
                        {mostrarPlaceholder && (
                            <div className="mapa-placeholder">
                                <div className="placeholder-content">
                                    <i className="fas fa-map-marked-alt"></i>
                                    <p>Cargando mapa...</p>
                                </div>
                            </div>
                        )}
                        
                        {/* Mapa real */}
                        {mapaVisible && (
                            <iframe
                                src={sucursal.mapaEmbedUrl}
                                allowFullScreen
                                loading="lazy"
                                title={`Mapa de ${sucursal.nombre}`}
                                onLoad={handleMapaLoad}
                                style={{ 
                                    opacity: mapaCargado ? 1 : 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SucursalCard;
