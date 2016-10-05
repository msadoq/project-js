const debug = require('../io/debug')('controllers:onSubscriptionOpen');
const zmq = require('../io/zmq');
const { createAddSubscriptionMessage } = require('../utils/subscriptions');
const subscriptionsModel = require('../models/subscriptions');

/**
 * Triggered when a new connected data is mounted on HSC and should be whitelisted in DC pub/sub
 * filter.
 *
 * - store as subscribed connectedData
 * - send subscription request to DC
 *
 * @param spark
 * @param payload
 */

const startSubscription = (payload, messageHandler) => {
  debug.debug('start subscription', payload);
  const subscription = subscriptionsModel.addWindowId(payload.dataId, payload.windowId);
  if (subscription.windows.length !== 1) {
    return undefined;
  }

  const message = createAddSubscriptionMessage(payload.dataId);

  debug.debug('sending subscription to DC');
  return messageHandler('dcPush', message.buffer);
};

module.exports = {
  startSubscription,
  onSubscriptionOpen: (spark, payload) => {
    debug.debug(spark.id);
    startSubscription(payload, zmq.push);
  },
};
