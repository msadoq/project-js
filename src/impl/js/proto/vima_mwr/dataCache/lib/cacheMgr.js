var zmq = require("zmq"),
    socketIn = zmq.socket("pull"),
    binCache = require('./binCache.js'),
    jsonCache = require('./jsonCache.js'),
    dataTypesCtrl = require('../../dataTypesControler'),
    subscriptionMgr = require('./subscriptionsMgr'),
    protoBuf = require("protobufjs");
var wsSocket;

exports.newSubscription = function(subscription) {
    
    subscriptionMgr.addSubscription(subscription);
    jsonCache.findData(subscription).then(function (storedData) {
        var batPoints = [];
        
        storedData.forEach(function(data){
            wsSocket.emit('Parameters', data.jsonPayload);
            var jsonPayLoad = data.jsonPayload;
            jsonPayLoad.parameters.forEach(function(item){
                var batPoint = [];
                batPoint.push(data.dataTime);
                batPoint.push(item.rawValue);
                batPoints.push(batPoint);
            }) 
        });
        plotJson = {
            'type' : 'addPoints',
            'id' : 'batman',
            'points' : batPoints
            };
        wsSocket.emit('plot'+subscription.subId,JSON.stringify(plotJson));
    });
}

exports.unserializeBin = function(subscription) {
    
}

function logToConsole (message) {
    console.log("[" + new Date().toLocaleTimeString() + "]" + message);
}

exports.setWebSocket = function(io) {
    wsSocket = io;
    wsSocket.sockets.on('connection', function (socket) {
        console.log('Un client est connecté !');
    });

    /*wsSocket.sockets.on('connection', function (viewSocket) {
        viewSocket.emit('message', 'Vous êtes bien connecté à la websocket !');
        viewSocket.emit('open', 'Vous êtes bien Batman !');
    });*/
}

var plotJson;

socketIn.on("message", function (header, payload) {
    var batPoints = [];
    var headerJson = JSON.parse(header);
    var headerBin =JSON.parse(header);
    
    binCache.addData(headerBin, payload).then(function (insertedBinData) {
    });
    dataTypesCtrl.binToJson(payload).then(function (decodedJson) {
        jsonCache.addData(headerJson, decodedJson).then(function (insertedJsonData) {
        });
        var subscriptions = subscriptionMgr.getSubscriptions(headerJson);
        subscriptions.forEach(function(subscription){
            wsSocket.emit('Parameters', decodedJson);
            decodedJson.parameters.forEach(function(item){
                var batPoint = [];
                batPoint.push(headerJson.dataTime);
                batPoint.push(item.rawValue);
                batPoints.push(batPoint);
            })
            
            plotJson = {
                'type' : 'addPoints',
                'id' : 'batman',
                'points' : batPoints
                };
            wsSocket.emit('plot'+subscription.subId,JSON.stringify(plotJson));
        });
    });
});

socketIn.connect('tcp://127.0.0.1:3000');

