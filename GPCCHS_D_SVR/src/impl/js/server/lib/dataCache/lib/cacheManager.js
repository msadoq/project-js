const debug = require('../../io/debug')('dataCache:cacheManager');

const { dcPullSockets } = require('../../io/zmq');
const binCache = require('./binCacheApi.js');
const jsonCache = require('./jsonCacheApi.js');
const { dataTypeController } = require('../../dataTypeManager');
const subscriptionMgr = require('./subscriptionsManager');
const { cacheWebSocket } = require('../../io/socket.io');

const newSubscription = (subscription) => {
  jsonCache.findData(subscription).then((storedData) => {
    const batPoints = [];
    storedData.forEach((data) => {
      // cacheWebsocket().emit('Parameters', data.jsonPayload);
      const jsonPayLoad = data.jsonPayload;
      const batPoint = [];
      batPoint.push(data.timestamp);
      batPoint.push(jsonPayLoad.rawValue);
      batPoints.push(batPoint);
    });
    if (batPoints.length > 0) {
      const plotJson = {
        type: 'addPoints',
        id: 'batman',
        points: batPoints.sort(),
      };
      const parameter = subscription.DataFullName.split('.')[1].split('<')[0];
      debug.info(`Sending found data in cache for parameter ${parameter} to views for subscription ${subscription.subId}`);
      cacheWebSocket().emit(`plotCache${parameter}`, JSON.stringify(plotJson));
    }
  });
};


const onMessage = (header, meta, payload) => {
  const metaStr = new Buffer(meta).toString('utf8').split('\0')[0];
  const metaJson = JSON.parse(metaStr);
  const metaBin = JSON.parse(metaStr);
  debug.debug('Add Bin Data');
  binCache.addData(metaBin, payload).then((insertedBinData) => { debug.verbose(insertedBinData); });
  dataTypeController.binToJson(metaJson, payload).then((decodedJson) => {
    debug.debug('Add Json Data');
    jsonCache.addData(metaJson, decodedJson).then((insertedJsonData) => { debug.verbose(insertedJsonData); });
    debug.debug(`REQUIRING SUBSCRIPTION ${metaJson.catalog}.${metaJson.parameter}<${metaJson.type}>`);
    debug.debug(`TIME: ${metaJson.timestamp}`);
    const subscriptions = subscriptionMgr.getSubscriptions(metaJson);
    debug.debug(`Found ${subscriptions.length} Subscription(s)`);
    subscriptions.forEach((subscription) => {
      cacheWebSocket().emit('Parameters', decodedJson);

      const batPoint = [];
      batPoint.push(metaJson.timestamp);
      batPoint.push(decodedJson.rawValue);

      debug.debug(`Sending parameter ${metaJson.parameter} to views for subscription ${subscription.subId}`);
      cacheWebSocket().emit(`plot${metaJson.parameter}`, batPoint);
    });
  });
};


const init = () => { debug.info('INIT Cache Manager Message Reception'); dcPullSockets.map((s) => s.on('message', onMessage)); };

module.exports = { init, newSubscription };
