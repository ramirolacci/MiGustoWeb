// src/components/Buscador.tsx

import React, { useEffect, useState } from 'react';
import { useAnimatedPlaceholder } from '../hooks/useAnimatedPlaceholder';
import './Buscador.css';

interface Props {
    filtro: string;
    setFiltro: (filtro: string) => void;
    onSubmit?: (valor: string) => void;
}

const Buscador: React.FC<Props> = ({ filtro, setFiltro, onSubmit }) => {
    const [aparecer, setAparecer] = useState(false);
    const [bordeLuz, setBordeLuz] = useState(false);
    const animatedPlaceholder = useAnimatedPlaceholder(3000);

    useEffect(() => {
        setAparecer(true);
        // Animación de iluminación removida por solicitud del usuario
        // setTimeout(() => setBordeLuz(true), 100); // retrasa el borde para que se note
        // setTimeout(() => setBordeLuz(false), 1800); // quita el borde de luz tras la animación
    }, []);

    return (
        <div className={`buscador-container${aparecer ? ' animate' : ''}`}>
            <input
                type="text"
                className="buscador-input"
                placeholder={animatedPlaceholder}
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && onSubmit) {
                        onSubmit(filtro.trim());
                    }
                }}
            />
            <i
              className="fas fa-search buscador-icon"
              onClick={() => onSubmit && onSubmit(filtro.trim())}
              role={onSubmit ? 'button' : undefined}
              aria-label={onSubmit ? 'Buscar' : undefined}
              tabIndex={onSubmit ? 0 : -1}
              onKeyDown={(e) => {
                  if (onSubmit && (e.key === 'Enter' || e.key === ' ')) onSubmit(filtro.trim());
              }}
            ></i>
        </div>
    );
};

export default Buscador;
