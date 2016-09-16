const debug = require('../io/debug')('controllers:onConnectedDataOpen');

/**
 * Triggered when a new connected data is mounted on HSC
 * @param spark
 */
module.exports = (spark, payload) => {
  debug.info(spark.id, 'connectedData opened', payload);
};
