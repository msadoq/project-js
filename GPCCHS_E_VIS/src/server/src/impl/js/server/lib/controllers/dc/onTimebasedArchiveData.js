const debug = require('../../io/debug')('controllers:onTimebasedArchiveData');

const { eachSeries } = require('async');
// eslint-disable-next-line no-underscore-dangle
const _chunk = require('lodash/chunk');


// eslint-disable-next-line import/no-extraneous-dependencies
const { decode, encode, getType } = require('common/protobuf');

const registeredQueries = require('../../utils/registeredQueries');
const { add } = require('../../utils/dataQueue');
const executionMonitor = require('../../utils/execution');

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
 * @param addToQueue
 * @param queryIdBuffer
 * @param dataIdBuffer
 * @param isLastBuffer
 * @param payloadBuffers
 * @return {undefined}
 */
const sendTimebasedArchiveData = (
  addToQueue,
  queryIdBuffer,
  dataIdBuffer,
  isLastBuffer,
  ...payloadBuffers
) => {
  const execution = executionMonitor('archiveData');
  execution.reset();
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
  debug.debug('received data from query', queryId);
  execution.stop('register query');

  // deprotobufferize isLast
  execution.start('decode isLast');
  const isLast = protobufTrue.equals(isLastBuffer);
  execution.stop('decode isLast');

  // if last chunk of data, set interval as received in connectedData model and unregister queryId

  if (isLast) {
    debug.debug('last chunk of queried timebased data', queryId);
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
  execution.start('get com object type');
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    throw new Error('unsupported comObject', dataId.comObject);
  }
  execution.stop('get com object type');

  // check payloads parity
  if (payloadBuffers.length % 2 !== 0) {
    debug.debug('payloads should be sent by (timestamp, payloads) peers');
    return undefined;
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

    // store in cache
    execution.start('store payloads');
    timebasedDataModel.addRecord(timestamp, payload);
    execution.stop('store payloads');

    // queue new data in spool
    execution.start('queue payloads');
    // TODO : simplify management in addToQueue
    addToQueue(remoteId, timestamp, payload);
    execution.stop('queue payloads');
    callback(null);
  }, () => {
    debug.debug(`inserting ${payloadBuffers.length / 2} data`);

    execution.stop('global');
    execution.print();
  });
};

module.exports = {
  onTimebasedArchiveData: (queryIdBuffer, dataIdBuffer, isLastBuffer, ...payloadBuffers) =>
    sendTimebasedArchiveData(
      add,
      queryIdBuffer,
      dataIdBuffer,
      isLastBuffer,
      ...payloadBuffers
    ),
  sendTimebasedArchiveData,
};
