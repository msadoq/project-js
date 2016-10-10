const debug = require('../../io/debug')('controllers:onTimebasedQuery');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const connectedDataModel = require('../../models/connectedData');
const timebasedDataModel = require('../../models/timebasedData');
const subscriptionsModel = require('../../models/subscriptions');
const registeredQueries = require('../../utils/registeredQueries');
const { encode } = require('../../protobuf');
const { v4 } = require('node-uuid');
const zmq = require('../../io/zmq');
const _ = require('lodash');
const { addToMainQueue } = require('../../websocket/sendToMain');
const constants = require('../../constants');

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

const timebasedQuery = (websocketHandler, payload, messageHandler) => {
  const messageQueue = [];
  // loop over remoteIds
  _.each(payload, (query, remoteId) => {
    let missingIntervals = [];

    debug.debug('retrieve missing intervals for remoteId', remoteId, 'and interval', query.intervals);
    // loop over intervals
    _.each(query.intervals, (interval) => {
      // retrieve missing intervals from connectedData model
      missingIntervals = _.concat(
        missingIntervals,
        connectedDataModel.retrieveMissingIntervals(
          remoteId,
          interval
        )
      );
    });
    debug.debug('missing intervals', missingIntervals);
    // loop over missing intervals
    _.each(missingIntervals, (missingInterval) => {
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
      const queryArgs = [
        encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_QUERY }),
        encode('dc.dataControllerUtils.String', { string: queryId }),
        encode('dc.dataControllerUtils.DataId', query.dataId),
        encode('dc.dataControllerUtils.TimeInterval', {
          lowerTs: { ms: missingInterval[0] },
          upperTs: { ms: missingInterval[1] },
        }),
      ];
      // protobufferize filters if any
      _.each(query.filter, (filter) => {
        queryArgs.push(encode('dc.dataControllerUtils.Filter', filter));
      });
      // queue the message
      messageQueue.push(queryArgs);
      // add requested interval to connectedData model
      connectedDataModel.addRequestedInterval(remoteId, queryId, missingInterval);
    });

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
    subscriptionsModel.addFilters(query.dataId, { [remoteId]: query.filter });

    // loop over intervals (TODO here or last action ?)
    _.each(query.intervals, (interval) => {
      // retrieve data in timebasedData model
      debug.debug('find by interval', interval);
      const cachedData = timebasedDataModel.findByInterval(
        remoteId,
        interval[0],
        interval[1]
      );
      // queue a ws newData message (sent periodically)
      if (cachedData.length === 0) {
        return;
      }
      websocketHandler(remoteId, cachedData);
    });
  });

  // send queued zmq messages to DC
  if (messageQueue.length === 0) {
    return undefined;
  }

  return _.each(messageQueue, args => messageHandler('dcPush', args));
};

module.exports = {
  timebasedQuery,
  onTimebasedQuery: (spark, payload) => {
    debug.debug('data query', spark.id, payload);
    timebasedQuery(addToMainQueue, payload, zmq.push);
  },
};
