//Set up modules here
const PORT = 3000;
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const housesController = require("./controllers/houses");
const realtorsController = require("./controllers/realtors");
require("./db/db.js");

//const session = require('express-session');

//require('dotenv').config()
//require modules here

//MiddleWare Area
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static('public'));

// app.use(sessions({
//   secret: 'Random Secret String',
//   resave: false,
//   saveUninitalized: false,
// }));
app.use("/realtor", realtorsController);

app.use("/houses", housesController);

app.listen(PORT, err => {
  console.log("Server listening on port: ", PORT);
});
