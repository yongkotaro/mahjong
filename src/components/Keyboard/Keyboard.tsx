import React from 'react';
import { sortTiles, Tile } from '../../utils';
import { KeyboardRow } from '../../components/';
import { honorTiles, manTiles, pinTiles, bambooTiles } from '../../tiles';
import './Keyboard.css';

interface KeyboardProps {
    placeholderTiles: Tile[];
    setPlaceholderTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
    lengthOfTiles: number;
    setConfirmEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Keyboard = ({
    placeholderTiles,
    setPlaceholderTiles,
    lengthOfTiles,
    setConfirmEnabled,
}: KeyboardProps) => {
    const handleTileClick = (tile: Tile) => {
        if (placeholderTiles.length < lengthOfTiles) {
            const newTiles = [...placeholderTiles];
            const tileCount = newTiles.filter(elem => elem == tile).length;

            if (tile.isSpecial) {
                if (tileCount < 3) {
                    newTiles.push(tile);
                }
            } else {
                if (tileCount < 4) {
                    newTiles.push(tile);
                }
            }

            sortTiles(newTiles);
            setPlaceholderTiles(newTiles);

            if (newTiles.length === lengthOfTiles) {
                setConfirmEnabled(true);
            }
        }
    };

    return (
        <div className="keyboard">
            <KeyboardRow tiles={pinTiles} onTileClick={handleTileClick} />
            <KeyboardRow tiles={bambooTiles} onTileClick={handleTileClick} />
            <KeyboardRow tiles={manTiles} onTileClick={handleTileClick} />
            <KeyboardRow tiles={honorTiles} onTileClick={handleTileClick} />
        </div>
    );
};


