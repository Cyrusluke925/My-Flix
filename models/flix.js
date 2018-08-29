const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var flixSchema = new Schema({
    title: String,
    img: String,
    director: String,
    year: String
})

var Flix = mongoose.model('Flix', flixSchema);

module.exports  = Flix;
