export class Ship {
  constructor(name, size) {
    this.name = name;
    this.sunk = false;
    this.position = {};
    this.size = size;
    this.onClick = this.onClick.bind(this);
    // this.addEventListener("click", this.onClick.bind(this));
    // this.addEventListener
    console.log("this: ", this);
  }

  createShips = () => {
    $(".ship-wrapper").append(
      $(document.createElement("div")).attr({
        class: `${this.name}-wrapper ship`,
        id: `${this.name}-id`,
        // onclick: `${this.onClick}`,
      })
    );

    document
      .getElementById(`${this.name}-id`)
      .addEventListener("click", this.onClick);

    for (let i = 1; i <= this.size; i++) {
      $(`.${this.name}-wrapper`).append(
        $(document.createElement("div")).attr({
          class: `${this.name}-elem ship-elem`,
          id: `${this.name}-${i}`,
          // onclick: `${this.onClick}`,
        })
      );
    }
  };

  onClick(event) {
    $(document).on("click", ".ship", (event) => {
      // let currentShip = this.name;
      let clicks = Object.keys(this.position).length;
      $(document).one("click", ".grid-item", (e) => {
        if ($(`#${e.target.id}`).attr("filled") === "false") {
          if (clicks > 0) {
            let firstRow = Object.keys(this.position)[0]
              .split("-")[0]
              .charCodeAt(0);
            let firstCol = Number(Object.keys(this.position)[0].split("-")[1]);
            let prevRow = Object.keys(this.position)
              [clicks - 1].split("-")[0]
              .charCodeAt(0);
            let prevCol = Number(
              Object.keys(this.position)[clicks - 1].split("-")[1]
            );

            let currentRow = e.target.id.split("-")[0].charCodeAt(0);
            let currentCol = Number(e.target.id.split("-")[1]);

            let rowDif = Math.abs(prevRow - currentRow);
            let colDif = Math.abs(prevCol - currentCol);

            let totalRowDif = Math.abs(firstRow - currentRow);
            let totalColDif = Math.abs(firstCol - currentCol);

            if (
              (rowDif < this.size && colDif === 0 && totalRowDif < this.size) ||
              (colDif < this.size && rowDif === 0 && totalColDif < this.size)
            ) {
              $(`#${e.target.id}`)
                .attr("filled", "true")
                .css({ backgroundColor: "orange" });
              this.position[e.target.id] = false;

              $(`#${event.target.id}`).css({ display: "none" });
              clicks++;
            }
          } else {
            $(`#${e.target.id}`)
              .attr("filled", "true")
              .css({ backgroundColor: "orange" });
            this.position[e.target.id] = false;

            $(`#${event.target.id}`).css({ display: "none" });
            clicks++;
          }
        }
      });
    });
  }
}

// module.exports = Ship
