const { eachSeries } = require('async');
const _chunk = require('lodash/chunk');
const _isBuffer = require('lodash/isBuffer');
const { writeFile } = require('fs');
const { join } = require('path');
const { decode, encode, getType } = require('common/protobuf');
const executionMonitor = require('../../../common/logManager/execution');
const logger = require('../../../common/logManager')('controllers:onTimebasedArchiveData');
const loggerData = require('../../../common/logManager')('controllers:incomingData');
const { get } = require('../../../common/configurationManager');
const { createDumpFolder, getDumpFolder } = require('../../utils/dumpFolder');
const {
  removeByQueryId: removeRegisteredQuery,
  getByQueryId: getRegisteredQuery,
} = require('../../models/registeredQueries');
const { add: addToQueue } = require('../../models/dataQueue');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');

const protobufTrue = encode('dc.dataControllerUtils.Boolean', { boolean: true });

const dump = (get('DUMP') === 'on');

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
module.exports = (
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
  const remoteId = getRegisteredQuery(queryId); // TODO remove and implement a clean RPC with DC that take all query response chunk in one line
  if (typeof remoteId === 'undefined') {
    return;
  }
  logger.silly('received data from query', queryId);
  execution.stop('register query');

  // deprotobufferize isLast
  execution.start('decode isLast');
  const endOfQuery = protobufTrue.equals(isLastBuffer);
  execution.stop('decode isLast');

  // if last chunk of data, set interval as received in connectedData model and unregister queryId
  let isLastQuery = false;
  if (endOfQuery) {
    logger.silly('last chunk of queried timebased data', queryId);
    execution.start('set interval as received');
    // Check if query is getLast or not
    if (connectedDataModel.isLastQuery(remoteId, queryId)) {
      connectedDataModel.removeLastQuery(remoteId, queryId);
      isLastQuery = true;
    } else {
      connectedDataModel.setIntervalAsReceived(remoteId, queryId);
    }
    removeRegisteredQuery(queryId);
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
    logger.error(`unsupported comObject ${dataId.comObject}`);
    return;
  }
  execution.stop('get comObject type');

  // check payloads parity
  if (payloadBuffers.length % 2 !== 0) {
    logger.silly('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  const payloadCount = payloadBuffers.length / 2;
  // retrieve cache collection
  let timebasedDataModel;
  if (!isLastQuery) {
    execution.start('retrieve store');
    timebasedDataModel = getOrCreateTimebasedDataModel(remoteId);
    execution.stop('retrieve store');
  }
  let dumpFolder;
  if (dump) {
    createDumpFolder(dataId);
    dumpFolder = getDumpFolder(dataId);
  }

  // only one loop to decode, insert in cache, and add to queue
  eachSeries(_chunk(payloadBuffers, 2), (payloadBuffer, callback) => {
    if (!_isBuffer(payloadBuffer[0]) || !_isBuffer(payloadBuffer[1])) {
      // robustness code, LPISIS could send empty ZeroMQ frame
      loggerData.warn(`received an empty ZeroMQ frame from DC for ${remoteId}`);
      callback(null);
      return;
    }

    execution.start('decode payloads');
    const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]).ms;
    const payload = decode(payloadProtobufType, payloadBuffer[1]);
    execution.stop('decode payloads');

    // dump
    if (dump && dumpFolder) {
      // save a file per timestamp with binary payload
      writeFile(join(dumpFolder, timestamp.toString()), payloadBuffer[1], (err) => {
        if (err) {
          loggerData.warn(`Error writing dump file ${timestamp}`);
        }
      });
    }

    loggerData.silly({
      controller: 'onTimebasedArchiveData',
      remoteId,
      rawValue: payload.rawValue,
      extractedValue: payload.extractedValue,
      convertedValue: payload.convertedValue,
    });

    // different behaviour if it is a last query or not:
    // not last => storage in cache
    // last and range => queue data in spool
    if (!isLastQuery) {
      // store in cache
      execution.start('store payloads');
      timebasedDataModel.addRecord(timestamp, payload);
      execution.stop('store payloads');
    }
    // queue new data in spool
    execution.start('queue payloads');
    addToQueue(remoteId, timestamp, payload);
    execution.stop('queue payloads');

    callback(null);
  }, () => {
    loggerData.debug({
      controller: 'onTimebasedArchiveData',
      remoteId,
      payloadCount,
      endOfQuery,
    });

    execution.stop('global', `${dataId.parameterName}: ${payloadCount} payloads`);
    execution.print();
  });
};
