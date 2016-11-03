const debug = require('../../io/debug')('controllers:onTimebasedPubSubData');
const {
  isEmpty: _isEmpty,
  each: _each,
  chunk: _chunk,
} = require('lodash');
const { decode, getType } = require('../../protobuf');
const { addTimebasedDataModel, getTimebasedDataModel } = require('../../models/timebasedDataFactory');
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
 * @param queryIdBuffer (not used for now)
 * @param dataIdBuffer
 * @param payloadsBuffers
 */
const sendTimebasedPubSubData = (
  websocketQueueHandler,
  queryIdBuffer,
  dataIdBuffer,
  ...payloadsBuffers
) => {
  debug.verbose('called');

  // deprotobufferize dataId
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer);

  // get payload type
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    throw new Error('unsupported comObject', dataId.comObject);
  }

  // if dataId not in subscriptions model, stop logic
  const subscription = subscriptionsModel.getByDataId(dataId);
  if (!subscription) {
    return undefined;
  }
  debug.debug('received subscribed timebased data');

  // get { remoteId: filters } from subscriptions model
  const filtersByRemoteId = subscriptionsModel.getFilters(dataId, subscription);

  // if there is no remoteId for this dataId, stop logic
  if (_isEmpty(filtersByRemoteId)) {
    debug.debug('no query registered for this dataId', dataId);
    return undefined;
  }
  if (payloadsBuffers.length % 2 !== 0) {
    debug.debug('payloads should be sent by (timestamp, payloads) peers');
    return undefined;
  }

  // loop over arguments peers (timestamp, payload)
  return _each(_chunk(payloadsBuffers, 2), (payloadBuffer) => {
    _each(filtersByRemoteId, (filters, remoteId) => {
      // deprotobufferize timestamp
      const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]);

      debug.debug('check intervals for remoteId', remoteId, 'for timestamp', timestamp.ms);
      // if timestamp not in interval in connectedData model, continue to next iteration
      if (!connectedDataModel.isTimestampInKnownIntervals(remoteId, timestamp.ms)) {
        return;
      }
      debug.debug('decode payload');
      // deprotobufferize payload
      const decodedPayload = decode(payloadProtobufType, payloadBuffer[1]);

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
      let timebasedDataModel = getTimebasedDataModel(remoteId);
      if (!timebasedDataModel) {
        timebasedDataModel = addTimebasedDataModel(remoteId);
      }
      timebasedDataModel.addRecord(tbd.timestamp, tbd.payload);
      // queue a ws newData message (sent periodically)
      websocketQueueHandler(remoteId, { [tbd.timestamp]: tbd.payload });
    });
  });
};

module.exports = {
  onTimebasedPubSubData: (queryIdBuffer, dataIdBuffer, ...payloadsBuffers) =>
    sendTimebasedPubSubData(addToMainQueue, queryIdBuffer, dataIdBuffer, ...payloadsBuffers),
  sendTimebasedPubSubData,
};
