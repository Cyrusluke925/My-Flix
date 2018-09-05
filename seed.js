var db = require('./models');


const show = {
    movieId: 4,
    title: 'Sharp Objects',
    poster_path: 'sjsdlfjsdl;kfjs;oiefje',
    backdrop_path: 'as;dkfjsekf',
    overview: 'A reporter revisits her hometown and faces her psychological demons while covering a story on two dead girls',
    
}


const user_list = {
    userName: 'lukeluke',
    password: 'hello'
}


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

    
    
   
