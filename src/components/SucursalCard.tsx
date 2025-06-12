import React from 'react';
import type { Sucursal } from '../data/sucursalesData';
import './SucursalCard.css';

interface Props {
    sucursal: Sucursal;
}

const SucursalCard: React.FC<Props> = ({ sucursal }) => {
    const handleWhatsAppClick = () => {
        const phoneNumber = '5491165822644'; // Número fijo de WhatsApp
        const message = `Hola, me gustaría obtener información sobre la sucursal ${sucursal.nombre}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
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
                    <div className="sucursal-map-container">
                        <iframe
                            src={sucursal.mapaEmbedUrl}
                            allowFullScreen
                            loading="lazy"
                            title={`Mapa de ${sucursal.nombre}`}
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SucursalCard;
