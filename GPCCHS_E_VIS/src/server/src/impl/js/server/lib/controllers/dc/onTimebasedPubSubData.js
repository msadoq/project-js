const { decode, getType } = require('common/protobuf');
const globalConstants = require('common/constants');
const executionMonitor = require('common/log/execution');
const _isEmpty = require('lodash/isEmpty');
const _each = require('lodash/each');
const _chunk = require('lodash/chunk');
const logger = require('common/log')('controllers:onTimebasedPubSubData');
const loggerData = require('common/log')('controllers:incomingData');
const { add: addToQueue } = require('../../utils/dataQueue');
const { applyFilters } = require('../../utils/filters');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');

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
module.exports.onTimebasedPubSubData = (
  queryIdBuffer,
  dataIdBuffer,
  ...payloadsBuffers
) => {
  logger.verbose('called');
  const execution = executionMonitor('pubSubData');
  execution.start('global');

  logger.debug('received data from pubSub');

  execution.start('decode dataId');
  // deprotobufferize dataId
  logger.debug('decode dataId');
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer);
  execution.stop('decode dataId');

  // get payload type
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    logger.error('unsupported comObject', dataId.comObject); // TODO send error to client
  }

  execution.start('retrieve subscription');
  // if dataId not in subscriptions model, stop logic
  logger.debug('retrieve subscription');
  const subscription = subscriptionsModel.getByDataId(dataId);
  if (!subscription) {
    return undefined;
  }
  execution.stop('retrieve subscription');

  execution.start('retrieve filters');
  // get { remoteId: filters } from subscriptions model
  logger.debug('retrieve filters');
  const filtersByRemoteId = subscriptionsModel.getFilters(dataId, subscription);
  execution.stop('retrieve filters');

  // if there is no remoteId for this dataId, stop logic
  if (_isEmpty(filtersByRemoteId)) {
    logger.debug('no query registered for this dataId', dataId);
    return undefined;
  }
  if (payloadsBuffers.length % 2 !== 0) {
    logger.debug('payloads should be sent by (timestamp, payloads) peers');
    return undefined;
  }

  // prevent receiving more than 1000 payloads at one time (avoid Maximum call stack size exceeded)
  const payloadNumber = payloadsBuffers.length / 2;
  if (payloadNumber > globalConstants.HSS_MAX_PAYLOADS_PER_MESSAGE) {
    // TODO send error to client
    execution.stop(
      'global',
      `${dataId.parameterName} message ignored, too many payloads: ${payloadNumber}`
    );
    execution.print();
    return logger.warn(`message ignored, too many payloads: ${payloadNumber}`);
  }

  // loop over arguments peers (timestamp, payload)
  return _each(_chunk(payloadsBuffers, 2), (payloadBuffer) => {
    _each(filtersByRemoteId, (filters, remoteId) => {
      execution.start('decode timestamp');
      const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]);
      execution.stop('decode timestamp');

      execution.start('control interval');
      // if timestamp not in interval in connectedData model, continue to next iteration
      const isKnownInterval = connectedDataModel.isTimestampInKnownIntervals(
        remoteId, timestamp.ms
      );

      if (!isKnownInterval) {
        loggerData.debug({
          controller: 'onTimebasedPubSubData',
          remoteId,
          isKnownInterval,
        });
        return;
      }
      execution.stop('control interval');

      execution.start('decode payload');
      // deprotobufferize payload
      const decodedPayload = decode(payloadProtobufType, payloadBuffer[1]);
      execution.stop('decode payload');

      loggerData.debug({
        controller: 'onTimebasedPubSubData',
        remoteId,
        rawValue: decodedPayload.rawValue,
        extractedValue: decodedPayload.extractedValue,
        convertedValue: decodedPayload.convertedValue,
      });

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
      logger.debug('queue pubSub point to client');
      // queue a ws newData message (sent periodically)
      addToQueue(remoteId, tbd.timestamp, tbd.payload);
      execution.stop('queue payloads');

      execution.stop('global');
      execution.print();
    });
  });
};
