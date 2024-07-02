import { extractImageInfo } from './parseTile';

const suitsOrder = ['pin', 'bamboo', 'man'];

export const sortImages = (filenames: string[]): string[] => {
  const imageInfos = filenames.map(extractImageInfo);

  imageInfos.sort((a, b) => {
    if (a.isSpecial && b.isSpecial) {
      // Keep the order of special tiles the same
      return filenames.indexOf(a.src) - filenames.indexOf(b.src);
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
  return imageInfos.map(info => info.src);
};
