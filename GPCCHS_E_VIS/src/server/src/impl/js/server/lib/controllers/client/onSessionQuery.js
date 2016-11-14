const debug = require('../../io/debug')('controllers:onSessionQuery');
// eslint-disable-next-line import/no-extraneous-dependencies
const { encode } = require('common/protobuf');
// eslint-disable-next-line import/no-extraneous-dependencies
const zmq = require('common/zmq');
const registeredCallbacks = require('../../utils/registeredCallbacks');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');

/**
 * Triggered when there is a new session query on HSC
 *
 * - send a SessionQuery message to DC
 *
 * @param spark
 */

const protobufSessionHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_SESSION_QUERY,
});
let idIndex = 0;
const generateSessionId = () => {
  idIndex += 1;
  return `session${idIndex}`;
};

const errorCallback = (err) => {
  if (err) {
    throw err;
  }
};

const sessionQuery = (messageHandler) => {
  debug.debug('new session query');

  // create and register queryId
  const id = generateSessionId();
  registeredCallbacks.set(id, errorCallback);
  // protobufferize queryId
  const queryId = encode('dc.dataControllerUtils.String', {
    string: id,
  });

  const queryArgs = [protobufSessionHeader, queryId];

  messageHandler('dcPush', queryArgs);
};

const onSessionQuery = () =>
  sessionQuery(zmq.push);

module.exports = {
  sessionQuery,
  onSessionQuery,
};
