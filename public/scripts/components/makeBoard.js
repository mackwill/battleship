const createTotalGridDiv = () => {
  $("body").append(
    $(document.createElement("div")).attr({
      class: "total-grid-wrapper",
    })
  );
};

const createBoard = (boardSize, player) => {
  let rowPos = 1;
  $(`#player${player}-title`).after(
    $(document.createElement("div")).attr({
      class: "grid-container",
      id: `player${player}-grid`,
    })
    // .css({
    //   "justify-content": "center",
    // })
  );

  for (let i = 1; i <= boardSize; i++) {
    let colPos = 65;
    let colNum = 1;

    for (let j = 1; j <= boardSize; j++) {
      $(`#player${player}-grid`).append(
        $(document.createElement("div"))
          .attr({
            class: `grid-item grid-item-player${player}`,
            id: `${String.fromCharCode(colPos)}-${rowPos}-${player}`,
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

// module.exports = { createTotalGridDiv, createBoard };
export { createTotalGridDiv, createBoard };
