const debug = require('../io/debug')('controllers:onSubscriptionClose');
const zmq = require('../io/zmq');
const { createDeleteSubscriptionMessage } = require('../utils/subscriptions');
const connectedDataModel = require('../models/connectedData');
const cacheJsonModel = require('../models/cacheJson');

/**
 * Triggered when a connectedData is unmounted on HSC and should be unsubscribed from
 * DC pub/sub filter.
 *
 * - store as subscribed connectedData
 * - send unsubscription request to DC
 *
 * @param spark
 * @param payload
 */

const stopSubscription = (payload, messageHandler) => {
  debug.debug('stopping subscription', payload);
  const connectedData = connectedDataModel.removeWindowId(payload.dataId, payload.windowId);
  if (!connectedData || connectedData.windows.length !== 0) {
    return undefined;
  }

  connectedDataModel.removeByDataId(payload.dataId);
  cacheJsonModel.removeByDataId(payload.dataId);

  const message = createDeleteSubscriptionMessage(payload.dataId);

  debug.debug('sending stop command to DC');
  return messageHandler('dcPush', message.buffer);
};

module.exports = {
  stopSubscription,
  onSubscriptionClose: (spark, payload) => {
    debug.debug(spark.id);
    stopSubscription(payload, zmq.push);
  },
};
