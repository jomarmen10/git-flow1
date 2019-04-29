const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
    list: String, //name of listing
    body: String, //description
    img: [{
        type: String
    }], //image
    address: String,
    price: String,
    type: String,
    rooms: String,
});

const House = mongoose.model('House', houseSchema);

module.exports = House;