import React, { useState, useRef, useEffect } from 'react';
import './ProductModal3D.css';

interface ProductModal3DProps {
    producto: {
        titulo: string;
        descripcion: string;
        imagen: string;
        imagenDetalle?: string;
        ingredientes?: string[];
        tiempoPreparacion?: string;
        calorias?: string;
        precio?: string;
        esRecomendado?: boolean;
        esVegetariano?: boolean;
        esSinGluten?: boolean;
    };
    onClose: () => void;
    tiene3D?: boolean;
}

const RUTAS_3D: Record<string, string> = {
    "Big Burguer": "/3D/big-burger-3D.glb",
    "Mexican Pibil pork": "/3D/mexican-pibil-pork-3D.glb",
    "Mexican Veggie": "/3D/mexican-veggie-3D.glb",
    "Matambre a la pizza": "/3D/Matambre-a-la-Pizza-3D.glb",
};

const ProductModal3D: React.FC<ProductModal3DProps> = ({ producto, onClose, tiene3D }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [transitionStyle, setTransitionStyle] = useState('transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)');
    const [loading3D, setLoading3D] = useState(true);

    useEffect(() => {
        if (tiene3D) {
            // Cargar el script de model-viewer si no está presente
            if (!document.querySelector('script[src*="model-viewer"]')) {
                const script = document.createElement('script');
                script.type = 'module';
                script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
                document.body.appendChild(script);
            }
            setLoading3D(true); // Reiniciar el loading cada vez que cambia el producto 3D
        }
    }, [tiene3D, producto.titulo]);

    // Solución robusta: escuchar el evento 'load' del <model-viewer> directamente
    useEffect(() => {
        if (!tiene3D || !RUTAS_3D[producto.titulo]) return;
        setLoading3D(true);
        const interval = setInterval(() => {
            const mv = document.querySelector('model-viewer');
            if (mv) {
                mv.addEventListener('load', () => setLoading3D(false), { once: true });
                clearInterval(interval);
            }
        }, 60);
        return () => clearInterval(interval);
    }, [tiene3D, producto.titulo]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!modalRef.current || isDragging) return;

        const modal = modalRef.current;
        const rect = modal.getBoundingClientRect();
        
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        // Limitar x e y para que nunca se salgan del área
        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, rect.height));
        
        const rotateX = ((y / rect.height) * 100 - 50) * -0.3;
        const rotateY = ((x / rect.width) * 100 - 50) * 0.3;
        
        setRotation({ x: rotateX, y: rotateY });
        setPosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        setTransitionStyle('transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)');
    };

    const handleMouseLeave = () => {
        // No reseteo la rotación ni la posición, pero hago la transición más suave
        setTransitionStyle('transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)');
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
        <div className="modal-overlay" onClick={onClose} style={tiene3D ? {background:'#181818ee',backdropFilter:'blur(2px)'} : {}}>
            <div 
                ref={modalRef}
                className={tiene3D ? "modal-content-3d modal-horizontal" : "modal-content-3d modal-horizontal"}
                onClick={e => e.stopPropagation()}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={tiene3D ? {
                    width: '100vw',
                    height: '100vh',
                    minWidth: '100vw',
                    minHeight: '100vh',
                    maxWidth: '100vw',
                    maxHeight: '100vh',
                    background: '#181818',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transition: transitionStyle
                } : {
                    transition: transitionStyle
                }}
            >
                {/* Indicador de carga para el modelo 3D */}
                {tiene3D && RUTAS_3D[producto.titulo] && loading3D && (
                  <div
                    style={{
                      position: 'absolute',
                      // Desktop: mucho más a la izquierda, Mobile: centrado
                      top: '50%',
                      left: '36%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 100,
                      background: 'rgba(24,24,24,0.85)',
                      color: '#FFD700',
                      padding: '24px 36px',
                      borderRadius: 16,
                      fontWeight: 700,
                      fontSize: 22,
                      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      minWidth: 260,
                      maxWidth: 340,
                      textAlign: 'center',
                    }}
                    className="loading-3d-indicator"
                  >
                    <span className="fa fa-spinner fa-spin" style={{fontSize: 32}}></span>
                    Cargando modelo 3D...
                  </div>
                )}
                {tiene3D ? (
                    <div className="modal-3d-fullscreen-wrapper">
                        <div className="modal-3d-viewer-outer">
                            <div className="modal-3d-viewer-container" style={{background:'none',border:'none',boxShadow:'none', width: '60vw', height: '80vh', minWidth: '320px', minHeight: '320px', maxWidth: '900px', maxHeight: '92vh', position: 'relative'}}>
                                <button className="boton-cerrar-3d" onClick={handleClose} aria-label="Cerrar modal">×</button>
                                <div className="model-3d-align-left">
                                {RUTAS_3D[producto.titulo] ? (
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
                                            minWidth: '320px',
                                            minHeight: '320px',
                                            maxWidth: '900px',
                                            maxHeight: '92vh',
                                            background: 'transparent',
                                            borderRadius: 0,
                                            outline: 'none',
                                            zIndex: 10,
                                            display: 'block',
                                            position: 'relative',
                                            left: 0,
                                            top: 0,
                                            marginLeft: 0,
                                        },
                                        'shadow-intensity': '1',
                                        'shadow-softness': '1',
                                        exposure: '1.2',
                                        'camera-orbit': '0deg 75deg 2.5m',
                                        'min-camera-orbit': 'auto auto 3m',
                                        'max-camera-orbit': 'auto auto 3m',
                                        'interaction-prompt': 'none',
                                        'disable-pan': true,
                                        onLoad: () => setLoading3D(false),
                                    })
                                ) : (
                                    <div style={{color:'#FFD700',textAlign:'center'}}>Modelo 3D próximamente</div>
                                )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-3d-info">
                            <h2 className="titulo-impresionante-3d">{producto.titulo}</h2>
                            <div style={{color:'#fff',marginBottom:8}}>
                                <h3 style={{color:'#FFD700',marginBottom:8}}>Ingredientes</h3>
                                <ul style={{paddingLeft:18}}>
                                    {extraerIngredientes(producto.descripcion).map((ingrediente, index) => (
                                        <li key={index} style={{marginBottom:4}}>{ingrediente}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <button 
                            className="modal-close" 
                            onClick={handleClose}
                            aria-label="Cerrar modal"
                            style={{position: 'absolute', top: 24, right: 24, zIndex: 20000, fontSize: 32, background: '#222', color: '#FFD700', borderRadius: 24, border: 'none', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px 0 #FFD70033'}}
                        >×</button>
                        <div className="modal-horizontal-content" style={{width: '100%', height: '100%'}}>
                            <div className="modal-horizontal-left">
                                <div className="modal-header-3d">
                                    <div className="modal-image-container"
                                        style={{
                                            transform: `translateZ(200px) translateX(${position.x * 0.15}px) translateY(${position.y * 0.15}px)`,
                                            transition: isHovered && !isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                        }}>
                                        <img
                                            src={producto.imagenDetalle || producto.imagen}
                                            alt={producto.titulo}
                                            className={`modal-img ${producto.titulo.toLowerCase().includes('vacio') || producto.titulo.toLowerCase().includes('american chicken') ? 'modal-img-large' : ''}`}
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
                                    {/* <h2 ...>{producto.titulo}</h2> eliminado */}
                                </div>
                            </div>
                            <div className="modal-horizontal-right">
                                <h2 className="modal-product-title"
                                    style={{
                                        transform: `translateZ(150px) translateX(${position.x * 0.1}px) translateY(${position.y * 0.1}px)`,
                                        transition: isHovered && !isDragging ? 'none' : transitionStyle
                                    }}
                                >{producto.titulo}</h2>
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
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default ProductModal3D; 