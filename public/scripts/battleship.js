import { createTotalGridDiv, createBoard } from "./components/makeBoard.js";
import { createShipDiv } from "./components/makeShips.js";
import { PLAYER1, PLAYER2 } from "./components/constants.js";
import { Ship, Player } from "./components/classes.js";
// import missedShip from '../assets/miss-ship.png'

const placePlayerShips = (player) => {
  for (let ship in player.ships) {
    player.ships[ship].createShips();
  }
};

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
  $(".guessContainer").attr({ class: "visible" });
  PLAYER1.activeTurn = true;
  // addClickListenerToGuessButton();
  $("#guessButton").on("click", clickGuess);
  return;
};

// Click listener that handles the guess of the current active player, and then switches to the next player after submitting a guess

const areAllShipsSunk = (player) => {
  for (let ship in player.ships) {
    if (player.ships[ship].sunk === false) {
      return false;
    }
  }
  return true;
};

const findHitShip = (player, guess) => {
  for (let ship in player.ships) {
    if (player.ships[ship].position[guess] !== undefined) {
      player.ships[ship].position[guess] = true;
      $(`#${guess}`).css({ backgroundColor: "orange" });
      return ship;
    }
  }
  return false;
};

const isShipSunk = (player, ship) => {
  for (let elem in player.ships[ship].position) {
    if (player.ships[ship].position[elem] === false) {
      return false;
    }
  }
  player.ships[ship].sunk = true;
  console.log(`Player ${player.playerNum} has sunk your ${ship}`);
  return true;
};

const checkPlayerTurn = (attackingPlayer, idlePlayer, guess) => {
  const hitShip = findHitShip(idlePlayer, `${guess}`);

  if (hitShip === false) {
    return false;
  }

  const sunk = isShipSunk(idlePlayer, hitShip);
  const playerWin = areAllShipsSunk(idlePlayer);

  if (playerWin) {
    alert(`Congratulations player ${attackingPlayer}, you have won!`);
    return `Player ${attackingPlayer.playerNum} has won the game!`;
  } else {
    attackingPlayer.activeTurn = false;
    idlePlayer.activeTurn = true;
    return `Player ${idlePlayer.playerNum} turn`;
  }
};

const clickGuess = () => {
  const colSelected = document.getElementById("colSelect");
  const rowSelected = document.getElementById("rowSelect");
  const colGuess = colSelected.options[colSelected.selectedIndex].value;
  const rowGuess = rowSelected.options[rowSelected.selectedIndex].value;
  if (PLAYER1.activeTurn === true) {
    const guess = `${rowGuess}-${colGuess}-${PLAYER2.playerNum}`;
    checkPlayerTurn(PLAYER1, PLAYER2, guess);

    return;
  } else if (PLAYER2.activeTurn === true) {
    const guess = `${rowGuess}-${colGuess}-${PLAYER1.playerNum}`;
    checkPlayerTurn(PLAYER2, PLAYER1, guess);
  }
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
  const firstPlayer = 1;
  const secondPlayer = 2;
  const boardSize = 10;
  createTotalGridDiv();

  createBoard(boardSize, firstPlayer);
  createBoard(boardSize, secondPlayer);
  createShipDiv(firstPlayer);
  createShipDiv(secondPlayer);

  placePlayerShips(PLAYER1);

  createGuessInput(PLAYER1);
  createGuessInput(PLAYER2);
};

mainFunction();
