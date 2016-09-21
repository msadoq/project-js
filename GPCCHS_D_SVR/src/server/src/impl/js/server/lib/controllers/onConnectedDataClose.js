const debug = require('../io/debug')('controllers:onConnectedDataClose');
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
 * Triggered when a connectedData is unmounted on HSC and should be unsubscribed from
 * DC pub/sub filter.
 *
 * - store as subscribed connectedData
 * - send unsubscription request to DC
 *
 * @param spark
 * @param payload
 * @param messageHandler
 */
const endConnectedDataSubscription = (spark, payload, messageHandler) => {
  debug.debug(spark.id, 'connectedData closed', payload);

  const localId = connectedDataModel.getLocalId(payload);

  connectedDataModel.removeWindowId(localId, payload.windowId);

  if (connectedDataModel.isConnectedDataInWindows(localId)) {
    return undefined;
  }

  const id = v4();
  registeredCallbacks.set(id, onError);

  const buffer = encode('dc.dataControllerUtils.DcClientMessage', {
    messageType: 'DATA_SUBSCRIBE',
    payload: encode('dc.dataControllerUtils.DataSubscribe', {
      action: 'DELETE',
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
      connectedDataModel.addWindowId(localId, payload.windowId); // TODO test
      throw msgErr;
    }
  });
};

const onConnectedDataClose = (spark, payload) =>
  endConnectedDataSubscription(spark, payload, zmq.push);

module.exports = {
  endConnectedDataSubscription,
  onConnectedDataClose,
};
