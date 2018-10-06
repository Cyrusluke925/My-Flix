# My-Flix

* Apllication for users to catalogue their favorite shows and add them to a personal list and can share with other users their list

* Link to Heroku:


* Link to Trello:
* https://trello.com/b/vfGIV9O4/moviesgalore

## Technologies Used

* MongoDB
* AJAX
* JQuery
* Node 
* Express


## Existing Features

* Account creation and login with bcryption on passwords
* Ability to view list of shows based on search form
* JWT tokens generated to handle remembering user login
* Users can like searched media and have them stored to a list for the user to see later
* User lists show all users and clicking on a specific user allows other users see clicked users list of liked media




## Planned Features

* Protect the search page from anyone without an account to access
* have a "unique" link for each users favorite media list to be able to share out with others
* Under each detailed view add dropdown menu using a smooth scroll
* Under cast memebers have links to navigate user to actor/actress information page
* Utilizing movie db ajax response data more
* Add comments for users to discuss about their favorite movies



##Code Snippets


```javascript

//Luke

     $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${tvShow.id}/videos?api_key=${apiKey}&language=en-US`,
        success: function(vid) {
            console.log(vid)
            if (vid.results.length > 0) {
                let vidKey = vid.results[0].key
                $('#video').after(`<a id="trailer" data-id=${vid.results[0].key} style='margin-left: 100px'><i class="fab fa-youtube"></i></a>`)

                $('#trailer').on('click', function(trailer) {
                    // $('.castAndCrew').empty();
                    if($('div').length === 0) {
                        $('.castAndCrew').prepend(`<div><iframe allowFullScreen='allowFullScreen' width="640" height="390"
                        src="http://www.youtube.com/embed/${vidKey}"
                        frameborder="0"></iframe></div>`)
                        $('.castTitle').css('margin-top', '0');
                    }
                
                })
            }
        }
                                    


//Raj


    db.User.find({userName: username}, (err, userFound) => {
        if(err){
            res.status(401);
        }
        if(userFound < 1){
            res.status(404).json({message: "USER NOT FOUND"})
        }else{
            let uid = userFound[0]._id;
            console.log("user found: ", uid)
            db.Like.find({_user: uid})
                .populate('_flix')
                .exec( (err, succ) => {
                    res.json(succ);
                })
        }
    })


```