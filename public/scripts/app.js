$( document ).ready(function() {

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







  function searchPage() {
    window.location.assign('http://localhost:3000/search');
    console.log('YOU SHOULD LEAVE THIS PAGE!');
    
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
  }
  
});








//MEDIA QUERY FOR LANDING PAGE.

if (window.matchMedia("(max-width: 725px)").matches) {
  
  $('.logIn').on('mouseenter', function() {
    $('.signUp').css('filter', 'brightness(50%)');
    $('.logIn').css('filter', 'brightness(105%)');
  })
  
  $('.logIn').on('mouseleave', function() {
    $('.signUp').css('filter', 'brightness(90%)')
    $('.logIn').css('filter', 'brightness(100%)')
  })
  
  
  
  //when mouse hovers over sign up option on Landing page (Index.html)
  
  $('.signUp').on('mouseenter', function() {
    $('.signUp').css('filter', 'brightness(105%)');
    $('.logIn').css('filter', 'brightness(50%');
  })
  
  
  $('.signUp').on('mouseleave', function() {
    $('.logIn').css('filter', 'brightness(100%)')
    $('.signUp').css('filter', 'brightness(90%)')
  })



} 
