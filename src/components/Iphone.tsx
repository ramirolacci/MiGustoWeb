import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Iphone.css';

// Importar las imágenes de los sliders
const sliderImages = [
    '/sliders/mobile3.jpg',
    '/sliders/mobile1.jpg',
    '/sliders/mobile2.jpg',
];

const IphoneStore: React.FC = () => {
    const navigate = useNavigate();
    const iphoneRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState('15:26'); // Ajustar hora a la captura
    const [activeCategory, setActiveCategory] = useState('Inicio');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDynamicIslandExpanded, setIsDynamicIslandExpanded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showWhatsAppNotification, setShowWhatsAppNotification] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        const notificationTimer = setTimeout(() => {
            setShowWhatsAppNotification(true);
            const hideNotificationTimer = setTimeout(() => {
                setShowWhatsAppNotification(false);
            }, 5000); // La notificación desaparece después de 5 segundos
            return () => clearTimeout(hideNotificationTimer);
        }, 3000); // La notificación aparece después de 3 segundos

        const interval = setInterval(updateTime, 60000); // Actualizar cada minuto (opcional)
        return () => {
            clearInterval(interval);
            clearTimeout(notificationTimer);
        };
    }, []);

    useEffect(() => {
        // Autoplay del slider
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
        }, 5000); // Cambia de slide cada 5 segundos

        return () => clearInterval(slideInterval);
    }, [sliderImages.length]);

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        // Lógica de navegación o acción según la categoría
        console.log(`Clicked on: ${category}`);
        // setIsMenuOpen(false); // Cerrar menú al seleccionar opción
    };

    const handleDynamicIslandClick = () => {
        setIsDynamicIslandExpanded(!isDynamicIslandExpanded);
    };

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Cerrar el menú solo si se hace click en el overlay, no en el sidebar
        if (e.target === e.currentTarget) {
            setIsMenuOpen(false);
        }
    };

    return (
        <main>
            <div 
                id="iPhone" 
                className="iphone-wrapper animate" 
                ref={iphoneRef}
            >
                <div className="iPhone">
                    <span className="power-btn"></span>
                    <div className="volumne-btn-container">
                        <span className="volume-btn"></span>
                        <span className="volume-btn"></span>
                    </div>
                    <div className="headers-container">
                        <div className="iphone-header">
                            <span className="time-text">{currentTime}</span>
                            <div className="dynamic-island" onClick={handleDynamicIslandClick}>
                                {/* Aquí irá el contenido dinámico si se expande */}
                                <div className="island-camera"></div>
                                <div className="island-sensor"></div>
                            </div>
                            <div className="icons">
                                <img className="icon" src="https://raw.githubusercontent.com/khatri2002/codepen/30b52de44864248b0617b059a7fc7c0ebbcc0eda/iphone-whatsapp/assets/images/icons/network-icon.svg" alt="network-icon" />
                                <img className="icon" src="https://raw.githubusercontent.com/khatri2002/codepen/30b52de44864248b0617b059a7fc7c0ebbcc0eda/iphone-whatsapp/assets/images/icons/wifi-icon.svg" alt="wifi-icon" />
                                <img className="icon" src="https://raw.githubusercontent.com/khatri2002/codepen/30b52de44864248b0617b059a7fc7c0ebbcc0eda/iphone-whatsapp/assets/images/icons/battery-icon.svg" alt="battery-icon" />
                            </div>
                        </div>
                        <div className="appstore-header">
                            <i className="fa-solid fa-bars menu-icon" onClick={handleMenuClick}></i>
                            <div className="right-icons">
                                <button className="at-cliente-btn">
                                    <i className="fa-solid fa-headset"></i> At. Cliente
                                </button>
                                {/* Contenedor para el icono de campana y quizás un badge de notificación */}
                                <div className="notification-icon-container">
                                    <i className="fa-regular fa-bell notification-icon"></i>
                                    {/* <span className="notification-badge">3</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* WhatsApp Notification */}
                    {showWhatsAppNotification && (
                        <div className="whatsapp-notification-pop-up">
                            <div className="notification-app-info">
                                <i className="fab fa-whatsapp whatsapp-app-icon"></i>
                                <span className="whatsapp-app-name">WhatsApp</span>
                                <i className="fas fa-chevron-right whatsapp-chevron-icon"></i>
                                <span className="notification-time">Ahora</span>
                            </div>
                            <div className="notification-sender-and-message">
                                <div className="notification-sender-line">
                                    <img src="/logo.jpg" alt="Mi Gusto" className="notification-sender-icon" />
                                    <span className="notification-sender">Mi Gusto</span>
                                </div>
                                <p className="notification-message">Ya pediste lo de siempre? 🥟<br/>Te extrañamos 💕</p>
                            </div>
                        </div>
                    )}

                    {/* Menú desplegable (condicional) */}
                    {isMenuOpen && (
                        <div className={`menu-overlay ${isMenuOpen ? 'visible' : ''}`} onClick={handleOverlayClick}>
                            <div className="menu-sidebar">
                                {/* Sección del perfil */}
                                <div className="profile-section">
                                    <img src="/logo.jpg" alt="Profile" className="profile-avatar" /> {/* Usando logo.jpg */}
                                    <span>Mi Gusto</span>
                                </div>

                                {/* Lista de opciones del menú */}
                                <ul className="menu-options-list">
                                    <li className={`menu-item ${activeCategory === 'Inicio' ? 'active' : ''}`} onClick={() => handleCategoryClick('Inicio')}>
                                         <i className="fa-solid fa-house"></i>
                                         <span>Inicio</span>
                                    </li>
                                    <li className="menu-item" onClick={() => handleCategoryClick('Hacer pedido')}>
                                         <i className="fa-solid fa-cart-plus"></i> {/* Icono placeholder */}
                                         <span>Hacer pedido</span>
                                    </li>
                                    <li className="menu-item" onClick={() => handleCategoryClick('Mis Pedidos')}>
                                         <i className="fa-solid fa-receipt"></i> {/* Icono placeholder */}
                                         <span>Mis Pedidos</span>
                                    </li>
                                     <li className="menu-item" onClick={() => handleCategoryClick('Mis direcciones')}>
                                         <i className="fa-solid fa-location-dot"></i> {/* Icono placeholder */}
                                         <span>Mis direcciones</span>
                                    </li>
                                    <li className="menu-item" onClick={() => handleCategoryClick('Cupones')}>
                                         <i className="fa-solid fa-ticket-alt"></i> {/* Icono placeholder */}
                                         <span>Cupones</span>
                                    </li>
                                    <li className="menu-item" onClick={() => handleCategoryClick('Mis cupones')}>
                                         <i className="fa-solid fa-ticket-alt"></i> {/* Icono placeholder */}
                                         <span>Mis cupones</span>
                                    </li>
                                    <li className="menu-item" onClick={() => handleCategoryClick('Promociones')}>
                                         <i className="fa-solid fa-tags"></i> {/* Icono placeholder */}
                                         <span>Promociones</span>
                                    </li>
                                    <li className="menu-item" onClick={() => handleCategoryClick('Locales')}>
                                         <i className="fa-solid fa-store"></i> {/* Icono placeholder */}
                                         <span>Locales</span>
                                    </li>
                                     <li className="menu-item" onClick={() => handleCategoryClick('Institucional')}>
                                         <i className="fa-solid fa-building"></i> {/* Icono placeholder */}
                                         <span>Institucional</span>
                                    </li>
                                    <li className={`menu-item ${activeCategory === 'Perfil' ? 'active' : ''}`} onClick={() => handleCategoryClick('Perfil')}>
                                         <i className="fa-solid fa-user"></i> {/* Icono placeholder */}
                                         <span>Perfil</span>
                                    </li>
                                    <li className="menu-item" onClick={() => handleCategoryClick('Sobre la app')}>
                                         <i className="fa-solid fa-info-circle"></i> {/* Icono placeholder */}
                                         <span>Sobre la app</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Contenedor para el contenido principal scrollable */}
                    <div className="iphone-content-scrollable">
                        {/* Slider de imágenes */}
                        <div className="iphone-slider">
                            {sliderImages.map((image, index) => (
                                <div 
                                    key={index} 
                                    className={`iphone-slide ${index === currentSlide ? 'active' : ''}`}
                                    style={{ backgroundImage: `url(${image})` }}
                                >
                                    {/* Puedes añadir contenido sobre la imagen si es necesario */}
                                </div>
                            ))}
                        </div>

                        {/* Indicadores del slider */}
                        <div className="slider-indicators">
                            {sliderImages.map((_, index) => (
                                <span 
                                    key={index} 
                                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                ></span>
                            ))}
                        </div>
                    </div>

                    <ul className="footer">
                        <li 
                            className={`item ${activeCategory === 'Inicio' ? 'active' : ''}`}
                            onClick={() => handleCategoryClick('Inicio')}
                        >
                            <i className="fa-solid fa-house"></i>
                            <span>Inicio</span>
                        </li>
                        <li 
                            className={`item ${activeCategory === 'Pedir' ? 'active' : ''}`}
                            onClick={() => handleCategoryClick('Pedir')}
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>Pedir</span>
                        </li>
                        <li 
                            className={`item ${activeCategory === 'Mis cupones' ? 'active' : ''}`}
                            onClick={() => handleCategoryClick('Mis cupones')}
                        >
                            <i className="fa-solid fa-ticket"></i>
                            <span>Mis cupones</span>
                        </li>
                        <li 
                            className={`item ${activeCategory === 'Promociones' ? 'active' : ''}`}
                            onClick={() => handleCategoryClick('Promociones')}
                        >
                            <i className="fa-solid fa-percent"></i>
                            <span>Promociones</span>
                        </li>
                    </ul>
                </div>
                <span className="iPhone-bottom"></span>
            </div>
        </main>
    );
};

export default IphoneStore;