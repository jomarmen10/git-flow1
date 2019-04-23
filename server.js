const express = require("express");
const app = express();
require("dotenv").config();
const realtorsController = require("./controller/realtors");

app.use("/", realtorsController);

app.listen(3000, () => {
  console.log("running on port:", 3000);
});
