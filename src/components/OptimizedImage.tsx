import React, { useState, useEffect } from 'react';
import './OptimizedImage.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = '/placeholder.png'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div 
      className={`optimized-image-container ${isLoaded ? 'loaded' : ''} ${className}`}
      style={{ width, height }}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
        loading="lazy"
        width={width}
        height={height}
      />
    </div>
  );
};

export default OptimizedImage; 