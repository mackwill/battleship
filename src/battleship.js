// const { player1ships, } = require("./constants");

const createTotalGridDiv = () => {
  $("body").append(
    $(document.createElement("div")).attr({
      class: "total-grid-wrapper",
    })
  );
};

const createBoard = (boardSize, player) => {
  let rowPos = 1;
  $(".total-grid-wrapper").append(
    $(document.createElement("div")).attr({
      class: "grid-container",
      id: `player${player}-grid`,
    })
  );

  for (let i = 1; i <= boardSize; i++) {
    let colPos = 65;
    let colNum = 1;

    for (let j = 1; j <= boardSize; j++) {
      $(`#player${player}-grid`).append(
        $(document.createElement("div"))
          .attr({
            class: "grid-item",
            id: `${String.fromCharCode(colPos)}${rowPos}`,
            row: colNum,
            col: rowPos,
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

const createShipDiv = () => {
  $(".total-grid-wrapper").after(
    $(document.createElement("div"))
      .attr({
        class: "ship-wrapper",
      })
      .css({
        width: "90%",
      })
  );
};

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

const createShips = (shipName, shipLength) => {
  $(".ship-wrapper").append(
    $(document.createElement("div")).attr({
      class: `${shipName}-wrapper ship`,
    })
  );

  for (let i = 1; i <= shipLength; i++) {
    $(`.${shipName}-wrapper`).append(
      $(document.createElement("div")).attr({
        class: "shipElem",
        id: `${shipName}-${i}`,
      })
    );
  }
};

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
