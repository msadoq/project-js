const debug = require('../io/debug')('controllers:onQueryData');
const _ = require('lodash');
const { decode } = require('../protobuf');
const cacheJsonModel = require('../models/cacheJson');
const connectedDataModel = require('../models/connectedData');
const viewsModel = require('../models/views');
const { getTimebars } = require('../timebars');

/**
 * Trigger on new incoming message NewDataMessage from DC.
 *
 * - de-protobuf NewDataMessage
 * - de-protobuf each payload
 * - if realtime: if data is in a known interval store in cache, otherwise stop logic
 * - if archive: store in cache, if end of request set interval as received
 * - loop on each visible view and call onNewDataMessage
 *
 * @param buffer
 */
module.exports = (dataId, queryId, payloads, isEndOfQuery) => {
  debug.verbose('called');

  if (!connectedDataModel.isRequested(dataId, queryId)) {
    return undefined;
  }

  debug.debug('received data from query', queryId);

  if (isEndOfQuery) {
    debug.debug('last payload for query', queryId);
    connectedDataModel.setIntervalAsReceived(dataId, queryId);
  }

  const payloadsToInsert = _.map(payloads, payload => (
    {
      timestamp: payload.timestamp,
      payload: decode(`lpisis.decommutedParameter.${dataId.comObject}`, payload.payload),
    }
  ));

  debug.error(`inserting ${payloadsToInsert.length} data`);

  cacheJsonModel.addRecords(dataId, payloadsToInsert);

  const views = viewsModel.getAll();

  return _.each(views, (v) => {
    v.instance.onNewData(getTimebars(), dataId, payloadsToInsert);
  });
};
