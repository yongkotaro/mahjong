import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import Select from 'react-select';
import { DeleteRounded, ThumbUpAltRounded } from '@mui/icons-material';
import './KeyboardButtons.css';

interface KeyboardButtonsProps {
    placeholderImages: string[];
    setPlaceholderImages: React.Dispatch<React.SetStateAction<string[]>>;
    setConfirmEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmPressed: React.Dispatch<React.SetStateAction<boolean>>;
    setWonTiles: React.Dispatch<React.SetStateAction<string[]>>;
    setSlideUp: React.Dispatch<React.SetStateAction<boolean>>;
    confirmEnabled: boolean;
    lengthOfTiles: number;
    setLengthOfTiles: React.Dispatch<React.SetStateAction<number>>;
    winningTiles: (images: string[]) => string[];
}

export const KeyboardButtons: React.FC<KeyboardButtonsProps> = ({
    placeholderImages,
    setPlaceholderImages,
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
            setPlaceholderImages([]);
            setWonTiles([]);
            setConfirmEnabled(false);
            setConfirmPressed(false);
            setSlideUp(false);
        }, 500);
    }, [setPlaceholderImages, setWonTiles, setConfirmEnabled, setConfirmPressed, setSlideUp]);

    const handleConfirmClick = useCallback(() => {
        const tiles = winningTiles(placeholderImages);
        setWonTiles(tiles);
        setConfirmPressed(true);
        setConfirmEnabled(false);
    }, [placeholderImages, setConfirmEnabled, setConfirmPressed, setWonTiles, winningTiles]);

    return (
        <div className="button-container">
            <Button
                variant='outlined'
                startIcon={<DeleteRounded />}
                color='primary'
                onClick={handleClearClick}
                disabled={placeholderImages.length === 0}
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
                            setPlaceholderImages([]);
                            setLengthOfTiles(e.value);
                        }
                    }}
                    defaultValue={{ value: 13, label: '13' }}
                />
            </div>
        </div>
    );
};

