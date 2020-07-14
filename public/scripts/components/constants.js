import { Ship } from "./classes.js";

export const PLAYER1 = {
  playerNum: 1,
  ships: {
    carrier: new Ship("carrier", 5, 1),
    battleship: new Ship("battleship", 4, 1),
    cruiser: new Ship("cruiser", 3, 1),
    submarine: new Ship("submarine", 3, 1),
    destroyer: new Ship("destroyer", 2, 1),
  },
  fullyPlaced: false,
  activeTurn: false,
  activeShip: null,
};

export const PLAYER2 = {
  playerNum: 2,
  ships: {
    carrier: new Ship("carrier", 5, 2),
    battleship: new Ship("battleship", 4, 2),
    cruiser: new Ship("cruiser", 3, 2),
    submarine: new Ship("submarine", 3, 2),
    destroyer: new Ship("destroyer", 2, 2),
  },
  fullyPlaced: false,
  activeTurn: false,
  activeShip: null,
};
