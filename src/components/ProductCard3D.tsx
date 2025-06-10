import React, { useState, useRef, useEffect } from 'react';
import './ProductCard3D.css';

interface ProductCard3DProps {
  image: string;
  title: string;
  price: string;
  onClick?: () => void;
}

const ProductCard3D: React.FC<ProductCard3DProps> = ({ image, title, price, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = ((y / rect.height) * 100 - 50) * -0.2;
    const rotateY = ((x / rect.width) * 100 - 50) * 0.2;
    
    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="product-card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
      }}
    >
      <div className="card-content">
        <div className="card-image" 
          style={{
            transform: `translateZ(60px) translateX(${position.x * 0.05}px) translateY(${position.y * 0.05}px)`
          }}>
          <img src={image} alt={title} />
        </div>
        <div className="card-title"
          style={{
            transform: `translateZ(45px) translateX(${position.x * 0.04}px) translateY(${position.y * 0.04}px)`
          }}>
          <h3>{title}</h3>
        </div>
        <div className="card-price"
          style={{
            transform: `translateZ(40px) translateX(${position.x * 0.035}px) translateY(${position.y * 0.035}px)`
          }}>
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard3D; 