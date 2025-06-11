import React from 'react';
import './Nosotros.css';

const Nosotros: React.FC = () => {
    return (
        <div className="nosotros-container">
            <div className="background-overlay"></div>
            <div className="nosotros-content">
                <div className="nosotros-header">
                    <h1>NOSOTROS</h1>
                </div>
                
                <div className="nosotros-grid">
                    <div className="nosotros-main-content">
                        <div className="section-card">
                            <h2>QUIENES SOMOS?</h2>
                            <p>
                                Somos una empresa familiar que nació en el año 2000 con la misión de 
                                ofrecer las mejores empanadas gourmet del mercado. A lo largo de los años, 
                                hemos crecido y evolucionado, manteniendo siempre nuestro compromiso con 
                                la calidad y la innovación.
                            </p>
                            <ul className="pilares-list">
                                <li>Calidad</li>
                                <li>Servicio</li>
                                <li>Limpieza</li>
                            </ul>
                        </div>
                    </div>

                    <div className="nosotros-video-container">
                        <div className="iphone-frame">
                            <div className="iphone-notch"></div>
                            <div className="iphone-button left"></div>
                            <div className="iphone-button right"></div>
                            <div className="tiktok-interface">
                                <video
                                    autoPlay
                                    loop
                                    playsInline
                                    muted={false}
                                    controls={false}
                                    style={{ 
                                        width: '100%', 
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                >
                                    <source src="/MiGusto_Pabloyjesica.mp4" type="video/mp4" />
                                </video>
                                <div className="tiktok-overlay">
                                    <div className="tiktok-user-info">
                                        <img 
                                            src="/logo.jpg" 
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
                        <div className="franquicias-stats">
                            <div className="stat-item">
                                <span className="stat-number">37</span>
                                <span className="stat-label">Franquicias</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-card">
                    <h2>VALORES</h2>
                    <div className="valores-grid">
                        <div className="valor-item">
                            <h4>Calidad</h4>
                            <p>
                                Nos comprometemos a ofrecer productos de la más alta calidad, 
                                utilizando ingredientes frescos y procesos rigurosos.
                            </p>
                        </div>
                        <div className="valor-item">
                            <h4>Innovación</h4>
                            <p>
                                Buscamos constantemente nuevas formas de sorprender a nuestros 
                                clientes con sabores y experiencias únicas.
                            </p>
                        </div>
                        <div className="valor-item">
                            <h4>Compromiso</h4>
                            <p>
                                Trabajamos con dedicación y pasión para superar las expectativas 
                                de nuestros clientes en cada visita.
                            </p>
                        </div>
                        <div className="valor-item">
                            <h4>Sostenibilidad</h4>
                            <p>
                                Nos preocupamos por el medio ambiente y buscamos prácticas 
                                sostenibles en todos nuestros procesos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nosotros; 