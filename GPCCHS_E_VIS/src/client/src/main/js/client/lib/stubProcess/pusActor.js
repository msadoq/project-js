// const encoding = require('text-encoding');
const { resolve } = require('path');
const sendPusData = require('./pusUtils/sendPusData');
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

const onMessage = (...args) => {
  const header = adapter.decode('isis.pusModelEditorMessages.HeaderStructure', args[0]);
  switch (header.messageType.value) {
    case constants.PUS_INITIALIZE:
      logger.info('Received PUS INITIALIZE');
      sendPusData(
        header,
        adapter.decode('isis.pusModelEditorMessages.InitialiseStructure', args[1]),
        zmq
      );
      break;
    case constants.PUS_SUBSCRIBE:
      logger.info('Received PUS SUBSCRIBE');
      const decodedSub = adapter.decode('isis.pusModelEditorMessages.SubscribeStructure', args[1]);
      console.log(decodedSub);
      break;
    case constants.PUS_UNSUBSCRIBE:
      logger.info('Received PUS UNSUBSCRIBE');
      const decodedUnsub = adapter.decode('isis.pusModelEditorMessages.UnsubsribeStructure', args[1]);
      console.log(decodedUnsub);
      break;
    case constants.PUS_COMPARE:
      logger.info('Received PUS COMPARE');
      const decodedComp = adapter.decode('isis.pusModelEditorMessages.CompareStructure', args[1]);
      console.log(decodedComp);
      break;
    case constants.PUS_RESET:
      logger.info('Received PUS RESET');
      const decodedReset = adapter.decode('isis.pusModelEditorMessages.ResetStructure', args[1]);
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
  }
);
