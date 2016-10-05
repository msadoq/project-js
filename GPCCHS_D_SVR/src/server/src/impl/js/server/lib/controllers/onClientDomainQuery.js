const debug = require('../io/debug')('controllers:onClientDomainQuery');
const { encode } = require('../protobuf');
const { v4 } = require('node-uuid');
const zmq = require('../io/zmq');

/**
 * Triggered when there is a new domain query on HSC
 * @param spark
 */
const queryDomains = (spark, payload, messageHandler) => {
  debug.debug(spark.id, 'new domain query', payload);

  const id = v4();

  const buffer = encode('dc.dataControllerUtils.DcClientMessage', {
    messageType: 'DOMAIN_QUERY', // 3, //
    payload: encode('dc.dataControllerUtils.DomainQuery', { id }),
  });

  messageHandler('dcPush', buffer, (msgErr) => {
    if (msgErr) {
      throw msgErr;
    }
  });
};

const onClientDomainQuery = (spark, payload) =>
  queryDomains(spark, payload, zmq.push);

module.exports = {
  queryDomains,
  onClientDomainQuery,
};
