const debug = require('../io/debug')('controllers:onConnectedDataOpen');
const zmq = require('../io/zmq');
const subscriptions = require('../utils/subscriptions');

/**
 * Triggered when a new connected data is mounted on HSC and should be whitelisted in DC pub/sub
 * filter.
 *
 * - store as subscribed connectedData
 * - send subscription request to DC
 *
 * @param spark
 * @param payload
 */

module.exports = (spark, payload) => {
  debug.debug(spark.id);
  subscriptions.start(payload, zmq.push);
};
