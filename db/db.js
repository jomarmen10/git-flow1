const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI || "mongodb://localhost/moneyteam100";


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("mongoose connected to ", connectionString);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose disconnected to ", connectionString);
});

mongoose.connection.on("error", error => {
  console.log("mongoose error ", error);
});
