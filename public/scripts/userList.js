
$.ajax({
    method: "GET",
    url: '/api/users',
    success: appendUsers

})


function appendUsers(e) {
    console.log(e)
    e.forEach (function(user) {
        $('.userList').append(`<a class="user" href="#" data-id="${user._id}">${user.userName}</a>`)
    })
}



$('.userList').on('click', '.user', function(user) {
    let userId = $(this).attr('data-id')
    $.ajax({
        method: 'GET',
        url: '/api/likes',
        data: userId,
        success: function onSuccess(res) {
            console.log('success')
            console.log(res);
        },
        error: function onError(err){
            console.log(err);
        }
    })
})






