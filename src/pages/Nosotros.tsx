import React, { useRef, useEffect, useState } from 'react';
import './Nosotros.css';

const Nosotros: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [franquiciasCount, setFranquiciasCount] = useState(0);
    const franquiciasRef = useRef<HTMLDivElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                videoRef.current.muted = true;
            } else {
                videoRef.current.play();
                videoRef.current.muted = false;
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current && !entry.isIntersecting) {
                    videoRef.current.pause();
                    videoRef.current.muted = true;
                    setIsPlaying(false);
                }
            },
            { threshold: 0.5 }
        );
        const videoElement = videoRef.current;
        if (videoElement) observer.observe(videoElement);
        return () => { if (videoElement) observer.unobserve(videoElement); };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFranquiciasCount(0);
                    const targetNumber = 37;
                    const duration = 1500; // 1.5 segundos
                    const steps = 37; // Un paso por número
                    const stepDuration = duration / steps;

                    let currentStep = 0;
                    const interval = setInterval(() => {
                        currentStep++;
                        setFranquiciasCount(currentStep);
                        
                        if (currentStep >= targetNumber) {
                            clearInterval(interval);
                        }
                    }, stepDuration);
                }
            },
            {
                threshold: 0.5
            }
        );

        const franquiciasElement = franquiciasRef.current;
        if (franquiciasElement) {
            observer.observe(franquiciasElement);
        }

        return () => {
            if (franquiciasElement) {
                observer.unobserve(franquiciasElement);
            }
        };
    }, []);

    useEffect(() => {
        import('scrollreveal').then((module) => {
            const sr = module.default ? module.default : module;
            sr().reveal('.section-card', {
                distance: '30px',
                duration: 1600,
                origin: 'bottom',
                opacity: 0,
                reset: true
            });
            sr().reveal('.nosotros-video-container', {
                distance: '30px',
                duration: 1600,
                origin: 'right',
                opacity: 0,
                reset: true
            });
        });
    }, []);
    // --- DRAG-TO-SCROLL PARA CARRUSEL DE VALORES ---
    // Estado para drag horizontal (usando refs para listeners globales)
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const isDraggingRef = useRef(false);
    const isHoveringRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const valoresContainerRef = useRef<HTMLDivElement>(null);

    // Valores del carrusel (fijos, no reordenables)
    const valores = [
        {
            key: 'excelencia1',
            titulo: 'EXCELENCIA',
            texto: 'Es tener una actitud comprometida para hacer las cosas bien la primera vez, siempre, y todos. "Somos lo que hacemos cada día, de modo que la excelencia no es un acto, sino un hábito" - Aristóteles.'
        },
        {
            key: 'calidad1',
            titulo: 'CALIDAD',
            texto: 'Es el premio a la excelencia, es hacer bien las cosas que hay que hacer. La calidad no se negocia.'
        },
        {
            key: 'humanidad1',
            titulo: 'HUMANIDAD',
            texto: 'Invertimos en el desarrollo de nuestros colaboradores e incentivamos a tratar a otro como nos gustaría que nos traten.'
        },
        {
            key: 'innovacion1',
            titulo: 'INNOVACIÓN CONTINUA',
            texto: 'Somos disruptivos y escuchamos ideas para mejorar lo que tenemos y para crear lo que aún no existe.'
        },
        {
            key: 'cliente1',
            titulo: 'ORIENTACIÓN AL CLIENTE',
            texto: 'Nuestra atención garantiza al cliente una experiencia premium para un producto premium.'
        },
        {
            key: 'compromiso1',
            titulo: 'COMPROMISO',
            texto: 'Trabajamos con dedicación y pasión para superar las expectativas de nuestros clientes en cada visita.'
        },
        {
            key: 'excelencia2',
            titulo: 'EXCELENCIA',
            texto: 'Es tener una actitud comprometida para hacer las cosas bien la primera vez, siempre, y todos. Somos lo que hacemos cada día, de modo que la excelencia no es un acto, sino un hábito.'
        },
        {
            key: 'calidad2',
            titulo: 'CALIDAD',
            texto: 'Es el premio a la excelencia, es hacer bien las cosas que hay que hacer. La calidad no se negocia.'
        },
        {
            key: 'humanidad2',
            titulo: 'HUMANIDAD',
            texto: 'Invertimos en el desarrollo de nuestros colaboradores e incentivamos a tratar a otro como nos gustaría que nos traten.'
        },
        {
            key: 'innovacion2',
            titulo: 'INNOVACIÓN CONTINUA',
            texto: 'Somos disruptivos y escuchamos ideas para mejorar lo que tenemos y para crear lo que aún no existe.'
        },
        {
            key: 'cliente2',
            titulo: 'ORIENTACIÓN AL CLIENTE',
            texto: 'Nuestra atención garantiza al cliente una experiencia premium para un producto premium.'
        },
        {
            key: 'compromiso2',
            titulo: 'COMPROMISO',
            texto: 'Trabajamos con dedicación y pasión para superar las expectativas de nuestros clientes en cada visita.'
        }
    ];
    // Drag-to-scroll mejorado: listeners globales
    const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = valoresContainerRef.current;
        if (!container) return;
        setIsDragging(true);
        isDraggingRef.current = true;
        const startX = e.pageX - (container.offsetLeft || 0);
        startXRef.current = startX;
        const scrollLeft = container.scrollLeft || 0;
        scrollLeftRef.current = scrollLeft;
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
        const container = valoresContainerRef.current;
        if (!isDraggingRef.current || !container) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startXRef.current) * 1.2;
        container.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleSnapToCard = () => {
        const container = valoresContainerRef.current;
        if (!container) return;
        const cardWidth = 260 + 32; // 260px + gap (2rem)
        const scroll = container.scrollLeft;
        const idx = Math.round(scroll / cardWidth);
        const targetScroll = idx * cardWidth;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    const handleWindowMouseUp = () => {
        setIsDragging(false);
        isDraggingRef.current = false;
        window.removeEventListener('mousemove', handleWindowMouseMove);
        window.removeEventListener('mouseup', handleWindowMouseUp);
        handleSnapToCard();
    };
    // Limpieza por si el componente se desmonta durante drag
    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
        };
        // eslint-disable-next-line
    }, []);
    // Touch events para mobile (usando refs también)
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const container = valoresContainerRef.current;
        if (!container) return;
        setIsDragging(true);
        isDraggingRef.current = true;
        const startX = e.touches[0].pageX - (container.offsetLeft || 0);
        startXRef.current = startX;
        const scrollLeft = container.scrollLeft || 0;
        scrollLeftRef.current = scrollLeft;
    };
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const container = valoresContainerRef.current;
        if (!isDraggingRef.current || !container) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startXRef.current) * 1.2;
        container.scrollLeft = scrollLeftRef.current - walk;
    };
    const handleTouchEnd = () => {
        setIsDragging(false);
        isDraggingRef.current = false;
        handleSnapToCard();
    };

    // Handlers para hover
    const handleMouseEnter = () => {
        setIsHovering(true);
        isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        isHoveringRef.current = false;
    };

    // Auto-scroll infinito mejorado tipo pasarela
    useEffect(() => {
        const container = valoresContainerRef.current;
        const track = carouselRef.current;
        if (!container || !track) return;

        let rafId = 0;
        let last = performance.now();
        const SPEED_PX_PER_SEC = 25; // velocidad aumentada para efecto pasarela
        
        const loop = (now: number) => {
            const dt = now - last;
            last = now;

            if (!isDraggingRef.current && !isHoveringRef.current) {
                container.scrollLeft += (SPEED_PX_PER_SEC * dt) / 1000;

                // Reiniciar cuando llegue a la mitad para scroll infinito
                const half = track.scrollWidth / 2;
                if (half > 0 && container.scrollLeft >= half) {
                    container.scrollLeft -= half;
                }
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, []);


    return (
        <div className="nosotros-container">
            <div className="background-overlay"></div>
            <div className="nosotros-content">
                <div className="nosotros-grid">
                    <div className="nosotros-main-content">
                        <div className="section-card">
                            <h2>QUIENES SOMOS?</h2>
                            <p>
                            Somos Mi Gusto, una empresa familiar que nació en el año 2000 en Don Torcuato,
                            impulsada por la pasión de Lucía, una mujer emprendedora que, junto a sus hijos
                            Jésica y Pablo Lemos, transformó una pequeña rotisería en una de las cadenas de
                            empanadas gourmet más reconocidas del país.
                            </p><br></br>
                            <p>
                            Nuestro éxito radica en la combinación de tradición familiar, atención
                            personalizada y una constante búsqueda por innovar en sabores y formatos,
                            adaptándonos a las tendencias y necesidades de nuestros clientes.
                            </p><br></br>
                            <p>
                            En Mi Gusto, no solo vendemos empanadas; ofrecemos una invitación a disfrutar
                            de un producto premium, elaborado con ingredientes seleccionados y una pasión
                            que se transmite en cada bocado. Somos una marca que crece con sus clientes,
                            siempre fiel a sus raíces y con la mirada puesta en el futuro gastronómico.
                            </p>
                        </div>
                    </div>

                    <div className="nosotros-video-container">
                        <div className="iphone-frame">
                            <div className="iphone-notch"></div>
                            <div className="iphone-button left"></div>
                            <div className="iphone-button right"></div>
                            <div className="tiktok-interface" onClick={togglePlay}>
                                <video
                                    ref={videoRef}
                                    loop
                                    playsInline
                                    muted={!isPlaying}
                                    controls={false}
                                    style={{ 
                                        width: '100%', 
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                >
                                    <source src="/videos/corporate/MiGusto_Pabloyjesica.mp4" type="video/mp4" />
                                </video>
                                {!isPlaying && (
                                    <div className="play-overlay">
                                        <i className="fas fa-play"></i>
                                    </div>
                                )}
                                <div className="tiktok-overlay">
                                    <div className="tiktok-user-info">
                                        <img 
                                            src="/images/logos/logoBot.png" 
                                            alt="Mi Gusto" 
                                            className="tiktok-avatar"
                                        />
                                        <div className="tiktok-username">@migusto</div>
                                        <button className="tiktok-follow-btn">Seguir</button>
                                    </div>
                                    <div className="tiktok-actions">
                                        <div className="tiktok-action">
                                            <i className="fas fa-heart"></i>
                                            <span>1.2M</span>
                                        </div>
                                        <div className="tiktok-action">
                                            <i className="fas fa-comment"></i>
                                            <span>8.5K</span>
                                        </div>
                                        <div className="tiktok-action">
                                            <i className="fas fa-share"></i>
                                            <span>2.3K</span>
                                        </div>
                                    </div>
                                    <div className="tiktok-description">
                                        <p>Conocé la historia de Mi Gusto 🍕✨</p>
                                        <div className="tiktok-hashtags">
                                            #MiGusto #Pizza #Historia
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-card vision-mision">
                    <div className="mision">
                        <h2>MISIÓN</h2>
                        <p>
                            Nuestra misión es ofrecer una experiencia gastronómica única, 
                            combinando la tradición de las empanadas con innovación culinaria, 
                            manteniendo los más altos estándares de calidad y servicio.
                        </p>
                    </div>
                    <div className="vision">
                        <h2>VISIÓN</h2>
                        <p>
                            Aspiramos a ser reconocidos como la marca líder en empanadas gourmet, 
                            expandiendo nuestra presencia a nivel nacional e internacional, 
                            manteniendo siempre nuestra esencia y compromiso con la excelencia.
                        </p>
                    </div>
                </div>

                <div className="section-card">
                    <h2>FRANQUICIAS</h2>
                    <div className="franquicias-content">
                        <p>
                            Actualmente contamos con 37 franquicias distribuidas estratégicamente 
                            en diferentes puntos del país, ofreciendo la misma calidad y experiencia 
                            en cada una de nuestras ubicaciones.
                        </p>
                        <div className="franquicias-stats" ref={franquiciasRef}>
                            <div className="stat-item">
                                <span className="stat-number">{franquiciasCount}</span>
                                <span className="stat-label">Franquicias</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-card">
                    <h2>VALORES</h2>
                    <div
                        className="valores-carousel-container"
                        ref={valoresContainerRef}
                        onMouseDown={handleDragStart}
                        onMouseMove={isDragging ? (e) => handleWindowMouseMove(e.nativeEvent) : undefined}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={isDragging ? handleWindowMouseUp : handleMouseLeave}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    >
                        <div
                            className="valores-carousel-track"
                            ref={carouselRef}
                        >
                            {[...valores, ...valores].map((valor, idx) => (
                                <div
                                    key={`${valor.key}-${idx}`}
                                    className={`valor-item${valor.titulo === 'EXCELENCIA' ? ' excelencia-card' : ''}`}
                                    onMouseDown={e => e.preventDefault()}
                                >
                                    <h4>{valor.titulo}</h4>
                                    <p>{valor.texto}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nosotros; 