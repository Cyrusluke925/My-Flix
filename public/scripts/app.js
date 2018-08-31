

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
  
  
  
  $('#submitBtn').on('click', (e) => {
  
  e.preventDefault();
      $.ajax({
        method: 'POST',
        data: $('form').serialize(),
        success: searchPage,
        error: function onError() {
        }
  
      })
  
  
  })
  
  
  
  function searchPage() {
    window.location.assign('http://localhost:3000/search');
    console.log('YOU SHOULD LEAVE THIS PAGE!');
    
  }
  
  
  
  // $.ajax({
  //   method: "POST",
  //   url: "http://localhost:8080/login",
  //   // Fetch the stored token from localStorage and set in the header
  //   headers: {"Authorization": localStorage.getItem('token')}
  // });
  
  checkForLogin()
  function checkForLogin(){
    if(localStorage.length > 0){
  
      let jwt = localStorage.token
      $.ajax({
        type: "POST", //GET, POST, PUT
        url: '/verify',  
        beforeSend: function (xhr) {   
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.token);
        }
      }).done(function (response) {
        console.log(response)
        user = { username: response.username, _id: response._id }
        console.log("you can access variable user: " , user)
          $('#message').text(`Welcome, ${ response.username || response.result.username } `);
          sleep(500).then(() => {
            window.location = "http://localhost:3000/search";
        })
      }).fail(function (err) {
          console.log(err);
      });
      $('#yesToken').toggleClass('show');
    } else {
      $('#noToken').toggleClass('show');
    }
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



  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
  
