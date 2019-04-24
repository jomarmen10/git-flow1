const mongoose = require('mongoose');

const houseSchema = mongoose.Schema ({
    list: String,   //name of listing
    body: String,  //description
    img: String,   //image
    address: String,
    price: Number,
    type: String,
    rooms: Number,
});

const House = mongoose.model('House', houseSchema);

module.exports = House;