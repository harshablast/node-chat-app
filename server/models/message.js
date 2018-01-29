const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        trim: true,
        minLength: 1,
    },
    sentBy:{
        type: String,
        required: true
    },
    receivedBy: {
        type: String,
        required: true
    },
    sentTime:{
        type: String,
        required: true
    }
});

var Message = mongoose.model('Message', messageSchema);

module.exports = {Message}