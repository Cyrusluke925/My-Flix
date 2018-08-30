
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const db = require('./models');



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });






app.use(express.static('public'));


//User Routes 
app.get('/login', function logInPage(req, res) {
    res.sendFile('views/loginPage.html', {root: __dirname});
})

app.get('/signup', function signUpPage(req, res) {
    res.sendFile('views/signUpPage.html', {root: __dirname});
    
})



app.get('/', function homepage(req, res) {
    res.sendFile('views/index.html' , { root : __dirname});
});


app.get('/search', function searchPage(req, res) {
    res.sendFile('/views/searchPage.html', {root: __dirname});
});




app.get('/api/flix', (req, res) => {
    db.Flix.find({}, (err, allFlix) => {
        if (err) {
            return console.log(err)
        }

        res.json(allFlix);
    })
})



app.post('/login', (req, res) => {
    console.log("LOGIN CALLED");
    var username = req.body.userName;
    // console.log(username)
    // console.log(req.body)

    // FINDS THE USER IN THE DATABASE
    db.User.find({userName: username}, (err, users) => {
        if (users.length < 1) {
            return res.status(401).json({message: 'Username/Password incorrect'})
        }

        if(req.body.password !== users[0].password) {
            return res.status(401).json({message: 'Username/Password incorrect'})
        }
        
        if(req.body.password === users[0].password) {
    
                // create a json web token
                const token = jwt.sign({
                    // add some identifying information
                    userName: users[0].userName,
                    _id: users[0]._id
                    }, 
                // add our super secret key (which should be hidden, not plaintext like this)
                "vampires",
                // these are options, not necessary
                {
                    // its good practice to have an expiration amount for jwt tokens.
                    expiresIn: "1h"
                },
                );
                // send success back to user, along with a token.
                res.status(200).json(
                
                {
                    message: 'Auth successful',
                    token
                }
                )
            // the password provided does not match the password on file.
            } else {
                res.status(401).json({message: "Username/Password incorrect"})
            }
            })
});
        

//         
    


//       })
//       .catch( err => {
//         console.log(err);
//         res.status(500).json({err})
//       })
//   })



































app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
  });
  


