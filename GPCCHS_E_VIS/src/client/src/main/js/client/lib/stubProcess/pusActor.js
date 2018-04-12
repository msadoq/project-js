const { resolve } = require('path');
const zmq = require('common/zmq');
const logger = require('../common/logManager')('stubs:utils');
const adapter = require('../utils/adapters');
const stubs = require('../utils/stubs');
const constants = require('../constants');
const parameters = require('../common/configurationManager');

parameters.init(resolve(__dirname, '../..'));
adapter.registerGlobal();
stubs.loadStubs();

const onMessage = () => {

};

const sendMessage = () => {
  const toSend = `hello ${Date.now()}`;
  logger.debug(`Sending ${toSend}`);
  // console.log(`Sending ${toSend}`);
  zmq.push('stubPusPush', toSend);
  return nextPusActorCall(); // eslint-disable-line no-use-before-define
};

const nextPusActorCall = () => {
  setTimeout(sendMessage, constants.DC_STUB_FREQUENCY);
};

zmq.open(
  {
    stubPusPull: {
      type: 'pull',
      role: 'server',
      url: parameters.get('ZMQ_PUS_PUSH'),
      handler: onMessage,
    },
    stubPusPush: {
      type: 'push',
      role: 'client',
      url: parameters.get('ZMQ_PUS_PULL'),
    },
  },
  (err) => {
    if (err) {
      throw err;
    }
    logger.info('sockets opened');
    if (process.send) { // only when started as child process
      process.send({ [constants.CHILD_PROCESS_READY_MESSAGE_TYPE_KEY]: true });
    }

    nextPusActorCall();
  }
);
