import { honorTiles, manTiles, pinTiles, bambooTiles } from '../tiles';

export type Tile = {
  src: string;
  suit: string;
  number: number;
  maxCount: number;
  isSpecial: boolean;
};

export type TileCounts = {
  man: number[];
  pin: number[];
  bamboo: number[];
  honor: Record<string, number>;
};

export const updateTileCounts = (tiles: Tile[]): TileCounts => {
  const tileCounts: TileCounts = ({
    man: Array(9).fill(0),
    pin: Array(9).fill(0),
    bamboo: Array(9).fill(0),
    honor: {
      dong: 0,
      nan: 0,
      xi: 0,
      bei: 0,
      bai: 0,
      qing: 0,
      hong: 0
    }
  });

  tiles.forEach(tile => {
    if (tile.isSpecial) {
      tileCounts.honor[tile.suit]++;
    } else {
      const index = tile.number - 1;
      const suit = tile.suit as 'man' | 'pin' | 'bamboo';
      tileCounts[suit][index]++;
    }
  });

  return tileCounts;
};

export const thirteenOrphans: Tile[] = [
  bambooTiles[0], // 1 Bamboo
  bambooTiles[8], // 9 Bamboo
  manTiles[0],
  manTiles[8],
  pinTiles[0],
  pinTiles[8],
  ...honorTiles, // All honors
];

export const allTiles: Tile[] = [
  ...pinTiles,
  ...bambooTiles,
  ...manTiles,
  ...honorTiles,
];