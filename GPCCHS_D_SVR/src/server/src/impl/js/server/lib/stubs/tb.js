const zmq = require('../io/zmq');
const debug = require('../io/debug')('stub:tb');
const _ = require('lodash');

let tb = [];

function onVimaTbStubUpdate(buffer) {
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
  const tbHead = _.head(tb);
  _.each(cmdList, (param, command) => {
    tbHead.action = command;
    switch (command) {
      case 'currentTimeUpd':
        tbHead.visuWindow.current += param;
        break;
      case 'tlAdded':
        tbHead.timeLines.push(param);
        break;
      case 'tlRemoved':
        if (param === 0) {
          tbHead.timeLines.splice(0, 1);
        } else {
          tbHead.timeLines.splice(tbHead.timeLines.length - 1, 1);
        }
        break;
      case 'tlOffsetUpd':
        _.each(tbHead.timeLines, (tl) => {
          tl.offset += param; // eslint-disable-line no-param-reassign
        });
        break;
      default:
        debug.error('Command ${command} not implemented in stub!');
    }
  });
  // Send new tb;
  zmq.push('vimaTimebarPush', JSON.stringify(tbHead), () => {
    debug.info('tb updated sent');
  });
}

function onVimaTbStubInit(timebarBuffer) {
  // Convert buffer to string : Needed when using zmq
  let timebars;
  const string = timebarBuffer.toString();
  try {
    timebars = JSON.parse(string);
  } catch (err) {
      // Error parsing JSON
    throw (err);
  }
  tb = timebars;
  debug.info('onTbStubInit', tb)
}

module.exports = (callback) => {
  // ZMQ initialization
  zmq.open({
    vimaTimebarPush: {
      type: 'push',
      url: process.env.ZMQ_VIMA_TIMEBAR,
    },
    vimaTbCliPull: {
      type: 'pull',
      url: process.env.ZMQ_VIMA_STUB_TIMEBAR,
      handler: onVimaTbStubUpdate,
    },
    vimaTimebarInit: {
      type: 'pull',
      url: process.env.ZMQ_VIMA_TIMEBAR_INIT,
      handler: onVimaTbStubInit,
    },
  }, err => {
    if (err) {
      return callback(err);
    }

    // setTimebar(tb);
    debug.info('sockets opened');

    return callback(null);
  });
};
