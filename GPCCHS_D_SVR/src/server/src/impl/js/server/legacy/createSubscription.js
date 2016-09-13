const debug = require('../lib/io/debug')('subscriptionManager:subscriptionApi');
const { request } = require('../lib/io/zmq');
const { v4 } = require('node-uuid');
const model = require('subscriptionsModel');
const searchIntervals = require('./intervals'); // TODO : should not be here ?
const { searchSubscriptionData } = require('cacheManager'); // TODO : should be here ?

module.exports = subscription => {
  const subId = v4();

  process.nextTick(() => {
    const newSubscription = Object.assign({}, subscription, { subId });
    searchSubscriptionData(newSubscription);
    // TODO : split interval in helper class for logic and module with inclusion of model
    // for searchIntervals
    searchIntervals(model, newSubscription, (err, intervals) => {
      model.insert(newSubscription);
      if (intervals.length === 0) {
        return debug.info('ALL INTERVALS FOUND IN CACHE');
      }
      const newIntervalSubs = [];
      for (const interval of intervals) {
        const newSub = newSubscription;
        newSub.visuWindow = interval.visuWindow;
        newIntervalSubs.push(newSub);
        debug.info(`NEED INTERVAL : ${JSON.stringify(interval)}`);
      }
      return request('dcreq', JSON.stringify(newIntervalSubs));
    });
  });

  return subId;
};
