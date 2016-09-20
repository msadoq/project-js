const debug = require('../io/debug')('controllers:onConnectedDataClose');
const { v4 } = require('node-uuid');
const formula = require('../utils/formula');
const { encode } = require('../protobuf');
const zmq = require('../io/zmq');
const registeredCallbacks = require('../utils/registeredCallbacks');
const connectedDataModel = require('../models/connectedData');

/**
 * Triggered when a new connected data is unmounted on HSC
 * @param spark
 */

const endConnectedDataSubscription = (spark, payload, messageHandler) => {
  debug.debug(spark.id, 'connectedData closed', payload);

  const parameter = formula(payload.formula);

  const localId = connectedDataModel.getLocalId(parameter);

  connectedDataModel.removeWindowId(localId, payload.windowId);

  if (connectedDataModel.isConnectedDataInWindows(localId)) {
    return;
  }

  const id = v4();

  registeredCallbacks.set(id, (respErr) => {
    if (respErr) throw respErr;
  });

  const buffer = encode('dc.dataControllerUtils.DcClientMessage', {
    messageType: 'DATA_SUBSCRIBE',
    payload: encode('dc.dataControllerUtils.DataSubscribe', {
      action: 'DELETE',
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
      connectedDataModel.addWindowId(localId, payload.windowId);
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
