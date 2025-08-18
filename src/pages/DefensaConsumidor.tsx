import React, { useEffect } from 'react';
import './Nosotros.css';

// Estilos base (match estilo glass/blur de Legales)
const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '20px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '2.5rem',
  maxWidth: 980,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2.9rem',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: '0.7rem',
  color: '#FFD700',
  letterSpacing: '0.03em',
  textShadow: '0 2px 12px #000a',
  lineHeight: 1.1,
  textTransform: 'uppercase',
};

// Línea decorativa centrada bajo el título (nuestra propia línea)
const dividerStyle: React.CSSProperties = {
  width: 80,
  height: 5,
  background: 'linear-gradient(90deg, #FFD700 0%, #fffbe6 100%)',
  borderRadius: 3,
  margin: '0 auto 2.1rem auto',
  display: 'block',
  boxShadow: '0 2px 8px #FFD70055',
};

const subtitleStyle: React.CSSProperties = {
  color: '#FFD700',
  marginBottom: '2.2rem',
  textAlign: 'center',
  fontSize: '1.25rem',
  fontWeight: 600,
  letterSpacing: '0.01em',
};

const organismoTitle: React.CSSProperties = {
  color: '#FFD700',
  marginBottom: '0.7rem',
  fontSize: '1.13rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.01em',
};

const organismoBlock: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  borderRadius: '12px',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
  padding: '1.1rem 1.2rem 1.1rem 1.2rem',
  marginBottom: '1.5rem',
  border: '1px solid #FFD70022',
};

const linkStyle: React.CSSProperties = {
  color: '#FFD700',
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'color 0.2s',
};

const phoneStyle: React.CSSProperties = {
  fontWeight: 700,
  color: '#FFD700',
  marginTop: 4,
};

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
  marginBottom: '1.5rem',
};

// Estilos locales y responsivos
const responsiveCSS = `
/* Eliminar cualquier línea automática agregada por h2.defensa-title::after */
h2.defensa-title::after { content: none !important; display: none !important; width: 0 !important; height: 0 !important; }

@media (max-width: 600px) {
  .defensa-card {
    padding: 1.2rem 0.7rem 1rem 0.7rem !important;
    max-width: 96vw !important;
    margin-bottom: 1.2rem !important;
    margin-left: auto !important;
    margin-right: auto !important;
    left: 0; right: 0;
    display: block;
  }
  .defensa-title {
    font-size: 1.7rem !important;
    margin-bottom: 0.5rem !important;
  }
  .defensa-divider {
    width: 56px !important;
    height: 3px !important;
    margin: 0 auto 1.1rem auto !important;
    display: block !important;
  }
  .defensa-subtitle {
    font-size: 1.02rem !important;
    margin-bottom: 1.1rem !important;
  }
  .organismo-block {
    padding: 0.7rem 0.5rem 0.7rem 0.5rem !important;
    font-size: 0.98rem !important;
    margin-bottom: 0.9rem !important;
  }
  .defensa-row {
    grid-template-columns: 1fr !important;
  }
}
`;

