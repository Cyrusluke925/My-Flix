
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
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

app.get('/search', function homepage(req, res) {
    res.sendFile('views/searchPage.html' , { root : __dirname});
});


app.get('/search', function searchPage(req, res) {
    res.sendFile('/views/searchPage.html', {root: __dirname});
});


app.get('/userList', function findUsers(req, res) {
    res.sendFile('/views/userList.html', {root: __dirname});
})


app.get('/api/users', function getAllUsers(req, res) {
    db.User.find({}, (err, allUsers) => {
        if(err){return console.log(err)};
        res.json(allUsers);
    })
})


app.get('/')


app.get('/api/flix', (req, res) => {
    db.Flix.find({}, (err, allFlix) => {
        if (err) {
            return console.log(err)
        }

        res.json(allFlix);
    })
})




app.post('/signup', (req,res)=>{
    console.log("Signup Called")
    var username = req.body.userName;
    var password = req.body.password;
    console.log("Username: "+username);
    console.log("Password: "+password);


    db.User.find({userName: username}, (err, users) => {
        if(err){console.log(err);}

        if (users.length >= 1) {
            return res.status(401).json({message: 'Username already used please try again'})
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){ 
                  console.log("hashing error:", err);
                  
                  res.status(200).json({error: err})
                // we now have a successful hashed password
                } else {

                    let userToCreate = {
                        userName: username,
                        password: hash
                    }

                    db.User.create( userToCreate ,(err, users) => {
                        if(err){console.log(err);}

                        jwt.sign(
                            { username },
                            "vampires",
                            {
                                expiresIn: "1h"
                            },
                            (err, signedJwt) => {
                                if(err){console.log(err);}
                                console.log(signedJwt);
                                res.status(200).json({
                                    message: 'User Created',
                                    username,
                                    signedJwt
                                })

                            });
                        });
                    }
                });
            }
        });
});

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
        


    



    app.post('/verify', verifyToken, (req, res) => {
        let verified= jwt.verify(req.token, 'vampires')
        console.log("verified: ", verified)
        res.json(verified)
      })



      function verifyToken(req, res, next) {
        console.log("in verify...");
        // Get auth header value
        // when we send our token, we want to send it in our header
        const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader)
        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined'){
          const bearer = bearerHeader.split(' ');
          // Get token from array
          const bearerToken = bearer[1];
          // Set the token
          req.token = bearerToken;
          // Next middleware
          next();
      
        } else {
          // Forbidden
          res.sendStatus(403);
        }
      }
































app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
  });
  


