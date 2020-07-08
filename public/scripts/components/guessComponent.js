const createGuessInput = () => {
  $(".ship-wrapper").after(
    ($(document.createElement("div")).innerHTML = `<form class='form-inline'>
      <div class='form-group mb-2'>
        <label for='staticEmail2' class='sr-only'>Email</label>
        <input type='text' readonly class='form-control-plaintext' id='staticEmail2' value='Ent'>
      </div>
      <div class='form-group mx-sm-3 mb-2'>
        <label for='inputPassword2' class='sr-only'>Password</label>
        <input type='password' class='form-control' id='inputPassword2' placeholder='Password'>
      </div>
      <button type='submit' class='btn btn-primary mb-2'>Confirm identity</button>
    </form>`)
  );
};

// import styles from "./guessComponent.css";
// const createGuessInput = () => {
//   $(".ship-wrapper").after(
//     $(document.createElement("div"))
//       .attr({
//         class: "guess-wrapper",
//         id: "guess-wrapper",
//       })
//       .css({
//         width: "90%",
//       })
//   );

//   $(".guess-wrapper").append(
//     $(document.createElement("input"))
//       .attr({
//         class: "guess-input",
//         id: "guess-input",
//       })
//       .css({
//         width: "20%",
//       })
//   );

//   $(".guess-wrapper").append(
//     $(document.createElement("input"))
//       .attr({
//         class: "guess-input",
//         id: "guess-input",
//       })
//       .css({
//         width: "20%",
//       })
//   );
// };

export { createGuessInput };
