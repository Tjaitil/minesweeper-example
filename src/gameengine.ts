import { board, tile, gameState } from "./types";
import { reactive, ref } from "vue";

const GAME_PIECES = {
  board: <board>reactive({
    rows: 8,
    columns: 8,
    height: 8 * 32,
    width: 8 * 32,
    tiles: [],
    bombs: 4,
    maxTiles: 0,
  }),
  remainingBombs: 0,
  flags: ref(0),
  tilesClicked: ref(0),
};

const GAME_ENGINE = {
  status: ref(gameState.PLAYING),
  gameId: ref("A"),
  makeBoard() {
    if (GAME_PIECES.board.tiles.length === 0) {
      for (let r = 0; r < GAME_PIECES.board.rows; r++) {
        for (let c = 0; c < GAME_PIECES.board.columns; c++) {
          GAME_PIECES.board.tiles.push({
            id: (GAME_PIECES.board.columns * r) + c,
            x: c,
            y: r,
            clicked: false,
            isBomb: false,
            nearbyBombNumber: 0,
            flagged: false,
          });
        }
      }
    } else {
    }
  },
  implementBombs() {
    function getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    if (GAME_PIECES.remainingBombs > 0) {
      let random = getRandomInt(0, GAME_PIECES.board.maxTiles);
      if (GAME_PIECES.board.tiles[random].isBomb) {
        this.implementBombs();
      }
      GAME_PIECES.board.tiles[random].isBomb = true;
      GAME_PIECES.remainingBombs--;
      if (GAME_PIECES.remainingBombs > 0) {
        this.implementBombs();
      }
    } else {
      return;
    }
  },
  setup(rows: number, columns: number, bombs: number) {
    // Calculate rows;
    // 2
    GAME_ENGINE.gameId.value += "A";
    GAME_PIECES.tilesClicked.value = 0;
    GAME_PIECES.flags.value = 0;

    GAME_PIECES.board.rows = rows;
    GAME_PIECES.board.columns = columns;
    GAME_PIECES.board.bombs = bombs;
    GAME_PIECES.remainingBombs = bombs;
    GAME_PIECES.board.width = columns * 32;
    GAME_PIECES.board.maxTiles = rows * columns;
    GAME_ENGINE.status.value = gameState.PLAYING;
    GAME_ENGINE.makeBoard();
    GAME_PIECES.board.tiles.forEach(tile => tile.isBomb = false);
    GAME_ENGINE.implementBombs();
    GAME_PIECES.board.tiles.forEach((tile) => {
      tile.clicked = false;
      tile.flagged = false;
      tile.nearbyBombNumber = GAME_ENGINE.calculateNearbyBombsNumber(tile);
    });
  },
  calculateNearbyBombsNumber(tile: tile): number {
    let nearbyTiles = GAME_UTILITIES.retrieveTilesAround(tile);
    let bombs = nearbyTiles.filter((tile) => tile.isBomb === true);
    return bombs.length;
  },
};

const GAME_UTILITIES = {
  retrieveTilesAround(tile: tile): Array<tile> {
    let nearbyTiles: Array<tile> = [];

    let column = GAME_PIECES.board.columns;
    let furthestX = GAME_PIECES.board.columns - 1;

    // Add upper left tile
    GAME_PIECES.board.tiles[tile.id - column - 1] !== undefined && tile.x !== 0
      ? nearbyTiles.push(GAME_PIECES.board.tiles[tile.id - column - 1])
      : "";

    // Add tile directly above
    GAME_PIECES.board.tiles[tile.id - column] !== undefined
    ? nearbyTiles.push(GAME_PIECES.board.tiles[tile.id - column])
    : "";

    // Add tile upper right tile
    tile.x !== furthestX && GAME_PIECES.board.tiles[tile.id - column + 1] !== undefined
    ? nearbyTiles.push(GAME_PIECES.board.tiles[tile.id - column + 1])
    : "";

    // ADD left tile
    tile.x !== 0
      ? nearbyTiles.push(GAME_PIECES.board.tiles[tile.id - 1])
      : "";

    // Add right tile
    tile.x !== furthestX
      ? nearbyTiles.push(GAME_PIECES.board.tiles[tile.id + 1])
      : "";

    // Add lower left tile
    GAME_PIECES.board.tiles[tile.id + column - 1] !== undefined && tile.x !== 0
      ? nearbyTiles.push(GAME_PIECES.board.tiles[tile.id + column - 1])
      : "";

    // Add tile directly under
    GAME_PIECES.board.tiles[tile.id + column] !== undefined
    ? nearbyTiles.push(GAME_PIECES.board.tiles[tile.id + column])
    : "";

    // Add tile lower right tile
    tile.x !== furthestX && GAME_PIECES.board.tiles[tile.id + column + 1] !== undefined 
    ? nearbyTiles.push(GAME_PIECES.board.tiles[tile.id + column + 1])
    : "";

    return nearbyTiles;
  },
};

const EVENT_HANDLERS = {
  checkNearby(tile: tile) {
    let nearbyTiles = GAME_UTILITIES.retrieveTilesAround(tile);
    nearbyTiles.forEach((tile) => {
      if (tile.clicked || tile.flagged) return;
      tile.clicked = true;
      if(tile.isBomb && !tile.flagged) {
        GAME_ENGINE.status.value = gameState.LOSS;
      }
      GAME_PIECES.tilesClicked.value++;
      // If tile is 0 reveal all neighbour tiles and also check neighbour tiles
      if (tile.nearbyBombNumber === 0) {
        this.checkNearby(tile);
      }
    });
  },
  checkTile(tile: tile) {
    if (tile.flagged || GAME_ENGINE.status.value !== "playing") return;
    else if (!tile.clicked) {
      tile.clicked = true;
      GAME_PIECES.tilesClicked.value++;
    }

    if (!tile.isBomb) {
      if (
        tile.nearbyBombNumber === 0 ||
        EVENT_HANDLERS.findNearbyFlagged(tile) === tile.nearbyBombNumber
      ) {
        EVENT_HANDLERS.checkNearby(tile);
      }
    } else if (tile.isBomb) {
      GAME_ENGINE.status.value = gameState.LOSS;
    }
  },
  findNearbyFlagged(tile: tile): number {
    let nearbyTiles = GAME_UTILITIES.retrieveTilesAround(tile);

    let flaggedTiles = nearbyTiles.filter((tile) => tile.flagged === true);

    return flaggedTiles.length;
  },
  flagTile(tile: tile) {
    if (tile.clicked) return false;
    tile.flagged = !tile.flagged;
    if (tile.flagged) {
      GAME_PIECES.flags.value++;
    } else {
      GAME_PIECES.flags.value--;
    }
  },
};

export { GAME_PIECES, GAME_ENGINE, GAME_UTILITIES, EVENT_HANDLERS };
