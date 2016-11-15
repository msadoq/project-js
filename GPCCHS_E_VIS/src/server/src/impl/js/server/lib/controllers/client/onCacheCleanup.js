const debug = require('../../io/debug')('controllers:onCacheCleanup');

// eslint-disable-next-line no-underscore-dangle
const _each = require('lodash/each');
// eslint-disable-next-line no-underscore-dangle
const _concat = require('lodash/concat');

// eslint-disable-next-line import/no-extraneous-dependencies
const zmq = require('common/zmq');

const registeredQueries = require('../../utils/registeredQueries');
const { createDeleteSubscriptionMessage } = require('../../utils/subscriptions');

const { getTimebasedDataModel, removeTimebasedDataModel } = require('../../models/timebasedDataFactory');
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
 *    - create a queryId and register a queryid/callbakc association
 *    - queue a zmq timebasedSubscription message (with 'DELETE' action)
 * - send queued messages to DC
 *
 * @param expiredRequests
 */

const cacheCleanup = (messageHandler, expiredRequests) => {
  debug.debug('called');

  const messageQueue = [];
  // loop over expired requests ('remoteId': [interval])
  _each(expiredRequests, ({ intervals }, remoteId) => {
    debug.debug('intervals', intervals);
    // remove intervals from connectedData model
    const queryIds = connectedDataModel.removeIntervals(remoteId, intervals);
    registeredQueries.removeMulti(queryIds);
    debug.debug('Query Ids no longer needed', queryIds);
    // if there are still requested intervals in connectedData model for this remoteId
    const remainingIntervals = connectedDataModel.getIntervals(remoteId);
    if (!remainingIntervals) {
      return undefined;
    }
    if (remainingIntervals.length !== 0) {
      debug.debug('still requested');
      // remove data corresponding to expired intervals from timebasedData model
      const timebasedDataModel = getTimebasedDataModel(remoteId);
      if (!timebasedDataModel) {
        return undefined;
      }
      let timebasedDataToRemove = [];
      _each(intervals, (interval) => {
        timebasedDataToRemove = _concat(
          timebasedDataToRemove,
          timebasedDataModel.findByInterval(interval[0], interval[1])
        );
      });
      debug.debug('nb to remove', timebasedDataToRemove.length);
      return _each(timebasedDataToRemove, tbd => timebasedDataModel.remove(tbd));
    }
    debug.debug('no more interval');
    // else, no more intervals for this remoteId
    // get corresponding dataId from connectedData model
    const dataId = connectedDataModel.getDataId(remoteId);
    // remove remoteId from connectedData model
    connectedDataModel.removeByRemoteId(remoteId);
    // remove data corresponding to remoteId from timebasedData model
    removeTimebasedDataModel(remoteId);
    // remove remoteId for corresponding dataId from subscriptions model
    subscriptionsModel.removeRemoteId(dataId, remoteId);
    // if there are still remoteIds in subscriptions model for this dataId
    if (subscriptionsModel.getRemoteIds(dataId).length !== 0) {
      return undefined;
    }
    debug.debug('no more remoteIds');
    // else, no more remoteIds for this dataId
    // remove dataId from subscriptions model
    subscriptionsModel.removeByDataId(dataId);
    const message = createDeleteSubscriptionMessage(dataId);
    // queue the message
    return messageQueue.push(message.args);
  });
  debug.debug('message queue length', messageQueue.length);
  // send queued messages to DC
  return _each(messageQueue, args => messageHandler('dcPush', args));
};

module.exports = {
  cacheCleanup,
  onCacheCleanup: expiredRequests => cacheCleanup(zmq.push, expiredRequests),
};
