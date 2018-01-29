const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var {mongoose} = require('./db/mongoose');
const {generateMessage} = require('./utils/message');
var {User} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');
var userUtils = require('./utils/userUtils');

const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(public_path));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

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

app.get('/home', authenticate, (req, res) => {
    res.sendFile(public_path+'/home.html');
});

app.get('/chatlist', authenticate , (req, res) => {
    res.sendFile(public_path+'/chatlist.html');
});

app.get('/userslist', (req, res) => {
    console.log("/userslist route is called");

    userUtils.generateUsers().then((usersJson)=> {
        res.header('Content-type','application/json');
        res.send(JSON.stringify(usersJson));
    }, (err)=> {
        console.log(err);
    });

});

app.get('/messages/:userID', (req,res) => {
   res.send("Opened Messages of: " + req.params.userID);
});

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
            }, (e) => {
                console.log(e);
            });
        }
        else {
            console.log('Email already exists!');
            res.redirect('/');
        }
    }, (e) => {
        console.log(e);
    });
});

app.get('/home',authenticate, (req,res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
            return user.generateAuthToken().then((token) => {
            res.cookie('user-auth', token);
            return res.redirect('/home');

        });
    },(err) => {
        console.log(err);
    })
});


app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});







