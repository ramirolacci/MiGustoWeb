// src/components/Buscador.tsx

import React, { useEffect, useState } from 'react';
import './Buscador.css';

interface Props {
    filtro: string;
    setFiltro: (filtro: string) => void;
}

const Buscador: React.FC<Props> = ({ filtro, setFiltro }) => {
    const [aparecer, setAparecer] = useState(false);
    const [bordeLuz, setBordeLuz] = useState(false);

    useEffect(() => {
        setAparecer(true);
        setTimeout(() => setBordeLuz(true), 100); // retrasa el borde para que se note
        setTimeout(() => setBordeLuz(false), 1800); // quita el borde de luz tras la animación
    }, []);

    return (
        <div className={`buscador-container${aparecer ? ' animate' : ''}`}>
            <input
                type="text"
                className={`buscador-input${bordeLuz ? ' borde-luz' : ''}`}
                placeholder="Buscar productos..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />
            <i className="fas fa-search buscador-icon"></i>
        </div>
    );
};

export default Buscador;
