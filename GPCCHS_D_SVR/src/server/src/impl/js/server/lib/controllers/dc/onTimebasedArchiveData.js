const debug = require('../../io/debug')('controllers:onTimebasedArchiveData');
const _ = require('lodash');
const { decode } = require('../../protobuf');
const timebasedDataModel = require('../../models/timebasedData');
const connectedDataModel = require('../../models/connectedData');
const registeredQueries = require('../../utils/registeredQueries');
const { getMainWebsocket } = require('../../io/primus');

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
const sendTimebasedArchiveData = (spark, dataId, queryId, payloads, isEndOfQuery) => {
  debug.verbose('called');

  // if queryId not in registeredQuerues, stop logic
  const remoteId = registeredQueries.get(queryId);
  if (typeof remoteId === 'undefined') {
    return undefined;
  }
  debug.debug('received data from query', queryId);

  // if last chunk of data, set interval as received in connectedData model and unregister queryId
  if (isEndOfQuery) {
    debug.debug('last chunk of queried timebased data', queryId);
    connectedDataModel.setIntervalAsReceived(remoteId, queryId);
    registeredQueries.remove(queryId);
  }

  // loop over arguments peers (timestamp, payload) and deprotobufferize
  const payloadsToInsert = _.map(payloads, payload => (
    {
      timestamp: payload.timestamp.ms,
      payload: decode(`lpisis.decommutedParameter.${dataId.comObject}`, payload.payload),
    }
  ));
  debug.debug(`inserting ${payloadsToInsert.length} data`);

  // store decoded payloads in timebasedData model
  timebasedDataModel.addRecords(remoteId, payloadsToInsert);

  // queue a ws newData message (sent periodically)
  return spark.addToQueue(remoteId, payloadsToInsert);
};

module.exports = {
  onTimebasedArchiveData: (dataId, queryId, payloads, isEndOfQuery) => {
    const mainWebsocket = getMainWebsocket();
    sendTimebasedArchiveData(mainWebsocket, dataId, queryId, payloads, isEndOfQuery);
  },
  sendTimebasedArchiveData,
};
