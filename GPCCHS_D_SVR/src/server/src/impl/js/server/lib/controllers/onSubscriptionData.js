const debug = require('../io/debug')('controllers:onSubscriptionData');
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
module.exports = (dataId, payloads) => {
  debug.verbose('called');

  if (!connectedDataModel.exists(dataId)) {
    return undefined;
  }

  debug.debug('received subscribed data');

  const payloadsObj = {};

  _.each(payloads, (payload) => {
    payloadsObj[payload.timestamp] = payload.payload;
  });

  const timestamps = _.keys(payloadsObj);

  const timestampsToInsert = connectedDataModel.areTimestampsInKnownIntervals(dataId, timestamps);

  const payloadsToInsert = _.map(timestampsToInsert, timestamp => (
    {
      timestamp,
      payload: decode(`lpisis.decommutedParameter.${dataId.comObject}`, payloadsObj[timestamp]),
    }
  ));

  if (payloadsToInsert.length === 0) {
    return undefined;
  }

  debug.debug(`inserting ${payloadsToInsert.length} data`);

  cacheJsonModel.addRecords(dataId, payloadsToInsert);

  const views = viewsModel.getAll();

  return _.each(views, (v) => {
    v.instance.onNewData(getTimebars(), dataId, payloadsToInsert);
  });
};
