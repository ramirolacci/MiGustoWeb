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
                            width: isMobile ? '100vw' : '100%',
                            height: isMobile ? '100vh' : '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
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
            // Navbar (ajusta el selector según tu proyecto)
            sr().reveal('.navbar', {
                distance: '20px',
                duration: 1400,
                origin: 'top',
                opacity: 0,
                reset: true
            });
            // Slider principal
            sr().reveal('.home-slider', {
                distance: '30px',
                duration: 1600,
                origin: 'bottom',
                opacity: 0,
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
            <HomeSlider isMobile={isMobile} />
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