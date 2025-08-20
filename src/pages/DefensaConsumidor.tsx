import React, { useEffect } from 'react';
import './Nosotros.css';

// Estilos base (match estilo glass/blur de Legales)
const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '20px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '2.5rem',
  maxWidth: 1700,
  marginLeft: 'auto',
  marginRight: 'auto',
};

// Estilo original del título principal de esta página
const titleStyle: React.CSSProperties = {
  fontSize: '2.9rem',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: '0.7rem',
  letterSpacing: '0.03em',
  textShadow: '0 2px 12px #000a',
  lineHeight: 1.1,
  textTransform: 'uppercase',
  backgroundImage: 'linear-gradient(45deg, #ffffff, #D4AF37)',
  backgroundSize: '200% 200%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'gradientAnimation 3s ease infinite',
};

// Divisor personalizado bajo el título principal
const dividerStyle: React.CSSProperties = {
  width: 80,
  height: 5,
  background: 'linear-gradient(90deg, #FFD700 0%, #fffbe6 100%)',
  borderRadius: 3,
  margin: '0 auto 2.1rem auto',
  display: 'block',
  boxShadow: '0 2px 8px #FFD70055',
};

// (El subtítulo usará el mismo estilo del título principal)

const organismoBlock: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  borderRadius: '12px',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
  padding: '1.4rem 1.6rem 1.4rem 1.6rem',
  marginBottom: '1.8rem',
  border: '1px solid #FFD70022',
};

const linkStyle: React.CSSProperties = {
  color: '#FFD700',
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'color 0.2s',
};

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
  marginBottom: '1.8rem',
};

