import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoStyle, setLogoStyle] = useState({});
  const [smoothedPosition, setSmoothedPosition] = useState({ x: 0, y: 0 });

  const smoothStep = (value: number) => {
    return value * value * (3 - 2 * value);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isHovered) {
      const { clientX, clientY } = e;
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const moveX = (x - 0.5) * 2;
      const moveY = (y - 0.5) * 2;

      const smoothedX = smoothStep(Math.abs(moveX)) * Math.sign(moveX);
      const smoothedY = smoothStep(Math.abs(moveY)) * Math.sign(moveY);

      setLogoStyle({
        transform: `
          perspective(1000px)
          rotateX(${smoothedY * -2.5}deg)
          rotateY(${smoothedX * 2.5}deg)
          translateZ(30px)
          scale(1.2)
        `,
        filter: `brightness(1.1) drop-shadow(${smoothedX * 3}px ${smoothedY * 3}px 8px rgba(0,0,0,0.1))`,
        transition: 'all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
    setLogoStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)',
      filter: 'brightness(1) drop-shadow(0 0 0 rgba(0,0,0,0))',
      transition: 'all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm" 
    style={{ backgroundColor: '#ED813C' }}>
      <div className="container-fluid">
        <a 
          className="navbar-brand d-flex align-items-center" 
          href="https://www.migusto.com.ar" 
          rel="noopener noreferrer"
          onMouseEnter={() => {
            setIsHovered(true);
            setLogoStyle({
              transform: 'perspective(1000px) rotateX(0) rotateY(0) translateZ(30px) scale(1.2)',
              filter: 'brightness(1.1) drop-shadow(0 0 8px rgba(0,0,0,0.1))',
              transition: 'all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            });
          }}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{
            ...logoStyle,
            transformStyle: 'preserve-3d',
            willChange: 'transform, filter',
            cursor: 'pointer'
=======
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`}
      style={{
        backgroundColor: isHomePage && !isScrolled ? 'transparent' : 'rgba(0, 0, 0, 0.95)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: isHovered ? 1 : 0.9,
>>>>>>> 72ca5f083ac30ebeb3c338e72955461505d101a2
          }}
        >
          <img
            src="https://www.migusto.com.ar/assets/images/logoMGBlanco.png"
            alt="Mi Gusto"
            height="40"
            className="me-2"
            style={{
              transition: 'all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: 'translateZ(30px)',
              willChange: 'transform'
            }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
<<<<<<< HEAD
              <Link className="nav-link text-white" to="/">
=======
              <Link
                className={`nav-link text-white${location.pathname === '/' ? ' nav-link-active' : ''}`}
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/carta' ? ' nav-link-active' : ''}`}
                to="/carta"
                onClick={() => setIsMenuOpen(false)}
              >
>>>>>>> 72ca5f083ac30ebeb3c338e72955461505d101a2
                Carta
              </Link>
            </li>
            <li className="nav-item">
<<<<<<< HEAD
              <Link className="nav-link text-white" to="/productos">
=======
              <Link
                className={`nav-link text-white${location.pathname === '/productos' ? ' nav-link-active' : ''}`}
                to="/productos"
                onClick={() => setIsMenuOpen(false)}
              >
>>>>>>> 72ca5f083ac30ebeb3c338e72955461505d101a2
                Productos
              </Link>
            </li>
            <li className="nav-item">
<<<<<<< HEAD
              <Link className="nav-link text-white" to="/sucursales">
=======
              <Link
                className={`nav-link text-white${location.pathname === '/sucursales' ? ' nav-link-active' : ''}`}
                to="/sucursales"
                onClick={() => setIsMenuOpen(false)}
              >
>>>>>>> 72ca5f083ac30ebeb3c338e72955461505d101a2
                Sucursales
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white${location.pathname === '/nosotros' ? ' nav-link-active' : ''}`}
                to="/nosotros"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white nav-link-venta-corporativa"
                to="/venta-corporativa"
                onClick={() => setIsMenuOpen(false)}
              >
                Venta Corporativa
              </Link>
            </li>
            <li className="nav-item">
              <a
<<<<<<< HEAD
                className="nav-link text-white"
=======
                className="nav-link text-white nav-link-pedir"
>>>>>>> 72ca5f083ac30ebeb3c338e72955461505d101a2
                href="https://pedir.migusto.com.ar/"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
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

export default NavBar;
