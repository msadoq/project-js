/* eslint no-underscore-dangle:0 import/no-extraneous-dependencies:0 */
const { decode, getType } = require('common/protobuf');
const _isEmpty = require('lodash/isEmpty');
const _each = require('lodash/each');
const _chunk = require('lodash/chunk');

const debug = require('../../io/debug')('controllers:onTimebasedPubSubData');
const { add: addToQueue } = require('../../websocket/dataQueue');
const { applyFilters } = require('../../utils/filters');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const executionMonitor = require('../../utils/execution');

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
const onTimebasedPubSubData = (
  queryIdBuffer,
  dataIdBuffer,
  ...payloadsBuffers
) => {
  debug.verbose('called');
  const execution = executionMonitor('pubSubData');
  execution.start('global');

  execution.start('decode dataId');
  // deprotobufferize dataId
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer);
  execution.stop('decode dataId');

  // get payload type
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    debug.error('unsupported comObject', dataId.comObject); // TODO send error to client
  }

  execution.start('retrieve subscription');
  // if dataId not in subscriptions model, stop logic
  const subscription = subscriptionsModel.getByDataId(dataId);
  if (!subscription) {
    return undefined;
  }
  execution.stop('retrieve subscription');

  execution.start('retrieve filters');
  // get { remoteId: filters } from subscriptions model
  const filtersByRemoteId = subscriptionsModel.getFilters(dataId, subscription);
  execution.stop('retrieve filters');

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
      execution.start('decode timestamp');
      const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]);
      execution.stop('decode timestamp');

      execution.start('control interval');
      // if timestamp not in interval in connectedData model, continue to next iteration
      if (!connectedDataModel.isTimestampInKnownIntervals(remoteId, timestamp.ms)) {
        return;
      }
      execution.stop('control interval');

      execution.start('decode payload');
      // deprotobufferize payload
      const decodedPayload = decode(payloadProtobufType, payloadBuffer[1]);
      execution.stop('decode payload');

      execution.start('apply filters');
      // apply filters on decoded payload
      if (!applyFilters(decodedPayload, filters)) {
        return;
      }
      execution.stop('apply filters');

      const tbd = {
        timestamp: timestamp.ms,
        payload: decodedPayload,
      };

      execution.start('retrieve timebasedData model');
      const timebasedDataModel = getOrCreateTimebasedDataModel(remoteId);
      execution.stop('retrieve timebasedData model');

      execution.start('store in timebasedData model');
      timebasedDataModel.addRecord(tbd.timestamp, tbd.payload);
      execution.stop('store in timebasedData model');

      execution.start('queue payloads');
      // queue a ws newData message (sent periodically)
      addToQueue(remoteId, tbd.timestamp, tbd.payload);
      execution.stop('queue payloads');

      execution.stop('global');
      execution.print();
    });
  });
};

module.exports = {
  onTimebasedPubSubData,
};
