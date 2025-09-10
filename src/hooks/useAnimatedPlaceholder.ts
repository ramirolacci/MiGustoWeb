import { useState, useEffect } from 'react';

const placeholderTexts = [
  "Buscar productos, sucursales, etc...",
  "Buscar empanadas, pizzas...",
  "Buscar sucursales cerca...",
  "Buscar promos y ofertas...",
  "Buscar bebidas, postres...",
  "Buscar en Pilar, Palermo..."
];

export const useAnimatedPlaceholder = (interval: number = 3000): string => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      // Cambiar el texto después de un breve delay para la transición
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        setIsTransitioning(false);
      }, 250);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return placeholderTexts[currentIndex];
};
