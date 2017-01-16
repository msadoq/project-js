const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY,
});

/**
 * Triggered on FMD create query
 *
 * - forward to DC
 *
 * @param queryId
 * @param payload
 * @param sendDcMessage
 */
const fmdCreate = (queryId, payload, sendDcMessage) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
  encode('dc.dataControllerUtils.FMDCreateDocument', {
    name: payload.name,
    path: payload.path,
    mimeType: payload.mimeType,
  }),
]);

module.exports = {
  fmdCreate,
  onFmdCreate: (queryId, payload) => fmdCreate(
    queryId,
    payload,
    args => zmq.push('dcPush', args)
  ),
};
