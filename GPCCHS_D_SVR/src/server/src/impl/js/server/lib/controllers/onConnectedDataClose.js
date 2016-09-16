const debug = require('../io/debug')('controllers:onConnectedDataClose');
const { v4 } = require('node-uuid');
const formula = require('../utils/formula');
const { encode } = require('../protobuf');
const zmq = require('../io/zmq');
const { set } = require('../utils/registeredCallbacks');

/**
 * Triggered when a new connected data is unmounted on HSC
 * @param spark
 */

const endConnectedDataSubscription = (spark, payload, messageHandler) => {
  debug.debug(spark.id, 'connectedData closed', payload);

  const parameter = formula(payload.formula);

  const id = v4();

  const buffer = encode('dc.dataControllerUtils.DcClientMessage', {
    messageType: 'DATA_SUBSCRIBE',
    payload: encode('dc.dataControllerUtils.DataSubscribe', {
      action: 'DELETE',
      id,
      dataId: {
        parameterName: parameter.parameter,
        catalog: parameter.catalog,
        comObject: parameter.comObject,
        sessionId: 1234, // TODO : use payload.timeline, compute wildcard and read timebar state
        domainId: 2345, // TODO : payload.domain, compute wildcard and read timebar state
      },
    }),
  });

  messageHandler('dcPush', buffer, (msgErr) => {
    if (msgErr) throw msgErr;
    set(id, (respErr) => {
      if (respErr) throw respErr;
    });
  });
};

const onConnectedDataClose = (spark, payload) =>
  endConnectedDataSubscription(spark, payload, zmq.push);

module.exports = {
  endConnectedDataSubscription,
  onConnectedDataClose,
};
