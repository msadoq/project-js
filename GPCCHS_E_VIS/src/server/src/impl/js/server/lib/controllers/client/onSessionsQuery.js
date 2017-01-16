const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_SESSION_QUERY,
});

/**
 * Triggered on session list query
 *
 * - forward to DC
 *
 * @param queryId
 * @param sendDcMessage
 */
const sessionsQuery = (queryId, sendDcMessage) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
]);

module.exports = {
  sessionsQuery,
  onSessionsQuery: queryId => sessionsQuery(
    queryId,
    args => zmq.push('dcPush', args)
  ),
};
