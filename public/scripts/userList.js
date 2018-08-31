
$.ajax({
    method: "GET",
    url: '/api/users',
    success: appendUsers

})

function appendUsers(e) {
    e.forEach (function(user) {
        $('body').append(`<div><a data-id="${user._id} href="#">${user.userName}</a><div>`)
    })
}






