// src/components/Buscador.tsx

import React from 'react';

interface Props {
    filtro: string;
    setFiltro: (valor: string) => void;
}

const Buscador: React.FC<Props> = ({ filtro, setFiltro }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar sucursal por nombre o localidad..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />
        </div>
    );
};

export default Buscador;
