import React from 'react';
import { sortImages, extractImageInfo } from '../../utils';
import { KeyboardRow } from '../../components/';
import { honorImages, manImages, pinImages, bambooImages } from '../../tiles';
import './Keyboard.css';

interface KeyboardProps {
    placeholderImages: string[];
    setPlaceholderImages: React.Dispatch<React.SetStateAction<string[]>>;
    lengthOfTiles: number;
    setConfirmEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Keyboard: React.FC<KeyboardProps> = ({
    placeholderImages,
    setPlaceholderImages,
    lengthOfTiles,
    setConfirmEnabled,
}) => {
    const handleTileClick = (image: string) => {
        if (placeholderImages.length < lengthOfTiles) {
            const newPlaceholderImages = [...placeholderImages];
            const imageInfo = extractImageInfo(image);

            const imageCount = newPlaceholderImages.filter(img => img === image).length;

            if (imageInfo.isSpecial) {
                if (imageCount < 3) {
                    newPlaceholderImages.push(image);
                }
            } else {
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

    return (
        <div className="keyboard">
            <KeyboardRow images={pinImages} onTileClick={handleTileClick} />
            <KeyboardRow images={bambooImages} onTileClick={handleTileClick} />
            <KeyboardRow images={manImages} onTileClick={handleTileClick} />
            <KeyboardRow images={honorImages} onTileClick={handleTileClick} />
        </div>
    );
};


