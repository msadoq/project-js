const debug = require('../../io/debug')('controllers:onTimebasedArchiveData');
const _ = require('lodash');
const { decode } = require('../../protobuf');
const { addTimebasedDataModel, getTimebasedDataModel } = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const registeredQueries = require('../../utils/registeredQueries');
const { addToMainQueue } = require('../../websocket/sendToMain');

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
  websocketHandler,
  queryIdBuffer,
  dataIdBuffer,
  isLastBuffer,
  ...payloadBuffers
) => {
  debug.verbose('called');

  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;

  // if queryId not in registeredQuerues, stop logic
  const remoteId = registeredQueries.get(queryId);
  if (typeof remoteId === 'undefined') {
    return undefined;
  }
  debug.debug('received data from query', queryId);

  // deprotobufferize isLast
  const isLast = decode('dc.dataControllerUtils.Boolean', isLastBuffer).boolean;

  // if last chunk of data, set interval as received in connectedData model and unregister queryId
  if (isLast) {
    debug.debug('last chunk of queried timebased data', queryId);
    connectedDataModel.setIntervalAsReceived(remoteId, queryId);
    registeredQueries.remove(queryId);
  }

  // deprotobufferize dataId
  const dataId = decode('dc.dataControllerUtils.DataId', dataIdBuffer);

  // loop over arguments peers (timestamp, payload) and deprotobufferize
  if (payloadBuffers.length % 2 !== 0) {
    debug.debug('payloads should be sent by (timestamp, payloads) peers');
    return undefined;
  }
  const payloadsToInsert = _.map(_.chunk(payloadBuffers, 2), payloadBuffer => (
    {
      timestamp: decode('dc.dataControllerUtils.Timestamp', payloadBuffer[0]).ms,
      payload: decode(`lpisis.decommutedParameter.${dataId.comObject}`, payloadBuffer[1]),
    }
  ));
  debug.debug(`inserting ${payloadsToInsert.length} data`);

  // store decoded payloads in timebasedData model
  let timebasedDataModel = getTimebasedDataModel(remoteId);
  if (!timebasedDataModel) {
    timebasedDataModel = addTimebasedDataModel(remoteId);
  }
  timebasedDataModel.addRecords(payloadsToInsert);

  // queue a ws newData message (sent periodically)
  return websocketHandler(remoteId, payloadsToInsert);
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
