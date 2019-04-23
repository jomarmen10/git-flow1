const mongoose = require('mongoose');

const houseSchema = mongoose.Schema ({
    list: String,   //name of listing
    body: String,  //description
});

const House = mongoose.model('House', houseSchema);

module.exports = House;