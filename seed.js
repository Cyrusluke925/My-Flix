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

    const show = {
        movieId: 4,
        title: 'Sharp Objects',
        poster_path: 'sjsdlfjsdl;kfjs;oiefje',
        backdrop_path: 'as;dkfjsekf',
        overview: 'A reporter revisits her hometown and faces her psychological demons while covering a story on two dead girls',
        
    }

    // var user_list = [
    //     {
    //         userName: "masterluke",
    //         password: "hello"
    //     }
    // ]

    const user_list = {
        userName: 'lukeluke',
        password: 'hello'
    }




  

    // db.User.deleteMany({}, (err, allUsers) => {
        
    //     if(err) {return console.log(err)}
    //     db.User.create(user_list, (err, allUsers) => {
    //         if(err) {return console.log(err)}
    //         return console.log(allUsers)
    //     })
    //     db.Flix.deleteMany( {}, (err, everythingRemoved) => {
    //         if(err) { return console.log(err) }
    //         console.log("all gone: ", everythingRemoved);
    //         // when we know we have no more objects, then create new objects
    //         // createFlix();
    //         db.Flix.create(flix, (err, newFlix) => {
    //             if(err) {
    //                 console.log(err)
    //              }
    //              console.log(newFlix);
    //         })
    //     });
        
        
    // });


   



db.Flix.deleteMany({}, (err, deletedShows) => {
    db.User.deleteMany({}, (err, deletedUser) => {
        db.Like.deleteMany({}, (err, deletedLikes) => {
            
            db.Flix.create(show, (err, savedShow) => {
                if(err) {console.log(err);}
                    db.User.create(user_list, (err, savedUser) => {
                        if(err){console.log(err)};
                        console.log("SHOW: ", savedShow)
                        console.log("USER: ", savedUser);
                        db.Like.create({_flix: savedShow._id, _user: savedUser._id}, (err, savedLike) => {
                            if(err){return console.log(err)}
                            console.log("NEW LIKE: ", savedLike)
                        })
                })
            })

        })
    })
})



// db.Flix.create(show, (err, savedShow) => {
//     if(err) {console.log(err);}
//     db.User.create(user_list, (err, savedUser) => {
//         if(err) {console.log(err);}
//         db.Like.create({_flix:savedShow._id, _user: savedUser._id}, (err, succ) => {
//             console.log(savedShow._id)
//             console.log(succ);
//         })
//     })
// })
    








    



       



    //    ß
    
    
   