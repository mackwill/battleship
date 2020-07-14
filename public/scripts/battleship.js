import { createTotalGridDiv, createBoard } from "./components/makeBoard.js";
import { createShipDiv } from "./components/makeShips.js";
import { PLAYER1, PLAYER2 } from "./components/constants.js";
// import { Player } from "./components/classes.js";

const placePlayerShips = (player) => {
  for (let ship in player.ships) {
    player.ships[ship].createShips();
  }
};

// Activate player 2 ships once all of player 1 ships are placed
const revertCellColor = (player) => {
  console.log("revert cell");
  for (let ship in player.ships) {
    Object.keys(player.ships[ship].position).forEach((pos) => {
      $(`#${pos}`).css({ backgroundColor: "lightblue" });
    });
  }
};

const click1Handler = () => {
  if (!PLAYER1.fullyPlaced) {
    for (let ship in PLAYER1.ships) {
      if (PLAYER1.ships[ship].positionComplete === false) {
        return;
      }
    }
    PLAYER1.fullyPlaced = true;
    placePlayerShips(PLAYER2);
    revertCellColor(PLAYER1);
  }

  return;
};

// Activate the guess form once all of player 2 ships are placed
const click2Handler = () => {
  if (!PLAYER2.fullyPlaced) {
    for (let ship in PLAYER2.ships) {
      if (PLAYER2.ships[ship].positionComplete === false) {
        return;
      }
    }
    PLAYER2.fullyPlaced = true;
    revertCellColor(PLAYER2);
    $(".guessContainer").attr({ class: "visible" });
    PLAYER1.activeTurn = true;
    $("#guessButton").on("click", clickGuess);
    return;
  }
};

// Check if ship has been hit, then if ship has been sunk
// then if all ships have been sunk. If all have been
// sunk, then end the game. If not, change player turn
const areAllShipsSunk = (player) => {
  for (let ship in player.ships) {
    if (player.ships[ship].sunk === false) {
      return false;
    }
  }
  return true;
};

// Return the hit ship object
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
  console.log(`Player ${player.playerNum} ${ship} has been sunk`);
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
    // alert(`Congratulations player ${attackingPlayer}, you have won!`);
    // $("#win-game-modal").slideDown("slow");
    $("#win-game-modal").modal("show");
    // return `Player ${attackingPlayer.playerNum} has won the game!`;
    return;
  }

  attackingPlayer.activeTurn = false;
  idlePlayer.activeTurn = true;
  return `Player ${idlePlayer.playerNum} turn`;
};

const clickGuess = () => {
  const colGuess = $("#colSelect").val();
  const rowGuess = $("#rowSelect").val();

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

const createGuessInput = (playerObj) => {
  $(`.player${playerObj.playerNum}-ship-wrapper`).after(
    ($(
      document.createElement("div")
    ).innerHTML = `<button type='button' class="btn btn-primary" id="submit-button-${playerObj.playerNum}">Primary </button> `)
  );

  playerObj === PLAYER1
    ? $(`#submit-button-${playerObj.playerNum}`).on("click", click1Handler)
    : $(`#submit-button-${playerObj.playerNum}`).on("click", click2Handler);
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
