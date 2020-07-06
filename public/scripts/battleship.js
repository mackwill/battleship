import { createTotalGridDiv, createBoard } from "./components/makeBoard.js";
// import { createShipDiv, createShips } from "./components/ships.js";
import { createShipDiv } from "./components/ships.js";

// import { PLAYER1SHIPS } from "./components/constants.js";
import { Ship } from "./components/classes.js";

const mainFunction = function () {
  createTotalGridDiv();
  createBoard(10, 1);
  createBoard(10, 2);
  createShipDiv();
  const carrier = new Ship("carrier", 5);
  carrier.createShips();
  const battleship = new Ship("battleship", 4);
  battleship.createShips();
  const cruiser = new Ship("cruiser", 3);
  cruiser.createShips();
  const submarine = new Ship("submarine", 3);
  submarine.createShips();
  const destroyer = new Ship("destroyer", 2);
  destroyer.createShips();

  console.log("carrier: ", carrier);
};

mainFunction();
