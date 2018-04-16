const encoding = require('text-encoding');
const { resolve } = require('path');
const zmq = require('common/zmq');
const logger = require('../common/logManager')('stubs:utils');
const adapter = require('../utils/adapters');
const stubs = require('../utils/stubs');
const constants = require('../constants');
const parameters = require('../common/configurationManager');

const decoder = new encoding.TextDecoder();

parameters.init(resolve(__dirname, '../..'));
adapter.registerGlobal();
stubs.loadStubs();

const onMessage = (...args) => {
  console.log(decoder.decode(args[0]));
  switch (parseInt(decoder.decode(args[0]), 10)) {
    case constants.PUS_INITIALIZE:
      logger.info(`Received PUS INITIALIZE :  ${decoder.decode(args[1])}`);
      break;
    case constants.PUS_SUBSCRIBE:
      logger.info(`Received PUS SUBSCRIBE :  ${decoder.decode(args[1])}`);
      break;
    case constants.PUS_UNSUBSCRIBE:
      logger.info(`Received PUS UNSUBSCRIBE :  ${decoder.decode(args[1])}`);
      break;
    case constants.PUS_COMPARE:
      logger.info(`Received PUS COMPARE :  ${decoder.decode(args[1])}`);
      break;
    case constants.PUS_RESET:
      logger.info(`Received PUS RESET :  ${decoder.decode(args[1])}`); 
      break;
    default:
      break;
  }
};

const sendMessage = (method, payload) => {
  const toSend = `${method} ${payload}`;
  logger.debug(`Sending ${toSend}`);
  // console.log(`Sending ${toSend}`);
  zmq.push('stubPusPush', toSend);
  // return nextPusActorCall(); // eslint-disable-line no-use-before-define
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
