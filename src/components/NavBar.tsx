import React, { useState, useEffect } from 'react';
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Carta
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/sucursales">
                Sucursales
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href="https://pedir.migusto.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
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
