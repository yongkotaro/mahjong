import React from 'react';
import ClickableTile from '../ClickableTile/ClickableTile';
import './PlaceholderRow.css';

interface PlaceholderRowProps {
  images: string[];
  onTileClick: (index: number) => void;
}

const PlaceholderRow: React.FC<PlaceholderRowProps> = ({ images, onTileClick }) => {
  const handleTileClick = (index: number) => {
    onTileClick(index);
  }

  return (
    <div className="placeholder-row">
      {images.map((image, index) => (
        <ClickableTile
          key={index} // Adding a key prop with a unique value
          src={image}
          style={{ width: '50px', height: '50px' }}
          onClick={() => handleTileClick(index)}
        />
      ))}
    </div>
  );
};

export default PlaceholderRow;
