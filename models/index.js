const mongoose = require('mongoose'),
Schema = mongoose.Schema;



var flixSchema = new Schema ({
    title: String,
    img: String,
    director: String,
    year: String,
})



const Flix = mongoose.model('Flix', flixSchema);

module.exports = Flix;