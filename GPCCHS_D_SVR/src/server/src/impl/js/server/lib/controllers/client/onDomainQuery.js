const debug = require('../../io/debug')('controllers:onDomainQuery');
const { encode } = require('../../protobuf');
const { v4 } = require('node-uuid');
const zmq = require('../../io/zmq');

/**
 * Triggered when there is a new domain query on HSC
 *
 * - send a DomainQuery message to DC
 *
 * @param spark
 */
const domainQuery = (spark, payload, messageHandler) => {
  debug.debug(spark.id, 'new domain query', payload);

  const queryId = v4();
  const buffer = encode('dc.dataControllerUtils.DcClientMessage', {
    messageType: 3, // DOMAIN QUERY
    payload: encode('dc.dataControllerUtils.DomainQuery', { id: queryId }),
  });

  messageHandler('dcPush', buffer);
};

const onDomainQuery = (spark, payload) =>
  domainQuery(spark, payload, zmq.push);

module.exports = {
  domainQuery,
  onDomainQuery,
};
