import { images as honorImages } from '../img/honors/honors';
import { images as bambooImages } from '../img/bamboo/bamboo';
import { images as manImages } from '../img/man/man';
import { images as pinImages } from '../img/pin/pin';

export let hasPin: boolean = false;
export let hasMan: boolean = false;
export let hasBamboo: boolean = false;
export let hasHonor: boolean = false;

export type TileInfo = {
    src: string;
    suit: string;
    number: number;
    isSpecial: boolean;
};

export type TileStats = {
    src: string;
    maxCount: number;
    count: number;
    currentlyUsed: number;
    allUsed: boolean;
    isSpecial: boolean;
};

export type TileStatsMap = { [key: string]: TileStats };

export const setBoolean = (tiles: TileInfo[]): void => {
    if (tiles.some(tile => tile.suit == 'pin')) {
      hasPin = true;
    }
    if (tiles.some(tile => tile.suit == 'man')) {
      hasMan = true;
    }
    if (tiles.some(tile => tile.suit == 'bamboo')) {
      hasBamboo = true;
    }
    if (tiles.some(tile => tile.isSpecial)) {
      hasHonor = true;
    }
};


export const updateTileStatsMap = (tiles: TileInfo[], tileStatsMap: { [key: string]: TileStats }): TileStatsMap => {
  setBoolean(tiles);

  tiles.forEach(tile => {
      let key = '';
      if (!tile.isSpecial) {
          key = `${tile.suit}${tile.number}`;
      } else {
          key = `${tile.suit}`;
      }

      if (!tileStatsMap[key]) {
          tileStatsMap[key] = {
              src: tile.src,
              maxCount: 0,
              count: 0,
              currentlyUsed: 0,
              allUsed: false,
              isSpecial: tile.isSpecial
          };
      }

      tileStatsMap[key].maxCount = tile.isSpecial ? 3 : 4;
      tileStatsMap[key].count = (tileStatsMap[key].count || 0) + 1;
  });

  return tileStatsMap;
};

export const extractImageInfo = (filename: string): TileInfo => {
    // Regular pattern for standard tiles
    const regex = /(\w+)(\d+)\.[a-f0-9]{0,}\.png$/;
    const match = filename.match(regex);
  
    if (match) {
      return {
        src: filename,
        suit: match[1],
        number: parseInt(match[2], 10),
        isSpecial: false,
      };
    }
  
    // Handle special tiles
    const specialPattern = /(\w+)\.[a-f0-9]{0,}\.png$/;
    const specialMatch = filename.match(specialPattern);
    
    if (specialMatch) {
      return {
        src: filename,
        suit: specialMatch[1], 
        number: 0,
        isSpecial: true,
      };
    }
    
    // Handle baiban/white dragon
    return {
      src: filename,
      suit: 'baiban',
      number: 0,
      isSpecial: true,
    };
};

export const honors: TileInfo[] = honorImages.map(extractImageInfo);
export const bamboos: TileInfo[] = bambooImages.map(extractImageInfo);
export const mans: TileInfo[] = manImages.map(extractImageInfo);
export const pins: TileInfo[] = pinImages.map(extractImageInfo);