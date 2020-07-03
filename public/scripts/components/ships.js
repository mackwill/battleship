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

export { createShipDiv, createShips };
