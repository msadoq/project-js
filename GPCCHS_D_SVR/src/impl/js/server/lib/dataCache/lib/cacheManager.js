const debug = require('../../io/debug')('dataCache:cacheManager');

const { dcPullSockets } = require('../../io/zmq');
const binCache = require('./binCacheApi.js');
const jsonCache = require('./jsonCacheApi.js');
const { matchFilters } = require('./filterApi.js');
const { dataTypeController } = require('../../dataTypeManager');
const subscriptionMgr = require('./subscriptionsManager');
const { cacheWebSocket } = require('../../io/socket.io');
const _ = require('lodash');

const emitData = (subscriptionId, points) => {
  cacheWebSocket().emit('plot', {
    subscriptionId,
    points,
  });
}

const searchSubscriptionData = (subscription) => {
  jsonCache.findData(subscription, (err, storedData) => {
    debug.info('Found data');
    const points = [];
    storedData.forEach((data) => {
      const jsonPayLoad = data.jsonPayload;
      const point = [];
      point.push(data.timestamp.toNumber());
      if (subscription.field === undefined || subscription.field === '*') {
        point.push(jsonPayLoad);
      } else {
        point.push(jsonPayLoad[subscription.field]);
      }
      points.push(point);
    });
    if (points.length > 0) {
      const parameter = subscription.parameter;
      debug.info(`Sending found data in cache for parameter ${parameter} to views for subscription ${subscription.subId}`);
      debug.debug(`points: ${points}`);
      emitData(`sub${subscription.subId}`, points);
    }
  })
};


const dataBuffer = {};

const flushBuffer = () => {
  _.forEach(dataBuffer,
    (v, k) => {
      const points = v.points.splice(0);
      if (points.length > 0) {
        debug.debug(`Sending subscription ${k} to views`);
        emitData(k, points);
      }
    });
  setTimeout(flushBuffer, 40);
};

const onMessage = (header, meta, payload) => {
  dataTypeController.binToJson({ type: 'Header' }, meta).then((metaStr) => {
    debug.debug('Add Bin Data');
    binCache.addData(metaStr, payload).then((insertedBinData) => { debug.verbose(insertedBinData); });
    dataTypeController.binToJson(metaStr, payload).then((decodedJson) => {
      debug.debug('Add Json Data');
      jsonCache.addData(metaStr, decodedJson).then((insertedJsonData) => { debug.verbose(insertedJsonData); });
      debug.debug(`REQUIRING SUBSCRIPTION ${metaStr.catalog}.${metaStr.parameter}<${metaStr.type}>`);
      debug.debug(`TIME: ${metaStr.timestamp}`);
      const subscriptions = subscriptionMgr.getSubscriptions(metaStr);
      debug.debug(`Found ${subscriptions.length} Subscription(s)`);
      subscriptions.forEach((subscription) => {
        if (matchFilters(decodedJson, subscription)) {
          const point = [];
          point.push(metaStr.timestamp.toNumber());
          if (subscription.field === undefined || subscription.field === '*') {
            point.push(decodedJson);
          } else {
            point.push(decodedJson[subscription.field]);
          }
          debug.debug(`point: ${point}`);
          if (dataBuffer[`sub${subscription.subId}`]) {
            dataBuffer[`sub${subscription.subId}`].points.push(point);
          } else {
            dataBuffer[`sub${subscription.subId}`] = { points: [point] };
          }
        }
      });
    });
  });
};


const init = () => {
  debug.info('INIT Cache Manager Message Reception');
  dcPullSockets.map((s) => s.on('message', onMessage));
  setTimeout(flushBuffer, 40);
};

module.exports = { init, searchSubscriptionData };
