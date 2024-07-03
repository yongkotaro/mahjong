export type TileStats = {
    suit: string;
    number: number;
    src: string;
    maxCount: number;
    count: number;
    isSpecial: boolean;
};

export type TileStatsMap = { [key: string]: TileStats };

const isPair = (tile: TileStats): boolean => tile.count >= 2;

const isPung = (tile: TileStats): boolean => tile.count >= 3;

const isChow = (tiles: TileStats[], index: number): boolean => {
    if (index + 2 >= tiles.length) return false;
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

const checkMelds = (tileStatsMap: TileStatsMap): boolean => {
    const tileEntries = Object.entries(tileStatsMap).filter(([_, stats]) => stats.count > 0);
    if (tileEntries.length === 0) return true;

    for (let i = 0; i < tileEntries.length; i++) {
        const [key, tile] = tileEntries[i];
        if (isPung(tile)) {
            const handWithoutPung = removeTiles(tileStatsMap, { [key]: 3 });
            if (checkMelds(handWithoutPung)) return true;
        }
        if (isChow(tileEntries.map(([_, stats]) => stats), i)) {
            const chowKeys = [tileEntries[i][0], tileEntries[i + 1][0], tileEntries[i + 2][0]];
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
    const tileEntries = Object.entries(tileStatsMap).filter(([_, stats]) => stats.count > 0);
    if (tileEntries.length === 0) return true;

    for (const [key, tile] of tileEntries) {
        if (isPair(tile)) {
            const handWithoutPair = removeTiles(tileStatsMap, { [key]: 2 });
            if (checkMelds(handWithoutPair)) return true;
        }
    }
    return false;
};
