const { encode } = require('../../../utils/adapters');
const globalConstants = require('../../../constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_FMD_GET_QUERY,
});

/**
 * Triggered on FMD get query
 *
 * - forward to DC
 *
 * @param sendDcMessage
 * @param queryId
 * @param oid
 */
module.exports = (sendDcMessage, queryId, { oid }) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
  encode('dc.dataControllerUtils.FMDGet', { serializedOid: oid }),
]);
