import React from 'react';
import ClickableTile from '../ClickableTile/ClickableTile';
import './KeyboardRow.css';

interface KeyboardRowProps {
  images: string[];
  onTileClick: (image: string) => void;
}

export const KeyboardRow: React.FC<KeyboardRowProps> = ({ images, onTileClick }) => {
  return (
    <div className="keyboard-row">
      {images.map((image, index) => (
        <ClickableTile
          key={index}
          src={image}
          onClick={() => onTileClick(image)}
        />
      ))}
    </div>
  );
};


