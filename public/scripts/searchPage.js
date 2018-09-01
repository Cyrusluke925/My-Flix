$(document).ready(()=> {


const apiKey = "e6104cb8ac4b63d1e99b6c905b41870c";
const api_endpoint = 'https://api.themoviedb.org/3/authentication/token/new?api_key=';

let genres =[{"id": 28,"name": "Action"},{"id": 12,"name": "Adventure"},{"id": 16,"name": "Animation"},{"id": 35,"name": "Comedy"},{"id": 80,"name": "Crime"},{"id": 99,"name": "Documentary"},{"id": 18,"name": "Drama"},{"id": 10751,"name": "Family"},{"id": 14,"name": "Fantasy"},{"id": 36,"name": "History"},{"id": 27,"name": "Horror"},{"id": 10402,"name": "Music"},{"id": 9648,"name": "Mystery"},{"id": 10749,"name": "Romance"},{"id": 878,"name": "Science Fiction"},{"id": 10770,"name": "TV Movie"},{"id": 53,"name": "Thriller"},{"id": 10752,"name": "War"},{"id": 37,"name": "Western"}]


    // $('body').css('background-image', `url('../pictures/signUpCollage.jpg'`)

    $('form').on('submit', e=>{
        e.preventDefault();

        loadPage();
    })


   
    $('#search').on('click', e=> {
        e.preventDefault();

        loadPage()
    })













   
    function loadPage() {

        if( $('.mediaList').length > 0) {
            

            $('.mediaList').empty()
        }
    
        let formArr = $('form').serializeArray();


        //API SEARCH
        if(formArr[0].value !== ""){

                //Title Search
        

                let title = encodeURI(formArr[0].value);

               
               //AJAX CALL TO MOVIE DB API
                $.ajax({
                    method: 'GET',
                    url: "https://api.themoviedb.org/3/search/multi?api_key="+apiKey+"&language=en-US&query="+title+"&page=1&include_adult=false" ,
                    success: titleSuccess,
                    error: titleError
                
                });


                function titleSuccess (response) {

                response.results.forEach(function(media) {
                    let currentGenres = findGenres(media.genre_ids);

                    if(media.media_type === "tv") {
                        console.log('type is tv')
                                let tvId = media.id;
                                let vidKey;

                                $.ajax({
                                    method: 'GET',
                                    url: `http://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US&api_key=${apiKey}`,
                                    complete: function returnKey(vid) {
                                        if(vid.responseJSON.results[0].key !== undefined) {
                                            vidKey = vid.responseJSON.results[0].key
                                    }
                                    

                                        appendfunc();
                                        $('.symbols').on('click', '.trailer', function(e) {
                                            e.preventDefault();
                                            $('.paragraph').eq(1).after(`<iframe src="http://www.youtube.com/embed/${$(this).attr('data-id')}" frameborder="0" allowfullscreen></iframe>`)
                                        })

                                        $('.symbols').on('click', '.info', function(e) {

                                            $.ajax({
                                                method: 'GET',
                                                url: `https://api.themoviedb.org/3/tv/${$(this).attr('data-id')}?api_key=${apiKey}`,
                                                complete: singleAppendTv
                                            })
                                            
                                        })

                                
                                    }
                                });

                                
                                
                               
                                
                                const singleAppendTv = function(e) {

                                    console.log(e)
                                    $('.mediaList').empty();
                                    var media = e.responseJSON;

                                    $.ajax({
                                        method: "GET",
                                        url: `https://api.themoviedb.org/3/tv/${media.id}/credits?api_key=${apiKey}`,
                                        complete: function findCredits(response) {
                                           
                                            var credits = response.responseJSON;

                            
                                            console.log(credits)


                                            $('form').css('margin-bottom', '20px');
                                   

                                            $('.mediaList').css('margin-top', '0').append(`<section class="show" style='background-image:url("https://image.tmdb.org/t/p/original${media.backdrop_path}")' style='background-size:cover'>
                                                
                                            <article class="header" style='background-color:rgba(49, 50, 55, 0.8)'>
                                                    <img src="https://image.tmdb.org/t/p/w400/${media.poster_path}">
                                                    
                                                    <article class="titleAndDescription">
                                                    <h1 class=detailTitle>${media.name}</h1>
                                                    <h3 class="descriptionTitle">Description</h3> \n <p class="descriptionText">${media.overview}</p>
                                                    <h3 class='descriptionTitle'>Genre</h3> \n <p class="descriptionText">${currentGenres}</p>
                                                    <h3 class="descriptionTitle">Network</h3> \n <p class="descriptionText">${media.networks[0].name}</p></a>
                                                    </article>
                                                    
                                            </article>
                                            <article class='castAndCrew'>
                                            <h3 class="castTitle">Cast</h3>
                                            <article class="cast">
                                            
                                            </article>
                                            <hr class='horizontal'>
                                            <h3 class="crewTitle">Crew</h3>
                                            <article class="crew">
                                           
                                            </article>
                                            </article>
        
                                            </section>`)

                                            for (var i = 0; i < 5; i+= 1) {
                                                var person = credits.cast[i];
                                                if(person.profile_path !== null) {
                                                    $('.cast').append(`<article class='person'><img src="https://image.tmdb.org/t/p/w200${person.profile_path}">
                                                <h4 class="actorName">${person.name}</h4>
                                                <p class='character'>${person.character}</p>
                                                </article>`)
                                                }
                                            
                                                
                                            }

                                            for (var i = 0; i < 5; i += 1) {
                                                var person = credits.crew[i];
                                                if(person.profile_path !==null) {
                                                    $('.crew').append(`<article class='person'><img src="https://image.tmdb.org/t/p/w200${person.profile_path}">
                                                <h4 class="actorName">${person.name}</h4>
                                                <p class='character'>${person.department}</p>`)

                                                }
                                             

                                            }

                                            
                                        }
                                    });
                                    

                            
                                  
                                }
                                
                                
                                
                                
                                
                                const appendfunc = function(){
                                
                                
                            $('.mediaList').append(`
                                <section class="listing" style='background-image:url("https://image.tmdb.org/t/p/original${media.backdrop_path}")'>
                                <article class="movieCover">
                    
                                <img class="image" src = "https://image.tmdb.org/t/p/w300/${media.poster_path}">
                            
                                </article>
                                <article class="movieInfo" '>
                            
                                <h2 class="title"> ${media.name}</h2>
                                

                                <article class="symbols">
                                <a href="#" class=like><i class="far fa-heart"></i></a>
                                <a class="trailer" href="#" data-id="${vidKey}"><i class="fab fa-youtube"></i></a>
                                <a href="#" class="info" data-id=${media.id}><i class="fas fa-info-circle"></i></a>
                                </article>
                                

                        
                                <h3 class="description">Description:</h3><p class="paragraph">\n ${media.overview}</p>
                                <h3 class="genre">Genre:</h3>\n<p class="paragraph"> ${currentGenres}</p>
                                

                                </article>
                                </section>`

                            )};

            

                                }

                    
                if (media.media_type === "movie") {
                    console.log('type is movie')
                    let movieId = media.id;
                                let movieKey;

                                $.ajax({
                                    method: 'GET',
                                    url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`,
                                    complete: function returnKey(vid) {
                                        movieKey = vid.responseJSON.results[0].key
                                        

                                        appendMovie();

                                       
                                    }



                                    
                                });


                    function appendMovie() {
                    $('.mediaList').append(`
                    <section class="listing" style='background-image:url("https://image.tmdb.org/t/p/original${media.backdrop_path}")'>
                    <article class="movieCover">
        
                    <img class="image" src = "https://image.tmdb.org/t/p/w300/${media.poster_path}">
                
                    </article>
                    <article class="movieInfo" '>
                
                    <h2 class="title"> ${media.title}</h2>
                    

                    <article class="symbols">
                    <a href="#" class=like><i class="far fa-heart"></i></a>
                    <a class="trailer" href="#" data-id="${movieKey}"><i class="fab fa-youtube"></i></a>
                    <a class="info" href="#" data-id=${media.id}><i class="fas fa-info-circle"></i></a>
                    </article>
                    

            
                    <h3 class="description">Description:</h3><p class="paragraph">\n ${media.overview}</p>
                    <h3 class="genre">Genre:</h3>\n<p class="paragraph"> ${currentGenres}</p>
            

                    </article>
                    </section>`
            
                )};

        


            };


        
                                
            });

            function findGenres(input){
                        if(input === undefined) {
                            return console.log('no value')
                        }
                        let genresArr = [];
                        for(let v = 0; v < input.length; v++){
                            for(let m = 0; m < genres.length; m++){
                                if(input[v] === genres[m].id){
                                    genresArr.push(genres[m].name);
                                }
                            }

                        }
                        return genresArr;
                    }n




    function findGenres(input){
        if(input === undefined) {
            return console.log('no value')
        }
        let genresArr = [];
        for(let v = 0; v < input.length; v++){
            for(let m = 0; m < genres.length; m++){
                if(input[v] === genres[m].id){
                    genresArr.push(genres[m].name);
                }
            }

        }
        return genresArr;
    }

                }



                function titleError (e1, e2, e3) {
                    console.log(e1)
                    console.log(e2)
                    console.dir(e3)  
                }
        }

          
            
    }
            
       






});
      

        //Code for saving user favorite flix
        

        // $('.fa-heart').addEventListener('click',  e =>{
        //     console.log("Heart clicked");
        //     e.preventDefault();

        //     $.ajax({
        //         method: 'GET',
        //         url: "https://api.themoviedb.org/3/search/multi?api_key="+apiKey+"&language=en-US&query="+title+"&page=1&include_adult=false" ,
        //         data: { 
        //             searchMovieId: "hello", 
        //             searchMovieTitle: "hello2",
        //             searchMoviePoster_Path: "hello2",
        //             searchMovieBackdrop_Path: "hello2",
        //             searchMovieOverview: "hello2",
        //             loggedInUser: "hello2",
        //         } ,
        //         success: titleSuccess,
        //         error: titleError
            
        //     });


        // })





