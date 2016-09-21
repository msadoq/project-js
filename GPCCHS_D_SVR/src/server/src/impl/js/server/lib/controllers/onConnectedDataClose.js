const debug = require('../io/debug')('controllers:onConnectedDataClose');
const zmq = require('../io/zmq');
const subscriptions = require('../utils/subscriptions');

/**
 * Triggered when a connectedData is unmounted on HSC and should be unsubscribed from
 * DC pub/sub filter.
 *
 * - store as subscribed connectedData
 * - send unsubscription request to DC
 *
 * @param spark
 * @param payload
 */

module.exports = (spark, payload) => {
  debug.debug(spark.id);
  subscriptions.stop(payload, zmq.push);
};
