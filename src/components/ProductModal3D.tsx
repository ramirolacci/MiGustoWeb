import React, { useState, useRef } from 'react';
import './ProductModal3D.css';

interface ProductModal3DProps {
    producto: {
        titulo: string;
        descripcion: string;
        imagen: string;
        ingredientes?: string[];
        tiempoPreparacion?: string;
        calorias?: string;
        precio?: string;
        esRecomendado?: boolean;
        esVegetariano?: boolean;
        esSinGluten?: boolean;
    };
    onClose: () => void;
}

const ProductModal3D: React.FC<ProductModal3DProps> = ({ producto, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!modalRef.current) return;

        const modal = modalRef.current;
        const rect = modal.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateX = ((y / rect.height) * 100 - 50) * -0.1;
        const rotateY = ((x / rect.width) * 100 - 50) * 0.1;
        
        setRotation({ x: rotateX, y: rotateY });
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
    };

    const extraerIngredientes = (descripcion: string): string[] => {
        return descripcion
            .replace(/elaborada con|y|,/g, ',')
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                ref={modalRef}
                className="modal-content-3d"
                onClick={e => e.stopPropagation()}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(2000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
            >
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-header-3d"
                    style={{
                        transform: `translateZ(60px) translateX(${position.x * 0.05}px) translateY(${position.y * 0.05}px)`
                    }}>
                    <div className="modal-image-container">
                        <img
                            src={producto.imagen}
                            alt={producto.titulo}
                            className="modal-img"
                        />
                    </div>
                    <div className="modal-badges"
                        style={{
                            transform: `translateZ(40px) translateX(${position.x * 0.04}px) translateY(${position.y * 0.04}px)`
                        }}>
                        {producto.esRecomendado && (
                            <span className="badge badge-recomendado">Recomendado</span>
                        )}
                        {producto.esVegetariano && (
                            <span className="badge badge-vegetariano">Vegetariano</span>
                        )}
                        {producto.esSinGluten && (
                            <span className="badge badge-sin-gluten">Sin Gluten</span>
                        )}
                    </div>
                </div>

                <div className="modal-info-3d"
                    style={{
                        transform: `translateZ(40px) translateX(${position.x * 0.03}px) translateY(${position.y * 0.03}px)`
                    }}>
                    <h2>{producto.titulo}</h2>
                    <p className="modal-descripcion">{producto.descripcion}</p>
                    
                    <div className="modal-detalles">
                        <div className="detalle-item"
                            style={{
                                transform: `translateZ(30px) translateX(${position.x * 0.02}px) translateY(${position.y * 0.02}px)`
                            }}>
                            <h3>Ingredientes</h3>
                            <ul className="ingredientes-lista">
                                {extraerIngredientes(producto.descripcion).map((ingrediente, index) => (
                                    <li key={index}>{ingrediente}</li>
                                ))}
                            </ul>
                        </div>
                        
                        {producto.tiempoPreparacion && (
                            <div className="detalle-item">
                                <h3>Tiempo de Preparación</h3>
                                <p>{producto.tiempoPreparacion}</p>
                            </div>
                        )}
                        
                        {producto.calorias && (
                            <div className="detalle-item">
                                <h3>Información Nutricional</h3>
                                <p>{producto.calorias}</p>
                            </div>
                        )}
                        
                        {producto.precio && (
                            <div className="detalle-item precio"
                                style={{
                                    transform: `translateZ(50px) translateX(${position.x * 0.04}px) translateY(${position.y * 0.04}px)`
                                }}>
                                <h3>Precio</h3>
                                <p className="precio-valor">{producto.precio}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal3D; 