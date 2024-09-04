import { honorImages, manImages, pinImages, bambooImages } from '../tiles';

export let hasPin: boolean;
export let hasMan: boolean;
export let hasBamboo: boolean;
export let hasHonor: boolean;

export type TileInfo = {
  src: string;
  suit: string;
  number: number;
  isSpecial: boolean;
};

export type TileStats = {
  src: string;
  suit: string;
  number: number;
  maxCount: number;
  count: number;
  isSpecial: boolean;
};

export type TileStatsMap = { [key: string]: TileStats };

export const setBoolean = (tiles: TileInfo[]): void => {
  hasPin = tiles.some(tile => tile.suit === 'pin');
  hasMan = tiles.some(tile => tile.suit === 'man');
  hasBamboo = tiles.some(tile => tile.suit === 'bamboo');
  hasHonor = tiles.some(tile => tile.isSpecial);
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
        suit: tile.suit,
        number: tile.number,
        maxCount: 0,
        count: 0,
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
export const thirteenOrphans: TileInfo[] = [
  { src: bambooImages[0], suit: 'bamboo', number: 1, isSpecial: false },
  { src: bambooImages[8], suit: 'bamboo', number: 9, isSpecial: false },
  { src: manImages[0], suit: 'man', number: 1, isSpecial: false },
  { src: manImages[8], suit: 'man', number: 9, isSpecial: false },
  { src: pinImages[0], suit: 'pin', number: 1, isSpecial: false },
  { src: pinImages[8], suit: 'pin', number: 9, isSpecial: false },
  ...honors,
];