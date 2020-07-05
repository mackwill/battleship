import { createTotalGridDiv, createBoard } from "./components/makeBoard.js";
import { createShipDiv, createShips } from "./components/ships.js";
import { PLAYER1SHIPS } from "./components/constants.js";

// let clicks = 0;
// $(document).on("click", ".carrier-wrapper", (e) => {
//   $(document).one("click", ".grid-item", (el) => {
//     if ($(`#${el.target.id}`).attr("filled") === "false") {
//       if (clicks > 0) {
//         let prevRow = Object.keys(PLAYER1SHIPS.carrier.position)
//           [clicks - 1].split("-")[0]
//           .charCodeAt(0);
//         let prevCol = Number(
//           Object.keys(PLAYER1SHIPS.carrier.position)[clicks - 1].split("-")[1]
//         );

//         let currentRow = el.target.id.split("-")[0].charCodeAt(0);
//         let currentCol = Number(el.target.id.split("-")[1]);

//         let rowDif = Math.abs(prevRow - currentRow);
//         let colDif = Math.abs(prevCol - currentCol);

//         if ((rowDif < 5 && colDif === 0) || (colDif < 5 && rowDif === 0)) {
//           $(`#${el.target.id}`)
//             .attr("filled", "true")
//             .css({ backgroundColor: "orange" });
//           PLAYER1SHIPS.carrier.position[el.target.id] = false;
//           console.log("PLAYER1SHIPS: ", PLAYER1SHIPS.carrier);

//           $(`#${e.target.id}`).css({ display: "none" });
//           clicks++;
//         }
//       } else {
//         $(`#${el.target.id}`)
//           .attr("filled", "true")
//           .css({ backgroundColor: "orange" });
//         PLAYER1SHIPS.carrier.position[el.target.id] = false;

//         $(`#${e.target.id}`).css({ display: "none" });
//         clicks++;
//       }
//     }
//   });
// });

$(document).on("click", ".ship", (e) => {
  let currentShip = e.target.className.split("-")[0];
  let clicks = Object.keys(PLAYER1SHIPS[currentShip].position).length;
  $(document).one("click", ".grid-item", (el) => {
    if ($(`#${el.target.id}`).attr("filled") === "false") {
      if (clicks > 0) {
        let firstRow = Object.keys(PLAYER1SHIPS[currentShip].position)[0]
          .split("-")[0]
          .charCodeAt(0);
        let firstCol = Number(
          Object.keys(PLAYER1SHIPS[currentShip].position)[0].split("-")[1]
        );
        let prevRow = Object.keys(PLAYER1SHIPS[currentShip].position)
          [clicks - 1].split("-")[0]
          .charCodeAt(0);
        let prevCol = Number(
          Object.keys(PLAYER1SHIPS[currentShip].position)[clicks - 1].split(
            "-"
          )[1]
        );

        let currentRow = el.target.id.split("-")[0].charCodeAt(0);
        let currentCol = Number(el.target.id.split("-")[1]);

        let rowDif = Math.abs(prevRow - currentRow);
        let colDif = Math.abs(prevCol - currentCol);

        let totalRowDif = Math.abs(firstRow - currentRow);
        let totalColDif = Math.abs(firstCol - currentCol);

        if (
          (rowDif < PLAYER1SHIPS[currentShip].size &&
            colDif === 0 &&
            totalRowDif < PLAYER1SHIPS[currentShip].size) ||
          (colDif < PLAYER1SHIPS[currentShip].size &&
            rowDif === 0 &&
            totalColDif < PLAYER1SHIPS[currentShip].size)
        ) {
          $(`#${el.target.id}`)
            .attr("filled", "true")
            .css({ backgroundColor: "orange" });
          PLAYER1SHIPS[currentShip].position[el.target.id] = false;

          $(`#${e.target.id}`).css({ display: "none" });
          clicks++;
        }
      } else {
        $(`#${el.target.id}`)
          .attr("filled", "true")
          .css({ backgroundColor: "orange" });
        PLAYER1SHIPS[currentShip].position[el.target.id] = false;

        $(`#${e.target.id}`).css({ display: "none" });
        clicks++;
      }
    }
  });
});

const mainFunction = function () {
  createTotalGridDiv();
  createBoard(10, 1);
  createBoard(10, 2);
  createShipDiv();
  createShips("carrier", 5);
  createShips("battleship", 4);
  createShips("cruiser", 3);
  createShips("submarine", 3);
  createShips("destroyer", 2);
};

mainFunction();
