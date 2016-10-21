// const debug = require('../../io/debug')('controllers:onTimebasedQuery');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const connectedDataModel = require('../../models/connectedData');
const { getTimebasedDataModel } = require('../../models/timebasedDataFactory');
const subscriptionsModel = require('../../models/subscriptions');
const registeredQueries = require('../../utils/registeredQueries');
const { encode } = require('../../protobuf');
// const { v4 } = require('node-uuid');
const zmq = require('../../io/zmq');
const {
  reduce: _reduce,
  each: _each,
  concat: _concat,
  round: _round,
} = require('lodash');
const { addToMainQueue } = require('../../websocket/sendToMain');
const constants = require('../../constants');
//const monitoring = require('../../utils/monitoring');

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

let idIndex = 0;
function v4() {
  idIndex += 1;
  return `tbq${idIndex}`;
}

function errorCallback(respErr) {
  if (respErr) {
    throw new Error(respErr);
  }
}

/**
 * Protobuf optimization
 */
const protobufQueryHeader = encode('dc.dataControllerUtils.Header', {
  messageType: constants.MESSAGETYPE_TIMEBASED_QUERY,
});
const protobufSubscriptionHeader = encode('dc.dataControllerUtils.Header', {
  messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION,
});
const protobufSubscriptionAction = encode('dc.dataControllerUtils.Action', {
  action: constants.SUBSCRIPTIONACTION_ADD,
});
const dataIdProtobufs = {}; // TODO envisage cache cleaning by adding timestamp on creation
function getDataIdProtobuf(remoteId, dataId) {
  if (typeof dataIdProtobufs[remoteId] === 'undefined') {
    dataIdProtobufs[remoteId] = encode('dc.dataControllerUtils.DataId', dataId);
  }

  return dataIdProtobufs[remoteId];
}

/**
 * Execution map
 */
let executionMap = {};
function executionReset() {
  executionMap = {};
}
function executionStart(key) {
  if (!executionMap[key]) {
    executionMap[key] = [];
  }
  executionMap[key].push(process.hrtime());
}
function executionStop(key) {
  const lastIndex = executionMap[key].length - 1;
  executionMap[key][lastIndex] = process.hrtime(executionMap[key][lastIndex]);
}
function executionPrint() {
  console.log('= execution map ====================');
  _each(executionMap, (r, k) => {
    let d = 0;
    if (r.length === 1) {
      d = (r[0][0] * 1e3) + _round(r[0][1] / 1e6, 6);
    } else {
      const t = _reduce(r, (total, record) => [total[0] + record[0], total[1] + record[1]], [0, 0]);
      d = (t[0] * 1e3) + _round(t[1] / 1e6, 6);
    }
    console.log(k, 'ms:', d);
  });
  console.log('- execution map --------------------');
}

const timebasedQuery = (websocketQueueHandler, payload, messageHandler) => {
  executionReset();
  // executionStart('global');
  // debug.debug('called', Object.keys(payload).length, 'remoteIds');
  const messageQueue = [];
  // loop over remoteIds
  _each(payload, (query, remoteId) => {
    let missingIntervals = [];

    // debug.debug(
    //   'retrieve missing intervals for remoteId', remoteId, 'and interval', query.intervals
    // );
    // loop over intervals
    // executionStart('finding missing intervals');
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
    // executionStop('finding missing intervals');
    // debug.debug('missing intervals', missingIntervals);

    // executionStart('add loki connectedData');
    if (!connectedDataModel.exists(remoteId)) {
      connectedDataModel.addRecord(remoteId, query.dataId);
    }
    // executionStop('add loki connectedData');

    // loop over missing intervals
    _each(missingIntervals, (missingInterval) => {
      // executionStart('creating query handling');
      // create a query id
      const queryId = v4();
      // register queryId/callback association
      registeredCallbacks.set(queryId, errorCallback);
      // register queryId/remoteId association
      registeredQueries.set(queryId, remoteId);
      // executionStop('creating query handling');

      // create a zmq timeBasedQuery message
      // protobufferize header, queryId, dataId and interval
      // executionStart('creating dc query');
      // debug.debug('encode dataId', query.dataId, 'and interval', missingInterval);
      const messageArgs = [
        protobufQueryHeader,
        encode('dc.dataControllerUtils.String', { string: queryId }),
        getDataIdProtobuf(remoteId, query.dataId),
        encode('dc.dataControllerUtils.TimeInterval', {
          startTime: { ms: missingInterval[0] },
          endTime: { ms: missingInterval[1] },
        }),
        encode('dc.dataControllerUtils.QueryArguments', query.queryArguments),
      ];

      // queue the message
      messageQueue.push(messageArgs);
      // executionStop('creating dc query');

      // add requested interval to connectedData model
      // executionStart('add requested interval');
      connectedDataModel.addRequestedInterval(remoteId, queryId, missingInterval);
      // executionStop('add requested interval');
    });
    // monitoring.stop(`encode ${missingIntervals.length} queries`, encodeStart);

    // if dataId not in subscriptions model
    // executionStart('creating dc subscription');
    if (!subscriptionsModel.exists(query.dataId)) {
      // add dataId to subscriptions model
      subscriptionsModel.addRecord(query.dataId);
      // create a queryId
      const queryId = v4();
      // register queryId/callback association
      registeredCallbacks.set(queryId, errorCallback);
      // create a zmq dataSubscription message (with 'ADD' action)
      const subArgs = [
        protobufSubscriptionHeader,
        encode('dc.dataControllerUtils.String', { string: queryId }),
        getDataIdProtobuf(remoteId, query.dataId),
        protobufSubscriptionAction,
      ];
      // queue the message
      messageQueue.push(subArgs);
    }
    // executionStop('creating dc subscription');

    // add remoteId and corresponding filters to subscriptions model
    // executionStart('add loki subscription filters');
    subscriptionsModel.addFilters(query.dataId, { [remoteId]: query.queryArguments.filters });
    // executionStop('add loki subscription filters');

    // loop over intervals (TODO here or last action ?)
    // executionStart('finding cache model');
    const timebasedDataModel = getTimebasedDataModel(remoteId);
    // executionStop('finding cache model');
    if (!timebasedDataModel) {
      return;
    }

    // executionStart('finding cache data');
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

      // executionStart('queue cache for sending');
      websocketQueueHandler(remoteId, cachedData);
      // executionStop('queue cache for sending');
    });
    // executionStop('finding cache data');
  });

  // send queued zmq messages to DC
  if (messageQueue.length) {
    // executionStart('send to dc');
    _each(messageQueue, args => messageHandler('dcPush', args));
    // executionStop('send to dc');
  }
  // executionStop('global');
  // executionPrint();
};

module.exports = {
  timebasedQuery,
  onTimebasedQuery: (spark, payload) => {
    // debug.debug('data query', spark.id, payload);
    timebasedQuery(addToMainQueue, payload, zmq.push);
  },
};
