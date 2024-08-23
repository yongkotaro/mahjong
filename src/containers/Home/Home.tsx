import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { KeyboardRow, PlaceholderRow } from '../../components/';
import { honorImages, manImages, pinImages, bambooImages } from '../../tiles';
import { sortImages, extractImageInfo, winningTiles } from '../../utils';
import { Button, Divider } from '@mui/material';
import { DeleteRounded, ThumbUpAltRounded } from '@mui/icons-material';
import './Home.css';


export const Home: React.FC = () => {
  const [placeholderImages, setPlaceholderImages] = useState<string[]>([]);
  const [lengthOfTiles, setlengthOfTiles] = useState(13);
  const [wonTiles, setWonTiles] = useState<string[]>([]);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [confirmPressed, setConfirmPressed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [slideUp, setSlideUp] = useState(false);


  const handleTileClick = (image: string) => {
    if (placeholderImages.length < lengthOfTiles) {
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

      if (newPlaceholderImages.length === lengthOfTiles) {
        setConfirmEnabled(true);
      }
    }
  };

  const handleClearClick = () => {
    setSlideUp(true);
    setTimeout(() => {
      setPlaceholderImages([]);
      setWonTiles([]);
      setConfirmEnabled(false);
      setConfirmPressed(false);
      setMessage(null);
      setSlideUp(false);
    }, 500); // Match this duration with your CSS animation duration
  };

  const handleConfirmClick = () => {
    setWonTiles(winningTiles(placeholderImages));
    setConfirmEnabled(false);
    setConfirmPressed(true);
  };

  const handleImageRemove = (index: number) => {
    const newPlaceholderImages = [...placeholderImages];
    newPlaceholderImages.splice(index, 1);
    setPlaceholderImages(newPlaceholderImages);
    setConfirmEnabled(false);
    setConfirmPressed(false);
  };

  const handleWinningTile = (index: number) => {
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && confirmEnabled) {
        handleConfirmClick();
      } else if (event.key === 'Escape') {
        handleClearClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [confirmEnabled, handleConfirmClick, handleClearClick]);

  return (
    <div className='main'>
      <Divider variant='middle' sx={{ padding: '40px 0' }} >
        <span className="divider-text">
          TILEWAITER
        </span>
      </Divider>
      <PlaceholderRow images={placeholderImages} onTileClick={handleImageRemove} slideUp={slideUp} />
      <div className="button-container">
        <Button variant='outlined' startIcon={<DeleteRounded />} color='primary' onClick={handleClearClick} disabled={placeholderImages.length == 0}>
          Clear
        </Button>
        <Button variant='outlined' startIcon={<ThumbUpAltRounded />} color='primary' onClick={handleConfirmClick} disabled={!confirmEnabled} >
          Confirm
        </Button>
        <div>
          <Select
            options={[
              { value: 4, label: '4' },
              { value: 7, label: '7' },
              { value: 10, label: '10' },
              { value: 13, label: '13' }
            ]}
            onChange={(e) => {
              if (e) {
                setPlaceholderImages([]);
                setlengthOfTiles(e.value);
              }
            }}
            defaultValue={{ value: 13, label: '13' }}
          />
        </div>
      </div>
      <div className="keyboard">
        <KeyboardRow images={pinImages} onTileClick={handleTileClick} />
        <KeyboardRow images={bambooImages} onTileClick={handleTileClick} />
        <KeyboardRow images={manImages} onTileClick={handleTileClick} />
        <KeyboardRow images={honorImages} onTileClick={handleTileClick} />
      </div>
      <div className="winning-tiles">
        <h2>Winning Tiles:</h2>
        {confirmPressed &&
          <PlaceholderRow images={wonTiles} onTileClick={handleWinningTile} slideUp={slideUp} />
        }
      </div>
    </div>
  );
}

