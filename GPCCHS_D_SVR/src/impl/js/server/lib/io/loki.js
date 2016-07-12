const Loki = require('lokijs');

const subscriptiondb = new Loki('subscription.json');
const subscriptions = subscriptiondb.addCollection('subscriptions');

const binCachedb = new Loki('binCache.json');
const binCache = binCachedb.addCollection('binCache');

const jsonCacheDB = new Loki('jsonCache.json');
const jsonCache = jsonCacheDB.addCollection('jsonCache');

const subscrDb = new Loki('cacheSubDB.json');
const subCache = subscrDb.addCollection('cacheSub');

const timeLinedb = new Loki('timeLine.json');
const timeLineCache = timeLinedb.addCollection('timeLines');

module.exports = { subscriptions, binCache, jsonCache, subCache, timeLineCache };
