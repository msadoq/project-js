const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const protobufHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_DOMAIN_QUERY,
});

/**
 * Triggered when there is a new domain query on HSC
 *
 * - send a DomainQuery message to DC
 *
 * @param queryId
 * @param sendDcMessage
 */
const domainQuery = (queryId, sendDcMessage) => sendDcMessage([
  protobufHeader,
  encode('dc.dataControllerUtils.String', { string: queryId }),
]);

module.exports = {
  domainQuery,
  onDomainQuery: queryId => domainQuery(
    queryId,
    args => zmq.push('dcPush', args)
  ),
};
