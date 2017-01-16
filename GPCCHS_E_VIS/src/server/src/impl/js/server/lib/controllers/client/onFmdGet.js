const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_FMD_GET_QUERY,
});

/**
 * Triggered on FMD get query
 *
 * - forward to DC
 *
 * @param queryId
 * @param oid
 * @param sendDcMessage
 */
const fmdGet = (queryId, oid, sendDcMessage) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
  encode('dc.dataControllerUtils.FMDGet', { serializedOid: oid }),
]);

module.exports = {
  fmdGet,
  onFmdGet: (queryId, { oid }) => fmdGet(
    queryId,
    oid,
    args => zmq.push('dcPush', args)
  ),
};
