const debug = require('../../io/debug')('controllers:onDomainQuery');
const { encode } = require('../../protobuf');
const { v4 } = require('node-uuid');
const zmq = require('../../io/zmq');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const constants = require('../../constants');

/**
 * Triggered when there is a new domain query on HSC
 *
 * - send a DomainQuery message to DC
 *
 * @param spark
 */
const domainQuery = (messageHandler) => {
  debug.debug('new domain query');

  // protobufferize messageType
  const domainQueryHeader = encode('dc.dataControllerUtils.Header', {
    messageType: constants.MESSAGETYPE_DOMAIN_QUERY,
  });

  // create and register queryId
  const id = v4();
  registeredCallbacks.set(id, (err) => {
    if (err) {
      throw err;
    }
  });
  // protobufferize queryId
  const queryId = encode('dc.dataControllerUtils.String', {
    string: id,
  });

  const queryArgs = [domainQueryHeader, queryId];

  messageHandler('dcPush', queryArgs);
};

const onDomainQuery = () =>
  domainQuery(zmq.push);

module.exports = {
  domainQuery,
  onDomainQuery,
};
