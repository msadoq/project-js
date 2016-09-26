const debug = require('../io/debug')('controllers:onWindowClose');
const _ = require('lodash');
const { stopSubscription } = require('./onSubscriptionClose');
const connectedDataModel = require('../models/connectedData');
const zmq = require('../io/zmq');

/**
 * Triggered when HSC close a window
 *
 * - unsubscribe every pub/sub connectedData (listened only for this window)
 * - cleanup local cacheJson (loki) (connectedData listened only for this window)
 * - cleanup local connectedData (loki) (connectedData listened only for this window)
 *
 * @param spark
 * @param windowId
 */

const stopWindowSubscriptions = (windowId, messageHandler) => {
  debug.debug('stopping subscriptions for window', windowId);
  _.each(connectedDataModel.retrieveByWindow(windowId), (connectedData) => {
    debug.debug('subscription to stop: ', connectedData);
    stopSubscription(Object.assign({}, connectedData, { windowId }), messageHandler);
  });
};

module.exports = {
  stopWindowSubscriptions,
  onWindowClose: (spark, windowId) => {
    debug.info(`called (${windowId})`);
    stopWindowSubscriptions(windowId, zmq.push);
  },
};
