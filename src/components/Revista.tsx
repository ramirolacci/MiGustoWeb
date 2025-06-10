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
        <>
            <h2 className="revista-titulo" style={{ color: "#fff", textAlign: "center", marginBottom: "1.5rem" }}>
                Deslizá para explorar el catálogo
            </h2>
            <div className="revista-container">
                {/* Flecha derecha al principio */}
                {paginaActual === 0 && (
                    <div className="revista-arrow revista-arrow-right">
                        <svg width="60" height="60" viewBox="0 0 60 60">
                            <polyline points="20,15 40,30 20,45" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}
                {paginaActual === catalogoFotos.length - 1 && (
                    <div className="revista-arrow revista-arrow-left">
                        <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: "scaleX(-1)" }}>
                            <polyline points="20,15 40,30 20,45" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}

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
        </>
    );
};

export default Revista;