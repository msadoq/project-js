const { decode, getType } = require('common/protobuf');
const {
  HSS_MAX_PAYLOADS_PER_MESSAGE,
} = require('common/constants');
const executionMonitor = require('common/log/execution');
const _isEmpty = require('lodash/isEmpty');
const _each = require('lodash/each');
const _chunk = require('lodash/chunk');
const logger = require('common/log')('controllers:onTimebasedPubSubData');
const loggerData = require('common/log')('controllers:incomingData');
const { add: addToQueue } = require('../../models/dataQueue');
const { applyFilters } = require('../../utils/filters');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const { set: setLastPubSubTimestamp } = require('../../models/lastPubSubTimestamp');

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
module.exports = (
  queryIdBuffer,
  dataIdBuffer,
  ...payloadsBuffers
) => {
  logger.silly('called');
  const execution = executionMonitor('pubSubData');
  execution.start('global');

  logger.silly('received data from pubSub');

  execution.start('decode dataId');
  // deprotobufferize dataId
  logger.silly('decode dataId');
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer);
  execution.stop('decode dataId');

  // get payload type
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    logger.error('unsupported comObject', dataId.comObject); // TODO send error to client
  }

  execution.start('retrieve subscription');
  // if dataId not in subscriptions model, stop logic
  logger.silly('retrieve subscription');
  const subscription = subscriptionsModel.getByDataId(dataId);
  if (!subscription) {
    return;
  }
  execution.stop('retrieve subscription');

  execution.start('retrieve filters');
  // get { remoteId: filters } from subscriptions model
  logger.silly('retrieve filters');
  const filtersByRemoteId = subscriptionsModel.getFilters(dataId, subscription);
  execution.stop('retrieve filters');

  // if there is no remoteId for this dataId, stop logic
  if (_isEmpty(filtersByRemoteId)) {
    logger.silly('no query registered for this dataId', dataId);
    return;
  }
  if (payloadsBuffers.length % 2 !== 0) {
    logger.silly('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  // prevent receiving more than 1000 payloads at one time (avoid Maximum call stack size exceeded)
  const payloadNumber = payloadsBuffers.length / 2;
  if (payloadNumber > HSS_MAX_PAYLOADS_PER_MESSAGE) {
    // TODO send error to client
    execution.stop(
      'global',
      `${dataId.parameterName} message ignored, too many payloads: ${payloadNumber}`
    );
    execution.print();
    logger.warn(`message ignored, too many payloads: ${payloadNumber}`);
    return;
  }

  // loop over arguments peers (timestamp, payload)
  _each(_chunk(payloadsBuffers, 2), (payloadBuffer) => {
    execution.start('decode timestamp');
    const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]);
    execution.stop('decode timestamp');

    setLastPubSubTimestamp(timestamp.ms);

    let decodedPayload;
    _each(filtersByRemoteId, (filters, remoteId) => {
      execution.start('control interval');
      // if timestamp not in interval in connectedData model, continue to next iteration
      const isKnownInterval = connectedDataModel.isTimestampInKnownIntervals(
        remoteId, timestamp.ms
      );

      const date = new Date(timestamp.ms);

      if (!isKnownInterval) {
        loggerData.debug({
          controller: 'onTimebasedPubSubData',
          remoteId,
          date,
          isKnownInterval,
        });
        return;
      }
      execution.stop('control interval');

      // decode Payload only once by payloadBuffer loop to avoid resource-consuming
      if (!decodedPayload) {
        execution.start('decode payload');
        // deprotobufferize payload
        decodedPayload = decode(payloadProtobufType, payloadBuffer[1]);
        execution.stop('decode payload');
      }

      execution.start('apply filters');
      // apply filters on decoded payload
      const isMatchingFilters = applyFilters(decodedPayload, filters);
      if (!isMatchingFilters) {
        loggerData.debug({
          controller: 'onTimebasedPubSubData',
          remoteId,
          date,
          isMatchingFilters,
        });
        return;
      }
      execution.stop('apply filters');

      loggerData.debug({
        controller: 'onTimebasedPubSubData',
        remoteId,
        date,
        rawValue: decodedPayload.rawValue,
        extractedValue: decodedPayload.extractedValue,
        convertedValue: decodedPayload.convertedValue,
      });

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
      logger.silly('queue pubSub point to client');
      // queue a ws newData message (sent periodically)
      addToQueue(remoteId, tbd.timestamp, tbd.payload);
      execution.stop('queue payloads');

      execution.stop('global');
      execution.print();
    });
  });
};
