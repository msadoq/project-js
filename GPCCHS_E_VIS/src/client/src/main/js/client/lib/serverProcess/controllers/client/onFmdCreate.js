const { encode } = require('../../../utils/adapters');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY,
});

/**
 * Triggered on FMD create query
 *
 * - forward to DC
 * @param sendDcMessage
 * @param queryId
 * @param payload
 */
module.exports = (sendDcMessage, queryId, payload) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
  encode('dc.dataControllerUtils.FMDCreateDocument', {
    name: payload.name,
    path: payload.path,
    mimeType: payload.mimeType,
  }),
]);
