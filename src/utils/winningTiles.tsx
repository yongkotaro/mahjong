import * as TileUtils from "./parseTiles";

const isPair = (tile: TileUtils.TileStats): boolean => tile.count >= 2;

const isPung = (tile: TileUtils.TileStats): boolean => tile.count >= 3;

const isChow = (tiles: TileUtils.TileStats[], index: number): boolean => {
    if (index + 2 >= tiles.length) return false;
    if (tiles[index].isSpecial) return false;
    const first = tiles[index];
    const second = tiles[index + 1];
    const third = tiles[index + 2];
    return first.suit === second.suit && second.suit === third.suit &&
        first.count > 0 && second.count > 0 && third.count > 0 &&
        first.number + 1 === second.number && second.number + 1 === third.number;
};

const removeTiles = (tileStatsMap: TileUtils.TileStatsMap, tilesToRemove: { [key: string]: number }): TileUtils.TileStatsMap => {
    const newTileStatsMap: TileUtils.TileStatsMap = JSON.parse(JSON.stringify(tileStatsMap)); // Deep copy
    for (const key in tilesToRemove) {
        if (newTileStatsMap[key]) {
            newTileStatsMap[key].count -= tilesToRemove[key];
        }
    }
    return newTileStatsMap;
};

// Sorting function for tile entries when tiles are added during isCompleteHand
const sortTiles = (tileEntries: [string, TileUtils.TileStats][]): [string, TileUtils.TileStats][] => {
    return tileEntries.sort(([keyA, tileA], [keyB, tileB]) => {
        if (tileA.suit === tileB.suit) {
            return tileA.number - tileB.number;
        }
        return tileA.suit.localeCompare(tileB.suit);
    });
};

const checkMelds = (tileStatsMap: TileUtils.TileStatsMap): boolean => {
    const tileEntries = Object.entries(tileStatsMap).filter(([_, stats]) => stats.count > 0);
    const sortedTileEntries = sortTiles(tileEntries);
    if (sortedTileEntries.length === 0) return true;

    for (let i = 0; i < sortedTileEntries.length; i++) {
        const [key, tile] = sortedTileEntries[i];
        if (isPung(tile)) {
            const handWithoutPung = removeTiles(tileStatsMap, { [key]: 3 });
            if (checkMelds(handWithoutPung)) return true;
        }
        if (isChow(sortedTileEntries.map(([_, stats]) => stats), i)) {
            const chowKeys = [sortedTileEntries[i][0], sortedTileEntries[i + 1][0], sortedTileEntries[i + 2][0]];
            const handWithoutChow = removeTiles(tileStatsMap, {
                [chowKeys[0]]: 1,
                [chowKeys[1]]: 1,
                [chowKeys[2]]: 1
            });
            if (checkMelds(handWithoutChow)) return true;
        }
    }
    return false;
};

const isCompleteHand = (tileStatsMap: TileUtils.TileStatsMap): boolean => {
    const tileEntries = Object.entries(tileStatsMap);
    for (const [key, tile] of tileEntries) {
        if (isPair(tile)) {
            const handWithoutPair = removeTiles(tileStatsMap, { [key]: 2 });
            if (checkMelds(handWithoutPair)) return true;
        }
    }
    return false;
};

const isThirteenOrphans = (userHand: TileUtils.TileStatsMap): boolean => {
    const orphans = ["pin1", "pin9", "man1", "man9", "bamboo1", "bamboo9", "dong", "nan", "xi", "bei", "bai", "qing", "hong"];
    let pairFound = false;

    for (const tile of orphans) {
        if (!userHand[tile] || userHand[tile].count === 0) {
            return false; // Missing one of the required tiles
        }
        if (userHand[tile].count > 1) {
            if (pairFound) {
                return false; // More than one pair found
            }
            pairFound = true;
        }
    }
    return pairFound;
};

export const winningTiles = (userHand: string[]): string[] => {
    const winningTiles: string[] = [];
    const tiles = TileUtils.updateTileStatsMap(userHand.map(TileUtils.extractImageInfo), {});

    const checkSuit = (suit: string, suitTiles: TileUtils.TileInfo[]) => {
        suitTiles.forEach(tile => {
            const key = `${suit}${tile.number}`;
            const fullHand = JSON.parse(JSON.stringify(tiles)); // Deep copy of tiles for each iteration

            // Initialize tile if it does not exist
            if (!fullHand[key]) {
                fullHand[key] = {
                    src: tile.src,
                    suit: tile.suit,
                    number: tile.number,
                    maxCount: 4,
                    count: 0,
                    isSpecial: false
                };
            }

            if (fullHand[key].count < fullHand[key].maxCount) {
                fullHand[key].count++;
                if (isCompleteHand(fullHand)) {
                    winningTiles.push(tile.src);
                }
            }
        });
    };

    // Check for thirteen orphans
    TileUtils.thirteenOrphans.forEach(orphan => {
        if (orphan.isSpecial) {
            const key = `${orphan.suit}`;
            const fullHand = JSON.parse(JSON.stringify(tiles));


            fullHand[key] ??= {
                src: orphan.src,
                suit: orphan.suit,
                number: orphan.number,
                maxCount: 3,
                count: 0,
                isSpecial: true
            };

            if (fullHand[key].count < fullHand[key].maxCount) {
                fullHand[key].count++;
                if (isThirteenOrphans(fullHand)) {
                    winningTiles.push(orphan.src);
                }
            }

        } else {
            const key = `${orphan.suit}${orphan.number}`;
            const fullHand = JSON.parse(JSON.stringify(tiles));

            fullHand[key] ??= {
                src: orphan.src,
                suit: orphan.suit,
                number: orphan.number,
                maxCount: 4,
                count: 0,
                isSpecial: false
            };

            if (fullHand[key].count < fullHand[key].maxCount) {
                fullHand[key].count++;
                if (isThirteenOrphans(fullHand)) {
                    winningTiles.push(orphan.src);
                }
            }
        }
    });


    if (TileUtils.hasPin) checkSuit("pin", TileUtils.pins);
    if (TileUtils.hasMan) checkSuit("man", TileUtils.mans);
    if (TileUtils.hasBamboo) checkSuit("bamboo", TileUtils.bamboos);
    if (TileUtils.hasHonor) {
        TileUtils.honors.forEach(honor => {
            const key = `${honor.suit}`;
            const fullHand = JSON.parse(JSON.stringify(tiles)); // Deep copy of tiles for each iteration

            // Initialize tile if it does not exist
            fullHand[key] ??= {
                src: honor.src,
                suit: honor.suit,
                number: honor.number,
                maxCount: 3,
                count: 0,
                isSpecial: true
            };

            if (fullHand[key].count < fullHand[key].maxCount) {
                fullHand[key].count++;
                if (isCompleteHand(fullHand)) {
                    winningTiles.push(honor.src);
                }
            }
        });
    }
    console.log("Winning Tiles:", winningTiles);
    return winningTiles;
};