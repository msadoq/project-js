var zmq = require("zmq"),
    socket = zmq.socket("pull"),
    cacheApi = require('./dataCacheApi.js'),
    dataTypesCtrl = require('../../dataTypesControler'),
    protoBuf = require("protobufjs");
var wsSocket;

function logToConsole (message) {
    console.log("[" + new Date().toLocaleTimeString() + "]" + message);
}

module.exports = function(io) {
    wsSocket = io;
    wsSocket.sockets.on('connection', function (socket) {
        console.log('Un client est connecté !');
    });

    wsSocket.sockets.on('connection', function (viewSocket) {
        viewSocket.emit('message', 'Vous êtes bien connecté à la websocket !');
        viewSocket.emit('open', 'Vous êtes bien Batman !');
    });
}

var plotJson;

socket.on("message", function (header, payload) {
    var batPoints = [];
    var headerJson = JSON.parse(header);
    wsSocket.emit('Header', headerJson);
    headerJson.binPayload = payload;
    dataTypesCtrl.binToJson(payload).then(function (decodedJson) {
        headerJson.jsonPayload = JSON.stringify(decodedJson);
        cacheApi.addDataId(headerJson).then(function (insertedData) {

            wsSocket.emit('Parameters', decodedJson);

            decodedJson.parameters.forEach(function(item){
                var batPoint = [];
                batPoint.push(decodedJson.onboardDate);
                batPoint.push(item.rawValue);
                batPoints.push(batPoint);
            })
            
            plotJson = {
                'type' : 'addPoints',
                'id' : 'batman',
                'points' : batPoints
                };
            wsSocket.emit('plot',JSON.stringify(plotJson));
        });
    });
});

socket.connect('tcp://127.0.0.1:3000');

