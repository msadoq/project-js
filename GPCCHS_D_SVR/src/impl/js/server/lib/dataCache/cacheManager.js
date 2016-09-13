const debug = require('../io/debug')('cache');
const cacheJsonModel = require('../models/cacheJson');
const { sendParameterData } = require('../io/primus');

const searchSubscriptionData = subscription => {
  // TODO add lower/upper
  const storedData = cacheJsonModel.findByInterval(subscription, null, null);
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
    sendParameterData(subscription, 'plot', points); // TODO: check points format
  }
};

module.exports = {
  searchSubscriptionData,
};
