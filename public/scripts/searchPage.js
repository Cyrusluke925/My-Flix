const apiKey = "e6104cb8ac4b63d1e99b6c905b41870c";
const api_endpoint = 'https://api.themoviedb.org/3/authentication/token/new?api_key=';

let genres =[{"id": 28,"name": "Action"},{"id": 12,"name": "Adventure"},{"id": 16,"name": "Animation"},{"id": 35,"name": "Comedy"},{"id": 80,"name": "Crime"},{"id": 99,"name": "Documentary"},{"id": 18,"name": "Drama"},{"id": 10751,"name": "Family"},{"id": 14,"name": "Fantasy"},{"id": 36,"name": "History"},{"id": 27,"name": "Horror"},{"id": 10402,"name": "Music"},{"id": 9648,"name": "Mystery"},{"id": 10749,"name": "Romance"},{"id": 878,"name": "Science Fiction"},{"id": 10770,"name": "TV Movie"},{"id": 53,"name": "Thriller"},{"id": 10752,"name": "War"},{"id": 37,"name": "Western"}]




    $('form').on('submit', e=>{
        e.preventDefault();
        let formArr = $('form').serializeArray();

        // for(let i=0;i<formArr.length;i++){
        //     formArr[i].value = inputFormater(formArr[i].value);
        // }

        

        //API SEARCH
        if(formArr[0].value !== "" && formArr[3].value === "" ){

                //Title Search
                console.log("Title Search");

                let title = encodeURI(formArr[0].value);

                $.ajax({
                    method: 'GET',
                    url: "https://api.themoviedb.org/3/search/multi?api_key="+apiKey+"&language=en-US&query="+title+"&page=1&include_adult=false" ,
                    success: titleSuccess,
                    error: titleError
                
                });
                
                function titleSuccess (response) {

                console.log(response)

                response.results.forEach(function(media) {
                
                
                    let currentGenres = findGenres(media.genre_ids);
                    if(media.media_type === "tv" && media.poster_path === null || undefined) {
                            $('.mediaList').append(`<section class="listing">
                            <article class="movieCover">
                            <p class="image">NO IMAGE</p>
                            </article>
                            
                            <article class="movieInfo">
                                <h2 class="title">${media.name}</h2>
                                <p class="description>${media.overview}</p>
                                <p class="genre"> Genre: ${currentGenres}</p>
                                <a class=like><i class="far fa-heart"></i></a>
                            </article>
                            </section>
                            `);
                        }else if(media.media_type === "tv") {
                                let tvId = media.id;
                                let vidKey;

                                $.ajax({
                                    method: 'GET',
                                    url: `http://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US&api_key=${apiKey}`,
                                    complete: function returnKey(vid) {
                                        vidKey = vid.responseJSON.results[0].key
                                        console.log(vidKey);

                                        appendfunc();
                                    }
                                });


                                const appendfunc = function(){
                                    console.log(vidKey)

                            $('.mediaList').append(`
                                <section class="listing" style='background-image:url("https://image.tmdb.org/t/p/original${media.backdrop_path}")'>
                                <article class="movieCover">
                    
                                <img class="image" src = "https://image.tmdb.org/t/p/w300/${media.poster_path}">
                            
                                </article>
                                <article class="movieInfo" '>
                            
                                <h2 class="title"> ${media.name}</h2>
                                

                                <article class="sybmols">
                                <a class=like><i class="far fa-heart"></i></a>
                                </article>
                                

                        
                                <h3 class="description">Description:</h3><p class="paragraph">\n ${media.overview}</p>
                                <h3 class="genre">Genre:</h3>\n<p class="paragraph"> ${currentGenres}</p>
                                <iframe src="http://www.youtube.com/embed/${vidKey}" frameborder="0" allowfullscreen></iframe>

                                </article>
                                </section>`

                            )};

                    if(media.media_type === "movie" && media.poster_path === null) {
                        $('.mediaList').append(`<section class="listing">
                        <article class="movieCover">
                        <p class="image">NO IMAGE</p>
                        </article>
                                
                        <article class="movieInfo">
                            <h2 class="title">${media.title}</h2>
                            <p class="description>${media.overview}</p>
                            <p class="genre"> Genre: ${currentGenres}</p>
                            <a class=like><i class="far fa-heart"></i></a>
                        </article>
                    </section>`
                
                
                )} else if (media.media_type === "movie") {

                    $('.mediaList').append(`
                        <section class="listing" style='background-image:url("https://image.tmdb.org/t/p/original${media.backdrop_path}")'>
                        <article class="movieCover">
            
                        <img class="image" src = "https://image.tmdb.org/t/p/w300/${media.poster_path}">
                       
                        </article>
                        <article class="movieInfo" '>
                    
                        <h2 class="title"> ${media.title}</h2>
                        

                        <article class="sybmols">
                        <a class=like><i class="far fa-heart"></i></a>
                        </article>
                        

                
                        <h3 class="description">Description:</h3><p class="paragraph">\n ${media.overview}</p>
                        <h3 class="genre">Genre:</h3>\n<p class="paragraph"> ${currentGenres}</p>

                        </article>
                        </section>`
                
                    )};
                    //end of append

                                }
                                
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
    }

                }



                function titleError (e1, e2, e3) {
                    console.log(e1)
                    console.log(e2)
                    console.dir(e3)  
                }
            }


            
        });




    // function inputFormater(input){
    //     var str = input.toLowerCase();
    //     let res =[];
        
    //     let splitString = str.split(" ");
        
    //        splitString.forEach(elem =>{
    //     elem = elem.charAt(0).toUpperCase() + elem.substr(1);
    //     res.push(elem);
        
    //        });
    
    //     let finalRes = res.join(" ");
    //     return finalRes;
    // }

    