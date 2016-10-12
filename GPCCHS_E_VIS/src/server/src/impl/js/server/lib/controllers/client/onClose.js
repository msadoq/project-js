const debug = require('../../io/debug')('controllers:onClose');
const timebasedDataModel = require('../../models/timebasedData');
const subscriptionsModel = require('../../models/subscriptions');
const connectedDataModel = require('../../models/connectedData');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const registeredQueries = require('../../utils/registeredQueries');
const { stopSubscription } = require('./../onSubscriptionClose');
const zmq = require('../../io/zmq');
const _ = require('lodash');
const { resetDomains } = require('../../utils/domains');

/**
 * Triggered when HSC main process WebSocket closes
 *
 * - loop on subscriptions and send timebasedSubscription (with 'DELETE' action) for each
 * - cleanup all models
 *    - connectedData
 *    - subscriptions
 *    - timebasedData
 * - reset all singletons
 *    - domains
 *    - registeredQueries
 *    - registeredCallbacks
 *
 * @param messageHandler
 */

const close = (messageHandler) => {
  // loop on subscriptions and stop subscription
  _.each(subscriptionsModel.getAll(), (subscription) => {
    stopSubscription(subscription, messageHandler);
  });
  // cleanup timebasedData model
  timebasedDataModel.cleanup();
  // cleanup connectedData model
  connectedDataModel.cleanup();
  // cleanup subscriptions model
  subscriptionsModel.cleanup();
  // reset domains singleton
  resetDomains();
  // reset domains singleton
  registeredQueries.clear();
  // reset domains singleton
  registeredCallbacks.clear(); // TODO: as we clear here, the Response from subscription stops will fail

  debug.debug('cleanup done');
};

module.exports = {
  close,
  onClose: (spark) => {
    debug.info(`called (${spark.id})`);
    close(zmq.push);
  },
};
