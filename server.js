//Set up modules here
const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require('dotenv').config()
require("./db/db.js");
// MONGO_URI=mongodb+srv://moneyteam:money123@cluster0-lij6q.mongodb.net/test?retryWrites=true


const housesRoutes = require("./routes/house");
const realtorsController = require("./controllers/realtors");
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

// test
// app.use("/", houseRoutes)
// test end

app.use("/realtor", realtorsController);
app.use("/houses", housesRoutes);
app.use('/auth', authController);

app.listen(process.env.PORT, err => {
  console.log("Server listening on port: ", process.env.PORT);
});
