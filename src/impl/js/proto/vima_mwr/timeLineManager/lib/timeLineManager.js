var zmq = require("zmq"),
    socket = zmq.socket("pull"),
    tlMgrApi = require('./timeLineManagerApi.js')
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

var plotConfigurationJson;

socket.on("message", function (timelines) {
    var timelinesJson = JSON.parse(timelines);
    /*console.log("Master Id: "+timelinesJson.MasterId)*/
    for (var timeline of timelinesJson.Timelines){
        /*console.log("TimelineName: "+timeline.TimelineName);
        console.log("dInf: "+timeline.VisuWindow.dInf);
        console.log("dSup: "+timeline.VisuWindow.dSup);*/
        
        plotConfigurationJson = {
            'type' : 'setViewRange',
            'id' : 'batman',
            /*'axisName' : timeline.TimelineName,*/
            'left' : timeline.VisuWindow.dInf,
            'right' : timeline.VisuWindow.dSup  
        };
        wsSocket.emit('plot',JSON.stringify(plotConfigurationJson));
    }
});

socket.connect('tcp://127.0.0.1:4000');

