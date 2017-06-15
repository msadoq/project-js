const _each = require('lodash/each');
const _get = require('lodash/get');
const executionMonitor = require('../../../common/logManager/execution');
const logger = require('../../../common/logManager')('controllers:onCacheCleanup');
const removeIntervals = require('../../../common/intervals/remove');
const { removeMultiQueryIds: removeRegisteredQuery } = require('../../models/registeredQueries');
const { createDeleteSubscriptionMessage } = require('../../utils/subscriptions');
const {
  getTimebasedDataModel,
  removeTimebasedDataModel,
} = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');

/**
 * Cache Cleanup: clear expired queries from models, stop subscriptions if needed
 *
 * - loop over expired requests ('flatDataId': [interval])
 *    - remove intervals from connectedData model
 *    - if there are still requested intervals in connectedData model for this flatDataId
 *        - remove data corresponding to expired intervals from timebasedData model and stop logic
 *    - get corresponding dataId from connectedData model
 *    - remove flatDataId from connectedData model
 *    - remove data corresponding to flatDataId from timebasedData model
 *    - create a queryId and register a queryid/callback association
 *    - queue a zmq timebasedSubscription message (with 'DELETE' action)
 * - send queued messages to DC
 *
 * @param sendMessageToDc
 * @param dataMap = { perRemoteId, expectedIntervals }
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
  _each(connectedData, ({ flatDataId, intervals }) => {
    let expiredIntervals = intervals.all;
    // get visible localIds for this flatDataId if any
    execution.start('get localIds');
    const localIds = _get(dataMap, ['perRemoteId', flatDataId, 'localIds']);
    execution.stop('get localIds');
    _each(localIds, (localValue, localId) => {
      // extract visible interval from expired intervals
      const expectedInterval =
        _get(dataMap, ['expectedIntervals', flatDataId, localId, 'expectedInterval']);
      // TODO getLast optimize .remove code to only remove exact matching interval if getLast cd
      execution.start('keep only expired intervals');
      expiredIntervals = removeIntervals(expiredIntervals, expectedInterval);
      execution.stop('keep only expired intervals');
    });
    execution.start('add to invalidation');
    // if some expired intervals, add to invalidation
    if (expiredIntervals.length > 0) {
      expiredRequests[flatDataId] = { intervals: expiredIntervals };
    }
    execution.stop('add to invalidation');
  });


  // loop over expired requests ('flatDataId': [interval])
  _each(expiredRequests, ({ intervals }, flatDataId) => {
    logger.silly('intervals', intervals, 'flatDataId', flatDataId);
    // remove intervals from connectedData model
    execution.start('remove intervals');
    const queryIds = connectedDataModel.removeIntervals(flatDataId, intervals);
    execution.stop('remove intervals');
    execution.start('remove queries');
    removeRegisteredQuery(queryIds);
    execution.stop('remove queries');
    logger.silly('Query Ids no longer needed', queryIds);
    // if there are still requested intervals in connectedData model for this flatDataId
    execution.start('get remaining intervals');
    const remainingIntervals = connectedDataModel.getIntervals(flatDataId);
    execution.stop('get remaining intervals');
    if (!remainingIntervals) {
      return;
    }
    if (remainingIntervals.length !== 0) {
      logger.silly('still requested');
      // remove data corresponding to expired intervals from timebasedData model
      execution.start('get tbd model');
      const timebasedDataModel = getTimebasedDataModel(flatDataId);
      execution.stop('get tbd model');
      if (timebasedDataModel) {
        _each(intervals, (interval) => {
          execution.start('find and remove tbd');
          timebasedDataModel.removeByInterval(interval[0], interval[1]);
          execution.stop('find and remove tbd');
        });
      }
      return;
    }
    logger.silly('no more interval');
    // else, no more intervals for this flatDataId
    // get corresponding dataId from connectedData model
    execution.start('get dataId');
    const dataId = connectedDataModel.getDataId(flatDataId);
    execution.stop('get dataId');
    // remove flatDataId from connectedData model
    execution.start('remove connected data');
    connectedDataModel.removeByFlatDataId(flatDataId);
    execution.stop('remove connected data');
    // remove data corresponding to flatDataId from timebasedData model
    execution.start('remove tbd model');
    removeTimebasedDataModel(flatDataId);
    execution.stop('remove tbd model');
    const message = createDeleteSubscriptionMessage(dataId);
    execution.start('create and push sub message');
    // queue the message
    messageQueue.push(message.args);
    execution.stop('create and push sub message');
  });
  logger.silly('message queue length', messageQueue.length);
  // send queued messages to DC
  execution.start('send zmq messages');
  _each(messageQueue, args => sendMessageToDc(args));
  execution.stop('send zmq messages');
  execution.stop('global');
  execution.print();
};
