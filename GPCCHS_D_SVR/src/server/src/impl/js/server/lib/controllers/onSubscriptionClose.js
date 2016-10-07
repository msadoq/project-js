const debug = require('../io/debug')('controllers:onSubscriptionClose');
const zmq = require('../io/zmq');
const { createDeleteSubscriptionMessage } = require('../utils/subscriptions');
const connectedDataModel = require('../models/connectedData');
const subscriptionsModel = require('../models/subscriptions');
const timebasedDataModel = require('../models/timebasedData');
const _ = require('lodash');

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

const stopSubscription = (subscription, messageHandler) => {
  debug.debug('stopping subscription', subscription);
  /* const subscription = subscriptionsModel.removeWindowId(payload.dataId, payload.windowId);*/
  if (!subscriptionsModel.exists(subscription.dataId)) {
    return undefined;
  }

  _.keys(subscription.filters, (remoteId) => {
    connectedDataModel.removeByRemoteId(remoteId);
    timebasedDataModel.removeByRemoteId(remoteId);
  });

  subscriptionsModel.removeByDataId(subscription.dataId);

  const message = createDeleteSubscriptionMessage(subscription.dataId);

  debug.debug('sending stop command to DC');
  return messageHandler('dcPush', message.args);
};

module.exports = {
  stopSubscription,
  onSubscriptionClose: (spark, payload) => {
    debug.debug(spark.id);
    stopSubscription(payload, zmq.push);
  },
};
