const debug = require('../io/debug')('controllers:onViewQuery');
const registeredCallbacks = require('../utils/registeredCallbacks');
const connectedDataModel = require('../models/connectedData');
const cacheJsonModel = require('../models/cacheJson');
const viewsModel = require('../models/views');
const { encode } = require('../protobuf');
const { v4 } = require('node-uuid');
const zmq = require('../io/zmq');
const _ = require('lodash');
const { getTimebars } = require('../timebars');

/**
 * Triggered when a view query for data from HSC.
 *
 * - retrieve missing intervals from cache
 * - query missings to DC
 * - send cache data to views
 *
 * @param spark
 * @param payload
 * @param messageHandler
 */

const queryData = (spark, payload, messageHandler) => {
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
        interval: {
          lowerTs: { ms: missingInterval[0] },
          upperTs: { ms: missingInterval[1] },
        },
      }),
    });
    registeredCallbacks.set(id, (respErr) => {
      if (respErr) {
        throw respErr;
      }
    });
    messageHandler('dcPush', buffer);
    connectedDataModel.addRequestedInterval(dataId, id, missingInterval);
  });
  // retrieve full interval from cache and flush to hsc (spark.id)
  const cachedData = cacheJsonModel.findByInterval(dataId, interval[0], interval[1]);

  if (cachedData.length === 0) {
    return undefined;
  }

  const views = viewsModel.getAll();

  return _.each(views, (v) => {
    v.instance.onNewData(getTimebars(), dataId, cachedData);
  });
};

module.exports = {
  queryData,
  onViewQuery: (spark, payload) => {
    debug.debug('view query', spark.id, payload);
    queryData(spark, payload, zmq.push);
  },
};
