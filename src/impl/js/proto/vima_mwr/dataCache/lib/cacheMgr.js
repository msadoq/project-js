const binCache = require('./binCache.js');
const jsonCache = require('./jsonCache.js');
const dataTypesCtrl = require('../../dataTypeManager');
const subscriptionMgr = require('./subscriptionsMgr');
const protoBuf = require("protobufjs");   
const zmq = require('zmq');
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



const onMessage = (header, meta, payload) => {
    const batPoints = [];
    metaStr = new Buffer(meta).toString('utf8').split('\0')[0]; 
    const metaJson = JSON.parse(metaStr);
    const metaBin = JSON.parse(metaStr);
    
    binCache.addData(metaBin,payload).then((insertedBinData) => {});
    dataTypesCtrl.binToJson(metaJson, payload).then((decodedJson) => {
        jsonCache.addData(metaJson, decodedJson).then((insertedJsonData) => {});
        const subscriptions = subscriptionMgr.getSubscriptions(metaJson);
        subscriptions.forEach((subscription) => {
            wsSocket.emit('Parameters', decodedJson);
            /*decodedJson.parameters.forEach(function(item){*/
                const batPoint = [];
                batPoint.push(metaJson.timestamp);
                batPoint.push(decodedJson.rawValue);
                batPoints.push(batPoint);
            /*})*/
            
            const plotJson = {
                'type' : 'addPoints',
                'id' : 'batman',
                'points' : batPoints
                };
            console.log(subscription.subId);
            wsSocket.emit('plot'+subscription.subId,JSON.stringify(plotJson));
        });
    });
};

let dcPullSockets = new Array(1,2,3,4,5);
dcPullSockets = dcPullSockets.map(function (s) { return zmq.socket("pull")});
dcPullSockets = dcPullSockets.map(function (s, i) {var port= 49159+i; var uri = 'tcp://127.0.0.1:'+port; console.log(uri); return s.connect(uri)});
console.log(dcPullSockets);

dcPullSockets.map((s) => s.on("message", onMessage));

