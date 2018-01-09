const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
const {generateMessage} = require('./utils/message');
var {User} = require('./models/users');

const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(public_path));
app.use(bodyParser.urlencoded({extended: true}));

// var server = http.createServer(app);
// var io = socketIO(server);
//
//
// io.on('connection', (socket) => {
//     console.log("New Client Connected to Server");
//
//     socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
//
//     socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined the Chat Room'));
//
//     socket.on('disconnect', () => {
//         console.log("Client Disconnected from Server");
//     });
//
//     socket.on('createMessage', (message) => {
//         console.log("Created Message: ", message);
//         io.emit('newMessage', generateMessage(message.from, message.text));
//     });
// });


app.post('/users/register', (req, res) => {
    console.log(req.body);
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    console.log(user);
    User.findOne({email: user.email}).then((foundUser) => {
        console.log("Entered here");
        if (!foundUser) {
            console.log('No existing email. Proceed with registration');
            user.save().then(() => {
                res.redirect('/');
            })
        }
        else {
            console.log('Email already exists!');
            res.redirect('/');
        }
    }, (e) => {
        console.log(e);
    });
});

app.post('/users/login', (req, res) => {

})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});





