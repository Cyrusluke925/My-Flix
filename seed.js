var db = require('./models');

var flix_list = [
    {
        title: "Mystic River",
        img: "http://www.impawards.com/2003/posters/mystic_river.jpg",
        director: "Clint Eastwood",
        year: "2003"
    },
    {
        title: "The Dark Knight Rises",
        img: "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg",
        director: "Christopher Nolan",
        year: "2012"
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        img: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY999_CR0,0,673,999_AL_.jpg",
        director: "Peter Jackson",
        year: "2001"
    }];


    db.Flix.deleteMany( {}, (err, everythingRemoved) => {
        if(err) { return console.log(err) }
        console.log("all gone: ", everythingRemoved);
        // when we know we have no more objects, then create new objects
          createChar();
    });

    let createFlix = function(){
        db.Flix.create(flix_list, (err, allFlix) => {
        if(err) { return console.log(err) }
        retrieveChar();    
    })
    }
    
    let retrieveFlix = function( ){
        db.Flix.find( {} ,(err, allCharacters) => {
            if(err) { return console.log(err) }
            console.log("TOTAL flix: ", allFlix.length)
            console.log("all flix: ", allFlix);
            process.exit();
        });
    }
    