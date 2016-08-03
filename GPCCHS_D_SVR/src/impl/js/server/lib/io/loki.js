const Loki = require('lokijs');

const cache = new Loki('serverCache.json');

const subscriptionColl = cache.addCollection('subscription');

const binDataColl = cache.addCollection('binData');

const jsonDataColl = cache.addCollection('jsonData');

const cacheSubscriptionColl = cache.addCollection('cacheSubscription');

const timelineColl = cache.addCollection('timeline');

module.exports = {
  subscriptionColl,
  binDataColl,
  jsonDataColl,
  cacheSubscriptionColl,
  timelineColl,
};