// Estilos locales y responsivos
const responsiveCSS = `
/* Ensanchar solo en esta página (desktop) y evitar saltos de línea en títulos de las cards (desktop) */
.defensa-content { max-width: 1800px !important; }
.defensa-card { max-width: 1700px !important; }
.organismo-block h2 { white-space: nowrap; }
/* Anular la línea ::after de Legales solo en el título principal de esta página */
.defensa-title::after { content: none !important; display: none !important; width: 0 !important; height: 0 !important; }

/* Ajustes móviles generales */
@media (max-width: 768px) {
  .defensa-content { padding: 0.5rem 0.75rem !important; max-width: 100vw !important; }
  .defensa-card { max-width: 100% !important; padding: 1.1rem 0.85rem !important; }
  .defensa-title { font-size: 2rem !important; margin-bottom: 0.5rem !important; letter-spacing: 0.02em !important; }
  .defensa-divider { margin: 0.3rem auto 1rem auto !important; width: 64px !important; height: 4px !important; }
  .defensa-row { grid-template-columns: 1fr !important; gap: 0.9rem !important; margin-bottom: 1rem !important; }
  .organismo-block { padding: 0.9rem 0.7rem !important; margin-bottom: 0.9rem !important; }
  .organismo-block h2 { white-space: normal !important; word-break: break-word !important; overflow-wrap: anywhere !important; font-size: 1.25rem !important; line-height: 1.2 !important; }
  .defensa-card p, .organismo-block p { font-size: 1rem !important; line-height: 1.6 !important; }
  .defensa-card a { word-break: break-word !important; overflow-wrap: anywhere !important; }
}

/* Ajustes finos para pantallas pequeñas */
@media (max-width: 600px) {
  .defensa-card {
    padding: 1rem 0.7rem 0.9rem 0.7rem !important;
    max-width: 96vw !important;
    margin-bottom: 1rem !important;
    margin-left: auto !important;
    margin-right: auto !important;
    left: 0; right: 0;
    display: block;
  }
  .defensa-title { font-size: 1.85rem !important; }
  .defensa-subtitle { font-size: 1.05rem !important; margin-bottom: 0.9rem !important; }
  .organismo-block { padding: 0.8rem 0.6rem !important; }
  .organismo-block h2 { font-size: 1.15rem !important; }
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
      <div className="nosotros-content defensa-content">
        <div className="section-card defensa-card" style={cardStyle}>
          <h2 className="defensa-title" style={titleStyle}>DEFENSA AL CONSUMIDOR</h2>
          <div className="defensa-divider" style={dividerStyle}></div>
          <div>
            <div className="defensa-row" style={rowStyle}>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h2>DERECHOS DEL TITULAR</h2>
                <p>Los titulares pueden solicitar acceso, rectificación, actualización o supresión de sus datos mediante contacto formal a: <a href="mailto:info@migusto.com.ar" style={{...linkStyle, textDecoration: 'underline'}} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>info@migusto.com.ar</a></p>
              </div>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h2>INFORMACIÓN SOBRE ALÉRGENOS</h2>
                <p>Nuestros productos pueden contener gluten, lactosa, huevo, soja, frutos secos, entre otros. El consumidor declara conocer esto y exime de responsabilidad a Mi Gusto Empanadas si no informa previamente restricciones alimentarias.</p>
              </div>
            </div>
            <div className="defensa-row" style={rowStyle}>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h2>PEDIDOS A TRAVÉS DE PLATAFORMAS EXTERNAS</h2>
                <p>Los reclamos por pedidos realizados en apps externas deberán gestionarse prioritariamente con dichas plataformas. Mi Gusto Empanadas podrá intervenir en casos vinculados a la calidad si se verifica responsabilidad directa.</p>
              </div>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h2>POLÍTICA DE COOKIES</h2>
                <p>
                  Nuestro sitio utiliza cookies propias y de terceros para mejorar la experiencia y análisis estadísticos.
                  Podés aceptar todas o rechazar las no esenciales.
                  {' '}<a
                    href="#cookies"
                    onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-cookie-consent')); }}
                    style={{...linkStyle, textDecoration: 'underline'}}
                    onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}
                  >Administrar cookies</a> o ver más detalle en {' '}
                  <a
                    href="/legales"
                    style={{...linkStyle, textDecoration: 'underline'}}
                    onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}
                  >Legales</a>.
                </p>
              </div>
            </div>
            <div className="organismo-block organismo-block" style={organismoBlock}>
              <h2>CONTACTO LEGAL Y DEFENSA DEL CONSUMIDOR</h2>
              <p>Contacto</p>
              <p>Para consultas o reclamos legales, puede comunicarse al correo: <a href="mailto:info@migusto.com.ar" style={{...linkStyle, textDecoration: 'underline'}} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>info@migusto.com.ar</a></p>
            </div>
            <h2 className="defensa-title" style={titleStyle}>Organismos disponibles</h2>
            <div className="defensa-divider" style={dividerStyle}></div>
            <div className="defensa-row" style={rowStyle}>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h2>Nacional</h2>
                <p>Dirección Nacional de Defensa del Consumidor</p>
                <p>
                  <a href="https://www.argentina.gob.ar/defensadelconsumidor" target="_blank" rel="noopener noreferrer" style={{...linkStyle, textDecoration: 'underline'}} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>
                    www.argentina.gob.ar/defensadelconsumidor
                  </a>
                </p>
                <p><span style={{ color: '#fff' }}>Tel: </span><span style={{ color: '#FFD700', fontWeight: 700 }}>0800-666-1518</span></p>
              </div>
              <div className="organismo-block organismo-block" style={organismoBlock}>
                <h2>Ciudad Autónoma de Buenos Aires</h2>
                <p>Dirección General de Defensa y Protección al Consumidor</p>
                <p>
                  <a href="https://www.buenosaires.gob.ar/defensaconsumidor" target="_blank" rel="noopener noreferrer" style={{...linkStyle, textDecoration: 'underline'}} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>
                    www.buenosaires.gob.ar/defensaconsumidor
                  </a>
                </p>
                <p><span style={{ color: '#fff' }}>Tel: </span><span style={{ color: '#FFD700', fontWeight: 700 }}>147</span></p>
              </div>
            </div>
            <div className="organismo-block organismo-block" style={organismoBlock}>
              <h2>Provincia de Buenos Aires</h2>
              <p>Dirección Provincial de Defensa del Consumidor</p>
              <p>
                <a href="https://www.gba.gob.ar/defensadelconsumidor" target="_blank" rel="noopener noreferrer" style={{...linkStyle, textDecoration: 'underline'}} onMouseOver={e => (e.currentTarget.style.color = '#fff')} onMouseOut={e => (e.currentTarget.style.color = '#FFD700')}>
                  www.gba.gob.ar/defensadelconsumidor
                </a>
              </p>
              <p><span style={{ color: '#fff' }}>Tel: </span><span style={{ color: '#FFD700', fontWeight: 700 }}>0800-222-9042</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefensaConsumidor;
