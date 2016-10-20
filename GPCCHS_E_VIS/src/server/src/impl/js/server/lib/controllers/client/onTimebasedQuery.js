const debug = require('../../io/debug')('controllers:onTimebasedQuery');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const connectedDataModel = require('../../models/connectedData');
const { getTimebasedDataModel } = require('../../models/timebasedDataFactory');
const subscriptionsModel = require('../../models/subscriptions');
const registeredQueries = require('../../utils/registeredQueries');
const { encode } = require('../../protobuf');
const { v4 } = require('node-uuid');
const zmq = require('../../io/zmq');
const {
  each: _each,
  concat: _concat,
} = require('lodash');
const { addToMainQueue } = require('../../websocket/sendToMain');
const constants = require('../../constants');
const monitoring = require('../../utils/monitoring');

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
 *    - loop over intervals (TODO here or last action ?)
 *        - retrieve data in timebasedData model
 *        - queue a ws newData message (sent periodically)
 * - send queued messages to DC
 *
 * @param spark
 * @param payload
 * @param messageHandler
 */

const timebasedQuery = (websocketQueueHandler, payload, messageHandler) => {
  debug.info('called', Object.keys(payload).length, 'remoteIds');
  const messageQueue = [];
  // loop over remoteIds
  _each(payload, (query, remoteId) => {
    let missingIntervals = [];

    debug.debug('retrieve missing intervals for remoteId', remoteId, 'and interval', query.intervals);
    const missStart = monitoring.start();
    // loop over intervals
    _each(query.intervals, (interval) => {
      // retrieve missing intervals from connectedData model
      missingIntervals = _concat(
        missingIntervals,
        connectedDataModel.retrieveMissingIntervals(
          remoteId,
          interval
        )
      );
    });
    monitoring.stop('misssing intervals', missStart);
    debug.debug('missing intervals', missingIntervals);
    if (!connectedDataModel.exists(remoteId)) {
      connectedDataModel.addRecord(remoteId, query.dataId);
    }
    const encodeStart = monitoring.start();
    // loop over missing intervals
    _each(missingIntervals, (missingInterval) => {
      // create a query id
      const queryId = v4();
      // register queryId/callback association
      registeredCallbacks.set(queryId, (respErr) => {
        if (respErr) {
          throw respErr;
        }
      });
      // register queryId/remoteId association
      registeredQueries.set(queryId, remoteId);

      // create a zmq timeBasedQuery message
      // protobufferize header, queryId, dataId and interval
      debug.debug('encode dataId', query.dataId, 'and interval', missingInterval);
      const messageArgs = [
        encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_QUERY }),
        encode('dc.dataControllerUtils.String', { string: queryId }),
        encode('dc.dataControllerUtils.DataId', query.dataId),
        encode('dc.dataControllerUtils.TimeInterval', {
          startTime: { ms: missingInterval[0] },
          endTime: { ms: missingInterval[1] },
        }),
      ];
      // protobufferize queryArguments
      messageArgs.push(encode('dc.dataControllerUtils.QueryArguments', query.queryArguments));

      // queue the message
      messageQueue.push(messageArgs);
      // add requested interval to connectedData model
      connectedDataModel.addRequestedInterval(remoteId, queryId, missingInterval);
    });
    monitoring.stop(`encode ${missingIntervals.length} queries`, encodeStart);

    // if dataId not in subscriptions model
    if (!subscriptionsModel.exists(query.dataId)) {
      // add dataId to subscriptions model
      subscriptionsModel.addRecord(query.dataId);
      // create a queryId
      const queryId = v4();
      // register queryId/callback association
      registeredCallbacks.set(queryId, (respErr) => {
        if (respErr) {
          throw respErr;
        }
      });
      // create a zmq dataSubscription message (with 'ADD' action)
      const subArgs = [
        encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
        encode('dc.dataControllerUtils.String', { string: queryId }),
        encode('dc.dataControllerUtils.DataId', query.dataId),
        encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_ADD }),
      ];
      // queue the message
      messageQueue.push(subArgs);
    }

    // add remoteId and corresponding filters to subscriptions model
    subscriptionsModel.addFilters(query.dataId, { [remoteId]: query.queryArguments.filters });

    // loop over intervals (TODO here or last action ?)
    const timebasedDataModel = getTimebasedDataModel(remoteId);
    if (!timebasedDataModel) {
      return;
    }
    _each(query.intervals, (interval) => {
      // retrieve data in timebasedData model
      debug.debug('find by interval', interval);
      const findStart = monitoring.start();
      const cachedData = timebasedDataModel.findByInterval(
        interval[0],
        interval[1]
      );
      monitoring.stop('find interval', findStart);
      // queue a ws newData message (sent periodically)
      if (cachedData.length === 0) {
        return;
      }
      websocketQueueHandler(remoteId, cachedData);
    });
  });

  // send queued zmq messages to DC
  if (messageQueue.length === 0) {
    return undefined;
  }

  return _each(messageQueue, args => messageHandler('dcPush', args));
};

module.exports = {
  timebasedQuery,
  onTimebasedQuery: (spark, payload) => {
    debug.debug('data query', spark.id, payload);
    timebasedQuery(addToMainQueue, payload, zmq.push);
  },
};
