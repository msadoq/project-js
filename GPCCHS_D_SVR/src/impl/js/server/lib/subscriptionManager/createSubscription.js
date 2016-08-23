const debug = require('../io/debug')('subscriptionManager:subscriptionApi');
const { send } = require('../io/zmq');
const { v4 } = require('node-uuid');
const model = require('../models/subscriptions');
const searchIntervals = require('./intervals'); // TODO : should not be here ?
const { searchSubscriptionData } = require('../dataCache/cacheManager'); // TODO : should be here ?

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
      return send('gpccdcpush', JSON.stringify(newIntervalSubs));
    });
  });

  return subId;
};
