import React from 'react';
import type { Sucursal } from '../data/sucursalesData';

interface Props {
    sucursal: Sucursal;
}

const SucursalCard: React.FC<Props> = ({ sucursal }) => {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{sucursal.nombre}</h5>
                <p className="card-text">
                    <strong>Dirección:</strong> {sucursal.direccion}, {sucursal.localidad}, {sucursal.provincia}
                </p>
                {sucursal.telefono && (
                    <p className="card-text">
                        <strong>Teléfono:</strong> {sucursal.telefono}
                    </p>
                )}
                {sucursal.horario && (
                    <p className="card-text">
                        <strong>Horario:</strong> {sucursal.horario}
                    </p>
                )}
                {sucursal.mapaEmbedUrl && (
                    <div className="mt-3">
                        <iframe
                            src={sucursal.mapaEmbedUrl}
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
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
