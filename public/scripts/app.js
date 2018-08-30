// require('dotenv').config();

$( document ).ready(function() {
//api key
const apiKey = 'e6104cb8ac4b63d1e99b6c905b41870c';
const api_endpoint = 'https://api.themoviedb.org/3/authentication/token/new?api_key='+ apiKey


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




  //when mouse hovers over log in option on Landing Page (Index.html)

$('.logIn').on('mouseenter', function() {
  $('.signUp').css('filter', 'brightness(50%)');
  $('.logIn').css('filter', 'brightness(120%)');
})

$('.logIn').on('mouseleave', function() {
  $('.signUp').css('filter', 'brightness(90%)')
  $('.logIn').css('filter', 'brightness(100%)')
})



//when mouse hovers over sign up option on Landing page (Index.html)

$('.signUp').on('mouseenter', function() {
  $('.signUp').css('filter', 'brightness(130%)');
  $('.logIn').css('filter', 'brightness(50%');
})


$('.signUp').on('mouseleave', function() {
  $('.logIn').css('filter', 'brightness(100%)')
  $('.signUp').css('filter', 'brightness(90%)')
})


































});


