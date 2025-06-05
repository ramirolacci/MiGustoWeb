import React from 'react';
import type { Sucursal } from '../data/sucursalesData';
import './SucursalCard.css';

interface Props {
    sucursal: Sucursal;
}

const SucursalCard: React.FC<Props> = ({ sucursal }) => {
    return (
        <div className="sucursal-card">
            <div className="sucursal-card-body">
                <h5 className="sucursal-title">
                    <img
                        src="logo.jpg"
                        alt="Logo"
                        className="sucursal-logo"
                    />
                    {sucursal.nombre}
                </h5>
                <p className="sucursal-info">
                    <strong>Dirección:</strong> {sucursal.direccion}, {sucursal.localidad}, {sucursal.provincia}
                </p>
                {sucursal.telefono && (
                    <p className="sucursal-info">
                        <strong>Teléfono:</strong> {sucursal.telefono}
                    </p>
                )}
                {sucursal.horario && (
                    <p className="sucursal-info">
                        <strong>Horario:</strong> {sucursal.horario}
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
