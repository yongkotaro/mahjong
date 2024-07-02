import React, { useState } from 'react';
import TileRow from './TileRow';
import PlaceholderRow from './PlaceholderRow';
import { images as honorImages } from '../img/honors/honors';
import { images as bambooImages } from '../img/bamboo/bamboo';
import { images as manImages } from '../img/man/man';
import { images as pinImages } from '../img/pin/pin';
import { sortImages } from '../utils/sortTiles';
import { extractImageInfo, updateTileStatsMap } from '../utils/parseTile';
import './../components-styling/Keyboard.css';

const Keyboard: React.FC = () => {
  const [placeholderImages, setPlaceholderImages] = useState<string[]>([]);
  const [confirmEnabled, setConfirmEnabled] = useState(false);

  const handleTileClick = (image: string) => {
    if (placeholderImages.length === 13) {
      setConfirmEnabled(true);
      return;
    }
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
  };

  const handleClearClick = () => {
    setPlaceholderImages([]);
    setConfirmEnabled(false); // Disable confirm button on clear
  };

  const handleConfirmClick = () => {
    console.log(updateTileStatsMap(placeholderImages.map(extractImageInfo), {}));
    setConfirmEnabled(false);
  };

  const handleImageRemove = (index: number) => {
    const newPlaceholderImages = [...placeholderImages];
    newPlaceholderImages.splice(index, 1); // Remove element at index
    setPlaceholderImages(newPlaceholderImages);
    setConfirmEnabled(false); // Disable confirm button after removal
  };

  return (
    <div className="keyboard">
      <PlaceholderRow images={placeholderImages} onTileClick={handleImageRemove}/>
      <div className="button-container">
        <button className="clear-button" onClick={handleClearClick}>
          Clear 
        </button>
        <button className="confirm-button" onClick={handleConfirmClick} disabled={!confirmEnabled}>
          Confirm
        </button>
      </div>
      <TileRow images={pinImages} onTileClick={handleTileClick} />
      <TileRow images={bambooImages} onTileClick={handleTileClick} />
      <TileRow images={manImages} onTileClick={handleTileClick} />
      <TileRow images={honorImages} onTileClick={handleTileClick} />
    </div>
  );
};

export default Keyboard;
