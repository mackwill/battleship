import { createTotalGridDiv, createBoard } from "./components/makeBoard.js";
import { createShipDiv } from "./components/makeShips.js";
import { PLAYER1, PLAYER2 } from "./components/constants.js";
import { Ship, Player } from "./components/classes.js";

const placePlayerShips = (player) => {
  for (let ship in player.ships) {
    player.ships[ship].createShips();
  }
};
// const placePlayer2Ships = () => {
//   for (let ship in PLAYER2.ships) {
//     PLAYER2.ships[ship].createShips();
//   }
// };

const click1Handler = () => {
  console.log("click1");
  for (let ship in PLAYER1.ships) {
    if (PLAYER1.ships[ship].positionComplete === false) {
      return;
    }
  }
  PLAYER1.fullyPlaced = true;
  placePlayerShips(PLAYER2);
  revertCellColor(PLAYER1);

  return;
};

const click2Handler = () => {
  console.log("click2");
  for (let ship in PLAYER2.ships) {
    if (PLAYER2.ships[ship].positionComplete === false) {
      return;
    }
  }
  PLAYER2.fullyPlaced = true;
  revertCellColor(PLAYER2);

  return;
};

const revertCellColor = (player) => {
  console.log("revert cell");
  for (let ship in player.ships) {
    Object.keys(player.ships[ship].position).forEach((pos) => {
      $(`#${pos}`).css({ backgroundColor: "lightblue" });
    });
  }
};

const createGuessInput = (playerObj) => {
  $(`.player${playerObj.playerNum}-ship-wrapper`).after(
    ($(
      document.createElement("div")
    ).innerHTML = `<button type='button' class="btn btn-primary" id="submit-button-${playerObj.playerNum}">Primary </button> `)
  );

  console.log("check condition: ", playerObj === PLAYER1);
  if (playerObj === PLAYER1) {
    document
      .getElementById(`submit-button-${playerObj.playerNum}`)
      .addEventListener("click", click1Handler);
  } else {
    document
      .getElementById(`submit-button-${playerObj.playerNum}`)
      .addEventListener("click", click2Handler);
  }
};

const mainFunction = function () {
  createTotalGridDiv();
  createBoard(10, 1);
  createBoard(10, 2);
  createShipDiv(1);
  createShipDiv(2);

  placePlayerShips(PLAYER1);

  createGuessInput(PLAYER1);
  createGuessInput(PLAYER2);
};

mainFunction();
