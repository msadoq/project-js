const _each = require('lodash/each');
const _concat = require('lodash/concat');
const {
  DATASTRUCTURETYPE_LAST,
  DATASTRUCTURETYPE_RANGE,
  GETLASTTYPE_GET_LAST,
} = require('common/constants');
const executionMonitor = require('common/log/execution');
const logger = require('common/log')('controllers:client:onTimebasedQuery');

const { add: addToQueue } = require('../../utils/dataQueue');
const { createQueryMessage } = require('../../utils/queries');
const { createAddSubscriptionMessage } = require('../../utils/subscriptions');
const connectedDataModel = require('../../models/connectedData');
const { getTimebasedDataModel } = require('../../models/timebasedDataFactory');
const subscriptionsModel = require('../../models/subscriptions');

/**
 * Triggered when the data consumer query for timebased data
 *
 * - loop over remoteIds
 *    - loop over intervals
 *        - retrieve missing intervals from connectedData model
 *    - loop over missing intervals
 *        - create a queryId
 *        - register queryId in registeredQueries singleton
 *        - register queryId in registeredCallbacks singleton
 *        - queue a zmq dataQuery message (with dataId, query id, interval and filter)
 *        - add requested { queryId: interval } to connectedData model
 *    - if dataId not in subscriptions model
 *        - add dataId to subscriptions model
 *        - queue a zmq dataSubscription message (with 'ADD' action)
 *    - add remoteId and corresponding filters to subscriptions model
 *    - loop over intervals
 *        - retrieve data in timebasedData model
 *        - queue a ws newData message (sent periodically)
 * - send queued messages to DC
 *
 * @param payload
 * @param sendMessageToDc
 */

// eslint-disable-next-line consistent-return
module.exports = (sendMessageToDc, payload) => {
  const execution = executionMonitor('query');
  execution.reset();
  execution.start('global');

  // TODO : temporary fixes
  if (typeof payload.time !== 'undefined') {
    return logger.warn('received invalid query message from client', payload);
  }
  // end of temporary fixes

  // debug.debug('called', Object.keys(payload).length, 'remoteIds');
  const messageQueue = [];
  // loop over remoteIds
  _each(payload, (query, remoteId) => {
    let missingIntervals = [];
    const queryArguments = {};

    // add query arguments depending on the type
    switch (query.type) {
      case DATASTRUCTURETYPE_LAST:
        queryArguments.getLastType = GETLASTTYPE_GET_LAST;
        queryArguments.filters = query.filters;
        break;
      case DATASTRUCTURETYPE_RANGE:
        queryArguments.filters = query.filters;
        break;
      default:
        throw new Error(`Consuming type not valid ${query.type}`);
    }

    execution.start('add loki connectedData');
    const connectedData = connectedDataModel.addRecord(query.type, remoteId, query.dataId);
    execution.stop('add loki connectedData');

    // loop over intervals
    execution.start('finding missing intervals');
    _each(query.intervals, (interval) => {
      // retrieve missing intervals from connectedData model
      missingIntervals = _concat(
        missingIntervals,
        connectedDataModel.retrieveMissingIntervals(
          remoteId,
          interval,
          connectedData
        )
      );
    });
    execution.stop('finding missing intervals');
    // debug.debug('missing intervals', missingIntervals);

    // loop over missing intervals
    _each(missingIntervals, (missingInterval) => {
      const message = createQueryMessage(
        remoteId,
        query.dataId,
        missingInterval,
        queryArguments,
        execution
      );

      // queue the message
      messageQueue.push(message.args);

      // add requested interval to connectedData model
      execution.start('add requested interval');
      connectedDataModel.addRequestedInterval(
        remoteId,
        message.queryId,
        missingInterval,
        connectedData
      );
      execution.stop('add requested interval');
    });

    // if dataId not in subscriptions model
    execution.start('creating dc subscription');
    let subscription = subscriptionsModel.getByDataId(query.dataId);
    if (!subscription) {
      // add dataId to subscriptions model
      subscription = subscriptionsModel.addRecord(query.dataId);
      // create subscription message
      const message = createAddSubscriptionMessage(query.dataId);
      // queue the message
      messageQueue.push(message.args);
    }
    execution.stop('creating dc subscription');

    // add remoteId and corresponding filters to subscriptions model
    execution.start('add loki subscription filters');
    subscriptionsModel.addFilters(
      query.dataId,
      { [remoteId]: query.filters },
      subscription
    );
    execution.stop('add loki subscription filters');

    // loop over intervals
    execution.start('finding cache model');
    const timebasedDataModel = getTimebasedDataModel(remoteId);
    execution.stop('finding cache model');
    if (!timebasedDataModel) {
      return;
    }

    execution.start('finding cache data');
    _each(query.intervals, (interval) => {
      // retrieve data in timebasedData model
      // debug.debug('find by interval', interval);
      // const findStart = monitoring.start();
      const cachedData = timebasedDataModel.findByInterval(
        interval[0],
        interval[1]
      );
      // monitoring.stop('find interval', findStart);
      // queue a ws newData message (sent periodically)
      if (cachedData.length === 0) {
        return;
      }

      execution.start('queue cache for sending');
      _each(cachedData, (datum) => {
        addToQueue(remoteId, datum.timestamp, datum.payload);
      });
      execution.stop('queue cache for sending');
    });
    execution.stop('finding cache data');
  });

  // send queued zmq messages to DC
  if (messageQueue.length) {
    execution.start('send to dc');
    _each(messageQueue, args => sendMessageToDc(args));
    execution.stop('send to dc');
  }
  execution.stop('global');
  execution.print();
};
