const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_SESSION_MASTER_QUERY,
});

/**
 * Triggered on master session query
 *
 * - forward to DC
 *
 * @param queryId
 * @param sendDcMessage
 */
const masterSessionQuery = (queryId, sendDcMessage) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
]);

module.exports = {
  masterSessionQuery,
  onGetMasterSession: queryId => masterSessionQuery(
    queryId,
    args => zmq.push('dcPush', args)
  ),
};
