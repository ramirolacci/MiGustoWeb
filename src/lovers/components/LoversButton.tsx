import './LoversButton.css';
import React, { useEffect, useState, useRef } from 'react';
import Confetti from 'react-confetti';

interface LoversButtonProps {
  isOn: boolean;
  onClick: () => void;
  autoConfetti?: boolean;
}

const LoversButton: React.FC<LoversButtonProps> = ({ isOn, onClick, autoConfetti }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiFading, setConfettiFading] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [confettiBox, setConfettiBox] = useState<{left: number, top: number, width: number, height: number} | null>(null);

  useEffect(() => {
    if (autoConfetti && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setConfettiBox({
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      });
      setShowConfetti(true);
      setTimeout(() => setConfettiFading(true), 4800);
      setTimeout(() => {
        setShowConfetti(false);
        setConfettiFading(false);
      }, 5300);
    }
  }, [autoConfetti]);

  const handleClick = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setConfettiBox({
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      });
    }
    setShowConfetti(true);
    onClick();
    setTimeout(() => setConfettiFading(true), 4800);
    setTimeout(() => {
      setShowConfetti(false);
      setConfettiFading(false);
    }, 5300);
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
      {showConfetti && confettiBox && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 99999,
            transition: 'opacity 0.5s',
            opacity: confettiFading ? 0 : 1
          }}
        >
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            recycle={false}
            gravity={0.55}
            initialVelocityY={22}
            initialVelocityX={18}
            confettiSource={{
              x: confettiBox.left + confettiBox.width / 2,
              y: confettiBox.top + confettiBox.height / 2,
              w: 1,
              h: 1
            }}
          />
        </div>
      )}
    </>
  );
};

export default LoversButton; 