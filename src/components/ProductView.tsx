import React, { useRef, useState } from 'react';
import './ProductCard3D.css';

interface ProductViewProps {
  image: string;
  alt: string;
  width?: number;
  height?: number;
  noHover?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

const ProductView: React.FC<ProductViewProps> = ({ image, alt, width = 305.8, height = 275, noHover, onClick, style }) => {
  // Elimino el estado y handlers de rotación
  // const cardRef = useRef<HTMLDivElement>(null);
  // const [rotation, setRotation] = useState({ x: 0, y: 0 });
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => { ... }
  // const handleMouseLeave = () => { ... }

  return (
    <div
      // ref={cardRef}
      className="product-card-3d"
      // onMouseMove={noHover ? undefined : handleMouseMove}
      // onMouseLeave={noHover ? undefined : handleMouseLeave}
      onClick={onClick}
      style={{
        width,
        height,
        ...style
      }}
    >
      <div className="card-image"
        style={{
          height
        }}
        onClick={onClick}
      >
        <img src={image} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} loading="lazy" onClick={onClick} />
      </div>
    </div>
  );
};

export default ProductView; 