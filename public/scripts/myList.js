$(document).ready(()=> {
    
    checkForLogin()
    let user;

    console.log(user)
    $.ajax({
        method: 'GET',
        url: `favlist/${user.username}`,
        data: data._id,
        success: function success() {
            console.log('success');
        }
       
    })


 });

function checkForLogin(){
    if(localStorage.length > 0){
  
      let jwt = localStorage.token
    //   console.log(jwt);
      $.ajax({
        type: "POST",
        url: '/verify',  
        beforeSend: function (xhr) {   
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.token);
        }

      }).done(function (response) {
        // console.log(response)
        
        user = { username: response.username, _id: response._id }
        // console.log(user.username);


        $.ajax({
            method: 'GET',
            url: `favlist/${user.username}`,
            success: function success(e) {
               
                
                e.forEach(function(films){
                    let media = films._flix;
                    // console.log(media)
                    console.log(media)
                    $('body').css('background-color',  '#e0e3e7')
                    $('.myList').append(`
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
                        <h3 class="genre">Genre:</h3>\n<p class="paragraph"></p>
                        

                        </article>
                        </section>`)
                })
            }
           
        })


            console.log("you can access variable user: " , user)
        
            }).fail(function (e1,e2,e3) {
                console.log(e2);
            });
        }
    }

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

//});