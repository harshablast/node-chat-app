const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(public_path));

io.on('connection', (socket) => {
    console.log("New Client Connected to Server");

    socket.on('disconnect', () => {
        console.log("Client Disconnected from Server");
    })
});

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});





