import React, { useRef, useLayoutEffect, useState } from 'react';
import './Switch.css';

interface SwitchProps {
  isOn: boolean;
  onClick: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, onClick }) => {
  const trackRef = useRef<HTMLButtonElement>(null);
  const thumbWidth = 28; // según el CSS
  const rightPadding = 16; // padding derecho según el CSS
  const [trackWidth, setTrackWidth] = useState(100); // valor por defecto para mobile

  useLayoutEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

  const thumbTranslate = trackWidth - thumbWidth - rightPadding;

  return (
    <button
      ref={trackRef}
      className={`switch-modern${isOn ? ' switch-on' : ''}`}
      onClick={onClick}
      type="button"
      style={{ position: 'relative', width: trackWidth, minWidth: trackWidth, height: 36, display: 'flex', alignItems: 'center', marginLeft: 12 }}
    >
      <span
        className="switch-modern-thumb"
        style={{
          transform: isOn ? `translateX(${thumbTranslate}px)` : `translateX(0)`,
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.2s',
        }}
      />
      <span className="switch-modern-text" style={{ position: 'absolute', right: 16 }}>
        Lovers
      </span>
    </button>
  );
};

export default Switch;