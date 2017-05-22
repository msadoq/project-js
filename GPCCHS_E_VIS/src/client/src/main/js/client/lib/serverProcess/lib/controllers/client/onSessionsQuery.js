const { encode } = require('common/protobuf');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_SESSION_QUERY,
});

/**
 * Triggered on session list query
 *
 * - forward to DC
 *
 * @param sendDcMessage
 * @param queryId
 */
module.exports = (sendDcMessage, queryId) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
]);
