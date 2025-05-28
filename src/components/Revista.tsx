import React, { useState } from 'react';
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
    );
};

export default Revista;