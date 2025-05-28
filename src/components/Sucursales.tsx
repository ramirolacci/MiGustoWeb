// src/pages/Sucursales.tsx

import React, { useState } from 'react';
import { sucursales } from '../data/sucursalesData';
import SucursalCard from '../components/SucursalCard';
import Buscador from '../components/Buscador';

const Sucursales: React.FC = () => {
    const [filtro, setFiltro] = useState('');

    const sucursalesFiltradas = sucursales.filter((sucursal) =>
        `${sucursal.nombre} ${sucursal.localidad} ${sucursal.provincia}`
            .toLowerCase()
            .includes(filtro.toLowerCase())
    );

    return (
        <div className="container my-5">
            <h1 className="mb-4">Encontrá tu sucursal más cercana</h1>
            <Buscador filtro={filtro} setFiltro={setFiltro} />
            <div className="row">
                {sucursalesFiltradas.map((sucursal, index) => (
                    <div className="col-md-6" key={index}>
                        <SucursalCard sucursal={sucursal} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sucursales;
