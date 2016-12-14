/* eslint import/no-extraneous-dependencies:0 */
const { eachSeries } = require('async');
const _chunk = require('lodash/chunk');
const { decode, encode, getType } = require('common/protobuf');
const globalConstants = require('common/constants');
const executionMonitor = require('common/execution');

// eslint-disable-next-line import/no-extraneous-dependencies
const logger = require('common/log')('controllers:onTimebasedArchiveData');
const loggerData = require('common/log')('controllers:incomingData');
const registeredQueries = require('../../utils/registeredQueries');
const { add: addToQueue } = require('../../websocket/dataQueue');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');

const protobufTrue = encode('dc.dataControllerUtils.Boolean', { boolean: true });

/**
 * Trigger on new incoming message NewDataMessage from DC.
 *
 * - if queryId not in registeredQueries, stop logic
 * - get remoteId
 * - if last chunk of data, set interval as received in connectedData model and unregister queryId
 * - loop over arguments (timestamp, payload) peers
 *    - deprotobufferize payload
 * - store decoded payloads in timebasedData model
 * - queue a ws newData message (sent periodically)
 *
 * @param queryIdBuffer
 * @param dataIdBuffer
 * @param isLastBuffer
 * @param payloadBuffers
 * @return {undefined}
 */
const onTimebasedArchiveData = (
  queryIdBuffer,
  dataIdBuffer,
  isLastBuffer,
  ...payloadBuffers
) => {
  const execution = executionMonitor('archiveData');
  execution.start('global');

  execution.start('decode queryId');
  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  execution.stop('decode queryId');

  // if queryId not in registeredQueries, stop logic
  execution.start('register query');
  const remoteId = registeredQueries.get(queryId);
  if (typeof remoteId === 'undefined') {
    return undefined;
  }
  logger.debug('received data from query', queryId);
  execution.stop('register query');

  // deprotobufferize isLast
  execution.start('decode isLast');
  const isLast = protobufTrue.equals(isLastBuffer);
  execution.stop('decode isLast');

  // if last chunk of data, set interval as received in connectedData model and unregister queryId
  if (isLast) {
    logger.debug('last chunk of queried timebased data', queryId);
    execution.start('set interval as received');
    connectedDataModel.setIntervalAsReceived(remoteId, queryId);
    registeredQueries.remove(queryId);
    execution.stop('set interval as received');
  }

  // deprotobufferize dataId
  execution.start('decode dataId');
  const dataId = connectedDataModel.getDataId(remoteId);
  execution.stop('decode dataId');

  // get payload type
  execution.start('get comObject type');
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    throw new Error('unsupported comObject', dataId.comObject);
  }
  execution.stop('get comObject type');

  // check payloads parity
  if (payloadBuffers.length % 2 !== 0) {
    logger.debug('payloads should be sent by (timestamp, payloads) peers');
    return undefined;
  }

  // prevent receiving more than 1000 payloads at one time (avoid Maximum call stack size exceeded)
  const payloadNumber = payloadBuffers.length / 2;
  if (payloadNumber > globalConstants.HSS_MAX_PAYLOADS_PER_MESSAGE) {
    // TODO send error to client
    execution.stop(
      'global',
      `${dataId.parameterName} message ignored, too many payloads: ${payloadNumber}`
    );
    execution.print();
    return logger.warn(`message ignored, too many payloads: ${payloadNumber}`);
  }

  // retrieve cache collection
  execution.start('retrieve store');
  const timebasedDataModel = getOrCreateTimebasedDataModel(remoteId);
  execution.stop('retrieve store');

  // only one loop to decode, insert in cache, and add to queue
  return eachSeries(_chunk(payloadBuffers, 2), (payloadBuffer, callback) => {
    execution.start('decode payloads');
    const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]).ms;
    const payload = decode(payloadProtobufType, payloadBuffer[1]);
    execution.stop('decode payloads');

    loggerData.debug({
      controller: 'onTimebasedArchiveData',
      remoteId,
      rawValue: payload.rawValue,
      extractedValue: payload.extractedValue,
      convertedValue: payload.convertedValue,
    });

    // store in cache
    execution.start('store payloads');
    timebasedDataModel.addRecord(timestamp, payload);
    execution.stop('store payloads');

    // queue new data in spool
    execution.start('queue payloads');
    addToQueue(remoteId, timestamp, payload);
    execution.stop('queue payloads');
    callback(null);
  }, () => {
    logger.debug(`inserted ${payloadNumber} payloads`);

    // if HSS is a forked process, in e2e tests for example
    if (process.send) {
      // Check if no pending requests
      const noMorePendingRequests = !connectedDataModel
        .getAll()
        .map(data => Object.keys(data.intervals.requested).length)
        .reduce((acc, l) => acc + l, 0);

      // Send 'updated' to parent process
      if (noMorePendingRequests) {
        process.send('updated');
      }
    }

    execution.stop('global', `${dataId.parameterName}: ${payloadNumber} payloads`);
    execution.print();
  });
};

module.exports = {
  onTimebasedArchiveData,
};
