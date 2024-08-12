import React from 'react';
import ClickableTile from '../ClickableTile/ClickableTile';
import './TileRow.css';

interface TileRowProps {
  images: string[];
  onTileClick: (image: string) => void;
}

const TileRow: React.FC<TileRowProps> = ({ images, onTileClick }) => {
  return (
    <div className="tile-row">
      {images.map((image, index) => (
        <ClickableTile
          key={index}
          src={image}
          style={{ width: '50px', height: '50px' }}
          onClick={() => onTileClick(image)}
        />
      ))}
    </div>
  );
};

export default TileRow;
