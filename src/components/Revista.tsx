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
    '/images/catalogo/2.jpg',
    '/images/catalogo/3.jpg',
    '/images/catalogo/4.jpg',
    '/images/catalogo/5.jpg',
    '/images/catalogo/6.jpg',
    '/images/catalogo/7.jpg',
    '/images/catalogo/8.jpg',
    '/images/catalogo/9.jpg',
    '/images/catalogo/10.jpg',
    '/images/catalogo/11.jpg',
    '/images/catalogo/12.jpg',
];

const Revista = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [flipbookDimensions, setFlipbookDimensions] = useState<{ width: number; height: number }>({ width: 680, height: 980 });
    const [verticalGap, setVerticalGap] = useState<number>(2);
    const flipBook = useRef<any>(null);
    const swiperRef = useRef<any>(null);
    const flipbookWrapperRef = useRef<HTMLDivElement>(null);
    const revistaRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const hasRevealed = useRef(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 900);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Modal de ayuda eliminado

    // Calcular dimensiones disponibles para el flipbook (desktop) para no sobrepasar header/footer
    useEffect(() => {
        if (isMobile) return;
        const aspectRatio = 480 / 760; // ancho/alto aproximado

        const compute = () => {
            const header = document.querySelector('header') as HTMLElement | null;
            const footer = document.querySelector('footer') as HTMLElement | null;
            const headerH = header ? header.offsetHeight : 0;
            const footerH = footer ? footer.offsetHeight : 0;
            const baseGap = 1; // margen mínimo deseado en top y bottom
            const horizontalPadding = 16; // padding lateral reducido

            const viewportHeight = window.innerHeight;
            const availableHeightRaw = Math.max(380, viewportHeight - headerH - footerH);
            const availableWidth = Math.max(320, window.innerWidth - horizontalPadding);

            // Máximo alto/ancho permitidos para el flipbook
            const maxFlipbookHeight = Math.max(300, availableHeightRaw - 2 * baseGap);
            const maxFlipbookWidth = Math.min(Math.floor(availableWidth * 0.82), 980);

            // Calcular ancho desde alto máximo y limitar por ancho disponible
            let targetWidth = Math.min(Math.floor(maxFlipbookHeight * aspectRatio), maxFlipbookWidth);
            targetWidth = Math.max(420, targetWidth);
            let targetHeight = Math.floor(targetWidth / aspectRatio);
            // Asegurar que no exceda el alto máximo disponible
            if (targetHeight > maxFlipbookHeight) {
                targetHeight = maxFlipbookHeight;
                targetWidth = Math.floor(targetHeight * aspectRatio);
            }

            // Calcular gap simétrico exacto según altura final (mínimo para estar pegado al navbar)
            const computedGap = Math.max(baseGap, Math.floor((availableHeightRaw - targetHeight) / 4));

            setFlipbookDimensions({ width: targetWidth, height: targetHeight });
            setVerticalGap(computedGap);
        };

        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, [isMobile]);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasRevealed.current) {
                    hasRevealed.current = true;
                    setIsVisible(true);
                    setIsAnimating(true);
                    setTimeout(() => {
                        setIsAnimating(false);
                    }, 4000);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -100px 0px'
            }
        );
        if (revistaRef.current && !hasRevealed.current) {
            observer.observe(revistaRef.current);
        }
        return () => observer.disconnect();
    }, []);

    // Elimino el useEffect del observer

    // const createGoldenParticles = () => {
    //     const particlesContainer = document.createElement('div');
    //     particlesContainer.className = 'golden-particles-container';
    //     particlesContainer.style.cssText = `
    //         position: fixed;
    //         top: 0;
    //         left: 0;
    //         width: 100%;
    //         height: 100%;
    //         pointer-events: none;
    //         z-index: 9999;
    //     `;
    //     document.body.appendChild(particlesContainer);

    //     // Crear múltiples tipos de partículas
    //     for (let i = 0; i < 80; i++) {
    //         const particle = document.createElement('div');
    //         const size = Math.random() * 6 + 2;
    //         const delay = Math.random() * 2;
            
    //         particle.className = 'golden-particle';
    //         particle.style.cssText = `
    //             position: absolute;
    //             width: ${size}px;
    //             height: ${size}px;
    //             background: ${i % 3 === 0 ? 'radial-gradient(circle, #FFD700, #FFA500)' : 
    //                        i % 3 === 1 ? 'radial-gradient(circle, #FFA500, #FF8C00)' : 
    //                        'radial-gradient(circle, #FFD700, #FFF)'};
    //             border-radius: 50%;
    //             box-shadow: 0 0 ${size * 2}px #FFD700;
    //             animation: particleFloat 3s ease-out ${delay}s forwards;
    //             left: ${Math.random() * 100}%;
    //             top: ${Math.random() * 100}%;
    //             opacity: 0;
    //         `;
    //         particlesContainer.appendChild(particle);
    //     }

    //     // Limpiar partículas
    //     setTimeout(() => {
    //         if (particlesContainer.parentNode) {
    //             particlesContainer.parentNode.removeChild(particlesContainer);
    //         }
    //     }, 4000);
    // };

    // const createExpansionWaves = () => {
    //     const wavesContainer = document.createElement('div');
    //     wavesContainer.className = 'expansion-waves-container';
    //     wavesContainer.style.cssText = `
    //         position: fixed;
    //         top: 50%;
    //         left: 50%;
    //         transform: translate(-50%, -50%);
    //         pointer-events: none;
    //         z-index: 9998;
    //     `;
    //     document.body.appendChild(wavesContainer);

    //     // Crear ondas de expansión
    //     for (let i = 0; i < 5; i++) {
    //         const wave = document.createElement('div');
    //         wave.className = 'expansion-wave';
    //         wave.style.cssText = `
    //             position: absolute;
    //             width: 100px;
    //             height: 100px;
    //             border: 2px solid #FFD700;
    //             border-radius: 50%;
    //             animation: waveExpand 2s ease-out ${i * 0.2}s forwards;
    //             opacity: 0;
    //         `;
    //         wavesContainer.appendChild(wave);
    //     }

    //     // Limpiar ondas
    //     setTimeout(() => {
    //         if (wavesContainer.parentNode) {
    //             wavesContainer.parentNode.removeChild(wavesContainer);
    //         }
    //     }, 3000);
    // };

    const handleFlip = (e: any) => {
        setPaginaActual(e.data);
    };

    const totalPaginas = 1 + catalogoFotos.length;
    const canGoPrev = paginaActual > 0;
    const canGoNext = paginaActual < totalPaginas - 1;

    const handlePrev = () => {
        if (isMobile) {
            if (swiperRef.current) {
                swiperRef.current.slidePrev();
            }
            return;
        }
        try {
            flipBook.current?.pageFlip()?.flipPrev();
        } catch {}
    };

    const handleNext = () => {
        if (isMobile) {
            if (swiperRef.current) {
                swiperRef.current.slideNext();
            }
            return;
        }
        try {
            flipBook.current?.pageFlip()?.flipNext();
        } catch {}
    };

    return (
        <div className="revista-section" ref={revistaRef}>
            {/* Contenedor principal con animación épica */}
            <div className={`revista-container${isVisible ? ' container-revealed' : ''}`}>
                <div className="revista-content-wrapper" style={{ marginTop: isMobile ? undefined : verticalGap, marginBottom: isMobile ? undefined : verticalGap }}>
                    {isMobile ? (
                        <div className="revista-swiper-wrapper">
                            <Swiper
                                modules={[EffectFlip]}
                                effect="flip"
                                spaceBetween={0}
                                slidesPerView={1}
                                initialSlide={1}
                                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                                onSlideChange={(swiper) => setPaginaActual(swiper.activeIndex)}
                                style={{ width: '100%', maxWidth: 420, minHeight: 340 }}
                                className="revista-swiper"
                            >
                                <SwiperSlide key="portada">
                                    <div className="revista-pagina">
                                        <Zoom>
                                            <img src="/images/catalogo/tapa1.jpg" alt="portada" className="revista-img" loading="lazy" />
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
                            <button
                                type="button"
                                className={`revista-nav-button left${canGoPrev ? '' : ' disabled'}`}
                                aria-label="Página anterior"
                                onClick={handlePrev}
                                disabled={!canGoPrev}
                            >
                                <i className="fas fa-chevron-left" />
                            </button>
                            <button
                                type="button"
                                className={`revista-nav-button right${canGoNext ? '' : ' disabled'}`}
                                aria-label="Página siguiente"
                                onClick={handleNext}
                                disabled={!canGoNext}
                            >
                                <i className="fas fa-chevron-right" />
                            </button>
                        </div>
                    ) : (
                        <div className="flipbook-wrapper" ref={flipbookWrapperRef}>
                            <HTMLFlipBook
                                ref={flipBook}
                                width={flipbookDimensions.width}
                                height={flipbookDimensions.height}
                                size="stretch"
                                minWidth={400}
                                maxWidth={flipbookDimensions.width}
                                minHeight={560}
                                maxHeight={flipbookDimensions.height}
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
                                showPageCorners={false}
                            >
                                <div className="revista-pagina">
                                    <img src="/images/catalogo/tapa1.jpg" alt="portada" className="revista-img" loading="lazy" />
                                </div>
                                {catalogoFotos.map((src, i) => (
                                    <div className="revista-pagina" key={i + 1}>
                                        <img src={src} alt={`catalogo-${i + 2}`} className="revista-img" loading="lazy" />
                                    </div>
                                ))}
                            </HTMLFlipBook>
                            <button
                                type="button"
                                className={`revista-nav-button left${canGoPrev ? '' : ' disabled'}`}
                                aria-label="Página anterior"
                                onClick={handlePrev}
                                disabled={!canGoPrev}
                            >
                                <i className="fas fa-chevron-left" />
                            </button>
                            <button
                                type="button"
                                className={`revista-nav-button right${canGoNext ? '' : ' disabled'}`}
                                aria-label="Página siguiente"
                                onClick={handleNext}
                                disabled={!canGoNext}
                            >
                                <i className="fas fa-chevron-right" />
                            </button>

                            
                        </div>
                    )}
                </div>

                {/* Instrucciones con animación mejorada */}
                <div className={`revista-instructions${isVisible ? ' instructions-visible' : ''}`}>
                    <div className="instruction-text">
                        <i className="fas fa-hand-pointer"></i>
                        <span>Deslizá para explorar</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revista;