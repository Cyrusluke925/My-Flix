const mongoose = require('mongoose'),
Schema = mongoose.Schema;



var flixSchema = new Schema ({

    movieId: Number,
    title: String,
    poster_path: String,
    backdrop_path: String,
    overview: String,
    userName: String
})






const Flix = mongoose.model('Flix', flixSchema);


module.exports = Flix;