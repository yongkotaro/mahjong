import React, { useState } from 'react';
import './ClickableTile.css';

interface ClickableTileProps {
  src: string;
  style?: React.CSSProperties;
}

const ClickableTile: React.FC<ClickableTileProps> = ({ src, style }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200); // Reset the click state after animation
  };
  
  return (
    <img
      src={src}
      className={`clickable-tile ${clicked ? 'clicked' : ''}`}
      onClick={handleClick}
      style={style}
    />
  );
};

export default ClickableTile;
