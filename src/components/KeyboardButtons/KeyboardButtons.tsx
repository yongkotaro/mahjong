import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import Select from 'react-select';
import { DeleteRounded, ThumbUpAltRounded } from '@mui/icons-material';
import './KeyboardButtons.css';
import { Tile } from '../../utils';

interface KeyboardButtonsProps {
    placeholderTiles: Tile[];
    setPlaceholderTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
    setConfirmEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmPressed: React.Dispatch<React.SetStateAction<boolean>>;
    setWonTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
    setSlideUp: React.Dispatch<React.SetStateAction<boolean>>;
    confirmEnabled: boolean;
    lengthOfTiles: number;
    setLengthOfTiles: React.Dispatch<React.SetStateAction<number>>;
    winningTiles: (tiles: Tile[]) => Tile[];
}

export const KeyboardButtons: React.FC<KeyboardButtonsProps> = ({
    placeholderTiles,
    setPlaceholderTiles,
    setConfirmEnabled,
    setConfirmPressed,
    setWonTiles,
    setSlideUp,
    confirmEnabled,
    lengthOfTiles,
    setLengthOfTiles,
    winningTiles,
}) => {

    const handleClearClick = useCallback(() => {
        setSlideUp(true);
        setTimeout(() => {
            setPlaceholderTiles([]);
            setWonTiles([]);
            setConfirmEnabled(false);
            setConfirmPressed(false);
            setSlideUp(false);
        }, 500);
    }, [setPlaceholderTiles, setWonTiles, setConfirmEnabled, setConfirmPressed, setSlideUp]);

    const handleConfirmClick = useCallback(() => {
        const tiles = winningTiles(placeholderTiles);
        setWonTiles(tiles);
        setConfirmPressed(true);
        setConfirmEnabled(false);
    }, [placeholderTiles, setConfirmEnabled, setConfirmPressed, setWonTiles, winningTiles]);

    return (
        <div className="button-container">
            <Button
                variant='outlined'
                startIcon={<DeleteRounded />}
                color='primary'
                onClick={handleClearClick}
                disabled={placeholderTiles.length === 0}
            >
                Clear
            </Button>
            <Button
                variant='outlined'
                startIcon={<ThumbUpAltRounded />}
                color='primary'
                onClick={handleConfirmClick}
                disabled={!confirmEnabled}
            >
                Confirm
            </Button>
            <div>
                <Select
                    options={[
                        { value: 4, label: '4' },
                        { value: 7, label: '7' },
                        { value: 10, label: '10' },
                        { value: 13, label: '13' },
                    ]}
                    onChange={(e) => {
                        if (e) {
                            setPlaceholderTiles([]);
                            setLengthOfTiles(e.value);
                        }
                    }}
                    defaultValue={{ value: 13, label: '13' }}
                />
            </div>
        </div>
    );
};

