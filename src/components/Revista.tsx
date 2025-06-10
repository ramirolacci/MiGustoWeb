import { useState } from 'react';
import './Revista.css'
import HTMLFlipBook from 'react-pageflip';

const catalogoFotos = [
    '/catalogo/1.jpg',
    '/catalogo/2.jpg',
    '/catalogo/3.jpg',
    '/catalogo/4.jpg',
    '/catalogo/5.jpg',
    '/catalogo/6.jpg',
    '/catalogo/7.jpg',
    '/catalogo/8.jpg',
    '/catalogo/9.jpg',
    '/catalogo/10.jpg',
    '/catalogo/11.jpg',
    '/catalogo/12.jpg',
];

const Revista = () => {
    const [paginaActual, setPaginaActual] = useState(0);

    return (
        <div className="revista-wrapper" style={{ 
            backgroundColor: '#000',
            padding: '0',
            minHeight: '100vh'
        }}>
            <h2 className="revista-titulo" style={{ 
                textAlign: "center", 
                margin: '0',
                padding: '0.25rem 0',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ED813C, #FFB74D, #ED813C)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient 3s ease infinite',
                textShadow: '0 0 20px rgba(237, 129, 60, 0.3)',
                letterSpacing: '0.05em',
                lineHeight: '1'
            }}>
                Deslizá para explorar el catálogo
            </h2>
            <style>
                {`
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}
            </style>
            <div className="revista-container">
                {/* Flecha izquierda al principio */}
                {paginaActual === 0 && (
                    <div className="revista-arrow revista-arrow-right" style={{
                        position: 'absolute',
                        right: '-40px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        opacity: '0.6',
                        transition: 'opacity 0.3s ease'
                    }}>
                        <svg width="40" height="40" viewBox="0 0 60 60">
                            <polyline 
                                points="20,15 40,30 20,45" 
                                fill="none" 
                                stroke="#ED813C" 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                style={{ opacity: '0.7' }}
                            />
                        </svg>
                    </div>
                )}
                {paginaActual === catalogoFotos.length - 1 && (
                    <div className="revista-arrow revista-arrow-left" style={{
                        position: 'absolute',
                        left: '-40px',
                        top: '50%',
                        transform: 'translateY(-50%) scaleX(-1)',
                        opacity: '0.6',
                        transition: 'opacity 0.3s ease'
                    }}>
                        <svg width="40" height="40" viewBox="0 0 60 60">
                            <polyline 
                                points="20,15 40,30 20,45" 
                                fill="none" 
                                stroke="#ED813C" 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                style={{ opacity: '0.7' }}
                            />
                        </svg>
                    </div>
                )}

                <HTMLFlipBook
                    width={425}
                    height={673}
                    size="stretch"
                    minWidth={180}
                    maxWidth={600}
                    minHeight={285}
                    maxHeight={950}
                    drawShadow={true}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="revista-flipbook"
                    style={{}}
                    startPage={0}
                    flippingTime={600}
                    usePortrait={true}
                    startZIndex={0}
                    maxShadowOpacity={0.5}
                    useMouseEvents={true}
                    clickEventForward={true}
                    disableFlipByClick={false}
                    onFlip={e => setPaginaActual(e.data)}
                    onChangeOrientation={() => { }}
                    onChangeState={() => { }}
                    autoSize={true}
                    swipeDistance={30}
                    showPageCorners={true}
                >
                    {catalogoFotos.map((src, i) => (
                        <div className="revista-pagina" key={i}>
                            <img src={src} alt={`catalogo-${i + 1}`} className="revista-img" />
                        </div>
                    ))}
                </HTMLFlipBook>
            </div>
        </div>
    );
};

export default Revista;