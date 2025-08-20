import React, { useEffect } from 'react';
import './Nosotros.css';

const Legales: React.FC = () => {
  useEffect(() => {
    import('scrollreveal').then((module) => {
      const sr = module.default ? module.default : module;
      // Cards
      sr().reveal('.section-card', {
        distance: '28px',
        duration: 900,
        origin: 'bottom',
        opacity: 0,
        reset: false,
        easing: 'ease',
        interval: 160,
        viewFactor: 0.15,
        mobile: true,
      });
      // Títulos dentro de cada card
      sr().reveal('.section-card h2', {
        distance: '16px',
        duration: 800,
        origin: 'bottom',
        opacity: 0,
        reset: false,
        easing: 'ease',
        delay: 120,
        viewFactor: 0.1,
        mobile: true,
      });
      // Contenido (p, ul, li) con efecto en cascada
      sr().reveal('.section-card p, .section-card ul, .section-card li', {
        distance: '10px',
        duration: 800,
        origin: 'bottom',
        opacity: 0,
        reset: false,
        easing: 'ease',
        interval: 90,
        delay: 180,
        viewFactor: 0.12,
        mobile: true,
      });
    });
  }, []);
  return (
    <div className="nosotros-container">
      <div className="background-overlay"></div>
      <div className="nosotros-content">
        <div className="section-card">
          <h2>TÉRMINOS Y CONDICIONES</h2>
          <p>
            Bienvenido a Mi Gusto. Al acceder y utilizar nuestro sitio web, aceptás cumplir con los siguientes términos y condiciones. Nos reservamos el derecho de modificar estos términos en cualquier momento, por lo que te recomendamos revisarlos periódicamente.
          </p>
          <ul style={{color: 'rgba(255,255,255,0.85)', marginLeft: 24, fontSize: '1.05rem'}}>
            <li>El contenido de este sitio es propiedad de Mi Gusto y está protegido por derechos de autor.</li>
            <li>Está prohibida la reproducción total o parcial sin autorización expresa.</li>
            <li>Nos reservamos el derecho de modificar productos, precios y promociones sin previo aviso.</li>
            <li>El uso indebido del sitio puede resultar en la suspensión del acceso.</li>
          </ul>
        </div>
        <div className="section-card">
          <h2>POLÍTICA DE PRIVACIDAD</h2>
          <p>
            En Mi Gusto valoramos tu privacidad. Toda la información personal que nos brindes será tratada de manera confidencial y utilizada únicamente para mejorar tu experiencia en nuestro sitio.
          </p>
          <ul style={{color: 'rgba(255,255,255,0.85)', marginLeft: 24, fontSize: '1.05rem'}}>
            <li>No compartimos tus datos con terceros sin tu consentimiento.</li>
            <li>Utilizamos cookies para optimizar la navegación y personalizar el contenido.</li>
            <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
            <li>Para más información, contactanos a info@migusto.com.ar</li>
          </ul>
        </div>
        <div className="section-card">
          <h2>CONTACTO LEGAL</h2>
          <p>
            Si tenés dudas o consultas sobre nuestros términos legales, escribinos a <a href="mailto:info@migusto.com.ar" style={{color:'#FFD700'}}>info@migusto.com.ar</a> y te responderemos a la brevedad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legales; 