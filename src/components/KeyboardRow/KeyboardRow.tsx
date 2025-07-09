import React from 'react';
import ClickableTile from '../ClickableTile/ClickableTile';
import './KeyboardRow.css';
import { Tile } from '../../utils';

interface KeyboardRowProps {
  tiles: Tile[];
  onTileClick: (tile: Tile) => void;
}

export const KeyboardRow: React.FC<KeyboardRowProps> = ({ tiles, onTileClick }) => {
  return (
    <div className="keyboard-row">
      {tiles.map((tile, index) => (
        <ClickableTile
          key={index}
          src={tile.src}
          onClick={() => onTileClick(tile)}
        />
      ))}
    </div>
  );
};


