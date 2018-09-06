$(document).ready(()=> {
    


    //returns user information to the console.
    checkForLogin()


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
            
            user = { username: response.username, _id: response._id }

            //makes an api call to the user favlist of the user
            $.ajax({
                method: 'GET',
                url: `favlist/${user.username}`,
                success: function success(e) {
                
                    
                    e.forEach(function(films){
                        let media = films._flix;
                    
                        //appends the list of movies from your favorites on to the page.
                        $('body').css('background-color',  '#e0e3e7')
                        $('.myList').append(`
                            <section data-id:"${films._id}" class="listing" style='background-image:url("https://image.tmdb.org/t/p/original${media.backdrop_path}")'>
                            <article class="movieCover">
                
                            <img class="image" src = "https://image.tmdb.org/t/p/w300/${media.poster_path}">
                        
                            </article>
                            <article class="movieInfo" '>
                        
                            <h2 class="title"> ${media.name}</h2>
                            

                            <article class="symbols">
                        
                            <a href="#" class="delete" data-id="${films._id}"><i class="far fa-trash-alt"></i>
                            <a href="#" class="info" data-id=${media.id}><i class="fas fa-info-circle"></i></a>
                            </article>
                            

                            
                            <h3 class="description">Description:</h3><p class="paragraph">\n ${media.overview}</p>
                            
                            
                            
                            </article>
                            </section>`)

                            $('.delete').on('click', function(e){
                                e.preventDefault();
                                
                                var id = $(this).attr('data-id')
                                
                                $.ajax({
                                    type: "DELETE",
                                    url: '/api/likes',
                                    data: {likedID: id},
                                    success: function onSuccess(){
                                        console.log("ITEM DELETED")
                                        $(e.target).parent().parent().parent().parent().remove()
                                    },
                                    error: function onError(err){
                                        console.log(err)
                                    }
                            
                                })
                        
                            })
                    });
                }
            
            })

        
            }).fail(function (e1,e2,e3) {
                console.log(e2);
                alert("PLEASE LOG IN AGAIN");
            });
        }
    }





});