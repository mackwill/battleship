export class Player {
  constructor(player) {
    (this.player = player), (this.fullyPositioned = false);
  }
}

export class Ship {
  constructor(name, size, player) {
    this.player = player;
    this.name = name;
    this.sunk = false;
    this.positionComplete = false;
    this.position = {};
    this.size = size;
    this.onClick = this.onClick.bind(this);
  }

  createShips = () => {
    $(`.player${this.player}-ship-wrapper`).append(
      $(document.createElement("div")).attr({
        class: `${this.name}-wrapper ship-player${this.player}`,
        id: `${this.name}-wrapper-${this.player}`,
      })
    );

    document
      .getElementById(`${this.name}-wrapper-${this.player}`)
      .addEventListener("click", this.onClick);

    for (let i = 0; i < this.size; i++) {
      $(`#${this.name}-wrapper-${this.player}`).append(
        $(document.createElement("div")).attr({
          class: `${this.name}-elem ship-elem`,
          id: `${this.name}-${i + 1}-player${this.player}`,
        })
      );
    }
  };

  fullyPlaced = (e) => {
    if (Object.keys(this.position).length === this.size) {
      this.positionComplete = true;
    }
  };

  onClick(event) {
    $(document).on("click", `#${this.name}-wrapper-${this.player}`, (event) => {
      let clicks = Object.keys(this.position).length;
      $(document).one("click", `.grid-item-player${this.player}`, (e) => {
        // console.log("e target", e.target);
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
              (totalColDif === 0 && colDif === 0 && totalRowDif < this.size) ||
              (totalRowDif === 0 && rowDif === 0 && totalColDif < this.size)
            ) {
              $(`#${e.target.id}`)
                .attr("filled", "true")
                .css({ backgroundColor: "orange" });
              this.position[e.target.id] = false;

              $(`#${this.name}-${clicks + 1}-player${this.player}`).css({
                opacity: "0.5",
              });
              console.log(`#${this.name}-${clicks}-player${this.player}`);
              // $(`#${event.target.id}`).css({ opacity: "0.5" });
              this.fullyPlaced();
              clicks++;
            }
          } else {
            $(`#${e.target.id}`)
              .attr("filled", "true")
              .css({ backgroundColor: "orange" });
            this.position[e.target.id] = false;

            $(`#${this.name}-${clicks + 1}-player${this.player}`).css({
              opacity: "0.5",
            });

            console.log(`#${this.name}-${clicks}-player${this.player}`);
            clicks++;
          }
        }
      });
    });
  }
}
