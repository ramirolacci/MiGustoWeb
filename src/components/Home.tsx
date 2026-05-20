import { useState, useEffect, useRef, memo, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

import './Home.css';
import IphoneWhatsapp from './Iphone';
import { sliderService } from '../services/sliderService';

const HomeSlider = memo(function HomeSlider({ isMobile }: { isMobile: boolean }) {
    const [current, setCurrent] = useState(1);
    const [transition, setTransition] = useState(true);
    const [slidesDesktop, setSlidesDesktop] = useState<string[]>([]);
    const [slidesMobile, setSlidesMobile] = useState<string[]>([]);
    
    useEffect(() => {
        setSlidesDesktop(sliderService.getDesktopSlides());
        setSlidesMobile(sliderService.getMobileSlides());
    }, []);
    
    const slides = isMobile ? slidesMobile : slidesDesktop;
    const timeoutRef = useRef<number | null>(null);

    const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

    // --- FIX: Reiniciar el slider al volver a la pestaña ---
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                // Reiniciar el slider al volver a la pestaña
                setTransition(false);
                setCurrent(1);
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);
    // --- END FIX ---

    useEffect(() => {
        if (!transition) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            goToNext();
        }, 3000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, slides, transition]);

    const handleTransitionEnd = () => {
        if (current === 0) {
            setTransition(false);
            setCurrent(slides.length);
        } else if (current === slides.length + 1) {
            setTransition(false);
            setCurrent(1);
        } else {
            setTransition(true);
        }
    };

    useEffect(() => {
        if (!transition) {
            requestAnimationFrame(() => setTransition(true));
        }
    }, [transition]);

    const goToPrev = () => {
        if (!transition) return;
        setCurrent((prev) => prev - 1);
    };

    const goToNext = () => {
        if (!transition) return;
        setCurrent((prev) => prev + 1);
    };

    return (
        <div className="home-slider" style={isMobile ? { height: '100vh', minHeight: 320 } : {}}>
            <div
                className="home-slider-track"
                style={{
                    width: isMobile ? `${extendedSlides.length * 100}vw` : `${extendedSlides.length * 100}%`,
                    height: isMobile ? '100vh' : 'calc(100vh + 80px)',
                    transform: isMobile
                        ? `translateX(-${current * 100}vw)`
                        : `translateX(-${current * (100 / extendedSlides.length)}%)`,
                    transition: transition ? 'transform 0.7s cubic-bezier(.77,0,.18,1)' : 'none'
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {extendedSlides.map((src, idx) => (
                    <a
                        key={`${src}-${idx}`}
                        href="https://pedir.migusto.com.ar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ width: '100vw', height: '100%', display: 'block' }}
                    >
                        <img
                            src={src}
                            alt={`slide-${idx + 1}`}
                            className="home-slide"
                            style={{
                                width: '100vw',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center 85%',
                                display: 'block'
                            }}
                            loading="lazy"
                        />
                    </a>
                ))}
            </div>
            {/* Botones de flecha eliminados */}
        </div>
    );
});


function PromoCards() {
    const cards = [
        { type: 'lovers', cta: 'Conocer más', href: '/lovers' },
        { img: '/images/sliders/SLIDER 2000X1125 copia.jpg', cta: 'Ver novedad', href: 'https://pedir.migusto.com.ar/' },
        { img: '/images/sliders/desktop2.jpg', cta: 'Ver novedad', href: 'https://pedir.migusto.com.ar/' },
        { img: '/images/sliders/desktop3.jpg', cta: 'Ver novedad', href: 'https://apps.apple.com/ar/app/mi-gusto/id1487319586' },
        { img: '/images/sliders/Generico.jpg', cta: 'Ver novedad', href: 'https://pedir.migusto.com.ar/' }
    ] as Array<{ img?: string; cta: string; href: string; type?: 'lovers' }>;

    // Carrusel con arrastre manual
    const trackRef = useRef<HTMLDivElement>(null);
    const isDesktopRef = useRef<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
    const posRef = useRef<number>(0);
    const isDraggingRef = useRef<boolean>(false);
    const startXRef = useRef<number>(0);
    const startPosRef = useRef<number>(0);

    useEffect(() => {
        const onResize = () => {
            isDesktopRef.current = window.innerWidth >= 1024;
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Funciones para manejar el arrastre
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isDesktopRef.current) return;
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
        startPosRef.current = posRef.current;
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingRef.current || !trackRef.current) return;
        
        const deltaX = e.clientX - startXRef.current;
        const newPos = startPosRef.current + deltaX;
        
        // Aplicar límites suaves para una buena experiencia de usuario
        const containerEl = trackRef.current.parentElement;
        if (!containerEl) return;
        
        const styles = window.getComputedStyle(trackRef.current);
        const gap = parseFloat(styles.columnGap || styles.gap || '32') || 32;
        const containerWidth = window.innerWidth; // Usar el ancho completo de la ventana
        
        // Calcular el ancho total de todas las cards
        let totalCardsWidth = 0;
        const cards = Array.from(trackRef.current.children);
        cards.forEach((child, index) => {
            const cardWidth = (child as HTMLElement).getBoundingClientRect().width;
            totalCardsWidth += cardWidth;
            if (index < cards.length - 1) { // No agregar gap al último elemento
                totalCardsWidth += gap;
            }
        });
        
        // Permitir arrastrar libremente con límites suaves
        const maxScrollDistance = Math.max(0, totalCardsWidth - containerWidth + 200); // +200px para más libertad
        
        posRef.current = Math.max(-maxScrollDistance, Math.min(0, newPos));
        trackRef.current.style.transform = `translate3d(${Math.round(posRef.current)}px, 0, 0)`;
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    const handleMouseLeave = () => {
        isDraggingRef.current = false;
    };

    // Funciones para manejar touch en dispositivos móviles
    const handleTouchStart = (e: React.TouchEvent) => {
        if (isDesktopRef.current) return;
        isDraggingRef.current = true;
        startXRef.current = e.touches[0].clientX;
        startPosRef.current = posRef.current;
        e.preventDefault();
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDraggingRef.current || !trackRef.current || isDesktopRef.current) return;
        
        const deltaX = e.touches[0].clientX - startXRef.current;
        const newPos = startPosRef.current + deltaX;
        
        // Aplicar límites suaves para una buena experiencia de usuario
        const containerEl = trackRef.current.parentElement;
        if (!containerEl) return;
        
        const styles = window.getComputedStyle(trackRef.current);
        const gap = parseFloat(styles.columnGap || styles.gap || '32') || 32;
        const containerWidth = window.innerWidth; // Usar el ancho completo de la ventana
        
        // Calcular el ancho total de todas las cards
        let totalCardsWidth = 0;
        const cards = Array.from(trackRef.current.children);
        cards.forEach((child, index) => {
            const cardWidth = (child as HTMLElement).getBoundingClientRect().width;
            totalCardsWidth += cardWidth;
            if (index < cards.length - 1) { // No agregar gap al último elemento
                totalCardsWidth += gap;
            }
        });
        
        // Permitir arrastrar libremente con límites suaves
        const maxScrollDistance = Math.max(0, totalCardsWidth - containerWidth + 200); // +200px para más libertad
        
        posRef.current = Math.max(-maxScrollDistance, Math.min(0, newPos));
        trackRef.current.style.transform = `translate3d(${Math.round(posRef.current)}px, 0, 0)`;
    };

    const handleTouchEnd = () => {
        isDraggingRef.current = false;
    };

    // Animación GSAP para las cards - efecto de choque desde la derecha
    const sectionRef = useRef<HTMLElement>(null);
    const cardsAnimatedRef = useRef<boolean>(false);
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    const cardsInitializedRef = useRef<boolean>(false);

    useEffect(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.home-card');
        if (cards.length === 0) return;

        // Solo configurar posición inicial una vez
        if (!cardsInitializedRef.current) {
            const cardsArray = Array.from(cards) as HTMLElement[];
            const startX = window.innerWidth + 50;
            
            // Posicionar todas las cards fuera de la pantalla a la derecha desde el inicio
            gsap.set(cardsArray, {
                x: startX,
                opacity: 0,
                force3D: true
            });
            
            cardsInitializedRef.current = true;
        }

        // Observer para activar la animación SOLO cuando la sección sea visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Solo animar cuando realmente esté visible en el viewport Y las cards estén inicializadas
                    if (entry.isIntersecting && !cardsAnimatedRef.current && cardsInitializedRef.current) {
                        cardsAnimatedRef.current = true;
                        
                        const cardsArray = Array.from(cards) as HTMLElement[];
                        
                        // Crear timeline simple y eficiente
                        const tl = gsap.timeline({
                            defaults: {
                                force3D: true
                            }
                        });

                        // Animar cada card desde la derecha (ya están posicionadas) hacia la izquierda
                        cardsArray.forEach((card, index) => {
                            tl.to(card, {
                                x: 0,
                                opacity: 1,
                                duration: 0.8,
                                ease: 'back.out(1.3)'
                            }, index * 0.08); // Delay escalonado
                        });
                        
                        animationRef.current = tl;
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.2, // La sección debe estar al menos 20% visible
                rootMargin: '0px' // Sin margen adicional - solo cuando realmente esté visible
            }
        );

        observer.observe(sectionRef.current);

        return () => {
            observer.disconnect();
            // Limpiar animación si el componente se desmonta
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="home-cards" style={{ padding: '56px 0', width: '100%' }}>
            <div style={{ width: '100%', position: 'relative' }}>
                <div
                  className="home-cards-carousel"
                  ref={trackRef}
                  style={{ 
                    display: 'flex', 
                    gap: 32, 
                    alignItems: 'stretch', 
                    willChange: 'transform', 
                    cursor: 'grab',
                    transform: 'translateZ(0)', // GPU acceleration
                    backfaceVisibility: 'hidden'
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/** Oculto temporalmente la card de "Unite a Lovers Club" **/}
                  {cards
                    .filter(card => card.type !== 'lovers')
                    .map((card, idx) => (
                        <div
                          key={`set1-${idx}`}
                          className="home-card sr-card"
                          style={{
                            borderRadius: 20,
                            overflow: 'visible',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))',
                            padding: 2,
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                            minWidth: '400px',
                            width: '25vw',
                            flexShrink: 0
                          }}
                        >
                          <div style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '16 / 9',
                            // Fondo transparente para evitar marcas detrás de la imagen
                            background: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 18,
                            overflow: 'hidden'
                          }}>
                            {/** Card Lovers comentada
                            {card.type === 'lovers' ? (
                              <> ... contenido ... </>
                            ) : (
                            **/}
                              <>
                                <img src={card.img} alt={card.cta} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} loading="lazy" />
                                <a
                                  href={card.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn"
                                  style={{
                                    position: 'absolute',
                                    left: 24,
                                    bottom: 24,
                                    backgroundColor: '#ffbf1f',
                                    borderColor: '#ffbf1f',
                                    color: '#1b1b1b',
                                    fontWeight: 700,
                                    padding: '14px 24px',
                                    borderRadius: 16,
                                    textDecoration: 'none'
                                  }}
                                >
                                  {card.cta}
                                </a>
                              </>
                          </div>
                        </div>
                  ))}
                </div>
            </div>
            <style>{`
              .home-cards-carousel {
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
              }
              
              .home-cards-carousel:active {
                cursor: grabbing;
              }
              
              /* Estilos de hover para botones */
              .btn:hover {
                color: #fff !important;
                transition: color 0.3s ease;
              }
              
              .btn:hover {
                background-color: #ffbf1f !important;
                border-color: #ffbf1f !important;
                color: #fff !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 191, 31, 0.3);
                transition: all 0.3s ease;
              }
              
              /* Estilos específicos para el botón Delivery (btn-outline-light) */
              .btn-outline-light:hover {
                background-color: #fff !important;
                border-color: #fff !important;
                color: #000 !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
                transition: all 0.3s ease;
              }
              
              /* Estilos para el triángulo 3D del iPhone */
              .iphone-triangle-bg {
                /* Sin animación - triángulo estático */
              }
              
              .home-card { 
                min-width: 350px;
                max-width: 500px;
                width: 25vw;
              }
              
              @media (min-width: 768px) {
                .home-card { 
                  min-width: 400px;
                  width: 25vw;
                }
              }
              
              @media (min-width: 1200px) {
                .home-card { 
                  min-width: 450px;
                  width: 25vw;
                }
              }
              
              .home-card:hover { 
                box-shadow: 0 20px 48px rgba(0,0,0,0.25); 
                transform: translateY(-4px) scale(1.02); 
                transition: all .3s cubic-bezier(0.4, 0, 0.2, 1); 
                z-index: 10;
                position: relative;
              }
              
              .home-card img {
                transition: transform 0.3s ease;
              }
              
              .home-card:hover img {
                transform: scale(1.02);
              }
              
              /* Animación de lluvia de empanadas para desktop */
              @keyframes empanada-fall-desktop {
                0% {
                  opacity: 0;
                  transform: translateY(-100px) rotate(0deg) scale(0.8);
                }
                5% {
                  opacity: 0.6;
                  transform: translateY(-80px) rotate(45deg) scale(0.9);
                }
                15% {
                  opacity: 0.8;
                  transform: translateY(-40px) rotate(90deg) scale(1);
                }
                85% {
                  opacity: 0.8;
                  transform: translateY(calc(100% + 40px)) rotate(315deg) scale(1);
                }
                95% {
                  opacity: 0.4;
                  transform: translateY(calc(100% + 80px)) rotate(350deg) scale(0.9);
                }
                100% {
                  opacity: 0;
                  transform: translateY(calc(100% + 100px)) rotate(360deg) scale(0.8);
                }
              }
            `}</style>
        </section>
    );
}

