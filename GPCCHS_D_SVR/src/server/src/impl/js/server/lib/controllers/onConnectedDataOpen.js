const debug = require('../io/debug')('controllers:onConnectedDataOpen');
const { v4 } = require('node-uuid');
const formula = require('../utils/formula');
const { encode } = require('../protobuf');
const zmq = require('../io/zmq');
const registeredCallbacks = require('../utils/registeredCallbacks');
const connectedDataModel = require('../models/connectedData');

/**
 * Triggered when a new connected data is mounted on HSC and should be whitelisted in
 * DC pub/sub filter.
 *
 * - store as subscribed connectedData
 * - send subscription request to DC
 *
 * @param spark
 * @param payload
 * @param messageHandler
 */
const startConnectedDataSubscription = (spark, payload, messageHandler) => {
  debug.debug(spark.id, 'connectedData opened', payload);

  const parameter = formula(payload.formula);

  const localId = connectedDataModel.getLocalId(parameter);

  if (connectedDataModel.isConnectedDataInWindows(localId)) {
    connectedDataModel.addWindowId(localId, payload.windowId);
    return;
  }

  connectedDataModel.addWindowId(localId, payload.windowId);

  const id = v4();

  registeredCallbacks.set(id, (respErr) => {
    if (respErr) throw respErr;
  });

  const buffer = encode('dc.dataControllerUtils.DcClientMessage', {
    messageType: 'DATA_SUBSCRIBE',
    payload: encode('dc.dataControllerUtils.DataSubscribe', {
      action: 'ADD',
      id,
      dataId: {
        parameterName: parameter.parameterName,
        catalog: parameter.catalog,
        comObject: parameter.comObject,
        sessionId: 1234, // TODO : use payload.timeline, compute wildcard and read timebar state
        domainId: 2345, // TODO : payload.domain, compute wildcard and read timebar state
      },
    }),
  });

  messageHandler('dcPush', buffer, (msgErr) => {
    if (msgErr) {
      connectedDataModel.removeWindowId(localId, payload.windowId); // TODO test
      registeredCallbacks.remove(id);
      throw msgErr;
    }
  });
};

const onConnectedDataOpen = (spark, payload) =>
  startConnectedDataSubscription(spark, payload, zmq.push);

module.exports = {
  startConnectedDataSubscription,
  onConnectedDataOpen,
};
