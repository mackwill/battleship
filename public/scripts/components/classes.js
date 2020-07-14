import { PLAYER1, PLAYER2 } from "./constants.js";

export class Ship {
  constructor(name, size, player) {
    this.player = player;
    this.name = name;
    this.sunk = false;
    this.positionComplete = false;
    this.position = {};
    this.size = size;
    this.onClick = this.onClick.bind(this);
  }

  createShips = () => {
    $(`.player${this.player}-ship-wrapper`).append(
      $(document.createElement("div")).attr({
        class: `${this.name}-wrapper ship-player${this.player}`,
        id: `${this.name}-wrapper-${this.player}`,
      })
    );

    // document
    //   .getElementById(`${this.name}-wrapper-${this.player}`)
    //   .addEventListener("click", this.onClick);

    $(document).on(
      "click",
      `#${this.name}-wrapper-${this.player}`,
      this.onClick
    );

    for (let i = 0; i < this.size; i++) {
      $(`#${this.name}-wrapper-${this.player}`).append(
        $(document.createElement("div")).attr({
          class: `${this.name}-elem ship-elem`,
          id: `${this.name}-${i + 1}-player${this.player}`,
        })
      );
    }
  };

  fullyPlaced = (e) => {
    if (Object.keys(this.position).length === this.size) {
      this.positionComplete = true;
    }
  };

  getGridPositions = function (currentPosition, clicks) {
    const firstRow = Object.keys(this.position)[0].split("-")[0].charCodeAt(0);
    const firstCol = Number(Object.keys(this.position)[0].split("-")[1]);

    const prevRow = Object.keys(this.position)
      [clicks - 1].split("-")[0]
      .charCodeAt(0);
    const prevCol = Number(
      Object.keys(this.position)[clicks - 1].split("-")[1]
    );

    const currentRow = currentPosition.split("-")[0].charCodeAt(0);
    const currentCol = Number(currentPosition.split("-")[1]);

    return { firstRow, firstCol, prevRow, prevCol, currentRow, currentCol };
  };

  findCurrentPosDifs = function (prevCol, prevRow, currentCol, currentRow) {
    const rowDif = Math.abs(prevRow - currentRow);
    const colDif = Math.abs(prevCol - currentCol);
    return { rowDif, colDif };
  };

  findTotalPosDifs = function (firstCol, firstRow, currentCol, currentRow) {
    const totalRowDif = Math.abs(firstRow - currentRow);
    const totalColDif = Math.abs(firstCol - currentCol);

    return { totalRowDif, totalColDif };
  };

  updatePositionedShip = function (target, clicks) {
    $(`#${target}`).attr("filled", "true").css({ backgroundColor: "orange" });
    this.position[target] = false;

    $(`#${this.name}-${clicks + 1}-player${this.player}`).css({
      opacity: "0.5",
    });
    if (clicks > 0) {
      this.fullyPlaced();
    }
  };

  onClick(event) {
    console.log("this");
    let currentPlayer = null;
    if (this.player === 1) {
      currentPlayer = PLAYER1;
    } else {
      currentPlayer = PLAYER2;
    }
    currentPlayer.activeShip = this;
  }
}
