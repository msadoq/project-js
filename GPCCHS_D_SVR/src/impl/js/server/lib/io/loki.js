const Loki = require('lokijs');

const cache = new Loki('serverCache.json');

// const subscriptiondb = new Loki('subscription.json');
const subscriptions = cache.addCollection('subscriptions');

// const binCachedb = new Loki('binCache.json');
const binCache = cache.addCollection('binCache');

// const jsonCacheDB = new Loki('jsonCache.json');
const jsonCache = cache.addCollection('jsonCache');

// const subscrDb = new Loki('cacheSubDB.json');
const subCache = cache.addCollection('cacheSub');

// const timeLinedb = new Loki('timeLine.json');
const timeLineCache = cache.addCollection('timeLines');

module.exports = { subscriptions, binCache, jsonCache, subCache, timeLineCache };
