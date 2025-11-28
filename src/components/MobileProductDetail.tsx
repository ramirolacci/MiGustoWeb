import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './MobileProductDetail.css';

// Declaración para TypeScript
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': any;
        }
    }
}

type MobileProduct = {
    titulo: string;
    descripcion: string;
    imagen: string;
    imagenDetalle?: string;
    ingredientes?: string[];
};

interface MobileProductDetailProps {
    producto: MobileProduct;
    onClose: () => void;
}

function parseIngredientsFromDescription(description: string): string[] {
    return (description || '')
        .replace(/elaborada con|y|,/g, ',')
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
}

function getIngredients(producto: MobileProduct): string[] {
    const fromProp = Array.isArray(producto.ingredientes)
        ? producto.ingredientes.filter(i => i && i.trim().length > 0)
        : [];
    if (fromProp.length > 0) return fromProp;
    return parseIngredientsFromDescription(producto.descripcion);
}

// Lista de productos que tienen modelo 3D disponible
const PRODUCTOS_3D = [
    "Big burger", "Big Burger", "Mexican Pibil pork", "Mexican pibil pork",
    "Mexican Veggie", "Mexican veggie", "Matambre a la pizza",
    "Cheese burger", "Cheese Burger", "American Chicken", "American chicken",
    "Vacio y provoleta", "Franuí chocolate amargo", "Franuí chocolate con leche"
];

// Rutas de los modelos 3D
const RUTAS_3D: Record<string, string> = {
    "Big burger": "/models/big-burger-3D.glb",
    "Big Burger": "/models/big-burger-3D.glb",
    "Mexican Pibil pork": "/models/mexican-veggie-3D.glb",
    "Mexican pibil pork": "/models/mexican-veggie-3D.glb",
    "Mexican Veggie": "/models/mexican-veggie-3D.glb",
    "Mexican veggie": "/models/mexican-veggie-3D.glb",
    "Matambre a la pizza": "/models/Matambre-a-la-Pizza-3D.glb",
    "Cheese burger": "/models/cheese-burger-3D.glb",
    "Cheese Burger": "/models/cheese-burger-3D.glb",
    "American Chicken": "/models/american-chicken-3D.glb",
    "American chicken": "/models/american-chicken-3D.glb",
    "Vacio y provoleta": "/models/vacio-provoleta-3D.glb",
    "Franuí chocolate amargo": "/models/Franui-Dark-3D.glb",
    "Franuí chocolate con leche": "/models/Franui-Milk-3D.glb",
};

// Imágenes PNG para alternar
const IMAGENES_PNG: Record<string, string> = {
    "Big burger": "/images/final/empanada-big-burger.png",
    "Big Burger": "/images/final/empanada-big-burger.png",
    "Mexican Pibil pork": "/images/final/empanada-mexican-pibil-pork.png",
    "Mexican pibil pork": "/images/final/empanada-mexican-pibil-pork.png",
    "Matambre a la pizza": "/images/final/empanada-matambre -alapizza.png",
    "Cheese burger": "/images/final/empanada-cheese-burger.png",
    "Cheese Burger": "/images/final/empanada-cheese-burger.png",
    "American Chicken": "/images/final/empanada-american-chicken.png",
    "American chicken": "/images/final/empanada-american-chicken.png",
    "Vacio y provoleta": "/images/final/empanada-vacio-yprovoleta.png",
};

// Configuración de cámara 3D específica para cada producto (igual que desktop)
const CAMERA_ORBITS_3D: Record<string, string> = {
    "Big burger": "50deg 65deg 2.7m",
    "Big Burger": "50deg 65deg 2.7m",
    "Mexican Pibil pork": "140deg 50deg 2.7m",
    "Mexican pibil pork": "140deg 50deg 2.7m",
    "Mexican Veggie": "45deg 65deg 2.7m",
    "Mexican veggie": "45deg 65deg 2.7m",
    "Matambre a la pizza": "60deg 60deg 2.7m",
    "Cheese burger": "180deg 100deg 2.5m",
    "Cheese Burger": "180deg 100deg 2.5m",
    "American Chicken": "90deg 90deg 2.7m",
    "American chicken": "90deg 90deg 2.7m",
    "Vacio y provoleta": "90deg 95deg 2.7m",
    "Franuí chocolate amargo": "45deg 65deg 2.7m",
    "Franuí chocolate con leche": "45deg 65deg 2.7m",
};

const MobileProductDetail: React.FC<MobileProductDetailProps> = ({ producto, onClose }) => {
    const ingredients = getIngredients(producto);
    const [show3D, setShow3D] = useState(false);
    const tiene3D = PRODUCTOS_3D.includes(producto.titulo);

    // Cargar model-viewer si no está presente
    useEffect(() => {
        if (tiene3D && !document.querySelector('script[src*="model-viewer"]')) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
            document.body.appendChild(script);
        }
    }, [tiene3D]);

    // Prevenir scroll del body y scrollear al top cuando se abre el modal
    useEffect(() => {
        // Guardar la posición actual del scroll
        const scrollY = window.scrollY;

        // Prevenir scroll en el body
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // Cleanup: restaurar el scroll cuando se cierra el modal
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);


    return ReactDOM.createPortal(
        <div className="mpd-overlay" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="mpd-sheet" onClick={(e) => e.stopPropagation()}>
                <button className="mpd-close" aria-label="Cerrar" onClick={onClose}>×</button>
                {tiene3D && (
                    <button
                        className="mpd-3d-toggle"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShow3D(!show3D);
                        }}
                        aria-label="Alternar vista 3D"
                    >
                        <iframe
                            src="https://lottie.host/embed/7ae74040-aac6-4c39-9ffa-559e8a1f4c60/ZEdWR7FqTN.lottie"
                            style={{
                                width: '48px',
                                height: '48px',
                                border: 'none',
                                background: 'transparent',
                                transform: 'scale(1.3)',
                                transformOrigin: 'center',
                                pointerEvents: 'none'
                            }}
                        ></iframe>
                    </button>
                )}
                <div className="mpd-image">
                    {show3D && tiene3D && RUTAS_3D[producto.titulo] ? (
                        React.createElement('model-viewer' as any, {
                            src: RUTAS_3D[producto.titulo],
                            alt: producto.titulo + ' 3D',
                            'camera-controls': true,
                            'auto-rotate': true,
                            'auto-rotate-delay': '0',
                            ar: false,
                            style: {
                                width: '100%',
                                height: '100%',
                                background: 'transparent',
                                borderRadius: '12px',
                                outline: 'none',
                                pointerEvents: 'none'
                            },
                            'shadow-intensity': '1.5',
                            'shadow-softness': '1',
                            exposure: '2',
                            'camera-orbit': CAMERA_ORBITS_3D[producto.titulo] || "0deg 75deg 2.5m",
                            'min-camera-orbit': 'auto auto 1.8m',
                            'max-camera-orbit': 'auto auto 3m',
                            'field-of-view': '25deg',
                            'interaction-prompt': 'none',
                            'disable-pan': true
                        })
                    ) : (
                        <img
                            src={!show3D && tiene3D ? (IMAGENES_PNG[producto.titulo] || producto.imagenDetalle || producto.imagen) : (producto.imagenDetalle || producto.imagen)}
                            alt={producto.titulo}
                        />
                    )}
                </div>
                <div className="mpd-content">
                    <h2 className="mpd-title">{producto.titulo}</h2>
                    {ingredients.length > 0 && (
                        <section>
                            <ul className="mpd-ingredients">
                                {ingredients.map((ing, idx) => (
                                    <li key={idx}>{ing}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default MobileProductDetail;


