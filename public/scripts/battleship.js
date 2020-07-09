import { createTotalGridDiv, createBoard } from "./components/makeBoard.js";
import { createShipDiv } from "./components/makeShips.js";
import { PLAYER1, PLAYER2 } from "./components/constants.js";
import { Ship, Player } from "./components/classes.js";

const placePlayer1Ships = () => {
  for (let ship in PLAYER1.ships) {
    PLAYER1.ships[ship].createShips();
  }
};
const placePlayer2Ships = () => {
  for (let ship in PLAYER2.ships) {
    PLAYER2.ships[ship].createShips();
  }
};

const click1Handler = () => {
  for (let ship in PLAYER1.ships) {
    if (PLAYER1.ships[ship].positionComplete === false) {
      return;
    }
  }
  placePlayer2Ships();
  PLAYER1.fullyPlaced = true;
  return;
};

const createGuessInput = () => {
  $(".ship-wrapper").after(
    ($(
      document.createElement("div")
    ).innerHTML = `<button type='button' class="btn btn-primary" id="submit-button">Primary </button> `)
  );

  document
    .getElementById(`submit-button`)
    .addEventListener("click", click1Handler);
};

const mainFunction = function () {
  createTotalGridDiv();
  createBoard(10, 1);
  createBoard(10, 2);
  createShipDiv(1);
  createShipDiv(2);

  placePlayer1Ships();

  createGuessInput();
};

mainFunction();
