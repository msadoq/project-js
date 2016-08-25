const debug = require('../io/debug')('controllers:onDcArchiveData');
const async = require('async');
const cacheBinaryModel = require('../models/cacheBinary');
const cacheJsonModel = require('../models/cacheJson');
const subscriptionsModel = require('../models/subscriptions');
const { dataTypeController } = require('../dataTypeManager');
const primus = require('../io/primus');

// TODO : test

/**
 * Controller that listen for DC archive data incoming
 * @param header
 * @param meta
 * @param payload
 */
module.exports = (header, meta, payload) => {
  let jsonMeta;
  let jsonPayload;
  async.waterfall([
    // decode meta
    callback => {
      dataTypeController.binToJson({ type: 'Header' }, meta) // TODO : promise?
        .then(json => {
          jsonMeta = json;
          callback(null);
        })
        .catch(callback);
    },
    // decode payload
    callback => {
      dataTypeController.binToJson(jsonMeta, payload) // TODO : promise?
        .then(json => {
          jsonPayload = json;
          callback(null);
        })
        .catch(callback);
    },
    // log
    callback => callback(debug.debug('received', jsonMeta.timestamp, jsonMeta.fullDataId)),
    // persist in cache
    callback => {
      cacheBinaryModel.addRecord(jsonMeta, payload);
      cacheJsonModel.addRecord(jsonMeta, jsonPayload);
      callback(null);
    },
    // send to corresponding websockets
    callback => {
      const subscriptions = subscriptionsModel.retrieveByMeta(jsonMeta);
      if (!subscriptions.length) {
        return callback(null);
      }

      subscriptions.forEach(subscription => {
        const point = [];
        point.push(jsonMeta.timestamp.toNumber());
        if (typeof subscription.field === 'undefined') {
          point.push(jsonPayload);
        } else {
          point.push(jsonPayload[subscription.field]);
        }

        primus.sendParameterData(subscription, 'plot', jsonPayload);
      });

      return callback(null);
    },
  ], err => {
    if (err) {
      debug.error(err);
    }
  });
};
