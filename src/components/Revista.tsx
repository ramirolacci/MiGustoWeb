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
    const [paginaActual, setPaginaActual] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const flipBook = useRef<any>(null);
    const revistaRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 900);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    setIsAnimating(true);
                    setShowParticles(true);
                    
                    // Remover las animaciones de partículas y ondas
                    // createGoldenParticles();
                    // createExpansionWaves();
                    
                    // Resetear estados después de las animaciones
                    setTimeout(() => {
                        setIsAnimating(false);
                        setShowParticles(false);
                    }, 4000);
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (revistaRef.current) {
            observer.observe(revistaRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

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

    return (
        <div className="revista-section" ref={revistaRef}>
            {/* Contenedor principal con animación épica */}
            <div className={`revista-container ${isVisible ? 'container-revealed' : ''} ${isAnimating ? 'epic-animating' : ''}`}>
                <div className="revista-content-wrapper">
                    {isMobile ? (
                        <Swiper
                            modules={[EffectFlip]}
                            effect="flip"
                            spaceBetween={0}
                            slidesPerView={1}
                            onSlideChange={(swiper) => setPaginaActual(swiper.activeIndex)}
                            style={{ width: '100%', maxWidth: 480, minHeight: 380 }}
                            className="revista-swiper"
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
                            width={480}
                            height={760}
                            size="stretch"
                            minWidth={300}
                            maxWidth={600}
                            minHeight={480}
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

                {/* Instrucciones con animación mejorada */}
                <div className={`revista-instructions ${isVisible ? 'instructions-visible' : ''}`}>
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