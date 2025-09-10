import React, { useState, useEffect } from 'react';
import './OptimizedImage.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  sizes?: string;
  srcSet?: string;
  style?: React.CSSProperties;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9"><rect width="16" height="9" fill="%23111111"/><rect x="0" y="0" width="16" height="9" fill="url(%23g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%231a1a1a"/><stop offset="1" stop-color="%230a0a0a"/></linearGradient></defs></svg>',
  sizes,
  srcSet,
  style
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const encodedSrc = encodeURI(src);
  const encodedSrcSet = srcSet
    ? srcSet
        .split(',')
        .map((entry) => {
          const parts = entry.trim().split(/\s+/);
          if (parts.length === 0) return '';
          const url = parts[0];
          const desc = parts.slice(1).join(' ');
          return `${encodeURI(url)}${desc ? ' ' + desc : ''}`;
        })
        .filter(Boolean)
        .join(', ')
    : undefined;

  useEffect(() => {
    const img = new Image();
    img.src = encodedSrc;
    img.onload = () => {
      setCurrentSrc(encodedSrc);
      setIsLoaded(true);
    };
  }, [encodedSrc]);

  return (
    <div 
      className={`optimized-image-container ${isLoaded ? 'loaded' : ''} ${className}`}
      style={{ width, height, ...style }}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
        loading="lazy"
        width={width}
        height={height}
        sizes={sizes}
        srcSet={encodedSrcSet}
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
};

export default OptimizedImage; 