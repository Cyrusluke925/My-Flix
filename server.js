
const express = require('express');
const app = express();
require('dotenv').config()


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
    res.sendFile('views/index.html' , { root : __dirname});
});

app.get('/search', function homepage(req, res) {
    res.sendFile('views/searchPage.html' , { root : __dirname});
});


app.get('/api/flix', (req, res) => {
    db.Flix.find({}, (err, allFlix) => {
        if (err) {
            return console.log(err)
        }

        res.json(allFlix);
    })
})


app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
  });
  


