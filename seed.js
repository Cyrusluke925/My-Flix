var db = require('./models');

// var flix_list = [
//     {
//         title: "Mystic River",
//         img: "http://www.impawards.com/2003/posters/mystic_river.jpg",
//         director: "Clint Eastwood",
//         year: "2003"
//     },
//     {
//         title: "The Dark Knight Rises",
//         img: "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg",
//         director: "Christopher Nolan",
//         year: "2012"
//     },
//     {
//         title: "The Lord of the Rings: The Fellowship of the Ring",
//         img: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY999_CR0,0,673,999_AL_.jpg",
//         director: "Peter Jackson",
//         year: "2001"
//     }];

//     var user_list = [
//         {
//             userName: "masterluke",
//             password: "hello"
//         }
//     ]


//     db.User.deleteMany({}, (err, allUsers) => {
        
//         if(err) {return console.log(err)}
        
        
//     })


//     db.User.create(user_list, (err, allUsers) => {
//         if(err) {return console.log(err)}
//         return console.log(allUsers)
//     })








//     db.Flix.deleteMany( {}, (err, everythingRemoved) => {
//         if(err) { return console.log(err) }
//         console.log("all gone: ", everythingRemoved);
//         // when we know we have no more objects, then create new objects
//         createFlix();
//     });




//     let createFlix = function(){
//         db.Flix.create(flix_list, (err, allFlix) => {
//         if(err) { return console.log(err) }
//         retrieveFlix();    
//     })
//     }
    
//     let retrieveFlix = function( ){
//         db.Flix.find( {} ,(err, allFlix) => {
//             if(err) { return console.log(err) }
//             console.log("TOTAL flix: ", allFlix.length)
//             console.log("all flix: ", allFlix);
//             process.exit();
//         });
//     }
    



let user = {
    userName: "bill",
    password: "Im a hashed password"
}

db.User.create(user, (err, succ) => {
    //console.log("User created", succ)
    let movie = {
        movieId: 4,
        title: "Land Before Time II",
        poster_path: "POSTer PATH",
        backdrop_path: "Backdrop Path",
        overview: "Dinosaurs look for more leaves",
        userName: succ
    }
    db.Flix.create(movie, (err, movie) => {
        db.Flix.findById(movie._id)
            .populate('userName')
            .exec((err, populatedUser) => {
                console.log(populatedUser)
                process.exit(0);
            })

    })
})