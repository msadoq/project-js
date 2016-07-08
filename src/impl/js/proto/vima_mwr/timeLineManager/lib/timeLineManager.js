var zmq = require("zmq"),
    socketIn = zmq.socket("pull"),
    tlMgrApi = require('./timeLineManagerApi.js')
var wsSocket;

function logToConsole (message) {
    console.log("[" + new Date().toLocaleTimeString() + "]" + message);
}

exports.setWebSocket = function(io) {
    wsSocket = io;
    wsSocket.sockets.on('connection', function (socket) {
        console.log('Un client est connecté !');
    });

    wsSocket.sockets.on('connection', function (viewSocket) {
        viewSocket.emit('message', 'Vous êtes bien connecté à la websocket !');
        viewSocket.emit('open', 'Vous êtes bien Batman !');
    });
}

var plotConfigurationJson;

socketIn.on("message", function (timelines) {
    var timelinesJson = JSON.parse(timelines);
    /*console.log("Master Id: "+timelinesJson.MasterId)*/
    for (var timeline of timelinesJson.Timelines){
        /*console.log("TimelineName: "+timeline.TimelineName);
        console.log("dInf: "+timeline.VisuWindow.dInf);
        console.log("dSup: "+timeline.VisuWindow.dSup);*/
        
        timeRangeConfiguration = {
            'type' : 'xExtents',
            'id' : 'batman',
            'begin' : timeline.VisuWindow.dInf,
            'end' : timeline.VisuWindow.dSup  
        };
        currentTimeConfiguration = {
            "type":"VLineMarkerConfiguration",
            "id":"batman",
            "color":"green",
            "coord":timeline.CurrentTime,
            "unit":"time"
        };
        
        for (i = 0 ; i < 2 ; i++){
            wsSocket.emit('plot'+(i+1),JSON.stringify(timeRangeConfiguration));
            wsSocket.emit('plot'+(i+1),JSON.stringify(currentTimeConfiguration));
        }
        
    }
});

socketIn.connect('tcp://127.0.0.1:4242');

