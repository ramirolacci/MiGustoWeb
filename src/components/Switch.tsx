import React from 'react';
import './Switch.css';

interface SwitchProps {
  isOn: boolean;
  onClick: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, onClick }) => {
  return (
    <button className={`switch${isOn ? ' switch-on' : ''}`} onClick={onClick} type="button">
      <span className="switch-thumb" />
      <span className="switch-label">Lovers</span>
    </button>
  );
};

export default Switch; 