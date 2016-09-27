const debug = require('../io/debug')('controllers:onViewQuery');
const connectedDataModel = require('../models/connectedData');
const cacheJsonModel = require('../models/cacheJson');
const viewsModel = require('../models/views');
const { encode } = require('../protobuf');
const { v4 } = require('node-uuid');
const zmq = require('../io/zmq');
const _ = require('lodash');

/**
 * Triggered when a view query for data from HSC.
 *
 * - ???
 *
 * @param spark
 * @param payload
 */

const queryData = (spark, payload, messageHandler) => {
  /**
   * payload {
   *   dataId
   *   interval
   * }
   */

  // check if query is valid
  const dataId = _.get(payload, 'dataId');
  const interval = _.get(payload, 'interval');
  if (typeof dataId === 'undefined' || typeof interval === 'undefined') {
    return undefined;
  }
  // check missing data retrieveMissingIntervals
  const missingIntervals = connectedDataModel.retrieveMissingIntervals(dataId, interval);
  // do query to dc
  _.each(missingIntervals, (missingInterval) => {
    const id = v4();
    const buffer = encode('dc.dataControllerUtils.DcClientMessage', {
      messageType: 'DATA_QUERY',
      payload: encode('dc.dataControllerUtils.DataQuery', {
        id,
        dataId,
        interval: missingInterval,
      }),
    });
    messageHandler('dcPush', buffer);
  });
  // retrieve full interval from cache and flush to hsc (spark.id)
  const cachedData = cacheJsonModel.findByInterval(dataId, interval[0], interval[1]);

  const views = viewsModel.getAll();

  return _.each(views, (v) => {
    v.instance.onNewData(dataId, cachedData);
  });
};

module.exports = {
  queryData,
  onViewQuery: (spark, payload) => {
    debug.debug('view query', spark.id, payload);
    queryData(spark, payload, zmq.push);
  },
};
