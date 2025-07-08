import './LoversButton.css';

interface LoversButtonProps {
  isOn: boolean;
  onClick: () => void;
}

const LoversButton: React.FC<LoversButtonProps> = ({ isOn, onClick }) => {
  return (
    <button
      className={`switch-lovers-btn${isOn ? ' on' : ''}`}
      onClick={onClick}
      type="button"
    >
      Lovers
    </button>
  );
};

export default LoversButton; 