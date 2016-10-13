const debug = require('../../io/debug')('controllers:onCacheCleanup');
const { encode } = require('../../protobuf');
const { v4 } = require('node-uuid');
const zmq = require('../../io/zmq');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const registeredQueries = require('../../utils/registeredCallbacks');
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
 *    - if no more intervals in connectedData model for this remoteId
 *        - get corresponding dataId from connectedData model
 *        - remove remoteId from connectedData model
 *        - remove data corresponding to remoteId from timebasedData model
 *        - remove remoteId for corresponding dataId from subscriptions model
 *        - if no more remoteId in subscriptions model for this dataId
 *            - remove dataId from subscriptions model
 *            - queue a zmq timebasedSubscription message (with 'DELETE' action)
 *    - else remove data corresponding to intervals from timebasedData model
 * - send queued messages to DC
 *
 * @param expiredRequests
 */

const cacheCleanup = (messageHandler, expiredRequests) => {
  debug.debug('called');

  const messageQueue = [];
  // loop over expired requests ('remoteId': [interval])
  _.each(expiredRequests, (intervals, remoteId) => {
    // remove intervals from connectedData model
    const queryIds = connectedDataModel.removeIntervals(remoteId, intervals);
    registeredQueries.remove(queryIds);
    // if no more intervals in connectedData model for this remoteId
    if (connectedDataModel.getIntervals(remoteId).length === 0) {
      // get corresponding dataId from connectedData model
      const dataId = connectedDataModel.getDataId(remoteId);
      // remove remoteId from connectedData model
      connectedDataModel.removeByRemoteId(remoteId);
      // remove data corresponding to remoteId from timebasedData model
      removeTimebasedDataModel(remoteId);
      // remove remoteId for corresponding dataId from subscriptions model
      subscriptionsModel.removeRemoteId(dataId, remoteId);
      // if no more remoteId in subscriptions model for this dataId
      if (subscriptionsModel.getRemoteIds(dataId).length === 0) {
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
        messageQueue.push(subArgs);
      }
    }
    // TODO else remove data corresponding to intervals from timebasedData model
    const timebasedDataModel = getTimebasedDataModel(remoteId);
    if (!timebasedDataModel) {
      return;
    }
    let timebasedDataToRemove = [];
    _.each(intervals, (interval) => {
      timebasedDataToRemove = _.concat(
        timebasedDataToRemove,
        timebasedDataModel.findByInterval(interval[0], interval[1])
      );
    });
    _.each(timebasedDataToRemove, tbd => timebasedDataModel.remove(tbd));
  });

  // send queued messages to DC
  return _.each(messageQueue, args => messageHandler('dcPush', args));

/*  // protobufferize messageType
  const domainQueryHeader = encode('dc.dataControllerUtils.Header', {
    messageType: constants.MESSAGETYPE_DOMAIN_QUERY,
  });

  // create and register queryId
  const id = v4();
  registeredCallbacks.set(id, (err) => {
    if (err) {
      throw err;
    }
  });
  // protobufferize queryId
  const queryId = encode('dc.dataControllerUtils.String', {
    string: id,
  });

  const queryArgs = [domainQueryHeader, queryId];

  messageHandler('dcPush', queryArgs);*/
};

module.exports = {
  cacheCleanup,
  onCacheCleanup: expiredRequests => cacheCleanup(zmq.push, expiredRequests),
};
