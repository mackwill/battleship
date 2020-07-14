// const onClick = function (event) {
//   console.log("this clicked");
// };

export class Board {
  constructor(playerNum, boardSize) {
    this.playerNum = playerNum;
    this.boardSize = boardSize;
    this.click = this.click.bind(this);
    console.log(this);
  }

  click(event) {
    console.log(this);
  }

  createBoard = function () {
    let rowPos = 1;
    $(`#player${this.playerNum}-title`).after(
      $(document.createElement("div")).attr({
        class: "grid-container",
        id: `player${this.playerNum}-grid`,
      })
    );

    for (let i = 1; i <= this.boardSize; i++) {
      let colPos = 65;
      let colNum = 1;

      for (let j = 1; j <= this.boardSize; j++) {
        $(`#player${this.playerNum}-grid`).append(
          $(document.createElement("div"))
            .attr({
              class: `grid-item grid-item-player${this.playerNum}`,
              id: `${String.fromCharCode(colPos)}-${rowPos}-${this.playerNum}`,
              row: colNum,
              col: rowPos,
              filled: false,
            })
            .css({
              gridColumn: j,
              gridRow: i,
            })
        );
        colPos++;
      }
      rowPos++;
    }
  };

  //   $(document).on("click", `.grid-item-player${this.player}`, (e) => {
  //     console.log("something clicked ");
  //     let clicks = Object.keys(this.position).length;
  //     // console.log("e target", e.target);
  //     if ($(`#${e.target.id}`).attr("filled") === "false") {
  //       if (clicks > 0) {
  //         let firstRow = Object.keys(this.position)[0]
  //           .split("-")[0]
  //           .charCodeAt(0);
  //         let firstCol = Number(Object.keys(this.position)[0].split("-")[1]);
  //         let prevRow = Object.keys(this.position)
  //           [clicks - 1].split("-")[0]
  //           .charCodeAt(0);
  //         let prevCol = Number(
  //           Object.keys(this.position)[clicks - 1].split("-")[1]
  //         );

  //         let currentRow = e.target.id.split("-")[0].charCodeAt(0);
  //         let currentCol = Number(e.target.id.split("-")[1]);

  //         let rowDif = Math.abs(prevRow - currentRow);
  //         let colDif = Math.abs(prevCol - currentCol);

  //         let totalRowDif = Math.abs(firstRow - currentRow);
  //         let totalColDif = Math.abs(firstCol - currentCol);

  //         if (
  //           (totalColDif === 0 && colDif === 0 && totalRowDif < this.size) ||
  //           (totalRowDif === 0 && rowDif === 0 && totalColDif < this.size)
  //         ) {
  //           $(`#${e.target.id}`)
  //             .attr("filled", "true")
  //             .css({ backgroundColor: "orange" });
  //           this.position[e.target.id] = false;

  //           $(`#${this.name}-${clicks + 1}-player${this.player}`).css({
  //             opacity: "0.5",
  //           });
  //           console.log(`#${this.name}-${clicks}-player${this.player}`);
  //           // $(`#${event.target.id}`).css({ opacity: "0.5" });
  //           this.fullyPlaced();
  //           clicks++;
  //         }
  //       } else {
  //         $(`#${e.target.id}`)
  //           .attr("filled", "true")
  //           .css({ backgroundColor: "orange" });
  //         this.position[e.target.id] = false;

  //         $(`#${this.name}-${clicks + 1}-player${this.player}`).css({
  //           opacity: "0.5",
  //         });

  //         console.log(`#${this.name}-${clicks}-player${this.player}`);
  //         clicks++;
  //       }
  //     }
  //   });
  // }

  // createShips = function () {
  //   this.ships["carrier"] = new Ship("carrier", 5, this.playerNum);
  //   this.ships["battleship"] = new Ship("battleship", 4, this.playerNum);
  //   this.ships["cruiser"] = new Ship("cruiser", 3, this.playerNum);
  //   this.ships["submarine"] = new Ship("submarine", 3, this.playerNum);
  //   this.ships["destroyer"] = new Ship("destroyer", 2, this.playerNum);
  // };
}

//   $(document).on("click", `.grid-item-player${this.player}`, (e) => {
//     console.log("something clicked ");
//     let clicks = Object.keys(this.position).length;
//     // console.log("e target", e.target);
//     if ($(`#${e.target.id}`).attr("filled") === "false") {
//       if (clicks > 0) {
//         let firstRow = Object.keys(this.position)[0]
//           .split("-")[0]
//           .charCodeAt(0);
//         let firstCol = Number(Object.keys(this.position)[0].split("-")[1]);
//         let prevRow = Object.keys(this.position)
//           [clicks - 1].split("-")[0]
//           .charCodeAt(0);
//         let prevCol = Number(
//           Object.keys(this.position)[clicks - 1].split("-")[1]
//         );

//         let currentRow = e.target.id.split("-")[0].charCodeAt(0);
//         let currentCol = Number(e.target.id.split("-")[1]);

//         let rowDif = Math.abs(prevRow - currentRow);
//         let colDif = Math.abs(prevCol - currentCol);

//         let totalRowDif = Math.abs(firstRow - currentRow);
//         let totalColDif = Math.abs(firstCol - currentCol);

//         if (
//           (totalColDif === 0 && colDif === 0 && totalRowDif < this.size) ||
//           (totalRowDif === 0 && rowDif === 0 && totalColDif < this.size)
//         ) {
//           $(`#${e.target.id}`)
//             .attr("filled", "true")
//             .css({ backgroundColor: "orange" });
//           this.position[e.target.id] = false;

//           $(`#${this.name}-${clicks + 1}-player${this.player}`).css({
//             opacity: "0.5",
//           });
//           console.log(`#${this.name}-${clicks}-player${this.player}`);
//           // $(`#${event.target.id}`).css({ opacity: "0.5" });
//           this.fullyPlaced();
//           clicks++;
//         }
//       } else {
//         $(`#${e.target.id}`)
//           .attr("filled", "true")
//           .css({ backgroundColor: "orange" });
//         this.position[e.target.id] = false;

//         $(`#${this.name}-${clicks + 1}-player${this.player}`).css({
//           opacity: "0.5",
//         });

//         console.log(`#${this.name}-${clicks}-player${this.player}`);
//         clicks++;
//       }
//     }
//   });
// }

// const onClick = function (event) {
//   console.log("this", event);
// };

// $(document).ready(() => {
//   $(document).on("click", onClick);
// });
