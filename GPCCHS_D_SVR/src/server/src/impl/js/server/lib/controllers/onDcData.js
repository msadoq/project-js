const debug = require('../io/debug')('controllers:onDcData');
const async = require('async');
const _ = require('lodash');
const { decode } = require('../protobuf');
const cacheJsonModel = require('../models/cacheJson');
const viewsModel = require('../models/views');

// TODO : test

/**
 * Controller that listen for DC incoming NewDataMessage
 * @param buffer
 */
module.exports = buffer => {

  let message;
  let payloads;
  async.series([
    callback => {
      message = decode('dc.dataControllerUtils.NewDataMessage', buffer);
      return callback(null);
    },
    callback => {
      // TODO add logic to find the correct path to correct proto
      payloads = _.map(message.payloads,
        ({ payload }) => decode('lpisis.decommutedParameter.ReportingParameter', payload)
      );
      return callback(null);
    },
    callback => {
      _.each(payloads, payload => {
        cacheJsonModel.addRecord(message.dataId, payload.getReferenceTimestamp(), payload);
        debug.debug(
          'received payload',
          message.dataId.catalog,
          message.dataId.parameterName,
          message.dataId.comObject,
          payload.getReferenceTimestamp()
        );
      });

      return callback(null);
    },
    callback => {
      const views = viewsModel.retrieveVisible();

      // TODO possible event loop bottleneck, envisage async repartition of view calls on nextTicks
      views.forEach(v => {
        v.onDcData(message.dataId, payloads);
      });

      return callback(null);
    },
  ], err => (err ? debug.error(err) : debug.verbose('end')));
};
