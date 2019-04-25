const mongoose = require("mongoose");
const House = require('./houses');

const realtorsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  houses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House'
  }]
});

const Realtor = mongoose.model("Realtor", realtorsSchema);
module.exports = Realtor;
