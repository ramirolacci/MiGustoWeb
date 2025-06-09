import { useState, useEffect, useRef } from 'react';
import './Revista.css'
import HTMLFlipBook from 'react-pageflip';

const catalogoFotos = [
    '/catalogo/prueba.jpg',
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

const carruselFotos = [
    '/catalogo/1(1).jpg',
    '/catalogo/1(2).jpg',
];

const Revista = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [imagenActual, setImagenActual] = useState(0);
    const flipBook = useRef<any>(null);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setImagenActual((prev) => (prev + 1) % carruselFotos.length);
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    const handleFlip = (e: any) => {
        setPaginaActual(e.data);
    };

    return (
        <div className="revista-section">
            <div className="background-overlay"></div>
            <h2 className="revista-titulo" style={{ 
                textAlign: "center", 
                marginBottom: "2rem",
                marginTop: "80px",
                fontSize: "2.5rem",
                fontWeight: "700",
                position: "relative",
                paddingBottom: "1rem",
                background: "linear-gradient(45deg, #FFFFFF, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
                animation: "fadeInUp 1s ease-out, gradientMove 3s ease infinite"
            }}>
                Deslizá para explorar el catálogo
            </h2>
            
            <div className="revista-container">
                <HTMLFlipBook
                    ref={flipBook}
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
                    startPage={1}
                    flippingTime={300}
                    usePortrait={true}
                    startZIndex={0}
                    maxShadowOpacity={0.5}
                    useMouseEvents={true}
                    clickEventForward={true}
                    disableFlipByClick={true}
                    onFlip={handleFlip}
                    onChangeOrientation={() => { }}
                    onChangeState={() => { }}
                    autoSize={true}
                    swipeDistance={10}
                    showPageCorners={true}
                >
                    <div className="revista-pagina">
                        <img src="/catalogo/tapa1.jpeg" alt="portada" className="revista-img" />
                    </div>
                    <div className="revista-pagina">
                        <img src="/catalogo/1.jpg" alt="catalogo-1" className="revista-img" />
                    </div>
                    <div className="revista-pagina">
                        <img 
                            src={carruselFotos[imagenActual]} 
                            alt="carrusel" 
                            className="revista-img"
                            style={{
                                opacity: 1,
                                transition: 'opacity 0.5s ease-in-out'
                            }}
                        />
                    </div>
                    {catalogoFotos.slice(2).map((src, i) => (
                        <div className="revista-pagina" key={i + 1}>
                            <img src={src} alt={`catalogo-${i + 3}`} className="revista-img" />
                        </div>
                    ))}
                </HTMLFlipBook>
            </div>

            <style>
                {`
                    .revista-titulo::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 100px;
                        height: 3px;
                        background: linear-gradient(to right, #FFD700, #FFA500);
                        border-radius: 2px;
                    }

                    @keyframes gradientMove {
                        0% {
                            background-position: "0% 50%";
                        }
                        50% {
                            background-position: "100% 50%";
                        }
                        100% {
                            background-position: "0% 50%";
                        }
                    }

                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes float {
                        0% {
                            transform: translateY(-50%) translateX(0);
                        }
                        50% {
                            transform: translateY(-50%) translateX(10px);
                        }
                        100% {
                            transform: translateY(-50%) translateX(0);
                        }
                    }

                    @keyframes pulse {
                        0% {
                            transform: scale(1);
                            opacity: 0.1;
                        }
                        50% {
                            transform: scale(1.1);
                            opacity: 0.2;
                        }
                        100% {
                            transform: scale(1);
                            opacity: 0.1;
                        }
                    }

                    @keyframes slide {
                        0% {
                            transform: translateX(0);
                            opacity: 1;
                        }
                        50% {
                            transform: translateX(5px);
                            opacity: 0.8;
                        }
                        100% {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }

                    .revista-pagina {
                        pointer-events: none !important;
                        user-select: none !important;
                        -webkit-user-select: none !important;
                        -moz-user-select: none !important;
                        -ms-user-select: none !important;
                    }

                    .revista-pagina img {
                        pointer-events: none !important;
                        user-select: none !important;
                        -webkit-user-select: none !important;
                        -moz-user-select: none !important;
                        -ms-user-select: none !important;
                    }

                    .revista-flipbook {
                        touch-action: none !important;
                    }

                    .revista-flipbook .page {
                        touch-action: none !important;
                        pointer-events: none !important;
                    }

                    .revista-flipbook .page-wrapper {
                        pointer-events: none !important;
                    }

                    .revista-flipbook .page-wrapper.active {
                        pointer-events: auto !important;
                    }

                    .revista-flipbook .page-wrapper:hover {
                        pointer-events: none !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Revista;