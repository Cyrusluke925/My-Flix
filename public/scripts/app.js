require('dotenv').config();

$( document ).ready(function() {
//api key
const apiKey = config.API_KEY;
const api_endpoint = 'https://api.themoviedb.org/3/authentication/token/new?api_key='+apiKey+"&query=Jack+Reacher";


$.ajax({
    method: 'GET',
    url: api_endpoint ,
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


  console.log( "ready!" );
});