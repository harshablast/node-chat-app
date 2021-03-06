var socket = io();

socket.on('connect', function(){
    console.log("Connected to Server");
});

socket.on('disconnect', function(){
    console.log("Disconnected from Server");
});
socket.on('newMessage', function (message) {
    console.log("New Message: ", message);
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});