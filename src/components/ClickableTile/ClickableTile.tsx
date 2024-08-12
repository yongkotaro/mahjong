import React, { useState } from 'react';
import './ClickableTile.css';

interface ClickableTileProps {
  src: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ClickableTile: React.FC<ClickableTileProps> = ({ src, style, onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200); // Reset the click state after animation

    if (onClick) {
      onClick();
    }
  };

  return (
    <img
      src={src}
      alt="tile"
      className={`clickable-tile ${clicked ? 'clicked' : ''}`}
      onClick={handleClick}
      style={style}
    />
  );
};

export default ClickableTile;
