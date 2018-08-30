$( document ).ready(function() {
//api key
const apiKey = "e6104cb8ac4b63d1e99b6c905b41870c";
const api_endpoint = 'https://api.themoviedb.org/3/authentication/token/new?api_key=';
const end = "&query=Jack+Reacher";


$('form').on('submit', e=>{
$.ajax({
    method: 'GET',
    url: "https://api.themoviedb.org/3/search/multi?api_key="+apiKey+"&language=en-US&query=Sharp%20Objects&page=1&include_adult=false" ,
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

});


  console.log( "ready!" );
});

