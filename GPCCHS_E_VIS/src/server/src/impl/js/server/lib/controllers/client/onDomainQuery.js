const debug = require('../../io/debug')('controllers:onDomainQuery');
// eslint-disable-next-line import/no-extraneous-dependencies
const { encode } = require('common/protobuf');
// eslint-disable-next-line import/no-extraneous-dependencies
const zmq = require('common/zmq');
// eslint-disable-next-line import/no-extraneous-dependencies
const registeredCallbacks = require('common/callbacks/register');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');

/**
 * Triggered when there is a new domain query on HSC
 *
 * - send a DomainQuery message to DC
 *
 * @param spark
 */

const protobufDomainHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_DOMAIN_QUERY,
});
let idIndex = 0;
const generateDomainId = () => {
  idIndex += 1;
  return `domain${idIndex}`;
};

const errorCallback = (err) => {
  if (err) {
    throw err;
  }
};

const domainQuery = (messageHandler) => {
  debug.debug('new domain query');

  // create and register queryId
  const id = generateDomainId();
  registeredCallbacks.set(id, errorCallback);
  // protobufferize queryId
  const queryId = encode('dc.dataControllerUtils.String', {
    string: id,
  });

  const queryArgs = [protobufDomainHeader, queryId];

  messageHandler('dcPush', queryArgs);
};

const onDomainQuery = () =>
  domainQuery(zmq.push);

module.exports = {
  domainQuery,
  onDomainQuery,
};
