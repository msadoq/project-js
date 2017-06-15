const { encode } = require('../../../utils/adapters');
const globalConstants = require('../../../constants');
const { registerProtobuf } = require('../../../common/test');

registerProtobuf();

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_SESSION_MASTER_QUERY,
});

/**
 * Triggered on master session query
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
