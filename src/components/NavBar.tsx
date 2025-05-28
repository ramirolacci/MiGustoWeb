import React from 'react';
import { Link } from 'react-router-dom';

const navLinkStyle = {        // estilos custom para botones nav
  background: 'rgba(255,255,255,0.18)',
  color: '#fff',
  borderRadius: '8px',
  padding: '0.5rem 1.5rem',
  margin: '0 0.4rem',
  fontWeight: 500,
  fontSize: '1.07rem',
  letterSpacing: '0.02em',
  border: 'none',
  transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
  boxShadow: '0 1px 6px 0 rgba(0,0,0,0.07)',
};

const navLinkHoverStyle = {
  background: 'rgba(255,255,255,0.34)',
  color: '#222',
  boxShadow: '0 4px 18px 0 rgba(0,0,0,0.13)',
  textDecoration: 'none',
};

function useHover() {
  const [isHovered, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return [isHovered, { onMouseEnter, onMouseLeave }] as [boolean, React.HTMLAttributes<HTMLElement>];
}

const Navbar: React.FC = () => {
  const [hoverCarta, hoverEventsCartaObj] = useHover();
  const [hoverSucursales, hoverEventsSucursalesObj] = useHover();
  const [hoverPedir, hoverEventsPedirObj] = useHover();
  const [hoverLogo, hoverEventsLogoObj] = useHover();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm"
      style={{ backgroundColor: '#ED813C' }} // color externo a bootstrap
    >
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex align-items-center"
          href="https://www.migusto.com.ar"
          rel="noopener noreferrer"
          {...hoverEventsLogoObj}
          style={{
            transition: 'transform 0.6s ease',
            transform: hoverLogo ? 'scale(1.2) rotate(720deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <img
            src="https://www.migusto.com.ar/assets/images/logoMGBlanco.png"
            alt="Mi Gusto"
            height="40"
            className="me-2"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={hoverCarta ? { ...navLinkStyle, ...navLinkHoverStyle } : navLinkStyle}
                to="/"
                {...hoverEventsCartaObj}
              >
                Carta
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={hoverSucursales ? { ...navLinkStyle, ...navLinkHoverStyle } : navLinkStyle}
                to="/sucursales"
                {...hoverEventsSucursalesObj}
              >
                Sucursales
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={hoverPedir ? { ...navLinkStyle, ...navLinkHoverStyle } : navLinkStyle}
                href="https://pedir.migusto.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                {...hoverEventsPedirObj}
              >
                Pedir
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
