import { useState, useRef, useEffect } from 'react';
import './Revista.css'
import HTMLFlipBook from 'react-pageflip';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-flip';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const catalogoFotos = [
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
    const [paginaActual, setPaginaActual] = useState(0); // Empieza en la primera página
    const flipBook = useRef<any>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 900);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
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
                {isMobile ? (
                    <Swiper
                        modules={[EffectFlip]}
                        effect="flip"
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={(swiper) => setPaginaActual(swiper.activeIndex)}
                        style={{ width: '100%', maxWidth: 420, minHeight: 320 }}
                    >
                        <SwiperSlide key="portada">
                            <div className="revista-pagina">
                                <Zoom>
                                    <img src="/catalogo/tapa1.jpeg" alt="portada" className="revista-img" loading="lazy" />
                                </Zoom>
                            </div>
                        </SwiperSlide>
                        {catalogoFotos.map((src, i) => (
                            <SwiperSlide key={i + 1}>
                                <div className="revista-pagina">
                                    <Zoom>
                                        <img src={src} alt={`catalogo-${i + 2}`} className="revista-img" loading="lazy" />
                                    </Zoom>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
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
                        startPage={0}
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
                            <img src="/catalogo/tapa1.jpeg" alt="portada" className="revista-img" loading="lazy" />
                        </div>
                        {catalogoFotos.map((src, i) => (
                            <div className="revista-pagina" key={i + 1}>
                                <img src={src} alt={`catalogo-${i + 2}`} className="revista-img" loading="lazy" />
                            </div>
                        ))}
                    </HTMLFlipBook>
                )}
            </div>
        </>
    );
};

export default Revista;