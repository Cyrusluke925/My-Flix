const mongoose = require('mongoose'),
Schema = mongoose.Schema;

var flixSchema = new Schema ({

    movieId: Number,
    name: String,
    poster_path: String,
    backdrop_path: String,
    overview: String,
})

const Flix = mongoose.model('Flix', flixSchema);

module.exports = Flix;