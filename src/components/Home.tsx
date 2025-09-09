import { useState, useEffect, useRef, memo } from 'react';

import './Home.css';
import IphoneWhatsapp from './Iphone';

const slidesDesktop = [
    '/sliders/desktop1.jpg',
    '/sliders/desktop2.jpg',
    '/sliders/desktop3.jpg',
];

const slidesMobile = [
    '/sliders/mobile1.jpg',
    '/sliders/mobile2.jpg',
    '/sliders/mobile3.jpg',
];

const HomeSlider = memo(function HomeSlider({ isMobile }: { isMobile: boolean }) {
    const [current, setCurrent] = useState(1);
    const [transition, setTransition] = useState(true);
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
                    <img
                        key={`${src}-${idx}`}
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
                ))}
            </div>
            {/* Botones de flecha eliminados */}
        </div>
    );
});


function PromoCards() {
    const cards = [
        { img: '/sliders/desktop2.jpg', cta: 'Ver promos', href: 'https://pedir.migusto.com.ar/' },
        { img: '/sliders/desktop3.jpg', cta: 'Descargar app', href: 'https://apps.apple.com/ar/app/mi-gusto/id1487319586' }
    ];
    return (
        <section className="home-cards" style={{ padding: '56px 16px' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <div className="home-cards-grid" style={{ display: 'grid', gap: 24, alignItems: 'stretch' }}>
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="home-card sr-card"
                            style={{
                                borderRadius: 20,
                                overflow: 'visible',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))',
                                padding: 2,
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: '0 16px 40px rgba(0,0,0,0.25)'
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '4 / 3',
                                background: 'radial-gradient(circle at 30% 20%, #1a1a1a, #0b0b0b)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 18,
                                overflow: 'hidden'
                            }}>
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
              .home-cards-grid { grid-template-columns: 1fr; }
              @media (min-width: 768px) {
                .home-cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px; }
              }
              .home-card:hover { box-shadow: 0 14px 32px rgba(0,0,0,0.18); transform: translateY(-2px); transition: all .25s ease; }
            `}</style>
        </section>
    );
}

function Home() {
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
            // Navbar reveals (suaves y sin reset para no ocultar elementos al scroll)
            sr().reveal('.navbar .navbar-brand', {
                distance: '10px', duration: 600, origin: 'top', opacity: 0, reset: false
            });
            sr().reveal('.navbar .hamburger-menu', {
                distance: '10px', duration: 600, origin: 'left', opacity: 0, reset: false, delay: 80
            });
            sr().reveal('.navbar .nav-item', {
                interval: 70, distance: '10px', duration: 650, origin: 'top', opacity: 0, reset: false, delay: 120
            });
            sr().reveal('.navbar .nav-link-pedir', {
                distance: '10px', duration: 650, origin: 'top', opacity: 0, reset: false, delay: 180
            });
            sr().reveal('.navbar .navbar-profile', {
                distance: '10px', duration: 650, origin: 'top', opacity: 0, reset: false, delay: 220
            });
            // Cards del medio
            sr().reveal('.home-card', {
                distance: '30px',
                duration: 1600,
                origin: 'bottom',
                opacity: 0,
                reset: true
            });
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
        <div className="home">
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
                    src="/sliders/VideoFlash.mp4"
                    poster="/sliders/mainpain.png"
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.15) 100%)'
                    }}
                />
                <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200, padding: '0 24px' }}>
<<<<<<< HEAD
                    <h1 className="home-hero-title hero-animated-title" style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? 34 : 64, lineHeight: 1.1, marginBottom: 24 }}>
                        {(() => {
                            const text = 'Disfrutá hoy tu experiencia de verdad';
                            return Array.from(text).map((ch, idx) => (
                                <span
                                    key={idx}
                                    className="hero-letter"
                                    style={{ animationDelay: `${idx * 0.06}s` }}
                                >
                                    {ch === ' ' ? '\u00A0' : ch}
                                </span>
                            ));
=======
                    <h1 className="hero-animated-title" style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? 34 : 64, lineHeight: 1.1, marginBottom: 24 }}>
                        {(() => {
                          const line1 = 'Disfrutá hoy tu';
                          const line2 = 'experiencia de verdad';
                          const renderLine = (text: string, startIndex: number = 0) => (
                            Array.from(text).map((ch, idx) => (
                              <span
                                key={startIndex + idx}
                                className="hero-letter"
                                style={{ animationDelay: `${(startIndex + idx) * 0.06}s` }}
                              >
                                {ch === ' ' ? '\u00A0' : ch}
                              </span>
                            ))
                          );
                          return (
                            <>
                              {renderLine(line1, 0)}
                              <br />
                              {renderLine(line2, Array.from(line1).length)}
                            </>
                          );
>>>>>>> 8668457d0f996fd9fc81d17bc3b1d0f0175ca149
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
                            <img src="src/assets/google-play-logo.svg" alt="Google Play" style={{ height: 60 }} loading="lazy" />
                        </a>
                        <a
                            href="https://apps.apple.com/ar/app/mi-gusto/id1487319586"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="src/assets/app-store-apple-logo.svg" alt="App Store" style={{ height: 60 }} loading="lazy" />
                        </a>
                    </div>
                </div>
                <div className="home-app-iphone iphone-reveal-container">
                    <IphoneWhatsapp />
                </div>
            </section>
        </div>
    );
}

export default Home;