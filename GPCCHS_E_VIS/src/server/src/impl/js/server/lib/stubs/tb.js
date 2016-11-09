// eslint-disable-next-line import/no-extraneous-dependencies
const zmq = require('common/zmq');
const debug = require('../io/debug')('stub:tb');
const {
  head: _head,
  each: _each,
} = require('lodash');

const tb = [];

function onVimaTbStubUpdate(buffer) {
  const cmdList = JSON.parse(buffer.toString());
  // Timebar Update
  const tbHead = _head(tb);
  _each(cmdList, (param, command) => {
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
        _each(tbHead.timeLines, (tl) => {
          tl.offset += param; // eslint-disable-line no-param-reassign
        });
        break;
      default:
        debug.error(`Command ${command} not implemented in stub!`);
    }
  });
  // Send new tb;
  zmq.push('vimaTimebarPush', JSON.stringify(tbHead), () => {
    debug.info('tb updated sent');
  });
}

function onVimaTbStubInit(timebarBuffer) {
  tb.push(JSON.parse(timebarBuffer.toString()));
  debug.info('onTbStubInit');
}

module.exports = (callback) => {
  // ZMQ initialization
  zmq.open({
    vimaTimebarPush: {
      type: 'push',
      role: 'client',
      url: process.env.ZMQ_VIMA_TIMEBAR,
    },
    vimaTbCliPull: {
      type: 'pull',
      role: 'server',
      url: process.env.ZMQ_VIMA_STUB_TIMEBAR,
      handler: onVimaTbStubUpdate,
    },
    vimaTimebarInit: {
      type: 'pull',
      role: 'server',
      url: process.env.ZMQ_VIMA_TIMEBAR_INIT,
      handler: onVimaTbStubInit,
    },
  }, (err) => {
    if (err) {
      return callback(err);
    }

    debug.info('sockets opened');

    return callback(null);
  });
};
