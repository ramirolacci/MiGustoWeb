import './LoversButton.css';
import React, { useState, useRef, useEffect } from 'react';
// import Confetti from 'react-confetti';

interface LoversButtonProps {
  isOn: boolean;
  onClick: () => void;
  autoConfetti?: boolean;
}

const LoversButton: React.FC<LoversButtonProps> = ({ isOn, onClick, autoConfetti }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiFading, setConfettiFading] = useState(false);
  const [confettiBox, setConfettiBox] = useState<{left: number, top: number, width: number, height: number} | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Desactivado el confeti automático al entrar
  }, [autoConfetti]);

  const handleClick = () => {
    // Confeti desactivado al hacer click
    onClick();
  };

  return (
    <>
      <button
        ref={btnRef}
        className={`switch-lovers-btn${isOn ? ' on' : ''}`}
        onClick={handleClick}
        type="button"
      >
        Lovers
      </button>
      {/* Confeti removido */}
    </>
  );
};

export default LoversButton; 