const HOME_VIDEOS = [
  '/videos/promotional/VideoFlash.mp4',
  '/videos/promotional/VideoFlash (1).mp4',
  '/videos/promotional/VideoFlash (2).mp4'
];

function Home() {
    const [selectedVideo] = useState(() => {
        const randomIndex = Math.floor(Math.random() * HOME_VIDEOS.length);
        return HOME_VIDEOS[randomIndex];
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const iphoneContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero Title Animation
        const letters = heroTitleRef.current?.querySelectorAll('.hero-letter');
        if (letters) {
            gsap.fromTo(letters, 
                { opacity: 0, y: 50, rotateX: -90 },
                { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0, 
                    duration: 0.8, 
                    stagger: 0.03, 
                    ease: "back.out(1.7)",
                    delay: 0.5
                }
            );
        }

        // Parallax effect for Hero Video
        gsap.to(".home-hero-video", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".home-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // App Section Reveal
        const appTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".home-app-section-row",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        appTl.from(".home-app-descarga h2", { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" })
             .from(".app-descarga-text", { x: -30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
             .from(".home-app-links a", { y: 20, opacity: 0, stagger: 0.2, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
             .from(".iphone-reveal-container", { scale: 0.8, opacity: 0, duration: 1, ease: "expo.out" }, "-=1");

        // 3D Tilt Effect for iPhone on Mouse Move
        const handleMouseMove = (e: MouseEvent) => {
            if (!iphoneContainerRef.current) return;
            const rect = iphoneContainerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            gsap.to(iphoneContainerRef.current.querySelector('.iphone-wrapper'), {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
            
            gsap.to(iphoneContainerRef.current.querySelector('.iphone-triangle-bg'), {
                x: (x - centerX) / 8,
                y: (y - centerY) / 8,
                duration: 0.8,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            if (!iphoneContainerRef.current) return;
            gsap.to(iphoneContainerRef.current.querySelector('.iphone-wrapper'), { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            gsap.to(iphoneContainerRef.current.querySelector('.iphone-triangle-bg'), { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        };

        const currentContainer = iphoneContainerRef.current;
        currentContainer?.addEventListener('mousemove', handleMouseMove);
        currentContainer?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            currentContainer?.removeEventListener('mousemove', handleMouseMove);
            currentContainer?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: containerRef });

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ScrollReveal para navbar, slider y bloques de app
    useEffect(() => {
        import('scrollreveal').then((module) => {
            const sr = module.default ? module.default : module;
            // Navbar reveals (más exagerados)
            sr().reveal('.navbar .navbar-brand', {
                distance: '28px',
                duration: 1000,
                origin: 'top',
                opacity: 0,
                scale: 0.9,
                easing: 'cubic-bezier(0.22,1,0.36,1)',
                reset: false
            });
            sr().reveal('.navbar .hamburger-menu', {
                distance: '32px',
                duration: 1000,
                origin: 'left',
                opacity: 0,
                scale: 0.9,
                rotate: { x: 0, y: 0, z: -3 },
                easing: 'cubic-bezier(0.22,1,0.36,1)',
                reset: false,
                delay: 120
            });
            sr().reveal('.navbar .nav-item', {
                interval: 120,
                distance: '28px',
                duration: 950,
                origin: 'top',
                opacity: 0,
                scale: 0.95,
                easing: 'cubic-bezier(0.22,1,0.36,1)',
                reset: false,
                delay: 160
            });
            sr().reveal('.navbar .nav-link-pedir', {
                distance: '32px',
                duration: 1000,
                origin: 'top',
                opacity: 0,
                scale: 0.95,
                easing: 'cubic-bezier(0.22,1,0.36,1)',
                reset: false,
                delay: 220
            });
            sr().reveal('.navbar .navbar-profile', {
                distance: '36px',
                duration: 1100,
                origin: 'top',
                opacity: 0,
                scale: 0.95,
                easing: 'cubic-bezier(0.22,1,0.36,1)',
                reset: false,
                delay: 260
            });
            // Cards del medio - Comentado porque ahora usamos GSAP para animación desde la derecha
            // sr().reveal('.home-card', {
            //     distance: '30px',
            //     duration: 1600,
            //     origin: 'bottom',
            //     opacity: 0,
            //     reset: true
            // });
            // Hero: video, título y CTAs
            sr().reveal('.home-hero-video', {
                distance: '0px',
                duration: 1400,
                scale: 0.96,
                opacity: 0,
                reset: true
            });
            sr().reveal('.home-hero-title', {
                distance: '24px',
                duration: 1400,
                origin: 'left',
                opacity: 0,
                reset: true
            });
            sr().reveal('.home-hero-cta a', {
                distance: '20px',
                duration: 1300,
                origin: 'bottom',
                opacity: 0,
                interval: 120,
                reset: true
            });
            // Bloques de app
            sr().reveal('.home-app-descarga', {
                distance: '30px',
                duration: 1600,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                origin: 'left',
                opacity: 0,
                reset: true
            });
            sr().reveal('.home-app-iphone', {
                distance: '30px',
                duration: 1600,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                origin: 'right',
                opacity: 0,
                reset: true
            });
            // iPhone específico para asegurar el efecto
            sr().reveal('.iphone-wrapper', {
                distance: '30px',
                duration: 1600,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                origin: 'right',
                opacity: 0,
                reset: true
            });
            // iPhone con selector más específico
            sr().reveal('#iPhone', {
                distance: '30px',
                duration: 1600,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                origin: 'right',
                opacity: 0,
                reset: true
            });
            // iPhone con la nueva clase
            sr().reveal('.iphone-reveal-container', {
                distance: '30px',
                duration: 1600,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                origin: 'right',
                opacity: 0,
                reset: true
            });
        });
    }, []);

    return (
        <div className="home" ref={containerRef}>
            {/* Nueva sección hero principal */}
            <section
                className="home-hero"
                style={{
                    position: 'relative',
                    height: '100svh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    paddingTop: 64
                }}
            >
                <video
                    className="home-hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) scale(1.25)',
                        width: 'auto',
                        height: '100svh',
                        minWidth: '100vw',
                        minHeight: '100svh',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                    src={selectedVideo}
                    poster="/images/sliders/mainpain.png"
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.15) 100%)'
                    }}
                />
                <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200, padding: '0 24px' }}>
                    <h1 ref={heroTitleRef} className="home-hero-title hero-animated-title" style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? 34 : 64, lineHeight: 1.1, marginBottom: 24, perspective: '1000px' }}>
                        {(() => {
                            const line1 = 'Disfrutá hoy tu';
                            const line2 = 'experiencia de verdad';
                            const renderLine = (text: string, startIndex: number = 0) => (
                                Array.from(text).map((ch, idx) => (
                                    <span
                                        key={startIndex + idx}
                                        className="hero-letter"
                                        style={{ display: 'inline-block', whiteSpace: 'pre' }}
                                    >
                                        {ch === ' ' ? '\u00A0' : ch}
                                    </span>
                                ))
                            );
                            return (
                                <>
                                    <div style={{ overflow: 'hidden' }}>{renderLine(line1, 0)}</div>
                                    <div style={{ overflow: 'hidden' }}>{renderLine(line2, Array.from(line1).length)}</div>
                                </>
                            );
                        })()}
                    </h1>
                    <div className="home-hero-cta" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <a
                            href="https://pedir.migusto.com.ar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                            style={{
                                backgroundColor: '#ffbf1f',
                                borderColor: '#ffbf1f',
                                color: '#1b1b1b',
                                fontWeight: 700,
                                padding: '12px 18px',
                                borderRadius: 10,
                                textDecoration: 'none'
                            }}
                        >
                            Pedí y Retirá
                        </a>
                        <a
                            href="https://pedir.migusto.com.ar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-light"
                            style={{
                                backdropFilter: 'blur(2px)',
                                border: '2px solid rgba(255,255,255,0.85)',
                                color: '#fff',
                                fontWeight: 700,
                                padding: '10px 18px',
                                borderRadius: 10,
                                textDecoration: 'none'
                            }}
                        >
                            Delivery
                        </a>
                    </div>
                </div>
            </section>

            {/* Cards tipo slider debajo del hero */}
            <PromoCards />
            <section className="home-app-section-row">
                <div className="home-app-descarga">
                    <h2>Descargá nuestra app</h2>
                    <p className="app-descarga-text">
                        ¡Pedí tus empanadas favoritas, encontrá la sucursal más cercana y disfrá promos exclusivas desde tu celular!<br />
                        Viví la experiencia Mi Gusto como nunca antes.
                    </p>
                    <div className="home-app-links" style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.migusto.app&hl=es_AR"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/assets/google-play-logo.svg" alt="Google Play" style={{ height: 60 }} loading="lazy" />
                        </a>
                        <a
                            href="https://apps.apple.com/ar/app/mi-gusto/id1487319586"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/assets/app-store-apple-logo.svg" alt="App Store" style={{ height: 60 }} loading="lazy" />
                        </a>
                    </div>
                </div>
                <div ref={iphoneContainerRef} className="home-app-iphone iphone-reveal-container" style={{ position: 'relative', perspective: '1200px' }}>
                    {/* Triángulo amarillo de fondo para efecto 3D */}
                    <div 
                        className="iphone-triangle-bg"
                        style={{
                            position: 'absolute',
                            top: '55%',
                            left: '35%',
                            transform: 'translate(-50%, -50%) rotate(-20deg) skew(-5deg, 3deg)',
                            width: '800px',
                            height: '700px',
                            background: '#ffbf1f',
                            clipPath: 'polygon(30% 10%, 95% 45%, 25% 95%)',
                            zIndex: 1,
                            opacity: 0.9,
                            boxShadow: '0 0 40px rgba(255, 191, 31, 0.6)'
                        }}
                    />
                    <div className="iphone-3d-wrap" style={{ position: 'relative', zIndex: 2, transformStyle: 'preserve-3d' }}>
                        <IphoneWhatsapp />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;