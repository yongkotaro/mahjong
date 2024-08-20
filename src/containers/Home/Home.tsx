import React, { useState } from 'react';
import { KeyboardRow, PlaceholderRow } from '../../components/';
import { honorImages, manImages, pinImages, bambooImages } from '../../tiles';
import { sortImages, extractImageInfo, winningTiles } from '../../utils';
import './Home.css';


export const Home: React.FC = () => {
  const [placeholderImages, setPlaceholderImages] = useState<string[]>([]);
  const [wonTiles, setWonTiles] = useState<string[]>([]);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [confirmPressed, setConfirmPressed] = useState(false);

  const handleTileClick = (image: string) => {
    if (placeholderImages.length < 13) {
      const newPlaceholderImages = [...placeholderImages];
      const imageInfo = extractImageInfo(image);

      // Count the occurrences of the image in the placeholderImages
      const imageCount = newPlaceholderImages.filter(img => img === image).length;

      if (imageInfo.isSpecial) {
        // Allow up to 3 duplicates for special tiles
        if (imageCount < 3) {
          newPlaceholderImages.push(image);
        }
      } else {
        // Allow up to 4 duplicates for suits
        if (imageCount < 4) {
          newPlaceholderImages.push(image);
        }
      }

      const sortedImages = sortImages(newPlaceholderImages);
      setPlaceholderImages(sortedImages);

      if (newPlaceholderImages.length === 13) {
        setConfirmEnabled(true);
      }
    }
  };

  const handleClearClick = () => {
    setPlaceholderImages([]);
    setWonTiles([]);
    setConfirmEnabled(false); // Disable confirm button on clear
    setConfirmPressed(false);
  };

  const handleConfirmClick = () => {
    setWonTiles(winningTiles(placeholderImages));
    setConfirmEnabled(false);
    setConfirmPressed(true);
  };

  const handleImageRemove = (index: number) => {
    const newPlaceholderImages = [...placeholderImages];
    newPlaceholderImages.splice(index, 1); // Remove element at index
    setPlaceholderImages(newPlaceholderImages);
    setConfirmEnabled(false); // Disable confirm button after removal
    setConfirmPressed(false);
  };

  const handleWinningTile = (index: number) => {
  };

  return (
    <div className='main'>
      <PlaceholderRow images={placeholderImages} onTileClick={handleImageRemove} />
      <div className="button-container">
        <button className="clear-button" onClick={handleClearClick}>
          Clear
        </button>
        <button className="confirm-button" onClick={handleConfirmClick} disabled={!confirmEnabled}>
          Confirm
        </button>
      </div>
      <div className="keyboard">
        <KeyboardRow images={pinImages} onTileClick={handleTileClick} />
        <KeyboardRow images={bambooImages} onTileClick={handleTileClick} />
        <KeyboardRow images={manImages} onTileClick={handleTileClick} />
        <KeyboardRow images={honorImages} onTileClick={handleTileClick} />
      </div>
      {
        confirmPressed &&
        <div className="winning-tiles">
          <h2>Winning Tiles</h2>
          <PlaceholderRow images={wonTiles} onTileClick={handleWinningTile} />
        </div>
      }
    </div>
  );
}

