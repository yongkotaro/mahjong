import React from 'react';
import ClickableTile from '../ClickableTile/ClickableTile';
import './PlaceholderRow.css';

interface PlaceholderRowProps {
  images: string[];
  onTileClick: (index: number) => void;
}

export const PlaceholderRow: React.FC<PlaceholderRowProps> = ({ images, onTileClick }) => {
  const handleTileClick = (index: number) => {
    onTileClick(index);
  }

  return (
    <div className="placeholder-row">
      {images.map((image, index) => (
        <ClickableTile
          key={index} // Adding a key prop with a unique value
          src={image}
          onClick={() => handleTileClick(index)}
        />
      ))}
    </div>
  );
};

