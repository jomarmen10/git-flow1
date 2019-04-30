const mongoose = require("mongoose");
const House = require('./houses');

const realtorsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name:{type: String},
  password: {type: String, require: true },
  phone:{type: String},
  isAdmin: { type: Boolean, default: false},
  email:{ type: String},
  houses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House'
  }]
});

const Realtor = mongoose.model("Realtor", realtorsSchema);
module.exports = Realtor;
