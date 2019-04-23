const mongoose = require("mongoose");

const realtorsSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Realtors = mongoose.model("Realtors", realtorsSchema);
module.exports = Realtors;
