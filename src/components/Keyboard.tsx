import React, { useState } from 'react';
import TileRow from './TileRow';
import PlaceholderRow from './PlaceholderRow';
import { images as honorImages } from '../img/honors/honors';
import { images as bambooImages } from '../img/bamboo/bamboo';
import { images as manImages } from '../img/man/man';
import { images as pinImages } from '../img/pin/pin';
import { sortImages, extractImageInfo } from '../utils/sortTiles';
import './../components-styling/Keyboard.css';

const Keyboard: React.FC = () => {
  const [placeholderImages, setPlaceholderImages] = useState<string[]>([]);

  const handleTileClick = (image: string) => {
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

    if (newPlaceholderImages.length <= 13) {
      const sortedImages = sortImages(newPlaceholderImages);
      setPlaceholderImages(sortedImages);
    }
  };

  const handleClearClick = () => {
    setPlaceholderImages([]);
  };

  return (
    <div className="keyboard">
      <PlaceholderRow images={placeholderImages} />
      <div className="button-container">
        <button className="clear-button" onClick={handleClearClick}>
          Clear Placeholder
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
