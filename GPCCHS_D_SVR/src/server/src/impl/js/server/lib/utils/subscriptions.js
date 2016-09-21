const debug = require('../io/debug')('utils:subscriptions');
const connectedDataModel = require('../models/connectedData');
const cacheJsonModel = require('../models/cacheJson');
const { v4 } = require('node-uuid');
const registeredCallbacks = require('../utils/registeredCallbacks');
const { encode } = require('../protobuf');

const createSubscriptionMessage = (action, id, payload) => encode('dc.dataControllerUtils.DcClientMessage', {
  messageType: 'DATA_SUBSCRIBE',
  payload: encode('dc.dataControllerUtils.DataSubscribe', {
    action,
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

const cleanupModels = (dataId) => {
  if (connectedDataModel.isConnectedDataInWindows(dataId)) {
    return;
  }
  cacheJsonModel.removeByDataId(dataId);
  connectedDataModel.removeByDataId(dataId);
};

/**
 * Send a message to add a subscription via a message handler
 * - store as subscribed connectedData
 * - send subscription request to DC
 *
 * @param payload
 * @param messageHandler
 */
const start = (payload, messageHandler) => {
  debug.debug('start subscription', payload);

  if (connectedDataModel.isConnectedDataInWindows(payload)) {
    return connectedDataModel.addWindowId(payload, payload.windowId);
  }

  connectedDataModel.addWindowId(payload, payload.windowId);

  const id = v4();

  registeredCallbacks.set(id, (respErr) => {
    if (respErr) {
      throw respErr;
    }
  });

  const buffer = createSubscriptionMessage('ADD', id, payload);

  return messageHandler('dcPush', buffer, (msgErr) => {
    if (msgErr) {
      connectedDataModel.removeWindowId(payload, payload.windowId);
      registeredCallbacks.remove(id);
      throw msgErr;
    }
  });
};

/**
 * Send a message to stop a subscription via a message handler
 * - store as subscribed connectedData
 * - send unsubscription request to DC
 *
 * @param payload
 * @param messageHandler
 */
const stop = (payload, messageHandler) => {
  debug.debug('stop subscription', payload);

  connectedDataModel.removeWindowId(payload, payload.windowId);

  if (connectedDataModel.isConnectedDataInWindows(payload)) {
    return undefined;
  }

  const id = v4();

  registeredCallbacks.set(id, (respErr) => {
    if (respErr) {
      throw respErr;
    }
  });

  const buffer = createSubscriptionMessage('DELETE', id, payload);

  return messageHandler('dcPush', buffer, (msgErr) => {
    if (msgErr) {
      connectedDataModel.addWindowId(payload, payload.windowId);
      throw msgErr;
    }
  });
};

module.exports = {
  start,
  stop,
  cleanupModels,
};
