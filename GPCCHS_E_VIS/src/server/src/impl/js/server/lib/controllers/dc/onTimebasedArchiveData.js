const { eachSeries } = require('async');
const {
  chunk: _chunk,
  isEqual: _isEqual,
} = require('lodash');

const debug = require('../../io/debug')('controllers:onTimebasedArchiveData');
// eslint-disable-next-line import/no-extraneous-dependencies
const { decode, encode, getType } = require('common/protobuf');
const { addTimebasedDataModel, getTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const registeredQueries = require('../../utils/registeredQueries');
const { add } = require('../../utils/dataQueue');
const execution = require('../../utils/execution')('archiveData');

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
  execution.reset();
  execution.start('global');

  execution.start('decode queryId');
  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  execution.stop('decode queryId');

  // if queryId not in registeredQueries, stop logic
  const remoteId = registeredQueries.get(queryId);
  if (typeof remoteId === 'undefined') {
    return undefined;
  }
  debug.debug('received data from query', queryId);

  // deprotobufferize isLast
  execution.start('decode isLast');
  const isLast = _isEqual(isLastBuffer, protobufTrue);
  execution.stop('decode isLast');

  // if last chunk of data, set interval as received in connectedData model and unregister queryId

  if (isLast) {
    debug.debug('last chunk of queried timebased data', queryId);
    execution.start('set interval as received');
    connectedDataModel.setIntervalAsReceived(remoteId, queryId);
    execution.stop('set interval as received');
    registeredQueries.remove(queryId);
  }

  // deprotobufferize dataId
  execution.start('decode dataId');
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer); // TODO : avoid deprotobufferization of dataId (we can retrieve it with queryId)
  execution.stop('decode dataId');

  // get payload type
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    throw new Error('unsupported comObject', dataId.comObject);
  }

  // check payloads parity
  if (payloadBuffers.length % 2 !== 0) {
    debug.debug('payloads should be sent by (timestamp, payloads) peers');
    return undefined;
  }

  // retrieve cache collection
  execution.start('retrieve store');
  let timebasedDataModel = getTimebasedDataModel(remoteId);
  if (!timebasedDataModel) {
    timebasedDataModel = addTimebasedDataModel(remoteId);
  }
  execution.stop('retrieve store');

  // only one loop to decode, insert in cache, and add to queue
  // TODO : avoid iteration by removing chunk
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
    addToQueue(remoteId, { [timestamp]: payload });
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
