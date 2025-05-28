import React, { useRef } from 'react';
import './Iphone.css';

const IphoneStore: React.FC = () => {
    const iphoneRef = useRef<HTMLDivElement>(null);

    return (
        <main>
            <div id="iPhone" className="iphone-wrapper animate" ref={iphoneRef}>
                <span className="power-btn"></span>
                <div className="volumne-btn-container">
                    <span className="volume-btn"></span>
                    <span className="volume-btn"></span>
                </div>
                <div className="iPhone">
                    <div className="headers-container">
                        <div className="iphone-header">
                            <span className="time-text">12:32</span>
                            <div className="dynamic-island">
                                <span className="camera"></span>
                            </div>
                            <div className="icons">
                                <img className="icon" src="https://raw.githubusercontent.com/khatri2002/codepen/30b52de44864248b0617b059a7fc7c0ebbcc0eda/iphone-whatsapp/assets/images/icons/network-icon.svg" alt="network-icon" />
                                <img className="icon" src="https://raw.githubusercontent.com/khatri2002/codepen/30b52de44864248b0617b059a7fc7c0ebbcc0eda/iphone-whatsapp/assets/images/icons/wifi-icon.svg" alt="wifi-icon" />
                                <img className="icon" src="https://raw.githubusercontent.com/khatri2002/codepen/30b52de44864248b0617b059a7fc7c0ebbcc0eda/iphone-whatsapp/assets/images/icons/battery-icon.svg" alt="battery-icon" />
                            </div>
                        </div>
                        <div className="appstore-header" style={{ borderBottom: '1px solid #222', paddingBottom: 8 }}>
                            <span className="appstore-title" style={{ fontWeight: 600, fontSize: '1.05rem', letterSpacing: 0.5 }}>Mi Gusto</span>
                            <div className="right-action">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <i className="fa-solid fa-user"></i>
                            </div>
                        </div>
                    </div>
                    <div className="featured-section" style={{ padding: '2.2rem 1rem 1.2rem 1rem', textAlign: 'center' }}>
                        <img
                            src="/logo.jpg"
                            alt="Mi Gusto Logo"
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 16,
                                marginBottom: 16,
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                                objectFit: 'cover'
                            }}
                        />
                        <h2 style={{
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            margin: '0 0 0.5em 0',
                            letterSpacing: 0.2
                        }}>
                            Descargá Mi Gusto App
                        </h2>
                        <p style={{
                            color: '#bdbdbd',
                            fontSize: '1em',
                            margin: '0 0 1.2em 0',
                            fontWeight: 400
                        }}>
                            Pedí desde tu celular, encontrá tu sucursal más cercana y aprovechá los descuentos únicos en Mi Gusto App.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.tuapp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="store-btn"
                                style={{ display: 'inline-block' }}
                            >
                                <img src="/src/assets/play-store.png" alt="Google Play" style={{ height: 36, borderRadius: 8, background: '#fff', padding: 4 }} />
                            </a>
                            <a
                                href="https://apps.apple.com/app/idXXXXXXXXX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="store-btn"
                                style={{ display: 'inline-block' }}
                            >
                                <img src="/src/assets/app-store.png" alt="App Store" style={{ height: 36, borderRadius: 8, background: '#fff', padding: 4 }} />
                            </a>
                        </div>
                    </div>
                    <div className="categories-section" style={{ margin: '18px 0 0 0', textAlign: 'center' }}>
                        <ul className="categories-list" style={{ display: 'flex', gap: 12, padding: 0, listStyle: 'none', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <li className="category-item" style={{ background: '#232323', color: '#fff', padding: '6px 16px', borderRadius: 16, fontSize: '0.98em', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <i className="fa-solid fa-utensils"></i> Empanadas Premium
                            </li>
                            <li className="category-item" style={{ background: '#232323', color: '#fff', padding: '6px 16px', borderRadius: 16, fontSize: '0.98em', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <i className="fa-solid fa-utensils"></i> Empanadas Clásicas
                            </li>
                            <li className="category-item" style={{ background: '#232323', color: '#fff', padding: '6px 16px', borderRadius: 16, fontSize: '0.98em', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <i className="fa-solid fa-tags"></i> Promociones
                            </li>
                            <li className="category-item" style={{ background: '#232323', color: '#fff', padding: '6px 16px', borderRadius: 16, fontSize: '0.98em', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <i className="fa-solid fa-store"></i> Sucursales
                            </li>
                        </ul>
                    </div>
                    <ul className="footer">
                        <li className="item active current">
                            <i className="fa-solid fa-house"></i>
                            <span>Inicio</span>
                        </li>
                        <li className="item">
                            <i className="fa-solid fa-utensils"></i>
                            <span>Pedir</span>
                        </li>
                        <li className="item">
                            <i className="fa-solid fa-tags"></i>
                            <span>Promos</span>
                        </li>
                        <li className="item">
                            <i className="fa-solid fa-ticket"></i>
                            <span>Cupones</span>
                        </li>
                        <li className="item">
                            <i className="fa-solid fa-user"></i>
                            <span>Perfil</span>
                        </li>
                    </ul>
                </div>
                <span className="iPhone-bottom"></span>
            </div>
        </main>
    );
};

export default IphoneStore;