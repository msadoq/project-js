const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_SESSION_QUERY,
});

/**
 * Triggered when there is a new session query on HSC
 *
 * - send a SessionQuery message to DC
 *
 * @param queryId
 * @param sendDcMessage
 */
const sessionQuery = (queryId, sendDcMessage) => {
  sendDcMessage([
    protobufHeader,
    encode('dc.dataControllerUtils.String', { string: queryId }),
  ]);
};

module.exports = {
  sessionQuery,
  onSessionQuery: queryId => sessionQuery(
    queryId,
    args => zmq.push('dcPush', args)
  ),
};
