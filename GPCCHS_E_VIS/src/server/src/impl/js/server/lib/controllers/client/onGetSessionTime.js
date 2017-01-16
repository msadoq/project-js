const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_SESSION_TIME_QUERY,
});

/**
 * Triggered on session time query
 *
 * - forward to DC
 *
 * @param queryId
 * @param sessionId
 * @param sendDcMessage
 */
const sessionTimeQuery = (queryId, sessionId, sendDcMessage) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
  encode('dc.dataControllerUtils.SessionGetTime', { id: sessionId }),
]);

module.exports = {
  sessionTimeQuery,
  onGetSessionTime: (queryId, { sessionId }) => sessionTimeQuery(
    queryId,
    sessionId,
    args => zmq.push('dcPush', args)
  ),
};
