const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_DOMAIN_QUERY,
});

/**
 * Triggered on domain list query
 *
 * - forward to DC
 *
 * @param queryId
 * @param sendDcMessage
 */
const domainsQuery = (queryId, sendDcMessage) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
]);

module.exports = {
  domainsQuery,
  onDomainsQuery: queryId => domainsQuery(
    queryId,
    args => zmq.push('dcPush', args)
  ),
};
