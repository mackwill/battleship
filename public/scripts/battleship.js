import { createTotalGridDiv, createBoard } from "./components/makeBoard.js";
import { createShipDiv, createShips } from "./components/ships.js";

$(document).on("click", ".carrier-wrapper", (e) => {
  $(document).one("click", ".grid-item", (el) => {
    if ($(`#${el.target.id}`).attr("filled") === "false") {
      $(`#${el.target.id}`)
        .attr("filled", "true")
        .css({ backgroundColor: "orange" });
      $(`#${e.target.id}`).css({ display: "none" });
    }
  });
});

const mainFunction = function () {
  const player1ships = {
    cruiser: [],
  };

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
