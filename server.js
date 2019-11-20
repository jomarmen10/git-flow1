//Set up modules here
const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require('dotenv').config()
require("./db/db.js");


const housesRoutes = require("./routes/house");
const realtorsRoutes = require("./routes/realtor")
const authController = require("./controllers/authController");



//MiddleWare Area
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static('public'));

app.use(session({
  secret: 'Random Secret String',
  resave: false,
  saveUninitalized: false,
}));


app.use("/", housesRoutes);
app.use('/auth', authController);
app.use("/realtor", realtorsRoutes);


app.listen(process.env.PORT, err => {
  console.log("Server listening on port: ", process.env.PORT);
});
