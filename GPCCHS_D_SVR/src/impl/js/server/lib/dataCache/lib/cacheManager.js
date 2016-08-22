const debug = require('../../io/debug')('dataCache:cacheManager');
const _ = require('lodash');
const binCache = require('./binCacheApi');
const jsonCache = require('./jsonCacheApi');
const { matchFilters } = require('./filterApi');
const { dataTypeController } = require('../../dataTypeManager');
const subscriptionMgr = require('./subscriptionsManager');
const { getSocketIo } = require('../../io/socket.io');

const emitData = (subscriptionId, points) => {
  // TODO : dispatch to corresponding websocket (based on subscriptionId)
  getSocketIo().emit('plot', {
    subscriptionId,
    points,
  });
};

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
      debug.info(
        `Sending found data in cache for ${parameter} for subscription ${subscription.subId}`
      );
      debug.debug(`points: ${points}`);
      emitData(`sub${subscription.subId}`, points);
    }
  });
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
    binCache.addData(metaStr, payload).then(
      (insertedBinData) => { debug.verbose(insertedBinData); }
    );
    dataTypeController.binToJson(metaStr, payload).then((decodedJson) => {
      debug.debug('Add Json Data');
      jsonCache.addData(metaStr, decodedJson).then(
        (insertedJsonData) => { debug.verbose(insertedJsonData); }
      );
      debug.debug(
        `REQUIRING SUBSCRIPTION ${metaStr.catalog}.${metaStr.parameter}<${metaStr.type}>`
      );
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
  setTimeout(flushBuffer, 40); // TODO : oh my god! use _.throttle if you really need that
};

module.exports = {
  init,
  searchSubscriptionData,
  onMessage,
};
