import React, { useState, useEffect } from 'react';
import './ClickableTile.css';

interface ClickableTileProps {
  src: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  removing?: boolean;
}

const ClickableTile: React.FC<ClickableTileProps> = ({ src, onClick, removing }) => {
  const [clicked, setClicked] = useState(false);
  const [initialMount, setInitialMount] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialMount(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);

    if (onClick) {
      onClick();
    }
  };

  return (
    <img
      src={src}
      alt="tile"
      className={`clickable-tile ${clicked ? 'clicked' : ''} ${removing ? 'removing' : ''} ${initialMount ? 'initial-slide-in' : ''}`}
      onClick={handleClick}
    />
  );
};

export default ClickableTile;
