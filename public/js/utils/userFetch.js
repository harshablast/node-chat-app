$(document).ready(function() {

    $.ajax({
        url: "/userslist",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            //users = JSON.parse(data);
            users = data;
            users.forEach(function (user) {
                $("#user-chat-list").append("<li><p><a href='./messages/" + user.email + "'>" + user.email + "</a></p></li>")
            });
        }
    })
});
