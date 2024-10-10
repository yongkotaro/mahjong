import { extractImageInfo } from './parseTiles';

const suitsOrder = ['pin', 'bamboo', 'man'];
const honorsOrder = ['dong', 'nan', 'xi', 'bei', 'hong', 'qing', 'baiban'];

export const sortImages = (filenames: string[]): string[] => {
  const imageInfos = filenames.map(extractImageInfo);

  imageInfos.sort((a, b) => {
    if (a.isSpecial && b.isSpecial) {
      // Keep the order of special tiles the same
      return honorsOrder.indexOf(a.suit) - honorsOrder.indexOf(b.suit);
    } else if (a.isSpecial) {
      return 1; // Move special tiles to the end
    } else if (b.isSpecial) {
      return -1; // Move special tiles to the end
    }

    const suitComparison = suitsOrder.indexOf(a.suit) - suitsOrder.indexOf(b.suit);
    if (suitComparison !== 0) {
      return suitComparison;
    }

    return a.number - b.number;
  });

  // Extract and return sorted filenames
  return imageInfos.map(info => info.src);
};
