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

    document
      .getElementById(`${this.name}-wrapper-${this.player}`)
      .addEventListener("click", this.onClick);

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

  getGridPositions = function (loggedPosition, currentPosition, clicks) {
    const firstRow = Object.keys(loggedPosition)[0].split("-")[0].charCodeAt(0);
    const firstCol = Number(Object.keys(loggedPosition)[0].split("-")[1]);

    const prevRow = Object.keys(loggedPosition)
      [clicks - 1].split("-")[0]
      .charCodeAt(0);
    const prevCol = Number(
      Object.keys(loggedPosition)[clicks - 1].split("-")[1]
    );

    const currentRow = currentPosition.split("-")[0].charCodeAt(0);
    const currentCol = Number(currentPosition.split("-")[1]);

    return { firstRow, firstCol, prevRow, prevCol, currentRow, currentCol };
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
    $(document).on("click", `#${this.name}-wrapper-${this.player}`, (event) => {
      let currentPlayer = null;
      if (this.player === 1) {
        currentPlayer = PLAYER1;
      } else {
        currentPlayer = PLAYER2;
      }
      let clicks = Object.keys(this.position).length;
      $(document).one("click", `.grid-item-player${this.player}`, (e) => {
        if ($(`#${e.target.id}`).attr("filled") === "false") {
          if (clicks > 0) {
            const {
              firstRow,
              firstCol,
              prevRow,
              prevCol,
              currentRow,
              currentCol,
            } = this.getGridPositions(this.position, e.target.id, clicks);

            const { rowDif, colDif } = this.findCurrentPosDifs(
              prevCol,
              prevRow,
              currentCol,
              currentRow
            );

            const { totalRowDif, totalColDif } = this.findTotalPosDifs(
              firstCol,
              firstRow,
              currentCol,
              currentRow
            );

            if (
              (totalColDif === 0 && colDif === 0 && totalRowDif < this.size) ||
              (totalRowDif === 0 && rowDif === 0 && totalColDif < this.size)
            ) {
              this.updatePositionedShip(e.target.id, clicks);
              clicks++;
            }
          } else {
            this.updatePositionedShip(e.target.id, clicks);
            clicks++;
          }
        }
      });
    });
  }
}
