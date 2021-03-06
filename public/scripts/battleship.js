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

const click1Handler = function () {
  for (let ship in PLAYER1.ships) {
    if (PLAYER1.ships[ship].positionComplete === false) {
      return;
    }
  }
  PLAYER1.fullyPlaced = true;
  placePlayerShips(PLAYER2);
  revertCellColor(PLAYER1);

  $(this).css("display", "none");
  return;
};

// Activate the guess form once all of player 2 ships are placed
const click2Handler = function () {
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
  $(this).css("display", "none");

  return;
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
    $("#win-game-modal").modal("show");
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

const populateRowChoice = (boardSize) => {
  let startChar = 65;
  for (let i = 0; i < boardSize; i++) {
    $("#rowSelect").append(
      `<option value="${String.fromCharCode(
        startChar + i
      )}">${String.fromCharCode(startChar + i)}</option>`
    );
  }
};

const populateColChoice = (boardSize) => {
  for (let i = 1; i <= boardSize; i++) {
    $("#colSelect").append(`<option value="${i}">${i}</option>`);
  }
};

const checkShipPlacement = (activeShip, target) => {
  console.log(activeShip);
  let clicks = Object.keys(activeShip.position).length;

  if ($(`#${target}`).attr("filled") === "false") {
    if (clicks > 0) {
      const {
        firstRow,
        firstCol,
        prevRow,
        prevCol,
        currentRow,
        currentCol,
      } = activeShip.getGridPositions(target, clicks);

      const { rowDif, colDif } = activeShip.findCurrentPosDifs(
        prevCol,
        prevRow,
        currentCol,
        currentRow
      );

      const { totalRowDif, totalColDif } = activeShip.findTotalPosDifs(
        firstCol,
        firstRow,
        currentCol,
        currentRow
      );

      if (
        (totalColDif === 0 && colDif === 0 && totalRowDif < activeShip.size) ||
        (totalRowDif === 0 && rowDif === 0 && totalColDif < activeShip.size)
      ) {
        activeShip.updatePositionedShip(target, clicks);
      }
    } else {
      activeShip.updatePositionedShip(target, clicks);
    }
  }
};

$(document).on("click", `.grid-item`, (e) => {
  const player = e.target.id.split("-")[2];
  let activePlayer = null;
  if (PLAYER1.activeShip === null || !PLAYER2.activeShip === null) {
    return;
  }
  // console.log("player: ", player);

  if (Number(player) === 1) {
    activePlayer = PLAYER1;
  } else {
    activePlayer = PLAYER2;
  }

  if (activePlayer.activeShip === null) {
    return;
  }
  const activeShip = activePlayer.activeShip;
  checkShipPlacement(activeShip, e.target.id);
});

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
  populateColChoice(boardSize);
  populateRowChoice(boardSize);
  createGuessInput(PLAYER1);
  createGuessInput(PLAYER2);
};

mainFunction();
