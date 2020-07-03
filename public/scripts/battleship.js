import { createTotalGridDiv, createBoard } from "./components/makeBoard.js";
import { createShipDiv, createShips } from "./components/ships.js";

$(document).on("click", ".shipElem", (e) => {
  let clicks = 0;
  $(document).on("click", ".grid-item", (el) => {
    console.log("clicks: ", clicks);
    if (clicks === 0) {
      $(`#${el.target.id}`).css({ backgroundColor: "orange" });
      $(`#${e.target.id}`).css({ display: "none" });
    }
    clicks++;
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
