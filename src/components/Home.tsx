import { useState, useEffect, useRef } from 'react';
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

function Home() {
    const [current, setCurrent] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const slides = isMobile ? slidesMobile : slidesDesktop;
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-slide every 3 seconds, infinite loop
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, slides.length]);

    const goToPrev = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="home">
            <div className="home-slider">
                <div
                    className="home-slider-track"
                    style={{
                        width: `${slides.length * 100}%`,
                        transform: `translateX(-${current * (100 / slides.length)}%)`,
                        transition: 'transform 0.7s cubic-bezier(.77,0,.18,1)'
                    }}
                >
                    {slides.map((src, idx) => (
                        <img
                            key={src}
                            src={src}
                            alt={`slide-${idx + 1}`}
                            className="home-slide"
                            style={{ width: `${100 / slides.length}%` }}
                        />
                    ))}
                </div>
                <button className="slider-arrow left" onClick={goToPrev} aria-label="Anterior">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M18 24L10 14L18 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className="slider-arrow right" onClick={goToNext} aria-label="Siguiente">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M10 24L18 14L10 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <section className="home-app-section-row">
                <div className="home-app-descarga">
                    <h2>Descargá nuestra app</h2>
                    <p style={{ color: '#444', margin: '0 0 1.2em 0', fontSize: '1.08em', fontWeight: 400 }}>
                        ¡Pedí tus empanadas favoritas, encontrá la sucursal más cercana y disfrutá promos exclusivas desde tu celular!<br />
                            Viví la experiencia Mi Gusto como nunca antes.                    </p>
                    <div className="home-app-links" style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.tuapp"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="src/assets/google-play-logo.svg" alt="Google Play" style={{ height: 60 }} />
                        </a>
                        <a
                            href="https://apps.apple.com/app/idXXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="src/assets/app-store-apple-logo.svg" alt="App Store" style={{ height: 60 }} />
                        </a>
                    </div>
                </div>
                <div className="home-app-iphone">
                    <IphoneWhatsapp />
                </div>
            </section>
        </div>
    );
}

export default Home;