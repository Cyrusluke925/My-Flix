const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/my-flix", {useNewUrlParser: true});

//require and export models
module.exports.User = require('./users')
module.exports.Flix = require('./flix');