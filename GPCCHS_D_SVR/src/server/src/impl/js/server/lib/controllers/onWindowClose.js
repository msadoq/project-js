const debug = require('../io/debug')('controllers:onWindowClose');
const _ = require('lodash');
const { stopSubscription } = require('./onSubscriptionClose');
const subscriptionsModel = require('../models/subscriptions');
const zmq = require('../io/zmq');

/**
 * Triggered when HSC close a window
 *
 * - unsubscribe every pub/sub connectedData (listened only for this window)
 * - cleanup local timebasedData (loki) (connectedData listened only for this window)
 * - cleanup local connectedData (loki) (connectedData listened only for this window)
 *
 * @param spark
 * @param windowId
 */

const windowClose = (windowId, messageHandler) => {
  debug.debug('window close', windowId);
  // _.each(subscriptionsModel.retrieveByWindow(windowId), (subscription) => {
  //   debug.debug('subscription to stop: ', subscription);
  //   stopSubscription(Object.assign({}, subscription, { windowId }), messageHandler);
  // });
};

module.exports = {
  windowClose,
  onWindowClose: (spark, windowId) => {
    debug.info(`called (${windowId})`);
    windowClose(windowId, zmq.push);
  },
};
