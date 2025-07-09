import { useState } from 'react';
import { PlaceholderRow, Keyboard, KeyboardButtons } from '../../components/';
import { winningTiles, Tile } from '../../utils';
import { Divider } from '@mui/material';
import './Home.css';

export const Home = () => {
  const [placeholderTiles, setPlaceholderTiles] = useState<Tile[]>([]);
  const [lengthOfTiles, setlengthOfTiles] = useState(13);
  const [wonTiles, setWonTiles] = useState<Tile[]>([]);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [confirmPressed, setConfirmPressed] = useState(false);
  const [slideUp, setSlideUp] = useState(false);


  const handleImageRemove = (index: number) => {
    const newPlaceholderTiles = [...placeholderTiles];
    newPlaceholderTiles.splice(index, 1);
    setPlaceholderTiles(newPlaceholderTiles);
    setConfirmEnabled(false);
    setConfirmPressed(false);
  };

  const handleWinningTile = (index: number) => {
    // Add functionality to handle clicking on a winning tile if needed
  };

  return (
    <div className='main' id='home'>
      <Divider variant='middle' sx={{ padding: '40px 0', width: '70%', margin: 'auto' }} >
        <span className="divider-text">
          TILEWAITER
        </span>
      </Divider>
      <div className="placeholder-row-container">
        <PlaceholderRow tiles={placeholderTiles} onTileClick={handleImageRemove} slideUp={slideUp} />
      </div>
      <KeyboardButtons
        placeholderTiles={placeholderTiles}
        setPlaceholderTiles={setPlaceholderTiles}
        setConfirmEnabled={setConfirmEnabled}
        setConfirmPressed={setConfirmPressed}
        setWonTiles={setWonTiles}
        setSlideUp={setSlideUp}
        confirmEnabled={confirmEnabled}
        lengthOfTiles={lengthOfTiles}
        setLengthOfTiles={setlengthOfTiles}
        winningTiles={winningTiles}
      />
      <Keyboard
        placeholderTiles={placeholderTiles}
        setPlaceholderTiles={setPlaceholderTiles}
        lengthOfTiles={lengthOfTiles}
        setConfirmEnabled={setConfirmEnabled}
      />
      <div className="winning-tiles">
        <h2>Winning Tiles:</h2>
        {confirmPressed && (wonTiles.length > 0 ? (
          <PlaceholderRow tiles={wonTiles} onTileClick={handleWinningTile} slideUp={slideUp} />
        ) : (
          <h2 className={`no-tiles-message ${slideUp ? 'slide-out' : 'slide-in'}`}>No winning tiles!</h2>
        ))}
      </div>
    </div>
  );
};
