$( document ).ready(function() {
//api key
const apiKey = "e6104cb8ac4b63d1e99b6c905b41870c";
const api_endpoint = 'https://api.themoviedb.org/3/authentication/token/new?api_key=';
const end = "&query=Jack+Reacher";


    $('form').on('submit', e=>{
        e.preventDefault();
        console.log("Submit Clicked!");
        let formArr = $('form').serializeArray();
        console.log($('form').serializeArray());
        console.log("Form Array: "+formArr);
        let title = encodeURI(formArr[0].value);
        console.log("Parsed Value: "+title);
        
        console.log(formArr.length);
        console.log("Director value: "+(encodeURI(formArr[3].value)));

        if(formArr[3].value !== "" || formArr[3].value !== null ){
            console.log("Condition met");
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


        }else{
            //Title Search
            $.ajax({
                method: 'GET',
                url: "https://api.themoviedb.org/3/search/multi?api_key="+apiKey+"&language=en-US&query="+title+"&page=1&include_adult=false" ,
                success: onSuccess,
                error: onError
            
            });
            
            function onSuccess (response) {
                console.log(response);
            }
            
            function onError (e1, e2, e3) {
                console.log(e1)
                console.log(e2)
                console.dir(e3)  
            }
        }





    });





  console.log( "ready!" );
});

