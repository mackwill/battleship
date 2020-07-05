import { createTotalGridDiv, createBoard } from "./components/makeBoard.js";
import { createShipDiv, createShips } from "./components/ships.js";
import { PLAYER1SHIPS } from "./components/constants.js";

// What i basically need is:
// if ($(`#${el.target.id}`).attr("filled") === "false" && clicks > 1) {
//   let firstRow = Object.keys(PLAYER1SHIPS.carrier.position)[0]
//     .split("-")[0]
//     .charCodeAt(0);
//   let firstCol = Number(
//     Object.keys(PLAYER1SHIPS.carrier.position)[0].split("-")[1]
//   );

//   let currentRow = el.target.id.split("-")[0].charCodeAt(0);
//   let currentCol = Number(el.target.id.split("-")[1]);

//   let rowDif = Math.abs(firstRow - currentRow);
//   let colDif = Math.abs(firstCol - currentCol);

//   if(rowDif < 5 && colDif === 0) {

//   }
// }

// Two possibilities for checking that ships are placed in a line
//  First (and simpler but uglier idea i think) way is to just simply check if the adjacent square is filled by the same ship elem
//  Second way would be to have maybe a while loop that checks while clicks is less than ship length, check

let clicks = 0;
$(document).on("click", ".carrier-wrapper", (e) => {
  $(document).one("click", ".grid-item", (el) => {
    if ($(`#${el.target.id}`).attr("filled") === "false") {
      if (clicks > 0) {
        console.log(
          "If statement checking that clicks is greater than 1 executes"
        );
        let prevRow = Object.keys(PLAYER1SHIPS.carrier.position)
          [clicks - 1].split("-")[0]
          .charCodeAt(0);
        let prevCol = Number(
          Object.keys(PLAYER1SHIPS.carrier.position)[clicks - 1].split("-")[1]
        );

        // Find the difference of the first placed element to the
        let currentRow = el.target.id.split("-")[0].charCodeAt(0);
        let currentCol = Number(el.target.id.split("-")[1]);

        let rowDif = Math.abs(prevRow - currentRow);
        let colDif = Math.abs(prevCol - currentCol);

        console.log("rowDif: ", rowDif);
        console.log("colDif: ", colDif);

        if ((rowDif < 5 && colDif === 0) || (colDif < 5 && rowDif === 0)) {
          console.log("if statement checking row and column diff works works");
          $(`#${el.target.id}`)
            .attr("filled", "true")
            .css({ backgroundColor: "orange" });
          PLAYER1SHIPS.carrier.position[el.target.id] = false;
          console.log("PLAYER1SHIPS: ", PLAYER1SHIPS.carrier);

          $(`#${e.target.id}`).css({ display: "none" });
          clicks++;
        }
      }
      //
      else {
        $(`#${el.target.id}`)
          .attr("filled", "true")
          .css({ backgroundColor: "orange" });
        PLAYER1SHIPS.carrier.position[el.target.id] = false;
        console.log("PLAYER1SHIPS: ", PLAYER1SHIPS.carrier);

        $(`#${e.target.id}`).css({ display: "none" });
        clicks++;
      }
      console.log("clicks: ", clicks);
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
