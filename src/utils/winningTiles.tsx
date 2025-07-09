import * as TileUtils from "./parseTiles";

const deepCloneCounts = (counts: TileUtils.TileCounts): TileUtils.TileCounts => ({
    man: [...counts.man],
    pin: [...counts.pin],
    bamboo: [...counts.bamboo],
    honor: { ...counts.honor }
});

const isPair = (count: number): boolean => count >= 2;

const isPung = (count: number): boolean => count >= 3;

const isChow = (suitCounts: number[], index: number): boolean => {
    if (index + 2 >= suitCounts.length) return false;
    return suitCounts[index] > 0 &&
        suitCounts[index + 1] > 0 &&
        suitCounts[index + 2] > 0;
};

const checkMelds = (counts: TileUtils.TileCounts): boolean => {
    // Check all suits for melds
    for (const suit of ['man', 'pin', 'bamboo'] as const) {
        const suitCounts = counts[suit];
        for (let i = 0; i < suitCounts.length; i++) {
            // Check for pung
            if (isPung(suitCounts[i])) {
                const newCounts = deepCloneCounts(counts);
                newCounts[suit][i] -= 3;
                if (checkMelds(newCounts)) return true;
            }
            // Check for chow (only for numbered tiles)
            if (i <= 6 && isChow(suitCounts, i)) {
                const newCounts = deepCloneCounts(counts);
                newCounts[suit][i] -= 1;
                newCounts[suit][i + 1] -= 1;
                newCounts[suit][i + 2] -= 1;
                if (checkMelds(newCounts)) return true;
            }
        }
    }

    // Check honors for pungs
    for (const honorKey of Object.keys(counts.honor)) {
        if (isPung(counts.honor[honorKey])) {
            const newCounts = deepCloneCounts(counts);
            newCounts.honor[honorKey] -= 3;
            if (checkMelds(newCounts)) return true;
        }
    }

    // If we've processed all tiles, return true
    const allZero = [...counts.man, ...counts.pin, ...counts.bamboo, ...Object.values(counts.honor)]
        .every(count => count === 0);
    return allZero;
};

const isCompleteHand = (counts: TileUtils.TileCounts): boolean => {
    // Helper function to check if the remaining tiles form valid melds after removing a pair
    const checkWithPairRemoved = (suit: 'man' | 'pin' | 'bamboo', index: number) => {
        const newCounts = deepCloneCounts(counts);
        newCounts[suit][index] -= 2;
        return checkMelds(newCounts);
    };

    // Check for pairs in numbered suits (man, pin, bamboo)
    for (const suit of ['man', 'pin', 'bamboo'] as const) {
        for (let i = 0; i < counts[suit].length; i++) {
            if (isPair(counts[suit][i]) && checkWithPairRemoved(suit, i)) {
                return true;
            }
        }
    }

    // Check for pairs in honor tiles
    for (const honorKey of Object.keys(counts.honor)) {
        if (isPair(counts.honor[honorKey])) {
            const newCounts = deepCloneCounts(counts);
            newCounts.honor[honorKey] -= 2;
            if (checkMelds(newCounts)) {
                return true;
            }
        }
    }

    return false;
};

const isThirteenOrphans = (counts: TileUtils.TileCounts): boolean => {
    const required = [
        ['man', 0], ['man', 8],
        ['pin', 0], ['pin', 8],
        ['bamboo', 0], ['bamboo', 8],
        ['honor', 'dong'], ['honor', 'nan'], ['honor', 'xi'], ['honor', 'bei'],
        ['honor', 'bai'], ['honor', 'qing'], ['honor', 'hong']
    ] as const;

    let pairFound = false;

    for (const [suit, pos] of required) {
        const count =
            suit === 'honor'
                ? counts.honor[pos as keyof typeof counts.honor]
                : counts[suit][pos as number];

        if (count === 0) return false; // missing tile
        if (count > 1) {
            if (pairFound) return false; // more than one pair
            pairFound = true;
        }
    }

    return pairFound;
};

export const winningTiles = (userHand: TileUtils.Tile[]): TileUtils.Tile[] => {
    const result: TileUtils.Tile[] = [];
    const tileCounts = TileUtils.updateTileCounts(userHand);

    const canAddTile = (tile: TileUtils.Tile, counts: TileUtils.TileCounts): boolean => {
        if (tile.isSpecial) return counts.honor[tile.suit] < tile.maxCount;
        const index = tile.number - 1;
        if (tile.suit === 'man') return counts.man[index] < tile.maxCount;
        if (tile.suit === 'pin') return counts.pin[index] < tile.maxCount;
        if (tile.suit === 'bamboo') return counts.bamboo[index] < tile.maxCount;
        return false;
    };

    const addTileToCounts = (tile: TileUtils.Tile, counts: TileUtils.TileCounts): void => {
        if (tile.isSpecial) {
            counts.honor[tile.suit]++;
        } else {
            const index = tile.number - 1;
            switch (tile.suit) {
                case 'man': counts.man[index]++; break;
                case 'pin': counts.pin[index]++; break;
                case 'bamboo': counts.bamboo[index]++; break;
            }
        }
    };

    const tryAddAndCheck = (
        tile: TileUtils.Tile,
        checkFn: (counts: TileUtils.TileCounts) => boolean
    ) => {
        const clonedCounts = deepCloneCounts(tileCounts);
        if (!canAddTile(tile, clonedCounts)) return;
        addTileToCounts(tile, clonedCounts);
        if (checkFn(clonedCounts)) {
            result.push(tile);
        }
    };

    // Thirteen Orphans check
    TileUtils.thirteenOrphans.forEach(tile => {
        tryAddAndCheck(tile, isThirteenOrphans);
    });

    // Regular hand check
    TileUtils.allTiles.forEach(tile => {
        tryAddAndCheck(tile, isCompleteHand);
    });

    return result;
};
