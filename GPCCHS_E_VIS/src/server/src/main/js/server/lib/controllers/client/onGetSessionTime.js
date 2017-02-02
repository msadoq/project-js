const { encode } = require('common/protobuf');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_SESSION_TIME_QUERY,
});

/**
 * Triggered on session time query
 *
 * - forward to DC
 *
 * @param sendDcMessage
 * @param queryId
 * @param sessionId
 */
module.exports = (sendDcMessage, queryId, { sessionId }) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
  encode('dc.dataControllerUtils.SessionGetTime', { id: sessionId }),
]);
