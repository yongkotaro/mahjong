type ImageInfo = {
  src: string;
  suit: string | null;
  number: number | null;
  isSpecial: boolean;
};

const suitsOrder = ['pin', 'bamboo', 'man'];

export const extractImageInfo = (filename: string): ImageInfo => {
  const regex = /(\w+)(\d+)\.[a-f0-9]{8,}\.png$/;
  const match = filename.match(regex);

  if (!match) {
    // Handle special tiles that do not follow the naming convention
    return {
      src: filename,
      suit: null,
      number: null,
      isSpecial: true,
    };
  }

  return {
    src: filename,
    suit: match[1],
    number: parseInt(match[2], 10),
    isSpecial: false,
  };
};

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
