const debug = require('../io/debug')('controllers:onNewDataMessage');
const _ = require('lodash');
const { decode } = require('../protobuf');
const cacheJsonModel = require('../models/cacheJson');
const connectedDataModel = require('../models/connectedData');
const viewsModel = require('../models/views');

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
module.exports = (buffer) => {
  debug.verbose('called');

  const message = decode('dc.dataControllerUtils.NewDataMessage', buffer);

  if (!connectedDataModel.exists(message.dataId)) {
    return;
  }

  debug.debug('decode payloads of comObject type', message.dataId.comObject);
  const payloads = _.map(message.payloads,
    payload => ({
      payload: decode(`lpisis.decommutedParameter.${message.dataId.comObject}`,
        payload.payload),
      timestamp: payload.timestamp,
    })
  );

  switch (message.dataSource) {
    case 'REAL_TIME':
      debug.debug('pub/sub data');
      break;
    case 'ARCHIVE':
      debug.debug('archive data');
      if (message.isEndOfQuery) {
        connectedDataModel.setIntervalAsReceived(message.dataId, message.id);
      }
      break;
    case 'UNKNOWN':
    default:
      throw new Error('Unknown data source');
  }

  _.each(payloads, (payload) => {
    if (connectedDataModel.isTimestampInKnownIntervals(message.dataId, payload.timestamp.ms)) {
      cacheJsonModel.addRecord(message.dataId, payload.timestamp.ms, payload.payload);
      debug.debug('add real time data');
      debug.verbose(
        message.dataId.catalog,
        message.dataId.parameterName,
        message.dataId.comObject,
        payload.timestamp.ms
      );
    }
  });

  const views = viewsModel.getAll();

  // TODO possible event loop bottleneck, envisage async repartition of view calls on nextTicks
  _.each(views, (v) => {
    v.instance.onNewData(message.dataId, payloads);
  });
};
