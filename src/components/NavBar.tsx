import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">MiGusto</a>
      <ul className="navbar-links">
        <li><a href="#">Productos</a></li>
        <li><a href="https://sites.google.com/view/migusto-cartadigital/sucursales?authuser=0">Sucursales</a></li>
      </ul>
    </nav>
  );
};

export default NavBar; 