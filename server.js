const express = require('express');
const app = express();



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });




  const db = require('./models');



app.use(express.static('public'));



app.get('/', function homepage(req, res) {
    res.sendFile(_dirname + '/views/index.html');
});




