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
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!modalRef.current || isDragging) return;

        const modal = modalRef.current;
        const rect = modal.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateX = ((y / rect.height) * 100 - 50) * -0.3;
        const rotateY = ((x / rect.width) * 100 - 50) * 0.3;
        
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

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        setTouchStart({ x: touch.clientX, y: touch.clientY });
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        e.preventDefault();

        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStart.x;
        const deltaY = touch.clientY - touchStart.y;

        if (modalRef.current) {
            const modal = modalRef.current;
            const rect = modal.getBoundingClientRect();
            
            const rotateX = ((deltaY / rect.height) * 100) * -0.6;
            const rotateY = ((deltaX / rect.width) * 100) * 0.6;
            
            setRotation({ x: rotateX, y: rotateY });
            setPosition({ x: deltaX, y: deltaY });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
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
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `perspective(2000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(0.95)`,
                    transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
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
                            transform: `translateZ(200px) translateX(${position.x * 0.15}px) translateY(${position.y * 0.15}px)`,
                            transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}>
                        <img
                            src={producto.imagen}
                            alt={producto.titulo}
                            className="modal-img"
                            draggable="false"
                        />
                    </div>
                    <div className="modal-badges"
                        style={{
                            transform: `translateZ(180px) translateX(${position.x * 0.12}px) translateY(${position.y * 0.12}px)`,
                            transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
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
                        transform: `translateZ(150px) translateX(${position.x * 0.1}px) translateY(${position.y * 0.1}px)`,
                        transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>{producto.titulo}</h2>
                    
                    <p className="modal-descripcion" style={{
                        transform: `translateZ(120px) translateX(${position.x * 0.08}px) translateY(${position.y * 0.08}px)`,
                        transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>{producto.descripcion}</p>
                    
                    <div className="modal-detalles">
                        <div className="detalle-item"
                            style={{
                                transform: `translateZ(160px) translateX(${position.x * 0.11}px) translateY(${position.y * 0.11}px)`,
                                transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
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
                                    transform: `translateZ(155px) translateX(${position.x * 0.105}px) translateY(${position.y * 0.105}px)`,
                                    transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}>
                                <h3>Tiempo de Preparación</h3>
                                <p>{producto.tiempoPreparacion}</p>
                            </div>
                        )}
                        
                        {producto.calorias && (
                            <div className="detalle-item"
                                style={{
                                    transform: `translateZ(150px) translateX(${position.x * 0.1}px) translateY(${position.y * 0.1}px)`,
                                    transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}>
                                <h3>Información Nutricional</h3>
                                <p>{producto.calorias}</p>
                            </div>
                        )}
                        
                        {producto.precio && (
                            <div className="detalle-item precio"
                                style={{
                                    transform: `translateZ(190px) translateX(${position.x * 0.13}px) translateY(${position.y * 0.13}px)`,
                                    transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
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