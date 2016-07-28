const debug = require('../../io/debug')('dataCache:cacheManager');

const { dcPullSockets } = require('../../io/zmq');
const binCache = require('./binCacheApi.js');
const jsonCache = require('./jsonCacheApi.js');
const { matchFilters } = require('./filterApi.js');
const { dataTypeController } = require('../../dataTypeManager');
const subscriptionMgr = require('./subscriptionsManager');
const { cacheWebSocket } = require('../../io/socket.io');



const newSubscription = (subscription) => {
  jsonCache.findData(subscription).then((storedData) => {
    const points = [];
    storedData.forEach((data) => {
      // cacheWebsocket().emit('Parameters', data.jsonPayload);
      const jsonPayLoad = data.jsonPayload;
      const point = [];
      point.push(data.timestamp.toNumber());
      point.push((subscription.Field === '*') ? jsonPayLoad : jsonPayLoad[subscription.Field]);
      points.push(point);
    });
    debug.info(`Size: ${points.length}`);
    if (points.length > 0) {
      const parameter = subscription.DataFullName.split('.')[1].split('<')[0];
      debug.info(`Sending found data in cache for parameter ${parameter} to views for subscription ${subscription.subId}`);
      debug.debug(`points: ${points}`);
      cacheWebSocket().emit('plot', {
        parameter,
        subscriptionId: `sub${subscription.subId}`,
        points,
      });
    }
  });
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
          point.push((subscription.Field === '*') ? decodedJson : decodedJson[subscription.Field]);

          debug.debug(`Sending parameter ${metaStr.parameter} to views for subscription ${subscription.subId}`);
          debug.debug(`point: ${point}`);
          cacheWebSocket().emit('plot', {
            parameter: metaStr.parameter,
            subscriptionId: `sub${subscription.subId}`,
            points: [point],
          });
        }
      });
    });
  });
};


const init = () => { debug.info('INIT Cache Manager Message Reception'); dcPullSockets.map((s) => s.on('message', onMessage)); };

module.exports = { init, newSubscription };
