let subId = 0;
let color = 'red';
let style = 'square';

colors = {
    'o': 'orange',
    'r': 'red',
    'g': 'green',
    'b': 'blue',
    'p': 'purple',
    'y': 'yellow'
}

styles = {
    's': 'square',
    't': 'triangle',
    'c': 'circle',
}


if (!isNaN(parseInt(process.argv[2],10))) {
    console.log("yo")
    subId = parseInt(process.argv[2],10);
    if (process.argv[3] in colors) {
        console.log("yo2")
        color=colors[process.argv[3]];
        if (process.argv[4] in styles) {
            console.log("yo3")
            style=styles[process.argv[4]];
        }
    }
}

const styleMessage = {
    type: 'plotConfiguration',
    id: `sub${subId}`,
    color: color,
    pointsStyle: style,
}

const sio = require('socket.io')(1337);
sio.sockets.on('connection', () => {
  console.log(`Sub ${styleMessage.id} - color: ${styleMessage.color} - style: ${styleMessage.pointsStyle}`);
  sio.emit('style',styleMessage);    
});