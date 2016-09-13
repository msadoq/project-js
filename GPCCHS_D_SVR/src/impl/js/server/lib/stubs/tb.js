const zmq = require('../io/zmq');
const debug = require('../io/debug')('stub:tb');
const { get, set } = require('../timeBar/index');

let tb ;

function onTbStubUpdate(buffer) {
  // Convert buffer to string : Needed when using zmq
  let cmdList ;
  const string = buffer.toString();
  try {
    cmdList = JSON.parse(string);
  } catch (err) {
      // Error parsing JSON
    throw (err);
  }
  // Timebar Update
  for (item in cmdList) {
    tb.data.action = item;
    switch (item) {
      case 'currentTimeUpd':
        tb.data.visuWindow.current += cmdList[item];
        break;
      case 'tlAdded':
        tb.data.timeLines.push(cmdList[item]);
        break;
      case 'tlRemoved':
        if (cmdList[item] == 0) tb.data.timeLines.splice(0,1);
        else tb.data.timeLines.splice(tb.data.timeLines.length-1,1);
        break;
      case 'tlOffsetUpd':
        for (let i = 0; i < tb.data.timeLines.length; i++) {
          tb.data.timeLines[i].offset += cmdList[item];
        }
        break;
      default:
        debug.error('Command', item, 'not implemented in stub!');
    }
  }
  // Send new tb;
  zmq.push('timebarPush', JSON.stringify(tb), () => {
    debug.info('tb updated sent');
  })
}

module.exports = (tbInit, callback) => {
  // ZMQ initialization
  zmq.open({
    timebarPush: {
      type: 'push',
      url: process.env.ZMQ_VIMA_TIMEBAR,
    },
    tbCliPull: {
      type: 'pull',
      url: process.env.ZMQ_VIMA_STUB_TIMEBAR,
      handler: onTbStubUpdate,
    },
  }, err => {
    if (err) {
      return callback(err);
    }
    tb = tbInit;
    debug.info('sockets opened');

    return callback(null);
  });
};
