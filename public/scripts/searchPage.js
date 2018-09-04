$(document).ready(()=> {

checkForLogin();
 

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
            }
        };


                function titleSuccess (response) {
                    

                response.results.forEach(function(media) {
                    let currentGenres = findGenres(media.genre_ids);
                  

                    if(media.media_type === "tv") {
                        // console.log('type is tv')
                     
                                let tvId = media.id;
                                let vidKey;
                                    
                                appendfunc(media)

                                         $('.symbols').on('click', '.info', function(e) {

                                            $.ajax({
                                                method: 'GET',
                                                url: `https://api.themoviedb.org/3/tv/${$(this).attr('data-id')}?api_key=${apiKey}`,
                                                complete: singleAppendTv
                                            })

                                            
                                        })
                                
                                const singleAppendTv = function(e) {
                                
                                    $('.mediaList').empty();
                                    var tvShow = e.responseJSON;

                                    $.ajax({
                                        method: "GET",
                                        url: `https://api.themoviedb.org/3/tv/${tvShow.id}/credits?api_key=${apiKey}`,
                                        complete: function findCredits(response) {
                                           
                                            var credits = response.responseJSON;

                                            $('body').css('background-color',  'rgba(49,50,55, 0.8)');
                                            $('form').css('margin-bottom', '20px');
                                

                                            $('.mediaList').css('margin-top', '0').append(`<section class="show" style='background-image:url("https://image.tmdb.org/t/p/original${tvShow.backdrop_path}")' style='background-size:cover'>
                                                
                                            <article class="header" style='background-color:rgba(49, 50, 55, 0.8)'>
                                                    <img src="https://image.tmdb.org/t/p/w400/${tvShow.poster_path}">
                                                    
                                                    <article class="titleAndDescription">
                                                    <h1 class=detailTitle>${tvShow.name}</h1>
                                                    <h3 class="descriptionTitle">Description</h3> \n <p class="descriptionText" id="video">${media.overview}</p>
                                                    

                                                    <section class="subInfo">
                                                        <article class="leftColumn">
                                                            <article class="type">
                                                                <h3 class='descriptionTitle'>Genre</h3> \n <p class="descriptionText">${currentGenres}</p>
                                                            </article>
                                                            <article class="numberOfEps">
                                                                <h3 class='descriptionTitle'>Number Of Episodes</h3> \n <p class="descriptionText">${tvShow.number_of_episodes} episodes</p>
                                                            </article>
                                                        </article>
                                                        <article class="rightColumn">
                                                            <article class="network">
                                                                <h3 class="descriptionTitle">Network</h3> \n <p class="descriptionText">${tvShow.networks[0].name}</p>
                                                            </article>
                                                            <article class="runTime">
                                                            <h3 class="descriptionTitle">Run Time</h3> \n <p class="descriptionText">${tvShow.episode_run_time} mins</p>
                                                            </article>
                                                        </article>  
                                                    
                                                    </section>
                                                    
                                                
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
                                                if(person !== undefined) {
                                                    $('.crew').append(`<article class='person'><img src="https://image.tmdb.org/t/p/w200${person.profile_path}">
                                                <h4 class="actorName">${person.name}</h4>
                                                <p class='character'>${person.department}</p>`)

                                                
                                                }

                                            }
                                          
                                            console.log('helloooo')
                                        $.ajax({
                                            method: "GET",
                                            url: `https://api.themoviedb.org/3/tv/${tvShow.id}/videos?api_key=${apiKey}&language=en-US`,
                                            success: function(vid) {
                                                console.log(vid)
                                                if (vid.results.length > 0) {
                                                    let vidKey = vid.results[0].key
                                                    $('#video').after(`<a id="trailer" data-id=${vid.results[0].key} style='margin-left: 100px'><i class="fab fa-youtube"></i></a>`)

                                                    $('#trailer').on('click', function(trailer) {
                                                        // $('.castAndCrew').empty();
                                                        if($('div').length === 0) {
                                                            $('.castAndCrew').prepend(`<div><iframe allowFullScreen='allowFullScreen' width="640" height="390"
                                                            src="http://www.youtube.com/embed/${vidKey}"
                                                            frameborder="0"></iframe></div>`)
                                                            $('.castTitle').css('margin-top', '0');
                                                        }
                                                    
                                                    })
                                                }
                                            }
                                            
                                        })
                                    }
                                })

                            }
                                
                                
                            function appendfunc(){
                                // console.log(media)
                             $('body').css('background-color',  '#e0e3e7')
                            $('.mediaList').append(`
                                <section class="listing" style='background-image:url("https://image.tmdb.org/t/p/original${media.backdrop_path}")'>
                                <article class="movieCover">
                    
                                <img class="image" src = "https://image.tmdb.org/t/p/w300/${media.poster_path}">
                            
                                </article>
                                <article class="movieInfo" '>
                            
                                <h2 class="title"> ${media.name}</h2>
                                

                                <article class="symbols">
                                <a href="#" data-id=${media.id} class=like><i class="far fa-heart"></i></a>
                                <a href="#" class="info" data-id=${media.id}><i class="fas fa-info-circle"></i></a>
                                </article>
                                

                        
                                <h3 class="description">Description:</h3><p class="paragraph">\n ${media.overview}</p>
                                <h3 class="genre">Genre:</h3>\n<p class="paragraph"> ${currentGenres}</p>
                                

                                </article>
                                </section>`)
                            
                               
                                
                                $('.like').on('click', function(e) {
                                    console.log(theUserId)
                                    console.log(theUserName)
                                    let movieData = {
                                        movieId: media.id,
                                        title: media.name,
                                        poster_path: media.poster_path,
                                        backdrop_path: media.backdrop_path,
                                        overview: media.overview,
                                        userId: theUserId
                                    }
                                    $.ajax ({
                                        method: 'POST',
                                        url: '/api/likes',
                                        data: movieData,
                                        success: function() {
                                            console.log('success')
                                        }
                                        
                                    })
                                })
                            
                            };



                        };
                        

    


        
                                
        });

            function findGenres(input){
                        if(input === undefined) {
                            // return console.log('no value')
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




    function findGenres(input){
        if(input === undefined) {
            // return console.log('no value')
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


          
 

            function sendMovieSuccess(){

            }

            function sendMovieError(){
                
            }





        $('.logout').on('click', e=>{
            // console.log("Clicked");
            e.preventDefault();
            localStorage.clear();
            window.location = "http://localhost:3000/login";
            
        });





    

});

function checkForLogin(){
    if(localStorage.length > 0){
  
      let jwt = localStorage.token
      $.ajax({
        type: "POST",
        url: '/verify',  
        beforeSend: function (xhr) {   
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.token);
        }

      }).done(function (response) {
        console.log(response)
        user = { username: response.username, _id: response._id }
        console.log("you can access variable user: " , user)

      }).fail(function (err) {
          console.log(err);
      });
    }
  }

function sleep (time) {
return new Promise((resolve) => setTimeout(resolve, time));
}

