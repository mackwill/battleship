const express = require("express");

const PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static("public"));

app.listen(3000, () => {
  console.log(`Nicolas Cage is listening on port ${PORT}`);
});
