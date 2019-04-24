const mongoose = require("mongoose");

const realtorsSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Realtor = mongoose.model("Realtor", realtorsSchema);
module.exports = Realtor;
