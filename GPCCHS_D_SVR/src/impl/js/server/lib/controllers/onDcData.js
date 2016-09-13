const debug = require('../io/debug')('controllers:onDcData');
const async = require('async');
const _ = require('lodash');
const { decode } = require('../protobuf');
const cacheJsonModel = require('../models/cacheJson');

// TODO : test

/**
 * Controller that listen for DC incoming NewDataMessage
 * @param buffer
 */
module.exports = buffer => {
  debug.verbose('called');

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
    // TODO loop over views and pass payload to them
    callback => callback(null),
  ], err => {
    if (err) {
      debug.error(err);
    }
  });
};
