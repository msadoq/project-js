const logger = require('common/log')('controllers:client:onTimebasedQuery');
const _each = require('lodash/each');
const _concat = require('lodash/concat');
const executionMonitor = require('common/log/execution');
const { GETLASTTYPE_GET_LAST } = require('common/constants');
const { createQueryMessage } = require('../../utils/queries');
const { createAddSubscriptionMessage } = require('../../utils/subscriptions');
const connectedDataModel = require('../../models/connectedData');

/**
 * Triggered when the data consumer query for timebased data
 *
 * - loop over flatDataIds
 *    - loop over 'last' intervals
 *        - queue a zmq dataQuery message (with dataId, query id, interval, getLast)
 *    - loop over 'range' intervals
 *        - retrieve missing intervals from connectedData model
 *    - loop over missing intervals (from range intervals)
 *        - create a queryId
 *        - register queryId in registeredQueries singleton
 *        - register queryId in registeredCallbacks singleton
 *        - queue a zmq dataQuery message (with dataId, query id, interval)
 *        - add requested { queryId: interval } to connectedData model
 *    - if dataId not in connectedData model
 *        - queue a zmq dataSubscription message (with 'ADD' action)
 // *    - loop over intervals
 // *        - retrieve data in timebasedData model
 // *        - queue a ws newData message (sent periodically)
 * - send queued messages to DC
 *
 * @param queries
 * @param sendMessageToDc
 */

module.exports = (sendMessageToDc, { queries }) => {
  if (!queries || !Object.keys(queries).length) {
    logger.warn('called without any query');
    return;
  }

  logger.silly('called', Object.keys(queries).length, 'flatDataIds');
  const execution = executionMonitor('query');
  execution.reset();
  execution.start('global');
  const messageQueue = [];
  // loop over flatDataIds
  _each(queries, (query, flatDataId) => {
    // Invalid query
    if (!query.dataId) {
      return;
    }
    let missingIntervals = [];

    logger.debug('add a query on', flatDataId);
    execution.start('add loki connectedData');
    logger.silly('add loki connectedData', { flatDataId });
    // Create a subscription if needed
    if (!connectedDataModel.exists(flatDataId)) {
      logger.debug('add a subscription on', flatDataId);
      // create subscription message
      const message = createAddSubscriptionMessage(query.dataId);
      // queue the message
      messageQueue.push(message.args);
    }
    const connectedData = connectedDataModel.addRecord(query.dataId);
    execution.stop('add loki connectedData');

    // getLast queries
    execution.start('getLast intervals');
    _each(query.last, (interval) => {
      logger.silly('request getLast on interval', interval);
      const message = createQueryMessage(
        flatDataId,
        query.dataId,
        interval,
        { getLastType: GETLASTTYPE_GET_LAST },
        execution
      );
      // queue the message
      messageQueue.push(message.args);
      // add lastQuery info in connectedDataModel
      connectedDataModel.addLastQuery(flatDataId, message.queryId, interval, connectedData);
    });
    execution.stop('getLast intervals');

    // loop over range intervals
    execution.start('finding missing intervals');
    _each(query.range, (interval) => {
      // retrieve missing intervals from connectedData model
      missingIntervals = _concat(
        missingIntervals,
        connectedDataModel.retrieveMissingIntervals(
          flatDataId,
          interval,
          connectedData
        )
      );
    });
    execution.stop('finding missing intervals');
    // debug.debug('missing intervals', missingIntervals);
    logger.silly('found', missingIntervals.length, 'missing intervals for', flatDataId);
    // loop over missing intervals
    _each(missingIntervals, (missingInterval) => {
      logger.silly('request interval', missingInterval);
      const message = createQueryMessage(
        flatDataId,
        query.dataId,
        missingInterval,
        {},
        execution
      );

      // queue the message
      messageQueue.push(message.args);

      // add requested interval to connectedData model
      execution.start('add requested interval');
      connectedDataModel.addRequestedInterval(
        flatDataId,
        message.queryId,
        missingInterval,
        connectedData
      );
      execution.stop('add requested interval');
    });
  });

  // send queued zmq messages to DC
  if (messageQueue.length) {
    execution.start('send to utils');
    _each(messageQueue, args => sendMessageToDc(args));
    execution.stop('send to utils');
  }
  execution.stop('global');
  execution.print();
};
