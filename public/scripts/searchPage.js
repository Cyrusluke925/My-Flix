const apiKey = "e6104cb8ac4b63d1e99b6c905b41870c";
const api_endpoint = 'https://api.themoviedb.org/3/authentication/token/new?api_key=';

let genres =[{"id": 28,"name": "Action"},{"id": 12,"name": "Adventure"},{"id": 16,"name": "Animation"},{"id": 35,"name": "Comedy"},{"id": 80,"name": "Crime"},{"id": 99,"name": "Documentary"},{"id": 18,"name": "Drama"},{"id": 10751,"name": "Family"},{"id": 14,"name": "Fantasy"},{"id": 36,"name": "History"},{"id": 27,"name": "Horror"},{"id": 10402,"name": "Music"},{"id": 9648,"name": "Mystery"},{"id": 10749,"name": "Romance"},{"id": 878,"name": "Science Fiction"},{"id": 10770,"name": "TV Movie"},{"id": 53,"name": "Thriller"},{"id": 10752,"name": "War"},{"id": 37,"name": "Western"}]


const end = "&query=Jack+Reacher";


    $('form').on('submit', e=>{
        e.preventDefault();
        console.log("Submit Clicked!");
        let formArr = $('form').serializeArray();
        console.log($('form').serializeArray());

        for(let i=0;i<formArr.length;i++){
            formArr[i].value = inputFormater(formArr[i].value);
        }

        

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


                    for(let responseIterator = 0; responseIterator < response.results.length; responseIterator++){
                        let currentGenres = findGenres(response.results[responseIterator].genre_ids);
                        if(response.results[responseIterator].poster_path === null || undefined){
                            $('.mediaList').append(`
                                <section class="listing">
                                <article class="movieCover">
                                <p class="image">NO IMAGE</p>
                                </article>
                                <article class="movieInfo">
                                <h2 class="title">${response.results[responseIterator].title}</h2>
                                <p class="description">${response.results[responseIterator].overview}</p>
                                <p class="genre">Genre: ${currentGenres}</p>
                                <a class=like><i class="far fa-heart"></i></a>
                                </article>
                                </section>
                            `);
                        }else{
                            $('.mediaList').append(`
                                <section class="listing" style='background-image:url("https://image.tmdb.org/t/p/original${response.results[responseIterator].backdrop_path}")'>
                                <article class="movieCover">
                    
                                <img class="image" src = "https://image.tmdb.org/t/p/w300/${response.results[responseIterator].poster_path}">
                               
                                </article>
                                <article class="movieInfo" '>
                            
                                <h2 class="title"> ${response.results[responseIterator].title}</h2>
                                

                                <article class="sybmols">
                                <a class=like><i class="far fa-heart"></i></a>
                                </article>
                                

                        
                                <h3 class="description">Description:</h3><p class="paragraph">\n ${response.results[responseIterator].overview}</p>
                                <h3 class="genre">Genre:</h3>\n<p class="paragraph"> ${currentGenres}</p>

                                </article>
                                </section>`

                            ).css('background-image', 'response.results[responseIterator].backdrop_path');
                           
                    }
                }
                    console.log(response);
                }
                
                function titleError (e1, e2, e3) {
                    console.log(e1)
                    console.log(e2)
                    console.dir(e3)  
                }
        
            
            }else if(formArr[3].value !== "" && formArr[0].value === ""){

                //Search Director


                console.log("Director Search");
                let director = encodeURI(formArr[3].value);

                var myURL = "https://api.themoviedb.org/3/search/multi?api_key="+apiKey+"&language=en-US&query="+director+"&page=1&include_adult=false";

                var exampleURL = "https://api.themoviedb.org/3/search/multi?api_key=e6104cb8ac4b63d1e99b6c905b41870c&language=en-US&query=Jean-Marc%20Vall%C3%A9e&page=1&include_adult=false";

                $.ajax({
                    method: 'GET',
                    url: exampleURL,
                    success: directorSuccess,
                    error: directorError
                
                });

                function directorSuccess(response){
                    console.log(response)
                }

                function directorError (e1, e2, e3) {
                    console.log(e1)
                    console.log(e2)
                    console.dir(e3)  
                }

            
            }else if(formArr[3].value !== "" && formArr[0].value !== "" ){

                //Search Director and Title


                console.log("Director and Title Search");
                let director = encodeURI(formArr[3].value);

                var myURL = "https://api.themoviedb.org/3/search/multi?api_key="+apiKey+"&language=en-US&query="+director+"&page=1&include_adult=false";

                var exampleURL = "https://api.themoviedb.org/3/search/multi?api_key=e6104cb8ac4b63d1e99b6c905b41870c&language=en-US&query=Jean-Marc%20Vall%C3%A9e&page=1&include_adult=false";

                $.ajax({
                    method: 'GET',
                    url: exampleURL,
                    success: directorSuccess,
                    error: directorError
                
                });

                function directorSuccess(response){
                    

                    let result = response.results[0].known_for.forEach( filmTitle => {
                        if(formArr[0].value === filmTitle.title){
                            console.log(filmTitle);
                        }

                    });  
                    console.log("No results found")

                }

                function directorError (e1, e2, e3) {
                    console.log(e1)
                    console.log(e2)
                    console.dir(e3)  
                }
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



    function inputFormater(input){
        var str = input.toLowerCase();
        let res =[];
        
        let splitString = str.split(" ");
        
           splitString.forEach(elem =>{
        elem = elem.charAt(0).toUpperCase() + elem.substr(1);
        res.push(elem);
        
           });
    
        let finalRes = res.join(" ");
        return finalRes;
    }