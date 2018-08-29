const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/my-flix", {useMongoClient: true});

//require and export models
module.exports.Flix = require('./flix');