const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_FILEPATH_QUERY,
});

/**
 * Triggered when request a file path from its oId
 *
 * - send a DomainQuery message to DC
 *
 * @param queryId
 * @param payload
 * @param sendDcMessage
 */
const filepathQuery = (queryId, payload, sendDcMessage) => {
  sendDcMessage([
    protobufHeader,
    encode('dc.dataControllerUtils.String', { string: queryId }),
    encode('dc.dataControllerUtils.String', { string: payload.oid }),
  ]);
};

module.exports = {
  filepathQuery,
  onFilepathQuery: (queryId, payload) => filepathQuery(
    queryId,
    payload,
    args => zmq.push('dcPush', args)
  ),
};
