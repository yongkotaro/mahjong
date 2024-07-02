import { TileStatsMap, extractImageInfo, updateTileStatsMap, hasMan, hasBamboo, hasHonor, hasPin, mans, pins, bamboos, honors } from "./parseTile";

export const isCompleteHand = (fullHand: TileStatsMap): boolean => {
  for (const key in fullHand) {
    if (fullHand[key].isSpecial) {
      return false;
    } 
  }
  return true;
};

export const winningTiles = (userHand: string[], ): string[] => {
  const winningTiles: string[] = [];
  const tiles = updateTileStatsMap(userHand.map(extractImageInfo), {});
  

  if (hasPin) {
    pins.forEach(pin => {
        const key = `pin${pin.number}`;
        const fullHand = JSON.parse(JSON.stringify(tiles)); // Deep copy of tiles for each iteration
        if (fullHand[key].count < fullHand[key].maxCount) {
            fullHand[key].count++;
            
            if (isCompleteHand(fullHand)) {
                winningTiles.push(pin.src);
            }
        }
    });
  }
  
  if (hasMan) {
    pins.forEach(man => {
      const key = `man${man.number}`;
      const fullHand = JSON.parse(JSON.stringify(tiles)); // Deep copy of tiles for each iteration
      if (fullHand[key].count < fullHand[key].maxCount) {
          fullHand[key].count++;
          
          if (isCompleteHand(fullHand)) {
              winningTiles.push(man.src);
          }
      }
  });
  }

  if (hasBamboo) {
    pins.forEach(bamboo => {
      const key = `bamboo${bamboo.number}`;
      const fullHand = JSON.parse(JSON.stringify(tiles)); // Deep copy of tiles for each iteration
      if (fullHand[key].count < fullHand[key].maxCount) {
          fullHand[key].count++;
          
          if (isCompleteHand(fullHand)) {
              winningTiles.push(bamboo.src);
          }
      }
  });
  }

  if (hasHonor) {  
    pins.forEach(honor => {
      const key = `${honor.suit}`;
      const fullHand = JSON.parse(JSON.stringify(tiles)); // Deep copy of tiles for each iteration
      if (fullHand[key].count < fullHand[key].maxCount) {
          fullHand[key].count++;
          
          if (isCompleteHand(fullHand)) {
              winningTiles.push(honor.src);
          }
      }
  });
  }

  return winningTiles;
};

