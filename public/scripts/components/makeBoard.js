const createTotalGridDiv = () => {
  $("body").append(
    $(document.createElement("div")).attr({
      class: "total-grid-wrapper",
    })
  );
};

const createBoard = (boardSize, player) => {
  let colPos = 1;
  $(`#player${player}-title`).after(
    $(document.createElement("div")).attr({
      class: "grid-container",
      id: `player${player}-grid`,
    })
  );

  for (let i = 1; i <= boardSize; i++) {
    let rowPos = 65;
    let rowNum = 1;

    for (let j = 1; j <= boardSize; j++) {
      $(`#player${player}-grid`).append(
        $(document.createElement("div"))
          .attr({
            class: `grid-item grid-item-player${player}`,
            id: `${String.fromCharCode(i + 64)}-${j}-${player}`,
            row: i,
            col: j,
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

// const createBoard = (boardSize, player) => {
//   let colPos = 1;
//   $(`#player${player}-title`).after(
//     $(document.createElement("div")).attr({
//       class: "grid-container",
//       id: `player${player}-grid`,
//     })
//     // .css({
//     //   "justify-content": "center",
//     // })
//   );

//   for (let i = 1; i <= boardSize; i++) {
//     let rowPos = 65;
//     let rowNum = 1;

//     for (let j = 1; j <= boardSize; j++) {
//       $(`#player${player}-grid`).append(
//         $(document.createElement("div"))
//           .attr({
//             class: `grid-item grid-item-player${player}`,
//             id: `${String.fromCharCode(i + 64)}-${j}-${player}`,
//             row: i,
//             col: j,
//             filled: false,
//           })
//           .css({
//             gridColumn: j,
//             gridRow: i,
//           })
//       );
//       colPos++;
//     }
//     rowPos++;
//   }
// };

export { createTotalGridDiv, createBoard };
