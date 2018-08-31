$( document ).ready(function() {

    console.log("Document ready");

    $('#signUpBtn').on('click', (e) => {

        console.log("Button Clicked");
        e.preventDefault();
        console.log("Default prevented");

            $.ajax({
                method: 'POST',
                data: $('form').serialize(),
                success: searchPage,
                error: function onError() {
                    //$('h2').appendAfter("ERROR CREATING ACCOUNT PLEASE TRY AGAIN");

                }
            })
    })  


    function searchPage(json) {
    
        localStorage.setItem("token", json.signedJwt);
        console.log(json)

    }
});