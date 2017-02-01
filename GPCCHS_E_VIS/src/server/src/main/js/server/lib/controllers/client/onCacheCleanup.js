const _each = require('lodash/each');
const _get = require('lodash/get');
const removeIntervals = require('common/intervals/remove');
const executionMonitor = require('common/log/execution');
const logger = require('common/log')('controllers:onCacheCleanup');
const { removeMultiQueryIds: removeRegisteredQuery } = require('../../models/registeredQueries');
const { createDeleteSubscriptionMessage } = require('../../utils/subscriptions');
const {
  getTimebasedDataModel,
  removeTimebasedDataModel,
} = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');

/**
 * Cache Cleanup: clear expired queries from models, stop subscriptions if needed
 *
 * - loop over expired requests ('remoteId': [interval])
 *    - remove intervals from connectedData model
 *    - if there are still requested intervals in connectedData model for this remoteId
 *        - remove data corresponding to expired intervals from timebasedData model and stop logic
 *    - get corresponding dataId from connectedData model
 *    - remove remoteId from connectedData model
 *    - remove data corresponding to remoteId from timebasedData model
 *    - remove remoteId for corresponding dataId from subscriptions model
 *    - if there are still remoteIds in subscriptions model for this dataId, stop logic
 *    - remove dataId from subscriptions model
 *    - create a queryId and register a queryid/callback association
 *    - queue a zmq timebasedSubscription message (with 'DELETE' action)
 * - send queued messages to DC
 *
 * @param sendMessageToDc
 * @param dataMap
 */

module.exports = (sendMessageToDc, dataMap) => {
  logger.silly('called');
  const messageQueue = [];
  const execution = executionMonitor('cacheCleanup');
  execution.start('global');
  execution.start('get all connected data');
  const connectedData = connectedDataModel.getAll();
  execution.stop('get all connected data');
  const expiredRequests = {};
  _each(connectedData, ({ remoteId, intervals }) => {
    let expiredIntervals = intervals.all;
    // get visible localIds for this remoteId if any
    execution.start('get localIds');
    const localIds = _get(dataMap, [remoteId, 'localIds']);
    execution.stop('get localIds');
    _each(localIds, (localValue) => {
      // extract visible interval from expired intervals
      const expectedInterval = localValue.expectedInterval;
      // TODO getLast optimize .remove code to only remove exact matching interval if getLast cd
      execution.start('keep only expired intervals');
      expiredIntervals = removeIntervals(expiredIntervals, expectedInterval);
      execution.stop('keep only expired intervals');
    });
    execution.start('add to invalidation');
    // if some expired intervals, add to invalidation
    if (expiredIntervals.length > 0) {
      expiredRequests[remoteId] = { intervals: expiredIntervals };
    }
    execution.stop('add to invalidation');
  });

  // loop over expired requests ('remoteId': [interval])
  _each(expiredRequests, ({ intervals }, remoteId) => {
    logger.silly('intervals', intervals, 'remoteId', remoteId);
    // remove intervals from connectedData model
    execution.start('remove intervals');
    const queryIds = connectedDataModel.removeIntervals(remoteId, intervals);
    execution.stop('remove intervals');
    execution.start('remove queries');
    removeRegisteredQuery(queryIds);
    execution.stop('remove queries');
    logger.silly('Query Ids no longer needed', queryIds);
    // if there are still requested intervals in connectedData model for this remoteId
    execution.start('get remaining intervals');
    const remainingIntervals = connectedDataModel.getIntervals(remoteId);
    execution.stop('get remaining intervals');
    if (!remainingIntervals) {
      return undefined;
    }
    if (remainingIntervals.length !== 0) {
      logger.silly('still requested');
      // remove data corresponding to expired intervals from timebasedData model
      execution.start('get tbd model');
      const timebasedDataModel = getTimebasedDataModel(remoteId);
      execution.stop('get tbd model');
      if (!timebasedDataModel) {
        return undefined;
      }

      return _each(intervals, (interval) => {
        execution.start('find and remove tbd');
        timebasedDataModel.removeByInterval(interval[0], interval[1]);
        execution.stop('find and remove tbd');
      });
    }
    logger.silly('no more interval');
    // else, no more intervals for this remoteId
    // get corresponding dataId from connectedData model
    execution.start('get dataId');
    const dataId = connectedDataModel.getDataId(remoteId);
    execution.stop('get dataId');
    // remove remoteId from connectedData model
    execution.start('remove connected data');
    connectedDataModel.removeByRemoteId(remoteId);
    execution.stop('remove connected data');
    // remove data corresponding to remoteId from timebasedData model
    execution.start('remove tbd model');
    removeTimebasedDataModel(remoteId);
    execution.stop('remove tbd model');
    // remove remoteId for corresponding dataId from subscriptions model
    execution.start('remove remoteId from sub');
    subscriptionsModel.removeRemoteId(dataId, remoteId);
    execution.stop('remove remoteId from sub');
    // if there are still remoteIds in subscriptions model for this dataId
    execution.start('get remaining remoteIds for this subscription');
    if (subscriptionsModel.getRemoteIds(dataId).length !== 0) {
      execution.stop('get remaining remoteIds for this subscription');
      return undefined;
    }
    execution.stop('get remaining remoteIds for this subscription');
    logger.silly('no more remoteIds');
    // else, no more remoteIds for this dataId
    // remove dataId from subscriptions model
    execution.start('remove subscription');
    subscriptionsModel.removeByDataId(dataId);
    execution.stop('remove subscription');
    const message = createDeleteSubscriptionMessage(dataId);
    execution.start('create and push sub message');
    // queue the message
    messageQueue.push(message.args);
    execution.stop('create and push sub message');
    return undefined;
  });
  logger.silly('message queue length', messageQueue.length);
  // send queued messages to DC
  execution.start('send zmq messages');
  _each(messageQueue, args => sendMessageToDc(args));
  execution.stop('send zmq messages');
  execution.stop('global');
  execution.print();
};
