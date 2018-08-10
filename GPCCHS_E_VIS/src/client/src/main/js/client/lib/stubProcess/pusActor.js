// const encoding = require('text-encoding');
const { resolve } = require('path');
const sendPusData = require('./pusUtils/sendPusData');
const sendPubSubPusData = require('./pusUtils/sendPubSubPusData');
const _omit = require('lodash/omit');
const _each = require('lodash/each');
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

let subscriptions = {};
let queries = [];

const onMessage = (...args) => {
  logger.debug('onMessage Pus');
  const header = adapter.decode('isis.pusModelEditorMessages.HeaderStructure', args[0]);
  const messageType = header.messageType.value;
  switch (messageType) {
    case constants.PUS_INITIALIZE: {
      logger.debug('Received PUS INITIALIZE');
      const {
        firstTime,
        lastTime,
        continuous,
      } = adapter.decode('isis.pusModelEditorMessages.InitialiseStructure', args[1]);
      const { sessionId, domainId, pusService, pusServiceApid } = header;
      const cleanPusServiceApid = pusServiceApid.map(apid => _omit(apid.value, 'type'));
      const dataId = {
        sessionId: sessionId.value,
        domainId: domainId.value,
        pusService: pusService.value,
        pusServiceApid: cleanPusServiceApid,
      };
      queries.push({
        firstTime: firstTime.value,
        lastTime: lastTime.value,
        continuous: continuous.value,
        dataId,
      });
      return logger.debug(`Send pus: ${constants.PUS_INITIALIZE}`);
    }
    case constants.PUS_SUBSCRIBE: {
      const { sessionId, domainId, pusService, pusServiceApid } = header;
      const cleanPusServiceApid = pusServiceApid.map(apid => _omit(apid.value, 'type'));
      const dataId = {
        sessionId: sessionId.value,
        domainId: domainId.value,
        pusService: pusService.value,
        pusServiceApid: cleanPusServiceApid,
      };
      const flattenId = `${pusServiceApid.map(apid => apid.value.value).join(',')}:${sessionId.value}:${domainId.value}`;
      subscriptions[flattenId] = {
        dataId,
      };
      logger.debug('Received PUS SUBSCRIBE');
      return logger.debug('subscription added', flattenId);
    }
    case constants.PUS_UNSUBSCRIBE: {
      const { sessionId, domainId, pusServiceApid } = header;
      const flattenId = `${pusServiceApid.map(apid => apid.value.value).join(',')}:${sessionId.value}:${domainId.value}`;
      subscriptions = _omit(subscriptions, flattenId);
      logger.debug('Received PUS UNSUBSCRIBE');
      return logger.debug('subscription deleted', flattenId);
    }
    case constants.PUS_COMPARE:
      logger.debug('Received PUS COMPARE');
      return logger.debug(`Send pus: ${constants.PUS_COMPARE}`);
    case constants.PUS_RESET:
      logger.debug('Received PUS RESET');
      return logger.debug(`Send pus: ${constants.PUS_RESET}`);
    default:
      return logger.error(`Unknown message type ${messageType}`);
  }
};

function pusCall() {
  logger.debug('pusCall call', Object.keys(subscriptions).length, Object.keys(queries).length);

  // PUB SUB
  _each(subscriptions, (subscription) => {
    logger.debug(`push pub/sub data for ${subscription.dataId.parameterName}`);
    sendPubSubPusData(
      subscription.dataId,
      zmq
    );
  });

  // INITIALIZATION
  _each(queries, (query) => {
    logger.debug(`push archive data for ${query.dataId.pusService}`);
    sendPusData(
      query.firstTime,
      query.lastTime,
      query.continuous,
      query.dataId,
      zmq
    );
  });
  queries = [];
  return nextPusCall(); // eslint-disable-line no-use-before-define
}

function nextPusCall() {
  setTimeout(pusCall, constants.DC_STUB_FREQUENCY);
}

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

    nextPusCall();
  }
);
