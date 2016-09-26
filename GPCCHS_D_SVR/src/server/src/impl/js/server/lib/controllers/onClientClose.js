const debug = require('../io/debug')('controllers:onClientClose');
const subscriptions = require('../utils/subscriptions');
const cacheJsonModel = require('../models/cacheJson');
const connectedDataModel = require('../models/connectedData');
const viewModel = require('../models/views');
const registeredCallbacks = require('../utils/registeredCallbacks');
const { stopSubscription } = require('./onSubscriptionClose');
const zmq = require('../io/zmq');
const _ = require('lodash');
const { resetTimebar } = require('../timeBar');
const { resetDomains } = require('../utils/domains');
/**
 * Triggered when HSC main process WebSocket closes
 *
 * - unsubscribe every pub/sub connectedData
 * - cleanup local cacheJson (loki)
 * - cleanup local connectedData (loki)
 * - cleanup local domains
 * - cleanup local timebar
 *
 * @param spark
 */

const cleanUpRemainingData = (messageHandler) => {
  // unsubscribe every remaining pub/sub connectedData
  _.each(connectedDataModel.getAll(), (connectedData) => {
    _.each(connectedData.windows, (windowId) => {
      stopSubscription(Object.assign({}, connectedData, { windowId }), messageHandler);
    });
  });
  // cleanup local cacheJson (loki)
  cacheJsonModel.cleanup();
  // cleanup local connectedData (loki)
  connectedDataModel.cleanup();
  // cleanup views (loki)
  viewModel.cleanup();
  // cleanup local domains
  resetDomains();
  // cleanup local timebar
  resetTimebar();
  // cleanup registered callbacks
  registeredCallbacks.clear();

  debug.debug('cleanup done');
};

module.exports = {
  cleanUpRemainingData,
  onClientClose: (spark) => {
    debug.info(`called (${spark.id})`);
    cleanUpRemainingData(zmq.push);
  },
};
