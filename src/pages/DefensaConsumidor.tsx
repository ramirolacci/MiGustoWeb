import React, { useEffect } from 'react';
import './Nosotros.css';

// Estilos base
const cardStyle: React.CSSProperties = {
  background: 'rgba(30, 30, 30, 0.85)',
  borderRadius: '18px',
  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
  padding: '2.2rem 2rem 1.5rem 2rem',
  marginBottom: '2.5rem',
  borderLeft: '1.5px solid #FFD70022',
  borderRight: '1.5px solid #FFD70022',
  borderBottom: '1.5px solid #FFD70022',
  borderTop: 'none !important',
  maxWidth: 520,
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
            <h3 className="defensa-subtitle" style={subtitleStyle}>Organismos disponibles</h3>
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
