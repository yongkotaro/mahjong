import { extractImageInfo } from './parseTiles';

const suitsOrder = ['pin', 'bamboo', 'man'];
const specialOrder = ["dong", "nan", "xi", "bei", "hong", "qing", "baiban"]

export const sortTiles = (tilenames: string[]): string[] => {
  const tileInfos = tilenames.map(extractImageInfo);

  tileInfos.sort((a, b) => {
    if (a.isSpecial && b.isSpecial) {
      // Keep the order of special tiles the same
      return specialOrder.indexOf(a.suit!) - specialOrder.indexOf(b.suit!);
    } else if (a.isSpecial) {
      return 1; // Move special tiles to the end
    } else if (b.isSpecial) {
      return -1; // Move special tiles to the end
    }

    const suitComparison = suitsOrder.indexOf(a.suit!) - suitsOrder.indexOf(b.suit!);
    if (suitComparison !== 0) {
      return suitComparison;
    }

    return a.number! - b.number!;
  });

  // Extract and return sorted filenames
  return tileInfos.map(info => info.src);
};
