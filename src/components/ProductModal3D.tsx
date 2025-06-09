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
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!modalRef.current) return;

        const modal = modalRef.current;
        const rect = modal.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateX = ((y / rect.height) * 100 - 50) * -0.2;
        const rotateY = ((x / rect.width) * 100 - 50) * 0.2;
        
        setRotation({ x: rotateX, y: rotateY });
        setPosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(3000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(0.8)`,
                    transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
            >
                <button 
                    className="modal-close" 
                    onClick={handleClose}
                    aria-label="Cerrar modal"
                >×</button>
                
                <div className="modal-header-3d">
                    <div className="modal-image-container"
                        style={{
                            transform: `translateZ(150px) translateX(${position.x * 0.12}px) translateY(${position.y * 0.12}px)`,
                            transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}>
                        <img
                            src={producto.imagen}
                            alt={producto.titulo}
                            className="modal-img"
                        />
                    </div>
                    <div className="modal-badges"
                        style={{
                            transform: `translateZ(120px) translateX(${position.x * 0.09}px) translateY(${position.y * 0.09}px)`,
                            transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
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

                <div className="modal-info-3d">
                    <h2 style={{
                        transform: `translateZ(90px) translateX(${position.x * 0.06}px) translateY(${position.y * 0.06}px)`,
                        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>{producto.titulo}</h2>
                    
                    <p className="modal-descripcion" style={{
                        transform: `translateZ(60px) translateX(${position.x * 0.045}px) translateY(${position.y * 0.045}px)`,
                        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>{producto.descripcion}</p>
                    
                    <div className="modal-detalles">
                        <div className="detalle-item"
                            style={{
                                transform: `translateZ(105px) translateX(${position.x * 0.075}px) translateY(${position.y * 0.075}px)`,
                                transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}>
                            <h3>Ingredientes</h3>
                            <ul className="ingredientes-lista">
                                {extraerIngredientes(producto.descripcion).map((ingrediente, index) => (
                                    <li key={index}>{ingrediente}</li>
                                ))}
                            </ul>
                        </div>
                        
                        {producto.tiempoPreparacion && (
                            <div className="detalle-item"
                                style={{
                                    transform: `translateZ(97px) translateX(${position.x * 0.067}px) translateY(${position.y * 0.067}px)`,
                                    transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}>
                                <h3>Tiempo de Preparación</h3>
                                <p>{producto.tiempoPreparacion}</p>
                            </div>
                        )}
                        
                        {producto.calorias && (
                            <div className="detalle-item"
                                style={{
                                    transform: `translateZ(90px) translateX(${position.x * 0.06}px) translateY(${position.y * 0.06}px)`,
                                    transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}>
                                <h3>Información Nutricional</h3>
                                <p>{producto.calorias}</p>
                            </div>
                        )}
                        
                        {producto.precio && (
                            <div className="detalle-item precio"
                                style={{
                                    transform: `translateZ(112px) translateX(${position.x * 0.082}px) translateY(${position.y * 0.082}px)`,
                                    transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
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