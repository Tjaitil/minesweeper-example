export type board = {
    rows: number,
    columns: number,
    width: number,
    height: number,
    tiles: tile[],
    bombs: number,
    maxTiles: number,
}

export type tile = {
    id: number,
    x: number,
    y: number,
    clicked: boolean,
    isBomb: boolean,
    nearbyBombNumber: number,
    flagged: boolean,
}

export enum gameState {
    PLAYING = 'playing',
    WIN = 'win',
    LOSS = 'loss',
}