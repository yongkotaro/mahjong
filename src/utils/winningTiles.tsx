import { TileInfo, TileStats, TileStatsMap, extractImageInfo, updateTileStatsMap, hasMan, hasBamboo, hasHonor, hasPin, mans, pins, bamboos, honors } from "./parseTiles";

export const winningTiles = (userHand: string[]): string[] => {
    const winningTiles: string[] = [];
    const tiles = updateTileStatsMap(userHand.map(extractImageInfo), {});

    const checkSuit = (suit: string, suitTiles: TileInfo[]) => {
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

    if (hasPin) checkSuit("pin", pins);
    if (hasMan) checkSuit("man", mans);
    if (hasBamboo) checkSuit("bamboo", bamboos);
    if (hasHonor) {
        honors.forEach(honor => {
            const key = `${honor.suit}`;
            const fullHand = JSON.parse(JSON.stringify(tiles)); // Deep copy of tiles for each iteration

            // Initialize tile if it does not exist
            if (!fullHand[key]) {
                fullHand[key] = {
                    src: honor.src,
                    suit: honor.suit,
                    number: honor.number,
                    maxCount: 3,
                    count: 0,
                    isSpecial: true
                };
            }

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

const isPair = (tile: TileStats): boolean => tile.count >= 2;

const isPung = (tile: TileStats): boolean => tile.count >= 3;

const isChow = (tiles: TileStats[], index: number): boolean => {
    if (index + 2 >= tiles.length) return false;
    if (tiles[index].isSpecial) return false;
    const first = tiles[index];
    const second = tiles[index + 1];
    const third = tiles[index + 2];
    return first.suit === second.suit && second.suit === third.suit &&
        first.count > 0 && second.count > 0 && third.count > 0 &&
        first.number + 1 === second.number && second.number + 1 === third.number;
};

const removeTiles = (tileStatsMap: TileStatsMap, tilesToRemove: { [key: string]: number }): TileStatsMap => {
    const newTileStatsMap: TileStatsMap = JSON.parse(JSON.stringify(tileStatsMap)); // Deep copy
    for (const key in tilesToRemove) {
        if (newTileStatsMap[key]) {
            newTileStatsMap[key].count -= tilesToRemove[key];
        }
    }
    return newTileStatsMap;
};

// Sorting function for tile entries
const sortTiles = (tileEntries: [string, TileStats][]): [string, TileStats][] => {
    return tileEntries.sort(([keyA, tileA], [keyB, tileB]) => {
        if (tileA.suit === tileB.suit) {
            return tileA.number - tileB.number;
        }
        return tileA.suit.localeCompare(tileB.suit);
    });
};

const checkMelds = (tileStatsMap: TileStatsMap): boolean => {
    const tileEntries = Object.entries(tileStatsMap).filter(([_, stats]) => stats.count > 0);
    const sortedTileEntries = sortTiles(tileEntries); // Sort tile entries
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

export const isCompleteHand = (tileStatsMap: TileStatsMap): boolean => {
    const tileEntries = Object.entries(tileStatsMap);
    for (const [key, tile] of tileEntries) {
        if (isPair(tile)) {
            const handWithoutPair = removeTiles(tileStatsMap, { [key]: 2 });
            if (checkMelds(handWithoutPair)) return true;
        }
    }
    return false;
};