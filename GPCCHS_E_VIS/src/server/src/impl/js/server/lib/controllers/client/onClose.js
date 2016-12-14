const logger = require('common/log')('controllers:onClose');
const _each = require('lodash/each');
const zmq = require('common/zmq');

const { reset: resetDataQueue } = require('../../websocket/dataQueue');
const registeredQueries = require('../../utils/registeredQueries');
const { createDeleteSubscriptionMessage } = require('../../utils/subscriptions');

const { clearFactory } = require('../../models/timebasedDataFactory');
const subscriptionsModel = require('../../models/subscriptions');
const connectedDataModel = require('../../models/connectedData');

/**
 * Triggered when HSC main process WebSocket closes
 *
 * - loop on subscriptions and send timebasedSubscription (with 'DELETE' action) for each
 * - cleanup all models
 *    - connectedData
 *    - subscriptions
 *    - timebasedData
 * - reset all singletons
 *    - registeredQueries
 *
 * @param messageHandler
 */

const close = (messageHandler) => {
  // loop on subscriptions and stop subscription
  _each(subscriptionsModel.getAll(), (subscription) => {
    const message = createDeleteSubscriptionMessage(subscription.dataId);
    logger.debug('sending delete subscription message to DC');
    return messageHandler('dcPush', message.args);
  });
  // cleanup data queue
  resetDataQueue();
  // cleanup timebasedData model
  clearFactory();
  // cleanup connectedData model
  connectedDataModel.cleanup();
  // cleanup subscriptions model
  subscriptionsModel.cleanup();
  // cleanup queries
  registeredQueries.clear();

  logger.debug('cleanup done');
};

module.exports = {
  close,
  onClose: (spark) => {
    logger.verbose(`called (${spark.id})`);
    close(zmq.push);
  },
};
