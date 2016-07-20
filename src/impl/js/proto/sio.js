const sio = require('socket.io-client');
const socket = sio.connect('http://localhost:1337');

socket.on('message', function(message) {
    console.log('message', message);
});
socket.on('Parameters', function(message) {
    console.log('Parameters', message);
})

module.exports = socket;