const DefensaConsumidor: React.FC = () => {
  useEffect(() => {
    import('scrollreveal').then((module) => {
      const sr = module.default ? module.default : module;
      sr().reveal('.defensa-title', {
        distance: '20px',
        duration: 1200,
        origin: 'bottom',
        opacity: 0,
        reset: false,
        easing: 'ease',
        delay: 100
      });
      sr().reveal('.defensa-divider', {
        distance: '0px',
        duration: 900,
        opacity: 0,
        reset: false,
        easing: 'ease',
        delay: 250
      });
      sr().reveal('.defensa-subtitle', {
        distance: '10px',
        duration: 1000,
        origin: 'bottom',
        opacity: 0,
        reset: false,
        easing: 'ease',
        delay: 350
      });
      sr().reveal('.organismo-block', {
        distance: '20px',
        duration: 1000,
        origin: 'bottom',
        opacity: 0,
        reset: false,
        easing: 'ease',
        interval: 200,
        delay: 400
      });
    });
  }, []);

  return (
    <div className="nosotros-container">
      <style>{responsiveCSS}</style>
      <div className="background-overlay"></div>
      <div className="nosotros-content">
        <div className="section-card defensa-card" style={cardStyle}>
          <h2 className="defensa-title" style={titleStyle}>DEFENSA AL CONSUMIDOR</h2>
          <div className="defensa-divider" style={dividerStyle}></div>
          <div style={{color: 'rgba(255,255,255,0.92)', fontSize: '1.08rem'}}>
            <div className="defensa-row" style={rowStyle}>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h4 style={organismoTitle}>DERECHOS DEL TITULAR</h4>
                <p style={{marginBottom: '4px'}}>Los titulares pueden solicitar acceso, rectificación, actualización o supresión de sus datos mediante contacto formal a: <a href="mailto:info@migusto.com.ar" style={linkStyle} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>info@migusto.com.ar</a></p>
              </div>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h4 style={organismoTitle}>INFORMACIÓN SOBRE ALÉRGENOS</h4>
                <p style={{marginBottom: '4px'}}>Nuestros productos pueden contener gluten, lactosa, huevo, soja, frutos secos, entre otros. El consumidor declara conocer esto y exime de responsabilidad a Mi Gusto Empanadas si no informa previamente restricciones alimentarias.</p>
              </div>
            </div>
            <div className="defensa-row" style={rowStyle}>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h4 style={organismoTitle}>PEDIDOS A TRAVÉS DE PLATAFORMAS EXTERNAS</h4>
                <p style={{marginBottom: '4px'}}>Los reclamos por pedidos realizados en apps externas deberán gestionarse prioritariamente con dichas plataformas. Mi Gusto Empanadas podrá intervenir en casos vinculados a la calidad si se verifica responsabilidad directa.</p>
              </div>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h4 style={organismoTitle}>POLÍTICA DE COOKIES</h4>
                <p style={{marginBottom: '4px'}}>Nuestro sitio utiliza cookies propias y de terceros para mejorar la experiencia y análisis estadísticos. El usuario puede aceptar, rechazar o configurar su uso.</p>
              </div>
            </div>
            <div className="organismo-block organismo-block" style={organismoBlock}>
              <h4 style={organismoTitle}>CONTACTO LEGAL Y DEFENSA DEL CONSUMIDOR</h4>
              <p style={{marginBottom: '4px'}}>Contacto</p>
              <p style={{marginBottom: '4px'}}>Para consultas o reclamos legales, puede comunicarse al correo: <a href="mailto:info@migusto.com.ar" style={linkStyle} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>info@migusto.com.ar</a></p>
            </div>
            <h3 className="defensa-subtitle" style={subtitleStyle}>Organismos disponibles</h3>
            <div className="defensa-row" style={rowStyle}>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h4 style={organismoTitle}>Nacional</h4>
                <p style={{marginBottom: '4px'}}>Dirección Nacional de Defensa del Consumidor</p>
                <p style={{marginBottom: '4px'}}>
                  <a href="https://www.argentina.gob.ar/defensadelconsumidor" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>
                    www.argentina.gob.ar/defensadelconsumidor
                  </a>
                </p>
                <p style={phoneStyle}>Tel: 0800-666-1518</p>
              </div>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h4 style={organismoTitle}>Ciudad Autónoma de Buenos Aires</h4>
                <p style={{marginBottom: '4px'}}>Dirección General de Defensa y Protección al Consumidor</p>
                <p style={{marginBottom: '4px'}}>
                  <a href="https://www.buenosaires.gob.ar/defensaconsumidor" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>
                    www.buenosaires.gob.ar/defensaconsumidor
                  </a>
                </p>
                <p style={phoneStyle}>Tel: 147</p>
              </div>
            </div>
            <div className="organismo-block organismo-block" style={organismoBlock}>
              <h4 style={organismoTitle}>Provincia de Buenos Aires</h4>
              <p style={{marginBottom: '4px'}}>Dirección Provincial de Defensa del Consumidor</p>
              <p style={{marginBottom: '4px'}}>
                <a href="https://www.gba.gob.ar/defensadelconsumidor" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>
                  www.gba.gob.ar/defensadelconsumidor
                </a>
              </p>
              <p style={phoneStyle}>Tel: 0800-222-9042</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefensaConsumidor;
