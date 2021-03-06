
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./models');

var salt = bcrypt.genSaltSync();

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


app.get('/mylist', function mylist(req, res) {
    res.sendFile('views/myList.html', {root: __dirname} );
})


app.get('/userList', function findUsers(req, res) {
    res.sendFile('/views/userList.html', {root: __dirname});
})

app.get('/moviesintheaters', function gettheatermovies(req, res) {
    res.sendFile('/views/currentMovies.html',  {root: __dirname});
})


app.get('/api/users', function getAllUsers(req, res) {
    db.User.find({}, (err, allUsers) => {
        if(err){return console.log(err)};
        res.json(allUsers);
    })
})


app.get('/api/likes', function findLikes(req, res) {
    db.Like.find({}, (err, allLikes) => {
        if(err) {
            console.log(err)
        }
        res.json(allLikes)
    })
})


app.get('/api/flix', (req, res) => {
    db.Flix.find({}, (err, allFlix) => {
        if (err) {
            return console.log(err)
        }

        res.json(allFlix);
    })
})


app.get("/favlist/:username", (req, res) =>{
    let id = req.body._id;
    let username = req.params.username;
    
    db.User.find({userName: username}, (err, userFound) => {
        if(err){
            res.status(401);
        }
        if(userFound < 1){
            res.status(404).json({message: "USER NOT FOUND"})
        }else{
        let uid = userFound[0]._id;
        console.log("user found: ", uid)
        db.Like.find({_user: uid})
            .populate('_flix')
            .exec( (err, succ) => {
                res.json(succ);
            })
        } 
    })
});


app.delete('/api/likes', (req, res) => {
    console.log("api hit");
    let likeId = req.body.likedID;
    console.log("LIKE ID: "+likeId);

    db.Like.deleteOne({_id: likeId}, (err, deletedLike)=>{
        if(err){console.log(err);}
        res.json(deletedLike);
    })
})


app.post('/api/likes', (req, res) => {
    let media = req.body;
    db.Flix.create({movieId: media.movieId, name: media.name, poster_path: media.poster_path, backdrop_path: media.backdrop_path, overview: media.overview}, (err, savedFlix) => {
        if(err){console.log(err);}
        
        db.User.findById({_id: media.userId}, (err, savedUser) => {
            
            if (err){console.log(err);}
            db.Like.create({_flix: savedFlix._id, _user: savedUser._id}, (err, savedLike) => {
                if(err){console.log(err);}
                console.log(savedLike);
            })
        })
    })
})


app.post('/signup', (req,res)=>{
    var username = req.body.userName;
    var password = req.body.password;

    db.User.find({userName: username}, (err, users) =>{
        if(err){console.log(err);}

        if (users.length >= 1){
            return res.status(401).json({message: 'Username already used please try again'})
        }else{
            console.log('creating user')
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if(err){ 
                console.log("hashing error:", err);
                
                res.status(200).json({error: err})
                } else {
                    let userToCreate = {
                        userName: username,
                        password: hash
                    }
                    db.User.create( userToCreate ,(err, users) => {
                        if(err){console.log(err);}
                        let uid = users._id
                        jwt.sign(
                            { username: username, _id: uid },
                            "vampires",
                            {
                                expiresIn: "1h"
                            },
                            (err, signedJwt) => {
                                if(err){console.log(err);}
                                console.log(signedJwt);
                                let uid =  users._id;
                                console.log("USER ID WE ARE LOOKING FOR: "+uid)
                                res.status(200).json({
                                    message: 'User Created',
                                    username,
                                    uid,
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
    var password = req.body.password;
    console.log("Username: "+username);
    console.log("Password: "+password);

    // FINDS THE USER IN THE DATABASE
    db.User.find({userName: username}, (err, users) => {
        if(err){
            console.log(err);
        }else if (users.length < 1) {
            return res.status(401).json({message: 'Username/Password incorrect'})
        }
        let passCheck = bcrypt.compare(password, users[0].password, (err, hash) => {
            console.log("Got to Hasing");
            if(err){ 
                console.log("hashing error:", err); 
                return res.status(401).json({message: 'Username/Password incorrect'})
            }else{
                let uid = users[0]._id
                if(hash){
                    console.log("username: ",username)
                    jwt.sign(
                        { username: username,  _id: uid  },
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
                                signedJwt,
                                
                            })
                        });
                }else{
                    return res.status(401).json({message: 'Username/Password incorrect'})
                }
            }
        });
    })
});


app.post('/verify', verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, 'vampires')
    res.json(verified)
})


function verifyToken(req, res, next) {
    // Get auth header value
    // when we send our token, we want to send it in our header
    const bearerHeader = req.headers['authorization'];
    // console.log(bearerHeader)
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


function signJwt(){
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
}



//SERVER LISTENING

app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});
  
