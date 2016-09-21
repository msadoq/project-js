const debug = require('../io/debug')('controllers:onConnectedDataOpen');
const { v4 } = require('node-uuid');
const { encode } = require('../protobuf');
const zmq = require('../io/zmq');
const registeredCallbacks = require('../utils/registeredCallbacks');
const connectedDataModel = require('../models/connectedData');

function onError(err) {
  if (err) {
    throw err;
  }
}

/**
 * Triggered when a new connected data is mounted on HSC and should be whitelisted in DC pub/sub
 * filter.
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

  const localId = connectedDataModel.getLocalId(payload);

  if (connectedDataModel.isConnectedDataInWindows(localId)) {
    return connectedDataModel.addWindowId(localId, payload.windowId);
  }

  connectedDataModel.addWindowId(localId, payload.windowId);

  const id = v4();
  registeredCallbacks.set(id, onError);

  const buffer = encode('dc.dataControllerUtils.DcClientMessage', {
    messageType: 'DATA_SUBSCRIBE',
    payload: encode('dc.dataControllerUtils.DataSubscribe', {
      action: 'ADD',
      id,
      dataId: {
        parameterName: payload.parameterName,
        catalog: payload.catalog,
        comObject: payload.comObject,
        sessionId: payload.sessionId,
        domainId: payload.domainId,
      },
    }),
  });

  return messageHandler('dcPush', buffer, (msgErr) => {
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
