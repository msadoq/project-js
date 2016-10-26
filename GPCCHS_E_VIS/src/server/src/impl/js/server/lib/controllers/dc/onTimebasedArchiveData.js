const debug = require('../../io/debug')('controllers:onTimebasedArchiveData');
const {
  map: _map,
  chunk: _chunk,
  isEqual: _isEqual,
  zipObject: _zipObject,
  keys: _keys,
  values: _values,
} = require('lodash');
const { decode, encode } = require('../../protobuf');
const { addTimebasedDataModel, getTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const registeredQueries = require('../../utils/registeredQueries');
const { addToMainQueue } = require('../../websocket/sendToMain');
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
 * @param buffer
 */
const sendTimebasedArchiveData = (
  websocketQueueHandler,
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

  // if queryId not in registeredQuerues, stop logic
  const remoteId = registeredQueries.get(queryId);
  if (typeof remoteId === 'undefined') {
    return undefined;
  }
  debug.debug('received data from query', queryId);

  execution.start('decode isLast');
  // deprotobufferize isLast
  /* const isLast = decode('dc.dataControllerUtils.Boolean', isLastBuffer).boolean; */
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

  execution.start('decode dataId');
  // deprotobufferize dataId
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer);
  execution.stop('decode dataId');

  // loop over arguments peers (timestamp, payload) and deprotobufferize
  if (payloadBuffers.length % 2 !== 0) {
    debug.debug('payloads should be sent by (timestamp, payloads) peers');
    return undefined;
  }
  execution.start('decode payloads');
  const payloadsToSend = {};
  const payloadsToInsert = _map(_chunk(payloadBuffers, 2), (payloadBuffer) => {
    const timestamp = decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]).ms;
    const payload = decode(`lpisis.decommutedParameter.${dataId.comObject}`, payloadBuffer[1])
    payloadsToSend[timestamp] = payload;
    return {
      timestamp,
      payload,
    }
  });
  execution.stop('decode payloads');
  debug.debug(`inserting ${payloadsToInsert.length} data`);

  // store decoded payloads in timebasedData model
  execution.start('store payloads');
  let timebasedDataModel = getTimebasedDataModel(remoteId);
  if (!timebasedDataModel) {
    timebasedDataModel = addTimebasedDataModel(remoteId);
  }
  timebasedDataModel.addRecords(payloadsToInsert);
  execution.stop('store payloads');

  execution.start('queue payloads');
  // queue a ws newData message (sent periodically)
  websocketQueueHandler(remoteId, payloadsToSend);
  execution.stop('queue payloads');
  execution.stop('global');
  execution.print();
  return undefined;
};

module.exports = {
  onTimebasedArchiveData: (queryIdBuffer, dataIdBuffer, isLastBuffer, ...payloadBuffers) =>
    sendTimebasedArchiveData(
      addToMainQueue,
      queryIdBuffer,
      dataIdBuffer,
      isLastBuffer,
      ...payloadBuffers
    ),
  sendTimebasedArchiveData,
};
