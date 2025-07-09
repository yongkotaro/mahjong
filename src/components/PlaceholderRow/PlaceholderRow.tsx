import React, { useState } from 'react';
import ClickableTile from '../ClickableTile/ClickableTile';
import './PlaceholderRow.css';
import { Tile } from '../../utils';
interface PlaceholderRowProps {
  tiles: Tile[];
  onTileClick: (index: number) => void;
  slideUp?: boolean;
}

export const PlaceholderRow: React.FC<PlaceholderRowProps> = ({ tiles, onTileClick, slideUp }) => {
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

  const handleTileClick = (index: number) => {
    setRemovingIndex(index);
    setTimeout(() => {
      onTileClick(index);
      setRemovingIndex(null);
    }, 500); // Match this with the slide-out animation duration
  };

  return (
    <div className={`placeholder-row ${slideUp ? 'slide-up' : ''}`}>
      {tiles.map((tile, index) => (
        <ClickableTile
          key={index}
          src={tile.src}
          onClick={() => handleTileClick(index)}
          removing={removingIndex === index}  // Pass removing state
        />
      ))}
    </div>
  );
};
