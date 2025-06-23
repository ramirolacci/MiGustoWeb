import React, { useRef, useState } from 'react';
import './ProductCard3D.css';

interface ProductViewProps {
  image: string;
  alt: string;
  width?: number;
  height?: number;
}

const ProductView: React.FC<ProductViewProps> = ({ image, alt, width = 305.8, height = 275 }) => {
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
      style={{
        width,
        height,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
      }}
    >
      <div className="card-image"
        style={{
          height,
          transform: `translateZ(60px) translateX(${position.x * 0.05}px) translateY(${position.y * 0.05}px)`
        }}
      >
        <img src={image} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} />
      </div>
    </div>
  );
};

export default ProductView; 