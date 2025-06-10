// src/components/Buscador.tsx

import React from 'react';
import './Buscador.css';

interface Props {
    filtro: string;
    setFiltro: (filtro: string) => void;
}

const Buscador: React.FC<Props> = ({ filtro, setFiltro }) => {
    return (
        <div className="buscador-container">
            <input
                type="text"
                className="buscador-input"
                placeholder="Buscar sucursal por nombre o localidad..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />
            <i className="fas fa-search buscador-icon"></i>
        </div>
    );
};

export default Buscador;
