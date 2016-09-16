const debug = require('../io/debug')('controllers:onConnectedDataOpen');
const { v4 } = require('node-uuid');
const formula = require('../utils/formula');
const protobuf = require('../protobuf');
const zmq = require('../io/zmq');

/**
 * Triggered when a new connected data is mounted on HSC
 * @param spark
 */
const onConnectedDataOpen = (spark, payload, zmqAdapter) => {
  debug.debug(spark.id, 'connectedData opened', payload);

  const parameter = formula(payload.formula);

  const buffer = protobuf.encode('dc.dataControllerUtils.DcClientMessage', {
    messageType: 'DATA_SUBSCRIBE',
    payload: protobuf.encode('dc.dataControllerUtils.DataSubscribe', {
      action: 'ADD',
      id: v4(),
      dataId: {
        parameterName: parameter.parameter,
        catalog: parameter.catalog,
        comObject: parameter.comObject,
        sessionId: 1234, // TODO : use payload.timeline, compute wildcard and read timebar state
        domainId: 2345, // TODO : payload.domain, compute wildcard and read timebar state
      },
    }),
  });

  return buffer;
};

const call = (spark, payload) => onConnectedDataOpen(spark, payload, zmq);

module.exports = { call, onConnectedDataOpen };
