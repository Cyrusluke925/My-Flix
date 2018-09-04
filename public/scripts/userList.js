
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






