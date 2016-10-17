const debug = require('../../io/debug')('controllers:onCacheCleanup');
const { encode } = require('../../protobuf');
const { v4 } = require('node-uuid');
const zmq = require('../../io/zmq');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const registeredQueries = require('../../utils/registeredQueries');
const { getTimebasedDataModel, removeTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const constants = require('../../constants');
const _ = require('lodash');

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
  _.each(expiredRequests, ({ intervals }, remoteId) => {
    debug.error('intervals', intervals);
    // remove intervals from connectedData model
    const queryIds = connectedDataModel.removeIntervals(remoteId, intervals);
    registeredQueries.removeMulti(queryIds);
    debug.error('Query Ids no longer needed', queryIds);
    // if there are still requested intervals in connectedData model for this remoteId
    const remainingIntervals = connectedDataModel.getIntervals(remoteId);
    if (!remainingIntervals) {
      return undefined;
    }
    if (remainingIntervals.length !== 0) {
      debug.error('still requested');
      // remove data corresponding to expired intervals from timebasedData model
      const timebasedDataModel = getTimebasedDataModel(remoteId);
      if (!timebasedDataModel) {
        return undefined;
      }
      let timebasedDataToRemove = [];
      _.each(intervals, (interval) => {
        timebasedDataToRemove = _.concat(
          timebasedDataToRemove,
          timebasedDataModel.findByInterval(interval[0], interval[1])
        );
      });
      debug.error('nb to remove', timebasedDataToRemove.length);
      return _.each(timebasedDataToRemove, tbd => timebasedDataModel.remove(tbd));
    }
    debug.error('no more interval');
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
    debug.error('no more remoteIds');
    // else, no more remoteIds for this dataId
    // remove dataId from subscriptions model
    subscriptionsModel.removeByDataId(dataId);
    // create a queryId
    const queryId = v4();
    // register queryId/callback association
    registeredCallbacks.set(queryId, (respErr) => {
      if (respErr) {
        throw respErr;
      }
    });
    // queue a zmq timebasedSubscription message (with 'DELETE' action)
    const subArgs = [
      encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
      encode('dc.dataControllerUtils.String', { string: queryId }),
      encode('dc.dataControllerUtils.DataId', dataId),
      encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_DELETE }),
    ];
    // queue the message
    return messageQueue.push(subArgs);
  });
  debug.error('message queue length', messageQueue.length);
  // send queued messages to DC
  return _.each(messageQueue, args => messageHandler('dcPush', args));
};

module.exports = {
  cacheCleanup,
  onCacheCleanup: expiredRequests => cacheCleanup(zmq.push, expiredRequests),
};
