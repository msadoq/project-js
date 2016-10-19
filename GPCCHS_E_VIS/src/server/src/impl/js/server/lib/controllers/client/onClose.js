const debug = require('../../io/debug')('controllers:onClose');
const { clearFactory } = require('../../models/timebasedDataFactory');
const subscriptionsModel = require('../../models/subscriptions');
const connectedDataModel = require('../../models/connectedData');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const registeredQueries = require('../../utils/registeredQueries');
const { createDeleteSubscriptionMessage } = require('../../utils/subscriptions');
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
    const message = createDeleteSubscriptionMessage(subscription.dataId);
    debug.debug('sending delete subscription message to DC');
    return messageHandler('dcPush', message.args);
  });
  // cleanup timebasedData model
  clearFactory();
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
