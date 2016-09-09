const zmq = require('../io/zmq');
const debug = require('../io/debug')('stub:tb');
const _ = require('lodash');

let tb;

function onTbStubUpdate(buffer) {
  // Convert buffer to string : Needed when using zmq
  let cmdList;
  const string = buffer.toString();
  try {
    cmdList = JSON.parse(string);
  } catch (err) {
      // Error parsing JSON
    throw (err);
  }
  // Timebar Update
  _.each(cmdList, (param, command) => {
    tb.action = command;
    switch (command) {
      case 'currentTimeUpd':
        tb.visuWindow.current += param;
        break;
      case 'tlAdded':
        tb.timeLines.push(param);
        break;
      case 'tlRemoved':
        if (param === 0) {
          tb.timeLines.splice(0, 1);
        } else {
          tb.timeLines.splice(tb.timeLines.length - 1, 1);
        }
        break;
      case 'tlOffsetUpd':
        for (let i = 0; i < tb.timeLines.length; i++) {
          tb.timeLines[i].offset += param;
        }
        break;
      default:
        debug.error('Command ${command} not implemented in stub!');
    }
  });
  // Send new tb;
  zmq.push('timebarPush', JSON.stringify(tb), () => {
    debug.info('tb updated sent');
  });
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
