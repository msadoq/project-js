// const encoding = require('text-encoding');
const { resolve } = require('path');
const zmq = require('common/zmq');
const logger = require('../common/logManager')('stubs:utils');
const adapter = require('../utils/adapters');
const stubs = require('../utils/stubs');
const constants = require('../constants');
const parameters = require('../common/configurationManager');

// const decoder = new encoding.TextDecoder();

parameters.init(resolve(__dirname, '../..'));
adapter.registerGlobal();
stubs.loadStubs();

process.title = 'pusActorStub';

const stubData = stubs.getStubData();

const sendMessage = (method, payload) => {
  const toSend = `${method} ${payload}`;
  logger.debug(`Sending ${toSend}`);
  // console.log(`Sending ${toSend}`);
  zmq.push('stubPusPush', [
    adapter.encode('pusActor.pusUtils.PusHeader', { method }),
    payload,
  ]
  );
  // return nextPusActorCall(); // eslint-disable-line no-use-before-define
};

const nextPusActorCall = () => {
  setTimeout(sendMessage, constants.DC_STUB_FREQUENCY);
};

const onMessage = (...args) => {
  const header = adapter.decode('pusActor.pusUtils.PusHeader', args[0]);
  console.log(header);
  switch (header.method) {
    case constants.PUS_INITIALIZE:
      logger.info('Received PUS INITIALIZE');
      // const decodedInit = adapter.decode('pusActor.pusUtils.PusInitialize', args[1]);
      sendMessage(
        constants.PUS_ON_INITIALIZE,
        adapter.encode('pusActor.pusUtils.PusOnInitialize', {
          pusWholeModel: {
            pusName: 'Pus011Model',
            modelUniqueId: 'myUniqueId',
            payload: stubData.getPus011ModelProtobuf(),
          },
          deltas: [],
        })
      );
      break;
    case constants.PUS_SUBSCRIBE:
      logger.info('Received PUS SUBSCRIBE');
      const decodedSub = adapter.decode('pusActor.pusUtils.PusSubscribe', args[1]);
      console.log(decodedSub);
      break;
    case constants.PUS_UNSUBSCRIBE:
      logger.info('Received PUS UNSUBSCRIBE');
      const decodedUnsub = adapter.decode('pusActor.pusUtils.PusUnsubscribe', args[1]);
      console.log(decodedUnsub);
      break;
    case constants.PUS_COMPARE:
      logger.info('Received PUS COMPARE');
      const decodedComp = adapter.decode('pusActor.pusUtils.PusCompare', args[1]);
      console.log(decodedComp);
      break;
    case constants.PUS_RESET:
      logger.info('Received PUS RESET');
      const decodedReset = adapter.decode('pusActor.pusUtils.PusReset', args[1]);
      console.log(decodedReset);
      break;
    default:
      break;
  }
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
