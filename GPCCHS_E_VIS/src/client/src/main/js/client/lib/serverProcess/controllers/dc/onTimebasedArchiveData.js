const _isBuffer = require('lodash/isBuffer');
const { writeFile } = require('fs');
const { join } = require('path');
const { decode, encode, getType } = require('../../../utils/adapters');
const executionMonitor = require('../../../common/logManager/execution');
const logger = require('../../../common/logManager')('controllers:onTimebasedArchiveData');
const loggerData = require('../../../common/logManager')('controllers:incomingData');
const { get } = require('../../../common/configurationManager');
const { createDumpFolder, getDumpFolder } = require('../../utils/dumpFolder');
const {
  removeByQueryId: removeRegisteredQuery,
  getByQueryId: getRegisteredQuery,
} = require('../../models/registeredQueries');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const { getStore } = require('../../store');
const { incomingArchive } = require('../../../viewManager/commonActions/dataActions');

const protobufTrue = encode('dc.dataControllerUtils.Boolean', { boolean: true });

// TODO dbrugne move in dedicated middleware ///////////////////////////////////////
const dump = (get('DUMP') === 'on');
// TODO dbrugne move in dedicated middleware ///////////////////////////////////////

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
 * @param args array
 */
module.exports = function onTimebasedArchiveData(args) {
  // TODO dbrugne throw exception in dev when receiving more that one value for a getLast request

  const queryIdBuffer = args[0];
  // args[1] is dataIdBuffer (not used in current implementation)
  const isLastBuffer = args[2];

  const payloadBuffers = Array.prototype.slice.call(args, 3);

  // check payloads parity
  if (payloadBuffers.length % 2 !== 0) {
    logger.warn('payloads should be sent by (timestamp, payloads) peers');
    return;
  }

  const numberOfValues = payloadBuffers.length / 2;

  const execution = executionMonitor('archiveData');
  execution.start('global');

  execution.start('decode queryId');
  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  execution.stop('decode queryId');

  // if queryId not in registeredQueries, stop logic
  execution.start('register query');
  // TODO remove and implement a clean RPC with DC that take all query response chunk in one line
  const remoteId = getRegisteredQuery(queryId);
  if (typeof remoteId === 'undefined') {
    return;
  }
  // TODO dbrugne decomment when try catch implemented
  // if (connectedDataModel.isLastQuery(remoteId, queryId) && payloadBuffers.length !== 2) {
  //   throw new Error(`onTimebasedArchiveData : More than 1 payload for getLast request (${payloadBuffers.length / 2})`);
  // }
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

  // retrieve cache collection
  let timebasedDataModel;
  if (!isLastQuery) {
    execution.start('retrieve store');
    timebasedDataModel = getOrCreateTimebasedDataModel(remoteId);
    execution.stop('retrieve store');
  }

  // TODO dbrugne move in dedicated middleware ///////////////////////////////////////
  let dumpFolder;
  if (dump) {
    createDumpFolder(dataId);
    dumpFolder = getDumpFolder(dataId);
  }
  // TODO dbrugne move in dedicated middleware ///////////////////////////////////////

  // only one loop to decode, insert in cache, and add to queue
  const payloadsJson = {};
  while (payloadBuffers.length) {
    // pop the first two buffers from list
    const payloadBuffer = payloadBuffers.splice(0, 2);

    // robustness code, LPISIS could send empty ZeroMQ frame
    if (!_isBuffer(payloadBuffer[0]) || !_isBuffer(payloadBuffer[1])) {
      loggerData.warn(`received an empty ZeroMQ frame from DC for ${remoteId}`);
      // eslint-disable-next-line no-continue, "DV6 TBC_CNES LPISIS use continue to preserve readability and avoid long block in an if condition"
      continue;
    }

    execution.start('decode payloads');
    const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]).ms;
    const payload = decode(payloadProtobufType, payloadBuffer[1]);
    execution.stop('decode payloads');

    // TODO dbrugne move in dedicated middleware ///////////////////////////////////////
    // dump
    if (dump && dumpFolder) {
      // save a file per timestamp with binary payload
      writeFile(join(dumpFolder, timestamp.toString()), payloadBuffer[1], (err) => {
        if (err) {
          loggerData.warn(`Error writing dump file ${timestamp}`);
        }
      });
    }
    // TODO dbrugne move in dedicated middleware ///////////////////////////////////////

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
    payloadsJson[timestamp] = payload;
    execution.stop('queue payloads');
  }

  // dispatch the incoming data action
  getStore().dispatch(incomingArchive(remoteId, payloadsJson));

  loggerData.debug({
    controller: 'onTimebasedArchiveData',
    remoteId,
    numberOfValues,
    endOfQuery,
  });

  execution.stop('global', `${dataId.parameterName}: ${numberOfValues} payloads`);
  execution.print();
};
