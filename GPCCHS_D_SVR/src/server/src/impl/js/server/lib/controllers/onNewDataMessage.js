const debug = require('../io/debug')('controllers:onNewDataMessage');
const async = require('async');
const _ = require('lodash');
const { decode } = require('../protobuf');
const getLocalId = require('../models/getLocalId');
const cacheJsonModel = require('../models/cacheJson');
const connectedDataModel = require('../models/connectedData');
const viewsModel = require('../models/views');

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
      debug.debug('decode payloads of comObject type', message.dataId.comObject);
      payloads = _.map(message.payloads,
        payload => ({
          payload: decode(`lpisis.decommutedParameter.${message.dataId.comObject}`,
            payload.payload),
          timestamp: payload.timestamp,
        })
      );
      return callback(null);
    },
    callback => {
      switch (message.dataSource) {
        case 'REAL_TIME':
          _.each(payloads, payload => {
            if (connectedDataModel.isTimestampInKnownIntervals(getLocalId(message.dataId),
              payload.timestamp.ms)
            ) {
              cacheJsonModel.addRecord(message.dataId, payload.timestamp.ms, payload.payload);
              debug.debug(
                'add real time data',
                message.dataId.catalog,
                message.dataId.parameterName,
                message.dataId.comObject,
                payload.timestamp.ms
              );
            }
          });
          break;
        case 'ARCHIVE':
          {
            _.each(payloads, payload => {
              cacheJsonModel.addRecord(message.dataId, payload.timestamp.ms, payload.payload);
              debug.debug(
                'add archive data',
                message.dataId.catalog,
                message.dataId.parameterName,
                message.dataId.comObject,
                payload.timestamp.ms
              );
            });
            if (message.isEndOfQuery) {
              connectedDataModel.setIntervalAsReceived(getLocalId(message.dataId), message.id);
            }
            break;
          }
        case 'UNKNOWN':
        default:
          throw new Error('Unknown data source');
      }

      return callback(null);
    },
    callback => {
      const views = viewsModel.retrieveVisible();

      // TODO possible event loop bottleneck, envisage async repartition of view calls on nextTicks
      views.forEach(v => {
        v.instance.onNewDataMessage(getLocalId(message.dataId), payloads);
      });

      return callback(null);
    },
  ], err => (err ? debug.error(err) : debug.verbose('end')));
};
