const createBoard = (boardSize) => {
  let board = [];
  // Create 2 tables 10 x 10
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = [];
    }
  }
  return board;
};

const takeShot = (playerBoard, guess) => {
  return (playerBoard[guess[0]][guess[1]] = "x");
};

const battleship = () => {
  const player1Board = createBoard(10);
  const player2Board = createBoard(10);

  takeShot(player1Board, [5, 4]);
  console.log(player1Board);
};

battleship();
