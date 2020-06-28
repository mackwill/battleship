const createBoard = (boardSize, player) => {
  let board = [];
  // Create 2 tables 10 x 10
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = [];
    }
  }

  $("body").append(
    $(document.createElement("div")).attr({
      class: "grid-container",
      id: `${player}-grid`,
    })
  );

  // $(".grid-container").css(
  //   "grid-template-columns",
  //   `repeat(${boardSize}, 50px)`
  // );
  for (let i = 1; i <= boardSize; i++) {
    for (let j = 1; j <= boardSize; j++) {
      $(`#${player}-grid`).append(
        $(document.createElement("div"))
          .attr({
            class: "grid-item",
            id: `player${player}-item${i}`,
          })
          .css({
            gridColumn: j,
            gridRow: i,
          })
      );
    }
  }
};

// const takeShot = (playerBoard, guess) => {
//   return (playerBoard[guess[0]][guess[1]] = "x");
// };

// const findShipLength = (shipType) => {
//   switch (shipType) {
//     case "carrier":
//       return 5;
//     case "battleship":
//       return 4;
//     case "cruiser":
//     case "submarine":
//       return 3;
//     case "destroyer":
//       return 2;
//   }
// };

// const findEndCord = (startCoord, shipDirection, shipLength) => {
//   let xCord = startCoord[0];
//   let yCord = startCoord[1];

//   switch (shipDirection) {
//     case "N":
//       yCord += shipLength;
//       break;
//     case "S":
//       yCord -= shipLength;
//       break;
//     case "E":
//       xCord += shipLength;
//       break;
//     case "W":
//       xCord -= shipLength;
//   }

//   return [xCord, yCord];
// };

// const placeShip = (shipType, start, endCoord, playerBoard, player) => {
//   console.log(
//     `Player ${player} has placed their ${shipType} on squares [${start}]`
//   );

//   // Define the positions that the ship takes up
// };

// const battleship = () => {
//   const player1Board = createBoard(10);
//   const player2Board = createBoard(10);

//   //Place a ship
//   let endCoord = findEndCord([5, 4], "N");

//   takeShot(player1Board, [5, 4]);
//   console.log(player1Board);
// };

// battleship();
