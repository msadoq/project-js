const debug = require('../../io/debug')('controllers:onTimebasedPubSubData');
const _ = require('lodash');
const { decode } = require('../../protobuf');
const timebasedDataModel = require('../../models/timebasedData');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const { addToMainQueue } = require('../../websocket/sendToMain');
const { applyFilters } = require('../../utils/filters');

/**
 * Trigger on new incoming message NewDataMessage from DC.
 *
 * - if dataId not in subscriptions model, stop logic
 * - get { remoteId: filters } from subscriptions model
 * - if there is no remoteId for this dataId, stop logic
 * - loop over arguments (timestamp, payload) peers
 *    - loop over remoteId
 *        - if timestamp not in interval in connectedData model, continue to next iteration
 *        - apply filters on decode payload
 *        - deprotobufferize payload
 *        - store filtered payload in timebasedData model
 *        - queue a ws newData message (sent periodically)
 *
 * @param buffer
 */
const sendTimebasedPubSubData = (websocketHandler, dataIdBuffer, ...payloadsBuffers) => {
  debug.verbose('called');

  // deprotobufferize dataId
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer);

  // if dataId not in subscriptions model, stop logic
  if (!subscriptionsModel.exists(dataId)) {
    return undefined;
  }
  debug.debug('received subscribed timebased data');

  // get { remoteId: filters } from subscriptions model
  const filtersByRemoteId = subscriptionsModel.getFilters(dataId);

  // if there is no remoteId for this dataId, stop logic
  if (_.isEmpty(filtersByRemoteId)) {
    return undefined;
  }
  if (payloadsBuffers.length % 2 !== 0) {
    return undefined;
  }

  // loop over arguments peers (timestamp, payload)
  return _.each(_.chunk(payloadsBuffers, 2), (payloadBuffer) => {
    _.each(filtersByRemoteId, (filters, remoteId) => {
      // deprotobufferize timestamp
      const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]);

      debug.debug('check intervals for remoteId', remoteId, 'for timestamp', timestamp.ms);
      // if timestamp not in interval in connectedData model, continue to next iteration
      if (!connectedDataModel.isTimestampInKnownIntervals(remoteId, timestamp.ms)) {
        return;
      }
      debug.debug('decode payload');
      // deprotobufferize payload
      const decodedPayload = decode(`lpisis.decommutedParameter.${dataId.comObject}`, payloadBuffer[1]);

      // apply filters on decoded payload
      if (!applyFilters(decodedPayload, filters)) {
        return;
      }
      debug.debug('corresponding to filters', filters);
      const tbd = {
        timestamp: timestamp.ms,
        payload: decodedPayload,
      };
      // store decoded payload in timebasedData model
      timebasedDataModel.addRecord(remoteId, tbd.timestamp, tbd.payload);
      // queue a ws newData message (sent periodically)
      websocketHandler(remoteId, [tbd]);
    });
  });
};

module.exports = {
  onTimebasedPubSubData: (dataIdBuffer, ...payloadsBuffers) =>
    sendTimebasedPubSubData(addToMainQueue, dataIdBuffer, ...payloadsBuffers),
  sendTimebasedPubSubData,
};
